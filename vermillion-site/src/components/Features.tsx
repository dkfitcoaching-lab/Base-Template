"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import {
  Layers,
  Zap,
  Cloud,
  Smartphone,
  Shield,
  Plug,
  Brain,
  BarChart3,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Zap,
  Cloud,
  Smartphone,
  Shield,
  Plug,
  Brain,
  BarChart3,
};

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariantsLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function Features() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-vermillion uppercase font-heading mb-3">
            Capabilities
          </p>
          <h2
            id="features-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary"
          >
            Built for What&apos;s Next
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          role="list"
        >
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const isLarge = index < 2;

            return (
              <motion.article
                key={feature.title}
                variants={index % 2 === 0 ? itemVariantsLeft : itemVariantsRight}
                role="listitem"
                className={`group relative p-6 lg:p-7 rounded-card gothic-card
                  transition-all duration-500
                  ${isLarge ? "sm:col-span-2 lg:col-span-2 border-l-2 border-l-neon/30" : ""}
                `}
                style={{ willChange: "transform" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Subtle top highlight */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/[0.04] to-transparent rounded-t-card"
                  aria-hidden="true"
                />

                {/* Radial glow for large cards */}
                {isLarge && (
                  <div
                    className="absolute inset-0 rounded-card pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(255, 23, 68, 0.04), transparent 70%)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Icon with glow */}
                <div
                  className="relative w-11 h-11 rounded-xl bg-neon/10 flex items-center justify-center mb-5
                    shadow-[0_0_20px_rgba(255,23,68,0.15)]
                    group-hover:shadow-[0_0_30px_rgba(255,23,68,0.25)]
                    group-hover:bg-neon/15
                    transition-all duration-500"
                  aria-hidden="true"
                >
                  {Icon && (
                    <Icon className="w-5 h-5 text-vermillion group-hover:text-vermillion-light transition-colors duration-500" />
                  )}
                </div>

                {/* Text content */}
                <h3
                  className={`font-heading font-semibold text-text-primary mb-2 ${
                    isLarge ? "text-base lg:text-lg" : "text-sm lg:text-base"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-text-secondary leading-relaxed ${
                    isLarge ? "text-sm lg:text-base" : "text-sm"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
