"use client";

import { useState, useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,23,68,0.10), transparent 40%), radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255,23,68,0.06), transparent 30%)`,
        willChange: "background",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    />
  );
}
