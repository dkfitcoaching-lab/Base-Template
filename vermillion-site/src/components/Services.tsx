"use client";

import { motion } from "framer-motion";
import { TIERS } from "@/lib/constants";
import { Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease,
    },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-surface-1/30"
      aria-labelledby="services-heading"
    >
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
            Pricing
          </p>
          <h2
            id="services-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary"
          >
            Service Tiers
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`relative rounded-card bg-surface-2/80 border border-border/50 overflow-hidden transition-all duration-500 hover:border-border hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] group ${
                tier.highlighted
                  ? "lg:scale-105 shadow-[0_0_60px_rgba(192,48,48,0.08)]"
                  : ""
              }`}
            >
              {/* Top accent bar */}
              <div
                className={`h-[2px] ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-transparent via-vermillion to-transparent"
                    : "bg-gradient-to-r from-transparent via-border to-transparent"
                }`}
                aria-hidden="true"
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(192,48,48,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative p-8">
                {/* Tier name + price */}
                <h3 className="font-heading font-bold text-lg text-text-primary tracking-wider uppercase mb-1">
                  {tier.name}
                </h3>
                <p className="font-heading font-bold text-2xl sm:text-3xl text-vermillion mb-3">
                  {tier.price}
                </p>
                <p className="text-sm text-text-secondary mb-5">
                  {tier.audience}
                </p>

                {/* Delivery + Support */}
                <div className="flex items-center gap-4 text-xs text-text-caption mb-6 pb-6 border-b border-border/30">
                  <span>Delivery: {tier.delivery}</span>
                  <span className="w-px h-3 bg-border/50" aria-hidden="true" />
                  <span>Support: {tier.support}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3" aria-label={`${tier.name} features`}>
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-vermillion mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-text-body leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Build Your Own */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-10 text-sm text-text-caption"
        >
          Need something specific?{" "}
          <a
            href="#contact"
            className="text-vermillion hover:text-vermillion/80 transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 rounded"
          >
            Build Your Own
          </a>{" "}
          — a la carte pricing available on request.
        </motion.p>
      </div>
    </section>
  );
}
