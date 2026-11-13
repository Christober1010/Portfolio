"use client";

import { useEffect, useRef } from "react";

/*
 * Custom cursor for fine pointers: a brass dot that tracks the pointer and a ring that
 * eases after it. The ring reacts to what is under it:
 *   [data-cursor="view"]  grows into a brass disc labelled "View" (project cards)
 *   links and buttons     grows slightly with a brass edge
 *   text fields           collapses into an I-beam
 * The same pointer listener feeds --mx/--my to every .glass surface for its hover glow.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!fine || reduce || !dotEl || !ringEl) return;

    document.documentElement.dataset.cursor = "on";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;
    let glassFrame = 0;

    const paintGlass = (event: PointerEvent) => {
      const glass = (event.target as Element).closest<HTMLElement>(".glass");
      if (glass) {
        const rect = glass.getBoundingClientRect();
        glass.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        glass.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      dotEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const target = event.target as Element;
      const mode = target.closest("[data-cursor='view']")
        ? "view"
        : target.closest("input, textarea")
          ? "text"
          : target.closest("a, button, [role='button']")
            ? "link"
            : "";
      if (ringEl.dataset.mode !== mode) ringEl.dataset.mode = mode;

      cancelAnimationFrame(glassFrame);
      glassFrame = requestAnimationFrame(() => paintGlass(event));
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
    };
    const onEnter = () => {
      dotEl.style.opacity = "";
      ringEl.style.opacity = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(glassFrame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span>View</span>
      </div>
    </>
  );
}
