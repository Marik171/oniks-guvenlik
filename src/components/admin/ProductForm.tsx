"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productsService, Product, ProductCategory, ProductIconName } from "@/lib/productsService";

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "interkom", label: "IP İnterkom & Diafon" },
  { id: "kamera", label: "Güvenlik Kamerası" },
  { id: "uydu", label: "Merkezi Uydu & TV" },
  { id: "akilliev", label: "Akıllı Ev Otomasyonu" },
  { id: "turnike", label: "Turnike Sistemleri" },
  { id: "otopark", label: "Otopark & Bariyer" },
];

const ICONS: ProductIconName[] = [
  "Tv", "Video", "Smartphone", "Cpu", "Home", "Lock", "Shield", "Car", "Layers", "Sliders",
];

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initial?: Product;
}

export default function ProductForm({ mode, productId, initial }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [category, setCategory] = useState<ProductCategory>(initial?.category ?? "interkom");
  const [iconName, setIconName] = useState<ProductIconName>(initial?.iconName ?? "Shield");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [specs, setSpecs] = useState<string[]>(initial?.specs?.length ? initial.specs : [""]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const updateSpec = (i: number, value: string) => {
    setSpecs((prev) => prev.map((s, idx) => (idx === i ? value : s)));
  };
  const addSpec = () => setSpecs((prev) => [...prev, ""]);
  const removeSpec = (i: number) => setSpecs((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-6 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-600 uppercase">Ürün Adı</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-600 uppercase">Marka</label>
          <input
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-600 uppercase">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className="border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d]"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-600 uppercase">İkon</label>
          <select
            value={iconName}
            onChange={(e) => setIconName(e.target.value as ProductIconName)}
            className="border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d]"
          >
            {ICONS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-neutral-600 uppercase">Görsel Yolu</label>
        <input
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/images/products/ornek.webp"
          className="border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d]"
        />
        <p className="text-xs text-neutral-400">
          Görseli önce <code>public/images/products/</code> klasörüne ekleyip yolunu buraya yazın.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-neutral-600 uppercase">Açıklama</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-neutral-600 uppercase">Teknik Özellikler</label>
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={spec}
              onChange={(e) => updateSpec(i, e.target.value)}
              className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-[#000c2d] placeholder-neutral-400 outline-none focus:border-[#000c2d]"
            />
            <button
              type="button"
              onClick={() => removeSpec(i)}
              className="text-xs font-bold text-red-500 px-2"
            >
              Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpec}
          className="text-xs font-bold text-[#000c2d] self-start mt-1"
        >
          + Özellik Ekle
        </button>
      </div>

      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

      <div className="flex items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#000c2d] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#000c2d]/90 disabled:opacity-50"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm font-bold text-red-600 px-4 py-3 disabled:opacity-50"
          >
            {deleting ? "Siliniyor..." : "Ürünü Sil"}
          </button>
        )}
      </div>
    </form>
  );
}
