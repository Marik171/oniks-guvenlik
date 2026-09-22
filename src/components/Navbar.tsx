"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  variant?: "dark" | "light"; // dark = transparent on top, dark scrolled; light = dark scrolled even at top (for white pages)
}

export default function Navbar({ variant = "dark" }: NavbarProps) {
  const isLightPage = variant === "light";
  const isLight = false; // Force dark elements (white text) for maximum aesthetic consistency
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const closeMegaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMegaMenu = () => {
    if (closeMegaMenuTimeout.current) {
      clearTimeout(closeMegaMenuTimeout.current);
      closeMegaMenuTimeout.current = null;
    }
    setShowMegaMenu(true);
  };

  const scheduleCloseMegaMenu = () => {
    closeMegaMenuTimeout.current = setTimeout(() => setShowMegaMenu(false), 200);
  };

  useEffect(() => {
    return () => {
      if (closeMegaMenuTimeout.current) clearTimeout(closeMegaMenuTimeout.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute dynamic styling based on scroll state or page type
  const showScrolledStyle = scrolled || isLightPage;

  const headerClass = showScrolledStyle
    ? "fixed top-4 left-4 right-4 md:left-6 md:right-6 max-w-5xl mx-auto py-3 px-6 rounded-[2rem] bg-black/85 backdrop-blur-xl border border-white/10 shadow-lg text-white z-50"
    : "absolute top-0 left-0 right-0 py-6 px-6 md:px-12 max-w-7xl mx-auto w-full z-50 text-white";

  // Navigation pill background class
  const isPillLight = false;

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${headerClass} flex items-center justify-between transition-all duration-300 ease-in-out`}
        onMouseLeave={scheduleCloseMegaMenu}
      >
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 rounded-lg"
        >
          <div className="relative flex items-center justify-center h-8 md:h-9 px-2 bg-white rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/products/oniks-logo.png"
              alt="Oniks Güvenlik Logo"
              className="h-5 md:h-6 w-auto object-contain"
            />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-white font-sans">
            ONİKS GÜVENLİK
          </span>
        </Link>

        {/* Nav Pill (Desktop Only) */}
        <nav className={`hidden md:flex items-center gap-1 px-2 py-1.5 ${
          showScrolledStyle 
            ? "bg-white/5 border border-white/5" 
            : "glass-nav"
        } rounded-full transition-all duration-300`}>
          {[
            { label: "Hakkımızda", href: "/about" },
            { label: "Hizmetlerimiz", href: "/#services" },
            { label: "İnterkom & Diafon", href: "/services", hasDropdown: true },
            { label: "Sıkça Sorulanlar", href: "/#faq" }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => {
                if (item.hasDropdown) {
                  openMegaMenu();
                } else {
                  scheduleCloseMegaMenu();
                }
              }}
              className="relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10 focus-visible:outline-white focus-visible:outline focus-visible:outline-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-white text-[#000c2d] hover:bg-neutral-100 text-sm font-semibold px-5 py-3 rounded-xl active:scale-95 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            İletişim
          </Link>

          {/* Mobile Hamburguer Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 md:hidden bg-white/10 text-white hover:bg-white/20"
            aria-label={mobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {showMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 p-8 rounded-[2rem] shadow-xl border flex gap-8 z-50 text-left bg-[#000000] border-white/10 text-white"
              onMouseEnter={openMegaMenu}
              onMouseLeave={scheduleCloseMegaMenu}
            >
              {/* Mega Menu Grid */}
              <div className="grid grid-cols-6 gap-8 w-full">
                
                {/* Column 1: Audio */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/services?brand=Audio"
                      onClick={() => setShowMegaMenu(false)}
                      className={`text-base font-bold tracking-tight flex items-center gap-1 group/brand ${
                        isLight ? "text-[#000c2d] hover:text-[#000c2d]/80" : "text-white hover:text-white/80"
                      }`}
                    >
                      Audio
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
                    </Link>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Lüks Apartman Diafonu</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { name: "10.1\" Yüz Tanımalı Zil Paneli", id: "audio-ip-101-yuztanima" },
                      { name: "10.1\" Sıva Altı Görüntülü Şube", id: "audio-101tft-sivaalti" },
                      { name: "10.1\" Sıva Üstü Dokunmatik", id: "audio-ip-101-sivaustu" },
                      { name: "Dokunmatik Zil Paneli", id: "audio-dokunmatik-zilpaneli" },
                      { name: "Sıva Üstü Görüntülü Diafon", id: "audio-sivaustu-diafon" }
                    ].map((model) => (
                      <Link
                        key={model.id}
                        href={`/services?product=${model.id}`}
                        onClick={() => setShowMegaMenu(false)}
                        className={`text-xs font-medium transition-colors duration-200 ${
                          isLight ? "text-neutral-500 hover:text-[#000c2d]" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Nexus Visio */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/services?brand=Nexus Visio"
                      onClick={() => setShowMegaMenu(false)}
                      className={`text-base font-bold tracking-tight flex items-center gap-1 group/brand ${
                        isLight ? "text-[#000c2d] hover:text-[#000c2d]/80" : "text-white hover:text-white/80"
                      }`}
                    >
                      Nexus Visio
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
                    </Link>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Dijital Diafon Sistemleri</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { name: "10.1\" Handsfree Monitör", id: "visio-101-handsfree" },
                      { name: "7\" Handsfree Monitör", id: "visio-7-handsfree" },
                      { name: "Görüntülü Şifreli Kapı Paneli", id: "visio-goruntulu-sifre-kart" },
                      { name: "Görüntüsüz Şifreli Kapı Paneli", id: "visio-goruntusuz-sifreli" },
                      { name: "Bas Konuş Sesli Diyafon", id: "visio-bas-konus" }
                    ].map((model) => (
                      <Link
                        key={model.id}
                        href={`/services?product=${model.id}`}
                        onClick={() => setShowMegaMenu(false)}
                        className={`text-xs font-medium transition-colors duration-200 ${
                          isLight ? "text-neutral-500 hover:text-[#000c2d]" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: Teknoline */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/services?brand=Teknoline"
                      onClick={() => setShowMegaMenu(false)}
                      className={`text-base font-bold tracking-tight flex items-center gap-1 group/brand ${
                        isLight ? "text-[#000c2d] hover:text-[#000c2d]/80" : "text-white hover:text-white/80"
                      }`}
                    >
                      Teknoline
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
                    </Link>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">IP İnterkom & Dağıtım</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { name: "Akıllı Ev Monitörü (T10-IS03)", id: "teknoline-t10-is03" },
                      { name: "Yüz Tanımalı Kapı Paneli (TS-OS01)", id: "teknoline-ts-os01" },
                      { name: "Android Kapı Paneli (TP-OS06)", id: "teknoline-tp-os06" },
                      { name: "IP Daire Monitörü (TS7-IS01)", id: "teknoline-ts7-is01" },
                      { name: "TBUS Güvenlik Ünitesi (TBUS-GU)", id: "teknoline-tbus-gu" }
                    ].map((model) => (
                      <Link
                        key={model.id}
                        href={`/services?product=${model.id}`}
                        onClick={() => setShowMegaMenu(false)}
                        className={`text-xs font-medium transition-colors duration-200 ${
                          isLight ? "text-neutral-500 hover:text-[#000c2d]" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 4: Fanvil */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/services?brand=Fanvil"
                      onClick={() => setShowMegaMenu(false)}
                      className={`text-base font-bold tracking-tight flex items-center gap-1 group/brand ${
                        isLight ? "text-[#000c2d] hover:text-[#000c2d]/80" : "text-white hover:text-white/80"
                      }`}
                    >
                      Fanvil
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
                    </Link>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Profesyonel interkom</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { name: "8\" Yüz Tanımalı Panel (i68)", id: "fanvil-i68" },
                      { name: "10.1\" Amiral Gemisi (i57A)", id: "fanvil-i57a" },
                      { name: "7\" Yüz Tanımalı Panel (i67)", id: "fanvil-i67" },
                      { name: "7\" Android Monitör (i55A)", id: "fanvil-i55a" },
                      { name: "IP Görüntülü Telefon (A320)", id: "fanvil-a320" }
                    ].map((model) => (
                      <Link
                        key={model.id}
                        href={`/services?product=${model.id}`}
                        onClick={() => setShowMegaMenu(false)}
                        className={`text-xs font-medium transition-colors duration-200 ${
                          isLight ? "text-neutral-500 hover:text-[#000c2d]" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 5: Hikvision */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/services?brand=Hikvision"
                      onClick={() => setShowMegaMenu(false)}
                      className={`text-base font-bold tracking-tight flex items-center gap-1 group/brand ${
                        isLight ? "text-[#000c2d] hover:text-[#000c2d]/80" : "text-white hover:text-white/80"
                      }`}
                    >
                      Hikvision
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
                    </Link>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Görüntülü İnterkom</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { name: "7\" Dokunmatik İç İstasyon (KH6320-TE1)", id: "hikvision-ds-kh6320-te1" },
                      { name: "All-in-One İç Ortam İstasyonu (KH9510)", id: "hikvision-ds-kh9510-wte1b" },
                      { name: "IP Villa Kapı İstasyonu (KV8113)", id: "hikvision-ds-kv8113-wme1c" },
                      { name: "IP Video Kapı İstasyonu (KD8003)", id: "hikvision-ds-kd8003-ime1" },
                      { name: "Yüz Tanımalı Kapı İstasyonu (KD9613-FE6)", id: "hikvision-ds-kd9613-fe6" }
                    ].map((model) => (
                      <Link
                        key={model.id}
                        href={`/services?product=${model.id}`}
                        onClick={() => setShowMegaMenu(false)}
                        className={`text-xs font-medium transition-colors duration-200 ${
                          isLight ? "text-neutral-500 hover:text-[#000c2d]" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 6: Featured Call To Action Showcase Card */}
                <div className={`p-6 rounded-2xl flex flex-col gap-4 border ${
                  isLight
                    ? "bg-[#f1f1f1] border-neutral-200/50 text-[#000c2d]"
                    : "bg-white/5 border-white/10 text-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-extrabold tracking-widest uppercase text-neutral-400">Keşif & Projelendirme</span>
                  </div>
                  <h4 className="text-sm font-bold tracking-tight leading-snug">
                    Ücretsiz Altyapı İnceleme
                  </h4>
                  <p className="text-[11px] opacity-70 font-medium leading-relaxed">
                    Sitenizin diafon altyapısını yerinde inceleyip en uygun interkom sistemini projelendiriyoruz.
                  </p>
                  <Link
                    href="/contact"
                    onClick={() => setShowMegaMenu(false)}
                    className={`mt-auto inline-flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 group/btn ${
                      isLight
                        ? "bg-[#000c2d] text-white hover:bg-[#000c2d]/90"
                        : "bg-white text-[#000c2d] hover:bg-neutral-100"
                    }`}
                  >
                    <span>Keşif Talebi Gönder</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.header>


      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 flex flex-col justify-between px-6 pt-28 pb-10 ${
              isLight && !scrolled ? "bg-white text-[#000c2d]" : "bg-[#000c2d] text-white"
            } md:hidden`}
          >
            {/* Nav links */}
            <div className="flex flex-col gap-6 text-left mt-4 pl-4">
              {[
                { label: "Anasayfa", href: "/" },
                { label: "Hakkımızda", href: "/about" },
                { label: "Hizmetlerimiz", href: "/#services" },
                { label: "İnterkom & Diafon", href: "/services" },
                { label: "Sıkça Sorulanlar", href: "/#faq" },
                { label: "İletişim", href: "/contact" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold tracking-tight hover:opacity-85 transition-opacity duration-200`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Footer Area */}
            <div className="flex flex-col gap-6 pl-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center text-base font-bold py-4 rounded-2xl active:scale-95 transition-all duration-200 cursor-pointer ${
                  isLight && !scrolled ? "bg-[#000c2d] text-white" : "bg-white text-[#000c2d]"
                }`}
              >
                İletişim
              </Link>
              <div className="flex justify-between items-center text-xs text-neutral-400 font-semibold border-t border-neutral-200/20 pt-6">
                <span>© {new Date().getFullYear()} Oniks Güvenlik</span>
                <a href="tel:+902128721170" className="hover:text-white">0212 872 11 70</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
