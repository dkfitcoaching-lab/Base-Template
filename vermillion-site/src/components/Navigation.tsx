"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [mobileOpen, handleEscape]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface-1/90 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 rounded-lg"
              aria-label="Vermillion Axis Technologies — home"
            >
              <div className="w-8 h-8 rounded-lg bg-vermillion/10 border border-vermillion/20 flex items-center justify-center group-hover:bg-vermillion/20 transition-colors duration-300">
                <span className="text-vermillion font-heading font-bold text-sm">
                  V
                </span>
              </div>
              <span className="font-heading font-semibold text-text-primary text-sm tracking-wide hidden sm:block">
                VERMILLION AXIS
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-300 tracking-wide focus-visible:outline-none focus-visible:text-text-primary focus-visible:underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 px-5 py-2 rounded-btn bg-vermillion text-text-primary text-sm font-medium hover:bg-vermillion/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(192,48,48,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex items-center justify-center"
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
                  className="text-2xl font-heading font-light text-text-primary tracking-widest focus-visible:outline-none focus-visible:text-vermillion"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease }}
                className="mt-4 px-8 py-3 rounded-btn bg-vermillion text-text-primary font-medium hover:bg-vermillion/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50"
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
