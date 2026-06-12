"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiX, FiInstagram, FiFacebook } from "react-icons/fi";

const INSTAGRAM_URL =
  "https://www.instagram.com/grahshobha_kalakendra?igsh=ODZieWhhbmRxZG9s&utm_source=qr";
const FACEBOOK_URL =
  "https://www.facebook.com/share/1HpbtvVj57/?mibextid=wwXIfr";

const COLLECTIONS = [
  { name: "Living Room", slug: "living-room" },
  { name: "Bedroom", slug: "bedroom" },
  { name: "Dining Room", slug: "dining-room" },
  { name: "Home Office", slug: "home-office" },
  { name: "Storage & Wardrobes", slug: "storage" },
  { name: "Outdoor", slug: "outdoor" },
];

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Our Work", href: "/work" },
  { name: "About Us", href: "/about" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.25 } },
};

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#0d0d0d]/98 backdrop-blur-sm flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-[#c9a96e]/10">
            <span className="font-cormorant text-xl tracking-[0.2em] text-ivory-200 uppercase">
              GrahShobha
            </span>
            <button
              onClick={onClose}
              className="text-ivory-300 hover:text-[#c9a96e] transition-colors duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Gold rule */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent mx-6" />

          {/* Links */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col justify-center px-8 gap-6"
          >
            {LINKS.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-cormorant text-4xl font-light tracking-wide text-ivory-200 hover:text-[#c9a96e] transition-colors duration-300 hover-gold-underline"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Collections sub-links */}
            <motion.div variants={itemVariants} className="mt-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]/60 mb-3">
                Collections
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {COLLECTIONS.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    onClick={onClose}
                    className="text-sm text-ivory-400 hover:text-[#c9a96e] transition-colors duration-300 tracking-wide"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.nav>

          {/* Social icons */}
          <div className="px-8 py-8 border-t border-[#c9a96e]/10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]/50 mb-4">
              Follow Us
            </p>
            <div className="flex gap-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — @grahshobha_kalakendra"
                className="w-11 h-11 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-300"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook — GrahShobha"
                className="w-11 h-11 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-300"
              >
                <FiFacebook size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
