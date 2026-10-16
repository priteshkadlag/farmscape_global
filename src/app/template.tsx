"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect } from "react";

// The first page load must not start at opacity 0 (it would delay LCP and
// hide server-rendered content), so the fade only runs on client navigations.
let hasNavigated = false;

/** Quick, polished fade between routes. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasNavigated && !reduce;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <m.div initial={animate ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </m.div>
  );
}
