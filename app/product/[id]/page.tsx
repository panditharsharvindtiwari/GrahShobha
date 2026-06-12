"use client";

import { useState, useEffect } from "react";
import { PRODUCTS, ROOMS } from "@/lib/mockData";
import InnerLayout from "@/components/layout/InnerLayout";
import ProductCard from "@/components/collections/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const WA_NUMBER = "919183434135";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p._id === params.id);
  if (!product) notFound();

  const room = ROOMS.find((r) => r.slug === product.room);
  const related = PRODUCTS.filter(
    (p) => p.room === product.room && p._id !== product._id
  ).slice(0, 3);

  // Extract unique sizes and colours from variants
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const uniqueColours = product.variants.filter((v, i, a) => a.findIndex(t => t.colour === v.colour) === i).map(v => ({ name: v.colour, hex: v.colourHex }));

  // Independent selection state
  const [selectedSize, setSelectedSize] = useState<string | null>(uniqueSizes.length > 0 ? uniqueSizes[0] : null);
  const [selectedColour, setSelectedColour] = useState<string | null>(uniqueColours.length > 0 ? uniqueColours[0].name : null);
  const [activeVariant, setActiveVariant] = useState(product.variants[0] || null);
  
  const [activeImage, setActiveImage] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const { addToCart } = useCart();
  
  // Sync variant when size or colour changes
  useEffect(() => {
    if (selectedSize && selectedColour) {
      const variant = product.variants.find(v => v.size === selectedSize && v.colour === selectedColour) || product.variants.find(v => v.colour === selectedColour) || product.variants.find(v => v.size === selectedSize);
      if (variant) {
        setActiveVariant(variant);
        setActiveImage(0);
      }
    }
  }, [selectedSize, selectedColour, product.variants]);

  const currentImages = activeVariant?.fabricImage ? [activeVariant.fabricImage, ...product.images.filter(img => img !== activeVariant.fabricImage)] : product.images;
  const currentPrice = activeVariant?.price ?? (product.variants[0]?.price || 0);
  const currentStock = activeVariant?.inStock ?? false;
  const currentDimensions = activeVariant?.dimensions ?? "";

  const handleAddToCart = () => {
    if (uniqueSizes.length > 0 && !selectedSize) {
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 3000);
      return;
    }
    if (uniqueColours.length > 0 && !selectedColour) {
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 3000);
      return;
    }
    if (!activeVariant && product.variants.length > 0) return;
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: currentPrice,
      image: currentImages[0],
      selectedSize: selectedSize || undefined,
      selectedColour: selectedColour || undefined,
      dimensions: currentDimensions || undefined,
      selectedVariantImage: currentImages[0],
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi GrahShobha! I am interested in the ${product.name} (Rs.${currentPrice.toLocaleString("en-IN")})${selectedSize || selectedColour ? ` in ${selectedSize || ''} ${selectedColour || ''}`.trim() : ''}. Could you share more details?`
  );

  return (
    <InnerLayout>
      <div className="bg-[#fdfcfa] min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-xs text-[#9a8060] font-dm tracking-wide mb-10"
          >
            <Link href="/collections" className="hover:text-[#c9a96e] transition-colors duration-300">
              Collections
            </Link>
            <span>/</span>
            <Link
              href={`/collections/${product.room}`}
              className="hover:text-[#c9a96e] transition-colors duration-300 capitalize"
            >
              {room?.name}
            </Link>
            <span>/</span>
            <span className="text-[#505050]">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/3] bg-[#f5f0e8] overflow-hidden mb-3">
                <Image
                  src={currentImages[activeImage] || currentImages[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {currentImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                  {currentImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 aspect-square flex-shrink-0 snap-start overflow-hidden border-2 transition-all duration-300 ${
                        activeImage === i
                          ? "border-[#c9a96e]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] font-dm mb-4">
                {room?.name}
              </p>
              <h1 className="font-cormorant text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight">
                {product.name}
              </h1>
              <div className="w-12 h-px bg-[#c9a96e] my-5" />
              <p className="font-cormorant text-3xl text-[#1a1a1a] font-medium">
                ₹{currentPrice.toLocaleString("en-IN")}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${currentStock ? "bg-green-500" : "bg-red-400"}`} />
                <span className="text-xs font-dm text-[#707070] tracking-wide">
                  {currentStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <p className="text-sm text-[#505050] font-dm leading-relaxed mt-6">
                {product.description}
              </p>
              
              {/* Variants Selector */}
              {product.variants.length > 0 && (
                <div className="mt-8 flex flex-col gap-6">
                  {/* Sizes (Pill Style) */}
                  {uniqueSizes.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#9a8060] font-dm mb-3">Select Size</p>
                      <div className="flex flex-wrap gap-2">
                        {uniqueSizes.map(size => {
                          const isActive = selectedSize === size;
                          // Find price for this size
                          const variantForSize = product.variants.find(v => v.size === size && v.colour === selectedColour) || product.variants.find(v => v.size === size);
                          const priceStr = variantForSize ? `₹${variantForSize.price.toLocaleString("en-IN")}` : "";
                          
                          return (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2.5 rounded-full text-xs font-dm border transition-all duration-300 flex items-center gap-2 ${isActive ? 'border-[#c9a96e] bg-[#c9a96e] text-white shadow-md' : 'border-gray-300 text-[#505050] hover:border-[#c9a96e]'}`}
                            >
                              <span>{size}</span>
                              {priceStr && <span className={isActive ? "text-white/80" : "text-gray-400"}>{priceStr}</span>}
                              {isActive && <span className="ml-1">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                      {/* Dimensions below selected chip */}
                      {currentDimensions && (
                        <p className="text-xs text-[#707070] font-dm mt-3 italic">
                          Dimensions: {currentDimensions}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Colours (Circular Swatches) */}
                  {uniqueColours.length > 0 && (
                    <div className="mt-2">
                      <p className="text-[10px] uppercase tracking-widest text-[#9a8060] font-dm mb-3 flex items-center gap-2">
                        Select Colour: <span className="text-[#1a1a1a] capitalize font-semibold">{selectedColour || 'None'}</span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {uniqueColours.map(c => {
                          const isActive = selectedColour === c.name;
                          return (
                            <div key={c.name} className="relative group">
                              <button
                                onClick={() => setSelectedColour(c.name)}
                                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${isActive ? 'border-[#c9a96e] scale-110 p-1' : 'border-transparent hover:scale-105'}`}
                                aria-label={`Select colour ${c.name}`}
                                title={c.name}
                              >
                                <div className="w-full h-full rounded-full" style={{ backgroundColor: c.hex, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }} />
                              </button>
                              {/* Custom tooltip fallback since native title is sometimes slow */}
                              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-dm">
                                {c.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showPrompt && (
                <p className="text-red-500 text-xs font-dm mt-4 bg-red-50 p-2 rounded animate-pulse inline-block self-start">
                  Please select a size and colour to continue.
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 mt-8 p-5 bg-[#f5f0e8]/60 border border-[#c9a96e]/10 rounded-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#9a8060] font-dm">Size</p>
                  <p className="text-sm text-[#1a1a1a] font-dm mt-1 capitalize">{selectedSize || '-'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#9a8060] font-dm">Material</p>
                  <p className="text-sm text-[#1a1a1a] font-dm mt-1 capitalize">{product.material}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#9a8060] font-dm">Collection</p>
                  <p className="text-sm text-[#1a1a1a] font-dm mt-1">{room?.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#9a8060] font-dm">Availability</p>
                  <p className="text-sm text-[#1a1a1a] font-dm mt-1">
                    {currentStock ? "Ready to Ship" : "On Order"}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4 fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 md:relative md:p-0 md:bg-transparent md:border-none z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] md:shadow-none">
                {currentStock && (
                  <button
                    onClick={handleAddToCart}
                    id={`product-add-to-cart-${product._id}`}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#1a1a1a] text-[#c9a96e] border border-[#c9a96e]/30 py-4 px-8 font-dm text-sm uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#1a1a1a] transition-all duration-300"
                  >
                    <FiShoppingBag size={16} />
                    Add to Cart
                  </button>
                )}

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-8 font-dm text-sm uppercase tracking-widest hover:bg-[#20ba5a] transition-colors duration-300"
                >
                  <FaWhatsapp size={18} />
                  Enquire on WhatsApp
                </a>
              </div>

              <Link
                href={`/collections/${product.room}`}
                className="mt-5 flex items-center gap-2 text-xs text-[#9a8060] font-dm tracking-wide hover:text-[#c9a96e] transition-colors duration-300 w-fit"
              >
                <FiArrowLeft size={14} />
                Back to {room?.name}
              </Link>
            </motion.div>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <div className="text-center mb-10">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-3 font-dm">
                  You May Also Like
                </p>
                <h2 className="font-cormorant text-3xl font-light text-[#1a1a1a]">
                  From the {room?.name}
                </h2>
                <div className="w-10 h-px bg-[#c9a96e] mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p._id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </InnerLayout>
  );
}
