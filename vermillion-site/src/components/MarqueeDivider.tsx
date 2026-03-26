"use client";

import { motion } from "framer-motion";

interface MarqueeDividerProps {
  text?: string;
  speed?: number;
  direction?: "left" | "right";
}

export default function MarqueeDivider({
  text = "ENGINEERING EXCELLENCE",
  speed = 20,
  direction = "left",
}: MarqueeDividerProps) {
  const items = Array(8).fill(text);

  return (
    <div
      className="relative overflow-hidden py-6 border-y border-neon/[0.06] bg-surface-1/20"
      aria-hidden="true"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed * 0.7, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 mx-8 text-[0.65rem] font-heading font-semibold uppercase tracking-[0.4em] text-white/[0.15] select-none"
            style={{ textShadow: "0 0 12px rgba(255,23,68,0.18), 0 0 24px rgba(75,20,120,0.08)" }}
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-neon/50 shadow-[0_0_12px_rgba(255,23,68,0.6),0_0_24px_rgba(255,23,68,0.2)] flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
