"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/MagneticButton";

const ease = [0.22, 1, 0.36, 1];

const headlineLine1 = "We Engineer".split(" ");
const headlineLine2 = "What Others".split(" ");
const headlineLine3 = "Can't Build".split(" ");

const floatingOrbs = [
  { top: "15%", left: "20%", size: 384, duration: 8, delay: 0, opacity: [0.08, 0.18, 0.08] },
  { top: "60%", right: "15%", size: 256, duration: 10, delay: 2, opacity: [0.06, 0.14, 0.06] },
  { bottom: "20%", left: "10%", size: 128, duration: 6, delay: 3, opacity: [0.09, 0.18, 0.09] },
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
          initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
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

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS",
  "GraphQL", "REST APIs", "Firebase", "Stripe", "AWS", "Progressive Web Apps",
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS",
  "GraphQL", "REST APIs", "Firebase", "Stripe", "AWS", "Progressive Web Apps",
];

function TechMarquee() {
  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-16" aria-hidden="true">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {techStack.map((tech, i) => (
          <span
            key={i}
            className="text-xs font-heading uppercase tracking-[0.25em] text-text-caption/50 flex items-center gap-8"
          >
            {tech}
            <span className="w-1 h-1 rounded-full bg-vermillion/30" />
          </span>
        ))}
      </motion.div>
    </div>
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
  const accentLineDelay = line3Delay + headlineLine3.length * 0.08 + 0.1;
  const subtextDelay = accentLineDelay + 0.3;
  const ctaDelay = subtextDelay + 0.3;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <AnimatedBackground />

      {/* Logo watermark */}
      <img
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] opacity-[0.03] z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline with word-by-word reveal */}
        <motion.div
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <h1
            id="hero-heading"
            className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] text-text-primary leading-[1.05] tracking-[-0.02em] mb-6"
          >
            <span className="block">
              <WordReveal words={headlineLine1} startDelay={wordBaseDelay} />
            </span>
            <span className="block">
              <WordReveal
                words={headlineLine2}
                startDelay={line2Delay}
                className="text-transparent bg-clip-text bg-gradient-to-r from-vermillion via-vermillion-light to-vermillion"
              />
            </span>
            <span className="block">
              <WordReveal words={headlineLine3} startDelay={line3Delay} />
            </span>
          </h1>
        </motion.div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: accentLineDelay, ease }}
          className="h-px max-w-[200px] mx-auto mb-8 bg-gradient-to-r from-transparent via-vermillion to-transparent"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: subtextDelay, ease }}
          className="font-body text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Custom software. Full ownership. Shipped in days, not months.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: ctaDelay, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton><ShimmerButton href="#contact">Schedule a Consultation</ShimmerButton></MagneticButton>
          <MagneticButton>
            <a
              href="#work"
              className="px-8 py-3.5 rounded-btn border border-border text-text-primary font-medium text-sm tracking-wide transition-all duration-300 hover:border-vermillion hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50"
            >
              View Our Work
            </a>
          </MagneticButton>
        </motion.div>

        {/* Tech stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: ctaDelay + 0.5, ease }}
        >
          <TechMarquee />
        </motion.div>
      </div>
    </section>
  );
}
