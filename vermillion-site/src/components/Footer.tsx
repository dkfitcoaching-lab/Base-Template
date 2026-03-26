"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

export default function Footer() {
  return (
    <footer className="relative pt-0 pb-10 bg-surface-1/10">
      {/* ── Gradient top border ── */}
      <div
        className="bg-gradient-to-r from-transparent via-neon to-transparent h-[2px] w-full"
        aria-hidden="true"
      />

      {/* Full logo lockup */}
      <div className="flex justify-center pt-10 pb-6 relative">
        <div className="relative">
          <img
            src="/logo-full.svg"
            alt="Vermillion Axis Technologies"
            className="w-[150px] h-auto"
          />
          {/* Neon underglow */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-10 bg-[radial-gradient(ellipse_at_center,rgba(255,23,68,0.28),transparent_70%)] blur-lg pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-4">
        <div className="flex flex-col gap-8">
          {/* ── Top row: brand + nav + back to top ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {/* Nav links */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease }}
                  className="relative text-sm text-text-caption hover:text-neon transition-colors duration-300 tracking-wider uppercase font-heading group py-2"
                >
                  {link.label}
                  {/* Sliding underline */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-neon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </nav>

            {/* Back to top */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Back to top"
              className="group flex items-center gap-2"
            >
              <span className="tracking-wider uppercase font-heading hidden sm:inline text-xs text-text-caption group-hover:text-text-secondary transition-colors duration-300">
                Top
              </span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-neon/[0.1] bg-surface-1 hover:bg-surface-2 hover:shadow-neon-sm hover:border-neon/30 transition-all duration-300">
                <ArrowUp className="w-3.5 h-3.5 text-text-caption group-hover:text-text-secondary group-hover:-translate-y-0.5 transition-all duration-300" />
              </span>
            </a>
          </motion.div>

          {/* ── Bottom row: location + copyright ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="flex items-center justify-center sm:justify-end gap-4 text-xs text-text-caption"
          >
            <span>Las Vegas, NV</span>
            <span
              className="w-px h-3 bg-border/50"
              aria-hidden="true"
            />
            <a href="mailto:contact@vermillionaxis.tech" className="hover:text-neon transition-colors duration-300">contact@vermillionaxis.tech</a>
            <span className="w-px h-3 bg-border/50" aria-hidden="true" />
            <span>&copy; {new Date().getFullYear()}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
