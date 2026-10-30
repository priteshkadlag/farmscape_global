"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";
import { whenIdle } from "./defer";

export type SceneTools = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
};

let tools: Promise<SceneTools> | null = null;

/** Loads GSAP and its plugins once, off the critical path. */
export function loadSceneTools() {
  tools ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(
    ([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      return { gsap, ScrollTrigger, SplitText };
    },
  );
  return tools;
}

let refreshTimer = 0;
/**
 * Scenes load independently, so pinned sections can be created out of page
 * order. Re-sorting by refreshPriority and refreshing keeps pin spacing correct.
 */
function queueRefresh(ScrollTrigger: SceneTools["ScrollTrigger"]) {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, 150);
}

/**
 * Runs a GSAP scene scoped to `ref` once the browser is idle. Everything the
 * setup creates is reverted on unmount. Skipped entirely for reduced motion,
 * so each scene's markup must read correctly without it.
 */
export function useScrollScene<T extends HTMLElement>(ref: RefObject<T | null>, setup: (tools: SceneTools, el: T) => void | (() => void)) {
  const run = useEffectEvent(setup);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revert = () => {};
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
      const t = await loadSceneTools();
      if (cancelled) return;
      let cleanup: void | (() => void);
      const ctx = t.gsap.context(() => {
        cleanup = run(t, el);
      }, el);
      revert = () => {
        cleanup?.();
        ctx.revert();
      };
      queueRefresh(t.ScrollTrigger);
    });

    return () => {
      cancelled = true;
      cancelIdle();
      revert();
    };
  }, [ref]);
}

/** SplitText masks clip descenders (g, y, p); give them room without shifting layout. */
export function padMasks<S extends { masks: Element[] }>(split: S): S {
  split.masks.forEach((m) => {
    (m as HTMLElement).style.paddingBottom = "0.14em";
    (m as HTMLElement).style.marginBottom = "-0.14em";
  });
  return split;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/°·";

/** A tween that decodes `el`'s text from noise, left to right, like a readout locking on. */
export function scramble(gsap: SceneTools["gsap"], el: Element, final: string, duration: number) {
  const state = { p: 0 };
  el.textContent = "";
  return gsap.to(state, {
    p: 1,
    duration,
    ease: "none",
    onUpdate: () => {
      const n = Math.floor(state.p * final.length);
      const noise = Array.from(final.slice(n), (c) => (c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]));
      el.textContent = final.slice(0, n) + noise.join("");
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}
