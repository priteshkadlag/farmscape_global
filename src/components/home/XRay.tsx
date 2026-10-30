"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { media } from "@/content/media";
import { useScrollScene } from "@/lib/scroll-scene";
import { ConnectionDrawing } from "./ConnectionDrawing";

const photo = media(
  "/media/services/fabrication-drawings-steel-roof.jpg",
  "Steel rafters and purlins bolted to concrete columns on a roof under construction",
);

/**
 * Scene 2 — "X-Ray". A lens follows the pointer and cuts through the finished
 * photograph to the eaves connection drawn beneath it; scrolling widens the lens
 * until the drawing is all that remains. People see the building; we see what
 * holds it up. Without JS (or with reduced motion) it reads as photo + statement.
 */
export function XRay() {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, ({ gsap }, el) => {
    const stage = el.querySelector<HTMLElement>("[data-stage]")!;
    const cut = el.querySelector<HTMLElement>("[data-photo]")!;
    const lens = el.querySelector<HTMLElement>("[data-lens]")!;
    const readout = el.querySelector<HTMLElement>("[data-readout]")!;
    el.dataset.ready = "";
    el.dataset.headerOverlay = "";

    // Lens position eases toward the pointer; idles in a slow drift until the pointer arrives.
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0, idle: true };
    const centre = () => {
      const r = stage.getBoundingClientRect();
      pos.x = target.x = r.width * 0.62;
      pos.y = target.y = r.height * 0.48;
    };
    centre();
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      target.idle = false;
    };
    const tick = (time: number) => {
      const tx = target.idle ? target.x + Math.sin(time * 0.6) * 40 : target.x;
      const ty = target.idle ? target.y + Math.cos(time * 0.45) * 26 : target.y;
      pos.x += (tx - pos.x) * 0.12;
      pos.y += (ty - pos.y) * 0.12;
      cut.style.setProperty("--x", `${pos.x}px`);
      cut.style.setProperty("--y", `${pos.y}px`);
      lens.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      readout.textContent = `X ${String(Math.round(pos.x)).padStart(4, "0")} · Y ${String(Math.round(pos.y)).padStart(4, "0")}`;
    };
    stage.addEventListener("pointermove", onMove);
    gsap.ticker.add(tick);

    const cover = () => `${Math.hypot(stage.clientWidth, stage.clientHeight) * 1.05}px`;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 0.8,
        refreshPriority: -1,
        invalidateOnRefresh: true,
      },
    });
    const out = { autoAlpha: 0, y: -50, filter: "blur(10px)", duration: 0.08, ease: "power2.in" };
    const into = (at: number) => [
      { autoAlpha: 0, y: 50, filter: "blur(10px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.08, ease: "power2.out" },
      at,
    ] as const;

    tl.fromTo(cut, { "--r": "0px" }, { "--r": "170px", duration: 0.12, ease: "power2.out" }, 0)
      .fromTo(lens, { "--ring": 0 }, { "--ring": 1, duration: 0.12 }, 0)
      .to("[data-line='1']", out, 0.22)
      .fromTo("[data-line='2']", ...into(0.3))
      .to(cut, { "--r": cover, duration: 0.36, ease: "power2.inOut" }, 0.34)
      .to(lens, { "--ring": 0, duration: 0.12 }, 0.4)
      .fromTo("[data-photo-img]", { scale: 1 }, { scale: 1.12, duration: 0.7 }, 0)
      .fromTo("[data-drawing]", { scale: 1.25 }, { scale: 1, duration: 0.7 }, 0)
      // The forces resolve in lime while the line about them is on screen.
      .fromTo("[data-force]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.12, stagger: 0.05 }, 0.36)
      .fromTo("[data-force-label]", { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.04 }, 0.44)
      .to("[data-line='2']", out, 0.62)
      .fromTo("[data-dim]", { opacity: 0 }, { opacity: 0.7, duration: 0.1 }, 0.66)
      .fromTo("[data-line='3']", ...into(0.72))
      .fromTo("[data-line='3'] [data-word]", { opacity: 0.12 }, { opacity: 1, stagger: 0.006, duration: 0.05 }, 0.74)
      .to({}, { duration: 0.06 }, 0.94);

    return () => {
      gsap.ticker.remove(tick);
      stage.removeEventListener("pointermove", onMove);
      delete el.dataset.ready;
      delete el.dataset.headerOverlay;
    };
  });

  const statement = "Our work is the part no one notices — and the reason everything else can stand.";
  const highlightFrom = statement.indexOf("the reason");

  return (
    <section ref={root} className="group on-dark relative bg-ink text-paper" aria-labelledby="xray-title">
      <h2 id="xray-title" className="sr-only">
        The intelligence behind the structure
      </h2>
      <div data-stage className="relative min-h-svh overflow-hidden group-data-ready:h-svh group-data-ready:cursor-crosshair">
        {/* What we see: the connection and the forces it resolves */}
        <div className="absolute inset-0 hidden bg-ink group-data-ready:block" aria-hidden="true">
          <div className="bg-blueprint-dark absolute inset-0" />
          <div data-drawing className="absolute inset-0 will-change-transform">
            {/* Phones are narrow, so the sheet slides left to keep the connection in frame */}
            <ConnectionDrawing className="absolute inset-0 h-full w-full overflow-visible max-sm:-translate-x-[62vw]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_45%,transparent_40%,rgb(37_40_43/0.85))]" />
          <div data-dim className="absolute inset-0 bg-ink opacity-0" />
        </div>

        {/* What people see: the finished photograph, with a hole cut by the lens */}
        <div data-photo className="xray-cut absolute inset-0">
          <div data-photo-img className="absolute inset-0 will-change-transform">
            <Image src={photo.src} alt={photo.alt} fill sizes="100vw" quality={75} className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/40" />
        </div>

        {/* Lens ring with crosshair */}
        <div data-lens className="xray-lens pointer-events-none absolute left-0 top-0 hidden group-data-ready:block" aria-hidden="true">
          <span className="absolute -left-[170px] -top-[170px] size-[340px] rounded-full border border-lime/70" />
          <span className="absolute -left-5 top-0 h-px w-10 bg-lime/80" />
          <span className="absolute -top-5 left-0 h-10 w-px bg-lime/80" />
          <span className="absolute left-[184px] top-[-6px] whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.18em] text-lime">
            Connection detail
          </span>
        </div>

        {/* Technical frame */}
        <p className="absolute left-4 top-[calc(var(--header-h)+1.5rem)] hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-300 sm:left-6 lg:left-10 group-data-ready:block">
          Detail 01 — Eaves connection
        </p>
        <p
          data-readout
          className="absolute right-4 top-[calc(var(--header-h)+1.5rem)] hidden max-sm:hidden! font-mono text-[0.65rem] tabular-nums tracking-[0.18em] text-steel-300 sm:right-6 lg:right-10 group-data-ready:block"
          aria-hidden="true"
        >
          X 0000 · Y 0000
        </p>

        <div className="container-site relative grid min-h-svh content-end gap-10 pb-24 pt-32 group-data-ready:pointer-events-none group-data-ready:h-full">
          <p data-line="1" className="display-xl max-w-4xl group-data-ready:[grid-area:1/1]">
            People see the building.
          </p>
          <p data-line="2" className="display-xl max-w-4xl text-lime group-data-ready:invisible group-data-ready:[grid-area:1/1]">
            We see the forces inside it.
          </p>
          <div data-line="3" className="max-w-5xl group-data-ready:pointer-events-auto group-data-ready:invisible group-data-ready:[grid-area:1/1]">
            <p className="font-display text-[clamp(1.6rem,3.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              {statement.split(" ").map((word, i, words) => {
                const offset = words.slice(0, i).join(" ").length + (i ? 1 : 0);
                return (
                  <span key={i} data-word className={offset >= highlightFrom ? "text-lime" : undefined}>
                    {word}{" "}
                  </span>
                );
              })}
            </p>
            <Link
              href="/about-us"
              className="mt-10 inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-steel-300 transition-colors hover:text-lime"
            >
              <span className="h-px w-10 bg-current" aria-hidden="true" />
              The people behind the practice
            </Link>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-6 left-4 hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-300 sm:left-6 lg:left-10 group-data-ready:pointer-fine:block">
          Move to look inside · Scroll to see it all
        </p>
      </div>
    </section>
  );
}
