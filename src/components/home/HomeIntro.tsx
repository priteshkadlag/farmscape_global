"use client";

import { useEffect, useRef } from "react";

// Runs before hydration so the loader covers the first paint (skipped for reduced motion).
const decide = `try{var d=document.documentElement;d.dataset.intro=matchMedia("(prefers-reduced-motion: reduce)").matches?"skip":"play";delete d.dataset.introState}catch(e){document.documentElement.dataset.intro="skip"}`;

// The loader's own styles render with it, so it works on the very first paint
// without waiting on (or being stale in) the global stylesheet. Shown only
// while html[data-intro="play"] and the intro is not done; the failsafe hides
// it if JS never runs.
const styles = `
.loader{display:none}
html[data-intro="play"]:not([data-intro-state="done"]) .loader{position:fixed;inset:0;z-index:100;display:block;animation:loader-failsafe 0s linear 12s forwards}
html[data-intro="play"]:not([data-intro-state]){overflow:hidden}
.loader-stage{position:absolute;inset:0;overflow:hidden;background:#25282b;color:#f1ede4}
.loader-content{position:absolute;inset:0;transition:opacity .35s ease,transform .6s cubic-bezier(.22,1,.36,1)}
.loader[data-state="exit"] .loader-content{opacity:0;transform:scale(.97)}
.loader[data-state="reveal"] .loader-stage{visibility:hidden}
.loader-part{transform-box:fill-box;transform:scale(0)}
.loader-setout path,.loader-ghost path{stroke-dasharray:1;stroke-dashoffset:1;animation:loader-draw 1.1s cubic-bezier(.22,1,.36,1) forwards}
.loader-ghost path:nth-child(2){animation-delay:.15s}
.loader-ghost path:nth-child(3){animation-delay:.3s}
.loader-ghost path:nth-child(4){animation-delay:.45s}
.loader-wipe{position:absolute;inset:0;background:#c8f169;clip-path:inset(50% 50% 50% 50%);transition:transform .85s cubic-bezier(.76,0,.24,1)}
.loader[data-state="reveal"] .loader-wipe{transform:translateY(-101%)}
@keyframes loader-draw{to{stroke-dashoffset:0}}
@keyframes loader-failsafe{to{visibility:hidden}}
`;

/** The loader only plays on a full page load, not when navigating back to the home page. */
let played = false;

const MIN_MS = 2000;
const MAX_MS = 7000;

const stages: [number, string][] = [
  [0, "Setting out the grid"],
  [0.04, "Casting the foundation"],
  [0.24, "Erecting the column"],
  [0.52, "Fixing the cantilever"],
  [0.78, "Connecting the hidden member"],
  [0.97, "Structure verified"],
];

const seg = (p: number, from: number, to: number) => Math.min(1, Math.max(0, (p - from) / (to - from)));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Homepage loader. The Cantilever F is built part by part as the page
 * actually loads (eager images, fonts, window load), never faster than
 * MIN_MS. When it completes, the lime member grows to fill the screen and
 * lifts away to reveal the hero, which starts on the "intro:done" event.
 */
export function HomeIntro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const doc = document.documentElement;
    const el = root.current;
    if (played || doc.dataset.intro !== "play" || !el) {
      doc.dataset.intro = "skip";
      doc.dataset.introState = "done";
      return;
    }
    const q = <T extends Element>(s: string) => el.querySelector<T>(s)!;
    const counter = q<HTMLElement>("[data-counter]");
    const bar = q<HTMLElement>("[data-bar]");
    const status = q<HTMLElement>("[data-status]");
    const base = q<SVGElement>("[data-part='base']");
    const column = q<SVGElement>("[data-part='column']");
    const arm = q<SVGElement>("[data-part='arm']");
    const member = q<SVGElement>("[data-part='lime']");
    const wipe = q<HTMLElement>("[data-wipe]");

    // Real progress: images the page asked for up front, fonts, and the load event.
    const eager = Array.from(document.images).filter((img) => img.loading !== "lazy");
    let fontsReady = false;
    let loaded = document.readyState === "complete";
    document.fonts?.ready.then(() => void (fontsReady = true));
    const onLoad = () => void (loaded = true);
    window.addEventListener("load", onLoad, { once: true });

    const render = (p: number) => {
      counter.textContent = String(Math.round(p * 100)).padStart(3, "0");
      bar.style.transform = `scaleX(${p})`;
      base.style.transform = `scaleX(${ease(seg(p, 0.04, 0.24))})`;
      column.style.transform = `scaleY(${ease(seg(p, 0.24, 0.52))})`;
      arm.style.transform = `scaleX(${ease(seg(p, 0.52, 0.76))})`;
      const k = ease(seg(p, 0.78, 0.95));
      member.style.transform = `translateX(${(1 - k) * 90}px)`;
      member.style.opacity = String(k);
      const label = stages.reduce((found, [at, text]) => (p >= at ? text : found), stages[0][1]);
      if (status.textContent !== label) status.textContent = label;
    };

    const timers: number[] = [];
    const exit = () => {
      el.dataset.state = "exit";
      // The wipe starts as the lime member, then grows to the whole screen…
      const m = member.getBoundingClientRect();
      wipe.style.clipPath = `inset(${m.top}px ${innerWidth - m.right}px ${innerHeight - m.bottom}px ${m.left}px)`;
      wipe.getBoundingClientRect();
      wipe.style.transition = "clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1)";
      wipe.style.clipPath = "inset(0px 0px 0px 0px)";
      // …then lifts away, revealing the page; the hero begins as it does.
      timers.push(
        window.setTimeout(() => {
          played = true;
          el.dataset.state = "reveal";
          doc.dataset.introState = "reveal";
          window.dispatchEvent(new Event("intro:done"));
        }, 820),
        window.setTimeout(() => (doc.dataset.introState = "done"), 1750),
      );
    };

    const start = performance.now();
    let shown = 0;
    let frame = 0;
    const tick = (now: number) => {
      const done = eager.length ? eager.filter((img) => img.complete).length / eager.length : 1;
      const real = loaded ? 1 : Math.min(0.95, 0.2 + 0.6 * done + (fontsReady ? 0.15 : 0));
      const target = now - start > MAX_MS ? 1 : Math.min(real, (now - start) / MIN_MS);
      shown += (target - shown) * 0.09;
      if (target - shown < 0.002) shown = target;
      render(shown);
      if (shown >= 1) exit();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", onLoad);
      // Dev StrictMode remounts reuse this node and simply restart the loader;
      // a real unmount (leaving the page mid-load) must release the page.
      window.setTimeout(() => {
        if (el.isConnected) return;
        doc.dataset.intro = "skip";
        doc.dataset.introState = "done";
      }, 0);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <script type={typeof window === "undefined" ? "text/javascript" : "text/plain"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: decide }} />
      <div ref={root} className="loader" aria-hidden="true">
        <div className="loader-stage">
          <div className="bg-blueprint-dark absolute inset-0" />

          <div className="loader-content">
            <p className="absolute left-5 top-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-300 sm:left-8 sm:top-7">
              Formscape Global
              <span className="mt-1 block text-steel-500">Rethinking structural engineering</span>
            </p>
            <p className="absolute right-5 top-5 hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400 sm:right-8 sm:top-7 sm:block">
              15.4909° N · 73.8278° E
            </p>

            <div className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-8">
                <svg viewBox="-60 -40 360 380" className="h-[min(42vh,20rem)] w-auto overflow-visible">
                  <g className="loader-setout stroke-steel-500" strokeWidth="1" fill="none">
                    <path d="M-60 302H300" pathLength={1} />
                    <path d="M62 -40V340" pathLength={1} />
                  </g>
                  <g className="loader-ghost stroke-lime/40" strokeWidth="1.25" fill="none">
                    <path d="M0 291H126V302H0Z" pathLength={1} />
                    <path d="M27 0H98V279H27Z" pathLength={1} />
                    <path d="M98 0H240V29L98 58Z" pathLength={1} />
                    <path d="M115 120H219V169H115Z" pathLength={1} />
                  </g>
                  <path data-part="base" d="M0 291H126V302H0Z" className="loader-part fill-steel-400 [transform-origin:0%_50%]" />
                  <path data-part="column" d="M27 0H98V279H27Z" className="loader-part fill-paper [transform-origin:50%_100%]" />
                  <path data-part="arm" d="M98 0H240V29L98 58Z" className="loader-part fill-paper [transform-origin:0%_0%]" />
                  <path data-part="lime" d="M115 120H219V169H115Z" className="fill-lime opacity-0" />
                </svg>
                <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-300">
                  <span className="size-1.5 animate-pulse bg-lime" />
                  <span data-status>Setting out the grid</span>
                </p>
              </div>
            </div>

            <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-7">
              <div className="flex items-end justify-between gap-6">
                <p className="pb-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">Loading the model</p>
                <p className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.8] tracking-[-0.05em] text-paper tabular-nums">
                  <span data-counter>000</span>
                  <span className="text-[0.3em] text-lime">%</span>
                </p>
              </div>
              <div className="relative mt-5 h-px bg-white/15">
                <div data-bar className="absolute inset-0 origin-left bg-lime" style={{ transform: "scaleX(0)" }} />
                {Array.from({ length: 11 }, (_, i) => (
                  <span key={i} className="absolute -top-1 h-2 w-px bg-white/25" style={{ left: `${i * 10}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div data-wipe className="loader-wipe" />
      </div>
    </>
  );
}
