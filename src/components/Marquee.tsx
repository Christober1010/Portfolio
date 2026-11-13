import type { CSSProperties } from "react";

type MarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
  small?: boolean;
  speed?: string;
};

/** An endless ribbon of items. The list is rendered twice so the loop never shows a seam. */
export function Marquee({ items, reverse, small, speed }: MarqueeProps) {
  return (
    <div
      className={`marquee${small ? " small" : ""}`}
      data-reverse={reverse ? "" : undefined}
      style={speed ? ({ "--marquee-speed": speed } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) =>
          items.map((item) => <span key={`${copy}-${item}`}>{item}</span>),
        )}
      </div>
    </div>
  );
}
