"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, PhoneCall, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { icon: <FacebookIcon className="w-4 h-4" />, href: "https://www.facebook.com/oniks.guvenlik.sistemleri/mentions/", label: "Facebook" },
    { icon: <TwitterIcon className="w-4 h-4" />, href: "#twitter", label: "Twitter" },
    { icon: <InstagramIcon className="w-4 h-4" />, href: "https://www.instagram.com/oniksguvenlik/", label: "Instagram" },
    { icon: <LinkedinIcon className="w-4 h-4" />, href: "#linkedin", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-white py-16 px-4 md:px-8 w-full overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto bg-[#000c2d] text-white px-6 md:px-16 py-12 md:py-20 rounded-[3rem] flex flex-col gap-12 md:gap-16 relative shadow-2xl">
        
        {/* Background ambient radial lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02),transparent)] pointer-events-none rounded-[3rem]" />

        {/* 1. Top Portion - Subscribe Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-10 border-b border-white/10 relative z-10">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              En Yeni Teknolojilerden <br />
              <span className="font-serif italic font-normal text-white">
                Haberdar Olun
              </span>
            </h2>
          </div>

          {/* Form */}
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full lg:max-w-xl"
          >
            <input
              type="email"
              placeholder="Örn: eposta@adresiniz.com"
              className="bg-transparent border-b border-white/20 focus:border-white outline-none py-3 px-1 text-sm md:text-base text-white placeholder-white/40 flex-grow w-full transition-colors duration-200"
              required
            />
            {/* Split Button Group */}
            <div className="flex items-center gap-1.5 flex-shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0">
              <button
                type="submit"
                className="bg-white text-securus-dark text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-neutral-100 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Abone Ol
              </button>
              <button
                type="submit"
                className="bg-white text-securus-dark p-3.5 rounded-xl hover:bg-neutral-100 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="Abone Ol"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </form>
        </div>

        {/* 2. Middle Portion - Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pt-4 relative z-10">
          
          {/* Column 1: Branding & Callout */}
          <div className="md:col-span-5 flex flex-col gap-6 text-left">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 px-2 bg-white rounded-lg shadow-sm">
                <img
                  src="/images/products/oniks-logo.png"
                  alt="Oniks Güvenlik Logo"
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                ONİKS GÜVENLİK
              </span>
            </div>

            <p className="text-sm text-neutral-400 font-semibold leading-relaxed max-w-sm">
              2001'den beri kamera, interkom ve otomasyon sistemlerinde profesyonel montaj ve sürekli teknik servis desteği.
            </p>

            <div className="text-sm font-bold text-white tracking-wide border-l-2 border-[#E30613] pl-3.5 py-1 bg-white/5 rounded-r-lg max-w-sm">
              Doğru Sistem. Profesyonel Montaj. Sürekli Destek.
            </div>

            {/* Telephone Callout */}
            <a href="tel:+902128721170" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors duration-200">
                <PhoneCall className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-bold text-sm md:text-base tracking-wide leading-none group-hover:opacity-85 transition-opacity duration-200">
                  0212 872 11 70
                </span>
                <span className="text-neutral-400 text-xs font-semibold mt-1">
                  Müşteri Hizmetleri
                </span>
              </div>
            </a>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Takip Edin:
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Company Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-6 text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Kurumsal
            </h3>
            <div className="flex flex-col gap-3.5">
              {[
                { label: "Anasayfa", href: "/" },
                { label: "Hakkımızda", href: "/about" },
                { label: "Hizmetlerimiz", href: "/#services" },
                { label: "İnterkom & Diafon", href: "/services" },
                { label: "İletişim", href: "/contact" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-bold text-neutral-400 hover:text-white transition-colors duration-200 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Information */}
          <div className="md:col-span-4 flex flex-col gap-6 text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              İletişim Bilgileri
            </h3>
            <div className="flex flex-col gap-4 text-sm font-bold text-neutral-400">
              
              {/* Map item */}
              <div className="flex items-start gap-3.5 leading-relaxed">
                <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span>Büyükşehir Mah. Başak Sk. Atrium İş Merkezi Kat:1 No:49, 34520 Beylikdüzü / İstanbul</span>
              </div>

              {/* Phone item */}
              <a href="tel:+902128721170" className="flex items-center gap-3.5 hover:text-white transition-colors duration-200 w-fit">
                <Phone className="w-5 h-5 text-white flex-shrink-0" />
                <span>+90 (212) 872 11 70</span>
              </a>

              {/* Mail item */}
              <a href="mailto:info@oniksguvenlik.com" className="flex items-center gap-3.5 hover:text-white transition-colors duration-200 w-fit">
                <Mail className="w-5 h-5 text-white flex-shrink-0" />
                <span>info@oniksguvenlik.com</span>
              </a>

            </div>
          </div>

        </div>

        {/* 3. Bottom Portion - Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400 font-bold w-full gap-4 relative z-10">
          <div className="text-center sm:text-left">
            <span>© 2026 ONİKS GÜVENLİK VE OTOMASYON SİSTEMLERİ SAN. TİC. LTD. ŞTİ. | Tüm Hakları Saklıdır</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#privacy" className="hover:text-white transition-colors duration-200">
              Gizlilik Politikası
            </Link>
            <span className="opacity-30">|</span>
            <Link href="#terms" className="hover:text-white transition-colors duration-200">
              Kullanım Koşulları
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
