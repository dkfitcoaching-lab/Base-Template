"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-32 lg:py-40 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(192,48,48,0.08),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-6"
        >
          Ready to build
          <br />
          something real?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease }}
          className="text-lg text-text-secondary mb-10 max-w-xl mx-auto"
        >
          50% deposit to start. Balance on delivery. No long-term contracts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          <a
            href="#"
            className="inline-block px-10 py-4 rounded-btn bg-vermillion text-white font-heading font-semibold text-base tracking-wide hover:shadow-[0_0_40px_rgba(192,48,48,0.4)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            aria-label="Book a discovery call"
          >
            Book a Discovery Call
          </a>
        </motion.div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs text-text-caption"
        >
          <span>Zelle (no fee)</span>
          <span className="hidden sm:block w-px h-3 bg-border/50" aria-hidden="true" />
          <span>Stripe ACH ($5)</span>
          <span className="hidden sm:block w-px h-3 bg-border/50" aria-hidden="true" />
          <span>Card (3% surcharge)</span>
        </motion.div>
      </div>
    </section>
  );
}
