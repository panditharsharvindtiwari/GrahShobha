"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import Image from "next/image";

// --- SVG Furniture Parts for Option A ---
const FURNITURE_PARTS = [
  {
    id: "leg1",
    label: "Leg A",
    initialX: -320,
    initialY: -180,
    initialRotate: -25,
    targetX: -38,
    targetY: 90,
    targetRotate: 0,
    width: 14,
    height: 90,
    color: "#8B6F47",
    shape: "rect",
  },
  {
    id: "leg2",
    label: "Leg B",
    initialX: 320,
    initialY: -120,
    initialRotate: 20,
    targetX: 38,
    targetY: 90,
    targetRotate: 0,
    width: 14,
    height: 90,
    color: "#8B6F47",
    shape: "rect",
  },
  {
    id: "seat",
    label: "Seat",
    initialX: -200,
    initialY: 250,
    initialRotate: 10,
    targetX: 0,
    targetY: 40,
    targetRotate: 0,
    width: 120,
    height: 40,
    color: "#C9A96E",
    shape: "rect",
  },
  {
    id: "backrest",
    label: "Backrest",
    initialX: 260,
    initialY: 200,
    initialRotate: -15,
    targetX: 0,
    targetY: -40,
    targetRotate: 0,
    width: 110,
    height: 70,
    color: "#c9a96e",
    shape: "rect",
  },
  {
    id: "cushion",
    label: "Cushion",
    initialX: -280,
    initialY: 150,
    initialRotate: 30,
    targetX: 0,
    targetY: 35,
    targetRotate: 0,
    width: 100,
    height: 22,
    rx: 8,
    color: "#f5f0e8",
    shape: "rect",
  },
  {
    id: "armrest",
    label: "Armrest",
    initialX: 180,
    initialY: -200,
    initialRotate: -40,
    targetX: 65,
    targetY: 20,
    targetRotate: 90,
    width: 14,
    height: 50,
    color: "#8B6F47",
    shape: "rect",
  },
];

function AssemblyPart({
  part,
  assembled,
}: {
  part: (typeof FURNITURE_PARTS)[0];
  assembled: boolean;
}) {
  return (
    <motion.g
      initial={{ x: part.initialX, y: part.initialY, rotate: part.initialRotate, opacity: 0 }}
      animate={
        assembled
          ? { x: part.targetX, y: part.targetY, rotate: part.targetRotate, opacity: 1 }
          : { x: part.initialX, y: part.initialY, rotate: part.initialRotate, opacity: 1 }
      }
      transition={
        assembled
          ? { type: "spring", damping: 18, stiffness: 90, delay: Math.random() * 0.3 }
          : { duration: 1.2, ease: "easeOut" }
      }
    >
      <rect
        x={-(part.width / 2)}
        y={-(part.height / 2)}
        width={part.width}
        height={part.height}
        rx={(part as { rx?: number }).rx || 3}
        fill={part.color}
        opacity={0.92}
      />
    </motion.g>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [entryOption, setEntryOption] = useState<"A" | "B">("B");
  const [partsVisible, setPartsVisible] = useState(false);

  // Fade in audio on first interaction
  const startAudio = useCallback(() => {
    if (audioStarted || !audioRef.current) return;
    setAudioStarted(true);
    const audio = audioRef.current;
    audio.volume = 0;
    audio.play().catch(() => {});
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol += 0.02;
      if (vol >= 0.35) { audio.volume = 0.35; clearInterval(fadeIn); return; }
      audio.volume = vol;
    }, 100);
  }, [audioStarted]);

  useEffect(() => {
    const handler = () => startAudio();
    window.addEventListener("mousemove", handler, { once: true });
    window.addEventListener("click", handler, { once: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("click", handler);
    };
  }, [startAudio]);

  useEffect(() => {
    const timer = setTimeout(() => setPartsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (muted) { audioRef.current.volume = 0.35; setMuted(false); }
    else { audioRef.current.volume = 0; setMuted(true); }
  };

  const handleEnter = () => {
    if (entryOption === "A") {
      if (!assembled) { setAssembled(true); return; }
    }
    setTransitioning(true);
    setTimeout(() => router.push("/collections"), 900);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0d0d0d] select-none">
      {/* Audio */}
      <audio ref={audioRef} loop preload="auto" src="/audio/ambient.mp3" />

      {/* ── OPTION TOGGLE (top-left, subtle) ── */}
      <div className="absolute top-6 left-6 z-50 flex gap-3">
        {(["B", "A"] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setEntryOption(opt)}
            className={`text-[10px] uppercase tracking-widest px-3 py-1 border transition-all duration-300 ${
              entryOption === opt
                ? "border-[#c9a96e] text-[#c9a96e]"
                : "border-white/20 text-white/30 hover:border-white/40 hover:text-white/50"
            }`}
          >
            {opt === "B" ? "Cinematic" : "Assembly"}
          </button>
        ))}
      </div>

      {/* ══════════════ OPTION B — CINEMATIC ══════════════ */}
      <AnimatePresence>
        {entryOption === "B" && (
          <motion.div
            key="optionB"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* Ken-Burns hero image */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="w-full h-full"
                animate={{ scale: [1, 1.08], x: ["0%", "-1%"], y: ["0%", "-1%"] }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90"
                  alt="Luxury interior"
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </div>
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ OPTION A — ASSEMBLY ══════════════ */}
      <AnimatePresence>
        {entryOption === "A" && (
          <motion.div
            key="optionA"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0d0d0d]"
          >
            {/* Subtle grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Scattered furniture SVG */}
            {partsVisible && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="500" height="400" viewBox="-250 -200 500 400" className="overflow-visible hidden md:block">
                  {FURNITURE_PARTS.map((part) => (
                    <AssemblyPart key={part.id} part={part} assembled={assembled} />
                  ))}
                </svg>
                {/* Simplified static assembly for mobile */}
                <div className="md:hidden text-[#c9a96e]/30 text-xs font-dm tracking-widest uppercase">
                  {assembled ? "Assembly Complete" : "Ready to Assemble"}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ BRAND CENTER ══════════════ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-6">
        {/* Thin top rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="w-24 h-px bg-[#c9a96e] mb-10"
        />

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
          className="font-cormorant font-light tracking-[0.35em] text-ivory-200 uppercase"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
        >
          GrahShobha
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
          className="w-16 h-px bg-[#c9a96e] my-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1.0, ease: "easeOut" }}
          className="font-cormorant italic text-[#c9a96e] tracking-[0.2em] text-lg md:text-xl font-light"
        >
          Crafting Spaces. Defining Elegance.
        </motion.p>

        {/* Enter button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 1.0, ease: "easeOut" }}
          className="mt-14"
        >
          <button
            onClick={handleEnter}
            className="btn-gold group relative min-h-[48px]"
            aria-label="Enter the Realm"
          >
            {entryOption === "A" && assembled
              ? "Continue →"
              : entryOption === "A"
              ? "Assemble & Enter"
              : "Enter the Realm"}
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.8, duration: 1.0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-ivory-300">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#c9a96e] to-transparent"
          />
        </motion.div>
      </div>

      {/* ══════════════ CURTAIN TRANSITION ══════════════ */}
      <AnimatePresence>
        {transitioning && (
          <>
            <motion.div
              key="curtainL"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="curtain-left"
            />
            <motion.div
              key="curtainR"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              className="curtain-right"
            />
          </>
        )}
      </AnimatePresence>

      {/* ══════════════ AUDIO TOGGLE ══════════════ */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        onClick={toggleMute}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-[#c9a96e]/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-[#c9a96e] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all duration-300"
      >
        {muted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
      </motion.button>
    </div>
  );
}
