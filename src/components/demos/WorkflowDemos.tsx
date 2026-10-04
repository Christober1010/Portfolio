"use client";

import { Chars, Tokens } from "@/components/demos/text";
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

const prompt = "Map PO quantity and ship-to from the 850 into our ERP order";
const reply = `source  X12 850
PO1.02  → order.lines[].quantity
N1*ST   → order.shipTo
check   types before run`;

/** A plain-language prompt in, a mapping streamed back token by token. */
export function WorkflowPrompt() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    tl.set(q(".ch, .tok"), { opacity: 0 })
      .set(q(".thinking"), { autoAlpha: 0 })
      .to(q(".ch"), { opacity: 1, duration: 0.01, stagger: 0.032 }, 0.2)
      .to(q(".send"), { backgroundColor: "#e0b15a", color: "#1a1408", duration: 0.15 }, "+=0.2")
      .to(q(".send"), { backgroundColor: "rgba(0,0,0,0)", color: "#aaa396", duration: 0.3 }, "+=0.15")
      .to(q(".thinking"), { autoAlpha: 1, duration: 0.2 }, "<")
      .to(q(".thinking"), { autoAlpha: 0, duration: 0.2 }, "+=0.6")
      .to(q(".tok"), { opacity: 1, duration: 0.01, stagger: 0.07 }, ">")
      .to({}, { duration: 2 });
    return tl.duration() - 0.5;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad demo-chat">
      <div className="chat-prompt">
        <p>
          <Chars text={prompt} />
          <span className="caret" aria-hidden="true" />
        </p>
        <span className="send">Send</span>
      </div>
      <p className="thinking">Drafting mapping…</p>
      <pre className="chat-reply">
        <Tokens text={reply} />
      </pre>
    </div>
  );
}
