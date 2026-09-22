// Fetches the current `products` collection from Firestore (public read) and
// compares its hash against the committed .data-hash file. Writes a new hash
// to .data-hash and sets a `changed` output for the workflow to branch on,
// so the site only rebuilds/redeploys when a product was actually added,
// edited, or deleted in the admin panel.
const fs = require("fs");
const crypto = require("crypto");
const https = require("https");

const PROJECT_ID = "oniks-guvenlik";
const HASH_FILE = ".data-hash";

function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    let allDocs = [];
    let pageToken = "";

    function fetchPage() {
      const qs = pageToken ? `?pageToken=${encodeURIComponent(pageToken)}&pageSize=300` : `?pageSize=300`;
      https
        .get(
          `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/products${qs}`,
          (res) => {
            let data = "";
            res.on("data", (c) => (data += c));
            res.on("end", () => {
              if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                return;
              }
              const json = JSON.parse(data);
              allDocs = allDocs.concat(json.documents || []);
              if (json.nextPageToken) {
                pageToken = json.nextPageToken;
                fetchPage();
              } else {
                resolve(allDocs);
              }
            });
          }
        )
        .on("error", reject);
    }
    fetchPage();
  });
}

async function main() {
  const docs = await fetchAllProducts();
  const names = docs.map((d) => d.name).sort();
  const hash = crypto.createHash("sha256").update(JSON.stringify(names) + JSON.stringify(docs)).digest("hex");

  const previous = fs.existsSync(HASH_FILE) ? fs.readFileSync(HASH_FILE, "utf8").trim() : "";
  const changed = hash !== previous;

  fs.writeFileSync(HASH_FILE, hash + "\n");

  const output = process.env.GITHUB_OUTPUT;
  if (output) {
    fs.appendFileSync(output, `changed=${changed}\n`);
  }
  console.log(`Products: ${docs.length}, changed: ${changed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
