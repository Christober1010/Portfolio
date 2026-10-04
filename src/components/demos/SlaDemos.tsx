"use client";

import { useDemo } from "@/components/demos/useDemo";

const feed = [
  { doc: "850", name: "Purchase order", partner: "Partner A", late: false },
  { doc: "856", name: "Ship notice", partner: "Partner B", late: false },
  { doc: "810", name: "Invoice", partner: "Partner C", late: true },
  { doc: "855", name: "PO acknowledgment", partner: "Partner D", late: false },
  { doc: "997", name: "Functional ack", partner: "Partner A", late: false },
  { doc: "856", name: "Ship notice", partner: "Partner E", late: false },
];

/** Transactions arriving over a socket, newest on top. */
export function SlaFeed() {
  const ref = useDemo<HTMLDivElement>(
    (tl, q) => {
      // The list is rendered twice; stepping down by one row at a time and snapping back is seamless.
      const step = 100 / (feed.length * 2);
      tl.set(q(".feed-list"), { yPercent: -50 });
      feed.forEach(() => {
        tl.to(q(".feed-list"), { yPercent: `+=${step}`, duration: 0.45, ease: "power3.out" }, "+=0.75");
      });
      return 2;
    },
    { repeatDelay: 0 },
  );

  return (
    <div ref={ref} className="demo-fill demo-feed">
      <p className="feed-head">
        <span className="live-dot" aria-hidden="true" /> Live · WebSocket
      </p>
      <div className="feed-window">
        <ul className="feed-list">
          {[...feed, ...feed].map((row, index) => (
            <li key={index}>
              <code>{row.doc}</code>
              <span>{row.name}</span>
              <span className="feed-partner">{row.partner}</span>
              <span className={row.late ? "feed-late" : "feed-ok"}>{row.late ? "late" : "on time"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// One period of a quiet signal with a single spike, drawn twice so it can scroll forever.
const W = 320;
const NOW = 276;
const SPIKE = 200;

function signal(x: number) {
  const base = 136 + 7 * Math.sin(x / 21) + 4 * Math.sin(x / 6.7);
  const bump = Math.max(0, 1 - Math.abs(x - SPIKE) / 18);
  return base - 72 * bump * bump;
}

const chartPath = Array.from({ length: (W * 2) / 4 + 1 }, (_, index) => {
  const x = index * 4;
  return `${index === 0 ? "M" : "L"}${x} ${signal(x % W).toFixed(1)}`;
}).join(" ");

/** A live delay series; the spike is flagged the moment it crosses the threshold. */
export function SlaAnomaly() {
  const ref = useDemo<HTMLDivElement>(
    (tl, q) => {
      const duration = 6;
      // The second copy of the spike sits at SPIKE + W and reaches "now" when the series has moved this far.
      const flaggedAt = ((SPIKE + W - NOW) / W) * duration;
      tl.fromTo(q(".series"), { x: 0 }, { x: -W, duration, ease: "none" }, 0)
        .fromTo(q(".alert"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.25 }, flaggedAt)
        .to(q(".alert"), { autoAlpha: 0, duration: 0.3 }, duration - 0.3);
      return flaggedAt + 0.4;
    },
    { repeatDelay: 0 },
  );

  return (
    <div ref={ref} className="demo-fill">
      <svg viewBox="0 0 320 220" className="demo-svg" aria-hidden="true">
        <defs>
          <clipPath id="sla-history">
            <rect x="0" y="0" width={NOW} height="220" />
          </clipPath>
        </defs>
        <line x1="0" x2="320" y1="84" y2="84" stroke="#e0b15a" strokeOpacity="0.55" strokeDasharray="4 4" />
        {/* Legend sits above the plot so the spike never runs through it. */}
        <line x1="12" x2="28" y1="22" y2="22" stroke="#e0b15a" strokeOpacity="0.55" strokeDasharray="4 4" />
        <text x="34" y="25" fill="#e0b15a" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1">
          SLA THRESHOLD
        </text>
        <g clipPath="url(#sla-history)">
          <g className="series">
            <path d={chartPath} fill="none" stroke="#f3efe6" strokeWidth="1.5" />
            <circle cx={SPIKE} cy={signal(SPIKE)} r="4" fill="#e0b15a" />
            <circle cx={SPIKE + W} cy={signal(SPIKE)} r="4" fill="#e0b15a" />
          </g>
        </g>
        <line x1={NOW} x2={NOW} y1="40" y2="196" stroke="rgba(243,239,230,0.25)" />
        <text x={NOW} y="210" textAnchor="middle" fill="#aaa396" fontFamily="ui-monospace, monospace" fontSize="9">
          now
        </text>
      </svg>
      <p className="alert">Anomaly · 856 delays spiking</p>
    </div>
  );
}

const lanes = [
  { doc: "850", values: [97, 98, 97] },
  { doc: "855", values: [99, 98, 99] },
  { doc: "856", values: [96, 88, 96] },
  { doc: "810", values: [98, 97, 98] },
];
const TARGET = 95;

/** Adherence per document type against the SLA target; one lane slips and recovers. */
export function SlaAdherence() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const fills = q(".lane-fill");
    const values = q(".lane-value");
    const states = [0, 1, 2];
    tl.set(fills, { width: "0%" });
    states.forEach((state, stateIndex) => {
      const at = stateIndex * 1.8;
      lanes.forEach((lane, index) => {
        const value = lane.values[state];
        const below = value < TARGET;
        const counter = { v: stateIndex === 0 ? 0 : lane.values[state - 1] };
        tl.to(
          fills[index],
          {
            width: `${value}%`,
            backgroundColor: below ? "#e0b15a" : "rgba(243,239,230,0.6)",
            duration: 0.9,
            ease: "power3.inOut",
          },
          at,
        ).to(
          counter,
          {
            v: value,
            duration: 0.9,
            ease: "power3.inOut",
            onUpdate: () => {
              values[index].textContent = `${Math.round(counter.v)}%`;
            },
          },
          at,
        );
      });
    });
    tl.fromTo(q(".lane-alert"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 1.8 + 0.5)
      .to(q(".lane-alert"), { autoAlpha: 0, duration: 0.25 }, 3.6 + 0.3)
      .to({}, { duration: 1.2 });
    return 2.9;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad demo-lanes">
      <p className="lanes-head">
        Adherence by document <span>target {TARGET}%</span>
      </p>
      <ul>
        {lanes.map((lane) => (
          <li key={lane.doc} className="lane">
            <code>{lane.doc}</code>
            <div className="lane-track">
              <i className="lane-fill" style={{ width: `${lane.values[0]}%` }} />
              <span className="lane-target" style={{ left: `${TARGET}%` }} aria-hidden="true" />
            </div>
            <span className="lane-value">{lane.values[0]}%</span>
          </li>
        ))}
      </ul>
      <p className="demo-status">
        <span className="lane-alert">856 behind SLA · support notified</span>
      </p>
    </div>
  );
}
