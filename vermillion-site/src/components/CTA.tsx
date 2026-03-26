"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const ease = [0.22, 1, 0.36, 1];

/* Floating particle configuration */
const particles = [
  { size: 10, x: "12%", y: "18%", duration: 7, delay: 0, opacity: 0.4 },
  { size: 7, x: "85%", y: "25%", duration: 9, delay: 1.5, opacity: 0.5 },
  { size: 14, x: "78%", y: "72%", duration: 8, delay: 0.8, opacity: 0.35 },
  { size: 9, x: "8%", y: "68%", duration: 10, delay: 2, opacity: 0.45 },
  { size: 6, x: "45%", y: "12%", duration: 11, delay: 0.5, opacity: 0.45 },
  { size: 12, x: "92%", y: "55%", duration: 8.5, delay: 1, opacity: 0.35 },
  { size: 5, x: "30%", y: "85%", duration: 12, delay: 3, opacity: 0.4 },
  { size: 8, x: "65%", y: "8%", duration: 7.5, delay: 0.3, opacity: 0.35 },
];

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-32 lg:py-40 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* ── Layered background gradients ── */}
      {/* Primary neon radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(255,23,68,0.15),transparent_70%)]"
        aria-hidden="true"
      />
      {/* Secondary softer ambient glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_50%,rgba(255,23,68,0.06),transparent_80%)]"
        aria-hidden="true"
      />
      {/* Top edge accent */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_20%_at_50%_0%,rgba(255,23,68,0.08),transparent_60%)]"
        aria-hidden="true"
      />
      {/* Dramatic full-width neon pulse */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_50%,rgba(255,23,68,0.04),transparent_70%)] animate-pulse-ambient"
        aria-hidden="true"
      />

      {/* ── Subtle grid pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,232,240,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232,232,240,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Floating particle dots ── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-neon blur-md shadow-[0_0_16px_rgba(255,23,68,0.6)] pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -24, 0, 16, 0],
            x: [0, 12, -8, 6, 0],
            scale: [1, 1.3, 1, 0.8, 1],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity, p.opacity * 0.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* ── Heading ── */}
        <div className="text-center mb-14 relative">
          {/* Animated glow backdrop */}
          <motion.div
            className="absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(255,23,68,0.1),transparent_70%)] blur-[80px] pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {/* Ornamental corner brackets */}
          <div className="relative inline-block px-8 py-4">
            {/* Top-left corner */}
            <svg className="absolute top-0 left-0 w-6 h-6 text-neon/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2 8V2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Top-right corner */}
            <svg className="absolute top-0 right-0 w-6 h-6 text-neon/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 8V2h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Bottom-left corner */}
            <svg className="absolute bottom-0 left-0 w-6 h-6 text-neon/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2 16v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Bottom-right corner */}
            <svg className="absolute bottom-0 right-0 w-6 h-6 text-neon/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 16v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight"
            >
              <span className="text-text-primary">
                Ready to Build.
              </span>
              <br />
              <span className="text-gradient-vermillion text-neon-glow">
                Start Here.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease }}
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed"
          >
            Describe your vision. Within 24 hours you&apos;ll have architecture, timeline, and investment — no ambiguity, no obligation.
          </motion.p>
        </div>

        {/* ── Contact form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          <ContactForm />
        </motion.div>

        {/* ── Payment methods ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 text-center text-sm text-text-caption"
        >
          Average response time: under 24 hours. No contracts. No hidden fees.
        </motion.p>
      </div>
    </section>
  );
}
