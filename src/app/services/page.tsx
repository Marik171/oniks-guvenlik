import ServicesPageClient from "@/components/ServicesPageClient";
import { productsService } from "@/lib/productsService";

// Static export: products are fetched from Firestore at build time, so the
// page ships as plain static HTML/JSON. New products/edits appear after the
// next rebuild (triggered automatically by the admin panel), not instantly.
export default async function ServicesPage() {
  const products = await productsService.getAllProducts();
  return <ServicesPageClient products={products} />;
}
