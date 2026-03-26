"use client";

import { useState, useEffect } from "react";

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(180,43,43,0.03), transparent 40%), radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(180,43,43,0.02), transparent 30%)`,
        transition: "background 0.15s ease",
      }}
    />
  );
}
