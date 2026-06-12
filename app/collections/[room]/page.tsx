"use client";

import { useState, useMemo } from "react";
import { ROOMS, PRODUCTS } from "@/lib/mockData";
import ProductCard from "@/components/collections/ProductCard";
import SlideInFilter, { Filters } from "@/components/collections/SlideInFilter";
import InnerLayout from "@/components/layout/InnerLayout";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSliders } from "react-icons/fi";

export default function RoomPage({ params }: { params: { room: string } }) {
  const room = ROOMS.find((r) => r.slug === params.room);
  if (!room) notFound();
  const safeRoom = room!;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    collections: [],
    productTypes: [],
    sizes: [],
    materials: [],
    priceRange: [0, 500000],
    colours: [],
  });

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS.filter((p) => p.room === params.room);

    if (filters.collections.length > 0) {
      // mapping collection names to slugs or just use name from ROOMS
      const activeSlugs = ROOMS.filter(r => filters.collections.includes(r.name)).map(r => r.slug);
      // Wait, if we are on a room page, it already filters by params.room. 
      // If they select other collections, we might want to include them? 
      // Or just filter within the current room? Let's just filter within current if they select it, else it's empty.
      products = products.filter(p => activeSlugs.includes(p.room));
    }

    if (filters.productTypes.length > 0) {
      products = products.filter(p => filters.productTypes.includes(p.category));
    }

    if (filters.materials.length > 0) {
      products = products.filter(p => filters.materials.includes(p.material));
    }

    if (filters.sizes.length > 0) {
      products = products.filter(p => p.variants.some(v => filters.sizes.includes(v.size)));
    }

    if (filters.colours.length > 0) {
      // Find colours by name prefix, mockData colours might be "Olive Green" vs filter "Olive Green"
      products = products.filter(p => p.variants.some(v => {
        return filters.colours.some(c => v.colour.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(v.colour.toLowerCase()));
      }));
    }

    products = products.filter(p => {
      // Get min and max price of variants
      const minPrice = p.variants.length > 0 ? Math.min(...p.variants.map(v => v.price)) : 0;
      return minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1];
    });

    return products;
  }, [params.room, filters]);

  return (
    <InnerLayout>
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={safeRoom.image}
          alt={safeRoom.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-3 font-dm"
          >
            {safeRoom.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-cormorant text-4xl md:text-6xl font-light text-ivory-200 tracking-wide"
          >
            {safeRoom.name} Collection
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-16 h-px bg-[#c9a96e] mt-5"
          />
        </div>
      </div>

      {/* Products grid */}
      <div className="bg-[#fdfcfa] py-14 px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs text-[#9a8060] font-dm tracking-wide">
              {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-dm text-[#1a1a1a] border border-gray-200 px-4 py-2 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
            >
              <FiSliders size={14} />
              Filter
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-cormorant text-2xl text-[#505050]">
                No products match these filters.
              </p>
              <button
                onClick={() =>
                  setFilters({ collections: [], productTypes: [], sizes: [], materials: [], priceRange: [0, 500000], colours: [] })
                }
                className="mt-6 text-xs text-[#c9a96e] uppercase tracking-widest font-dm underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      <SlideInFilter 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        productCount={filteredProducts.length}
      />
    </InnerLayout>
  );
}
