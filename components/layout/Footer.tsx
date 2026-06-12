"use client";

import Link from "next/link";
import {
  FiInstagram,
  FiFacebook,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const INSTAGRAM_URL =
  "https://www.instagram.com/grahshobha_kalakendra?igsh=ODZieWhhbmRxZG9s&utm_source=qr";
const FACEBOOK_URL =
  "https://www.facebook.com/share/1HpbtvVj57/?mibextid=wwXIfr";
const GOOGLE_MAPS_URL = "https://share.google/IfLsqoolh5SG7cNNS";
const MANAGER_PHONE = "+919183434135";
const MANAGER_PHONE_DISPLAY = "+91 91834 34135";
const ADDRESS_LINE1 = "111, Surasa Agar Road, Unhel Bypass,";
const ADDRESS_LINE2 = "Near D-Mart, Ujjain, Madhya Pradesh";
const EMAIL = "gskkfurnishings@gmail.com";

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Our Work", href: "/work" },
  { name: "About Us", href: "/about" },
];

const COLLECTIONS = [
  { name: "Living Room", slug: "living-room" },
  { name: "Bedroom", slug: "bedroom" },
  { name: "Dining Room", slug: "dining-room" },
  { name: "Home Office", slug: "home-office" },
  { name: "Storage & Wardrobes", slug: "storage" },
  { name: "Outdoor", slug: "outdoor" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#c9a96e]/10">
      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Left: Brand ── */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-cormorant text-2xl tracking-[0.25em] uppercase text-ivory-200 font-light">
                GrahShobha
              </h3>
              <p className="text-xs tracking-[0.2em] text-[#c9a96e] uppercase mt-1 font-dm">
                Crafting Spaces. Defining Elegance.
              </p>
            </div>
            <div className="w-10 h-px bg-[#c9a96e]/40 mt-2" />
            <p className="text-sm text-ivory-400/70 leading-relaxed max-w-xs font-dm">
              Born in Ujjain, our furniture is a celebration of Indian craftsmanship
              and timeless design. Every piece tells a story.
            </p>
            <div className="mt-4">
              <p className="text-xs text-ivory-400/40 font-dm">
                © 2025 GrahShobha. All Rights Reserved.
              </p>
              <p className="text-xs text-[#c9a96e]/50 mt-1 font-dm tracking-wider">
                @grahshobha
              </p>
            </div>
          </div>

          {/* ── Center: Quick Links ── */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] mb-6 font-dm">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 mb-8">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ivory-300/70 hover:text-[#c9a96e] transition-colors duration-300 tracking-wide font-dm hover-gold-underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] mb-4 font-dm">
              Collections
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  className="text-xs text-ivory-400/60 hover:text-[#c9a96e] transition-colors duration-300 font-dm"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: Contact ── */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] mb-6 font-dm">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              {/* Phone */}
              <a
                href={`tel:${MANAGER_PHONE}`}
                className="flex items-center gap-3 group"
                aria-label="Call us"
              >
                <div className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e]/10 group-hover:border-[#c9a96e] transition-all duration-300 flex-shrink-0">
                  <FiPhone size={14} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#c9a96e]/60 font-dm">
                    Manager / WhatsApp
                  </p>
                  <p className="text-sm text-ivory-300 group-hover:text-[#c9a96e] transition-colors duration-300 font-dm">
                    {MANAGER_PHONE_DISPLAY}
                  </p>
                </div>
              </a>

              {/* Address + Maps */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
                aria-label="Get directions on Google Maps"
              >
                <div className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e]/10 group-hover:border-[#c9a96e] transition-all duration-300 flex-shrink-0 mt-0.5">
                  <FiMapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#c9a96e]/60 font-dm">
                    Factory &amp; Showroom
                  </p>
                  <p className="text-sm text-ivory-300 group-hover:text-[#c9a96e] transition-colors duration-300 font-dm leading-relaxed">
                    {ADDRESS_LINE1}<br />{ADDRESS_LINE2}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 group"
                aria-label="Email us"
              >
                <div className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e]/10 group-hover:border-[#c9a96e] transition-all duration-300 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#c9a96e]/60 font-dm">
                    Email
                  </p>
                  <p className="text-sm text-ivory-300 group-hover:text-[#c9a96e] transition-colors duration-300 font-dm">
                    {EMAIL}
                  </p>
                </div>
              </a>

              {/* Social */}
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]/60 mb-3 font-dm">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram — @grahshobha_kalakendra"
                    className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-300"
                  >
                    <FiInstagram size={14} />
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook — GrahShobha"
                    className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-300"
                  >
                    <FiFacebook size={14} />
                  </a>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Find us on Google Maps"
                    className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-300"
                  >
                    <FiMapPin size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-ivory-400/30 font-dm tracking-wide">
            Handcrafted with passion in Ujjain, Madhya Pradesh.
          </p>
          <p className="text-[11px] text-[#c9a96e]/30 font-dm tracking-widest uppercase">
            GrahShobha
          </p>
        </div>
      </div>
    </footer>
  );
}
