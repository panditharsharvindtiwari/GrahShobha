"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiMinus, FiPlus, FiShoppingBag, FiCopy, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const WA_NUMBER = "919183434135";

export default function CartDrawer() {
  const {
    cartItems,
    totalCount,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    updateQty,
    clearCart,
  } = useCart();

  const [copied, setCopied] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const itemLines = cartItems
      .map(
        (item, i) =>
          `${i + 1}. ${item.name}\n   Size: ${item.selectedSize || 'N/A'}\n   Colour: ${item.selectedColour || 'N/A'}\n   Dimensions: ${item.dimensions || 'N/A'}\n   Price: ₹${item.price.toLocaleString("en-IN")} × ${item.qty}\n   Product Image: ${item.selectedVariantImage || item.image}`
      )
      .join("\n\n");

    const message = `Hello GrahShobha! 🛋️\nI am interested in the following:\n\n${itemLines}\n\nEstimated Total: ₹${totalPrice.toLocaleString("en-IN")}\n\nPlease confirm availability and delivery.`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

    clearCart();
    closeDrawer();
    window.open(url, "_blank");
  };

  const copyImages = () => {
    const urls = cartItems.map(i => i.selectedVariantImage || i.image).join("\n");
    navigator.clipboard.writeText(urls);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[160] bg-[#141414] border-l border-[#c9a96e]/15 flex flex-col shadow-2xl"
          >
            {/* Gold top accent */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent flex-shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#c9a96e]/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <FiShoppingBag size={18} className="text-[#c9a96e]" />
                <span className="font-cormorant text-xl tracking-[0.15em] text-ivory-200 uppercase">
                  Your Cart
                </span>
                {totalCount > 0 && (
                  <span className="text-[11px] bg-[#c9a96e] text-[#1a1a1a] font-dm font-semibold px-2 py-0.5 rounded-full">
                    {totalCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="text-ivory-400/60 hover:text-[#c9a96e] transition-colors duration-300 p-1"
                aria-label="Close cart"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <FiShoppingBag size={40} className="text-[#c9a96e]/30" />
                  <p className="font-cormorant text-xl text-ivory-300 font-light">
                    Your cart is empty
                  </p>
                  <p className="text-xs text-ivory-400/50 font-dm">
                    Browse our collections and add pieces you love.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.cartItemId}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 border-b border-[#c9a96e]/8 pb-5"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-[#1f1f1f] overflow-hidden">
                        <Image
                          src={item.selectedVariantImage || item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-cormorant text-base text-ivory-200 leading-tight truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {item.selectedSize && <span className="text-[10px] text-ivory-400/60 uppercase">{item.selectedSize}</span>}
                          {item.selectedSize && item.selectedColour && <span className="text-ivory-400/30">•</span>}
                          {item.selectedColour && <span className="text-[10px] text-ivory-400/60 capitalize">{item.selectedColour}</span>}
                        </div>
                        <p className="text-sm text-[#c9a96e] font-dm mt-1">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="w-7 h-7 border border-[#c9a96e]/30 flex items-center justify-center text-ivory-300 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={11} />
                          </button>
                          <span className="text-sm font-dm text-ivory-200 w-4 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                            className="w-7 h-7 border border-[#c9a96e]/30 flex items-center justify-center text-ivory-300 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-200"
                            aria-label="Increase quantity"
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-ivory-400/30 hover:text-red-400 transition-colors duration-300 self-start mt-1 flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiX size={15} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-[#c9a96e]/10 px-6 py-6 flex-shrink-0 bg-[#0f0f0f]">
                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-[0.25em] text-ivory-400/60 font-dm">
                    Estimated Total
                  </span>
                  <span className="font-cormorant text-2xl text-ivory-200 font-light">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[10px] text-ivory-400/40 font-dm mb-5 leading-relaxed">
                  Prices are indicative. Final pricing confirmed on enquiry.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-6 font-dm text-sm uppercase tracking-widest hover:bg-[#20ba5a] transition-colors duration-300 w-full min-h-[48px]"
                  >
                    <FaWhatsapp size={18} />
                    Enquire on WhatsApp
                  </button>
                  <button
                    onClick={copyImages}
                    className="flex items-center justify-center gap-2 py-3 px-6 border border-[#c9a96e]/30 text-[#c9a96e] font-dm text-xs uppercase tracking-widest hover:border-[#c9a96e] hover:bg-[#c9a96e]/5 transition-all duration-300 w-full min-h-[44px]"
                  >
                    {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    {copied ? "Images Copied!" : "Copy Product Images"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
