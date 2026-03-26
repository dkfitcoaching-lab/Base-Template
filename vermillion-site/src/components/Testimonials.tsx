"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 lg:py-40" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-overline text-vermillion uppercase font-heading mb-3">
            Client Feedback
          </p>
          <h2
            id="testimonials-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary"
          >
            Trusted by Founders. Verified by Results.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {TESTIMONIALS.map((t) => (
            <motion.blockquote
              key={t.name}
              variants={itemVariants}
              className="relative p-6 lg:p-8 rounded-card bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
            >
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-vermillion text-vermillion"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-text-body text-base leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-vermillion/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-sm text-vermillion">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="not-italic font-heading font-semibold text-sm text-text-primary block">
                    {t.name}
                  </cite>
                  <span className="text-xs text-text-secondary">
                    {t.title} &middot; {t.location}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
