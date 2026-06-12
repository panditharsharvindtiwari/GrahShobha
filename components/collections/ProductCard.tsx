"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

interface ProductVariant {
  size: string;
  colour: string;
  colourHex: string;
  price: number;
  fabricImage?: string;
  inStock: boolean;
  dimensions?: string;
}

interface Product {
  _id: string;
  name: string;
  room: string;
  description: string;

  variants: ProductVariant[];
  material: string;
  category: string;
  images: string[];
}

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { addToCart } = useCart();

  const defaultVariant = product.variants[0];
  const inStock = defaultVariant?.inStock ?? false;
  const displayPrice = defaultVariant?.price ?? 0;
  const displayImage = defaultVariant?.fabricImage ?? product.images[0];
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!defaultVariant) return;
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: defaultVariant.price,
      image: displayImage,
      selectedSize: defaultVariant.size,
      selectedColour: defaultVariant.colour,
      dimensions: defaultVariant.dimensions,
      selectedVariantImage: displayImage,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={`/product/${product._id}`} className="group block bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-500">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f9f7f4]">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!inStock && (
            <div className="absolute top-3 right-3 bg-[#1a1a1a] text-[10px] uppercase tracking-widest text-[#c9a96e] px-3 py-1 font-dm">
              Out of Stock
            </div>
          )}
          {/* Material badge */}
          <div className="absolute top-3 left-3 bg-white/90 text-[10px] uppercase tracking-widest text-[#9a8060] px-2 py-1 font-dm capitalize">
            {product.material}
          </div>

          {/* Add to Cart overlay button */}
          {inStock && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                id={`add-to-cart-${product._id}`}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a]/90 backdrop-blur-sm text-[#c9a96e] py-3 text-[11px] uppercase tracking-widest font-dm hover:bg-[#c9a96e] hover:text-[#1a1a1a] transition-all duration-300"
              >
                <FiShoppingBag size={13} />
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="w-6 h-px bg-[#c9a96e] mb-3 transition-all duration-300 group-hover:w-12" />
          <h3 className="font-cormorant text-xl text-[#1a1a1a] font-medium leading-tight group-hover:text-[#a07840] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-xs text-[#707070] mt-1.5 font-dm leading-relaxed line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <p className="font-cormorant text-lg text-[#1a1a1a] font-medium">
              ₹{displayPrice.toLocaleString("en-IN")}
            </p>
            {defaultVariant && (
              <span className="text-[10px] uppercase tracking-widest text-[#9a8060] font-dm capitalize">
                {defaultVariant.size}
              </span>
            )}
          </div>

          {/* View detail hint */}
          <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] font-dm">
              View Details
            </span>
            <div className="flex-1 h-px bg-[#c9a96e]/40" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
