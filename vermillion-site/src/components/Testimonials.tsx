"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function StarRating() {
  return (
    <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-neon text-neon"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

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
          <p className="text-xs tracking-[0.3em] text-neon uppercase font-heading mb-3">
            Client Feedback
          </p>
          <h2
            id="testimonials-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary text-neon-glow-subtle"
          >
            Trusted by Founders. Verified by Results.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          {/* Featured testimonial — full width, larger */}
          <motion.blockquote
            variants={itemVariants}
            className="relative p-8 lg:p-12 rounded-card gothic-card neon-border-flow overflow-hidden"
          >
            {/* Decorative oversized quote mark */}
            <span
              className="absolute top-4 right-8 text-[8rem] leading-none font-heading font-bold text-neon/[0.06] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Vermillion accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] holographic-shimmer rounded-l-card" aria-hidden="true" />

            <div className="relative">
              <StarRating />
              <p className="text-text-body text-lg lg:text-xl leading-relaxed mb-8 max-w-4xl">
                &ldquo;{featured.quote}&rdquo;
              </p>

              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0 border border-neon/20">
                  <span className="font-heading font-bold text-base text-neon">
                    {featured.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="not-italic font-heading font-semibold text-base text-text-primary block">
                    {featured.name}
                  </cite>
                  <span className="text-sm text-text-secondary">
                    {featured.title} &middot; {featured.location}
                  </span>
                </div>
              </footer>
            </div>
          </motion.blockquote>

          {/* Remaining testimonials — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {rest.map((t) => (
              <motion.blockquote
                key={t.name}
                variants={itemVariants}
                className="relative p-6 lg:p-8 rounded-card gothic-card border-l border-l-neon/[0.06] hover:border-l-neon/20"
              >
                {/* Decorative quote mark */}
                <span
                  className="absolute top-2 right-6 text-[5rem] leading-none font-heading font-bold text-neon/[0.04] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="relative">
                  <StarRating />
                  <p className="text-text-body text-base leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <footer className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0 border border-neon/20">
                      <span className="font-heading font-bold text-sm text-neon">
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
                </div>
              </motion.blockquote>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
