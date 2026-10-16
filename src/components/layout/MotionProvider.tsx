"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

// Animation features (including layout animations) load in a separate chunk
// after hydration, keeping the motion engine off the critical rendering path.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
