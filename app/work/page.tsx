import { Metadata } from "next";
import { WORK_GALLERY, REVIEWS } from "@/lib/mockData";
import InnerLayout from "@/components/layout/InnerLayout";
import WorkGallery from "@/components/work/WorkGallery";
import ReviewsSection from "@/components/work/ReviewsSection";

export const metadata: Metadata = {
  title: "Our Work — Graha Shobha",
  description:
    "Explore completed interior projects and client testimonials from Graha Shobha — luxury furniture crafted for homes across Central India.",
};

export default function WorkPage() {
  return (
    <InnerLayout>
      {/* Hero */}
      <div className="bg-[#1a1a1a] pt-32 pb-16 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
          Our Portfolio
        </p>
        <h1 className="font-cormorant text-4xl md:text-6xl font-light text-ivory-200 tracking-wide">
          Spaces We Have Shaped
        </h1>
        <div className="w-16 h-px bg-[#c9a96e] mx-auto mt-6" />
        <p className="text-sm text-ivory-400/60 font-dm mt-4 max-w-xl mx-auto leading-relaxed">
          From intimate family homes to grand residences, every project is a
          testament to our craft and commitment to excellence.
        </p>
      </div>

      {/* Gallery */}
      <div className="bg-[#fdfcfa] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <WorkGallery items={WORK_GALLERY} />
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-[#f5efe6] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
              Client Stories
            </p>
            <h2 className="font-cormorant text-4xl font-light text-[#1a1a1a]">
              What Our Clients Say
            </h2>
            <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-5" />
          </div>
          <ReviewsSection reviews={REVIEWS} />
        </div>
      </div>
    </InnerLayout>
  );
}
