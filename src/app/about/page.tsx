"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import AboutStatsSection from "@/components/AboutStatsSection";
import AboutTimelineSection from "@/components/AboutTimelineSection";
import AboutWhyChooseUs from "@/components/AboutWhyChooseUs";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { ChevronRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-white text-securus-dark font-sans selection:bg-[#000c2d]/10 selection:text-[#000c2d]">
      
      {/* Light Navbar Header */}
      <Navbar variant="light" />

      {/* About Us Hero Container */}
      <main className="relative pt-36 md:pt-48 pb-10 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 text-left flex flex-col gap-10 md:gap-14">
        
        {/* Left Column Content */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
          >
            <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Hakkımızda
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#000c2d] leading-[1.1] max-w-4xl"
          >
            2001'den Beri Güvenlikte <br />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="font-serif italic font-normal text-[#000c2d]"
            >
              Doğru Çözümün Adresi
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-neutral-500 font-semibold leading-relaxed max-w-3xl mt-2"
          >
            Oniks Güvenlik, konutlar ve işletmeler için kamera, interkom, akıllı ev ve araç geçiş kontrol sistemlerini keşiften montaja, servisten periyodik bakıma kadar tek merkezden sunan elektronik güvenlik ve otomasyon çözüm ortağıdır. 
            <span className="block mt-4 text-[#000c2d] font-bold border-l-2 border-[#E30613] pl-3.5">
              Doğru Sistem. Profesyonel Montaj. Sürekli Destek.
            </span>
          </motion.p>

          {/* Call to Actions: Buttons & Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 mt-2"
          >
            {/* Split Navy Buttons */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/contact"
                className="bg-[#000c2d] text-white text-sm md:text-base font-semibold px-6 md:px-7 py-3.5 md:py-4 rounded-xl hover:bg-opacity-95 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
              >
                İletişime Geçin
              </Link>
              <Link
                href="/contact"
                className="bg-[#000c2d] text-white p-3.5 md:p-4 rounded-xl hover:bg-opacity-95 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
                aria-label="İletişim Formuna Git"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6 stroke-[2.5]" />
              </Link>
            </div>

            {/* Telephone callout */}
            <a
              href="tel:+902128721170"
              className="flex items-center gap-3.5 group rounded-xl p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d]"
            >
              <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 group-hover:bg-[#000c2d] group-hover:text-white transition-all duration-200 text-[#000c2d]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[#000c2d] font-bold text-sm md:text-base tracking-wide group-hover:opacity-85 transition-opacity duration-200">
                  0212 872 11 70
                </span>
                <span className="text-neutral-400 text-xs font-semibold">
                  Hızlı Destek
                </span>
              </div>
            </a>
          </motion.div>
        </div>

      </main>

      {/* Infinite Scrolling Marquee Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full pb-8"
      >
        <Marquee />
      </motion.div>

      {/* Advanced Security Services Stats Section */}
      <AboutStatsSection />

      {/* Vision to Reality Founder History Timeline Section */}
      <AboutTimelineSection />

      {/* Why Choose Us Dark Cards Grid Section */}
      <AboutWhyChooseUs />

      {/* Reused Circular Photo Ring Section for About Page */}
      <CtaSection badge="Client Questions" />

      {/* Footer component */}
      <Footer />





    </div>
  );
}
