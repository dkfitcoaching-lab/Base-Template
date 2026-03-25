"use client";

import { motion } from "framer-motion";
import { COMPARISON } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const SAVINGS = [
  "Up to 67% less",
  "Up to 50% less",
  "Up to 70% less",
  "Up to 80% less",
  "Up to 87% less",
];

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
    <section className="py-24 lg:py-32" aria-labelledby="comparison-heading">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-vermillion uppercase font-heading mb-3">
            Value
          </p>
          <h2
            id="comparison-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary"
          >
            How We Compare
          </h2>
        </motion.div>

        {/* ─── Desktop Table ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden sm:block rounded-card border border-white/[0.06] overflow-hidden
            bg-white/[0.01] backdrop-blur-sm"
          role="table"
          aria-label="Price comparison"
        >
          {/* Header row */}
          <div
            className="grid grid-cols-[1fr_1fr_1fr_auto] bg-surface-2/80 backdrop-blur-sm border-b border-white/[0.06] px-6 py-4"
            role="row"
          >
            <span
              role="columnheader"
              className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider"
            >
              Competitor
            </span>
            <span
              role="columnheader"
              className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider text-center"
            >
              Their Price
            </span>
            <span
              role="columnheader"
              className="text-xs font-heading font-bold text-vermillion uppercase tracking-wider text-center"
            >
              Our Price
            </span>
            <span
              role="columnheader"
              className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider text-right w-32"
            >
              Savings
            </span>
          </div>

          {/* Data rows */}
          {COMPARISON.map((row, i) => (
            <motion.div
              key={row.competitor}
              variants={rowVariants}
              role="row"
              className={`group grid grid-cols-[1fr_1fr_1fr_auto] items-center px-6 py-4
                hover:bg-white/[0.02]
                border-l-2 border-l-transparent hover:border-l-vermillion/60
                transition-all duration-300
                ${i < COMPARISON.length - 1 ? "border-b border-b-white/[0.04]" : ""}
              `}
            >
              <span
                role="cell"
                className="text-sm text-text-body group-hover:text-text-primary transition-colors duration-300"
              >
                {row.competitor}
              </span>
              <span
                role="cell"
                className="text-sm text-text-caption text-center line-through decoration-text-caption/30"
              >
                {row.theirPrice}
              </span>
              <span
                role="cell"
                className="text-sm text-vermillion font-bold text-center"
              >
                {row.ourPrice}
              </span>
              <span role="cell" className="flex justify-end w-32">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-heading font-semibold bg-vermillion/10 text-vermillion border border-vermillion/20">
                  {SAVINGS[i]}
                </span>
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Mobile Cards ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="sm:hidden space-y-4"
        >
          {COMPARISON.map((row, i) => (
            <motion.div
              key={row.competitor}
              variants={mobileCardVariants}
              className="rounded-card border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5
                border-l-2 border-l-vermillion/40"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-text-secondary font-heading">
                  {row.competitor}
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-heading font-semibold bg-vermillion/10 text-vermillion border border-vermillion/20">
                  {SAVINGS[i]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-caption line-through decoration-text-caption/30">
                  {row.theirPrice}
                </span>
                <span className="text-base text-vermillion font-bold">
                  {row.ourPrice}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mt-10 lg:mt-12 text-text-secondary text-lg font-body"
        >
          Same deliverable. Fraction of the cost.{" "}
          <span className="text-text-primary font-semibold">
            Delivered in days, not months.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
