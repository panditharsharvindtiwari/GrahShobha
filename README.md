# GrahShobha Interiors & Furnishings

A premium, bespoke web application for **GrahShobha**, a luxury furniture design studio and workshop based in Ujjain, Madhya Pradesh. This application serves as a digital showroom displaying high-end handcrafted furniture collections (sofas, beds, wardrobes, dining sets, study desks, and more).

## 🌟 Features

- **Interactive Showroom**: Browse luxury furniture categorized by spaces (Living Room, Bedroom, Dining, Home Office).
- **Personalized Callback Requests**: Lead generation modal allowing prospective clients to request a call back at their preferred times.
- **WhatsApp Integration**: Instant redirection to WhatsApp with pre-filled inquiries for specific items or general consultations.
- **Modern Responsive Design**: Premium, custom aesthetics with smooth animations powered by Framer Motion, tailored fonts (Cormorant Garamond and DM Sans), and a warm, elegant color palette (gold, ivory, charcoal).
- **Performance Optimized**: Built on Next.js 14 (App Router) with image optimization, fast page rendering, and standard SEO best practices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/grahshobha.git
   cd grahshobha
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your local environment file:
   ```bash
   cp .env.example .env.local
   ```
   *Edit `.env.local` with your actual phone numbers, email, and social media URLs.*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:
```bash
npm run build
npm run start
```

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (pages and API endpoints)
├── components/           # Reusable UI & section components
├── context/              # React context providers (e.g. Cart, UI states)
├── lib/                  # Static mock data, helper utilities, and types
├── public/               # Static assets (images, logos, icons)
├── .env.example          # Environment variables template
├── .eslintrc.json        # ESLint configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🤝 Contribution Guidelines

We use a standard branching strategy for contributions:
- **`main`**: Production-ready branch. Do not commit directly here.
- **`develop`**: Integration branch for new features.
- **Feature Branches**: Formatted as `feature/your-feature-name` (e.g., `feature/contact-form`).

To contribute, create a feature branch off `develop`, build your changes, verify typescript/lint rules, and open a Pull Request.

---

Crafted with passion in Ujjain. 🌟
