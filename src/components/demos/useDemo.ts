"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

type Build = (tl: gsap.core.Timeline, q: (selector: string) => Element[]) => number | void;

/**
 * A looping demo timeline that only plays while its card is on screen.
 * `build` fills the timeline and may return the time of a representative still,
 * which is what reduced-motion visitors see.
 */
export function useDemo<T extends HTMLElement>(build: Build, { repeatDelay = 0.8 } = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay, defaults: { ease: "power2.out" } });
      const still = build(tl, gsap.utils.selector(root));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        tl.seek(still ?? tl.duration());
        return;
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    },
    { scope: ref },
  );

  return ref;
}
