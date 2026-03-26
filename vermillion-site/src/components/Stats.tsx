"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

export default function Stats() {
  return (
    <section className="relative border-y border-border/30 bg-surface-1/40" aria-label="Key metrics">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className={`text-center ${i < STATS.length - 1 ? "sm:border-r sm:border-border/30" : ""}`}
            >
              <dt className="font-heading font-bold text-3xl lg:text-4xl text-text-primary mb-1">
                {stat.value}
              </dt>
              <dd className="text-sm text-text-secondary tracking-wide">
                {stat.label}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
