"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  href?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 20,
    },
  },
} as const;

function ServiceCard({ image, title, description, href }: ServiceCardProps) {
  const card = (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`flex flex-col bg-[#f1f1f1] rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-md ${href ? "cursor-pointer" : ""}`}
    >
      {/* Top Image (aspect-[4/3] to fit standard sizes) */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale-[10%]"
          loading="lazy"
          decoding="async"
        />
        {/* Subtle top light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f1f1f1]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Card Content block */}
      <div className="flex flex-col gap-3 p-6 md:p-8 text-left">
        <h3 className="text-xl md:text-2xl font-bold text-[#000c2d] leading-none">
          {title}
        </h3>
        <p className="text-sm md:text-base text-neutral-500 font-medium leading-relaxed mt-2">
          {description}
        </p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    );
  }

  return card;
}

export default function ServicesSection() {
  const services = [
    {
      image: "/images/service-onsite.webp",
      title: "Görüntülü Diafon & IP İnterkom",
      description: "Apartman, site ve villalar için yüksek ses ve görüntü kaliteli, şifre ve kartlı geçiş destekli diyafon sistemleri.",
      href: "/services?category=interkom",
    },
    {
      image: "/images/service-cctv.webp",
      title: "Güvenlik Kamera Sistemleri",
      description: "AHD ve IP kamera kurulumu, kör nokta tespiti ve mobil cihazlardan 7/24 kesintisiz canlı izleme altyapısı.",
      href: "/services?category=kamera",
    },
    {
      image: "/images/service-consulting.webp",
      title: "Akıllı Ev Otomasyonu",
      description: "Aydınlatma, iklimlendirme, perde-panjur ve güvenlik sistemlerinin tek bir merkezden akıllıca yönetimi.",
      href: "/services?category=akilliev",
    },
    {
      image: "/images/service-patrols.webp",
      title: "Turnike Geçiş Sistemleri",
      description: "Fabrika, plaza ve kurumsal binalarda yaya trafiğini düzenleyen üç kollu, hızlı geçiş ve VIP turnike çözümleri.",
      href: "/services?category=turnike",
    },
    {
      image: "/images/service-event.webp",
      title: "Plaka Tanıma & OGS",
      description: "Site ve otopark girişlerinde bekleme süresini azaltan, tanımlı araçları algılayan hızlı ve otomatik geçiş.",
      href: "/services?category=otopark",
    },
    {
      image: "/images/service-emergency.webp",
      title: "Teknik Servis & Bakım",
      description: "Güvenlik sistemlerinizin kesintisiz çalışması için arıza tespiti, kablo yenileme ve periyodik kontrol desteği.",
      href: "/contact",
    },
  ];

  return (
    <section id="services" className="relative bg-white text-securus-dark py-20 md:py-32 px-6 md:px-12 w-full overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
          >
            <span className="w-1.5 h-1.5 bg-securus-dark rounded-full" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Hizmetlerimiz
            </span>
          </motion.div>

          {/* Tagline Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#000c2d] max-w-4xl mx-auto mt-2"
          >
            Teknolojiyi Güvenlikle <br />
            <span className="font-serif italic font-normal text-[#000c2d]">
              Entegre Eden Modern Çözümler.
            </span>
          </motion.h2>
        </div>

        {/* Services Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4"
          id="products"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              image={service.image}
              title={service.title}
              description={service.description}
              href={service.href}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
