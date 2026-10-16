"use client";

import { useEffect, useRef } from "react";

// Reading the clock during prerender is disallowed with Cache Components, so
// the prerendered HTML carries the build year and the browser updates it.
const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

export function CopyrightYear() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.textContent = String(new Date().getFullYear());
  }, []);
  return <span ref={ref}>{BUILD_YEAR}</span>;
}
