"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/MagneticButton";

const ease = [0.22, 1, 0.36, 1];

const headlineLine1 = "Precision".split(" ");
const headlineLine2 = "Engineered".split(" ");
const headlineLine3 = "Software".split(" ");

/* Breathing ambient orbs — neon crimson, 8 total for dense atmosphere */
const ambientOrbs = [
  { top: "5%", left: "10%", size: 500, duration: 8, delay: 0, color: "rgba(255,23,68,0.08)", opacity: [0.04, 0.14, 0.04] },
  { top: "50%", right: "5%", size: 250, duration: 10, delay: 2, color: "rgba(255,23,68,0.06)", opacity: [0.03, 0.1, 0.03] },
  { bottom: "10%", left: "3%", size: 200, duration: 7, delay: 1, color: "rgba(255,23,68,0.07)", opacity: [0.04, 0.16, 0.04] },
  { top: "25%", right: "20%", size: 450, duration: 12, delay: 3, color: "rgba(255,23,68,0.05)", opacity: [0.03, 0.08, 0.03] },
  { top: "70%", left: "40%", size: 150, duration: 6, delay: 0.5, color: "rgba(255,23,68,0.09)", opacity: [0.05, 0.18, 0.05] },
  { top: "15%", right: "40%", size: 600, duration: 14, delay: 4, color: "rgba(255,23,68,0.04)", opacity: [0.02, 0.07, 0.02] },
  { bottom: "25%", right: "15%", size: 180, duration: 9, delay: 1.5, color: "rgba(255,23,68,0.08)", opacity: [0.04, 0.15, 0.04] },
  { top: "40%", left: "25%", size: 350, duration: 11, delay: 2.5, color: "rgba(255,23,68,0.06)", opacity: [0.03, 0.12, 0.03] },
];

/* Gothic ornamental corner SVG — wrought iron pointed arch style */
function GothicCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer pointed arch corner */}
      <path
        d="M2 78 L2 30 Q2 10 20 2 L78 2"
        stroke="rgba(192,192,192,0.2)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner filigree line */}
      <path
        d="M8 72 L8 34 Q8 16 24 8 L72 8"
        stroke="rgba(192,192,192,0.12)"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Pointed finial detail */}
      <path
        d="M2 30 L6 26 L2 22"
        stroke="rgba(192,192,192,0.18)"
        strokeWidth="1"
        fill="none"
      />
      {/* Small trefoil ornament at corner junction */}
      <circle cx="2" cy="2" r="2" fill="rgba(192,192,192,0.15)" />
      <path
        d="M12 2 Q12 12 2 12"
        stroke="rgba(192,192,192,0.15)"
        strokeWidth="0.75"
        fill="none"
      />
    </svg>
  );
}

/* Animated ornamental corner brackets for headline area */
function HeadlineBracket({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      className={className}
      style={style}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.8, ease }}
    >
      <path
        d="M2 38 L2 8 Q2 2 8 2 L38 2"
        stroke="rgba(200,200,200,0.3)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6 34 L6 10 Q6 6 10 6 L34 6"
        stroke="rgba(200,200,200,0.15)"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Chrome dot accent */}
      <circle cx="2" cy="2" r="1.5" fill="rgba(200,200,200,0.25)" />
    </motion.svg>
  );
}

/* Scan line sweep effect */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,23,68,0.15) 20%, rgba(255,23,68,0.4) 50%, rgba(255,23,68,0.15) 80%, transparent 100%)",
        boxShadow: "0 0 20px rgba(255,23,68,0.3), 0 0 60px rgba(255,23,68,0.1)",
      }}
      initial={{ top: "-2px" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "linear",
      }}
    />
  );
}

/* Dramatic vertical neon line from top */
function VerticalNeonLine() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none" aria-hidden="true">
      <motion.div
        className="w-[1px] origin-top"
        style={{
          background: "linear-gradient(180deg, rgba(255,23,68,0.6) 0%, rgba(255,23,68,0.2) 60%, transparent 100%)",
          boxShadow: "0 0 8px rgba(255,23,68,0.4), 0 0 20px rgba(255,23,68,0.2), 0 0 40px rgba(255,23,68,0.1)",
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 180, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease }}
      />
      {/* Pulsing glow at the tip */}
      <motion.div
        className="w-[3px] h-[3px] rounded-full -translate-x-[1px]"
        style={{
          background: "rgba(255,23,68,0.8)",
          boxShadow: "0 0 10px rgba(255,23,68,0.6), 0 0 25px rgba(255,23,68,0.3)",
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.8, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep black base */}
      <div className="absolute inset-0" style={{ background: "#050505" }} />

      {/* Animated gradient mesh — neon crimson only */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,23,68,0.07), transparent 70%), " +
            "radial-gradient(ellipse 40% 60% at 20% 60%, rgba(255,23,68,0.03), transparent 50%), " +
            "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(255,23,68,0.04), transparent 60%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      {/* Gothic cathedral vignette — heavy darkness at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)",
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

      {/* CRT scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,23,68,0.02) 2px, rgba(255,23,68,0.02) 4px)",
          opacity: 0.3,
        }}
      />

      {/* Breathing ambient orbs — 8 total */}
      {ambientOrbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, i % 2 === 0 ? -25 : 18, 0],
            x: [0, i % 3 === 0 ? 12 : -10, 0],
            opacity: orb.opacity,
            scale: [1, 1.2, 1],
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
      style={{ background: "#050505" }}
      aria-labelledby="hero-heading"
    >
      <AnimatedBackground />
      <ScanLine />
      <VerticalNeonLine />

      {/* ── Gothic Ornamental Corner Framing ── */}
      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        {/* Top-left */}
        <GothicCorner className="absolute top-6 left-6" />
        {/* Top-right */}
        <GothicCorner className="absolute top-6 right-6 -scale-x-100" />
        {/* Bottom-left */}
        <GothicCorner className="absolute bottom-6 left-6 -scale-y-100" />
        {/* Bottom-right */}
        <GothicCorner className="absolute bottom-6 right-6 -scale-x-100 -scale-y-100" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* ── Full Logo — Dramatic Centered Reveal with intense neon underglow ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: logoDelay, ease }}
          className="relative mx-auto mb-12 w-[280px] sm:w-[360px] lg:w-[440px]"
        >
          {/* Intense multi-layer neon underglow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: glowDelay, ease }}
            className="absolute -inset-16 sm:-inset-20 lg:-inset-28 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,23,68,0.25) 0%, rgba(255,23,68,0.10) 30%, rgba(255,23,68,0.03) 60%, transparent 80%)",
                filter: "drop-shadow(0 0 60px rgba(255,23,68,0.2)) drop-shadow(0 0 100px rgba(255,23,68,0.1))",
              }}
            />
          </motion.div>
          {/* Secondary pulsing glow ring */}
          <motion.div
            className="absolute -inset-10 sm:-inset-14 lg:-inset-20 pointer-events-none rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,23,68,0.12) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {/* The logo itself with flicker effect */}
          <motion.img
            src="/logo-full.svg"
            alt="Vermillion Axis Technologies"
            className="relative w-full h-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: logoDelay + 0.3 }}
            style={{
              animation: "neon-flicker 0.15s ease-in-out forwards",
              animationDelay: `${logoDelay + 0.3}s`,
              filter: "drop-shadow(0 0 12px rgba(255,23,68,0.3))",
            }}
          />
        </motion.div>

        {/* ── Headline area with animated ornamental corner brackets ── */}
        <div className="relative inline-block">
          {/* Ornamental chrome brackets — top-left */}
          <HeadlineBracket
            className="absolute -top-4 -left-6 sm:-top-6 sm:-left-10"
          />
          {/* Top-right — flipped horizontally */}
          <HeadlineBracket
            className="absolute -top-4 -right-6 sm:-top-6 sm:-right-10"
            style={{ transform: "scaleX(-1)" }}
          />
          {/* Bottom-left — flipped vertically */}
          <HeadlineBracket
            className="absolute -bottom-4 -left-6 sm:-bottom-6 sm:-left-10"
            style={{ transform: "scaleY(-1)" }}
          />
          {/* Bottom-right — flipped both */}
          <HeadlineBracket
            className="absolute -bottom-4 -right-6 sm:-bottom-6 sm:-right-10"
            style={{ transform: "scale(-1, -1)" }}
          />

          <motion.div
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease }}
          >
            <h1
              id="hero-heading"
              className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] xl:text-[6rem] text-text-primary leading-[1.05] tracking-[0.02em] mb-6"
            >
              <span className="block">
                <WordReveal words={headlineLine1} startDelay={wordBaseDelay} className="metallic-text" />
              </span>
              <span className="block">
                <WordReveal
                  words={headlineLine2}
                  startDelay={line2Delay}
                  className="text-gradient-vermillion text-neon-glow"
                />
              </span>
              <span className="block font-display">
                <WordReveal words={headlineLine3} startDelay={line3Delay} className="metallic-text" />
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: accentLineDelay, ease }}
          className="h-px max-w-[200px] mx-auto mb-8 bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_15px_rgba(255,23,68,0.4),0_0_30px_rgba(255,23,68,0.15)]"
        />

        {/* Subtext — authoritative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: subtextDelay, ease }}
          className="font-body text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Systems architecture for organizations that refuse to compromise. Zero templates. Zero shortcuts. Every line written with surgical precision.
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
