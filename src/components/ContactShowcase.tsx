"use client";

import React from "react";
import { ShieldCheck, Zap, Radio } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactShowcase() {
  return (
    <section className="bg-white py-16 px-6 md:px-12 w-full overflow-hidden flex flex-col gap-24 md:gap-32">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-24 md:gap-32">
        
        {/* Block 1: Command Center Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Command Center Image with retro crop marks */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative flex justify-center w-full max-w-[540px] mx-auto lg:mx-0"
          >
            <div className="relative w-full aspect-[1.3] rounded-[2.5rem] overflow-hidden p-3 bg-neutral-100 border border-neutral-200/50 shadow-md">
              {/* Crop Corner Marks */}
              <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#000c2d] pointer-events-none" />
              <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-[#000c2d] pointer-events-none" />
              <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-[#000c2d] pointer-events-none" />
              <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-[#000c2d] pointer-events-none" />
              
              <img
                src="/images/service-emergency.webp"
                alt="Oniks Teknik Destek ve Mobil Servis Ekibi"
                className="w-full h-full object-cover rounded-[2rem] grayscale-[15%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right Column: Descriptions */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col gap-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
                Teknik Servis Merkezi
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#000c2d] leading-[1.2]">
              Hızlı Teknik Destek Operasyonu <br />
              <span className="font-serif italic font-normal text-[#000c2d]">
                Aynı Gün Mobil Servis Ekibi
              </span>
            </h3>

            <p className="text-neutral-500 font-semibold text-sm md:text-base leading-relaxed">
              Merkezi servis çağrı birimimiz ve sahada hazır bekleyen mobil teknik ekiplerimiz, kamera veya diafon sistemlerinizde oluşabilecek her türlü arızaya en kısa sürede müdahale eder.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#000c2d] flex-shrink-0 mt-0.5">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000c2d] text-base leading-tight">Aktif İletişim Hattı</h4>
                  <p className="text-xs md:text-sm text-neutral-400 font-semibold mt-1">Gelen tüm servis ve arıza çağrılarının tam zamanında karşılanması.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#000c2d] flex-shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000c2d] text-base leading-tight">Hızlı Teknik Mobilizasyon</h4>
                  <p className="text-xs md:text-sm text-neutral-400 font-semibold mt-1">Beylikdüzü ve çevre ilçelerde aynı gün arıza tespiti ve onarım.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Block 2: Patrol Officers (Reversed Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Descriptions */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 lg:order-1 flex flex-col gap-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
                Profesyonel Montaj
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#000c2d] leading-[1.2]">
              Uzman Montaj Standartları <br />
              <span className="font-serif italic font-normal text-[#000c2d]">
                Kusursuz Kablolama & Temiz İşçilik
              </span>
            </h3>

            <p className="text-neutral-500 font-semibold text-sm md:text-base leading-relaxed">
              Teknik ekiplerimiz, kamera açılarından kablolama estetiğine ve merkezi bağlantı panellerine kadar tüm detayları yüksek standartlarda kurar.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#000c2d] flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000c2d] text-base leading-tight">Yedek Parça ve Marka Garantisi</h4>
                  <p className="text-xs md:text-sm text-neutral-400 font-semibold mt-1">MAS, Multitek ve Audio marka ürünlerinde sertifikalı kurulum ve teknik destek.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Guard Walkie Image with retro crop marks */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 lg:order-2 relative flex justify-center w-full max-w-[540px] mx-auto lg:mx-0"
          >
            <div className="relative w-full aspect-[1.3] rounded-[2.5rem] overflow-hidden p-3 bg-neutral-100 border border-neutral-200/50 shadow-md">
              {/* Crop Corner Marks */}
              <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#000c2d] pointer-events-none" />
              <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-[#000c2d] pointer-events-none" />
              <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-[#000c2d] pointer-events-none" />
              <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-[#000c2d] pointer-events-none" />
              
              <img
                src="/images/guard-walkie.webp"
                alt="Oniks Profesyonel Montaj ve Teknik Servis Ekipleri"
                className="w-full h-full object-cover rounded-[2rem] grayscale-[15%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
