"use client";

import { useRef, type ReactNode } from "react";
import { padMasks, useScrollScene, type SceneTools } from "@/lib/scroll-scene";

/* ---------------------------------------------------------------------------
   Diagrams. Each one explains a principle the way an engineer would sketch it.
   Strokes use pathLength=1 so GSAP can draw them; they render complete without JS.
   --------------------------------------------------------------------------- */

/** Outline of a rolled I-section standing on baseline `by`. */
function iSection(cx: number, by: number, d: number, bf: number, tw: number, tf: number) {
  const l = cx - bf / 2;
  const r = cx + bf / 2;
  const t = by - d;
  return `M${l} ${t}H${r}V${t + tf}H${cx + tw / 2}V${by - tf}H${r}V${by}H${l}V${by - tf}H${cx - tw / 2}V${t + tf}H${l}Z`;
}

function SectionsDiagram() {
  const sections = [
    { cx: 78, d: 230, bf: 118, tw: 16, tf: 22, label: "A · Heavy" },
    { cx: 214, d: 178, bf: 94, tw: 10, tf: 15, label: "B · Optimal", chosen: true },
    { cx: 344, d: 116, bf: 70, tw: 7, tf: 9, label: "C · Undersized" },
  ];
  return (
    <svg viewBox="0 0 420 340" className="h-auto w-full" aria-hidden="true">
      <path data-draw d="M10 290H410" pathLength={1} className="stroke-ink/25" strokeWidth="1" fill="none" />
      {sections.map((s) => (
        <g key={s.label} data-option={s.chosen ? "chosen" : "rejected"}>
          <path
            data-draw
            data-fill={s.chosen ? "" : undefined}
            d={iSection(s.cx, 290, s.d, s.bf, s.tw, s.tf)}
            pathLength={1}
            className={s.chosen ? "fill-lime stroke-ink" : "fill-none stroke-ink"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text x={s.cx} y="318" textAnchor="middle" className="fill-steel-600 font-mono text-[11px] uppercase tracking-[0.14em]">
            {s.label}
          </text>
        </g>
      ))}
      <g data-tag>
        <rect x="160" y="70" width="108" height="24" className="fill-ink" />
        <text x="214" y="86" textAnchor="middle" className="fill-lime font-mono text-[11px] uppercase tracking-[0.18em]">
          Selected
        </text>
      </g>
    </svg>
  );
}

// The architect's roofline, and columns sized to meet it exactly.
// Rounded so server and browser render identical attributes (no hydration mismatch).
const roof = (x: number) => Math.round((150 - 72 * Math.sin((Math.PI * (x - 30)) / 360)) * 10) / 10;
const roofPath = Array.from({ length: 37 }, (_, i) => {
  const x = 30 + i * 10;
  return `${i ? "L" : "M"}${x} ${roof(x).toFixed(1)}`;
}).join("");

function CurveDiagram() {
  const columns = [66, 126, 186, 246, 306, 366];
  return (
    <svg viewBox="0 0 420 340" className="h-auto w-full" aria-hidden="true">
      <path data-draw d="M10 300H410" pathLength={1} className="stroke-ink/25" strokeWidth="1" fill="none" />
      <path data-curve d={roofPath} pathLength={1} className="stroke-copper" strokeWidth="3" fill="none" strokeLinecap="round" />
      {columns.map((x) => (
        <rect key={x} data-column x={x - 6} y={roof(x) + 4} width="12" height={300 - roof(x) - 4} className="fill-lime stroke-ink" strokeWidth="1.5" />
      ))}
      <text x="40" y="60" className="fill-copper font-mono text-[11px] uppercase tracking-[0.16em]">
        Architect’s line
      </text>
      <text x="40" y="326" className="fill-steel-600 font-mono text-[11px] uppercase tracking-[0.16em]">
        Structure, fitted to it
      </text>
    </svg>
  );
}

const deflected = Array.from({ length: 33 }, (_, i) => {
  const x = 50 + i * 10;
  return `${i ? "L" : "M"}${x} ${(198 + 34 * Math.sin((Math.PI * (x - 50)) / 320)).toFixed(1)}`;
}).join("");

function BeamDiagram() {
  const arrows = Array.from({ length: 9 }, (_, i) => 66 + i * 36);
  return (
    <svg viewBox="0 0 420 340" className="h-auto w-full" aria-hidden="true">
      <g data-loads className="stroke-ink" strokeWidth="1.5" fill="none">
        <path d="M60 96H360" />
        {arrows.map((x) => (
          <path key={x} d={`M${x} 96V160M${x - 5} 152L${x} 160L${x + 5} 152`} />
        ))}
      </g>
      <rect x="50" y="166" width="320" height="16" className="fill-paper stroke-ink" strokeWidth="2" />
      <path d="M50 182L38 204H62Z M370 182L358 204H382Z" className="fill-steel-400" />
      <path data-draw d={deflected} pathLength={1} className="stroke-copper" strokeWidth="2" strokeDasharray="6 5" fill="none" />
      <g data-stamp>
        <rect x="46" y="262" width="150" height="36" className="fill-none stroke-ink" strokeWidth="1.5" />
        <text x="121" y="285" textAnchor="middle" className="fill-ink font-mono text-[11px] uppercase tracking-[0.16em]">
          Analysed ✓
        </text>
      </g>
      <g data-stamp>
        <rect x="214" y="262" width="164" height="36" className="fill-lime stroke-ink" strokeWidth="1.5" />
        <text x="296" y="285" textAnchor="middle" className="fill-ink font-mono text-[11px] uppercase tracking-[0.16em]">
          Cross-checked ✓
        </text>
      </g>
    </svg>
  );
}

const principles: { title: string; text: string; diagram: ReactNode; caption: string }[] = [
  {
    title: "Question the default.",
    text: "The standard answer is rarely the best one. We compare structural systems and materials until the structure is as lean as it is safe.",
    diagram: <SectionsDiagram />,
    caption: "Three sections, one load. Only one is right.",
  },
  {
    title: "Let design lead.",
    text: "We begin with the architect’s intent, so the structure carries the idea instead of compromising it.",
    diagram: <CurveDiagram />,
    caption: "The line comes first. The structure meets it.",
  },
  {
    title: "Make rigour a habit.",
    text: "Every analysis is cross-checked before a single drawing begins. Not a stage in the process — the way we work.",
    diagram: <BeamDiagram />,
    caption: "Load, deflection, verification. Every time.",
  },
];

/** Adds the diagram's choreography for panel `kind` to `tl`. */
function choreograph({ gsap }: SceneTools, tl: gsap.core.Timeline, panel: Element, kind: number) {
  const q = gsap.utils.selector(panel);
  tl.fromTo(q("[data-draw]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.12 });
  if (kind === 0) {
    tl.to(q("[data-option='rejected']"), { opacity: 0.28, duration: 0.2 }, ">-0.05")
      .fromTo(q("[data-fill]"), { fillOpacity: 0 }, { fillOpacity: 1, duration: 0.25 }, "<")
      .fromTo(q("[data-tag]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.2 }, "<0.1");
  } else if (kind === 1) {
    tl.fromTo(q("[data-curve]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5 }, 0.1).fromTo(
      q("[data-column]"),
      { scaleY: 0, transformOrigin: "50% 100%" },
      { scaleY: 1, duration: 0.3, stagger: 0.06, ease: "power2.out" },
    );
  } else {
    tl.fromTo(q("[data-loads] path"), { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15, stagger: 0.03 }, 0).fromTo(
      q("[data-stamp]"),
      { autoAlpha: 0, scale: 1.35, transformOrigin: "50% 50%" },
      { autoAlpha: 1, scale: 1, duration: 0.15, stagger: 0.2, ease: "back.out(2)" },
      ">",
    );
  }
}

/**
 * Scene 3 — "Load path". On large screens the principles travel sideways
 * along a lime load-path line while each diagram draws itself; elsewhere
 * they stack and draw as they enter.
 */
export function LoadPath() {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, (tools, el) => {
    const { gsap, SplitText } = tools;
    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      el.dataset.ready = "";
      const track = el.querySelector<HTMLElement>("[data-track]")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const move = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el.querySelector("[data-stage]"),
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          refreshPriority: -2,
          invalidateOnRefresh: true,
        },
      });
      move.to(track, { x: () => -distance() }).fromTo("[data-path-fill]", { scaleX: 0 }, { scaleX: 1 }, 0);

      panels.forEach((panel, i) => {
        const at = { containerAnimation: move, trigger: panel, scrub: true };
        const split = padMasks(SplitText.create(panel.querySelector("[data-title]"), { type: "words", mask: "words" }));
        gsap.from(split.words, { yPercent: 110, stagger: 0.08, ease: "power3.out", scrollTrigger: { ...at, start: "left 80%", end: "left 40%" } });
        gsap.fromTo(panel.querySelector("[data-number]"), { xPercent: 40 }, { xPercent: -40, ease: "none", scrollTrigger: { ...at, start: "left right", end: "right left" } });
        gsap.to(panel.querySelector("[data-node]"), { backgroundColor: "var(--color-lime)", scale: 1.6, scrollTrigger: { ...at, start: "left 55%", end: "left 45%" } });
        const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { ...at, start: "left 65%", end: "center 62%" } });
        choreograph(tools, tl, panel, i);
      });

      return () => delete el.dataset.ready;
    });

    mm.add("(max-width: 1023px)", () => {
      panels.forEach((panel, i) => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: panel, start: "top 70%" } });
        choreograph(tools, tl, panel, i);
      });
    });

    return () => mm.revert();
  });

  return (
    <section ref={root} className="group relative overflow-hidden bg-paper" aria-labelledby="principles-title">
      <div data-stage className="relative group-data-ready:h-svh">
        {/* The load path: one continuous line through every principle */}
        <div className="pointer-events-none absolute inset-x-0 top-[22vh] hidden h-0.5 bg-ink/10 group-data-ready:block" aria-hidden="true">
          <div data-path-fill className="h-full origin-left bg-lime" />
        </div>

        <div
          data-track
          className="flex flex-col gap-24 py-24 sm:py-32 group-data-ready:h-full group-data-ready:w-max group-data-ready:flex-row group-data-ready:items-stretch group-data-ready:gap-0 group-data-ready:py-0"
        >
          <div className="container-site group-data-ready:mx-0 group-data-ready:flex group-data-ready:w-[44vw] group-data-ready:flex-col group-data-ready:justify-center group-data-ready:max-w-none group-data-ready:shrink-0 group-data-ready:pl-10 group-data-ready:pr-16">
            <p className="eyebrow mb-6 flex items-center gap-3 text-brand">
              <span className="text-steel-500">01</span>
              <span className="h-px w-8 bg-brand/50" aria-hidden="true" />
              How we think
            </p>
            <h2 id="principles-title" className="display-xl text-balance">
              Rethinking, in practice.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-steel-600">
              Engineering is a series of decisions. These three shape every one we make.
            </p>
            <p className="mt-12 hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-steel-500 group-data-ready:flex">
              Follow the load path
              <span className="h-px w-16 bg-current" aria-hidden="true" />
            </p>
          </div>

          {principles.map((p, i) => (
            <article
              key={p.title}
              data-panel
              className="container-site relative grid gap-10 md:grid-cols-2 md:items-center group-data-ready:mx-0 group-data-ready:content-center group-data-ready:w-[80vw] group-data-ready:max-w-[1240px] group-data-ready:shrink-0 group-data-ready:gap-16 group-data-ready:px-16"
            >
              <span
                data-node
                className="absolute left-16 top-[22vh] hidden size-3 -translate-y-[5px] rounded-full bg-ink group-data-ready:block"
                aria-hidden="true"
              />
              <div className="relative">
                <span
                  data-number
                  className="text-outline pointer-events-none absolute -top-16 left-0 select-none font-display text-[clamp(5rem,10vw,9.5rem)] font-extrabold leading-none text-ink/15"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative pt-24 sm:pt-32">
                  <h3 data-title className="display-lg">
                    {p.title}
                  </h3>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-steel-600">{p.text}</p>
                </div>
              </div>
              <figure className="border border-ink/10 bg-concrete-100/60 p-6 sm:p-10">
                {p.diagram}
                <figcaption className="mt-6 border-t border-ink/10 pt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-steel-500">
                  {p.caption}
                </figcaption>
              </figure>
            </article>
          ))}
          <div className="hidden w-[12vw] shrink-0 group-data-ready:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
