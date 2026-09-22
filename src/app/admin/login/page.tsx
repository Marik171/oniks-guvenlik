"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch {
      setError("E-posta veya şifre hatalı.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-xl font-bold text-[#000c2d]">Oniks Güvenlik Admin</h1>
          <p className="text-sm text-neutral-500">Ürün kataloğunu yönetmek için giriş yapın.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">E-posta</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#000c2d]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Şifre</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#000c2d]"
          />
        </div>

        {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#000c2d] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#000c2d]/90 transition-all disabled:opacity-50"
        >
          {submitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
