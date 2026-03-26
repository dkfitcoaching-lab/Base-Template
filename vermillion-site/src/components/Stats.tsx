"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { STATS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

/** Parse a stat value like "100+", "<72hr", "3–21", "100%" into parts for animation */
function parseStatValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([<>]?)(\d+)(.*)/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] };
}

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { prefix, number, suffix } = parseStatValue(value);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, number, {
        duration: 1.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [isInView, motionValue, number, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease }}
    >
      <dt className="font-heading font-bold text-3xl lg:text-4xl text-text-primary mb-1">
        <span>{prefix}</span>
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </dt>
      <dd className="text-sm text-text-secondary tracking-wide">
        {label}
      </dd>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-border/30 bg-surface-1/40" aria-label="Key metrics">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i < STATS.length - 1 ? "sm:border-r sm:border-border/30" : ""}`}
            >
              <AnimatedStat value={stat.value} label={stat.label} delay={i * 0.1} />
            </div>
          ))}
        </dl>
      </div>

      {/* Vermillion gradient accent at bottom */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(180, 43, 43, 0.3), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
