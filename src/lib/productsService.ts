import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type ProductCategory =
  | 'interkom'
  | 'kamera'
  | 'akilliev'
  | 'turnike'
  | 'otopark'
  | 'uydu';

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
}

const COLLECTION = 'products';

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

export const productsService = {
  async getAllProducts(): Promise<Product[]> {
    if (!db) return [];
    const snap = await getDocs(collection(db, COLLECTION));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }));
  },

  async getProduct(id: string): Promise<Product | null> {
    if (!db) return null;
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Product, 'id'>) };
  },

  async createProduct(product: Omit<Product, 'id'>, idHint?: string): Promise<string> {
    if (!db) throw new Error('Firestore is not configured.');
    const id = idHint ? slugify(idHint) : slugify(`${product.brand}-${product.name}`);
    await setDoc(doc(db, COLLECTION, id), {
      ...product,
      updatedAt: serverTimestamp(),
    });
    return id;
  },

  async updateProduct(id: string, product: Partial<Omit<Product, 'id'>>): Promise<void> {
    if (!db) throw new Error('Firestore is not configured.');
    await setDoc(
      doc(db, COLLECTION, id),
      { ...product, updatedAt: serverTimestamp() },
      { merge: true }
    );
  },

  async deleteProduct(id: string): Promise<void> {
    if (!db) throw new Error('Firestore is not configured.');
    await deleteDoc(doc(db, COLLECTION, id));
  },
};
