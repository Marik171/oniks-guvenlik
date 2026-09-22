"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, Eye, EyeOff, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative z-0 min-h-screen w-full flex items-center justify-center bg-[#f5f6f8] px-6 py-12 isolate">
      {/* Decorative background — purely visual, never intercepts clicks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#000c2d]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#000c2d]/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col gap-6">
        {/* Brand mark */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#000c2d] flex items-center justify-center shadow-lg shadow-[#000c2d]/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#000c2d]">Oniks Güvenlik</h1>
            <p className="text-sm text-neutral-500">Ürün Kataloğu Yönetim Paneli</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="relative z-10 w-full bg-white rounded-3xl shadow-xl shadow-black/5 border border-neutral-200/80 p-8 flex flex-col gap-5"
        >
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="admin-email" className="text-xs font-bold text-neutral-600 uppercase tracking-wide">
              E-posta
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-4 text-neutral-400 pointer-events-none" />
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@oniksguvenlik.com"
                className="relative z-10 w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#000c2d] focus:ring-2 focus:ring-[#000c2d]/10 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="admin-password" className="text-xs font-bold text-neutral-600 uppercase tracking-wide">
              Şifre
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-4 text-neutral-400 pointer-events-none" />
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="relative z-10 w-full border border-neutral-200 rounded-xl pl-11 pr-11 py-3 text-sm outline-none focus:border-[#000c2d] focus:ring-2 focus:ring-[#000c2d]/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 z-10 p-1.5 text-neutral-400 hover:text-[#000c2d] transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="relative z-10 w-full bg-[#000c2d] text-white font-bold text-sm py-3.5 rounded-xl hover:bg-[#000c2d]/90 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Giriş yapılıyor...</span>
              </>
            ) : (
              <>
                <span>Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-400">
          Bu panel yalnızca yetkilendirilmiş yöneticiler içindir.
        </p>
      </div>
    </div>
  );
}
