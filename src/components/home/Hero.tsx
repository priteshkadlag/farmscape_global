"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { media } from "@/content/media";
import { whenIdle } from "@/lib/defer";

const heroImage = media(
  "/media/projects/structural-roof-mvr-bambolim-1.jpg",
  "Steel roof rafters and purlins on concrete columns — structural roof for MVR, Bambolim",
);

/**
 * Full-viewport hero. The headline reveal is CSS (never blocks LCP); GSAP is
 * loaded lazily for the structural linework and the scroll parallax.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const lines = el.querySelectorAll<SVGPathElement>("[data-draw]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((l) => (l.style.strokeDashoffset = "0"));
      el.querySelectorAll<SVGElement>("[data-note]").forEach((n) => (n.style.opacity = "1"));
      return;
    }

    let revert = () => {};
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        // When the home intro plays, the linework starts as the intro bays open.
        const introDelay = document.documentElement.dataset.intro === "play" ? 1.7 : 0;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 + introDelay });
        tl.to("[data-draw='grid']", { strokeDashoffset: 0, duration: 1.4, stagger: 0.06 })
          .to("[data-draw='frame']", { strokeDashoffset: 0, duration: 1.6, stagger: 0.12 }, "-=1")
          .to("[data-draw='dim']", { strokeDashoffset: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
          .to("[data-note]", { opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.4");

        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          gsap.to("[data-parallax='image']", {
            yPercent: 12,
            scale: 1.06,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
          });
          gsap.to("[data-parallax='lines']", {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
          });
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
    <section ref={root} className="on-dark relative isolate flex min-h-svh items-end overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <div data-parallax="image" className="absolute inset-0 -z-30 will-change-transform">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="object-cover object-[60%_40%]"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-ink via-ink/50 to-ink/10" aria-hidden="true" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-ink/75 via-ink/15 to-transparent" aria-hidden="true" />
      <div className="bg-blueprint-dark absolute inset-0 -z-10 opacity-70" aria-hidden="true" />

      {/* Structural linework overlay */}
      <svg
        data-parallax="lines"
        className="absolute inset-0 -z-10 h-full w-full text-brand-300/50"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <g strokeWidth="1" className="text-white/15" stroke="currentColor">
          {[180, 420, 660, 900, 1140, 1380].map((x) => (
            <path key={x} data-draw="grid" pathLength={1} className="hero-draw" d={`M${x} 0 V900`} />
          ))}
          {[150, 450, 750].map((y) => (
            <path key={y} data-draw="grid" pathLength={1} className="hero-draw" d={`M0 ${y} H1440`} />
          ))}
        </g>
        <g strokeWidth="1.25">
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

      <div className="container-site pb-24 pt-[calc(var(--header-h)+4rem)] sm:pb-28">
        <p className="eyebrow rise-in mb-8 flex items-center gap-3 text-brand-300" style={{ animationDelay: "calc(var(--intro-delay, 0s) + 0.1s)" }}>
          <span className="h-px w-10 bg-brand-300/70" aria-hidden="true" />
          Structural Engineering · Goa, India
        </p>
        <h1 id="hero-title" className="display-xl max-w-5xl">
          <span className="line-reveal">
            <span style={{ animationDelay: "calc(var(--intro-delay, 0s) + 0.15s)" }}>Engineering Structures.</span>
          </span>
          <span className="line-reveal text-brand-300">
            <span style={{ animationDelay: "calc(var(--intro-delay, 0s) + 0.3s)" }}>Shaping Possibilities.</span>
          </span>
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="rise-in max-w-xl text-lg leading-relaxed text-steel-300 lg:col-span-6" style={{ animationDelay: "calc(var(--intro-delay, 0s) + 0.2s)" }}>
            We work closely with architects and builders to turn architectural vision into safe, efficient and sustainable structural
            solutions — for projects across India.
          </p>
          <div className="rise-in flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" style={{ animationDelay: "calc(var(--intro-delay, 0s) + 0.3s)" }}>
            <ButtonLink href="/projects" variant="light" magnetic>
              Explore Projects
            </ButtonLink>
            <ButtonLink href="/request-a-quote" variant="outline-light" magnetic>
              Request a Quote
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-0 bg-brand-300" />
        </span>
      </div>
      <p className="absolute bottom-6 left-4 hidden font-mono text-[0.65rem] uppercase tracking-[0.16em] text-steel-400 sm:left-6 md:block lg:left-10">
        Structural roof — MVR, Bambolim
      </p>
    </section>
  );
}
