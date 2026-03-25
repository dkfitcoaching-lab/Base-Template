"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import {
  Users,
  Dumbbell,
  UtensilsCrossed,
  DollarSign,
  MessageSquare,
  Shield,
  Brain,
  FileText,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Dumbbell,
  UtensilsCrossed,
  DollarSign,
  MessageSquare,
  Shield,
  Brain,
  FileText,
};

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
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
            Everything a Coaching
            <br className="hidden sm:block" /> Business Needs
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
                variants={itemVariants}
                role="listitem"
                className={`group relative p-6 lg:p-7 rounded-card
                  bg-white/[0.02] backdrop-blur-sm
                  border border-white/[0.06]
                  hover:bg-white/[0.04] hover:border-white/[0.1]
                  hover:shadow-glass
                  transition-all duration-500
                  ${isLarge ? "lg:col-span-2" : ""}
                `}
                style={{ willChange: "transform" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Subtle top highlight */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent rounded-t-card"
                  aria-hidden="true"
                />

                {/* Icon with glow */}
                <div
                  className="relative w-11 h-11 rounded-xl bg-vermillion/10 flex items-center justify-center mb-5
                    shadow-[0_0_20px_rgba(192,48,48,0.15)]
                    group-hover:shadow-[0_0_30px_rgba(192,48,48,0.25)]
                    group-hover:bg-vermillion/15
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
