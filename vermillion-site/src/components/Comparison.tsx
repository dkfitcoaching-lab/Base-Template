"use client";

import { motion } from "framer-motion";
import { COMPARISON } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const mobileCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function Comparison() {
  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32" aria-labelledby="comparison-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-neon uppercase font-heading mb-3">
            Why Vermillion
          </p>
          <h2
            id="comparison-heading"
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary text-neon-glow-subtle metallic-text"
          >
            Purpose-Built. Delivered Faster.
          </h2>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden md:block rounded-card overflow-hidden gothic-card neon-glow-border"
          role="table"
          aria-label="Feature comparison"
        >
          {/* Header row */}
          <div
            className="grid grid-cols-[1.5fr_1fr_1fr] bg-surface-2/60 backdrop-blur-sm border-b border-white/[0.06] px-8 py-5"
            role="row"
          >
            <span role="columnheader" className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider">
              Feature
            </span>
            <span role="columnheader" className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider text-center">
              Traditional Agencies
            </span>
            <span role="columnheader" className="text-xs font-heading font-bold text-neon text-neon-glow uppercase tracking-wider text-center bg-neon/[0.06] -my-5 py-5 -mr-8 pr-8 pl-4 border-l border-l-neon/20">
              Vermillion Axis
            </span>
          </div>

          {/* Data rows */}
          {COMPARISON.map((row, i) => (
            <motion.div
              key={row.feature}
              variants={rowVariants}
              role="row"
              className={`group grid grid-cols-[1.5fr_1fr_1fr] items-center px-8 py-5
                hover:bg-white/[0.02]
                border-l-2 border-l-transparent hover:border-l-neon/60
                transition-all duration-300
                ${i < COMPARISON.length - 1 ? "border-b border-b-white/[0.04]" : ""}
              `}
            >
              <span role="cell" className="text-sm text-text-body group-hover:text-text-primary transition-colors duration-300 font-medium">
                {row.feature}
              </span>
              <span role="cell" className="text-sm text-text-caption text-center">
                {row.others}
              </span>
              <span role="cell" className="text-sm text-neon font-bold text-center text-neon-glow-subtle bg-neon/[0.04] -my-5 py-5 -mr-8 pr-8 pl-4 border-l border-l-neon/[0.08]">
                {row.ours}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="md:hidden space-y-4"
        >
          {COMPARISON.map((row) => (
            <motion.div
              key={row.feature}
              variants={mobileCardVariants}
              className="rounded-card gothic-card neon-glow-border p-4 sm:p-5 border-l-2 border-l-neon/40"
            >
              <p className="text-xs sm:text-sm text-text-primary font-heading font-semibold mb-3">
                {row.feature}
              </p>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="text-text-caption text-xs uppercase tracking-wider block mb-0.5">Others</span>
                  <span className="text-text-secondary">{row.others}</span>
                </div>
                <div className="text-right">
                  <span className="text-text-caption text-xs uppercase tracking-wider block mb-0.5">Us</span>
                  <span className="text-neon font-semibold text-neon-glow-subtle">{row.ours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 lg:mt-12 max-w-xl mx-auto gothic-frame rounded-card px-6 py-5"
        >
          <p className="text-center text-text-secondary text-base font-body">
            We don&apos;t compete on price. We compete on{" "}
            <span className="text-neon font-semibold text-neon-glow-subtle">
              speed, quality, and ownership
            </span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
