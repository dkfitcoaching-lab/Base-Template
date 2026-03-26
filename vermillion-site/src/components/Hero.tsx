"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/MagneticButton";

const ease = [0.22, 1, 0.36, 1];

const headlineLine1 = "We Engineer".split(" ");
const headlineLine2 = "What Others".split(" ");
const headlineLine3 = "Can't Build".split(" ");

/* Breathing ambient orbs — neon crimson + deep violet mix */
const ambientOrbs = [
  { top: "10%", left: "15%", size: 450, duration: 8, delay: 0, color: "rgba(255,23,68,0.1)", opacity: [0.08, 0.18, 0.08] },
  { top: "55%", right: "10%", size: 350, duration: 10, delay: 2, color: "rgba(75,20,120,0.12)", opacity: [0.06, 0.15, 0.06] },
  { bottom: "15%", left: "5%", size: 250, duration: 7, delay: 1, color: "rgba(255,23,68,0.08)", opacity: [0.08, 0.2, 0.08] },
  { top: "30%", right: "25%", size: 400, duration: 12, delay: 3, color: "rgba(75,20,120,0.1)", opacity: [0.06, 0.14, 0.06] },
  { bottom: "30%", left: "50%", size: 300, duration: 9, delay: 1.5, color: "rgba(255,23,68,0.07)", opacity: [0.06, 0.12, 0.06] },
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
      {/* Animated gradient mesh — neon crimson + violet */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,23,68,0.1), transparent 70%), " +
            "radial-gradient(ellipse 40% 60% at 20% 60%, rgba(75,20,120,0.06), transparent 50%), " +
            "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(255,23,68,0.06), transparent 60%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      {/* Grid lines with scroll parallax — neon tinted */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,23,68,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,23,68,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,23,68,0.02) 2px, rgba(255,23,68,0.02) 4px)",
          opacity: 0.3,
        }}
      />

      {/* Breathing ambient orbs */}
      {ambientOrbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, i % 2 === 0 ? -20 : 15, 0],
            x: [0, i % 3 === 0 ? 10 : -8, 0],
            opacity: orb.opacity,
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: orb.duration, repeat: Infinity, ease, delay: orb.delay }}
          className="absolute rounded-full blur-[120px]"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            background: orb.color,
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
            className="text-xs font-mono uppercase tracking-[0.25em] text-text-caption/50 flex items-center gap-8"
          >
            {tech}
            <span className="w-2 h-2 rounded-full bg-neon/50 shadow-[0_0_10px_rgba(255,23,68,0.5),0_0_20px_rgba(255,23,68,0.2)]" />
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
      className="shimmer-btn relative overflow-hidden px-8 py-3.5 rounded-btn bg-vermillion text-white font-heading font-semibold text-sm tracking-wider uppercase hover:shadow-neon-md active:scale-[0.97] active:translate-y-[1px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
  /* Logo reveal timing */
  const logoDelay = 0.2;
  const glowDelay = logoDelay + 0.4;
  const wordBaseDelay = glowDelay + 0.6;
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* ── Full Logo — Dramatic Centered Reveal ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: logoDelay, ease }}
          className="relative mx-auto mb-10 w-[250px] sm:w-[300px] lg:w-[350px]"
        >
          {/* Neon underglow behind logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: glowDelay, ease }}
            className="absolute -inset-16 sm:-inset-20 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,23,68,0.25)_0%,rgba(75,20,120,0.12)_40%,transparent_70%)]" style={{ filter: "drop-shadow(0 0 40px rgba(255,23,68,0.2))" }} />
          </motion.div>

          {/* The logo itself with flicker effect */}
          <motion.img
            src="/logo-full.svg"
            alt="Vermillion Axis Technologies"
            className="relative w-full h-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: logoDelay + 0.3 }}
            style={{ animation: "neon-flicker 0.15s ease-in-out forwards", animationDelay: `${logoDelay + 0.3}s` }}
          />
        </motion.div>

        {/* ── Headline with word-by-word reveal ── */}
        <motion.div
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <h1
            id="hero-heading"
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] text-text-primary leading-[1.05] tracking-[0.02em] mb-6"
          >
            <span className="block">
              <WordReveal words={headlineLine1} startDelay={wordBaseDelay} />
            </span>
            <span className="block">
              <WordReveal
                words={headlineLine2}
                startDelay={line2Delay}
                className="text-gradient-vermillion text-neon-glow"
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
          className="h-px max-w-[200px] mx-auto mb-8 bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_15px_rgba(255,23,68,0.4),0_0_30px_rgba(255,23,68,0.15)]"
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
              className="px-8 py-3.5 rounded-btn border border-border text-text-primary font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:border-neon/50 hover:shadow-neon-sm active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
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
