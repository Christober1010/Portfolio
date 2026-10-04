import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/** Fades its children up on scroll. Animation lives in motion/Motion.tsx. */
export function Reveal({ children, className }: RevealProps) {
  return (
    <div className={className} data-anim="">
      {children}
    </div>
  );
}
