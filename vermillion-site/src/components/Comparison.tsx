"use client";

import { motion } from "framer-motion";
import { COMPARISON } from "@/lib/constants";

export default function Comparison() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-vermillion uppercase font-heading mb-3">
            Value
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            How We Compare
          </h2>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-card border border-border/50 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-surface-2/80 border-b border-border/30 px-6 py-4">
            <span className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider">
              Competitor
            </span>
            <span className="text-xs font-heading font-semibold text-text-caption uppercase tracking-wider text-center">
              Their Price
            </span>
            <span className="text-xs font-heading font-semibold text-vermillion uppercase tracking-wider text-right">
              Our Price
            </span>
          </div>

          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div
              key={row.competitor}
              className={`grid grid-cols-3 px-6 py-4 ${
                i < COMPARISON.length - 1 ? "border-b border-border/20" : ""
              } hover:bg-surface-1/50 transition-colors duration-300`}
            >
              <span className="text-sm text-text-body">{row.competitor}</span>
              <span className="text-sm text-text-caption text-center line-through decoration-text-caption/30">
                {row.theirPrice}
              </span>
              <span className="text-sm text-vermillion font-semibold text-right">
                {row.ourPrice}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mt-8 text-text-secondary text-lg font-body"
        >
          Same deliverable. Fraction of the cost.{" "}
          <span className="text-text-primary">Delivered in days, not months.</span>
        </motion.p>
      </div>
    </section>
  );
}
