"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepCardProps {
  step: string;
  line1: string;
  line2: string;
  navyHeight: string; // Tailwind percentage height class (e.g. h-[40%])
  whiteHeight: string; // Tailwind percentage height class (e.g. h-[60%])
}

const CARDS: StepCardProps[] = [
  {
    step: "01",
    line1: "Ücretsiz",
    line2: "Keşif",
    navyHeight: "h-[40%]",
    whiteHeight: "h-[60%]",
  },
  {
    step: "02",
    line1: "Detaylı",
    line2: "Projelendirme",
    navyHeight: "h-[50%]",
    whiteHeight: "h-[50%]",
  },
  {
    step: "03",
    line1: "Profesyonel",
    line2: "Montaj",
    navyHeight: "h-[60%]",
    whiteHeight: "h-[40%]",
  },
  {
    step: "04",
    line1: "Kesintisiz",
    line2: "Teknik Destek",
    navyHeight: "h-[70%]",
    whiteHeight: "h-[30%]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 65,
      damping: 14,
    },
  },
} as const;

export default function ProcessSection() {
  return (
    <section className="bg-white py-16 md:py-28 px-4 md:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto bg-[#f1f1f1] rounded-[3rem] px-6 md:px-16 py-16 md:py-24 text-securus-dark flex flex-col gap-16 relative shadow-sm">

        {/* Section Header */}
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
              Sürecimiz
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
            Güvenlik ve Otomasyon <br />
            <span className="font-serif italic font-normal text-[#000c2d]">
              Sürecimiz Nasıl Çalışır?
            </span>
          </motion.h2>
        </div>

        {/* Staggered Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.step}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="flex flex-col h-[340px] rounded-[2rem] overflow-hidden border border-neutral-200/40 shadow-sm relative group hover:shadow-md transition-all duration-300"
            >
              {/* Top Half: White background */}
              <div className={`${card.whiteHeight} bg-white flex items-center justify-start pl-8 pr-6 relative transition-all duration-300`}>
                <div className="flex items-baseline gap-1 text-[#000c2d]">
                  <span className="font-serif italic text-lg md:text-xl font-normal opacity-70">
                    Adım
                  </span>
                  <span className="font-sans font-bold text-4xl md:text-5xl tracking-tight ml-2">
                    _{card.step}
                  </span>
                </div>
              </div>

              {/* Bottom Half: Navy background */}
              <div className={`${card.navyHeight} bg-[#000c2d] text-white flex flex-col justify-center px-8 text-left transition-all duration-300`}>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                  {card.line1}
                </h3>
                <span className="font-serif italic font-normal text-lg md:text-xl text-white/95 mt-1 leading-tight">
                  {card.line2}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
