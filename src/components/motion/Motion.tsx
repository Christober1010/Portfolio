"use client";

import { usePathname } from "next/navigation";
import { EASE, gsap, ScrollTrigger, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * One place for the site's motion. Markup opts in with data attributes so pages and
 * sections can stay server components:
 *
 *   data-intro="chars|lines|rule|fade"  plays once on load, in document order
 *   data-split                          line-by-line mask reveal on scroll
 *   data-anim                           fade up on scroll (batched, staggered)
 *   data-rule                           draws a divider via --draw (see globals.css)
 *   data-count                          counts the number in the text up from zero
 *   data-parallax="0.2"                 drifts up by that share of its height while scrolling
 *   data-magnetic                       pulls slightly toward the pointer
 *   data-progress                       scaleX bound to page scroll
 *   .visual [data-draw|data-pop]        SVG strokes draw and shapes pop when the visual enters;
 *                                       data-draw="0.98" stops the stroke at that share;
 *                                       data-pop="random" scatters, data-pop="after" waits for strokes
 *
 * The `motion` class on <html> (set before paint in layout.tsx) hides opted-in elements
 * until GSAP reveals them; without it, everything renders in its final state.
 */

const SPLIT = { linesClass: "split-line", charsClass: "split-char", aria: "auto" } as const;

function parseCount(text: string) {
  const match = text.match(/^(\D*)([\d.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  const decimals = number.includes(".") ? number.split(".")[1].length : 0;
  return { prefix, value: parseFloat(number), suffix, decimals };
}

function countUp(el: HTMLElement | SVGElement, vars: gsap.TweenVars = {}) {
  // Keep the real value on the node: a re-run (route change, Strict Mode) must not read "0".
  el.dataset.countTo ??= el.textContent ?? "";
  const parsed = parseCount(el.dataset.countTo);
  if (!parsed) return null;
  const state = { value: 0 };
  const render = () => {
    el.textContent = `${parsed.prefix}${state.value.toFixed(parsed.decimals)}${parsed.suffix}`;
  };
  render();
  return gsap.to(state, {
    value: parsed.value,
    duration: 1.6,
    ease: "power3.out",
    onStart: render,
    onUpdate: render,
    ...vars,
  });
}

function intro(scope: HTMLElement) {
  const items = gsap.utils.toArray<HTMLElement>("[data-intro]", scope);
  if (!items.length) return;

  const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });
  items.forEach((el, index) => {
    // Absolute start times: a relative "<" would chain off the split cleanup calls below.
    const at = index * 0.09;
    const kind = el.dataset.intro;
    gsap.set(el, { autoAlpha: 1 });

    if (kind === "chars" || kind === "lines") {
      const split = SplitText.create(el, { ...SPLIT, type: kind === "chars" ? "chars" : "lines", mask: kind });
      const targets = kind === "chars" ? split.chars : split.lines;
      const reveal = gsap.from(targets, { yPercent: 110, duration: 1.3, stagger: kind === "chars" ? 0.035 : 0.09 });
      tl.add(reveal, at);
      // Hand the text back to the browser once it has landed (selection, kerning, resize).
      tl.call(() => split.revert(), undefined, at + reveal.totalDuration());
    } else if (kind === "rule") {
      tl.from(el, { scaleX: 0, transformOrigin: "0% 50%", duration: 1.1 }, at);
    } else {
      tl.from(el, { autoAlpha: 0, y: 18, duration: 1 }, at);
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const tween = countUp(node, { paused: true });
        if (tween) tl.add(tween.play(), at + 0.1);
      });
    }
  });
}

function splits(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-split]", scope).forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    SplitText.create(el, {
      ...SPLIT,
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
    });
  });
}

function fades(scope: HTMLElement) {
  const items = gsap.utils.toArray<HTMLElement>("[data-anim]", scope);
  gsap.set(items, { autoAlpha: 0, y: 28 });
  ScrollTrigger.batch(items, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.09, overwrite: "auto" }),
  });
}

function rules(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-rule]", scope).forEach((el) => {
    gsap.fromTo(
      el,
      { "--draw": 0 },
      {
        "--draw": 1,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      },
    );
  });
}

function counts(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-count]", scope).forEach((el) => {
    if (el.closest("[data-intro], .visual")) return;
    countUp(el, { scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
}

function visuals(scope: HTMLElement) {
  // The frame stays put (it is the shared element in the card → case study morph);
  // only the drawing inside animates.
  gsap.utils.toArray<SVGSVGElement>(".visual", scope).forEach((svg) => {
    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: svg, start: "top 85%", once: true },
    });

    svg.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((path) => {
      const length = path.getTotalLength();
      const share = parseFloat(path.dataset.draw || "1") || 1;
      gsap.set(path, { autoAlpha: 1, strokeDasharray: length, strokeDashoffset: length });
      tl.to(path, { strokeDashoffset: length * (1 - share), duration: 1.6, ease: "power3.inOut" }, 0.1);
    });

    const pops = svg.querySelectorAll<SVGElement>("[data-pop]");
    if (pops.length) {
      const random = svg.querySelector("[data-pop='random']") !== null;
      const after = svg.querySelector("[data-pop='after']") !== null;
      tl.fromTo(
        pops,
        { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          stagger: random ? { each: 0.012, from: "random" } : 0.12,
        },
        after ? 1.35 : 0.2,
      );
    }

    svg.querySelectorAll<SVGElement>("[data-count]").forEach((node) => {
      // Same curve and length as the strokes, so a number tracks the ring it labels.
      const tween = countUp(node, { paused: true, ease: "power3.inOut" });
      if (tween) tl.add(tween.play(), 0.1);
    });
  });
}

function parallax(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-parallax]", scope).forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || "0.2");
    gsap.to(el, {
      yPercent: -100 * amount,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
  });
}

function progress() {
  gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((bar) => {
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "0% 50%",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      },
    );
  });
}

function magnetic() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const cleanups = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x((event.clientX - rect.left - rect.width / 2) * 0.28);
      y((event.clientY - rect.top - rect.height / 2) * 0.28);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}

export function Motion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const main = document.getElementById("content");
      if (!main) return;

      intro(main);
      splits(main);
      fades(main);
      rules(main);
      counts(main);
      visuals(main);
      parallax(main);
      progress();
      const unbindMagnetic = magnetic();
      ScrollTrigger.refresh();
      return unbindMagnetic;
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
