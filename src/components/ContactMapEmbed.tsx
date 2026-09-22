"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactMapEmbed() {
  return (
    <section className="bg-white py-12 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Rounded Map Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[400px] md:h-[480px] rounded-[3rem] overflow-hidden border border-neutral-200/50 shadow-sm relative bg-neutral-100"
        >
          {/* Iframe stylized with grayscale filter to match brand aesthetic */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8305493855128!2d28.641931076145468!3d41.00708191949831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55fa14d11a291%3A0x4e1cfd272c0f34f4!2sMas%20ve%20Audio%20G%C3%B6r%C3%BCnt%C3%BCl%C3%BC%20Diafon%20Sist.%20%26%20Teknik%20Servis!5e0!3m2!1sen!2s!4v1785767802933!5m2!1sen!2s"
            className="w-full h-full border-0 grayscale-[100%] contrast-[1.1] opacity-90"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Oniks Güvenlik Konumu"
          />
        </motion.div>
      </div>
    </section>
  );
}
