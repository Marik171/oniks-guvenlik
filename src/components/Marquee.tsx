"use client";

import React from "react";
import { motion } from "framer-motion";

const IMAGES = [
  "/images/PHOTO-2026-07-21-15-42-01.webp",
  "/images/PHOTO-2026-07-21-15-42-01 2.webp",
  "/images/PHOTO-2026-07-21-15-42-01 3.webp",
  "/images/PHOTO-2026-07-21-15-42-02.webp",
  "/images/PHOTO-2026-07-21-15-42-02 2.webp",
  "/images/PHOTO-2026-07-21-15-42-02 3.webp",
  "/images/PHOTO-2026-07-21-15-42-03.webp",
  "/images/PHOTO-2026-07-21-15-42-03 2.webp",
  "/images/PHOTO-2026-07-21-15-42-03 3.webp",
  "/images/PHOTO-2026-07-21-15-42-03 4.webp",
  "/PHOTO-2026-07-29-19-38-11.webp",
  "/PHOTO-2026-07-29-19-38-11 2.webp",
  "/PHOTO-2026-07-29-19-38-11 3.webp",
  "/PHOTO-2026-07-29-19-38-11 4.webp",
  "/PHOTO-2026-07-29-19-38-12.webp",
  "/PHOTO-2026-07-29-19-38-12 2.webp",
  "/PHOTO-2026-07-29-19-38-12 3.webp",
  "/PHOTO-2026-07-29-19-38-12 4.webp",
  "/PHOTO-2026-07-29-19-38-13.webp",
  "/PHOTO-2026-07-29-19-38-13 2.webp",
  "/PHOTO-2026-07-29-19-38-49.webp",
];

export default function Marquee() {
  // Duplicate the list of images to create a seamless loop
  const duplicatedImages = [...IMAGES, ...IMAGES];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Absolute fade overlays at the edges for premium look */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling row */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 65, // slowed down speed of marquee
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
        className="flex gap-6 w-max"
      >
        {duplicatedImages.map((imgUrl, index) => (
          <div
            key={index}
            className="w-[280px] h-[340px] md:w-[340px] md:h-[420px] rounded-[2rem] overflow-hidden flex-shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-neutral-100 border border-neutral-200/30"
          >
            <img
              src={imgUrl}
              alt={`Security scenario ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none grayscale-[10%]"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
