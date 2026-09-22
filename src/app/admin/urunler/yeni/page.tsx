"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[#f5f6f8]">
        <AdminHeader />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-6 mb-6 flex items-center gap-3">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-[#000c2d] hover:border-neutral-300 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold text-[#000c2d]">Yeni Ürün Ekle</h1>
          </div>
          <ProductForm mode="create" />
        </main>
      </div>
    </ProtectedRoute>
  );
}
