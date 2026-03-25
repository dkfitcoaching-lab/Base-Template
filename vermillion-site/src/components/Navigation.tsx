"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

const sectionIds = ["work", "services", "pricing", "process", "contact"];

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <a
      href={href}
      className={`relative text-sm font-body tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:text-text-primary focus-visible:underline underline-offset-4 group ${
        isActive ? "text-vermillion" : "text-text-secondary hover:text-text-primary"
      }`}
    >
      {label}
      {/* Animated underline */}
      <span
        className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-vermillion origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
        style={{ transformOrigin: "left center" }}
        aria-hidden="true"
      />
      {/* Active indicator */}
      {isActive && (
        <motion.span
          layoutId="nav-active-underline"
          className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-vermillion"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          aria-hidden="true"
        />
      )}
    </a>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Scroll state for nav background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Escape key closes mobile menu */
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [mobileOpen, handleEscape]);

  useEffect(() => {
    if (!mobileOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface-1/90 backdrop-blur-xl border-b border-border/50 shadow-glass"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#top"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 rounded-lg"
              aria-label="Vermillion Axis Technologies — home"
            >
              <div className="relative">
                <img
                  src="/logo-mark.svg"
                  alt=""
                  className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                />
                {/* Logo dot glow on hover */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-vermillion/20 blur-lg" aria-hidden="true" />
              </div>
              <span className="font-heading font-semibold text-text-primary text-sm tracking-[0.15em] hidden sm:block">
                VERMILLION <span className="text-vermillion">AXIS</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={activeSection === link.href.replace("#", "")}
                />
              ))}
              <a
                href="#contact"
                className="ml-2 px-5 py-2 rounded-btn bg-vermillion text-white text-sm font-medium btn-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 rounded"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="block w-6 h-[1.5px] bg-text-primary origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2, ease }}
                className="block w-6 h-[1.5px] bg-text-primary"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="block w-6 h-[1.5px] bg-text-primary origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay — Glassmorphism */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-lg flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, ease }}
                  className={`relative text-xl font-heading font-light tracking-widest focus-visible:outline-none focus-visible:text-vermillion group ${
                    activeSection === link.href.replace("#", "")
                      ? "text-vermillion"
                      : "text-text-primary"
                  }`}
                >
                  {link.label}
                  {/* Hover underline for mobile links */}
                  <span
                    className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-vermillion origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease }}
                className="mt-4 px-8 py-3 rounded-btn bg-vermillion text-white font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50"
                style={{
                  boxShadow: "0 0 20px rgba(192, 48, 48, 0.3)",
                }}
              >
                Get Started
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
