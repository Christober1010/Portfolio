"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    node.dataset.on = "true";
    let targetX = window.innerWidth * 0.72;
    let targetY = 180;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;
    let running = true;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      if (!running) return;
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      node.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
        return;
      }
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}
