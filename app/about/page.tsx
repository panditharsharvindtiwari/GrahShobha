import { Metadata } from "next";
import InnerLayout from "@/components/layout/InnerLayout";
import Image from "next/image";
import { FiInstagram, FiFacebook, FiMapPin } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Us — GrahShobha",
  description:
    "Born in Ujjain, GrahShobha crafts premium furniture with passion and precision. Discover our story, values, and the artisans behind every piece.",
};

const INSTAGRAM_URL =
  "https://www.instagram.com/grahshobha_kalakendra?igsh=ODZieWhhbmRxZG9s&utm_source=qr";
const FACEBOOK_URL =
  "https://www.facebook.com/share/1HpbtvVj57/?mibextid=wwXIfr";
const GOOGLE_MAPS_URL = "https://share.google/IfLsqoolh5SG7cNNS";

const VALUES = [
  {
    title: "Craftsmanship",
    description:
      "Every joint, every curve, every finish is executed with the patience of a master craftsman. We do not rush excellence.",
  },
  {
    title: "Heritage",
    description:
      "Rooted in the rich artisan traditions of Ujjain, our designs carry centuries of wisdom into contemporary homes.",
  },
  {
    title: "Integrity",
    description:
      "We source sustainably, price honestly, and stand behind every piece we create — for life.",
  },
  {
    title: "Personalisation",
    description:
      "A home is a deeply personal space. We listen before we design, and we design before we build.",
  },
];

export default function AboutPage() {
  return (
    <InnerLayout>
      {/* Hero */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=85"
          alt="GrahShobha workshop"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
            Born in Ujjain
          </p>
          <h1 className="font-cormorant text-4xl md:text-6xl font-light text-ivory-200 tracking-wide">
            Our Story
          </h1>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mt-6" />
        </div>
      </div>

      {/* Brand story */}
      <div className="bg-[#fdfcfa] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-6 font-dm">
            Est. 2010
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#1a1a1a] leading-relaxed">
            &ldquo;We believe every home deserves furniture as unique as the family within it.&rdquo;
          </h2>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto my-8" />
          <div className="space-y-5 text-sm text-[#505050] font-dm leading-relaxed text-left">
            <p>
              GrahShobha was founded in Ujjain, Madhya Pradesh — a city that has been
              the cultural and spiritual heart of Central India for millennia. It was here,
              surrounded by the city&apos;s extraordinary tradition of art and craft, that our
              founder saw an opportunity: to bring the patience and precision of traditional
              Indian craftsmanship to the modern home.
            </p>
            <p>
              What began as a small workshop with three master craftsmen has grown into
              a studio trusted by hundreds of families across Central India. Our pieces have
              found homes in Bhopal, Indore, Gwalior, Jabalpur, and beyond — but every
              single one is still made with the same care as the very first chair we ever
              built.
            </p>
            <p>
              We work exclusively with sustainably sourced teak, sheesham, mango wood, and
              premium metal and fabric suppliers. We do not mass-produce. We do not compromise.
              Every piece that leaves our workshop is inspected, refined, and personally
              approved before delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Our Inspiration (Founder Section) */}
      <div className="bg-[#1a1a1a] py-20 px-6 border-b border-[#c9a96e]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
              Leadership
            </p>
            <h2 className="font-cormorant text-4xl font-light text-ivory-200">
              Our Inspiration
            </h2>
            <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-5" />
          </div>
          
          <div className="bg-[#1f1f1f] rounded-lg border border-[#c9a96e]/20 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
            {/* Left: Photo */}
            <div className="relative w-full md:w-[40%] h-[400px] md:h-[500px] flex-shrink-0">
              <Image
                src="/founder.jpg"
                alt="Vishal Vishwakarma"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            
            {/* Right: Text */}
            <div className="p-10 md:p-14 flex-1">
              <h3 className="font-cormorant text-3xl md:text-4xl text-ivory-200 mb-2">
                Vishal Vishwakarma
              </h3>
              <p className="text-[11px] uppercase tracking-widest text-[#c9a96e] font-dm mb-8">
                Founder &amp; Creative Visionary – GrahShobha Interiors &amp; Furnishings
              </p>
              
              <div className="pl-6 border-l-2 border-[#c9a96e] mb-8 py-2">
                <p className="font-cormorant text-2xl italic text-ivory-300/90 leading-relaxed">
                  &ldquo;Luxury is not just seen — it is experienced.&rdquo;
                </p>
              </div>
              
              <div className="space-y-4 text-sm text-ivory-400/80 font-dm leading-relaxed">
                <p>
                  Driven by a passion for luxury interiors and refined living, 
                  Vishal Vishwakarma founded GrahShobha Interiors &amp; Furnishings 
                  to create elegant, comfortable, and timeless spaces.
                </p>
                <p>
                  With a focus on premium quality, modern aesthetics, and 
                  personalized craftsmanship, he has built GrahShobha into a 
                  trusted destination for sophisticated furnishings and interior 
                  solutions that reflect style, warmth, and exclusivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values grid */}
      <div className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
              What Guides Us
            </p>
            <h2 className="font-cormorant text-4xl font-light text-ivory-200">
              Our Values
            </h2>
            <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <div
                key={value.title}
                className="border-t border-[#c9a96e]/20 pt-6"
              >
                <span className="text-[10px] text-[#c9a96e]/50 font-dm tracking-widest">
                  0{index + 1}
                </span>
                <h3 className="font-cormorant text-2xl text-ivory-200 font-light mt-2 mb-3">
                  {value.title}
                </h3>
                <p className="text-xs text-ivory-400/60 font-dm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workshop image strip */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&q=80"
          alt="Craftsmanship at GrahShobha"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <p className="font-cormorant text-2xl md:text-4xl text-ivory-200 font-light italic max-w-2xl leading-relaxed">
            &ldquo;Crafted with patience. Delivered with pride.&rdquo;
          </p>
        </div>
      </div>

      {/* Contact & Location */}
      <div className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
              Visit Us
            </p>
            <h2 className="font-cormorant text-3xl font-light text-ivory-200">
              Our Factory &amp; Showroom
            </h2>
            <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] flex-shrink-0 mt-0.5">
                  <FiMapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]/70 font-dm mb-2">
                    Address
                  </p>
                  <p className="text-sm text-ivory-300 font-dm leading-relaxed">
                    111, Surasa Agar Road, Unhel Bypass,<br />
                    Near D-Mart, Ujjain, Madhya Pradesh
                  </p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]/70 font-dm mb-2">
                    Email
                  </p>
                  <p className="text-sm text-ivory-300 font-dm leading-relaxed">
                    <a href="mailto:gskkfurnishings@gmail.com" className="hover:text-[#c9a96e] transition-colors duration-300">gskkfurnishings@gmail.com</a>
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 btn-gold self-start mt-2"
                aria-label="Get Directions on Google Maps"
              >
                <FiMapPin size={15} />
                Get Directions
              </a>
            </div>

            {/* Map embed placeholder */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block h-52 bg-[#1f1f1f] border border-[#c9a96e]/15 overflow-hidden group"
              aria-label="Open in Google Maps"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
                <FiMapPin size={28} className="text-[#c9a96e]/50 group-hover:text-[#c9a96e] transition-colors duration-300" />
                <p className="text-xs text-ivory-400/50 font-dm group-hover:text-ivory-300 transition-colors duration-300">
                  Click to open in Google Maps
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c9a96e]/20 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="bg-[#fdfcfa] py-20 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] mb-4 font-dm">
            Connect With Us
          </p>
          <h2 className="font-cormorant text-3xl font-light text-[#1a1a1a] mb-3">
            Follow Our Journey
          </h2>
          <p className="text-sm text-[#707070] font-dm mb-8 leading-relaxed">
            See how our pieces transform homes, behind-the-scenes from our workshop,
            and new collection previews — first on social media.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="flex items-center gap-3 px-6 py-3 border border-[#c9a96e]/40 text-[#a07840] hover:bg-[#c9a96e] hover:text-white hover:border-[#c9a96e] transition-all duration-300 font-dm text-sm uppercase tracking-widest"
            >
              <FiInstagram size={16} />
              Instagram
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Facebook"
              className="flex items-center gap-3 px-6 py-3 border border-[#c9a96e]/40 text-[#a07840] hover:bg-[#c9a96e] hover:text-white hover:border-[#c9a96e] transition-all duration-300 font-dm text-sm uppercase tracking-widest"
            >
              <FiFacebook size={16} />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}
