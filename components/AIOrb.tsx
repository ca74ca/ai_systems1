"use client";

import { useEffect, useRef, useState } from "react";

export default function AIOrb() {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [blink, setBlink] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [hoverOffset, setHoverOffset] = useState({ x: 0, y: 0 });

  // --- Scroll reaction (client only) ---
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      // tiny "vibration" on scroll
      setScrollOffset(-2);

      // Reset after a moment
      window.setTimeout(() => setScrollOffset(0), 120);

      // Blink when scroll stops
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 200);
      }, 250);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // --- Hover tracking (mouse follows) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return;

    if (!isHovering) {
      setHoverOffset({ x: 0, y: 0 });
      return;
    }

    const rect = orbRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setHoverOffset({ x: x * 0.05, y: y * 0.05 });
  };

  const transform = `translate(${hoverOffset.x}px, ${hoverOffset.y + scrollOffset}px)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      // give it some hit area so mousemove actually fires
      className="relative w-24 h-24 flex items-center justify-center"
    >
      <div
        ref={orbRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHoverOffset({ x: 0, y: 0 });
        }}
        onFocus={() => setIsHovering(true)}
        onBlur={() => {
          setIsHovering(false);
          setHoverOffset({ x: 0, y: 0 });
        }}
        tabIndex={0}
        role="button"
        aria-label="AI assistant orb"
        // Dispatch a custom event on click so other components (BubbleAgent) can open the chat
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('ai-orb-click'));
          }
        }}
        style={{ transform }}
        className={[
          "w-10 h-10 rounded-full",
          "bg-gradient-to-r from-green-400 to-green-600",
          "shadow-[0_0_30px_10px_rgba(0,255,180,0.4)]",
          "transition-transform transition-shadow duration-200 ease-out",
          "animate-pulse animate-breathe",
          // clickable affordance
          "cursor-pointer",
          blink ? "scale-90 brightness-150" : "scale-100",
        ].join(" ")}
      />
    </div>
  );
}
