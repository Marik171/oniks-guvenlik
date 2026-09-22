"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ImageOff, Pencil, Search } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import { productsService, Product, ProductCategory } from "@/lib/productsService";

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "interkom", label: "IP İnterkom & Diafon" },
  { id: "kamera", label: "Güvenlik Kamerası" },
  { id: "uydu", label: "Merkezi Uydu & TV" },
  { id: "akilliev", label: "Akıllı Ev Otomasyonu" },
  { id: "turnike", label: "Turnike Sistemleri" },
  { id: "otopark", label: "Otopark & Bariyer" },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  useEffect(() => {
    productsService
      .getAllProducts()
      .then((p) => setProducts(p.sort((a, b) => a.name.localeCompare(b.name))))
      .finally(() => setLoading(false));
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Product[]>();
    for (const p of filtered) {
      const list = groups.get(p.category) ?? [];
      list.push(p);
      groups.set(p.category, list);
    }
    return CATEGORIES.filter((c) => groups.has(c.id)).map((c) => ({
      ...c,
      products: groups.get(c.id) ?? [],
    }));
  }, [filtered]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[#f5f6f8]">
        <AdminHeader />
        <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
          {/* Stats + search bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#000c2d]">Ürün Kataloğu</h1>
              <p className="text-sm text-neutral-500 mt-1">
                {loading ? "Yükleniyor..." : `${products.length} ürün · ${CATEGORIES.filter((c) => categoryCounts[c.id]).length} kategori`}
              </p>
            </div>
            <div className="relative flex items-center w-full md:w-80">
              <Search className="w-4 h-4 absolute left-4 text-neutral-400 pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ürün veya marka ara..."
                className="w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d] focus:ring-2 focus:ring-[#000c2d]/10 bg-white transition-all"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === "all"
                  ? "bg-[#000c2d] border-[#000c2d] text-white"
                  : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300"
              }`}
            >
              Tümü ({products.length})
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeCategory === c.id
                    ? "bg-[#000c2d] border-[#000c2d] text-white"
                    : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300"
                }`}
              >
                {c.label} ({categoryCounts[c.id] ?? 0})
              </button>
            ))}
          </div>

          {/* Product grid, grouped by category */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-neutral-200/60 animate-pulse" />
              ))}
            </div>
          ) : grouped.length === 0 ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-2 bg-white rounded-2xl border border-neutral-200">
              <p className="text-sm font-bold text-neutral-500">Ürün bulunamadı</p>
              <p className="text-xs text-neutral-400">Farklı bir arama veya kategori deneyin.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {grouped.map((group) => (
                <div key={group.id} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#000c2d] uppercase tracking-wide">{group.label}</h2>
                    <span className="text-xs font-bold text-neutral-400">{group.products.length} ürün</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {group.products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/admin/urunler/duzenle?id=${encodeURIComponent(p.id)}`}
                        className="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all"
                      >
                        <div className="relative aspect-square bg-neutral-50 flex items-center justify-center overflow-hidden">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <ImageOff className="w-6 h-6 text-neutral-300" />
                          )}
                          <div className="absolute inset-0 bg-[#000c2d]/0 group-hover:bg-[#000c2d]/5 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-md">
                              <Pencil className="w-3.5 h-3.5 text-[#000c2d]" />
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 p-3">
                          <span className="text-[10px] font-extrabold tracking-wide text-neutral-400 uppercase">{p.brand}</span>
                          <span className="text-xs font-bold text-[#000c2d] line-clamp-2 leading-snug">{p.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
