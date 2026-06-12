"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface WorkItem {
  _id: string;
  imageUrl: string;
  projectName: string;
  description?: string;
  location: string;
  year: number;
}

export default function WorkGallery({ items }: { items: WorkItem[] }) {
  return (
    <div className="masonry-grid">
      {items.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
          className="masonry-item group relative mb-8"
        >
          <div className="relative border border-[#c9a96e]/20 bg-white p-3 md:p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#c9a96e]/50">
            <div className="relative overflow-hidden aspect-auto">
              <Image
                src={item.imageUrl}
                alt={item.projectName}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            
            {/* Elegant text below image */}
            <div className="pt-6 pb-3 px-2 text-center">
              <p className="font-cormorant text-2xl text-[#1a1a1a] font-medium tracking-wide">
                {item.projectName}
              </p>
              {item.description && (
                <p className="text-xs text-[#707070] font-dm mt-3 leading-relaxed italic max-w-sm mx-auto">
                  &ldquo;{item.description}&rdquo;
                </p>
              )}

            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
