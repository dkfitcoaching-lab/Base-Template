"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function GridBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Radial gradient - dark red core fading to black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(192,48,48,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(192,48,48,0.06),transparent_60%)]" />

      {/* Grid lines with scroll parallax */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,48,48,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,48,48,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-vermillion/10 blur-[120px]"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-vermillion/8 blur-[100px]"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Company name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-xs sm:text-sm tracking-[0.35em] text-vermillion uppercase mb-6"
        >
          Vermillion Axis Technologies
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1] mb-6"
        >
          Custom Software for
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vermillion to-red-400">
            Fitness & Wellness
          </span>{" "}
          Businesses
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We build what agencies charge $40,000+ for. You own every line of
          code. No subscriptions. No lock-in.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="px-8 py-3.5 rounded-btn border border-border text-text-primary font-medium text-sm tracking-wide hover:border-text-secondary hover:bg-surface-1/50 transition-all duration-300"
          >
            See Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-btn bg-vermillion text-white font-medium text-sm tracking-wide hover:shadow-[0_0_30px_rgba(192,48,48,0.4)] transition-all duration-300"
          >
            Book a Discovery Call
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-text-caption" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
