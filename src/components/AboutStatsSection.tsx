"use client";

import React from "react";
import { motion } from "framer-motion";
import Counter from "./Counter";

export default function AboutStatsSection() {
  return (
    <section className="bg-white text-securus-dark py-16 md:py-24 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-12 md:gap-16">
        
        {/* Header Block */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
          >
            <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Hizmet Ağımız
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
            Yüksek Kaliteli Sistemlerle <br />
            <span className="font-serif italic font-normal text-[#000c2d]">
              Binaları, İşletmeleri ve <br className="hidden md:inline" />
              Yaşam Alanlarını Koruyoruz.
            </span>
          </motion.h2>
        </div>

        {/* 3-Column Stats Row */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center mt-6">
          
          {/* Left Column - Client Satisfaction Title */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 text-center md:text-left flex flex-col"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#000c2d]">
              Müşteri
            </h3>
            <span className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-[#000c2d] font-normal mt-1">
              Memnuniyeti
            </span>
          </motion.div>

          {/* Center Column - 98% Image Overlay Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50, damping: 15 }}
            className="md:col-span-6 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[480px] aspect-[1.55] rounded-[2.2rem] overflow-hidden shadow-md group border border-neutral-200/20">
              {/* Guard Image Background */}
              <img
                src="/images/about-marquee-1.png"
                alt="Oniks Güvenlik Referans Görselleri"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                loading="lazy"
                decoding="async"
              />
              
              {/* Darkening Overlay Tint */}
              <div className="absolute inset-0 bg-[#000c2d]/25 mix-blend-multiply group-hover:bg-[#000c2d]/20 transition-all duration-300" />
              
              {/* Massive 98% text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] select-none">
                  %<Counter value={98} />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Client description paragraph */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 text-center md:text-left text-neutral-500 font-semibold text-sm md:text-base leading-relaxed flex items-center justify-center md:justify-start"
          >
            <p className="max-w-xs md:max-w-none">
              Müşterilerimiz; teknik uzmanlığımız, hızlı çözümlerimiz ve satış sonrası kesintisiz teknik servis desteğimiz nedeniyle bize güveniyor.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
