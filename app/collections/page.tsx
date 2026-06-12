import { Metadata } from "next";
import { ROOMS } from "@/lib/mockData";
import RoomCard from "@/components/collections/RoomCard";
import InnerLayout from "@/components/layout/InnerLayout";

export const metadata: Metadata = {
  title: "Collections — Graha Shobha",
  description:
    "Explore our curated furniture collections for every room — Living Room, Bedroom, Dining, Home Office, Storage and Outdoor.",
};

export default function CollectionsPage() {
  return (
    <InnerLayout>
      {/* Hero header */}
      <div className="bg-[#1a1a1a] pt-32 pb-16 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
          Curated for Every Space
        </p>
        <h1 className="font-cormorant text-4xl md:text-6xl font-light text-ivory-200 tracking-wide">
          Explore Our Collections
        </h1>
        <div className="w-16 h-px bg-[#c9a96e] mx-auto mt-6" />
        <p className="text-sm text-ivory-400/60 font-dm mt-4 max-w-xl mx-auto leading-relaxed">
          From living rooms that welcome to bedrooms that restore — every piece is
          crafted with intention and pride.
        </p>
      </div>

      {/* Room grid */}
      <div className="bg-[#fdfcfa] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROOMS.map((room, index) => (
              <RoomCard
                key={room.slug}
                slug={room.slug}
                name={room.name}
                tagline={room.tagline}
                image={room.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#1a1a1a] py-20 text-center px-6">
        <p className="font-cormorant text-3xl md:text-4xl text-ivory-200 font-light">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <p className="text-sm text-ivory-400/60 font-dm mt-3 max-w-md mx-auto">
          Our team will help you create something entirely bespoke.
        </p>
        <div className="w-10 h-px bg-[#c9a96e] mx-auto mt-6 mb-6" />
        <a
          href="https://wa.me/910000000000?text=Hi%20Graha%20Shobha%2C%20I%20need%20help%20finding%20the%20right%20furniture."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-block"
        >
          Talk to Us on WhatsApp
        </a>
      </div>
    </InnerLayout>
  );
}
