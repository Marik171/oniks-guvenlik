import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

// Free-text: the owner can introduce a brand-new category just by typing it
// on the product form, and it automatically becomes its own filter on both
// the admin dashboard and the public catalog. See src/lib/catalogMeta.ts for
// the nicer display labels used for the categories that ship by default.
export type ProductCategory = string;

export type ProductIconName =
  | 'Tv'
  | 'Video'
  | 'Smartphone'
  | 'Cpu'
  | 'Home'
  | 'Lock'
  | 'Shield'
  | 'Car'
  | 'Layers'
  | 'Sliders';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  iconName: ProductIconName;
  description: string;
  specs: string[];
  image: string;
  // Optional additional gallery photos beyond the primary cover (`image`).
  images?: string[];
  // Manual position set by drag-and-drop in the admin panel (lower = earlier).
  order?: number;
}

const COLLECTION = 'products';
const META_DOC = 'meta/catalog';

// Bumped on every product create/update/delete so the CI rebuild-trigger
// check can detect changes by reading this one small doc instead of the
// entire products collection.
async function touchMeta(): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, META_DOC), { updatedAt: serverTimestamp() }, { merge: true });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Firestore data includes `updatedAt` (a Timestamp class instance), which
// can't be passed from Server to Client Components. It isn't part of Product.
function toProduct(id: string, data: Record<string, unknown>): Product {
  const rest = { ...data };
  delete rest.updatedAt;
  return { id, ...(rest as Omit<Product, 'id'>) };
}

export const productsService = {
  async getAllProducts(): Promise<Product[]> {
    if (!db) return [];
    const snap = await getDocs(collection(db, COLLECTION));
    return snap.docs
      .map((d) => toProduct(d.id, d.data()))
      .sort(
        (a, b) =>
          (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
          a.name.localeCompare(b.name)
      );
  },

  async getDistinctValues(): Promise<{ brands: string[]; categories: string[] }> {
    const products = await this.getAllProducts();
    const brands = Array.from(new Set(products.map((p) => p.brand))).sort((a, b) => a.localeCompare(b));
    const categories = Array.from(new Set(products.map((p) => p.category))).sort((a, b) => a.localeCompare(b));
    return { brands, categories };
  },

  async getProduct(id: string): Promise<Product | null> {
    if (!db) return null;
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return toProduct(snap.id, snap.data());
  },

  async createProduct(product: Omit<Product, 'id'>, idHint?: string): Promise<string> {
    if (!db) throw new Error('Firestore is not configured.');
    const id = idHint ? slugify(idHint) : slugify(`${product.brand}-${product.name}`);
    await setDoc(doc(db, COLLECTION, id), {
      ...product,
      updatedAt: serverTimestamp(),
    });
    await touchMeta();
    return id;
  },

  async updateProduct(id: string, product: Partial<Omit<Product, 'id'>>): Promise<void> {
    if (!db) throw new Error('Firestore is not configured.');
    await setDoc(
      doc(db, COLLECTION, id),
      { ...product, updatedAt: serverTimestamp() },
      { merge: true }
    );
    await touchMeta();
  },

  // Persists the manual order: product ids[i] gets order i.
  async reorderProducts(ids: string[]): Promise<void> {
    if (!db) throw new Error('Firestore is not configured.');
    for (let i = 0; i < ids.length; i += 400) {
      const batch = writeBatch(db);
      ids.slice(i, i + 400).forEach((id, j) => {
        batch.set(doc(db!, COLLECTION, id), { order: i + j }, { merge: true });
      });
      await batch.commit();
    }
    await touchMeta();
  },

  async deleteProduct(id: string): Promise<void> {
    if (!db) throw new Error('Firestore is not configured.');
    await deleteDoc(doc(db, COLLECTION, id));
    await touchMeta();
  },
};
