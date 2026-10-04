const edges = [
  "M112 120 C134 120 132 78 148 78",
  "M112 120 C134 120 132 162 148 162",
  "M252 78 C286 78 286 120 308 120",
  "M252 162 C286 162 286 120 308 120",
];

const nodes = [
  { label: "Trigger", x: 28, y: 96, width: 84 },
  { label: "Map 850", x: 148, y: 54, width: 104, hot: true },
  { label: "Validate", x: 148, y: 138, width: 104 },
  { label: "Ship", x: 308, y: 96, width: 84 },
];

export function WorkflowVisual() {
  return (
    <svg className="visual" viewBox="0 0 420 240" role="img" aria-label="Connected workflow nodes">
      <g stroke="rgba(243,239,230,0.35)" strokeWidth="1" fill="none">
        {edges.map((d) => (
          <path key={d} d={d} data-draw="" />
        ))}
      </g>
      <g fontFamily="ui-monospace, monospace" fontSize="11">
        {nodes.map((node) => (
          <g key={node.label} data-pop="">
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height="48"
              fill="#141412"
              stroke={node.hot ? "#e0b15a" : "rgba(243,239,230,0.28)"}
            />
            <text x={node.x + node.width / 2} y={node.y + 28} textAnchor="middle" fill="#f3efe6">
              {node.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function DictionaryVisual() {
  const cells = Array.from({ length: 96 }, (_, index) => index);
  return (
    <svg className="visual" viewBox="0 0 420 240" role="img" aria-label="A field of generated pages">
      {cells.map((cell) => {
        const col = cell % 16;
        const row = Math.floor(cell / 16);
        const hot = cell % 11 === 0 || cell % 17 === 0;
        return (
          <rect
            key={cell}
            x={28 + col * 23}
            y={28 + row * 30}
            width="14"
            height="18"
            fill={hot ? "rgba(224,177,90,0.85)" : "rgba(243,239,230,0.14)"}
            data-pop="random"
          />
        );
      })}
    </svg>
  );
}

const echoEvents = [
  "M156 84 C196 84 196 112 232 116",
  "M156 132 C196 132 196 120 232 120",
  "M156 176 C196 176 196 128 232 124",
];

const interests = [
  { label: "Product", width: 70, hot: true },
  { label: "Pricing", width: 48 },
  { label: "Contact", width: 30 },
];

export function EchoVisual() {
  return (
    <svg
      className="visual"
      viewBox="0 0 420 240"
      role="img"
      aria-label="Visitor activity on the site sent as events to ECHO, which ranks areas of interest"
    >
      <g fill="none" stroke="rgba(243,239,230,0.28)">
        <rect x="28" y="40" width="128" height="160" fill="#141412" />
        <path d="M28 56 H156" />
        <rect x="40" y="66" width="104" height="38" fill="rgba(243,239,230,0.06)" />
        <rect x="40" y="114" width="48" height="36" fill="rgba(243,239,230,0.06)" />
        <rect x="96" y="114" width="48" height="36" fill="rgba(243,239,230,0.06)" />
        <path d="M40 166 H144 M40 176 H120 M40 186 H132" stroke="rgba(243,239,230,0.14)" />
      </g>
      <g fill="#e0b15a">
        <g data-pop="">
          <circle cx="112" cy="86" r="4" />
          <circle cx="112" cy="86" r="10" fill="none" stroke="#e0b15a" strokeOpacity="0.5" />
        </g>
        <g data-pop="">
          <circle cx="66" cy="132" r="4" />
          <circle cx="66" cy="132" r="10" fill="none" stroke="#e0b15a" strokeOpacity="0.5" />
        </g>
        <g data-pop="">
          <circle cx="124" cy="176" r="4" />
          <circle cx="124" cy="176" r="10" fill="none" stroke="#e0b15a" strokeOpacity="0.5" />
        </g>
      </g>
      <g fill="none" stroke="rgba(224,177,90,0.6)">
        {echoEvents.map((d) => (
          <path key={d} d={d} data-draw="" />
        ))}
      </g>
      <g data-pop="">
        <rect x="232" y="100" width="64" height="40" fill="#141412" stroke="#e0b15a" />
        <text x="264" y="125" textAnchor="middle" fill="#f3efe6" fontFamily="Georgia, serif" fontSize="15">
          ECHO
        </text>
      </g>
      <text x="316" y="80" fill="#aaa396" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.4">
        INTEREST
      </text>
      {interests.map((item, index) => {
        const y = 104 + index * 30;
        return (
          <g key={item.label}>
            <text x="316" y={y - 8} fill="#f3efe6" fontFamily="ui-monospace, monospace" fontSize="9">
              {item.label}
            </text>
            <path
              d={`M316 ${y} H${316 + item.width}`}
              stroke={item.hot ? "#e0b15a" : "rgba(243,239,230,0.55)"}
              strokeWidth="6"
              data-draw=""
            />
          </g>
        );
      })}
      <text x="28" y="28" fill="#aaa396" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.4">
        ZENBRIDGE.IO
      </text>
    </svg>
  );
}

export function SignalVisual() {
  return (
    <svg className="visual" viewBox="0 0 420 240" role="img" aria-label="SLA trend with one detected spike">
      <path d="M36 180 H384" stroke="rgba(243,239,230,0.16)" strokeWidth="1" />
      <path
        d="M40 150 C80 148 100 140 130 142 C170 146 190 90 220 96 C250 102 270 138 310 132 C340 128 360 120 384 116"
        fill="none"
        stroke="#f3efe6"
        strokeWidth="1.5"
        data-draw=""
      />
      <g data-pop="after">
        <circle cx="214" cy="94" r="5" fill="#e0b15a" />
        <text x="228" y="86" fill="#e0b15a" fontFamily="ui-monospace, monospace" fontSize="11">
          anomaly
        </text>
      </g>
      <text x="36" y="40" fill="#aaa396" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.4">
        SLA · LIVE
      </text>
    </svg>
  );
}

export const visuals = {
  workflow: WorkflowVisual,
  dictionary: DictionaryVisual,
  echo: EchoVisual,
  signal: SignalVisual,
} as const;
