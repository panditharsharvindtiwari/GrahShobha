"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

interface Review {
  _id: string;
  clientName: string;
  city: string;
  rating: number;
  reviewText: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={14}
          className={star <= rating ? "text-[#c9a96e]" : "text-[#d0ccc5]"}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          className="bg-white border border-[#e8e0d4] p-7 relative"
        >
          {/* Decorative quote */}
          <div className="absolute top-4 right-6 font-cormorant text-6xl text-[#c9a96e]/10 leading-none select-none">
            &ldquo;
          </div>

          {/* Gold top accent */}
          <div className="w-8 h-0.5 bg-[#c9a96e] mb-5" />

          {/* Stars */}
          <StarRating rating={review.rating} />

          {/* Review text */}
          <p className="text-sm text-[#505050] font-dm leading-relaxed mt-4 line-clamp-3">
            &ldquo;{review.reviewText}&rdquo;
          </p>

          {/* Author */}
          <div className="mt-5 pt-4 border-t border-[#e8e0d4]">
            <p className="font-cormorant text-lg text-[#1a1a1a] font-medium">
              {review.clientName}
            </p>
            <p className="text-xs text-[#9a8060] font-dm tracking-wide mt-0.5">
              {review.city}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
