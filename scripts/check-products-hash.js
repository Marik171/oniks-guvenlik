// Fetches the small `meta/catalog` Firestore doc (public read), which the
// admin panel bumps on every product create/update/delete, and compares its
// updatedAt against the committed .data-hash file. Writes the new value to
// .data-hash and sets a `changed` output for the workflow to branch on, so
// the site only rebuilds/redeploys when a product actually changed.
//
// This reads exactly one document per check instead of the entire products
// collection (previously ~400+ reads per check), keeping Firestore usage far
// under the Spark (free) plan's 50,000 reads/day quota even when polled
// every 5 minutes.
const fs = require("fs");
const https = require("https");

const PROJECT_ID = "oniks-guvenlik";
const HASH_FILE = ".data-hash";

function fetchMetaDoc() {
  return new Promise((resolve, reject) => {
    https
      .get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/meta/catalog`,
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => {
            if (res.statusCode === 404) {
              resolve(null);
              return;
            }
            if (res.statusCode !== 200) {
              reject(new Error(`HTTP ${res.statusCode}: ${data}`));
              return;
            }
            resolve(JSON.parse(data));
          });
        }
      )
      .on("error", reject);
  });
}

async function main() {
  const doc = await fetchMetaDoc();
  // Missing doc (shouldn't normally happen once seeded) is treated as
  // "always changed" so the workflow safely falls back to rebuilding.
  const marker = doc?.fields?.updatedAt?.timestampValue || `missing-${Date.now()}`;

  const previous = fs.existsSync(HASH_FILE) ? fs.readFileSync(HASH_FILE, "utf8").trim() : "";
  const changed = marker !== previous;

  fs.writeFileSync(HASH_FILE, marker + "\n");

  const output = process.env.GITHUB_OUTPUT;
  if (output) {
    fs.appendFileSync(output, `changed=${changed}\n`);
  }
  console.log(`Meta marker: ${marker}, changed: ${changed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
