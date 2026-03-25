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
    <section id="pricing" className="py-32 lg:py-40" aria-labelledby="comparison-heading">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-overline text-vermillion uppercase font-heading mb-3">
            Why Vermillion
          </p>
          <h2
            id="comparison-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary"
          >
            Built Different. Delivered Faster.
          </h2>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden md:block rounded-card border border-white/[0.06] overflow-hidden bg-white/[0.01] backdrop-blur-sm"
          role="table"
          aria-label="Feature comparison"
        >
          {/* Header row */}
          <div
            className="grid grid-cols-[1.5fr_1fr_1fr] bg-surface-2/80 backdrop-blur-sm border-b border-white/[0.06] px-8 py-5"
            role="row"
          >
            <span role="columnheader" className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider">
              Feature
            </span>
            <span role="columnheader" className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider text-center">
              Traditional Agencies
            </span>
            <span role="columnheader" className="text-xs font-heading font-bold text-vermillion uppercase tracking-wider text-center">
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
                border-l-2 border-l-transparent hover:border-l-vermillion/60
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
              <span role="cell" className="text-sm text-vermillion font-semibold text-center">
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
              className="rounded-card border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 border-l-2 border-l-vermillion/40"
            >
              <p className="text-sm text-text-primary font-heading font-semibold mb-3">
                {row.feature}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-text-caption text-xs uppercase tracking-wider block mb-0.5">Others</span>
                  <span className="text-text-secondary">{row.others}</span>
                </div>
                <div className="text-right">
                  <span className="text-text-caption text-xs uppercase tracking-wider block mb-0.5">Us</span>
                  <span className="text-vermillion font-semibold">{row.ours}</span>
                </div>
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
          className="text-center mt-10 lg:mt-12 text-text-secondary text-base font-body"
        >
          We are not cheaper. We are{" "}
          <span className="text-text-primary font-semibold">
            more focused
          </span>
          . Specialization lets us deliver faster and better.
        </motion.p>
      </div>
    </section>
  );
}
