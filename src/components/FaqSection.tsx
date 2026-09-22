"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "1. Oniks Güvenlik hangi marka diafon ve interkomlarla çalışmaktadır?",
    answer: "Ağırlıklı olarak MAS İnterkom, Multitek Elektronik ve Audio Elektronik markalarının görüntülü diafon ve interkom sistemlerinin satışını, montajını ve yetkili servisliğini yapıyoruz. Ayrıca villa ve siteler için yeni nesil SIP destekli Fanvil IP interkom cihazlarının da kurulumunu gerçekleştirmekteyiz.",
  },
  {
    id: 2,
    question: "2. Kamera kurulumu yaptırmadan önce keşif hizmetiniz var mı?",
    answer: "Evet, İstanbul Avrupa Yakası genelinde ücretsiz keşif hizmetimiz bulunmaktadır. Teknik ekibimiz binanızı yerinde inceleyerek kör noktaları tespit eder ve ihtiyacınız olan doğru kamera açılarını ve sistem mimarisini belirler.",
  },
  {
    id: 3,
    question: "3. Eski analog diafon sistemimizi yeni görüntülü sisteme dönüştürebilir misiniz?",
    answer: "Kesinlikle. Eski ve sık arızalanan analog diafon hatlarınızı sökerek yerlerine MAS, Audio veya Multitek marka yeni nesil görüntülü veya IP interkom sistemlerinin kurulumunu ve kablolama işlemlerini profesyonelce tamamlıyoruz.",
  },
  {
    id: 4,
    question: "4. Otopark bariyer, OGS ve plaka tanıma sistemleri kuruyor musunuz?",
    answer: "Evet. Siteler, plazalar ve kurumsal işletmeler için araç giriş-çıkış kontrolünü sağlayan hızlı bariyerler, OGS etiketli geçişler ve plaka tanıma kamerası yazılımları kurarak trafiği akıcı ve güvenli hale getiriyoruz.",
  },
  {
    id: 5,
    question: "5. Kurulum sonrası arıza durumlarında teknik servis desteğiniz nasıl işliyor?",
    answer: "Satış sonrasında teknik desteğe çok önem veriyoruz. Kamera, kayıt cihazı, bariyer veya diafon arızalarında telefon veya WhatsApp hattımız üzerinden bize ulaştığınızda, teknik ekibimiz hızlı arıza tespiti ve parça değişimi için adresinize sevk edilir.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Question 1 is open by default

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative bg-white text-securus-dark py-20 md:py-32 px-6 md:px-12 w-full overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Heading details */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 text-left lg:sticky lg:top-24">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit"
            >
              <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
                Sıkça Sorulanlar
              </span>
            </motion.div>

            {/* Title Header */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] text-[#000c2d]"
            >
              Aklınıza Takılan <br />
              <span className="font-serif italic font-normal text-[#000c2d]">
                Sorular mı Var?
              </span>
            </motion.h2>

            {/* Split CTA Buttons in Dark Navy */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <Link
                href="/contact"
                className="bg-[#000c2d] text-white text-sm md:text-base font-semibold px-6 md:px-7 py-3.5 md:py-4 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
              >
                İletişime Geçin
              </Link>
              <Link
                href="/contact"
                className="bg-[#000c2d] text-white p-3.5 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d] focus-visible:outline-offset-2"
                aria-label="Oniks Güvenlik iletişim bilgileri"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6 stroke-[2.5]" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Accordion Items List */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {FAQ_ITEMS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-[#f1f1f1] rounded-[1.8rem] overflow-hidden transition-shadow duration-300 shadow-sm border border-neutral-200/20"
                >
                  {/* Header Button Toggle */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between text-left px-6 md:px-8 py-5 md:py-6 cursor-pointer text-[#000c2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000c2d]"
                    aria-expanded={isActive}
                  >
                    <span className="text-base md:text-lg font-bold tracking-tight pr-4">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#000c2d]"
                    >
                      {isActive ? (
                        <Minus className="w-5 h-5 stroke-[3]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[3]" />
                      )}
                    </motion.div>
                  </button>

                  {/* Accordion Text Expand/Collapse */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 text-neutral-500 text-sm md:text-base font-semibold leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
