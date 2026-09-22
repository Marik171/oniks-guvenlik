"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import { productsService, Product } from "@/lib/productsService";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    productsService
      .getAllProducts()
      .then((p) => setProducts(p.sort((a, b) => a.name.localeCompare(b.name))))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-neutral-50">
        <AdminHeader />
        <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-[#000c2d]">Ürün Kataloğu</h1>
              <p className="text-sm text-neutral-500">{products.length} ürün kayıtlı</p>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün veya marka ara..."
              className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d] min-w-[260px]"
            />
          </div>

          {loading ? (
            <p className="text-sm text-neutral-500">Yükleniyor...</p>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-left text-xs font-bold text-neutral-500 uppercase">
                    <th className="px-5 py-3">Ürün</th>
                    <th className="px-5 py-3">Marka</th>
                    <th className="px-5 py-3">Kategori</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-[#000c2d]">{p.name}</td>
                      <td className="px-5 py-3 text-neutral-500">{p.brand}</td>
                      <td className="px-5 py-3 text-neutral-500">{p.category}</td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/admin/urunler/duzenle?id=${encodeURIComponent(p.id)}`}
                          className="text-xs font-bold text-[#000c2d] hover:underline"
                        >
                          Düzenle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p className="text-sm text-neutral-400 px-5 py-8 text-center">Ürün bulunamadı.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
