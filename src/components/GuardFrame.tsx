"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GuardFrame() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto lg:mx-0 aspect-[4/5] p-3">
      {/* Corner Markings */}
      {/* Top-Left */}
      <span className="crop-corner top-0 left-0 border-t-[2.5px] border-l-[2.5px]" />
      {/* Top-Right */}
      <span className="crop-corner top-0 right-0 border-t-[2.5px] border-r-[2.5px]" />
      {/* Bottom-Left */}
      <span className="crop-corner bottom-0 left-0 border-b-[2.5px] border-l-[2.5px]" />
      {/* Bottom-Right */}
      <span className="crop-corner bottom-0 right-0 border-b-[2.5px] border-r-[2.5px]" />

      {/* Main Image Container */}
      <div className="w-full h-full overflow-hidden rounded-lg relative group">
        <img
          src="/images/hero-founder.webp"
          alt="Oniks Güvenlik Sistemleri"
          className="w-full h-full object-cover object-[center_20%] grayscale-[15%] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        {/* Dark subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
