"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import clsx from "clsx";

export interface Filters {
  collections: string[];
  productTypes: string[];
  sizes: string[];
  materials: string[];
  priceRange: [number, number];
  colours: string[];
}

interface SlideInFilterProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (filters: Filters) => void;
  productCount: number;
}

const CATEGORIES = {
  collections: ["Living Room", "Bedroom", "Dining Room", "Home Office", "Storage & Wardrobes", "Outdoor"],
  productTypes: [
    "Sofas & Sectionals", "Beds & Headboards", "Wardrobes", "Dining Tables", 
    "Chairs & Recliners", "Coffee Tables", "TV Units", "Bookshelves", 
    "Dressing Tables", "Study Tables"
  ],
  sizes: {
    "Sofas & Sectionals": ["1 Seater", "2 Seater", "3 Seater", "L-Shape"],
    "Beds & Headboards": ["Single", "Double", "Queen", "King"],
    "Wardrobes": ["2 Door", "3 Door", "4 Door", "Walk-in"]
  },
  materials: [
    "Solid Wood", "Engineered Wood", "Metal Frame", "Fabric Upholstery", 
    "Leather/Leatherette", "Cane/Rattan", "Glass Top"
  ],
  colours: [
    { name: "Ivory/Cream", hex: "#f5f0e8" },
    { name: "Charcoal/Black", hex: "#333333" },
    { name: "Walnut Brown", hex: "#5C4033" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Grey", hex: "#808080" },
    { name: "Beige", hex: "#D7C2A9" },
    { name: "Navy Blue", hex: "#1B2A47" },
    { name: "Olive Green", hex: "#8A9A5B" },
    { name: "Dusty Pink", hex: "#DCAE96" }
  ]
};

export default function SlideInFilter({ isOpen, onClose, filters, onChange, productCount }: SlideInFilterProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [expandedSections, setExpandedSections] = useState<string[]>(["collection", "productType"]);

  // Sync local filters when prop changes
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const handleCheckboxChange = (category: keyof Filters, value: string) => {
    if (category === "priceRange") return;
    
    setLocalFilters(prev => {
      const arr = prev[category] as string[];
      if (arr.includes(value)) {
        return { ...prev, [category]: arr.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...arr, value] };
      }
    });
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }));
    }
  };

  const handleApply = () => {
    onChange(localFilters);
    onClose();
  };

  const handleClear = () => {
    const cleared: Filters = {
      collections: [],
      productTypes: [],
      sizes: [],
      materials: [],
      priceRange: [0, 500000],
      colours: []
    };
    setLocalFilters(cleared);
    onChange(cleared);
  };

  // Determine which sizes to show based on selected product types
  const availableSizes = Array.from(new Set(
    localFilters.productTypes.flatMap(pt => CATEGORIES.sizes[pt as keyof typeof CATEGORIES.sizes] || [])
  ));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 w-full md:w-[400px] h-full md:h-screen bg-white z-50 flex flex-col shadow-2xl overflow-hidden mt-[100vh] md:mt-0 md:-translate-y-0"
            style={{ 
              top: typeof window !== 'undefined' && window.innerWidth < 768 ? 'auto' : 0,
              bottom: 0,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="font-cormorant text-2xl text-[#1a1a1a]">Filters</h2>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-[#c9a96e] transition-colors">
                <FiX size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 md:pb-6">
              
              {/* Collection */}
              <div className="border-b border-gray-100 pb-4">
                <button onClick={() => toggleSection("collection")} className="flex items-center justify-between w-full text-left mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#1a1a1a] font-dm font-semibold">Collection</span>
                  {expandedSections.includes("collection") ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {expandedSections.includes("collection") && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
                      {CATEGORIES.collections.map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                          <div className={clsx("w-4 h-4 border flex items-center justify-center transition-colors", localFilters.collections.includes(c) ? "bg-[#1a1a1a] border-[#1a1a1a]" : "border-gray-300 group-hover:border-[#c9a96e]")}>
                            {localFilters.collections.includes(c) && <FiX size={12} className="text-white" />}
                          </div>
                          <span className="text-sm text-[#505050] font-dm">{c}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Product Type */}
              <div className="border-b border-gray-100 pb-4">
                <button onClick={() => toggleSection("productType")} className="flex items-center justify-between w-full text-left mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#1a1a1a] font-dm font-semibold">Product Type</span>
                  {expandedSections.includes("productType") ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {expandedSections.includes("productType") && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
                      {CATEGORIES.productTypes.map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                          <div className={clsx("w-4 h-4 border flex items-center justify-center transition-colors", localFilters.productTypes.includes(c) ? "bg-[#1a1a1a] border-[#1a1a1a]" : "border-gray-300 group-hover:border-[#c9a96e]")}>
                            {localFilters.productTypes.includes(c) && <FiX size={12} className="text-white" />}
                          </div>
                          <span className="text-sm text-[#505050] font-dm">{c}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Size */}
              {(availableSizes.length > 0 || localFilters.productTypes.length === 0) && (
                <div className="border-b border-gray-100 pb-4">
                  <button onClick={() => toggleSection("size")} className="flex items-center justify-between w-full text-left mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#1a1a1a] font-dm font-semibold">Size</span>
                    {expandedSections.includes("size") ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.includes("size") && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
                        {localFilters.productTypes.length === 0 && <p className="text-xs text-gray-400 font-dm">Select a product type first</p>}
                        {availableSizes.map(c => (
                          <label key={c} className="flex items-center gap-3 cursor-pointer group">
                            <div className={clsx("w-4 h-4 border flex items-center justify-center transition-colors", localFilters.sizes.includes(c) ? "bg-[#1a1a1a] border-[#1a1a1a]" : "border-gray-300 group-hover:border-[#c9a96e]")}>
                              {localFilters.sizes.includes(c) && <FiX size={12} className="text-white" />}
                            </div>
                            <span className="text-sm text-[#505050] font-dm">{c}</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Material */}
              <div className="border-b border-gray-100 pb-4">
                <button onClick={() => toggleSection("material")} className="flex items-center justify-between w-full text-left mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#1a1a1a] font-dm font-semibold">Material</span>
                  {expandedSections.includes("material") ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {expandedSections.includes("material") && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
                      {CATEGORIES.materials.map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                          <div className={clsx("w-4 h-4 border flex items-center justify-center transition-colors", localFilters.materials.includes(c) ? "bg-[#1a1a1a] border-[#1a1a1a]" : "border-gray-300 group-hover:border-[#c9a96e]")}>
                            {localFilters.materials.includes(c) && <FiX size={12} className="text-white" />}
                          </div>
                          <span className="text-sm text-[#505050] font-dm">{c}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Range */}
              <div className="border-b border-gray-100 pb-8">
                <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full text-left mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#1a1a1a] font-dm font-semibold">Price Range</span>
                  {expandedSections.includes("price") ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {expandedSections.includes("price") && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-2 overflow-hidden">
                      <Slider 
                        range 
                        min={0} 
                        max={500000} 
                        step={5000} 
                        value={localFilters.priceRange} 
                        onChange={handlePriceChange}
                        styles={{
                          track: { backgroundColor: '#1a1a1a' },
                          handle: { backgroundColor: '#c9a96e', borderColor: '#c9a96e' },
                          rail: { backgroundColor: '#f0f0f0' }
                        }}
                      />
                      <div className="flex justify-between mt-4">
                        <span className="text-xs font-dm text-[#505050]">₹{localFilters.priceRange[0].toLocaleString('en-IN')}</span>
                        <span className="text-xs font-dm text-[#505050]">₹{localFilters.priceRange[1].toLocaleString('en-IN')}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Colour Family */}
              <div className="pb-4">
                <button onClick={() => toggleSection("colour")} className="flex items-center justify-between w-full text-left mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#1a1a1a] font-dm font-semibold">Colour Family</span>
                  {expandedSections.includes("colour") ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {expandedSections.includes("colour") && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-wrap gap-4 overflow-hidden">
                      {CATEGORIES.colours.map(c => {
                        const isSelected = localFilters.colours.includes(c.name);
                        return (
                          <div key={c.name} className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => handleCheckboxChange("colours", c.name)}
                              className={clsx(
                                "w-8 h-8 rounded-full border-2 transition-all",
                                isSelected ? "border-[#c9a96e] scale-110" : "border-transparent shadow-sm hover:scale-105"
                              )}
                              style={{ backgroundColor: c.hex, boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }}
                              title={c.name}
                            />
                            <span className="text-[10px] text-gray-500 font-dm">{c.name.split('/')[0]}</span>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute md:relative bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 flex gap-4 mt-auto z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] md:shadow-none">
              <button 
                onClick={handleClear}
                className="flex-1 py-3 text-xs uppercase tracking-widest font-dm text-[#1a1a1a] border border-[#1a1a1a] hover:bg-[#f9f7f4] transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={handleApply}
                className="flex-[2] py-3 text-xs uppercase tracking-widest font-dm text-[#c9a96e] bg-[#1a1a1a] hover:bg-[#333333] transition-colors"
              >
                Apply Filters — {productCount} Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
