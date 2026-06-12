"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const WA_NUMBER = "919183434135";

const LOOKING_FOR_OPTIONS = [
  "Sofa",
  "Bed",
  "Wardrobe",
  "Dining Table",
  "Chair",
  "Other",
];

const TIME_OPTIONS = ["Morning", "Afternoon", "Evening"];

export default function LeadPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    lookingFor: "",
    preferredTime: "",
  });

  useEffect(() => {
    const shown = sessionStorage.getItem("gs_popup_shown");
    if (shown) return;
    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("gs_popup_shown", "true");
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save to MongoDB via API
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // Silently fail if API not set up yet
    }

    setLoading(false);
    setSubmitted(true);

    // Also send a WhatsApp notification to manager
    const waMessage = encodeURIComponent(
      `🔔 New Lead — GrahShobha\n\nName: ${form.name}\nMobile: ${form.mobile}\nLooking for: ${form.lookingFor}\nPreferred time: ${form.preferredTime}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${waMessage}`, "_blank");
    }, 800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-backdrop bg-black/60"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-[#141414] border border-[#c9a96e]/20 shadow-2xl shadow-black/70"
          >
            {/* Gold top accent */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />

            {/* Close */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 text-ivory-400/50 hover:text-[#c9a96e] transition-colors duration-300 z-10"
              aria-label="Close popup"
            >
              <FiX size={20} />
            </button>

            <div className="p-8 pt-10">
              {!submitted ? (
                <>
                  <div className="text-center mb-8">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] mb-3 font-dm">
                      Personalised Service
                    </p>
                    <h2 className="font-cormorant text-2xl font-light text-ivory-200 leading-tight">
                      Let Us Help You Find<br />
                      <em>the Perfect Piece</em>
                    </h2>
                    <p className="text-sm text-ivory-400/60 mt-3 font-dm leading-relaxed">
                      Our team will personally guide you.
                    </p>
                    <div className="w-12 h-px bg-[#c9a96e]/40 mx-auto mt-5" />
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-[#1f1f1f] border border-[#c9a96e]/15 text-ivory-200 placeholder-ivory-400/30 px-4 py-3 text-sm font-dm focus:outline-none focus:border-[#c9a96e]/50 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number (+91)"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full bg-[#1f1f1f] border border-[#c9a96e]/15 text-ivory-200 placeholder-ivory-400/30 px-4 py-3 text-sm font-dm focus:outline-none focus:border-[#c9a96e]/50 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <select
                        name="lookingFor"
                        required
                        value={form.lookingFor}
                        onChange={handleChange}
                        className="w-full bg-[#1f1f1f] border border-[#c9a96e]/15 text-ivory-200 px-4 py-3 text-sm font-dm focus:outline-none focus:border-[#c9a96e]/50 transition-colors duration-300 appearance-none"
                      >
                        <option value="" disabled className="bg-[#1f1f1f]">
                          What are you looking for?
                        </option>
                        {LOOKING_FOR_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#1f1f1f]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        name="preferredTime"
                        required
                        value={form.preferredTime}
                        onChange={handleChange}
                        className="w-full bg-[#1f1f1f] border border-[#c9a96e]/15 text-ivory-200 px-4 py-3 text-sm font-dm focus:outline-none focus:border-[#c9a96e]/50 transition-colors duration-300 appearance-none"
                      >
                        <option value="" disabled className="bg-[#1f1f1f]">
                          Preferred time to call
                        </option>
                        {TIME_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#1f1f1f]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 btn-gold w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Request a Callback"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-14 h-14 rounded-full border border-[#c9a96e] flex items-center justify-center mx-auto mb-6"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l5 5 7-9" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <p className="font-cormorant text-xl text-ivory-200 mb-2">
                    Thank You
                  </p>
                  <p className="text-sm text-ivory-400/70 font-dm leading-relaxed">
                    Our team will reach out to you shortly.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <FaWhatsapp size={14} className="text-[#25D366]" />
                    <p className="text-xs text-[#c9a96e] tracking-widest font-dm uppercase">
                      — GrahShobha
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
