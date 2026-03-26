"use client";

import { motion } from "framer-motion";
import { TIERS } from "@/lib/constants";
import { Check, ArrowRight } from "lucide-react";

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

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease,
    },
  }),
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.04 + 0.1,
      duration: 0.3,
      ease,
    },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Section background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,23,68,0.04),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
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
            Transparent Pricing. No Surprises.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {TIERS.map((tier, i) => {
            const isHighlighted = tier.highlighted;

            return (
              <motion.div
                key={tier.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, transition: { duration: 0.35, ease } }}
                className="relative"
              >
                {/* RECOMMENDED badge for Professional */}
                {isHighlighted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5, ease }}
                    className="flex justify-center mb-3"
                  >
                    <span className="relative inline-flex items-center bg-vermillion text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-heading font-semibold shadow-neon-sm">
                      <span className="absolute inset-0 rounded-full bg-neon animate-pulse opacity-30" />
                      <span className="relative">Recommended</span>
                    </span>
                  </motion.div>
                )}

                {/* Card container with animated border */}
                <motion.div
                  animate={{
                    scale: isHighlighted ? 1.0 : 1,
                    opacity: 1,
                  }}
                  transition={{ duration: 0.35, ease }}
                  className={`relative rounded-card overflow-hidden transition-all duration-500 gothic-card ${
                    isHighlighted
                      ? "border-neon/30 shadow-neon-md neon-border-flow"
                      : "border-neon/[0.06] hover:border-neon/20 hover:shadow-neon-sm"
                  }`}
                >
                  {/* Animated gradient border overlay on hover/select */}
                  <div
                    className={`absolute inset-0 rounded-card pointer-events-none transition-opacity duration-500 ${
                      isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      background: isHighlighted
                        ? "linear-gradient(135deg, rgba(255,23,68,0.12), transparent 40%, transparent 60%, rgba(255,23,68,0.08))"
                        : undefined,
                    }}
                    aria-hidden="true"
                  />

                  {/* Top accent bar */}
                  <div
                    className={`h-[2px] transition-all duration-500 ${
                      isHighlighted
                        ? "bg-gradient-to-r from-transparent via-neon to-transparent"
                        : "bg-gradient-to-r from-transparent via-border to-transparent"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Hover/select glow */}
                  <div
                    className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,23,68,0.08),transparent_60%)] transition-opacity duration-500 pointer-events-none ${
                      isHighlighted ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Hover glow (separate so it works with CSS group-hover) */}
                  <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,23,68,0.06),transparent_60%)] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative p-8">
                    {/* Tier name */}
                    <h3 className="font-heading font-bold text-lg text-text-primary tracking-wider uppercase mb-1">
                      {tier.name}
                    </h3>

                    {/* Price with animated scale */}
                    <motion.p
                      animate={{
                        scale: isHighlighted ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3, ease }}
                      className="relative inline-block font-mono font-bold text-2xl sm:text-3xl text-neon text-neon-glow-subtle mb-3 origin-left"
                    >
                      {isHighlighted && (
                        <span
                          className="absolute inset-0 -inset-x-2 bg-neon/10 blur-xl rounded-full pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{tier.price}</span>
                    </motion.p>

                    <p className="text-sm text-text-secondary mb-5">
                      {tier.audience}
                    </p>

                    {/* Delivery + Support */}
                    <p className="text-xs text-text-caption mb-6 pb-6 border-b border-border/30">Typical delivery: {tier.delivery}</p>

                    {/* Features with stagger */}
                    <ul
                      className="space-y-3 mb-8"
                      aria-label={`${tier.name} features`}
                    >
                      {tier.features.map((feature, fi) => (
                        <motion.li
                          key={feature}
                          custom={fi}
                          variants={featureVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <motion.span
                            custom={fi}
                            variants={checkVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex-shrink-0 mt-0.5"
                          >
                            <Check
                              className="w-4 h-4 text-vermillion"
                              aria-hidden="true"
                            />
                          </motion.span>
                          <span className="text-sm text-text-body leading-snug">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href="#contact"
                      className={`group/btn relative flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg text-sm font-heading font-semibold tracking-wide uppercase transition-all duration-300 overflow-hidden ${
                        isHighlighted
                          ? "bg-vermillion text-white hover:shadow-[0_0_30px_rgba(255,23,68,0.3)] hover:bg-vermillion/90"
                          : "border border-border/60 text-text-primary hover:border-neon/50 hover:text-neon hover:shadow-neon-sm"
                      }`}
                    >
                      <span className="relative z-10">Get Started</span>
                      <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      {isHighlighted && (
                        <span
                          className="absolute inset-0 bg-gradient-to-r from-vermillion via-vermillion/90 to-vermillion opacity-0 hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Build Your Own */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-10 text-sm text-text-caption"
        >
          Not sure which tier fits?{" "}
          <a
            href="#contact"
            className="text-vermillion hover:text-vermillion/80 transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 rounded"
          >
            Tell us about your project
          </a>{" "}
          and we will recommend the right scope.
        </motion.p>
      </div>
    </section>
  );
}
