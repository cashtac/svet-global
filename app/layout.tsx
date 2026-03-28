import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { I18nProvider } from "@/lib/i18n-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: "SVET — One Sun. One Energy. One Planet.",
  description: "Clothing that connects us all. SVET means light — philosophy-driven fashion for a connected world. Pre-order hoodies, tees, and accessories now.",
  manifest: "/manifest.json",
  keywords: ["SVET", "clothing", "fashion", "sustainable", "one sun", "one energy", "one planet", "streetwear", "philosophy"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SVET",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "SVET — One Sun. One Energy. One Planet.",
    description: "Clothing that connects us all. SVET means light — philosophy-driven fashion for a connected world.",
    siteName: "SVET",
    type: "website",
    url: "https://svet.global",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVET — One Sun. One Energy. One Planet.",
    description: "Clothing that connects us all. Pre-order now at exclusive prices.",
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
    <html lang="en">
      <head>
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
            <LanguageSelector />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
