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
      staggerChildren: 0.08,
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
          className="text-center mb-16"
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

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group p-6 rounded-card bg-surface-1/50 border border-border/30 hover:border-border/60 hover:bg-surface-2/50 transition-all duration-500"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-vermillion/10 border border-vermillion/20 flex items-center justify-center mb-4 group-hover:bg-vermillion/15 transition-colors duration-300"
                  aria-hidden="true"
                >
                  {Icon && <Icon className="w-5 h-5 text-vermillion" />}
                </div>
                <h3 className="font-heading font-semibold text-text-primary text-sm mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
