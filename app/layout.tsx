import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SVET — One Sun. One Energy. One Planet.",
  description: "Clothing that connects us all. SVET means light — not a trend, a way of life.",
  openGraph: {
    title: "SVET — One Sun. One Energy. One Planet.",
    description: "Clothing that connects us all. SVET means light — not a trend, a way of life.",
    siteName: "SVET",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
