"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
      <h1 className="text-2xl font-bold text-[#000c2d] text-center mb-6">Ürünü Düzenle</h1>
      <ProductForm mode="edit" productId={product.id} initial={product} />
    </>
  );
}

export default function EditProductPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-neutral-50">
        <AdminHeader />
        <main className="py-10">
          <Suspense fallback={<p className="text-sm text-neutral-500 text-center py-10">Yükleniyor...</p>}>
            <EditProductContent />
          </Suspense>
        </main>
      </div>
    </ProtectedRoute>
  );
}
