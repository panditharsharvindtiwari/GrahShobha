// Static mock data — replace with MongoDB queries when DB is connected

export const ROOMS = [
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "Where stories unfold",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Crafted for restful luxury",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  },
  {
    slug: "dining-room",
    name: "Dining Room",
    tagline: "Gather. Savour. Connect.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80",
  },
  {
    slug: "home-office",
    name: "Home Office",
    tagline: "Inspired productivity",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80",
  },
  {
    slug: "storage",
    name: "Storage & Wardrobes",
    tagline: "Elegant organisation",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    tagline: "Bring the indoors, outside",
    image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&q=80",
  },
];

export { PRODUCTS } from './data/products';

export const WORK_GALLERY = [
  { _id: "w1", imageUrl: "/work/work1.jpg", projectName: "The Glass House Partition", description: "Seamlessly blending spaces with fluted glass and architectural precision.", location: "Ujjain", year: 2025 },
  { _id: "w2", imageUrl: "/work/work2.jpg", projectName: "The Neutral Nook", description: "Sculptural seating meets textured walls in a perfect study of minimalism.", location: "Indore", year: 2025 },
  { _id: "w3", imageUrl: "/work/work3.jpg", projectName: "Executive Library", description: "Bespoke walnut shelving with integrated warm lighting.", location: "Bhopal", year: 2024 },
  { _id: "w4", imageUrl: "/work/work4.jpg", projectName: "The Archway Corridor", description: "A curated transition space with custom lighting accents.", location: "Gwalior", year: 2024 },
  { _id: "w5", imageUrl: "/work/work5.jpg", projectName: "Skyline Executive Suite", description: "A commanding workspace featuring chevron oak floors and ambient ceiling architecture.", location: "Jabalpur", year: 2024 },
  { _id: "w6", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", projectName: "The Mehra Residence", description: "A timeless expression of warmth and subtle elegance.", location: "Bhopal", year: 2023 },
];

export const REVIEWS = [
  { _id: "r1", clientName: "Priya Mehra", city: "Bhopal", rating: 5, reviewText: "GrahShobha transformed our home entirely. Every piece feels like it was made for our space — the attention to detail is extraordinary. The Aravali sofa is an absolute showstopper." },
  { _id: "r2", clientName: "Rohit Sharma", city: "Ujjain", rating: 5, reviewText: "We've tried other furniture brands but nothing compares to the quality here. The sheesham beds are built to last generations. The team's guidance throughout the process was invaluable." },
  { _id: "r3", clientName: "Anjali Kapoor", city: "Indore", rating: 5, reviewText: "Absolutely in love with our dining setup. The Malwa table is the heart of our home now — every dinner party, people ask where we got it. GrahShobha is in a league of their own." },
  { _id: "r4", clientName: "Deepak Agrawal", city: "Gwalior", rating: 4, reviewText: "Exceptional craftsmanship and very professional delivery team. The wardrobe installation was seamless. Highly recommend for anyone looking for premium furniture in Central India." },
  { _id: "r5", clientName: "Sunita Joshi", city: "Jabalpur", rating: 5, reviewText: "The home office setup they recommended for my husband has been perfect. The writing desk with the leather tray is functional and so beautiful. Will definitely return for our bedroom next." },
];
