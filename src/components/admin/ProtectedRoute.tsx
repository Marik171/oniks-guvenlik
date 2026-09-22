"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 text-[#000c2d]">
        <div className="w-8 h-8 rounded-full border-4 border-[#000c2d]/20 border-t-[#000c2d] animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
