"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const RING_IMAGES = [
  "/images/guard-portrait.webp",
  "/images/guard-walkie.webp",
  "/images/service-onsite.webp",
  "/images/service-patrols.webp",
  "/images/service-event.webp",
  "/images/service-cctv.webp",
  "/images/service-consulting.webp",
  "/images/service-emergency.webp",
  "/images/service-manager.webp",
  "/images/satisfied-guard.webp",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  "/images/guard-portrait.webp",
  "/images/guard-walkie.webp",
  "/images/service-onsite.webp",
  "/images/service-patrols.webp",
  "/images/service-event.webp",
  "/images/service-cctv.webp",
  "/images/service-consulting.webp",
  "/images/service-emergency.webp",
  "/images/service-manager.webp",
];

interface CtaSectionProps {
  badge?: string;
}

export default function CtaSection({ badge = "Get Security Service" }: CtaSectionProps) {
  const [radius, setRadius] = useState(380);
  const totalItems = RING_IMAGES.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(200);
      } else if (window.innerWidth < 1024) {
        setRadius(300);
      } else {
        setRadius(390);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative bg-white text-securus-dark py-24 md:py-40 w-full overflow-hidden flex items-center justify-center border-t border-neutral-100 min-h-[550px] md:min-h-[850px]">

      {/* 1. Infinite Rotating Circular Photo Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        style={{ willChange: "transform" }}
        className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] flex items-center justify-center pointer-events-none z-0"
      >
        {RING_IMAGES.map((imgUrl, i) => {
          const angle = (i * 2 * Math.PI) / totalItems - Math.PI / 2; // offset by 90deg (top start)
          const angleDeg = (i * 360) / totalItems;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={i}
              className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-[1.25rem] overflow-hidden border-2 border-white shadow-md bg-neutral-100 pointer-events-auto"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${angleDeg + 90}deg)`,
              }}
            >
              <img
                src={imgUrl}
                alt={`Security officer portrait ${i + 1}`}
                className="w-full h-full object-cover grayscale-[10%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </motion.div>

      {/* 2. Centered Content Block (Clean text floating inside the circle) */}
      <div className="relative max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6 md:gap-8 z-10">

        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit animate-pulse"
        >
          <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
          <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
            {badge === "Get Security Service" ? "Ücretsiz Keşif" : badge}
          </span>
        </motion.div>

        {/* Heading Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] text-[#000c2d] max-w-xl mx-auto mt-2"
        >
          Doğru Sistem Mimarisi & <br />
          <span className="font-serif italic font-normal text-[#000c2d]">
            Sürdürülebilir Teknik Destek
          </span>
        </motion.h2>

        {/* Call to Actions: Split Buttons & Phone number */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-4"
        >
          {/* Split Button Group */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/contact"
              className="bg-[#000c2d] text-white text-sm md:text-base font-semibold px-6 md:px-7 py-3.5 md:py-4 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
            >
              Bizimle İletişime Geçin
            </Link>
            <Link
              href="/contact"
              className="bg-[#000c2d] text-white p-3.5 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
              aria-label="İletişim Formuna Git"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Inline Phone link */}
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
                Teknik Destek / Satış
              </span>
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
