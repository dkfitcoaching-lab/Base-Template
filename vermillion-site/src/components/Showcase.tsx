"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import DeviceMockup from "./DeviceMockup";
import { SHOWCASE_ITEMS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

function TiltCard({ children }: { children: React.ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.02)`
    );
    setGlowPos({ x: x * 100, y: y * 100 });
  }

  function handleMouseLeave() {
    setTransform("");
    setGlowPos({ x: 50, y: 50 });
  }

  if (isTouchDevice) {
    return <div className="relative group">{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
      style={{
        transform: transform || "perspective(800px) rotateX(0deg) rotateY(0deg)",
        transition: transform ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        willChange: "transform",
      }}
    >
      {/* Dynamic glow that follows cursor */}
      <div
        className="absolute -inset-1 rounded-hero opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 blur-[100px]"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 23, 68, 0.22), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

const parallaxOffsets: [number, number][] = [
  [20, -20],   // index 0: move less
  [40, -40],   // index 1: move more
  [30, -30],   // index 2: medium
  [20, -20],   // index 3: move less
  [40, -40],   // index 4: move more
  [30, -30],   // index 5: medium
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yTransform0 = useTransform(scrollYProgress, [0, 1], parallaxOffsets[0]);
  const yTransform1 = useTransform(scrollYProgress, [0, 1], parallaxOffsets[1]);
  const yTransform2 = useTransform(scrollYProgress, [0, 1], parallaxOffsets[2]);
  const yTransform3 = useTransform(scrollYProgress, [0, 1], parallaxOffsets[3]);
  const yTransform4 = useTransform(scrollYProgress, [0, 1], parallaxOffsets[4]);
  const yTransform5 = useTransform(scrollYProgress, [0, 1], parallaxOffsets[5]);

  const transforms = [yTransform0, yTransform1, yTransform2, yTransform3, yTransform4, yTransform5];

  return (
    <section ref={sectionRef} id="work" className="py-24 lg:py-32" aria-labelledby="showcase-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-neon uppercase font-heading mb-3">
            Selected Work
          </p>
          <h2
            id="showcase-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary text-neon-glow-subtle"
          >
            Engineered for Impact
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SHOWCASE_ITEMS.map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              style={{ y: transforms[index] }}
              className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <TiltCard>
                <div className="relative gothic-card rounded-card overflow-hidden">
                  {"category" in item && item.category && (
                    <span className="absolute top-3 right-3 z-20 px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider text-neon bg-neon/10 border border-neon/20 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  )}
                  {index === 0 && (
                    <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider text-neon bg-neon/[0.08] border border-neon/20 rounded-full backdrop-blur-sm shadow-[0_0_12px_rgba(255,23,68,0.3)]">
                      Featured
                    </span>
                  )}
                  <DeviceMockup label={item.label} description={item.description} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12 text-sm text-text-caption"
        >
          Every project is custom-built from scratch. No templates. No shortcuts.
        </motion.p>
      </div>
    </section>
  );
}
