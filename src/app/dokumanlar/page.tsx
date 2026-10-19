import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download, Eye } from "lucide-react";

export const metadata = {
  title: "Dökümanlar | Oniks Güvenlik",
  description: "Ürün katalogları, kullanım kılavuzları ve eğitim videoları.",
};

interface PdfDoc {
  title: string;
  brand: string;
  description: string;
  file: string;
  size: string;
}

// To add a document: drop the PDF into public/dokumanlar and add an entry here.
const PDF_DOCS: PdfDoc[] = [
  {
    title: "i60K SIP Villa Tipi Kapı Paneli",
    brand: "Fanvil",
    description: "Teknik özellikler ve ürün tanıtımı.",
    file: "fanvil-i60k.pdf",
    size: "1.3 MB",
  },
  {
    title: "i67 Yüz Tanımalı Kapı Paneli",
    brand: "Fanvil",
    description: "7 inç dokunmatik ekranlı yüz tanıma özellikli zil paneli.",
    file: "fanvil-i67-zil-paneli.pdf",
    size: "0.4 MB",
  },
  {
    title: "Diyafon Kataloğu 2025",
    brand: "Nexus Visio",
    description: "Görüntülü diyafon sistemleri ve apartman zil panelleri.",
    file: "nexus-visio-diyafon-katalog-2025.pdf",
    size: "11 MB",
  },
  {
    title: "Işıklı Sıva Altı Panel Altlığı ve Dokunmatik Zil Paneli",
    brand: "Audio",
    description: "Audio zil paneli ürün kataloğu.",
    file: "audio-zil-paneli-katalog.pdf",
    size: "18 MB",
  },
  {
    title: "IP Ürün Kataloğu",
    brand: "Teknoline",
    description: "Tek kablo IP interkom ve uydu dağıtım ürünleri.",
    file: "teknoline-ip-urun-katalogu.pdf",
    size: "6.3 MB",
  },
];

// To add media: drop the .webp / .mp4 (+ .webp poster) into public/dokumanlar/foto or /video.
const PHOTOS = Array.from({ length: 9 }, (_, i) => ({
  src: `/dokumanlar/foto/fanvil-${i + 1}.webp`,
  alt: `Fanvil ürün görseli ${i + 1}`,
}));

const VIDEOS = [1, 2, 3].map((n) => ({
  src: `/dokumanlar/video/fanvil-video-${n}.mp4`,
  poster: `/dokumanlar/video/fanvil-video-${n}.webp`,
  title: `Fanvil Tanıtım Videosu ${n}`,
}));

export default function DokumanlarPage() {
  return (
    <div className="min-h-screen w-full bg-white text-securus-dark font-sans">
      <Navbar variant="light" />

      <main className="relative pt-36 md:pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full w-fit">
            <span className="w-1.5 h-1.5 bg-[#000c2d] rounded-full" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Dökümanlar
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#000c2d]">
            Dökümanlar &amp; Videolar
          </h1>
          <p className="text-neutral-500 font-medium">
            Ürün katalogları ve teknik dökümanlar. Ürün görselleri ve tanıtım videoları.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#000c2d]">PDF Dökümanlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PDF_DOCS.map((doc) => (
              <div
                key={doc.file}
                className="flex flex-col gap-4 p-6 rounded-3xl border border-neutral-200 bg-neutral-50 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#f1f1f1] text-neutral-600 px-3 py-1 rounded-full">
                    {doc.brand}
                  </span>
                  <FileText className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold tracking-tight text-[#000c2d]">{doc.title}</h3>
                  <p className="text-sm font-medium text-neutral-500">{doc.description}</p>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <span className="text-xs font-bold text-neutral-500">PDF · {doc.size}</span>
                  <div className="flex gap-2">
                    <a
                      href={`/dokumanlar/${doc.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-[#000c2d] hover:bg-neutral-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" /> Görüntüle
                    </a>
                    <a
                      href={`/dokumanlar/${doc.file}`}
                      download={doc.file}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#000c2d] text-sm font-bold text-white hover:bg-[#000c2d]/90 active:scale-95 transition-all"
                    >
                      <Download className="w-4 h-4" /> İndir
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#000c2d]">Görseller</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PHOTOS.map((photo) => (
              <a
                key={photo.src}
                href={photo.src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center aspect-[4/3] rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </a>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#000c2d]">Videolar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((video) => (
              <div key={video.src} className="flex flex-col gap-3">
                <video
                  controls
                  preload="none"
                  poster={video.poster}
                  className="w-full aspect-video rounded-2xl bg-black"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <h3 className="text-sm font-bold text-[#000c2d]">{video.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
