"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const contentContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
} as const;

export default function WhyChooseUs() {
  const features = [
    "Doğru İhtiyaca Doğru Sistem",
    "Profesyonel Kablolama & Montaj",
    "Ulaşılabilir Teknik Muhatap",
    "Yüksek Görüntü & Ses Kalitesi",
    "Mobil Cihazlardan 7/24 İzleme",
    "Sektörel Deneyim (2001'den beri)",
  ];

  return (
    <section id="why-choose-us" className="relative bg-white text-securus-dark py-20 md:py-32 px-6 md:px-12 w-full overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Rounded Security Manager Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-[500px] aspect-[4/4.3] overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="/images/service-manager.webp"
                alt="Oniks Güvenlik Profesyonel Hizmet Anlayışı"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right Column - Content details */}
          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 flex flex-col gap-6 md:gap-8 text-left"
          >
            
            {/* Pill Badge */}
            <motion.div
              variants={childVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
            >
              <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
                Neden Biz?
              </span>
            </motion.div>

            {/* Title Header */}
            <motion.h2
              variants={childVariants}
              className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] text-[#000c2d]"
            >
              Neden Binlerce Bina <br />
              <span className="font-serif italic font-normal text-[#000c2d]">
                Oniks Güvenlik'i Seçiyor?
              </span>
            </motion.h2>

            {/* Split CTA Buttons in Dark Navy */}
            <motion.div
              variants={childVariants}
              className="flex items-center gap-1.5"
            >
              <Link
                href="/contact"
                className="bg-[#000c2d] text-white text-sm md:text-base font-semibold px-6 md:px-7 py-3.5 md:py-4 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
              >
                Bizimle İletişime Geçin
              </Link>
              <Link
                href="/contact"
                className="bg-[#000c2d] text-white p-3.5 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
                aria-label="İletişim kurun"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6 stroke-[2.5]" />
              </Link>
            </motion.div>

            {/* Features Checklist Grid Container */}
            <motion.div
              variants={childVariants}
              className="bg-[#f1f1f1] rounded-[2rem] p-6 md:p-8 mt-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3.5">
                    {/* Checkbox Icon */}
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-transparent flex items-center justify-center">
                      <Check className="w-4.5 h-4.5 text-[#000c2d] stroke-[3]" />
                    </div>
                    {/* Feature Text */}
                    <span className="text-sm md:text-base font-bold text-[#000c2d]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
