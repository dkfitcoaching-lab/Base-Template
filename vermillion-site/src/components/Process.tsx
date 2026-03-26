"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function Process() {
  return (
    <section
      id="process"
      className="py-32 lg:py-40"
      aria-labelledby="process-heading"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-neon uppercase font-heading mb-3">
            How It Works
          </p>
          <h2
            id="process-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary"
          >
            From Idea to Launch in Days
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-[27px] top-0 bottom-0 w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, #FF1744 0%, #FF1744 30%, rgba(75,20,120,0.3) 70%, transparent 100%)",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />

          {/* Traveling light dot */}
          <div
            className="absolute left-[25px] w-[5px] h-[5px] rounded-full bg-neon shadow-[0_0_15px_rgba(255,23,68,0.7),0_0_30px_rgba(255,23,68,0.3)] animate-scan-line opacity-90"
            aria-hidden="true"
          />

          <motion.ol
            className="space-y-10 lg:space-y-14"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {PROCESS_STEPS.map((step) => (
              <motion.li
                key={step.step}
                variants={stepVariants}
                className="group flex items-start gap-6 sm:gap-8"
              >
                {/* Step number circle */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-2 border border-neon/40
                    flex items-center justify-center relative z-10
                    shadow-[0_0_20px_rgba(255,23,68,0.15)]
                    group-hover:bg-neon/10 group-hover:border-neon group-hover:shadow-[0_0_30px_rgba(255,23,68,0.5),inset_0_0_10px_rgba(255,23,68,0.15)]
                    transition-all duration-500"
                  aria-hidden="true"
                >
                  <span className="font-heading font-bold text-sm text-neon tracking-wider">
                    {step.step}
                  </span>
                </div>

                {/* Content card with glassmorphism on hover */}
                <div
                  className="flex-1 pt-1 pb-2 px-5 -ml-1 rounded-card
                    border border-transparent
                    group-hover:bg-white/[0.02] group-hover:backdrop-blur-sm
                    group-hover:border-neon/[0.06]
                    transition-all duration-500"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-heading font-bold text-lg text-text-primary uppercase tracking-wider">
                      {step.title}
                    </h3>
                    {step.step === "01" && (
                      <span className="text-xs text-text-caption font-body">~15 minutes</span>
                    )}
                    {step.step === "02" && (
                      <span className="text-xs text-text-caption font-body">Within 24 hours</span>
                    )}
                    {step.step === "03" && (
                      <span className="text-xs text-text-caption font-body">3–21 days</span>
                    )}
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
