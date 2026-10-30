"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { whenIdle } from "@/lib/defer";
import { loadSceneTools, scramble, type SceneTools } from "@/lib/scroll-scene";

const StructureScene = dynamic(() => import("./StructureScene"), { ssr: false });

/** Captions follow the erection, timed against the pinned scroll (0–1). */
const captions = [
  { at: 0.2, line: "It starts\nbelow ground." },
  { at: 0.37, line: "Every column\nfinds its load." },
  { at: 0.53, line: "Every member,\ndetailed." },
  { at: 0.69, line: "Every connection,\nchecked." },
  { at: 0.86, line: "Until the idea\nstands." },
];

/** HUD stage names, matched to the member schedule in StructureScene. */
const stages: [number, string][] = [
  [0, "Plan"],
  [0.17, "Foundations"],
  [0.27, "Columns"],
  [0.4, "Rafters"],
  [0.56, "Purlins"],
  [0.69, "Bracing"],
  [0.84, "Load test"],
  [0.97, "Complete"],
];

const CINEMATIC = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
/**
 * Home hero as a title sequence. Letterbox bars part on the building's plan as
 * its blueprint draws itself and the brand line assembles; scrolling scatters
 * the title, drops the camera from plan to ground and erects the steel onto
 * the blueprint, ending in a load test. Smaller screens get the title sequence
 * over a drawn elevation; reduced motion gets the title, still.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const opening = useRef(0);
  const [cinematic, setCinematic] = useState(false);
  const [sceneActive, setSceneActive] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<SVGPathElement>("[data-draw]").forEach((l) => (l.style.strokeDashoffset = "0"));
      el.querySelectorAll<SVGElement>("[data-note]").forEach((n) => (n.style.opacity = "1"));
      return;
    }

    let revert = () => {};
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
      let tools: SceneTools;
      try {
        tools = await loadSceneTools();
      } catch {
        el.dataset.cinematic = "off";
        return;
      }
      if (cancelled) return;
      const { gsap, ScrollTrigger, SplitText } = tools;
      const doc = document.documentElement;
      // While the loader is still up, the opening waits for it to lift ("intro:done").
      const waiting = doc.dataset.intro === "play" && !doc.dataset.introState;
      const delay = waiting ? 0 : 0.2;
      const afterLoader = (tl: gsap.core.Timeline) => {
        if (!waiting) return () => {};
        tl.pause();
        const go = () => void tl.play();
        window.addEventListener("intro:done", go, { once: true });
        return () => window.removeEventListener("intro:done", go);
      };

      const ctx = gsap.context(() => {
        const title = SplitText.create("[data-title]", { type: "words,chars" });
        const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]")!;

        const openTitle = () =>
          gsap
            .timeline({ delay, defaults: { ease: "power4.out" } })
            .add(scramble(gsap, eyebrow, eyebrow.dataset.text ?? "", 1.2), 0.1)
            .from(
              title.chars,
              {
                yPercent: 80,
                rotationX: -100,
                opacity: 0,
                filter: "blur(12px)",
                transformPerspective: 700,
                transformOrigin: "50% 100%",
                duration: 1.3,
                stagger: 0.03,
              },
              0.25,
            )
            .from("[data-rule]", { scaleX: 0, transformOrigin: "0% 50%", duration: 1.4, ease: "expo.inOut" }, 0.9)
            .from("[data-sub]", { y: 28, opacity: 0, duration: 1.1 }, 1.2);

        const mm = gsap.matchMedia();

        mm.add(CINEMATIC, () => {
          setCinematic(true);
          const open = { v: 0 };
          const intro = openTitle();
          intro
            .fromTo("[data-bar]", { scaleY: 1 }, { scaleY: 0.14, duration: 1.8, ease: "expo.inOut" }, 0)
            .to(open, { v: 1, duration: 3.6, ease: "power2.inOut", onUpdate: () => void (opening.current = open.v) }, 0.15)
            .from("[data-crop]", { scale: 1.6, opacity: 0, duration: 1.1, stagger: 0.06, ease: "expo.out" }, 1.2)
            .from("[data-hud]", { opacity: 0, y: 12, duration: 0.9, stagger: 0.1, ease: "power2.out" }, 1.6);
          const releaseIntro = afterLoader(intro);
          el.dataset.ready = "";

          const percent = el.querySelector<HTMLElement>("[data-percent]")!;
          const stage = el.querySelector<HTMLElement>("[data-stage]")!;
          const hud = (p: number) => {
            const pct = String(Math.round(p * 100)).padStart(3, "0");
            if (percent.textContent !== pct) percent.textContent = pct;
            const name = stages.reduce((found, [at, label]) => (p >= at ? label : found), "Plan");
            if (stage.textContent !== name) stage.textContent = name;
          };

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=560%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                progress.current = self.progress;
                hud(self.progress);
              },
              onToggle: (self) => setSceneActive(self.isActive || self.progress < 1),
            },
          });

          // The title breaks apart like a structure under test as the camera leaves the plan.
          tl.to(
            title.words,
            {
              x: () => gsap.utils.random(-480, 480),
              y: () => gsap.utils.random(-360, 220),
              rotation: () => gsap.utils.random(-75, 75),
              opacity: 0,
              filter: "blur(14px)",
              duration: 0.1,
              stagger: { each: 0.006, from: "center" },
              ease: "power2.in",
            },
            0.015,
          )
            .to("[data-fade]", { opacity: 0, y: -40, duration: 0.06, stagger: 0.01 }, 0.01)
            .to("[data-cue]", { autoAlpha: 0, duration: 0.03 }, 0.01)
            .fromTo("[data-hud-fill]", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
            .to("[data-bar]", { scaleY: 0, duration: 0.06, ease: "power2.inOut" }, 0.92);

          // Captions drift up out of a blur, hold, then dissolve.
          captions.forEach((c, i) => {
            const target = `[data-caption='${i}']`;
            tl.fromTo(
              target,
              { autoAlpha: 0, y: 50, filter: "blur(10px)" },
              { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" },
              c.at,
            );
            if (i < captions.length - 1) {
              tl.to(target, { autoAlpha: 0, y: -50, filter: "blur(10px)", duration: 0.05, ease: "power2.in" }, c.at + 0.11);
            }
          });
          tl.to({}, { duration: 0.02 }, 0.98);

          const refreshes = [400, 1500].map((ms) => window.setTimeout(() => ScrollTrigger.refresh(), ms));
          return () => {
            refreshes.forEach(window.clearTimeout);
            releaseIntro();
            intro.kill();
            setCinematic(false);
            setSceneReady(false);
            opening.current = 0;
            delete el.dataset.ready;
          };
        });

        mm.add("(max-width: 1023px)", () => {
          const intro = openTitle();
          intro
            .to("[data-draw='grid']", { strokeDashoffset: 0, duration: 1.4, stagger: 0.06, ease: "power3.out" }, 0)
            .to("[data-draw='frame']", { strokeDashoffset: 0, duration: 1.6, stagger: 0.12, ease: "power3.out" }, 0.4)
            .to("[data-draw='dim']", { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 1)
            .to("[data-note]", { opacity: 1, duration: 0.6, stagger: 0.1 }, 1.4);
          const releaseIntro = afterLoader(intro);
          el.dataset.ready = "";
          return () => {
            releaseIntro();
            intro.kill();
            delete el.dataset.ready;
          };
        });
      }, el);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cancelIdle();
      revert();
    };
  }, []);

  return (
    <section
      ref={root}
      data-header-overlay={cinematic || undefined}
      className="hero-cinematic group on-dark relative isolate flex min-h-svh items-end overflow-hidden bg-ink text-paper lg:h-svh"
      aria-labelledby="hero-title"
    >
      {/* Smaller screens: a drawn elevation of the frame */}
      <div className="absolute inset-0 -z-10 lg:hidden" aria-hidden="true">
        <div className="bg-blueprint-dark absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,color-mix(in_srgb,var(--color-lime)_12%,transparent),transparent_60%)]" />
        <svg className="absolute inset-0 h-full w-full text-lime/60" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          <g strokeWidth="1" className="text-white/15" stroke="currentColor">
            {[180, 420, 660, 900, 1140, 1380].map((x) => (
              <path key={x} data-draw="grid" pathLength={1} className="hero-draw" d={`M${x} 0 V900`} />
            ))}
            {[150, 450, 750].map((y) => (
              <path key={y} data-draw="grid" pathLength={1} className="hero-draw" d={`M0 ${y} H1440`} />
            ))}
          </g>
          <g strokeWidth="1.5">
            <path data-draw="frame" pathLength={1} className="hero-draw" d="M660 450 L1020 270 L1380 450" />
            <path data-draw="frame" pathLength={1} className="hero-draw" d="M660 450 H1380" />
            <path
              data-draw="frame"
              pathLength={1}
              className="hero-draw"
              d="M750 450 L750 405 M840 450 L840 360 M930 450 L930 315 M1020 450 L1020 270 M1110 450 L1110 315 M1200 450 L1200 360 M1290 450 L1290 405 M660 450 L840 360 M840 450 L1020 270 M1020 450 L1200 360 M1200 450 L1380 450"
            />
            <path data-draw="frame" pathLength={1} className="hero-draw" d="M660 450 V750 M1380 450 V750" />
          </g>
          <g strokeWidth="1">
            <path data-draw="dim" pathLength={1} className="hero-draw" d="M660 800 H1380 M660 790 V810 M1380 790 V810 M654 806 L666 794 M1374 806 L1386 794" />
            <path data-draw="dim" pathLength={1} className="hero-draw" d="M1420 450 V750 M1410 450 H1430 M1410 750 H1430" />
          </g>
          <g fill="currentColor" stroke="none" fontFamily="var(--font-jetbrains), monospace" fontSize="12" letterSpacing="1.5">
            <text data-note x="985" y="824" opacity="0">
              CLEAR SPAN
            </text>
            <text data-note x="1020" y="255" opacity="0" textAnchor="middle">
              RIDGE
            </text>
            <text data-note x="1436" y="605" opacity="0" transform="rotate(-90 1436 605)" textAnchor="middle">
              COL. HT
            </text>
          </g>
        </svg>
      </div>

      {/* Large screens: the 3D sequence and its film chrome */}
      <div className="pointer-events-none absolute inset-0 hidden lg:group-data-ready:block" aria-hidden="true">
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: sceneReady ? 1 : 0 }}>
          {cinematic && <StructureScene progress={progress} opening={opening} active={sceneActive} onReady={() => setSceneReady(true)} />}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(37_40_43/0.8))]" />

        {captions.map((c, i) => (
          <div key={c.line} data-caption={i} className="invisible absolute bottom-[16vh] left-16 max-w-3xl will-change-[opacity,transform,filter]">
            <p className="display-xl whitespace-pre-line text-paper [text-shadow:0_2px_60px_rgb(0_0_0/0.6)]">{c.line}</p>
          </div>
        ))}

        {/* Viewfinder crop marks */}
        {["left-10 top-[12vh] border-l border-t", "right-10 top-[12vh] border-r border-t", "bottom-[12vh] left-10 border-b border-l", "bottom-[12vh] right-10 border-b border-r"].map((pos) => (
          <span key={pos} data-crop className={`absolute size-6 border-lime/70 ${pos}`} />
        ))}

        <p data-hud className="absolute left-16 top-[calc(12vh+2.5rem)] font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-300">
          Model 01 · Steel portal frame · 42 × 20 m
        </p>

        <div data-hud className="absolute right-10 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400 [writing-mode:vertical-rl]">Erection sequence</span>
          <span className="relative h-40 w-px bg-white/15">
            <span data-hud-fill className="absolute inset-0 origin-top scale-y-0 bg-lime" />
          </span>
        </div>

        <div data-hud className="absolute bottom-[calc(12vh+2rem)] right-16 text-right">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">Stage</p>
          <p className="mt-2 flex items-baseline justify-end gap-4">
            <span data-stage className="font-display text-xl font-semibold tracking-tight text-lime">
              Plan
            </span>
            <span className="font-display text-4xl font-extrabold tabular-nums leading-none">
              <span data-percent>000</span>
              <span className="text-2xl text-steel-400">%</span>
            </span>
          </p>
        </div>

        <div data-hud className="absolute bottom-[calc(7vh+1.5rem)] left-1/2 -translate-x-1/2">
          <div data-cue className="flex flex-col items-center gap-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-300">Scroll to build</span>
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="animate-scroll-cue absolute inset-0 bg-lime" />
            </span>
          </div>
        </div>

        {/* Letterbox: parts on the opening, retracts as the frame completes */}
        <div data-bar className="absolute inset-x-0 top-0 z-30 h-1/2 origin-top bg-[#141617]" />
        <div data-bar className="absolute inset-x-0 bottom-0 z-30 h-1/2 origin-bottom bg-[#141617]" />
      </div>

      {/* Title */}
      <div className="container-site relative z-10 w-full pb-24 pt-[calc(var(--header-h)+4rem)] sm:pb-28 lg:pb-[17vh]">
        <div data-fade>
          <p data-gate data-eyebrow data-text="Structural engineering · Goa, India" className="eyebrow mb-8 h-4 text-lime">
            Structural engineering · Goa, India
          </p>
        </div>
        <h1
          id="hero-title"
          data-gate
          data-title
          className="max-w-6xl font-display text-[clamp(2.4rem,5.8vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.04em]"
        >
          <span className="block">Rethinking</span>
          <span className="block text-lime">Structural Engineering.</span>
        </h1>
        <div data-gate data-rule data-fade className="mt-10 h-px w-full max-w-xl bg-lime/60" aria-hidden="true" />
        <div data-fade>
          <p data-gate data-sub className="mt-8 max-w-xl text-lg leading-relaxed text-steel-300">
            A design-led structural engineering practice that combines analytical rigour with architectural sensitivity — from Goa, for
            projects across India.
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex lg:hidden" aria-hidden="true">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-0 bg-lime" />
        </span>
      </div>
    </section>
  );
}
