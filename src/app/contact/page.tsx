"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ContactMapEmbed from "@/components/ContactMapEmbed";
import ContactShowcase from "@/components/ContactShowcase";
import Footer from "@/components/Footer";
import { ChevronRight, PhoneCall, MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const DISTRICTS = [
  "Arnavutköy", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy",
  "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beylikdüzü", "Beyoğlu",
  "Büyükçekmece", "Çatalca", "Esenler", "Esenyurt", "Eyüpsultan",
  "Fatih", "Gaziosmanpaşa", "Güngören", "Kağıthane", "Küçükçekmece",
  "Sarıyer", "Silivri", "Sultangazi", "Şişli", "Zeytinburnu"
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen w-full bg-white text-securus-dark font-sans selection:bg-[#000c2d]/10 selection:text-[#000c2d]">
      
      {/* Light Navbar Header */}
      <Navbar variant="light" />

      {/* Hero Header Space */}
      <main className="relative pt-36 md:pt-48 pb-10 w-full z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left flex flex-col gap-12">
          
          {/* Header Title */}
          <div className="flex flex-col gap-5 max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
            >
              <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
                İletişim
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-[#000c2d] leading-[1.1]"
            >
              Uzman Ekibimizle İletişime Geçin <br />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-serif italic font-normal text-[#000c2d]"
              >
                Keşif ve servis talepleriniz için buradayız
              </motion.span>
            </motion.h1>
          </div>

          {/* Form & Info Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full mt-4">
            
            {/* Left Column: Premium Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-7 flex flex-col gap-8 text-left bg-neutral-50 border border-neutral-200/50 p-8 md:p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden"
            >
              {submitted ? (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center py-20 text-center gap-4"
                >
                  <div className="w-14 h-14 bg-[#000c2d] text-white flex items-center justify-center rounded-full text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#000c2d]">
                    Mesajınız Başarıyla Gönderildi!
                  </h3>
                  <p className="text-neutral-500 font-semibold max-w-sm">
                    Bizimle iletişime geçtiğiniz için teşekkür ederiz. Teknik ekibimiz en kısa sürede talebinizi inceleyerek sizinle iletişime geçecektir.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-7 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Adınız Soyadınız"
                      className="bg-transparent border-b border-neutral-200 focus:border-[#000c2d] outline-none py-3 px-1 text-sm md:text-base text-[#000c2d] placeholder-neutral-400 font-semibold transition-colors duration-200"
                      required
                    />
                    <input
                      type="email"
                      placeholder="E-posta Adresiniz"
                      className="bg-transparent border-b border-neutral-200 focus:border-[#000c2d] outline-none py-3 px-1 text-sm md:text-base text-[#000c2d] placeholder-neutral-400 font-semibold transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      type="tel"
                      placeholder="Telefon Numaranız"
                      className="bg-transparent border-b border-neutral-200 focus:border-[#000c2d] outline-none py-3 px-1 text-sm md:text-base text-[#000c2d] placeholder-neutral-400 font-semibold transition-colors duration-200"
                    />
                    <select 
                      className="bg-transparent border-b border-neutral-200 focus:border-[#000c2d] outline-none py-3 px-1 text-sm md:text-base text-neutral-400 font-semibold cursor-pointer transition-colors duration-200"
                      required
                    >
                      <option value="" disabled selected className="text-[#000c2d]">Talep Edilen Hizmet</option>
                      <option value="diafon" className="text-[#000c2d]">Görüntülü Diafon / İnterkom</option>
                      <option value="kamera" className="text-[#000c2d]">Güvenlik Kamera Sistemleri</option>
                      <option value="akilliev" className="text-[#000c2d]">Akıllı Ev Otomasyonu</option>
                      <option value="turnike" className="text-[#000c2d]">Turnike Geçiş Sistemleri</option>
                      <option value="bariyer" className="text-[#000c2d]">Bariyer & Plaka Tanıma / OGS</option>
                      <option value="servis" className="text-[#000c2d]">Teknik Servis & Bakım</option>
                      <option value="diger" className="text-[#000c2d]">Diğer Sorular</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Lütfen güvenlik veya otomasyon sistemleri ile ilgili talebinizi açıklayın..."
                    rows={4}
                    className="bg-transparent border-b border-neutral-200 focus:border-[#000c2d] outline-none py-3 px-1 text-sm md:text-base text-[#000c2d] placeholder-neutral-400 font-semibold resize-none transition-colors duration-200"
                    required
                  />

                  {/* Submit Button Group */}
                  <div className="flex items-center gap-1.5 mt-4 self-start">
                    <button
                      type="submit"
                      className="bg-[#000c2d] text-white text-sm md:text-base font-semibold px-6 md:px-7 py-3.5 md:py-4 rounded-xl hover:bg-opacity-95 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
                    >
                      Mesaj Gönder
                    </button>
                    <button
                      type="submit"
                      className="bg-[#000c2d] text-white p-3.5 md:p-4 rounded-xl hover:bg-opacity-95 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
                      aria-label="Mesajı gönder"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Right Column: Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 flex flex-col gap-6 w-full text-left"
            >
              {/* Card 1: Office locations details */}
              <div className="bg-[#f1f1f1] border border-neutral-200/20 p-8 rounded-[2rem] flex flex-col gap-6 text-left shadow-sm">
                <h3 className="text-lg font-bold tracking-tight text-[#000c2d]">
                  Merkez Ofisimiz
                </h3>
                <div className="flex flex-col gap-4 text-sm md:text-base font-semibold text-neutral-500">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#000c2d] flex-shrink-0 mt-0.5" />
                    <span>Büyükşehir Mah. Başak Sk. Atrium İş Merkezi Kat:1 No:49, 34520 Beylikdüzü / İstanbul</span>
                  </div>
                  <a href="tel:+902128721170" className="flex items-center gap-3.5 hover:text-[#000c2d] transition-colors duration-200">
                    <Phone className="w-5 h-5 text-[#000c2d] flex-shrink-0" />
                    <span>+90 (212) 872 11 70</span>
                  </a>
                  <a href="mailto:info@oniksguvenlik.com" className="flex items-center gap-3.5 hover:text-[#000c2d] transition-colors duration-200">
                    <Mail className="w-5 h-5 text-[#000c2d] flex-shrink-0" />
                    <span>info@oniksguvenlik.com</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Technical Service Dispatch */}
              <div className="bg-[#000c2d] text-white p-8 rounded-[2rem] flex flex-col gap-5 text-left shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <h3 className="text-lg font-bold tracking-tight text-white leading-none">
                  Teknik Servis & Arıza Kayıt
                </h3>
                <p className="text-neutral-300 font-semibold text-sm md:text-base leading-relaxed">
                  Diafon, interkom, kamera ve bariyer sistemlerinizdeki arızalar için hızlı kayıt oluşturun.
                </p>
                {/* Dispatch telephone info */}
                <a href="tel:+902128721170" className="flex items-center gap-3.5 group w-fit mt-1">
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white/20 transition-all duration-200">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-bold text-base md:text-lg tracking-wide leading-none group-hover:text-neutral-200 transition-colors duration-200">
                      0212 872 11 70
                    </span>
                    <span className="text-neutral-400 text-xs font-semibold mt-1">
                      Destek Hattı (Hafta İçi)
                    </span>
                  </div>
                </a>
              </div>

              {/* Card 3: Business Hours */}
              <div className="bg-[#f1f1f1] border border-neutral-200/20 p-8 rounded-[2rem] flex flex-col gap-4 text-left shadow-sm">
                <h3 className="text-lg font-bold tracking-tight text-[#000c2d] leading-none">
                  Çalışma Saatleri
                </h3>
                <div className="flex flex-col gap-3 text-sm md:text-base font-semibold text-neutral-500 mt-1">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#000c2d] flex-shrink-0" />
                    <span>Pazartesi – Cuma: 09:00 – 18:00</span>
                  </div>
                  <div className="flex items-center gap-3 pl-8">
                    <span>Cumartesi: 09:00 – 13:00 / Pazar: Kapalı</span>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </main>

      {/* Google Maps Iframe Embedding */}
      <ContactMapEmbed />

      {/* Served Districts Grid for Local SEO */}
      <section className="bg-[#f1f1f1] py-16 md:py-24 px-6 md:px-12 w-full overflow-hidden border-t border-neutral-100">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-neutral-200 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
                Hizmet Bölgelerimiz
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#000c2d] mt-2">
              İstanbul Avrupa Yakası <br />
              <span className="font-serif italic font-normal text-[#000c2d]">
                Hizmet Verdiğimiz İlçeler
              </span>
            </h2>
            <p className="text-sm md:text-base text-neutral-500 font-semibold leading-relaxed mt-2">
              Oniks Güvenlik olarak, başta Beylikdüzü olmak üzere İstanbul Avrupa Yakası genelinde tüm ilçelere keşif, montaj, devreye alma, periyodik bakım ve hızlı teknik servis hizmeti sağlıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {DISTRICTS.map((district) => (
              <motion.div
                key={district}
                whileHover={{ y: -3, scale: 1.02, backgroundColor: "#ffffff" }}
                className="bg-white/80 backdrop-blur-sm border border-neutral-200/40 px-5 py-4 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#E30613] flex-shrink-0">
                  <MapPin className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-sm md:text-base font-bold text-[#000c2d]">
                  {district}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cool Image Grid Showcases */}
      <ContactShowcase />

      {/* Footer component */}
      <Footer />





    </div>
  );
}
