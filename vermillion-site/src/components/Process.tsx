"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-surface-1/30">
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
            Workflow
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            How We Work
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-vermillion/40 via-border to-transparent hidden sm:block" />

          <div className="space-y-12">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-6 sm:gap-8"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-2 border border-border flex items-center justify-center relative z-10">
                  <span className="font-heading font-bold text-xs text-vermillion tracking-wider">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="font-heading font-bold text-lg text-text-primary uppercase tracking-wider mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
