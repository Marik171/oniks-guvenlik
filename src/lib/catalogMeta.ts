// Category/brand values are free-text on each product (owner can introduce a
// brand-new one just by typing it while adding a product, and it
// automatically becomes its own filter). These dictionaries only supply nicer
// display copy for the categories/brands that shipped with the original
// catalog — anything not listed here still works, just with a plainer label.
export const CATEGORY_LABELS: Record<string, string> = {
  "ip-interkom": "IP İnterkom",
  diafon: "Görüntülü Diafon",
  kamera: "Güvenlik Kamerası",
  uydu: "Merkezi Uydu & TV",
  akilliev: "Akıllı Ev Otomasyonu",
  turnike: "Turnike Sistemleri",
  otopark: "Otopark & Bariyer",
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export const BRAND_TAGLINES: Record<string, { tagline: string; description: string }> = {
  Teknoline: {
    tagline: "Tek Kablo İnterkom Altyapısı & Merkezi Uydu Dağıtım Sistemleri",
    description:
      "Yerli mühendislik gücü ile geliştirilen, tek kablo (TBUS) IP interkom sistemleri, merkezi fiber ve koaksiyel uydu dağıtım çözümleri.",
  },
  Fanvil: {
    tagline: "Küresel SIP Standartlarında Akıllı IP İnterkom & Telefonlar",
    description:
      "Android ve Linux işletim sistemli, yapay zeka yüz tanıma özellikli, küresel SIP 2.0 ve ONVIF protokollerine uyumlu profesyonel IP interkom donanımları.",
  },
  Audio: {
    tagline: "Türkiye'nin Lider Görüntülü Diafon & Apartman Çözümleri",
    description:
      "Sıva altı ve sıva üstü lüks dokunmatik daire içi monitörler, apartman zil panelleri ve geniş yetkili servis ağı güvencesi.",
  },
  "Nexus Visio": {
    tagline: "Ekonomik, Dijital ve Vidasız Kolay Kurulum Diafon Modelleri",
    description:
      "Soketli montaj altyapısı, anti-bloke hat koruması ve dayanıklı şifreli/kartlı apartman zil panelleri içeren bütçe dostu diafon sistemleri.",
  },
  Makim: {
    tagline: "Yerli Üretim Turnike ve Geçiş Kontrol Sistemleri",
    description:
      "304 paslanmaz çelik gövdeli tripod, yarım boy, boy, hızlı geçiş ve VIP turnike modelleriyle her ölçekte yaya geçiş kontrolü.",
  },
};

export function getBrandInfo(brand: string): { tagline: string; description: string } {
  return (
    BRAND_TAGLINES[brand] ?? {
      tagline: "Geçiş Kontrol ve Çevre Güvenliği Çözümleri",
      description:
        "Siteniz, apartmanınız veya iş merkeziniz için tamamlayıcı güvenlik donanımları ve profesyonel ekipmanlar.",
    }
  );
}
