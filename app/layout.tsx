import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";
import LeadPopup from "@/components/ui/LeadPopup";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrahShobha Interiors & Furnishings",
  description: "Luxury furniture and interiors from Ujjain",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  keywords:
    "premium furniture, luxury furniture India, handcrafted furniture, Ujjain furniture, GrahShobha, living room, bedroom furniture",
  openGraph: {
    title: "GrahShobha Interiors & Furnishings",
    description: "Luxury furniture and interiors from Ujjain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-dm bg-charcoal-800 text-ivory overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true" />
        <CartProvider>
          {children}
          <CartDrawer />
          <LeadPopup />
        </CartProvider>
      </body>
    </html>
  );
}
