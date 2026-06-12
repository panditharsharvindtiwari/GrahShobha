"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface RoomCardProps {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  index: number;
}

export default function RoomCard({ slug, name, tagline, image, index }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/collections/${slug}`} className="group block relative overflow-hidden aspect-[4/3]">
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Gold underline that expands on hover */}
          <motion.div
            className="h-px bg-[#c9a96e] mb-3 origin-left"
            initial={false}
            style={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="w-8 h-px bg-[#c9a96e] mb-3 transition-all duration-300 group-hover:w-16" />
          <h3 className="font-cormorant text-2xl font-light text-ivory-200 tracking-wide">
            {name}
          </h3>
          <p className="text-xs font-dm text-ivory-400/70 mt-1 tracking-wider">
            {tagline}
          </p>

          {/* Arrow indicator */}
          <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] font-dm">
              Explore
            </span>
            <div className="w-6 h-px bg-[#c9a96e]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
