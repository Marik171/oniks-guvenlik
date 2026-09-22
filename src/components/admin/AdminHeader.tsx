"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

export default function AdminHeader() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-bold text-[#000c2d]">
          Oniks Güvenlik — Ürün Yönetimi
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/urunler/yeni"
            className="text-xs font-bold bg-[#000c2d] text-white px-4 py-2 rounded-xl hover:bg-[#000c2d]/90"
          >
            + Yeni Ürün
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-neutral-500 hover:text-[#000c2d]"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </header>
  );
}
