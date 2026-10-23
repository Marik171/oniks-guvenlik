"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GripVertical, ImageOff, Pencil, Search, X } from "lucide-react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import { productsService, Product } from "@/lib/productsService";
import { getCategoryLabel, compareBrands, getBrandLabel } from "@/lib/catalogMeta";

function SortableProductCard({ p, draggable }: { p: Product; draggable: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: p.id,
    disabled: !draggable,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative ${isDragging ? "z-10 opacity-80 shadow-xl" : ""}`}
    >
      {draggable && (
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`${p.name} ürününü sürükle`}
          className="absolute top-2 left-2 z-10 p-1.5 rounded-lg bg-white/90 border border-neutral-200 shadow-sm text-neutral-500 hover:text-[#000c2d] cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      )}
      <Link
        href={`/admin/urunler/duzenle?id=${encodeURIComponent(p.id)}`}
        draggable={false}
        className="group flex flex-col h-full bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all"
      >
        <div className="relative aspect-square bg-neutral-50 flex items-center justify-center overflow-hidden">
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.image}
              alt={p.name}
              draggable={false}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <ImageOff className="w-6 h-6 text-neutral-300" />
          )}
          <div className="absolute inset-0 bg-[#000c2d]/0 group-hover:bg-[#000c2d]/5 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-md">
              <Pencil className="w-3.5 h-3.5 text-[#000c2d]" />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 p-3">
          <span className="text-[10px] font-extrabold tracking-wide text-neutral-400 uppercase">{p.brand}</span>
          <span className="text-xs font-bold text-[#000c2d] line-clamp-2 leading-snug">{p.name}</span>
        </div>
      </Link>
    </div>
  );
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    productsService
      .getAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Same filter model as the live catalog: brands from the products, and only
  // categories that exist under the selected brand.
  const brands = useMemo(() => {
    const distinct = Array.from(new Set(products.map((p) => p.brand))).sort(compareBrands);
    return [{ id: "all", label: "Tüm Markalar" }, ...distinct.map((id) => ({ id, label: getBrandLabel(id) }))];
  }, [products]);

  const categories = useMemo(() => {
    const scoped = selectedBrand === "all" ? products : products.filter((p) => p.brand === selectedBrand);
    const distinct = Array.from(new Set(scoped.map((p) => p.category)));
    distinct.sort((a, b) => getCategoryLabel(a).localeCompare(getCategoryLabel(b)));
    return [{ id: "all", label: "Tüm Ürünler" }, ...distinct.map((id) => ({ id, label: getCategoryLabel(id) }))];
  }, [products, selectedBrand]);

  const activeCategory = categories.some((c) => c.id === selectedCategory) ? selectedCategory : "all";

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((p) => {
      const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand;
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesBrand && matchesCategory && matchesQuery;
    });
  }, [products, selectedBrand, activeCategory, query]);

  // One section per brand, in order of first appearance — same as the live page.
  const brandSections = useMemo(() => {
    const groups = new Map<string, Product[]>();
    for (const p of filtered) {
      const list = groups.get(p.brand) ?? [];
      list.push(p);
      groups.set(p.brand, list);
    }
    return Array.from(groups, ([brand, items]) => ({ brand, products: items }));
  }, [filtered]);

  // Dragging reorders the products visible in one brand section; the full list
  // keeps one global order, so they are re-slotted into the positions they already occupy.
  const handleDragEnd = async (visible: Product[], event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = new Set(visible.map((p) => p.id));
    const slots: number[] = [];
    products.forEach((p, i) => {
      if (ids.has(p.id)) slots.push(i);
    });
    const group = slots.map((i) => products[i]);
    const from = group.findIndex((p) => p.id === active.id);
    const to = group.findIndex((p) => p.id === over.id);
    if (from < 0 || to < 0) return;

    const reordered = arrayMove(group, from, to);
    const next = [...products];
    slots.forEach((slot, i) => {
      next[slot] = reordered[i];
    });

    const previous = products;
    setProducts(next);
    setSaveState("saving");
    try {
      await productsService.reorderProducts(next.map((p) => p.id));
      setSaveState("saved");
    } catch {
      setProducts(previous);
      setSaveState("error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[#f5f6f8]">
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#000c2d]">Ürün Kataloğu</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {loading ? "Yükleniyor..." : `${products.length} ürün · ${filtered.length} gösteriliyor`}
            </p>
            <p className="text-xs font-semibold text-neutral-500 mt-2" aria-live="polite">
              {query
                ? "Sıralamayı değiştirmek için aramayı temizleyin."
                : saveState === "saving"
                  ? "Sıralama kaydediliyor..."
                  : saveState === "saved"
                    ? "Sıralama kaydedildi. Sitede bir sonraki yayında görünür."
                    : saveState === "error"
                      ? "Sıralama kaydedilemedi, tekrar deneyin."
                      : "Ürünleri ⠿ tutamacından sürükleyerek sıralayabilirsiniz."}
            </p>
          </div>

          {/* Filters card — mirrors the live catalog */}
          <div className="w-full bg-[#f1f1f1] rounded-2xl p-4 md:p-5 flex flex-col gap-3 text-left">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-extrabold tracking-widest text-[#000c2d] uppercase">Marka Seçimi</span>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer border ${
                      selectedBrand === brand.id
                        ? "bg-[#000c2d] border-[#000c2d] text-white shadow-sm"
                        : "bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {brand.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-end justify-between border-t border-neutral-200/20 pt-3">
              <div className="flex flex-col gap-1.5 w-full lg:w-auto">
                <span className="text-[10px] font-extrabold tracking-widest text-[#000c2d] uppercase">Kategori</span>
                <div className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none max-w-full">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        activeCategory === cat.id
                          ? "bg-[#000c2d]/10 text-[#000c2d] border border-[#000c2d]/25"
                          : "bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 min-w-[260px] md:min-w-[300px]">
                <span className="text-[10px] font-extrabold tracking-widest text-[#000c2d] uppercase">Arama</span>
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 absolute left-3.5 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Ürün, model veya özellik ara..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-white border border-neutral-200 focus:border-[#000c2d] rounded-lg py-2 pl-10 pr-9 text-xs text-[#000c2d] placeholder-neutral-400 font-semibold outline-none transition-all duration-200"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 p-1 hover:bg-neutral-200/50 rounded-full text-neutral-400 hover:text-neutral-600"
                      aria-label="Aramayı temizle"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Brand sections, same grouping as the live page */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-neutral-200/60 animate-pulse" />
              ))}
            </div>
          ) : brandSections.length === 0 ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-2 bg-white rounded-2xl border border-neutral-200">
              <p className="text-sm font-bold text-neutral-500">Ürün bulunamadı</p>
              <p className="text-xs text-neutral-400">Farklı bir arama veya kategori deneyin.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {brandSections.map((section) => (
                <div key={section.brand} className="flex flex-col gap-6 border-t border-neutral-200 pt-10 first:border-0 first:pt-0">
                  <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-[#000c2d]">{getBrandLabel(section.brand)}</h2>
                    <span className="text-xs font-bold bg-white text-neutral-600 px-3.5 py-1.5 rounded-full">
                      {section.products.length} Ürün
                    </span>
                  </div>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => handleDragEnd(section.products, e)}
                  >
                    <SortableContext items={section.products.map((p) => p.id)} strategy={rectSortingStrategy}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {section.products.map((p) => (
                          <SortableProductCard key={p.id} p={p} draggable={!query} />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
