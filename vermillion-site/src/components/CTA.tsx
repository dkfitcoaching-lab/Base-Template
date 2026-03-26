"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const ease = [0.22, 1, 0.36, 1];

/* Floating particle configuration */
const particles = [
  { size: 6, x: "12%", y: "18%", duration: 7, delay: 0, opacity: 0.25 },
  { size: 4, x: "85%", y: "25%", duration: 9, delay: 1.5, opacity: 0.35 },
  { size: 8, x: "78%", y: "72%", duration: 8, delay: 0.8, opacity: 0.2 },
  { size: 5, x: "8%", y: "68%", duration: 10, delay: 2, opacity: 0.3 },
];

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-32 lg:py-40 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* ── Layered background gradients ── */}
      {/* Primary vermillion radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(192,48,48,0.12),transparent_70%)]"
        aria-hidden="true"
      />
      {/* Secondary softer ambient glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_50%,rgba(192,48,48,0.05),transparent_80%)]"
        aria-hidden="true"
      />
      {/* Top edge accent */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_20%_at_50%_0%,rgba(192,48,48,0.06),transparent_60%)]"
        aria-hidden="true"
      />

      {/* ── Subtle grid pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
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
          className="absolute rounded-full bg-vermillion blur-sm pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 8, -6, 4, 0],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity, p.opacity * 0.7, p.opacity],
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

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* ── Heading ── */}
        <div className="text-center mb-14">
          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight"
          >
            <span className="text-text-primary">
              Let&apos;s Build Something
            </span>
            <br />
            <span className="text-text-primary">
              Exceptional
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease }}
            className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed"
          >
            Tell us about your project. We respond within 24 hours with a clear scope, timeline, and price.
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
          We accept all major payment methods. No contracts. No hidden fees.
        </motion.p>
      </div>
    </section>
  );
}
