import { ArrowUp } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Top row: brand + nav + back to top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-vermillion/10 border border-vermillion/20 flex items-center justify-center">
                <span className="text-vermillion font-heading font-bold text-[10px]">
                  V
                </span>
              </div>
              <span className="font-heading text-xs text-text-secondary tracking-wider">
                Vermillion Axis Technologies
              </span>
            </div>

            {/* Nav links */}
            <nav aria-label="Footer navigation" className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-text-caption hover:text-text-secondary transition-colors duration-300 tracking-wider uppercase font-heading"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Back to top */}
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="Back to top"
              className="group flex items-center gap-2 text-xs text-text-caption hover:text-text-secondary transition-colors duration-300"
            >
              <span className="tracking-wider uppercase font-heading hidden sm:inline">Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Bottom row: location + copyright */}
          <div className="flex items-center justify-center sm:justify-end gap-4 text-xs text-text-caption">
            <span>Las Vegas, NV</span>
            <span className="w-px h-3 bg-border/50" aria-hidden="true" />
            <span>&copy; 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
