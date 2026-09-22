"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Tv,
  Video,
  Smartphone,
  Cpu,
  Home,
  Lock,
  Shield,
  Car,
  Check,
  ArrowRight,
  Info,
  Layers,
  Sliders,
  PhoneCall,
  MapPin,
  Clock
} from "lucide-react";
import type { Product } from "@/lib/productsService";

const CATEGORIES = [
  { id: "all", label: "Tüm Ürünler" },
  { id: "interkom", label: "IP İnterkom & Diafon" },
  { id: "kamera", label: "Güvenlik Kamerası" },
  { id: "uydu", label: "Merkezi Uydu & TV" },
  { id: "akilliev", label: "Akıllı Ev Otomasyonu" },
  { id: "turnike", label: "Turnike Sistemleri" },
  { id: "otopark", label: "Otopark & Bariyer" },
];

function ProductIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case "Tv": return <Tv className={className} />;
    case "Video": return <Video className={className} />;
    case "Smartphone": return <Smartphone className={className} />;
    case "Cpu": return <Cpu className={className} />;
    case "Home": return <Home className={className} />;
    case "Lock": return <Lock className={className} />;
    case "Shield": return <Shield className={className} />;
    case "Car": return <Car className={className} />;
    case "Layers": return <Layers className={className} />;
    case "Sliders": return <Sliders className={className} />;
    default: return <Shield className={className} />;
  }
}

const BRAND_TAGLINES: { [key: string]: { tagline: string; description: string } } = {
  Teknoline: {
    tagline: "Tek Kablo İnterkom Altyapısı & Merkezi Uydu Dağıtım Sistemleri",
    description: "Yerli mühendislik gücü ile geliştirilen, tek kablo (TBUS) IP interkom sistemleri, merkezi fiber ve koaksiyel uydu dağıtım çözümleri."
  },
  Fanvil: {
    tagline: "Küresel SIP Standartlarında Akıllı IP İnterkom & Telefonlar",
    description: "Android ve Linux işletim sistemli, yapay zeka yüz tanıma özellikli, küresel SIP 2.0 ve ONVIF protokollerine uyumlu profesyonel IP interkom donanımları."
  },
  Audio: {
    tagline: "Türkiye'nin Lider Görüntülü Diafon & Apartman Çözümleri",
    description: "Sıva altı ve sıva üstü lüks dokunmatik daire içi monitörler, apartman zil panelleri ve geniş yetkili servis ağı güvencesi."
  },
  "Nexus Visio": {
    tagline: "Ekonomik, Dijital ve Vidasız Kolay Kurulum Diafon Modelleri",
    description: "Soketli montaj altyapısı, anti-bloke hat koruması ve dayanıklı şifreli/kartlı apartman zil panelleri içeren bütçe dostu diafon sistemleri."
  },
  Makim: {
    tagline: "Yerli Üretim Turnike ve Geçiş Kontrol Sistemleri",
    description: "304 paslanmaz çelik gövdeli tripod, yarım boy, boy, hızlı geçiş ve VIP turnike modelleriyle her ölçekte yaya geçiş kontrolü."
  },
  "Diğer Çözümler": {
    tagline: "Turnike, Bariyer, Plaka Tanıma ve Otopark Kontrol Donanımları",
    description: "Siteniz ve iş merkeziniz için geçiş kontrolü ve çevre güvenliğini sağlayan otopark bariyerleri, plaka tanıma sistemleri ve turnikeler."
  }
};

const BRAND_FILTERS = [
  { id: "all", label: "Tüm Markalar" },
  { id: "Teknoline", label: "Teknoline" },
  { id: "Fanvil", label: "Fanvil" },
  { id: "Audio", label: "Audio" },
  { id: "Nexus Visio", label: "Nexus Visio" },
  { id: "Makim", label: "Makim" },
  { id: "Hikvision", label: "Hikvision" },
  { id: "Oniks", label: "Diğer Çözümler" }
];


function ServicesContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Sync with URL query parameters
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
    const categoryParam = searchParams.get("category");
    if (categoryParam && CATEGORIES.some((c) => c.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    const productParam = searchParams.get("product");
    if (productParam) {
      const found = products.find((p) => p.id === productParam);
      if (found) {
        setActiveModalProduct(found);
      }
    }
  }, [searchParams]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Brand filter matching
      let matchesBrand = true;
      if (selectedBrand !== "all") {
        if (selectedBrand === "Oniks") {
          matchesBrand = product.brand === "Oniks" || product.brand === "MAS" || product.brand === "Multitek";
        } else {
          matchesBrand = product.brand === selectedBrand;
        }
      }

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesBrand && matchesCategory && matchesSearch;
    });
  }, [selectedBrand, selectedCategory, searchQuery]);

  // Group products by brand sections
  const brandSections = useMemo(() => {
    const groups: { [key: string]: Product[] } = {
      Teknoline: [],
      Fanvil: [],
      Audio: [],
      "Nexus Visio": [],
      Makim: [],
      Hikvision: [],
      "Diğer Çözümler": []
    };

    filteredProducts.forEach((product) => {
      if (product.brand === "Teknoline") {
        groups.Teknoline.push(product);
      } else if (product.brand === "Fanvil") {
        groups.Fanvil.push(product);
      } else if (product.brand === "Audio") {
        groups.Audio.push(product);
      } else if (product.brand === "Nexus Visio") {
        groups["Nexus Visio"].push(product);
      } else if (product.brand === "Makim") {
        groups.Makim.push(product);
      } else if (product.brand === "Hikvision") {
        groups.Hikvision.push(product);
      } else {
        groups["Diğer Çözümler"].push(product);
      }
    });

    return groups;
  }, [filteredProducts]);

  return (
    <div className="min-h-screen w-full bg-white text-securus-dark font-sans selection:bg-[#000c2d]/10 selection:text-[#000c2d]">
      
      {/* Light Navbar Header */}
      <Navbar variant="light" />

      {/* Main Container */}
      <main className="w-full pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Page Title & Tagline Banner */}
        <div className="flex flex-col gap-6 max-w-4xl text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
          >
            <span className="w-1.5 h-1.5 bg-securus-dark rounded-full" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Ürün & Ekipman Kataloğumuz
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#000c2d] leading-[1.15]"
          >
            Profesyonel Donanımlar & <br />
            <span className="font-serif italic font-normal text-[#000c2d]">
              Entegre Güvenlik Teknolojileri
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-neutral-500 font-medium text-base md:text-lg leading-relaxed max-w-3xl mt-2"
          >
            Görüntülü diafonda MAS, Multitek ve Audio yetkili servis ve bayi güvencesi; IP interkomda dünya standartlarında Fanvil çözümleri. Siteniz, apartmanınız veya villanız için en uygun donanımları keşfedin.
          </motion.p>
        </div>

        {/* Multi-Dimensional Filters Card */}
        <div className="w-full bg-[#f1f1f1] rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 mt-4 text-left">
          
          {/* Row 1: Brand Filters */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-extrabold tracking-widest text-[#000c2d] uppercase">Marka Seçimi</span>
            <div className="flex flex-wrap gap-2">
              {BRAND_FILTERS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer border ${
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

          {/* Row 2: Category & Search */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between border-t border-neutral-200/20 pt-6">
            
            {/* Category Tabs Scroll Wrapper */}
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <span className="text-[10px] font-extrabold tracking-widest text-[#000c2d] uppercase">Kategori</span>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none max-w-full">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-[#000c2d]/10 text-[#000c2d] border border-[#000c2d]/25"
                        : "bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Box Input */}
            <div className="flex flex-col gap-3 min-w-[280px] md:min-w-[340px]">
              <span className="text-[10px] font-extrabold tracking-widest text-[#000c2d] uppercase">Arama</span>
              <div className="relative flex items-center">
                <Search className="w-5 h-5 absolute left-4 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ürün, model veya özellik ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-neutral-200 focus:border-[#000c2d] focus:bg-white rounded-2xl py-3 pl-12 pr-10 text-sm text-[#000c2d] placeholder-neutral-400 font-semibold outline-none transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 p-1 hover:bg-neutral-200/50 rounded-full text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Brand Grouped Sections Layout */}
        <div className="w-full flex flex-col gap-20 mt-8">
          {Object.entries(brandSections)
            .filter(([brandName, products]) => {
              // Only show sections that have matching products
              if (products.length === 0) return false;
              // If a specific brand is selected, only show that brand
              if (selectedBrand !== "all") {
                if (selectedBrand === "Oniks") {
                  return brandName === "Diğer Çözümler";
                }
                return brandName === selectedBrand;
              }
              return true;
            })
            .map(([brandName, products]) => {
              const info = BRAND_TAGLINES[brandName] || {
                tagline: "Geçiş Kontrol ve Çevre Güvenliği Çözümleri",
                description: "Siteniz, apartmanınız veya iş merkeziniz için tamamlayıcı güvenlik donanımları, turnikeler, bariyerler ve plaka tanıma sistemleri."
              };
              
              return (
                <div key={brandName} className="flex flex-col gap-8 border-t border-neutral-100 pt-12 first:border-0 first:pt-0">
                  
                  {/* Brand Section Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left border-b border-neutral-100 pb-6 mb-2">
                    <div className="flex flex-col gap-2 max-w-3xl">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#000c2d]">
                        {brandName}
                      </h2>
                      <p className="text-sm font-semibold text-neutral-400">
                        {info.tagline}
                      </p>
                      <p className="text-neutral-500 text-xs font-medium leading-relaxed mt-1">
                        {info.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-[#f1f1f1] text-neutral-600 px-3.5 py-1.5 rounded-full w-fit">
                      {products.length} Ürün Listeleniyor
                    </span>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        whileHover={{ y: -8, scale: 1.015 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        onClick={() => setActiveModalProduct(product)}
                        className="flex flex-col bg-[#f1f1f1] rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-md cursor-pointer text-left"
                      >
                        {/* Product Image Cover */}
                        <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6 border-b border-neutral-200/10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Brand Overlay Tag */}
                          <span className="absolute top-4 left-4 text-[9px] font-extrabold tracking-widest bg-[#000c2d] text-white px-3 py-1 rounded-full uppercase shadow-sm z-10">
                            {product.brand}
                          </span>
                        </div>

                        {/* Content area */}
                        <div className="flex flex-col gap-3 p-6 md:p-8 flex-grow">
                          <span className="text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase leading-none">
                            {CATEGORIES.find(c => c.id === product.category)?.label}
                          </span>
                          
                          <h3 className="text-lg md:text-xl font-bold text-[#000c2d] leading-snug line-clamp-2">
                            {product.name}
                          </h3>
                          
                          <p className="text-sm text-neutral-500 font-medium leading-relaxed line-clamp-3">
                            {product.description}
                          </p>

                          {/* Footer action link */}
                          <div className="flex items-center gap-2 mt-auto pt-4 text-xs font-bold text-[#000c2d] border-t border-neutral-200/30 group-hover:gap-3 transition-all duration-200">
                            <span>Teknik Detayları İncele</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              );
            })}

          {filteredProducts.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-4 bg-neutral-50 rounded-[2rem] border border-neutral-100">
              <span className="text-4xl">🔍</span>
              <h3 className="text-xl font-bold text-[#000c2d]">
                Aradığınız Ürün Bulunamadı
              </h3>
              <p className="text-neutral-500 font-semibold max-w-sm">
                Farklı anahtar kelimeler aramayı veya filtreleri sıfırlamayı deneyebilirsiniz.
              </p>
            </div>
          )}
        </div>

        {/* Big Premium CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#000c2d] rounded-[2rem] px-6 md:px-16 py-16 md:py-20 text-white flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden shadow-xl"
        >
          {/* Radial backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

          <span className="text-[10px] md:text-xs font-extrabold tracking-widest bg-white/10 px-4 py-1.5 rounded-full uppercase leading-none">
            Danışmanlık & Keşif
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
            Projeniz İçin Hangi Ekipmanın <br className="hidden md:inline" />
            <span className="font-serif italic font-normal text-white">Doğru Olduğundan Emin Değil misiniz?</span>
          </h2>
          <p className="text-neutral-300 font-medium text-sm md:text-base max-w-2xl">
            Siteniz veya iş merkeziniz için diafon, kamera, turnike veya bariyer ihtiyaçlarını yerinde ücretsiz tespit edelim. Size en uygun marka ve modellerle teklif hazırlayalım.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/contact"
              className="bg-white text-[#000c2d] hover:bg-neutral-100 text-sm md:text-base font-bold px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Ücretsiz Keşif Alın
            </Link>
            <a
              href="tel:+902128721170"
              className="inline-flex items-center gap-3 text-white border border-white/20 hover:bg-white/5 text-sm md:text-base font-bold px-8 py-4 rounded-xl transition-all duration-200 active:scale-95"
            >
              <PhoneCall className="w-5 h-5" />
              <span>0212 872 11 70</span>
            </a>
          </div>
        </motion.div>

      </main>

      {/* Product Details Modal (Premium popup drawer style) */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProduct(null)}
              className="fixed inset-0 bg-[#000c2d]/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl relative overflow-hidden z-10 text-left border border-neutral-100 flex flex-col max-h-[90vh]"
            >
              {/* Cover Image Header */}
              <div className="relative aspect-[2] w-full bg-[#f1f1f1] overflow-hidden border-b border-neutral-100 flex-shrink-0">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  className="w-full h-full object-contain p-6"
                />
                {/* Floating Brand Badge */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
                  <span className="text-[10px] md:text-xs font-extrabold tracking-widest bg-[#000c2d] text-white px-3.5 py-1.5 rounded-full uppercase shadow-md w-fit leading-none">
                    {activeModalProduct.brand}
                  </span>
                </div>
                {/* Gradient overlays for text visibility and premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

                {/* Floating Close Button */}
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-md z-20"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Modal Body (Scrollable content) */}
              <div className="p-8 overflow-y-auto flex flex-col gap-6 text-securus-dark">
                
                {/* Product category & title */}
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-[10px] md:text-xs font-extrabold tracking-widest text-[#000c2d]/65 uppercase leading-none">
                    {CATEGORIES.find(c => c.id === activeModalProduct.category)?.label}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#000c2d] mt-1 leading-snug">
                    {activeModalProduct.name}
                  </h2>
                </div>

                <hr className="border-neutral-100" />
                {/* Description */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-extrabold tracking-widest text-[#000c2d] uppercase">Açıklama</h4>
                  <p className="text-neutral-600 font-semibold text-sm md:text-base leading-relaxed">
                    {activeModalProduct.description}
                  </p>
                </div>

                {/* Technical Specs List */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-extrabold tracking-widest text-[#000c2d] uppercase">Teknik Özellikler</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    {activeModalProduct.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-3 text-neutral-600 text-xs md:text-sm font-semibold">
                        <div className="w-5 h-5 rounded-full bg-[#f1f1f1] flex items-center justify-center text-[#000c2d] flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partnership Servis Badge note */}
                {(activeModalProduct.brand === "MAS" || activeModalProduct.brand === "Audio" || activeModalProduct.brand === "Multitek") && (
                  <div className="bg-[#f1f1f1] rounded-2xl p-4 flex items-start gap-3 mt-2">
                    <Info className="w-5 h-5 text-[#000c2d] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                      Oniks Güvenlik, <strong>{activeModalProduct.brand}</strong> görüntülü interkom sistemlerinin yetkili servis ve kurulum bayisidir. Montaj sonrasında da parça garantili destek ve servis hizmeti verilmektedir.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="border-t border-neutral-100 p-6 bg-[#f1f1f1] flex items-center justify-between gap-4 mt-auto">
                <span className="text-xs text-neutral-400 font-semibold hidden sm:inline">
                  İstanbul Avrupa Yakası Ücretsiz Keşif
                </span>
                <Link
                  href={`/contact?service=${activeModalProduct.category}&product=${encodeURIComponent(activeModalProduct.name)}`}
                  className="bg-[#000c2d] text-white text-xs md:text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-[#000c2d]/90 transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer ml-auto"
                >
                  <span>Teklif & Keşif Talebi Al</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer component */}
      <Footer />
    </div>
  );
}


export default function ServicesPageClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-[#000c2d] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#000c2d]/20 border-t-[#000c2d] animate-spin" />
        <span className="text-sm font-bold tracking-wider opacity-75">Katalog Yükleniyor...</span>
      </div>
    }>
      <ServicesContent products={products} />
    </Suspense>
  );
}
