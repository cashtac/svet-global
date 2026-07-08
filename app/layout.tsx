import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { I18nProvider } from "@/lib/i18n-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Analytics } from "@/components/Analytics";
import { RegionSwitcher } from "@/components/RegionSwitcher";

const LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'en';
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://svet.global';
const isRu = LOCALE === 'ru';

const title = isRu
  ? "SVET — Одно Солнце. Одна Энергия. Одна Планета."
  : "SVET — One Sun. One Energy. One Planet.";

const description = isRu
  ? "Одежда, которая объединяет. SVET (СВЕТ) — философия в каждой вещи. Предзаказ худи, футболок и аксессуаров."
  : "Clothing that connects us all. SVET means light — philosophy-driven fashion for a connected world. Pre-order hoodies, tees, and accessories now.";

export const metadata: Metadata = {
  title,
  description,
  manifest: "/manifest.json",
  keywords: isRu
    ? ["SVET", "СВЕТ", "одежда", "мода", "уличная одежда", "философия", "стиль", "худи", "предзаказ"]
    : ["SVET", "clothing", "fashion", "sustainable", "one sun", "one energy", "one planet", "streetwear", "philosophy"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SVET",
  },
  formatDetection: { telephone: false },
  openGraph: {
    title,
    description,
    siteName: "SVET",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: isRu
      ? "Одежда, которая объединяет. Предзаказ по эксклюзивным ценам."
      : "Clothing that connects us all. Pre-order now at exclusive prices.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    languages: {
      'en': 'https://svet.global',
      'ru': 'https://ru.svet.global',
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={isRu ? 'ru' : 'en'}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Analytics />
        <I18nProvider>
          <CartProvider>
            <LoadingScreen />
            {!isRu && <LanguageSelector />}
            <Navbar />
            <main>{children}</main>
            <Footer />
            <RegionSwitcher />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
