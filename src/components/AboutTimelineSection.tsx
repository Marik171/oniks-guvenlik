"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  id: number;
  year: string;
  yearSuffix?: string;
  line1: string;
  line2: string;
  description: string;
  imageUrl: string;
}

const MILESTONES: TimelineItem[] = [
  {
    id: 1,
    year: "2001",
    line1: "Sektöre İlk",
    line2: "Adım",
    description: "Oniks Güvenlik, Beylikdüzü merkezli olarak televizyon uydu, analog görüntüsüz diafonlar ve temel güvenlik sistemleri kurulumuyla hizmete başladı.",
    imageUrl: "/images/history-2001.webp",
  },
  {
    id: 2,
    year: "2008",
    line1: "Dijital & Görüntülü",
    line2: "Sistemlere Geçiş",
    description: "Teknolojik gelişimleri takip ederek MAS İnterkom, Multitek ve Audio markalarının görüntülü diafon ve dijital interkom sistemleri satış, montaj ve yetkili teknik servisliğine geçiş yapıldı.",
    imageUrl: "/images/history-2008.webp",
  },
  {
    id: 3,
    year: "2015",
    line1: "IP Kamera &",
    line2: "Otomasyon Entegrasyonu",
    description: "Tesisler ve siteler için IP kamera altyapısı, turnike geçiş kontrolü ve araç geçiş sistemleri (OGS, bariyer, plaka tanıma) hizmet kataloğuna eklendi.",
    imageUrl: "/images/history-2015.webp",
  },
  {
    id: 4,
    year: "2024 – 2026",
    yearSuffix: " (Günümüz)",
    line1: "Yeni Nesil SIP &",
    line2: "Yüz Tanıma Teknolojileri",
    description: "Yüz tanıma özellikli Fanvil i67 ve i60K kapı panelleri ile akıllı ev otomasyonlarını modern IP ağ altyapıları üzerinden müşterilerimizle buluşturuyoruz.",
    imageUrl: "/images/history-2024.webp",
  },
];

export default function AboutTimelineSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto bg-[#f1f1f1] rounded-[3rem] px-6 md:px-16 py-16 md:py-24 text-securus-dark flex flex-col gap-16 relative shadow-sm">
        
        {/* Header Title */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-neutral-200 rounded-full w-fit"
          >
            <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Tarihçemiz
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#000c2d] max-w-4xl mx-auto mt-2"
          >
            2001'den Bugüne <br />
            <span className="font-serif italic font-normal text-[#000c2d]">
              Oniks Güvenlik Serüveni
            </span>
          </motion.h2>
        </div>

        {/* Timeline Grid Container */}
        <div className="relative w-full max-w-5xl mx-auto mt-6">
          
          {/* Main Vertical Timeline Line for Desktop (hidden on mobile) */}
          <div className="absolute left-[33.33%] md:left-[33.33%] top-4 bottom-24 w-[2px] bg-neutral-300/80 -translate-x-1/2 hidden md:block" />

          {/* Timeline Milestones Row Loop */}
          <div className="flex flex-col gap-12 md:gap-4 w-full">
            {MILESTONES.map((item, index) => (
              <div 
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 w-full relative items-start"
              >
                
                {/* 1. Left Side: Year display (Desktop only, stacked on Mobile) */}
                <div className="col-span-4 text-left md:text-right pr-0 md:pr-10 pb-2 md:pb-0 pt-0 md:pt-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="font-sans font-bold text-2xl md:text-3xl text-[#000c2d]">
                      {item.year}
                    </span>
                    {item.yearSuffix && (
                      <span className="font-sans font-semibold text-lg md:text-xl text-neutral-500">
                        {item.yearSuffix}
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* 2. Middle Column: Dot Marker (Desktop only) */}
                <div className="col-span-1 hidden md:flex justify-center relative pt-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: index * 0.15 }}
                    className="w-4 h-4 bg-[#000c2d] border-4 border-white rounded-full z-10 shadow-sm"
                  />
                </div>

                {/* 3. Right Side: Milestone Card Content & Image */}
                <div className="col-span-7 pl-0 md:pl-10 pb-8 flex flex-col items-start gap-4 text-left">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col gap-4 w-full"
                  >
                    {/* Heading */}
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#000c2d] leading-none mt-1">
                      {item.line1}{" "}
                      <span className="font-serif italic font-normal text-[#000c2d]">
                        {item.line2}
                      </span>
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-neutral-500 font-semibold text-sm md:text-base leading-relaxed max-w-xl">
                      {item.description}
                    </p>

                    {/* Milestone Rounded Card Image */}
                    <div className="w-full max-w-[480px] aspect-[1.65] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-200/20 bg-neutral-200 mt-2">
                      <img
                        src={item.imageUrl}
                        alt={`Oniks milestone scene for ${item.year}`}
                        className="w-full h-full object-cover grayscale-[10%]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
