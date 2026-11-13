"use client";

import { Chars } from "@/components/demos/text";
import { useDemo } from "@/components/demos/useDemo";

const BRASS = "#e0b15a";

const canvasNodes = [
  { id: "trigger", label: "Trigger", x: 16, y: 95 },
  { id: "map", label: "Map 850", x: 128, y: 45 },
  { id: "validate", label: "Validate", x: 128, y: 145 },
  { id: "ship", label: "Ship", x: 240, y: 95 },
];

const routeA = "M80 110 C104 110 104 60 128 60 L192 60 C216 60 216 110 240 110";
const routeB = "M80 110 C104 110 104 160 128 160 L192 160 C216 160 216 110 240 110";

/** Documents travel the graph; each node lights as the run reaches it. */
export function WorkflowRun() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const [a, b] = q(".route") as SVGPathElement[];
    const glow = (id: string) => q(`.node-${id} .glow`);
    const travel = { duration: 2.2, ease: "none" };

    tl.set(q(".glow, .packet"), { opacity: 0 })
      .to(glow("trigger"), { opacity: 1, duration: 0.25 }, 0)
      .set(q(".packet-a"), { opacity: 1 }, 0.2)
      .to(q(".packet-a"), { ...travel, motionPath: { path: a, align: a, alignOrigin: [0.5, 0.5] } }, 0.2)
      .set(q(".packet-b"), { opacity: 1 }, 0.55)
      .to(q(".packet-b"), { ...travel, motionPath: { path: b, align: b, alignOrigin: [0.5, 0.5] } }, 0.55)
      .to(glow("map"), { opacity: 1, duration: 0.25 }, 0.2 + 2.2 * 0.3)
      .to(glow("validate"), { opacity: 1, duration: 0.25 }, 0.55 + 2.2 * 0.3)
      .to(glow("ship"), { opacity: 1, duration: 0.25 }, 0.55 + 2.2)
      .to(q(".packet"), { opacity: 0, duration: 0.2 }, ">")
      .to(q(".status-run"), { autoAlpha: 0, duration: 0.2 }, "<")
      .from(q(".status-done"), { autoAlpha: 0, y: 6, duration: 0.3 }, "<0.1")
      .to({}, { duration: 1.4 });
    return 1.6;
  });

  return (
    <div ref={ref} className="demo-fill">
      <svg viewBox="0 0 320 220" className="demo-svg" aria-hidden="true">
        <g fill="none" stroke="rgba(243,239,230,0.3)" strokeWidth="1">
          <path className="route" d={routeA} />
          <path className="route" d={routeB} />
        </g>
        <g fontFamily="ui-monospace, monospace" fontSize="10">
          {canvasNodes.map((node) => (
            <g key={node.id} className={`node-${node.id}`}>
              <rect x={node.x} y={node.y} width="64" height="30" fill="#141412" stroke="rgba(243,239,230,0.25)" />
              <rect className="glow" x={node.x} y={node.y} width="64" height="30" fill="rgba(224,177,90,0.08)" stroke={BRASS} />
              <text x={node.x + 32} y={node.y + 19} textAnchor="middle" fill="#f3efe6">
                {node.label}
              </text>
            </g>
          ))}
        </g>
        <circle className="packet packet-a" r="4" fill={BRASS} />
        <circle className="packet packet-b" r="4" fill={BRASS} />
      </svg>
      <p className="demo-status">
        <span className="status-run">Running · documents in flight</span>
        <span className="status-done">Run complete · 4 of 4 nodes passed</span>
      </p>
    </div>
  );
}

const rules = [
  { seg: "BEG03", label: "PO number present" },
  { seg: "DTM02", label: "Date is CCYYMMDD" },
  { seg: "PO102", label: "Quantity is numeric", fail: "got “ten”" },
  { seg: "N1*ST", label: "Ship-to party present" },
  { seg: "SE01", label: "Segment count matches" },
];

/** Rule checks run before execution; one type mismatch blocks the run until it is fixed. */
export function WorkflowValidate() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const rows = q(".rule");
    tl.set(q(".mark-ok, .mark-bad, .rule-fail, .verdict span"), { autoAlpha: 0 });
    rows.forEach((row, index) => {
      const failing = rules[index].fail;
      tl.to(row, { backgroundColor: "rgba(243,239,230,0.06)", duration: 0.15 })
        .to(row.querySelector(".mark-wait"), { autoAlpha: 0, duration: 0.1 }, "+=0.25")
        .to(row.querySelector(failing ? ".mark-bad" : ".mark-ok"), { autoAlpha: 1, duration: 0.15 }, "<")
        .to(row, { backgroundColor: "rgba(243,239,230,0)", duration: 0.25 });
      if (failing) tl.to(row.querySelector(".rule-fail"), { autoAlpha: 1, duration: 0.2 }, "<");
    });
    const fixed = rows[2];
    tl.to(q(".verdict-blocked"), { autoAlpha: 1, duration: 0.25 })
      .to({}, { duration: 1 })
      .to(fixed.querySelector(".rule-fail"), { autoAlpha: 0, duration: 0.2 })
      .to(fixed.querySelector(".mark-bad"), { autoAlpha: 0, duration: 0.15 }, "<")
      .to(fixed.querySelector(".mark-ok"), { autoAlpha: 1, duration: 0.15 }, ">")
      .to(q(".verdict-blocked"), { autoAlpha: 0, duration: 0.2 }, "<")
      .to(q(".verdict-ready"), { autoAlpha: 1, duration: 0.25 }, ">")
      .to({}, { duration: 1.4 });
    return tl.duration() - 1.2;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad">
      <ul className="demo-rules">
        {rules.map((rule) => (
          <li key={rule.seg} className="rule">
            <code>{rule.seg}</code>
            <span>
              {rule.label}
              {rule.fail ? <em className="rule-fail"> {rule.fail}</em> : null}
            </span>
            <span className="rule-mark" aria-hidden="true">
              <i className="mark-wait">·</i>
              <i className="mark-ok">✓</i>
              <i className="mark-bad">✕</i>
            </span>
          </li>
        ))}
      </ul>
      <p className="demo-status verdict">
        <span className="verdict-blocked">1 issue · run blocked</span>
        <span className="verdict-ready">All checks passed · ready to run</span>
      </p>
    </div>
  );
}

/*
 * Plain language to mapping, drawn after the AI Mapper's own screen. A prompt goes to the ZenAI
 * assistant, it reads both schemas, and its rules land on the canvas as connections: each one eases
 * onto a level stretch through the middle of the gap, carries its transform on a pill there, and
 * arrives at the target with an arrowhead, marking both rows it joins.
 */
const MAP_PROMPT = "Map this 850 into our ERP order";

const COL_W = 92;
const TARGET_X = 228;
/** Lines stop short so the arrowhead's tip lands on the target row's edge. */
const LINE_END = TARGET_X - 6;

const sourceFields = [
  { code: "BEG03", hint: "PO no.", y: 30 },
  { code: "DTM02", hint: "date", y: 56 },
  { code: "PO102", hint: "qty", y: 82 },
  { code: "PO104", hint: "price", y: 108 },
  { code: "N104", hint: "ship-to", y: 134 },
];

const targetFields = [
  { name: "orderNo", y: 34 },
  { name: "orderDate", y: 68 },
  { name: "quantity", y: 102 },
  { name: "shipTo", y: 136 },
];

/** What the assistant sends back, one rule per line. PO104 has nowhere to go, so it stays unmapped. */
const aiRules = [
  { from: 0, to: 0, transform: "COPY" },
  { from: 1, to: 1, transform: "JSONATA" },
  { from: 2, to: 2, transform: "COPY" },
  { from: 4, to: 3, transform: "LOOKUP" },
];

/** Leaves the source, eases onto a level stretch through the middle of the gap, then eases into the target. */
function flatLine(sy: number, ty: number) {
  const lane = (sy + ty) / 2;
  const xa = COL_W + (LINE_END - COL_W) * 0.3;
  const xb = COL_W + (LINE_END - COL_W) * 0.7;
  const c1 = Math.round((COL_W + (xa - COL_W) * 0.65) * 10) / 10;
  const c2 = Math.round((xb + (LINE_END - xb) * 0.35) * 10) / 10;
  return {
    d: `M${COL_W} ${sy} C${c1} ${sy} ${c1} ${lane} ${xa} ${lane} L${xb} ${lane} C${c2} ${lane} ${c2} ${ty} ${LINE_END} ${ty}`,
    labelX: (xa + xb) / 2,
    lane,
  };
}

const connections = aiRules.map((rule) => {
  const sy = sourceFields[rule.from].y;
  const ty = targetFields[rule.to].y;
  return { ...rule, sy, ty, ...flatLine(sy, ty), pillWidth: rule.transform.length * 5 + 10 };
});

const mappedSources = new Set(aiRules.map((rule) => rule.from));

/** A plain-language prompt in; the assistant's rules drawn onto the mapping canvas as connections. */
export function WorkflowPrompt() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const chars = q(".wfp-typed .ch");
    const lines = q(".wfp-line") as SVGPathElement[];
    const lengths = lines.map((line) => line.getTotalLength() + 1);
    const [send] = q(".wfp-send");
    const idle = {
      opacity: 0.45,
      backgroundColor: "rgba(224,177,90,0)",
      borderColor: "rgba(243,239,230,0.2)",
      color: "#a39c8f",
    };

    const typeAt = 0.4;
    const perChar = 0.05;
    const sendAt = typeAt + chars.length * perChar + 0.3;
    const replyAt = sendAt + 1.5;
    const stagger = 0.38;
    const toastAt = replyAt + 0.1 + (connections.length - 1) * stagger + 0.9;
    const clearAt = toastAt + 2.4;

    // The empty canvas, which is also where every loop starts.
    tl.set(chars, { display: "none" }, 0)
      .set(q(".wfp-placeholder, .wfp-typed, .wfp-caret, .wfp-arrow, .wfp-links"), { autoAlpha: 1 }, 0)
      .set(q(".wfp-spin, .wfp-scan, .wfp-pop, .wfp-on, .wfp-toast"), { autoAlpha: 0 }, 0)
      .set(send, idle, 0)
      .set(lines, { strokeDasharray: (i: number) => lengths[i], strokeDashoffset: (i: number) => lengths[i] }, 0);

    // Typing the prompt wakes the send button.
    tl.to(q(".wfp-placeholder"), { autoAlpha: 0, duration: 0.05 }, typeAt).to(
      send,
      { opacity: 1, backgroundColor: BRASS, borderColor: BRASS, color: "#1a1408", duration: 0.2 },
      typeAt,
    );
    chars.forEach((char, index) => tl.set(char, { display: "inline" }, typeAt + index * perChar));

    // Send: the button spins while the assistant reads both schemas.
    tl.to(send, { scale: 0.85, duration: 0.08, ease: "power2.in" }, sendAt)
      .to(send, { scale: 1, duration: 0.3, ease: "back.out(3)" }, sendAt + 0.08)
      .to(q(".wfp-caret, .wfp-arrow"), { autoAlpha: 0, duration: 0.1 }, sendAt)
      .to(q(".wfp-typed"), { opacity: 0.5, duration: 0.3 }, sendAt + 0.1)
      .to(q(".wfp-spin"), { autoAlpha: 1, duration: 0.1 }, sendAt + 0.05)
      .fromTo(q(".wfp-spin"), { rotation: 0 }, { rotation: 630, duration: replyAt - sendAt, ease: "none" }, sendAt)
      .to(q(".wfp-scan"), { autoAlpha: 1, duration: 0.2 }, sendAt + 0.15)
      .fromTo(q(".wfp-scan"), { y: 0 }, { y: 118, duration: 1.15, ease: "sine.inOut" }, sendAt + 0.15)
      .to(q(".wfp-scan"), { autoAlpha: 0, duration: 0.2 }, replyAt - 0.2)
      .to(q(".wfp-spin"), { autoAlpha: 0, duration: 0.1 }, replyAt)
      .to(q(".wfp-arrow"), { autoAlpha: 1, duration: 0.1 }, replyAt)
      .to(send, { ...idle, duration: 0.25 }, replyAt);

    // The rules land one connection at a time.
    q(".wfp-link").forEach((link, index) => {
      const at = replyAt + 0.1 + index * stagger;
      const { from, to } = aiRules[index];
      const pop = { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%", ease: "back.out(2.6)" };
      tl.fromTo(link.querySelector(".wfp-dot-from"), { autoAlpha: 0, scale: 0.3 }, { ...pop, duration: 0.25 }, at)
        .to(lines[index], { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, at)
        .fromTo(link.querySelector(".wfp-pill"), { autoAlpha: 0, scale: 0.6 }, { ...pop, duration: 0.3 }, at + 0.3)
        .to(link.querySelectorAll(".wfp-arrowhead, .wfp-dot-to"), { autoAlpha: 1, duration: 0.15 }, at + 0.55)
        .to(q(`.wfp-on-s${from}, .wfp-on-t${to}`), { autoAlpha: 1, duration: 0.3 }, at + 0.55);
    });

    tl.fromTo(q(".wfp-toast"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, toastAt);

    // Clear the canvas and the prompt for the next run.
    tl.to(q(".wfp-toast"), { autoAlpha: 0, duration: 0.3 }, clearAt)
      .to(q(".wfp-links, .wfp-on"), { autoAlpha: 0, duration: 0.45 }, clearAt)
      .to(q(".wfp-typed"), { autoAlpha: 0, duration: 0.3 }, clearAt)
      .set(chars, { display: "none" }, clearAt + 0.35)
      .set(q(".wfp-typed, .wfp-caret"), { autoAlpha: 1 }, clearAt + 0.4)
      .to(q(".wfp-placeholder"), { autoAlpha: 1, duration: 0.2 }, clearAt + 0.4);

    return toastAt + 0.6;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad" aria-hidden="true">
      <svg viewBox="0 0 320 180" className="demo-svg wfp-canvas">
        <defs>
          <linearGradient id="wfp-scan-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BRASS} stopOpacity="0" />
            <stop offset="0.5" stopColor={BRASS} stopOpacity="0.16" />
            <stop offset="1" stopColor={BRASS} stopOpacity="0" />
          </linearGradient>
        </defs>

        <text x="0" y="9" className="wfp-head">
          SOURCE · X12 850
        </text>
        <text x="320" y="9" textAnchor="end" className="wfp-head">
          TARGET · ERP
        </text>

        {sourceFields.map((field, index) => (
          <g key={field.code}>
            <rect x="0.5" y={field.y - 9} width={COL_W - 1} height="18" rx="3" className="wfp-row" />
            {mappedSources.has(index) ? (
              <rect
                x="0.5"
                y={field.y - 9}
                width={COL_W - 1}
                height="18"
                rx="3"
                className={`wfp-row-on wfp-on wfp-on-s${index}`}
              />
            ) : null}
            <text x="7" y={field.y + 3.2} className="wfp-code">
              {field.code}
            </text>
            <text x={COL_W - 7} y={field.y + 3} textAnchor="end" className="wfp-hint">
              {field.hint}
            </text>
          </g>
        ))}

        {targetFields.map((field, index) => (
          <g key={field.name}>
            <rect x={TARGET_X + 0.5} y={field.y - 9} width={COL_W - 1} height="18" rx="3" className="wfp-row" />
            <g className={`wfp-on wfp-on-t${index}`}>
              <rect x={TARGET_X + 0.5} y={field.y - 9} width={COL_W - 1} height="18" rx="3" className="wfp-row-on" />
              <rect x={TARGET_X + 0.5} y={field.y - 6} width="2.5" height="12" rx="1.25" fill={BRASS} />
            </g>
            <text x={TARGET_X + 9} y={field.y + 3.2} className="wfp-code">
              {field.name}
            </text>
          </g>
        ))}

        <g className="wfp-scan">
          <rect x="0" y="14" width="320" height="28" fill="url(#wfp-scan-fill)" />
          <rect x="0" y="27.75" width="320" height="0.5" fill={BRASS} opacity="0.45" />
        </g>

        <g className="wfp-links">
          {connections.map((link) => (
            <g key={`${link.from}-${link.to}`} className="wfp-link">
              <path className="wfp-line" d={link.d} />
              <circle className="wfp-pop wfp-dot-from" cx={COL_W} cy={link.sy} r="2.3" />
              <path
                className="wfp-pop wfp-arrowhead"
                d={`M${LINE_END} ${link.ty - 3.2} L${TARGET_X} ${link.ty} L${LINE_END} ${link.ty + 3.2} Z`}
              />
              <circle className="wfp-pop wfp-dot-to" cx={TARGET_X} cy={link.ty} r="2.3" />
              <g className="wfp-pop wfp-pill">
                <rect
                  x={link.labelX - link.pillWidth / 2}
                  y={link.lane - 6}
                  width={link.pillWidth}
                  height="12"
                  rx="6"
                />
                <text x={link.labelX} y={link.lane + 2.6} textAnchor="middle">
                  {link.transform}
                </text>
              </g>
            </g>
          ))}
        </g>

        <g className="wfp-toast">
          <rect x="170.5" y="151.5" width="149" height="27" rx="5" className="wfp-toast-box" />
          <circle cx="182" cy="165" r="5" fill={BRASS} />
          <path d="M179.6 165.1 l1.7 1.7 3.2 -3.4" className="wfp-toast-tick" />
          <text x="192" y="162.4" className="wfp-toast-title">
            Rules generated
          </text>
          <text x="192" y="172.6" className="wfp-toast-sub">
            {`${connections.length} connections · saved as a version`}
          </text>
        </g>
      </svg>

      <div className="wfp-dock">
        <div className="wfp-field">
          <p className="wfp-label">
            <i>✦</i> ZenAI Assistant
          </p>
          <p className="wfp-input">
            <span className="wfp-placeholder">Enter your prompt…</span>
            <span className="wfp-typed">
              <Chars text={MAP_PROMPT} />
              <span className="caret wfp-caret" />
            </span>
          </p>
        </div>
        <span className="wfp-send">
          <svg className="wfp-arrow" viewBox="0 0 16 16">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
          </svg>
          <svg className="wfp-spin" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="5.5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
