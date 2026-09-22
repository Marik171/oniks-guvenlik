"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
];

export default function RatingBadge() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-3 px-3 py-1.5 glass-badge rounded-full w-fit"
    >
      {/* Overlapping Avatars */}
      <div className="flex -space-x-2">
        {AVATARS.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`User Avatar ${i + 1}`}
            className="w-6 h-6 rounded-full border border-black object-cover"
            decoding="async"
          />
        ))}
      </div>

      {/* Rating & Review Info */}
      <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold tracking-wide text-neutral-300">
        <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
        <span>Google'da 28 Yorum ile 4.6 Puan</span>
      </div>
    </motion.div>
  );
}
