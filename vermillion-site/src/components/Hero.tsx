"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/MagneticButton";

const ease = [0.22, 1, 0.36, 1];

const headlineLine1 = "Precision".split(" ");
const headlineLine2 = "Engineered".split(" ");
const headlineLine3 = "Software".split(" ");

/* Breathing ambient orbs — neon crimson, 8 total with dramatic size variance */
/* Reduced to 2 static orbs — no animation, no blur. Pure CSS radial gradient instead. */
const ambientOrbs: typeof Array.prototype = [];

/* Gothic ornamental corner SVG — wrought iron pointed arch style, larger and more detailed */
function GothicCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer pointed arch corner */}
      <path
        d="M2 118 L2 40 Q2 12 28 2 L118 2"
        stroke="rgba(192,192,192,0.2)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner filigree line */}
      <path
        d="M10 110 L10 46 Q10 20 34 10 L110 10"
        stroke="rgba(192,192,192,0.12)"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Third ornamental trace */}
      <path
        d="M18 102 L18 50 Q18 28 40 18 L102 18"
        stroke="rgba(192,192,192,0.07)"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Pointed finial detail */}
      <path
        d="M2 40 L8 34 L2 28"
        stroke="rgba(192,192,192,0.2)"
        strokeWidth="1"
        fill="none"
      />
      {/* Second finial */}
      <path
        d="M2 56 L5 52 L2 48"
        stroke="rgba(192,192,192,0.12)"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Horizontal finial on top edge */}
      <path
        d="M40 2 L34 8 L28 2"
        stroke="rgba(192,192,192,0.2)"
        strokeWidth="1"
        fill="none"
      />
      {/* Small trefoil ornament at corner junction */}
      <circle cx="2" cy="2" r="3" fill="rgba(192,192,192,0.18)" />
      <path
        d="M16 2 Q16 16 2 16"
        stroke="rgba(192,192,192,0.15)"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Cross ornament near corner */}
      <line x1="2" y1="8" x2="8" y2="2" stroke="rgba(192,192,192,0.1)" strokeWidth="0.5" />
      {/* Rose window micro detail */}
      <circle cx="24" cy="24" r="4" stroke="rgba(192,192,192,0.08)" strokeWidth="0.5" fill="none" />
      <circle cx="24" cy="24" r="2" stroke="rgba(192,192,192,0.06)" strokeWidth="0.4" fill="none" />
    </svg>
  );
}

/* Animated ornamental corner brackets for headline area — chrome with neon hint */
function HeadlineBracket({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      className={`w-8 h-8 sm:w-[52px] sm:h-[52px] ${className || ""}`}
      style={style}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 1.8, ease }}
    >
      {/* Outer bracket */}
      <path
        d="M2 50 L2 10 Q2 2 10 2 L50 2"
        stroke="rgba(200,200,200,0.35)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner bracket */}
      <path
        d="M7 45 L7 12 Q7 7 12 7 L45 7"
        stroke="rgba(200,200,200,0.18)"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Chrome dot accent */}
      <circle cx="2" cy="2" r="2" fill="rgba(200,200,200,0.3)" />
      {/* Neon dot at inner corner */}
      <motion.circle
        cx="7"
        cy="7"
        r="1"
        fill="rgba(255,23,68,0.5)"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />
      {/* Finial tick marks */}
      <line x1="2" y1="18" x2="5" y2="15" stroke="rgba(200,200,200,0.15)" strokeWidth="0.5" />
      <line x1="18" y1="2" x2="15" y2="5" stroke="rgba(200,200,200,0.15)" strokeWidth="0.5" />
    </motion.svg>
  );
}

/* Scan line sweep effect — more dramatic width and glow */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[3px] pointer-events-none z-20"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,23,68,0.1) 10%, rgba(255,23,68,0.25) 30%, rgba(255,23,68,0.5) 50%, rgba(255,23,68,0.25) 70%, rgba(255,23,68,0.1) 90%, transparent 100%)",
        boxShadow: "0 0 30px rgba(255,23,68,0.4), 0 0 80px rgba(255,23,68,0.15), 0 -4px 16px rgba(255,23,68,0.1), 0 4px 16px rgba(255,23,68,0.1)",
      }}
      initial={{ top: "-3px" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        repeatDelay: 2.5,
        ease: "linear",
      }}
    />
  );
}

/* Dramatic vertical neon line from top — taller, more intense pulse */
function VerticalNeonLine() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none" aria-hidden="true">
      <motion.div
        className="w-[1px] origin-top"
        style={{
          background: "linear-gradient(180deg, rgba(255,23,68,0.8) 0%, rgba(255,23,68,0.4) 40%, rgba(255,23,68,0.15) 70%, transparent 100%)",
          boxShadow: "0 0 12px rgba(255,23,68,0.5), 0 0 30px rgba(255,23,68,0.25), 0 0 60px rgba(255,23,68,0.12), 0 0 100px rgba(255,23,68,0.06)",
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 240, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease }}
      />
      {/* Pulsing glow at the tip */}
      <motion.div
        className="w-[5px] h-[5px] rounded-full -translate-x-[2px]"
        style={{
          background: "rgba(255,23,68,0.9)",
          boxShadow: "0 0 14px rgba(255,23,68,0.7), 0 0 35px rgba(255,23,68,0.4), 0 0 60px rgba(255,23,68,0.2)",
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 2.2, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Drip trail beneath the tip */}
      <motion.div
        className="w-[1px] origin-top"
        style={{
          background: "linear-gradient(180deg, rgba(255,23,68,0.3) 0%, transparent 100%)",
        }}
        initial={{ height: 0 }}
        animate={{ height: [0, 60, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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

      {/* Animated gradient mesh — neon crimson only, more intense */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,23,68,0.09), transparent 70%), " +
            "radial-gradient(ellipse 40% 60% at 15% 60%, rgba(255,23,68,0.05), transparent 50%), " +
            "radial-gradient(ellipse 50% 40% at 85% 30%, rgba(255,23,68,0.06), transparent 60%), " +
            "radial-gradient(ellipse 30% 30% at 50% 80%, rgba(255,23,68,0.04), transparent 50%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      {/* Gothic cathedral vignette — extreme darkness at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.97) 100%)",
        }}
      />

      {/* Secondary vignette — top and bottom crushing darkness */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Grid lines with scroll parallax — neon tinted, finer */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,23,68,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,23,68,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.1}px)`,
          willChange: "transform",
        }}
      />

      {/* Diagonal cross-hatch overlay for industrial texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(192,192,192,0.3) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(192,192,192,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* CRT scan line overlay — denser */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 1.5px, rgba(255,23,68,0.025) 1.5px, rgba(255,23,68,0.025) 3px)",
          opacity: 0.4,
        }}
      />

      {/* Noise/grain texture via CSS */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Static ambient glow — no animation, no blur filter, pure CSS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,23,68,0.08), transparent 70%), radial-gradient(ellipse 60% 50% at 70% 70%, rgba(255,23,68,0.06), transparent 60%)" }}
      />
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
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          transition={{
            duration: 0.6,
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
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-8 sm:mt-16" aria-hidden="true">
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
      className="shimmer-btn relative overflow-hidden px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-btn bg-vermillion text-white font-heading font-semibold text-sm tracking-wider uppercase hover:shadow-neon-md active:scale-[0.97] active:translate-y-[1px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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

/* Gothic cathedral divider ornament */
function GothicDivider({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1, delay, ease }}
      className="flex items-center justify-center gap-3 max-w-[320px] mx-auto mb-8"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon/40 to-neon/60 shadow-[0_0_10px_rgba(255,23,68,0.3)]" />
      {/* Central ornament — gothic diamond */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
        <path d="M8 1 L15 8 L8 15 L1 8 Z" stroke="rgba(255,23,68,0.5)" strokeWidth="1" fill="none" />
        <path d="M8 4 L12 8 L8 12 L4 8 Z" stroke="rgba(192,192,192,0.2)" strokeWidth="0.5" fill="none" />
        <motion.circle
          cx="8" cy="8" r="1.5"
          fill="rgba(255,23,68,0.6)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-neon/40 to-neon/60 shadow-[0_0_10px_rgba(255,23,68,0.3)]" />
    </motion.div>
  );
}

export default function Hero() {
  /* Logo reveal timing */
  const logoDelay = 0.2;
  const glowDelay = logoDelay + 0.4;
  const wordBaseDelay = glowDelay + 0.7;
  const line2Delay = wordBaseDelay + headlineLine1.length * 0.08 + 0.05;
  const line3Delay = line2Delay + headlineLine2.length * 0.08 + 0.05;
  const accentLineDelay = line3Delay + headlineLine3.length * 0.08 + 0.1;
  const subtextDelay = accentLineDelay + 0.4;
  const ctaDelay = subtextDelay + 0.35;

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
      <div className="hidden sm:block absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        {/* Top-left */}
        <GothicCorner className="absolute top-4 left-4" />
        {/* Top-right */}
        <GothicCorner className="absolute top-4 right-4 -scale-x-100" />
        {/* Bottom-left */}
        <GothicCorner className="absolute bottom-4 left-4 -scale-y-100" />
        {/* Bottom-right */}
        <GothicCorner className="absolute bottom-4 right-4 -scale-x-100 -scale-y-100" />

        {/* Connecting border lines between corners — subtle silver */}
        <motion.div
          className="absolute top-4 left-[124px] right-[124px] h-px"
          style={{ background: "linear-gradient(90deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05) 30%, rgba(192,192,192,0.05) 70%, rgba(192,192,192,0.15))" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease }}
        />
        <motion.div
          className="absolute bottom-4 left-[124px] right-[124px] h-px"
          style={{ background: "linear-gradient(90deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05) 30%, rgba(192,192,192,0.05) 70%, rgba(192,192,192,0.15))" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease }}
        />
        <motion.div
          className="absolute left-4 top-[124px] bottom-[124px] w-px"
          style={{ background: "linear-gradient(180deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05) 30%, rgba(192,192,192,0.05) 70%, rgba(192,192,192,0.15))" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease }}
        />
        <motion.div
          className="absolute right-4 top-[124px] bottom-[124px] w-px"
          style={{ background: "linear-gradient(180deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05) 30%, rgba(192,192,192,0.05) 70%, rgba(192,192,192,0.15))" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* ── Full Logo — Dramatic Centered Reveal with intense neon underglow & flicker ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: logoDelay, ease }}
          className="relative mx-auto mb-8 sm:mb-14 w-[260px] sm:w-[420px] md:w-[480px] lg:w-[580px]"
        >
          {/* Intense multi-layer neon underglow — outermost layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: glowDelay, ease }}
            className="absolute -inset-20 sm:-inset-28 lg:-inset-36 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,23,68,0.3) 0%, rgba(255,23,68,0.14) 25%, rgba(255,23,68,0.05) 50%, rgba(255,23,68,0.01) 70%, transparent 85%)",
                filter: "drop-shadow(0 0 80px rgba(255,23,68,0.25)) drop-shadow(0 0 140px rgba(255,23,68,0.12))",
              }}
            />
          </motion.div>
          {/* Secondary pulsing glow ring */}
          <motion.div
            className="absolute -inset-12 sm:-inset-18 lg:-inset-24 pointer-events-none rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,23,68,0.18) 0%, transparent 65%)",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.92, 1.08, 0.92],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          {/* Tertiary rapid flicker glow */}
          <motion.div
            className="absolute -inset-6 sm:-inset-8 lg:-inset-12 pointer-events-none rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,23,68,0.1) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.1, 0.5, 0.05, 0.4, 0.1],
            }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "linear", delay: glowDelay + 1 }}
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
              filter: "drop-shadow(0 0 20px rgba(255,23,68,0.4)) drop-shadow(0 0 40px rgba(255,23,68,0.15))",
            }}
          />
        </motion.div>

        {/* ── Headline area with animated ornamental corner brackets ── */}
        <div className="relative inline-block">
          {/* Ornamental chrome brackets — top-left */}
          <HeadlineBracket
            className="hidden sm:block absolute -top-5 -left-8 sm:-top-7 sm:-left-12"
          />
          {/* Top-right — flipped horizontally */}
          <HeadlineBracket
            className="hidden sm:block absolute -top-5 -right-8 sm:-top-7 sm:-right-12"
            style={{ transform: "scaleX(-1)" }}
          />
          {/* Bottom-left — flipped vertically */}
          <HeadlineBracket
            className="hidden sm:block absolute -bottom-5 -left-8 sm:-bottom-7 sm:-left-12"
            style={{ transform: "scaleY(-1)" }}
          />
          {/* Bottom-right — flipped both */}
          <HeadlineBracket
            className="hidden sm:block absolute -bottom-5 -right-8 sm:-bottom-7 sm:-right-12"
            style={{ transform: "scale(-1, -1)" }}
          />

          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease }}
          >
            <h1
              id="hero-heading"
              className="font-heading font-bold text-[1.6rem] sm:text-4xl md:text-5xl lg:text-[5rem] xl:text-[6rem] text-text-primary leading-[1.05] tracking-[0.02em] mb-6"
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

        {/* Gothic ornamental divider */}
        <GothicDivider delay={accentLineDelay} />

        {/* Subtext — authoritative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: subtextDelay, ease }}
          className="font-body text-[0.95rem] sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed"
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
              className="px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-btn border border-border text-text-primary font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:border-neon/50 hover:text-neon hover:shadow-neon-sm active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
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
