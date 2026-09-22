"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function AdminHeader() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#000c2d] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[#000c2d] text-sm">Oniks Güvenlik</span>
            <span className="text-[10px] text-neutral-400 font-semibold">Ürün Yönetimi</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {pathname !== "/admin/urunler/yeni" && (
            <Link
              href="/admin/urunler/yeni"
              className="flex items-center gap-1.5 text-xs font-bold bg-[#000c2d] text-white px-4 py-2.5 rounded-xl hover:bg-[#000c2d]/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Yeni Ürün
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#000c2d] px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </header>
  );
}
