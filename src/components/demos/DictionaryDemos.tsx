"use client";

import { useDemo } from "@/components/demos/useDemo";

const segments = [
  { id: "ST", raw: "*850*0001~", def: "Transaction Set Header — opens the purchase order" },
  { id: "BEG", raw: "*00*SA*PO-4471**20250312~", def: "Beginning Segment for Purchase Order" },
  { id: "N1", raw: "*ST*Acme Distribution~", def: "Party Identification — here, the ship-to" },
  { id: "PO1", raw: "*1*24*EA*9.50**VP*SKU-208~", def: "Baseline Item Data — quantity, unit, price" },
  { id: "CTT", raw: "*1~", def: "Transaction Totals — number of line items" },
  { id: "SE", raw: "*6*0001~", def: "Transaction Set Trailer — segment count closes the set" },
];

/** A raw X12 850 read line by line, each segment explained as it is reached. */
export function DictionarySegments() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const lines = q(".seg");
    const defs = q(".seg-def");
    tl.set(defs, { autoAlpha: 0 });
    lines.forEach((line, index) => {
      const at = index * 1.1;
      tl.to(line, { backgroundColor: "rgba(224,177,90,0.1)", duration: 0.25 }, at)
        .to(line.querySelector("b"), { color: "#e0b15a", duration: 0.25 }, at)
        .fromTo(defs[index], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at)
        .to(line, { backgroundColor: "rgba(224,177,90,0)", duration: 0.25 }, at + 0.9)
        .to(line.querySelector("b"), { color: "#f3efe6", duration: 0.25 }, at + 0.9)
        .to(defs[index], { autoAlpha: 0, y: -8, duration: 0.25 }, at + 0.9);
    });
    return 3.5;
  }, { repeatDelay: 0.2 });

  return (
    <div ref={ref} className="demo-fill demo-pad demo-segments">
      <pre className="seg-raw">
        {segments.map((segment) => (
          <span key={segment.id} className="seg">
            <b>{segment.id}</b>
            {segment.raw}
          </span>
        ))}
      </pre>
      <div className="seg-defs">
        {segments.map((segment) => (
          <p key={segment.id} className="seg-def">
            <b>{segment.id}</b> {segment.def}
          </p>
        ))}
      </div>
    </div>
  );
}

const TOTAL = 1_800_000;
const tiles = Array.from({ length: 70 }, (_, index) => index);

/** Static generation filling out a 1.8 million page catalog. */
export function DictionaryBuild() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const [count] = q(".build-count");
    const state = { pages: 0 };
    tl.set(q(".build-done"), { autoAlpha: 0 })
      .fromTo(
        state,
        { pages: 0 },
        {
          pages: TOTAL,
          duration: 3.2,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = Math.round(state.pages).toLocaleString("en-US");
          },
        },
        0,
      )
      .fromTo(q(".build-bar i"), { scaleX: 0 }, { scaleX: 1, duration: 3.2, ease: "power1.inOut" }, 0)
      .fromTo(
        q(".build-tile"),
        { backgroundColor: "rgba(243,239,230,0.08)" },
        { backgroundColor: "rgba(243,239,230,0.55)", duration: 0.2, stagger: 3 / tiles.length },
        0,
      )
      .to(q(".build-done"), { autoAlpha: 1, duration: 0.3 })
      .to({}, { duration: 1.6 });
    return tl.duration() - 0.5;
  });

  return (
    <div ref={ref} className="demo-fill demo-pad demo-build">
      <p className="build-label">Generating static pages</p>
      <p className="build-figure">
        <span className="build-count">{TOTAL.toLocaleString("en-US")}</span>
        <span className="build-total"> / 1,800,000</span>
      </p>
      <div className="build-bar" aria-hidden="true">
        <i />
      </div>
      <div className="build-grid" aria-hidden="true">
        {tiles.map((tile) => (
          <span key={tile} className="build-tile" />
        ))}
      </div>
      <p className="demo-status">
        <span className="build-done">✓ Catalog built · every page indexed</span>
      </p>
    </div>
  );
}

const graphNodes = [
  { id: "850", x: 160, y: 108, r: 20 },
  { id: "BEG", x: 72, y: 52, r: 15 },
  { id: "N1", x: 250, y: 50, r: 15 },
  { id: "PO1", x: 252, y: 168, r: 15 },
  { id: "CTT", x: 68, y: 168, r: 15 },
  { id: "BEG03", x: 32, y: 108, r: 18 },
  { id: "PO102", x: 294, y: 112, r: 18 },
];

const graphEdges: [string, string][] = [
  ["850", "BEG"],
  ["850", "N1"],
  ["850", "PO1"],
  ["850", "CTT"],
  ["BEG", "BEG03"],
  ["PO1", "PO102"],
];

const crawl = ["850", "PO1", "PO102", "PO1", "850", "N1", "850", "BEG", "BEG03", "BEG", "850", "CTT"];

const nodeById = Object.fromEntries(graphNodes.map((node) => [node.id, node]));

/** A crawler following internal links until every page in the cluster is reached. */
export function DictionaryLinks() {
  const ref = useDemo<HTMLDivElement>((tl, q) => {
    const [reached] = q(".crawl-count");
    const seen = new Set<string>();
    tl.set(q(".gnode-ring"), { opacity: 0 })
      .set(q(".gedge"), { stroke: "rgba(243,239,230,0.18)" })
      .set(q(".crawler"), { x: nodeById["850"].x, y: nodeById["850"].y, opacity: 1 });

    crawl.forEach((id, index) => {
      const node = nodeById[id];
      const at = index * 0.42;
      if (index > 0) {
        const from = crawl[index - 1];
        tl.to(q(".crawler"), { x: node.x, y: node.y, duration: 0.34, ease: "power2.inOut" }, at - 0.34)
          .to(q(`.gedge-${[from, id].sort().join("-")}`), { stroke: "rgba(224,177,90,0.7)", duration: 0.2 }, at - 0.34);
      }
      if (!seen.has(id)) {
        seen.add(id);
        const label = `${seen.size} of ${graphNodes.length}`;
        tl.to(q(`.gnode-${id} .gnode-ring`), { opacity: 1, duration: 0.2 }, at).call(
          () => {
            reached.textContent = label;
          },
          undefined,
          at,
        );
      }
    });
    tl.to({}, { duration: 1.4 });
    return tl.duration() - 0.5;
  });

  return (
    <div ref={ref} className="demo-fill">
      <svg viewBox="0 0 320 220" className="demo-svg" aria-hidden="true">
        {graphEdges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            className={`gedge gedge-${[from, to].sort().join("-")}`}
            x1={nodeById[from].x}
            y1={nodeById[from].y}
            x2={nodeById[to].x}
            y2={nodeById[to].y}
            stroke="rgba(243,239,230,0.18)"
          />
        ))}
        {graphNodes.map((node) => (
          <g key={node.id} className={`gnode-${node.id}`} fontFamily="ui-monospace, monospace" fontSize="9">
            <circle cx={node.x} cy={node.y} r={node.r} fill="#141412" stroke="rgba(243,239,230,0.25)" />
            <circle className="gnode-ring" cx={node.x} cy={node.y} r={node.r} fill="rgba(224,177,90,0.1)" stroke="#e0b15a" />
            <text x={node.x} y={node.y + 3} textAnchor="middle" fill="#f3efe6">
              {node.id}
            </text>
          </g>
        ))}
        <circle className="crawler" r="4" fill="#e0b15a" opacity="0" />
      </svg>
      <p className="demo-status">
        <span>
          Pages reached · <span className="crawl-count">{`${graphNodes.length} of ${graphNodes.length}`}</span>
        </span>
      </p>
    </div>
  );
}
