"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1];

const headlineLine1 = "Custom Software for".split(" ");
const headlineLine2 = "Fitness & Wellness".split(" ");
const headlineLine3 = "Businesses";

const floatingOrbs = [
  { top: "15%", left: "20%", size: 384, duration: 8, delay: 0, opacity: [0.06, 0.12, 0.06] },
  { top: "60%", right: "15%", size: 256, duration: 10, delay: 2, opacity: [0.04, 0.09, 0.04] },
  { top: "40%", left: "60%", size: 192, duration: 7, delay: 1, opacity: [0.05, 0.1, 0.05] },
  { bottom: "20%", left: "10%", size: 128, duration: 6, delay: 3, opacity: [0.07, 0.14, 0.07] },
  { top: "10%", right: "25%", size: 96, duration: 12, delay: 4, opacity: [0.08, 0.15, 0.08] },
];

function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(192,48,48,0.12), transparent 70%), " +
            "radial-gradient(ellipse 40% 60% at 20% 60%, rgba(192,48,48,0.06), transparent 50%), " +
            "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(138,32,32,0.08), transparent 60%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      {/* Secondary mesh layer */}
      <motion.div
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(192,48,48,0.06), transparent 60%)",
        }}
      />

      {/* Grid lines with scroll parallax */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,48,48,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,48,48,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, i % 2 === 0 ? -20 : 15, 0],
            x: [0, i % 3 === 0 ? 10 : -8, 0],
            opacity: orb.opacity,
          }}
          transition={{ duration: orb.duration, repeat: Infinity, ease, delay: orb.delay }}
          className="absolute rounded-full bg-vermillion/10 blur-[120px]"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
          }}
        />
      ))}
    </div>
  );
}

function WordReveal({
  words,
  startDelay,
  className,
}: {
  words: string[];
  startDelay: number;
  className?: string;
}) {
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: startDelay + i * 0.08,
            ease,
          }}
          className={className}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function ShimmerButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="shimmer-btn relative overflow-hidden px-8 py-3.5 rounded-btn bg-vermillion text-white font-medium text-sm tracking-wide hover:shadow-glow-md transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
    </a>
  );
}

export default function Hero() {
  const wordBaseDelay = 0.4;
  const line2Delay = wordBaseDelay + headlineLine1.length * 0.08 + 0.05;
  const line3Delay = line2Delay + headlineLine2.length * 0.08 + 0.05;
  const subtextDelay = line3Delay + 0.3;
  const ctaDelay = subtextDelay + 0.3;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <AnimatedBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Company name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="font-heading text-xs sm:text-sm tracking-[0.35em] text-vermillion uppercase mb-6"
        >
          Vermillion Axis Technologies
        </motion.p>

        {/* Headline with word-by-word reveal */}
        <h1
          id="hero-heading"
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1] mb-6"
        >
          <span className="block">
            <WordReveal words={headlineLine1} startDelay={wordBaseDelay} />
          </span>
          <span className="block">
            <WordReveal
              words={headlineLine2}
              startDelay={line2Delay}
              className="text-transparent bg-clip-text bg-gradient-to-r from-vermillion to-red-400"
            />
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: line3Delay,
                ease,
              }}
              style={{ display: "inline-block" }}
            >
              {headlineLine3}
            </motion.span>
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: subtextDelay, ease }}
          className="font-body text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We build what agencies charge $40,000+ for. You own every line of
          code. No subscriptions. No lock-in.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: ctaDelay, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="px-8 py-3.5 rounded-btn border border-border text-text-primary font-medium text-sm tracking-wide transition-all duration-300 hover:border-vermillion hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50"
          >
            See Our Work
          </a>
          <ShimmerButton href="#contact">Start a Project</ShimmerButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ctaDelay + 0.7, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-text-caption" />
        </motion.div>
      </motion.div>
    </section>
  );
}
