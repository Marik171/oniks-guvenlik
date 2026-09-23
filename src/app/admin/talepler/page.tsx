"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, Search, Trash2, User, Calendar, RefreshCw } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import { inboxService, Inquiry, InquiryStatus } from "@/lib/inboxService";

const SERVICE_LABELS: Record<string, string> = {
  diafon: "Görüntülü Diafon / İnterkom",
  kamera: "Güvenlik Kamera Sistemleri",
  akilliev: "Akıllı Ev Otomasyonu",
  turnike: "Turnike Geçiş Sistemleri",
  bariyer: "Bariyer & Plaka Tanıma / OGS",
  servis: "Teknik Servis & Bakım",
  diger: "Diğer Sorular",
};

const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "Yeni",
  in_progress: "İnceleniyor",
  replied: "Yanıtlandı",
  archived: "Arşiv",
};

const STATUS_DOT: Record<InquiryStatus, string> = {
  new: "bg-red-500",
  in_progress: "bg-amber-500",
  replied: "bg-emerald-500",
  archived: "bg-neutral-400",
};

export default function AdminInboxPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");
  const [query, setQuery] = useState("");

  const load = async (force = false) => {
    setLoading(true);
    try {
      const list = await inboxService.getInquiries(force);
      setInquiries(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: inquiries.length };
    for (const i of inquiries) c[i.status] = (c[i.status] ?? 0) + 1;
    return c;
  }, [inquiries]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return inquiries.filter((i) => {
      const matchesStatus = statusFilter === "all" || i.status === statusFilter;
      const matchesQuery =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.phone.includes(q) ||
        i.message.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [inquiries, statusFilter, query]);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    await inboxService.updateStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    await inboxService.deleteInquiry(id);
  };

  const tabs: { id: InquiryStatus | "all"; label: string }[] = [
    { id: "all", label: "Tümü" },
    { id: "new", label: "Yeni" },
    { id: "in_progress", label: "İnceleniyor" },
    { id: "replied", label: "Yanıtlandı" },
    { id: "archived", label: "Arşiv" },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[#f5f6f8]">
        <AdminHeader />
        <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#000c2d]">Gelen Talepler</h1>
              <p className="text-sm text-neutral-500 mt-1">
                {loading ? "Yükleniyor..." : `${inquiries.length} talep · ${filtered.length} gösteriliyor`}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex items-center w-full md:w-72">
                <Search className="w-4 h-4 absolute left-4 text-neutral-400 pointer-events-none" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="İsim, e-posta, telefon veya mesajda ara..."
                  className="w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d] focus:ring-2 focus:ring-[#000c2d]/10 bg-white transition-all"
                />
              </div>
              <button
                onClick={() => load(true)}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#000c2d] border border-neutral-200 px-4 py-3 rounded-xl hover:bg-white transition-colors"
                title="Listeyi Yenile"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Status tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setStatusFilter(t.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  statusFilter === t.id
                    ? "bg-[#000c2d] border-[#000c2d] text-white"
                    : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300"
                }`}
              >
                {t.label} ({counts[t.id] ?? 0})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-neutral-200/60 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-2 bg-white rounded-2xl border border-neutral-200">
              <Mail className="w-8 h-8 text-neutral-300" />
              <p className="text-sm font-bold text-neutral-500">Talep bulunamadı</p>
              <p className="text-xs text-neutral-400">Farklı bir arama veya filtre deneyin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((inq) => (
                <div
                  key={inq.id}
                  className={`flex flex-col gap-3 bg-white rounded-2xl border p-5 transition-all ${
                    inq.status === "new" ? "border-[#000c2d]/20 shadow-sm" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-[#000c2d]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#000c2d]">{inq.name}</p>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-semibold">
                          <Calendar className="w-3 h-3" />
                          {new Date(inq.createdAt).toLocaleString("tr-TR")}
                        </div>
                      </div>
                    </div>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                      className="text-[11px] font-bold border border-neutral-200 rounded-lg px-2 py-1.5 text-[#000c2d] outline-none cursor-pointer bg-white"
                    >
                      {(Object.keys(STATUS_LABELS) as InquiryStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[inq.status]}`} />
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
                      {SERVICE_LABELS[inq.service] || inq.service || "Belirtilmedi"}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">{inq.message}</p>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <a
                      href={`tel:${inq.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#000c2d] border border-neutral-200 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {inq.phone || "-"}
                    </a>
                    <a
                      href={`mailto:${inq.email}`}
                      className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#000c2d] border border-neutral-200 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {inq.email}
                    </a>
                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="ml-auto flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 border border-red-100 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
