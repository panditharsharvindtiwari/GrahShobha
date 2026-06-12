# GrahShobha — Interiors & Furnishings

A modern showcase and catalogue website for **GrahShobha Interiors & Furnishings**, 
a furniture manufacturer based in Ujjain, Madhya Pradesh.

Built with a cinematic dark aesthetic, the site allows customers to browse 
collections, explore products, and place orders directly via WhatsApp.

---
# GrahShobha — Interiors & Furnishings

[

![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Visit_Site-blue)](https://grah-shobha.vercel.app)

](https://grah-shobha.vercel.app)
[

[![Deployed on Vercel](https://img.shields.io/badge/DEPLOYED_ON-VERCEL-black)](https://vercel.com)

](https://vercel.com)

A modern showcase and catalogue website...
## Features

- Product catalogue with category and room-based filtering
- Per-product colour and size selection
- WhatsApp-based cart and checkout flow
- Work portfolio and completed projects gallery
- Lead capture popup for customer enquiries
- Fully responsive across mobile and desktop
- Smooth animations powered by Framer Motion

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js 14 (App Router)           |
| Styling     | Tailwind CSS                      |
| Animations  | Framer Motion                     |
| Database    | MongoDB Atlas *(in progress)*     |
| Media       | Cloudinary *(in progress)*        |
| Auth        | NextAuth.js with OTP via Fast2SMS |
| Deployment  | Vercel                            |

## Project Status

| Feature                  | Status         |
|--------------------------|----------------|
| UI and frontend          | ✅ Complete    |
| Product catalogue        | ✅ Complete    |
| WhatsApp cart checkout   | ✅ Complete    |
| Work gallery             | ✅ Complete    |
| MongoDB integration      | 🔄 In progress |
| Cloudinary media         | 🔄 In progress |
| Real product data        | 🔄 In progress |
| Admin panel              | 🔄 In progress |

## Local Development

```bash
# Clone the repository
git clone https://github.com/panditharsharvindtiwari/grahshobha.git

# Install dependencies
cd grahshobha
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your values in .env.local

# Run the development server
npm run dev
