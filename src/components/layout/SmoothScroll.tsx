"use client";

import { useEffect } from "react";
import { whenIdle } from "@/lib/defer";

/**
 * Lenis smooth scrolling, synced with GSAP ScrollTrigger. Disabled for
 * reduced-motion users and touch devices (native scrolling is better there).
 * Both libraries are loaded lazily so they never block first paint.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let cleanup = () => {};
    let cancelled = false;

    const cancelIdle = whenIdle(async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.05, anchors: { offset: -80 }, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    }, 3000);

    return () => {
      cancelled = true;
      cancelIdle();
      cleanup();
    };
  }, []);

  return null;
}
