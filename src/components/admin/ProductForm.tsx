"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Tv, Video, Smartphone, Cpu, Home, Lock, Shield, Car, Layers, Sliders,
  UploadCloud, ImageOff, X, Plus, Trash2, Loader2,
} from "lucide-react";
import { productsService, Product, ProductCategory, ProductIconName } from "@/lib/productsService";
import { compressImageToWebP } from "@/lib/imageUtils";

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "interkom", label: "IP İnterkom & Diafon" },
  { id: "kamera", label: "Güvenlik Kamerası" },
  { id: "uydu", label: "Merkezi Uydu & TV" },
  { id: "akilliev", label: "Akıllı Ev Otomasyonu" },
  { id: "turnike", label: "Turnike Sistemleri" },
  { id: "otopark", label: "Otopark & Bariyer" },
];

const ICONS: { id: ProductIconName; Icon: typeof Shield }[] = [
  { id: "Shield", Icon: Shield },
  { id: "Tv", Icon: Tv },
  { id: "Video", Icon: Video },
  { id: "Smartphone", Icon: Smartphone },
  { id: "Cpu", Icon: Cpu },
  { id: "Home", Icon: Home },
  { id: "Lock", Icon: Lock },
  { id: "Car", Icon: Car },
  { id: "Layers", Icon: Layers },
  { id: "Sliders", Icon: Sliders },
];

const inputClass =
  "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d] focus:ring-2 focus:ring-[#000c2d]/10 transition-all bg-white";

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initial?: Product;
}

export default function ProductForm({ mode, productId, initial }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [category, setCategory] = useState<ProductCategory>(initial?.category ?? "interkom");
  const [iconName, setIconName] = useState<ProductIconName>(initial?.iconName ?? "Shield");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [specs, setSpecs] = useState<string[]>(initial?.specs?.length ? initial.specs : [""]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const updateSpec = (i: number, value: string) => {
    setSpecs((prev) => prev.map((s, idx) => (idx === i ? value : s)));
  };
  const addSpec = () => setSpecs((prev) => [...prev, ""]);
  const removeSpec = (i: number) => setSpecs((prev) => prev.filter((_, idx) => idx !== i));

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir görsel dosyası seçin.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const dataUrl = await compressImageToWebP(file);
      setImage(dataUrl);
    } catch {
      setError("Görsel işlenirken bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!image) {
      setError("Lütfen bir ürün görseli yükleyin.");
      return;
    }
    setSaving(true);
    try {
      const cleanSpecs = specs.map((s) => s.trim()).filter(Boolean);
      const product = { name, brand, category, iconName, description, image, specs: cleanSpecs };
      if (mode === "create") {
        await productsService.createProduct(product, `${brand}-${name}`);
      } else if (productId) {
        await productsService.updateProduct(productId, product);
      }
      router.push("/admin");
    } catch {
      setError("Kaydedilirken bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!productId) return;
    if (!confirm(`"${name}" ürününü silmek istediğinize emin misiniz?`)) return;
    setDeleting(true);
    try {
      await productsService.deleteProduct(productId);
      router.push("/admin");
    } catch {
      setError("Silinirken bir hata oluştu.");
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Image upload column */}
        <div className="flex flex-col gap-3 lg:sticky lg:top-6">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Ürün Görseli</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`relative aspect-square w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden bg-neutral-50 transition-colors ${
              dragOver ? "border-[#000c2d] bg-[#000c2d]/5" : "border-neutral-300 hover:border-neutral-400"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-neutral-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs font-semibold">İşleniyor...</span>
              </div>
            ) : image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Ürün görseli" className="w-full h-full object-contain p-4" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setImage(""); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-red-600"
                  aria-label="Görseli kaldır"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-neutral-400 px-6 text-center">
                <UploadCloud className="w-8 h-8" />
                <span className="text-xs font-semibold">Görsel yüklemek için tıklayın veya sürükleyin</span>
                <span className="text-[10px] text-neutral-300">PNG, JPG, WEBP</span>
              </div>
            )}
          </div>
          {!image && !uploading && (
            <div className="flex items-center gap-2 text-[11px] text-amber-600 font-semibold px-1">
              <ImageOff className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Kaydetmeden önce bir görsel yükleyin.</span>
            </div>
          )}
        </div>

        {/* Fields column */}
        <div className="flex flex-col gap-5 bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Ürün Adı</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Marka</label>
              <input required value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Kategori</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    category === c.id
                      ? "bg-[#000c2d] border-[#000c2d] text-white"
                      : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">İkon</label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(({ id, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setIconName(id)}
                  title={id}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    iconName === id
                      ? "bg-[#000c2d] border-[#000c2d] text-white"
                      : "bg-white border-neutral-200 text-neutral-400 hover:border-neutral-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Açıklama</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Teknik Özellikler</label>
            <div className="flex flex-col gap-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={spec}
                    onChange={(e) => updateSpec(i, e.target.value)}
                    placeholder={`Özellik ${i + 1}`}
                    className={`${inputClass} py-2.5`}
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    aria-label="Özelliği sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSpec}
              className="self-start flex items-center gap-1.5 text-xs font-bold text-[#000c2d] mt-1 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Özellik Ekle
            </button>
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2 border-t border-neutral-100 mt-2">
            <button
              type="submit"
              disabled={saving || uploading}
              className="bg-[#000c2d] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#000c2d]/90 disabled:opacity-50 transition-all"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            {mode === "edit" && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm font-bold text-red-600 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
              >
                {deleting ? "Siliniyor..." : "Ürünü Sil"}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
