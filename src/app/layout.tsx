import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Oniks Güvenlik - İnterkom, Kamera, Akıllı Ev ve Geçiş Kontrol Sistemleri",
  description: "Oniks Güvenlik, 2001'den beri görüntülü diafon, IP interkom, güvenlik kameraları, merkezi uydu ve akıllı ev otomasyon sistemleri çözümleri sunar.",
  icons: {
    icon: "/images/products/oniks-logo.png",
    shortcut: "/images/products/oniks-logo.png",
    apple: "/images/products/oniks-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

