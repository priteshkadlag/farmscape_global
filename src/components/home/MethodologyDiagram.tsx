"use client";

import { useEffect, useRef } from "react";
import { workflow } from "@/content/services";
import { useNearViewport } from "@/lib/defer";

/**
 * Brief → … → Construction support, drawn as a technical line with nodes.
 * GSAP ScrollTrigger scrubs the connector and lights each node in turn.
 * Without JS or with reduced motion, the finished diagram is shown.
 */
export function MethodologyDiagram({ dark = true }: { dark?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const near = useNearViewport(root, "600px");

  useEffect(() => {
    const el = root.current;
    if (!near || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revert = () => {};
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        const build = (axis: "x" | "y") => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
          });
          tl.fromTo("[data-track]", axis === "x" ? { scaleX: 0 } : { scaleY: 0 }, { ...(axis === "x" ? { scaleX: 1 } : { scaleY: 1 }), ease: "none", duration: 1 }, 0);
          gsap.utils.toArray<HTMLElement>("[data-node]", el).forEach((n, i, arr) => {
            const at = i / (arr.length - 1);
            tl.fromTo(n.querySelector("[data-dot]"), { scale: 0.4, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.08 }, at * 0.95);
            tl.fromTo(n.querySelector("[data-copy]"), { opacity: 0.4, y: 10 }, { opacity: 1, y: 0, duration: 0.12 }, at * 0.95);
          });
        };
        mm.add("(min-width: 1024px)", () => build("x"));
        mm.add("(max-width: 1023px)", () => build("y"));
      }, el);
      revert = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      revert();
    };
  }, [near]);

  const lineBase = dark ? "bg-white/15" : "bg-ink/15";

  return (
    <div ref={root} className="relative">
      {/* Track: vertical on mobile, horizontal on desktop */}
      <div className={`absolute bottom-6 left-[11px] top-6 w-px lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto ${lineBase}`} aria-hidden="true">
        <div data-track className="h-full w-full origin-top bg-brand-300 lg:origin-left" />
      </div>
      {/* Measurement ticks along the desktop track */}
      <div className="absolute inset-x-0 top-[5px] hidden h-3 lg:block" aria-hidden="true">
        {Array.from({ length: 25 }, (_, i) => (
          <span key={i} className={`absolute top-0 w-px ${i % 4 === 0 ? "h-3" : "h-1.5"} ${lineBase}`} style={{ left: `${(i / 24) * 100}%` }} />
        ))}
      </div>
      <ol className="relative grid gap-10 lg:grid-cols-7 lg:gap-6">
        {workflow.map((step, i) => (
          <li key={step.id} data-node className="relative pl-10 lg:pl-0 lg:pt-12">
            <span
              data-dot
              className={`absolute left-0 top-0 flex size-[23px] items-center justify-center border ${dark ? "border-brand-300 bg-ink" : "border-brand bg-paper"}`}
              aria-hidden="true"
            >
              <span className={`size-2 ${dark ? "bg-brand-300" : "bg-brand"}`} />
            </span>
            <div data-copy>
              <p className={`font-mono text-xs ${dark ? "text-steel-400" : "text-steel-500"}`}>Stage {String(i + 1).padStart(2, "0")}</p>
              <h3 className={`mt-2 font-display text-lg font-semibold leading-snug tracking-tight ${dark ? "text-paper" : "text-ink"}`}>{step.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-steel-400" : "text-steel-600"}`}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
