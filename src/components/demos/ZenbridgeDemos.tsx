"use client";

import { useDemo } from "@/components/demos/useDemo";

const events = [
  { kind: "view", target: "/product", area: "Product" },
  { kind: "click", target: "Book a demo", area: "Demo" },
  { kind: "section", target: "Integrations", area: "Integrations" },
  { kind: "view", target: "/pricing", area: "Pricing" },
  { kind: "section", target: "Integrations", area: "Integrations" },
  { kind: "click", target: "See pricing", area: "Pricing" },
  { kind: "section", target: "Integrations", area: "Integrations" },
];
const areas = ["Integrations", "Pricing", "Product", "Demo"];
const VISIBLE = 3;

/** Visitor events land in ECHO and roll up into areas of interest for marketing. */
export function ZenbridgeEcho() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const rows = q(".echo-event");
    const bars = Object.fromEntries(areas.map((area, index) => [area, q(".echo-fill")[index]]));
    const counts: Record<string, number> = {};
    const step = 100 / events.length;
    const top = Math.max(...areas.map((area) => events.filter((event) => event.area === area).length));

    tl.set(rows, { autoAlpha: 0 })
      .set(q(".echo-log ul"), { yPercent: 0 })
      .set(q(".echo-fill"), { width: "0%", backgroundColor: "rgba(243,239,230,0.55)" })
      .set(q(".echo-insight"), { autoAlpha: 0 });

    events.forEach((event, index) => {
      const at = 0.3 + index * 0.75;
      counts[event.area] = (counts[event.area] ?? 0) + 1;
      if (index >= VISIBLE) {
        tl.to(q(".echo-log ul"), { yPercent: -step * (index - VISIBLE + 1), duration: 0.35, ease: "power3.out" }, at);
      }
      tl.fromTo(rows[index], { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.3 }, at).to(
        bars[event.area],
        { width: `${(counts[event.area] / top) * 100}%`, duration: 0.5, ease: "power3.out" },
        at + 0.15,
      );
    });

    tl.to(bars.Integrations, { backgroundColor: "#e0b15a", duration: 0.3 }, "+=0.2")
      .to(q(".echo-insight"), { autoAlpha: 1, duration: 0.3 }, "<")
      .to({}, { duration: 2 });
    return tl.duration() - 0.5;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad demo-echo">
      <p className="echo-head">
        <span className="live-dot" aria-hidden="true" /> ECHO · events
      </p>
      <div className="echo-log">
        <ul>
          {events.map((event, index) => (
            <li key={index} className="echo-event">
              <code>{event.kind}</code>
              <span>{event.target}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="echo-label">Areas of interest</p>
      <ul className="echo-areas">
        {areas.map((area) => (
          <li key={area}>
            <span>{area}</span>
            <div className="lane-track">
              <i className="echo-fill" />
            </div>
          </li>
        ))}
      </ul>
      <p className="demo-status">
        <span className="echo-insight">Insight · Integrations leads this week</span>
      </p>
    </div>
  );
}

// [start, width] in % of the timeline, before and after tuning.
const requests = [
  { label: "Document", before: [0, 16], after: [0, 12] },
  { label: "Styles", before: [14, 22], after: [10, 8] },
  { label: "Fonts", before: [30, 28], after: [12, 10] },
  { label: "Hero image", before: [34, 50], after: [14, 22] },
  { label: "Scripts", before: [18, 72], after: [36, 14] },
];

/** The load waterfall before and after image, cache, and script tuning. */
export function ZenbridgeWaterfall() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const bars = q(".wf-bar");
    tl.set(q(".wf-after"), { autoAlpha: 0 })
      .set(q(".wf-before"), { autoAlpha: 1 })
      .set(q(".wf-lcp"), { left: "86%" });
    requests.forEach((request, index) => {
      tl.fromTo(
        bars[index],
        { left: `${request.before[0]}%`, width: "0%" },
        { width: `${request.before[1]}%`, duration: 0.6, ease: "power2.out" },
        index * 0.12,
      );
    });
    tl.to({}, { duration: 1 })
      .to(q(".wf-before"), { autoAlpha: 0, duration: 0.25 })
      .to(q(".wf-after"), { autoAlpha: 1, duration: 0.25 }, "<0.15");
    const at = tl.duration();
    requests.forEach((request, index) => {
      tl.to(
        bars[index],
        { left: `${request.after[0]}%`, width: `${request.after[1]}%`, duration: 0.9, ease: "power3.inOut" },
        at + index * 0.06,
      );
    });
    tl.to(q(".wf-lcp"), { left: "38%", duration: 0.9, ease: "power3.inOut" }, at).to({}, { duration: 1.8 });
    return tl.duration() - 0.5;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad demo-waterfall">
      <p className="wf-state">
        <span className="wf-before">Before tuning</span>
        <span className="wf-after">After tuning</span>
      </p>
      <div className="wf-rows">
        {requests.map((request) => (
          <div key={request.label} className="wf-row">
            <span>{request.label}</span>
            <div className="wf-track">
              <i className="wf-bar" style={{ left: `${request.after[0]}%`, width: `${request.after[1]}%` }} />
            </div>
          </div>
        ))}
        <div className="wf-overlay" aria-hidden="true">
          <div className="wf-lcp" style={{ left: "38%" }}>
            <span>LCP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const blocks = [
  { label: "Nav", h: 10 },
  { label: "Hero", h: 30 },
  { label: "Features", h: 24 },
  { label: "CTA", h: 14 },
  { label: "Footer", h: 10 },
];

/** A marketing page assembled from the shared component library. */
export function ZenbridgeComponents() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const chips = q(".lib-chip");
    const slots = q(".page-block");
    tl.set(q(".page-frame"), { borderColor: "rgba(243,239,230,0.22)" }).set(q(".lib-done"), { autoAlpha: 0 });
    blocks.forEach((_, index) => {
      const at = 0.2 + index * 0.45;
      tl.fromTo(chips[index], { borderColor: "rgba(243,239,230,0.14)" }, { borderColor: "#e0b15a", duration: 0.2 }, at)
        .fromTo(
          slots[index],
          { autoAlpha: 0, x: -14 },
          { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" },
          at + 0.1,
        )
        .to(chips[index], { borderColor: "rgba(243,239,230,0.14)", duration: 0.3 }, at + 0.4);
    });
    tl.to(q(".page-frame"), { borderColor: "#e0b15a", duration: 0.3 })
      .to(q(".lib-done"), { autoAlpha: 1, duration: 0.3 }, "<")
      .to({}, { duration: 1.6 });
    return tl.duration() - 0.5;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad demo-library">
      <ul className="lib-chips">
        {blocks.map((block) => (
          <li key={block.label} className="lib-chip">
            {block.label}
          </li>
        ))}
      </ul>
      <div className="page-frame">
        {blocks.map((block) => (
          <div key={block.label} className="page-block" style={{ height: `${block.h}%` }}>
            {block.label}
          </div>
        ))}
      </div>
      <p className="demo-status lib-status">
        <span className="lib-done">Page assembled · ready to publish</span>
      </p>
    </div>
  );
}
