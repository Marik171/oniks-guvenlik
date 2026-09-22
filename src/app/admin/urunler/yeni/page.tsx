"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-neutral-50">
        <AdminHeader />
        <main className="py-10">
          <h1 className="text-2xl font-bold text-[#000c2d] text-center mb-6">Yeni Ürün Ekle</h1>
          <ProductForm mode="create" />
        </main>
      </div>
    </ProtectedRoute>
  );
}
