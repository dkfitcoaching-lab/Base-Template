"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section id="faq" className="py-20 lg:py-24" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-neon uppercase font-heading mb-3">
            Common Questions
          </p>
          <h2
            id="faq-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary text-neon-glow-subtle"
          >
            Everything You Need to Know
          </h2>
        </motion.div>

        <div className="space-y-0">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease }}
                className={`border-b border-neon/[0.06] ${isOpen ? "border-l-2 border-l-neon" : ""}`}
              >
                <button
                  id={buttonId}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 rounded"
                >
                  <span className="font-heading font-semibold text-base text-text-primary pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? "text-neon" : "text-text-secondary"}`} aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-text-body text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
