"use client";

import { motion } from "framer-motion";
import DeviceMockup from "./DeviceMockup";
import { SHOWCASE_ITEMS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function Showcase() {
  return (
    <section id="work" className="py-24 lg:py-32" aria-labelledby="showcase-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-vermillion uppercase font-heading mb-3">
            Portfolio
          </p>
          <h2
            id="showcase-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary"
          >
            Built to Perform
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SHOWCASE_ITEMS.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <DeviceMockup label={item.label} image={item.image} />
            </motion.div>
          ))}
        </motion.div>

        {/* Reference */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12 text-sm text-text-caption"
        >
          Reference build:{" "}
          <a
            href="https://www.ifbbprobigmikeely.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-vermillion hover:text-vermillion/80 transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 rounded"
          >
            IFBB Pro Big Mike Ely
          </a>
        </motion.p>
      </div>
    </section>
  );
}
