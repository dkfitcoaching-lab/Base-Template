"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

export default function Footer() {
  return (
    <footer className="relative pt-0 pb-10">
      {/* ── Gradient top border ── */}
      <div
        className="bg-gradient-to-r from-transparent via-vermillion to-transparent h-px w-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
        <div className="flex flex-col gap-8">
          {/* ── Top row: brand + nav + back to top ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {/* Brand */}
            <div className="flex items-center gap-3">
              <img
                src="/logo-mark.svg"
                alt=""
                className="w-6 h-6"
                aria-hidden="true"
              />
              <span className="font-heading text-xs text-text-secondary tracking-[0.15em]">
                VERMILLION <span className="text-vermillion">AXIS</span>{" "}
                TECHNOLOGIES
              </span>
            </div>

            {/* Nav links */}
            <nav
              aria-label="Footer navigation"
              className="flex items-center gap-6"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease }}
                  className="relative text-sm text-text-caption hover:text-vermillion transition-colors duration-300 tracking-wider uppercase font-heading group"
                >
                  {link.label}
                  {/* Sliding underline */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-vermillion origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
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
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.06] bg-surface-1 hover:bg-surface-2 hover:shadow-[0_0_20px_rgba(192,48,48,0.2)] transition-all duration-300">
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
            <a href="mailto:david@vermillionaxistech.com" className="hover:text-vermillion transition-colors duration-300">david@vermillionaxistech.com</a>
            <span className="w-px h-3 bg-border/50" aria-hidden="true" />
            <span>&copy; {new Date().getFullYear()}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
