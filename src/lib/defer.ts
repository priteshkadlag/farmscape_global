"use client";

import { useEffect, useState, type RefObject } from "react";

/** Runs `fn` when the browser is idle (falls back to a short timeout). Returns a cancel function. */
export function whenIdle(fn: () => void, timeout = 1500) {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 200);
  return () => window.clearTimeout(id);
}

/** True once the element comes within `rootMargin` of the viewport (latches). */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = "400px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, near]);
  return near;
}
