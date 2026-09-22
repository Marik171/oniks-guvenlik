"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const StarBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-12 h-12 text-white">
    <path d="M12 2l2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5-3.6-3.5 5-.7z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="11.5" r="2.5" className="fill-white/10" />
  </svg>
);

const ShieldBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-12 h-12 text-white">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17s3-1.5 3-4.5V8.5L12 7.2 9 8.5v4c0 3 3 4.5 3 4.5z" strokeWidth="1.2" className="fill-white/10" />
  </svg>
);

const FileListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-12 h-12 text-white">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="9" x2="8" y2="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CARDS = [
  {
    id: 1,
    icon: <StarBadgeIcon />,
    line1: "Uzman",
    line2: "Kadro",
    description: "Görüntülü interkom, merkezi uydu ve akıllı ev teknolojilerinde uzmanlaşmış sertifikalı profesyonel ekip.",
  },
  {
    id: 2,
    icon: <ShieldBadgeIcon />,
    line1: "Gelişmiş",
    line2: "Teknoloji",
    description: "Nexus Visio, Fanvil, Audio ve Teknoline gibi lider markaların en son teknoloji ürünleri ile entegre çözümler.",
  },
  {
    id: 3,
    icon: <FileListIcon />,
    line1: "Kesintisiz",
    line2: "Destek",
    description: "Kurulum sonrasında da ihtiyaç duyduğunuz her an yanınızda olan hızlı ve güvenilir teknik servis desteği.",
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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 14,
    },
  },
} as const;

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
];

export default function AboutWhyChooseUs() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto bg-[#000c2d] text-white px-6 md:px-16 py-16 md:py-24 rounded-[3rem] flex flex-col gap-12 md:gap-16 relative shadow-lg">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/5 to-transparent pointer-events-none rounded-[3rem]" />

        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center z-10">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full w-fit"
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-white uppercase">
              Neden Biz?
            </span>
          </motion.div>

          {/* Heading Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white max-w-4xl mx-auto mt-2"
          >
            Neden Müşterilerimiz <br />
            <span className="font-serif italic font-normal text-white">
              Oniks'i Tercih Ediyor?
            </span>
          </motion.h2>
        </div>

        {/* 3-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full z-10"
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
              className="p-8 md:p-10 rounded-[2rem] bg-white/[0.04] border border-white/5 flex flex-col gap-8 text-left transition-all duration-300"
            >
              {/* Vector Icon Container */}
              <div className="w-12 h-12 flex items-center justify-center">
                {card.icon}
              </div>

              {/* Text Group */}
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-none">
                  {card.line1}{" "}
                  <span className="font-serif italic font-normal text-white">
                    {card.line2}
                  </span>
                </h3>
                <p className="text-neutral-400 font-semibold text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Client Trust Rating row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-2 border-t border-white/5 pt-8 w-full z-10"
        >
          {/* Overlapping avatars */}
          <div className="flex items-center">
            {AVATARS.map((avatarUrl, i) => (
              <img
                key={i}
                src={avatarUrl}
                alt="Memnun Müşteri Profil Resmi"
                className="w-8 h-8 rounded-full border-2 border-[#000c2d] -ml-2 first:ml-0 object-cover"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          {/* Rating stars */}
          <div className="flex items-center gap-0.5 text-orange-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4.5 h-4.5 fill-orange-500 stroke-none" />
            ))}
          </div>

          {/* Subtext */}
          <span className="text-xs md:text-sm font-semibold tracking-wide text-neutral-300 font-sans mt-1 sm:mt-0">
            [ Binlerce Memnun Müşteri ]
          </span>
        </motion.div>

      </div>
    </section>
  );
}
