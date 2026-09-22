"use client";

import { AuthProvider } from "@/lib/authContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
