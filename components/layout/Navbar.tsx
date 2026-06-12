"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiShoppingBag } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import clsx from "clsx";

const COLLECTIONS = [
  { name: "Living Room", slug: "living-room" },
  { name: "Bedroom", slug: "bedroom" },
  { name: "Dining Room", slug: "dining-room" },
  { name: "Home Office", slug: "home-office" },
  { name: "Storage & Wardrobes", slug: "storage" },
  { name: "Outdoor", slug: "outdoor" },
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Our Work", href: "/work" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide navbar on landing page
  if (pathname === "/") return null;

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#c9a96e]/10 py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="font-cormorant font-light tracking-[0.25em] text-ivory-200 uppercase group-hover:text-[#c9a96e] transition-colors duration-300"
              style={{ fontSize: "1.35rem" }}
            >
              GrahShobha
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#c9a96e]/60 uppercase font-dm mt-0.5">
              Crafting Spaces
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm tracking-widest uppercase text-ivory-300 hover:text-[#c9a96e] transition-colors duration-300"
            >
              Home
            </Link>

            {/* Collections dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm tracking-widest uppercase text-ivory-300 hover:text-[#c9a96e] transition-colors duration-300">
                Collections
                <motion.span
                  animate={{ rotate: collectionsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {collectionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-[#1a1a1a] border border-[#c9a96e]/15 shadow-2xl shadow-black/50"
                  >
                    {/* Gold top accent */}
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
                    <div className="py-2">
                      {COLLECTIONS.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/collections/${c.slug}`}
                          className="block px-5 py-2.5 text-sm text-ivory-300 hover:text-[#c9a96e] hover:bg-[#c9a96e]/5 transition-all duration-200 tracking-wide"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm tracking-widest uppercase transition-colors duration-300",
                  pathname === link.href
                    ? "text-[#c9a96e]"
                    : "text-ivory-300 hover:text-[#c9a96e]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side: Cart + Mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <button
              onClick={openDrawer}
              className="relative text-ivory-200 hover:text-[#c9a96e] transition-colors duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open cart"
              id="cart-icon-btn"
            >
              <FiShoppingBag size={20} />
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 min-w-[18px] bg-[#c9a96e] text-[#1a1a1a] text-[9px] font-dm font-bold rounded-full flex items-center justify-center leading-none px-1"
                  >
                    {totalCount > 9 ? "9+" : totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-ivory-200 hover:text-[#c9a96e] transition-colors duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
