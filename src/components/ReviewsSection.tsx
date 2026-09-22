"use client";

import React, { useMemo } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
];

const AWARDS = [
  { name: "Audio", year: "2024", bottom: "ÇÖZÜM ORTAĞI" },
  { name: "Multitek", year: "2023", bottom: "YETKİLİ BAYİ" },
  { name: "MAS", year: "2022", bottom: "YETKİLİ SERVİS" },
  { name: "ISO 9001", year: "2026", bottom: "KALİTE BELGESİ" },
];

export default function ReviewsSection() {
  const reviews = useMemo(() => [
    {
      type: "text",
      name: "Savaş Vatan",
      role: "Apartman Yöneticisi / Sakini",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80",
      quote: "Apartmanımızın diafon sistemlerini yaptırdık. Hem elemanları hem kendisi çok anlayışlı, çok kaliteli bir firma.",
      stars: 5,
    },
    {
      type: "text",
      name: "Bülent Yüzgen",
      role: "Bina Sahibi",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80",
      quote: "Çok güler yüzlü ve bilgili bir firma.",
      stars: 5,
    },
    {
      type: "text",
      name: "Vedat Afacan",
      role: "Apartman Yöneticisi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      quote: "Çok profesyonel bir firma, Özgür Bey konusunda çok deneyimli, diyafon sorunumuzu çok kısa sürede çözdüler.",
      stars: 5,
    },
    {
      type: "text",
      name: "Aliekber Zeytunlu",
      role: "İşletme Sahibi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      quote: "Çok kaliteli ve güvenilir bir firma; kaliteli ürünler, kaliteli işçilik. Her şey için teşekkürler.",
      stars: 5,
    },
    {
      type: "text",
      name: "Hacı Muhamed Gurbanov",
      role: "Daire Sakini",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&h=100&q=80",
      quote: "Çok güzel, teşekkürler!",
      stars: 5,
    },
    {
      type: "text",
      name: "Sercan Birsen",
      role: "Ark Residence Yöneticisi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      quote: "Ark Residence bina yöneticisi olarak tüm binamızın diyafon ve kamera sistemlerini yenilettik. Çok memnun kaldık, tavsiye ederiz.",
      stars: 5,
    },
    {
      type: "text",
      name: "Mehmet Karakuş",
      role: "Daire Sakini",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
      quote: "Aldığımız hizmetten çok memnun kaldım. Uygun fiyat ve güler yüzlü hizmet sundular. Teşekkürler.",
      stars: 5,
    },
  ], []);

  const duplicatedReviews = useMemo(() => [...reviews, ...reviews], [reviews]);

  return (
    <section className="bg-white py-16 md:py-28 px-4 md:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto bg-[#000c2d] rounded-[3rem] px-6 md:px-16 py-16 md:py-24 text-white flex flex-col gap-24 relative shadow-2xl">
        
        {/* Background glow lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent)] pointer-events-none rounded-[3rem]" />

        {/* ---------------- PART 1: Achievements Section ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Rating Badges Pill */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full w-fit">
              <div className="flex -space-x-1.5">
                {AVATARS.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Customer Avatar ${i + 1}`}
                    className="w-5 h-5 rounded-full border border-[#000c2d] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="w-px h-3.5 bg-white/20" />
              <span className="text-xs font-semibold text-neutral-300">
                Binlerce Mutlu Müşteri
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.12]">
              Entegre Markalar & <br />
              <span className="font-serif italic font-normal text-white">
                Yetkili Teknik Çözümler
              </span>
            </h2>

            {/* Emblem Award Badges row */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4 max-w-[500px]">
              {AWARDS.map((award, i) => (
                <div
                  key={award.name}
                  className="bg-white text-securus-dark rounded-2xl p-3 flex flex-col items-center justify-between aspect-[1/1.3] text-center shadow-md relative hover:scale-105 transition-transform duration-300"
                >
                  {/* Top-Right orange dot decoration */}
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">
                    G
                  </span>
                  
                  {/* Award Text Header */}
                  <div className="flex flex-col">
                    <span className="text-[8px] sm:text-[9px] font-extrabold tracking-wide uppercase leading-tight">
                      {award.name}
                    </span>
                    <span className="text-[7px] text-neutral-400 font-semibold leading-none mt-0.5">
                      {award.year}
                    </span>
                  </div>

                  {/* SVG Wreath Logo */}
                  <svg className="w-8 h-8 text-[#000c2d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
                    <path d="M7 11c1-1.5 2-2 5-2s4 .5 5 2M8 14c.5-1 1-1.5 4-1.5s3.5.5 4 1.5" strokeLinecap="round" />
                    <polygon points="12,7 13.5,10.5 17,10.5 14,12.5 15,16 12,14 9,16 10,12.5 7,10.5 10.5,10.5" className="fill-[#000c2d]" />
                  </svg>

                  {/* Award Footer Badge */}
                  <span className="text-[7px] sm:text-[8px] font-extrabold tracking-wider bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-700 leading-none">
                    {award.bottom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] aspect-[4/4.5] overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 shadow-xl">
              <img
                src="/images/satisfied-guard.webp"
                alt="Oniks memnun müşteri referans görseli"
                className="w-full h-full object-cover grayscale-[10%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* ---------------- PART 2: Testimonials Section ---------------- */}
        <div className="flex flex-col gap-12 relative z-10 border-t border-white/10 pt-16 md:pt-24">
          
          {/* Testimonial Header row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full text-left">
            <div className="flex flex-col gap-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full w-fit">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span className="text-xs font-semibold tracking-wider uppercase text-neutral-300">
                  Müşteri Yorumları
                </span>
              </div>
              {/* Headline */}
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.15]">
                Müşterilerimiz Oniks İçin <br />
                <span className="font-serif italic font-normal text-white">
                  Ne Diyor?
                </span>
              </h2>
            </div>

            {/* Marquee Hint Info */}
            <span className="text-xs text-neutral-400 font-semibold md:self-end">
              Duraklatmak için farenizi üzerine getirin
            </span>
          </div>

          {/* Testimonial cards marquee */}
          <div className="relative w-full overflow-hidden py-4 select-none">
            {/* Fade overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#000c2d] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#000c2d] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-reviews gap-6">
              {duplicatedReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white text-neutral-800 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between gap-6 text-left shadow-lg w-[320px] md:w-[380px] flex-shrink-0 min-h-[220px]"
                >
                  {/* User profile row */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-[#000c2d]">
                        {review.name}
                      </span>
                      <span className="text-xs text-neutral-400 font-semibold">
                        {review.role}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-sm md:text-base text-neutral-600 font-semibold leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  {/* Rating stars & Bottom badge logo */}
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-5 mt-auto">
                    <div className="flex items-center gap-1">
                      {[...Array(review.stars)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-orange-500 stroke-orange-500" />
                      ))}
                    </div>
                    
                    {/* Brand name label badge */}
                    <span className="text-[10px] font-extrabold tracking-widest text-[#000c2d] opacity-50 uppercase">
                      Oniks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
