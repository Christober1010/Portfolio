"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";

let lenis: Lenis | null = null;

/** Scroll to an in-page target, smoothly when Lenis is running. Both honour scroll-padding-top. */
export function scrollToTarget(target: HTMLElement, immediate = false) {
  if (!lenis) {
    target.scrollIntoView();
    return;
  }
  // Measure against the live scroll position: Lenis's own can lag a native scroll it hasn't seen yet.
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - padding, { immediate });
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Same-page anchors (#work, /#work on the home page) glide instead of jumping.
    // Capture phase so this runs before Next's <Link> handler.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element).closest("a");
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      scrollToTarget(target);
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    // A hard load of /#section: ScrollTrigger's first refresh resets the scroll the browser
    // would have done, so land on the target once everything has measured.
    const hashTarget = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    const frame = hashTarget ? requestAnimationFrame(() => scrollToTarget(hashTarget, true)) : 0;

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick, true);
      gsap.ticker.remove(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    // Next resets native scroll on navigation; keep Lenis's internal position in step.
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.resize();
  }, [pathname]);

  return null;
}
