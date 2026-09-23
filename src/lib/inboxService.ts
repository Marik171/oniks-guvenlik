import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';

export type InquiryStatus = 'new' | 'in_progress' | 'replied' | 'archived';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
}

const LOCAL_STORAGE_INBOX_KEY = 'oniks_inbox_inquiries';
const RATE_LIMIT_STORAGE_KEY = 'oniks_submission_timestamps';

const MAX_SUBMISSIONS_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MIN_SUBMISSION_INTERVAL_MS = 10 * 1000;
const INBOX_CACHE_TTL_MS = 60 * 1000;

let inMemoryInquiriesCache: { data: Inquiry[]; timestamp: number } | null = null;

function checkRateLimit(): { allowed: boolean; waitMinutes?: number } {
  if (typeof window === 'undefined') return { allowed: true };
  const now = Date.now();
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (recent.length > 0 && now - recent[recent.length - 1] < MIN_SUBMISSION_INTERVAL_MS) {
      return { allowed: false, waitMinutes: 1 };
    }
    if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      const waitMs = RATE_LIMIT_WINDOW_MS - (now - recent[0]);
      return { allowed: false, waitMinutes: Math.max(1, Math.ceil(waitMs / (60 * 1000))) };
    }
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

function recordSubmissionTimestamp() {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    recent.push(now);
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(recent));
  } catch {
    // ignore
  }
}

function getLocalInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_INBOX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalInquiries(items: Inquiry[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_INBOX_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save inquiries to localStorage:', err);
  }
}

const COLLECTION = 'inquiries';

export const inboxService = {
  async submitInquiry(
    data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Çok fazla form gönderimi yapıldı. Lütfen ${rateCheck.waitMinutes} dakika bekleyiniz.`,
      };
    }

    const cleanName = (data.name || '').trim().slice(0, 100);
    const cleanEmail = (data.email || '').trim().slice(0, 100);
    const cleanPhone = (data.phone || '').trim().slice(0, 30);
    const cleanService = (data.service || '').trim().slice(0, 100);
    const cleanMessage = (data.message || '').trim().slice(0, 3000);

    if (cleanName.length < 2) {
      return { success: false, error: 'Lütfen geçerli bir isim giriniz.' };
    }
    if (!cleanEmail.includes('@') || cleanEmail.length < 5) {
      return { success: false, error: 'Lütfen geçerli bir e-posta adresi giriniz.' };
    }
    if (cleanMessage.length < 5) {
      return { success: false, error: 'Lütfen mesajınızı biraz daha detaylandırınız.' };
    }

    const id = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newInquiry: Inquiry = {
      id,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: cleanService,
      message: cleanMessage,
      status: 'new',
      createdAt: new Date().toISOString(),
      notes: '',
    };

    if (db) {
      try {
        await setDoc(doc(db, COLLECTION, id), newInquiry);
      } catch (err) {
        console.warn('Firestore submission failed, writing locally:', err);
      }
    }

    const current = getLocalInquiries();
    current.unshift(newInquiry);
    saveLocalInquiries(current);
    inMemoryInquiriesCache = null;

    recordSubmissionTimestamp();

    return { success: true, id };
  },

  async getInquiries(forceRefresh = false): Promise<Inquiry[]> {
    const now = Date.now();
    if (!forceRefresh && inMemoryInquiriesCache && now - inMemoryInquiriesCache.timestamp < INBOX_CACHE_TTL_MS) {
      return inMemoryInquiriesCache.data;
    }

    if (db) {
      try {
        const colRef = collection(db, COLLECTION);
        const q = query(colRef, orderBy('createdAt', 'desc'), limit(100));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const list: Inquiry[] = [];
          snap.forEach((d) => list.push(d.data() as Inquiry));
          inMemoryInquiriesCache = { data: list, timestamp: now };
          return list;
        }
      } catch (err) {
        console.warn('Firestore inquiries fetch fallback to local:', err);
      }
    }

    const local = getLocalInquiries();
    inMemoryInquiriesCache = { data: local, timestamp: now };
    return local;
  },

  async updateStatus(id: string, status: InquiryStatus, notes?: string): Promise<{ success: boolean }> {
    inMemoryInquiriesCache = null;

    if (db) {
      try {
        const updates: Partial<Inquiry> = { status };
        if (notes !== undefined) updates.notes = notes;
        await updateDoc(doc(db, COLLECTION, id), updates);
      } catch (err) {
        console.warn('Firestore update failed:', err);
      }
    }

    const items = getLocalInquiries();
    const updated = items.map((item) =>
      item.id === id ? { ...item, status, notes: notes !== undefined ? notes : item.notes } : item
    );
    saveLocalInquiries(updated);

    return { success: true };
  },

  async deleteInquiry(id: string): Promise<{ success: boolean }> {
    inMemoryInquiriesCache = null;

    if (db) {
      try {
        await deleteDoc(doc(db, COLLECTION, id));
      } catch (err) {
        console.warn('Firestore delete failed:', err);
      }
    }

    const items = getLocalInquiries();
    saveLocalInquiries(items.filter((i) => i.id !== id));

    return { success: true };
  },
};
