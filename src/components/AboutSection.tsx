"use client";

import React from "react";
import { motion } from "framer-motion";
import Counter from "./Counter";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-white text-securus-dark py-20 md:py-32 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        
        {/* Headline Row (Grid of Badge on left, Headline on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Badge */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
            >
              <span className="w-1.5 h-1.5 bg-securus-dark rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
                Biz Kimiz
              </span>
            </motion.div>
          </div>

          {/* Headline Text */}
          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#000c2d]"
            >
              Elektronik Güvenlik, İnterkom ve <br />
              Akıllı Ev Otomasyon Çözümlerini <br />
              <span className="font-serif italic font-normal text-[#000c2d]">
                Keşiften Montaja, Servisten Bakıma <br />
                Tek Merkezden Sunuyoruz.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Content Row (Grid of Guard Image on left, Stats on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Rounded Guard Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-[500px] aspect-[4/3.8] overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="/images/guard-walkie.webp"
                alt="Oniks Güvenlik teknik montaj ve keşif süreci"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right Column - Stats Block */}
          <div className="lg:col-span-6 flex flex-col w-full">
            
            {/* Stat Row 1 (25+ Yıl) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 pb-10 items-start"
            >
              <div className="sm:col-span-4 text-5xl md:text-7xl font-bold tracking-tight text-[#000c2d]">
                <Counter value={25} />+
              </div>
              <div className="sm:col-span-8 flex flex-col text-left pt-1.5">
                <h3 className="text-xl md:text-2xl font-bold text-[#000c2d] leading-none">
                  Yıllık Tecrübe
                </h3>
                <span className="font-serif italic font-normal text-lg md:text-xl text-[#000c2d] mt-1">
                  Sektörde
                </span>
                <p className="text-sm md:text-base text-neutral-500 mt-4 leading-relaxed font-medium">
                  2001 yılından bu yana edindiğimiz tecrübeyle apartman, site, plaza ve fabrikalara uçtan uca çözümler sunuyoruz.
                </p>
              </div>
            </motion.div>

            {/* Separator Line */}
            <div className="w-full border-t border-neutral-200" />

            {/* Stat Row 2 (98%) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 pt-10 items-start"
            >
              <div className="sm:col-span-4 text-5xl md:text-7xl font-bold tracking-tight text-[#000c2d]">
                %<Counter value={98} />
              </div>
              <div className="sm:col-span-8 flex flex-col text-left pt-1.5">
                <h3 className="text-xl md:text-2xl font-bold text-[#000c2d] leading-none">
                  Müşteri Memnuniyeti
                </h3>
                <span className="font-serif italic font-normal text-lg md:text-xl text-[#000c2d] mt-1">
                  Oranı
                </span>
                <p className="text-sm md:text-base text-neutral-500 mt-4 leading-relaxed font-medium">
                  Doğru analiz, profesyonel kablolama, doğru konumlandırma ve kesintisiz servis desteği ile yanınızdayız.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
