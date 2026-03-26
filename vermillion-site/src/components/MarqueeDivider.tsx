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
      className="relative overflow-hidden py-6 border-y border-neon/[0.04] bg-surface-1/20"
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
            className="flex items-center gap-8 mx-8 text-[0.65rem] font-heading font-semibold uppercase tracking-[0.4em] text-white/[0.08] select-none"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-neon/30 shadow-[0_0_6px_rgba(255,23,68,0.4)] flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
