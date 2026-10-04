export function WorkflowVisual() {
  return (
    <svg className="visual" viewBox="0 0 420 240" role="img" aria-label="Connected workflow nodes">
      <path
        d="M112 120 C134 120 132 78 148 78 M112 120 C134 120 132 162 148 162 M252 78 C286 78 286 120 308 120 M252 162 C286 162 286 120 308 120"
        stroke="rgba(243,239,230,0.35)"
        strokeWidth="1"
        fill="none"
      />
      <g fontFamily="ui-monospace, monospace" fontSize="11">
        <rect x="28" y="96" width="84" height="48" fill="#141412" stroke="rgba(243,239,230,0.28)" />
        <text x="70" y="124" textAnchor="middle" fill="#f3efe6">
          Trigger
        </text>
        <rect x="148" y="54" width="104" height="48" fill="#141412" stroke="#e0b15a" />
        <text x="200" y="82" textAnchor="middle" fill="#f3efe6">
          Map 850
        </text>
        <rect x="148" y="138" width="104" height="48" fill="#141412" stroke="rgba(243,239,230,0.28)" />
        <text x="200" y="166" textAnchor="middle" fill="#f3efe6">
          Validate
        </text>
        <rect x="308" y="96" width="84" height="48" fill="#141412" stroke="rgba(243,239,230,0.28)" />
        <text x="350" y="124" textAnchor="middle" fill="#f3efe6">
          Ship
        </text>
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
          />
        );
      })}
    </svg>
  );
}

export function ScoreVisual() {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.98 * circumference;
  return (
    <svg className="visual" viewBox="0 0 420 240" role="img" aria-label="Lighthouse performance score of 98">
      <circle cx="168" cy="120" r={radius} fill="none" stroke="rgba(243,239,230,0.12)" strokeWidth="8" />
      <circle
        cx="168"
        cy="120"
        r={radius}
        fill="none"
        stroke="#e0b15a"
        strokeWidth="8"
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="butt"
        transform="rotate(-90 168 120)"
      />
      <text
        x="168"
        y="118"
        textAnchor="middle"
        fill="#f3efe6"
        fontFamily="Georgia, serif"
        fontSize="42"
      >
        98
      </text>
      <text
        x="168"
        y="144"
        textAnchor="middle"
        fill="#aaa396"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        letterSpacing="1.5"
      >
        PERFORMANCE
      </text>
      <text x="270" y="108" fill="#f3efe6" fontFamily="Georgia, serif" fontSize="28">
        95
      </text>
      <text x="270" y="132" fill="#aaa396" fontFamily="ui-monospace, monospace" fontSize="11">
        SEO
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
      />
      <circle cx="214" cy="94" r="5" fill="#e0b15a" />
      <text x="228" y="86" fill="#e0b15a" fontFamily="ui-monospace, monospace" fontSize="11">
        anomaly
      </text>
      <text x="36" y="40" fill="#aaa396" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.4">
        SLA · LIVE
      </text>
    </svg>
  );
}

export const visuals = {
  workflow: WorkflowVisual,
  dictionary: DictionaryVisual,
  score: ScoreVisual,
  signal: SignalVisual,
} as const;
