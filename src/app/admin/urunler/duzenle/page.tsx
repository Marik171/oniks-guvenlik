"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { productsService, Product } from "@/lib/productsService";

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    productsService.getProduct(id).then((p) => {
      if (p) setProduct(p);
      else setNotFound(true);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-sm text-neutral-500 text-center py-10">Yükleniyor...</p>;
  if (notFound || !product) {
    return <p className="text-sm text-red-600 text-center py-10">Ürün bulunamadı.</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 mb-6 flex items-center gap-3">
        <Link
          href="/admin"
          className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-[#000c2d] hover:border-neutral-300 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-[#000c2d]">Ürünü Düzenle</h1>
      </div>
      <ProductForm mode="edit" productId={product.id} initial={product} />
    </>
  );
}

export default function EditProductPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[#f5f6f8]">
        <AdminHeader />
        <main className="py-8">
          <Suspense fallback={<p className="text-sm text-neutral-500 text-center py-10">Yükleniyor...</p>}>
            <EditProductContent />
          </Suspense>
        </main>
      </div>
    </ProtectedRoute>
  );
}
