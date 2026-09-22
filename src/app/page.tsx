"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import RatingBadge from "@/components/RatingBadge";
import GuardFrame from "@/components/GuardFrame";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { ChevronRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-white font-sans selection:bg-white/20 selection:text-white">

      {/* Hero Section Container */}
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Image with Dark Blue & Black Overlay Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 12, 45, 0.8), rgba(0, 0, 0, 0.95)), url('/images/hero_bg.webp')`,
          }}
        />

        {/* Decorative subtle ambient light glow at the top-left */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Navigation Header */}
        <Navbar />

        {/* Hero Content Section */}
        <main className="relative flex-grow flex items-center px-6 md:px-12 py-32 md:py-40 max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

            {/* Left Column - Content */}
            <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 text-left">
              {/* Rating Badge */}
              <RatingBadge />

              {/* Main Tagline Header */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-white font-sans"
              >
                <span className="font-light text-neutral-300">Keşiften</span>{" "}
                <span className="font-bold">Servise</span> <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="font-serif italic font-normal text-white block mt-2"
                >
                  Güvenlik Çözüm Ortağınız
                </motion.span>
              </motion.h1>

              {/* Subheading Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-neutral-400 font-medium text-sm md:text-base lg:text-lg max-w-xl leading-relaxed mt-2 border-l border-neutral-700 pl-4"
              >
                Görüntülü interkom, akıllı ev otomasyonu, merkezi uydu ve kamera sistemlerinde profesyonel keşif, montaj ve 2001'den beri kesintisiz teknik destek.
              </motion.p>

              {/* Action Area: Buttons & Phone Callout */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-6 mt-2"
              >
                {/* Split Button Group */}
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/contact"
                    className="bg-white text-securus-dark text-sm md:text-base font-semibold px-6 md:px-7 py-3.5 md:py-4 rounded-xl hover:bg-neutral-100 active:scale-95 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 cursor-pointer"
                  >
                    Ücretsiz Keşif Al
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white text-securus-dark p-3.5 md:p-4 rounded-xl hover:bg-neutral-100 active:scale-95 transition-all duration-200 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 cursor-pointer"
                    aria-label="Ücretsiz Keşif İste"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 h-6 stroke-[2.5]" />
                  </Link>
                </div>

                {/* Phone Info Callout */}
                <a
                  href="tel:+902128721170"
                  className="flex items-center gap-3.5 group rounded-xl p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors duration-200">
                    <PhoneCall className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-semibold text-sm md:text-base tracking-wide group-hover:text-neutral-200 transition-colors duration-200">
                      0212 872 11 70
                    </span>
                    <span className="text-neutral-400 text-xs font-medium">
                      Bize Ulaşın (Pzt-Cm)
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Right Column - Guard Image Block */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <GuardFrame />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Who We Are / About Section */}
      <AboutSection />

      {/* Our Services Section */}
      <ServicesSection />

      {/* Our Process steps Section */}
      <ProcessSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Agency Achievements & Reviews Carousel Section */}
      <ReviewsSection />

      {/* Got Questions? FAQ Accordion Section */}
      <FaqSection />

      {/* Get Security Service Circular CTA Section */}
      <CtaSection />

      {/* Footer Section */}
      <Footer />





    </div>
  );
}
