"use client";

import Image from "next/image";

interface DeviceMockupProps {
  label: string;
  image?: string;
}

export default function DeviceMockup({ label, image }: DeviceMockupProps) {
  return (
    <div className="group">
      <div className="relative rounded-hero overflow-hidden bg-surface-2 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:shadow-[0_12px_50px_rgba(0,0,0,0.5)] group-hover:border-border/80">
        {/* Top bezel */}
        <div className="h-6 bg-surface-3/60 flex items-center px-3 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-border/60" />
          <div className="w-2 h-2 rounded-full bg-border/60" />
          <div className="w-2 h-2 rounded-full bg-border/60" />
        </div>

        {/* Screen */}
        <div className="aspect-[16/10] bg-surface-1 relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={label}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            /* Placeholder */
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-1 to-surface-2">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-surface-3/50 border border-border/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-text-caption"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-text-caption">Screenshot</p>
              </div>
            </div>
          )}

          {/* Reflection / shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Caption */}
      <p className="mt-4 text-sm text-text-secondary text-center font-body tracking-wide">
        {label}
      </p>
    </div>
  );
}
