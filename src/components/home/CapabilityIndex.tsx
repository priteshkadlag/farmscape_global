"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useScrollScene } from "@/lib/scroll-scene";

export type IndexItem = { id: string; title: string; href: string; summary: string; image: { src: string; alt: string } };

/** Degrees between neighbouring rows on the drum. */
const STEP = 22;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Scene 5 — "Selector". On large screens the services sit on a drum that
 * turns one notch per scroll step, like a combination dial; the service in the
 * lime window is selected, and its photograph wipes up beside it with its
 * summary. Elsewhere (and without motion) it is a plain index of links.
 */
export function CapabilityIndex({ items }: { items: IndexItem[] }) {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, ({ gsap }, el) => {
    const rows = gsap.utils.toArray<HTMLElement>("[data-row]", el);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      el.dataset.ready = "";
      const shots = gsap.utils.toArray<HTMLElement>("[data-shot]", el);
      const details = gsap.utils.toArray<HTMLElement>("[data-detail]", el);
      const count = el.querySelector<HTMLElement>("[data-count]")!;
      const big = el.querySelector<HTMLElement>("[data-big]")!;
      const last = rows.length - 1;

      // Each row turns about an axis set back by the drum's radius.
      const radius = () => rows[0].offsetHeight / 2 / Math.tan(((STEP / 2) * Math.PI) / 180);
      const place = () => rows.forEach((row) => gsap.set(row, { yPercent: -50, transformOrigin: `50% 50% ${-radius()}px` }));
      place();

      let active = -1;
      const render = (p: number) => {
        const pos = p * last;
        rows.forEach((row, i) => {
          const d = pos - i;
          const hidden = Math.abs(d) * STEP > 80;
          gsap.set(row, { rotationX: d * STEP, opacity: hidden ? 0 : Math.max(0.08, 1 - Math.abs(d) * 0.3), visibility: hidden ? "hidden" : "visible" });
        });
        shots.forEach((shot, i) => {
          const t = i === 0 ? 1 : gsap.utils.clamp(0, 1, (pos - i + 0.55) / 0.55);
          gsap.set(shot, { clipPath: `inset(${((1 - t) * 100).toFixed(2)}% 0% 0% 0%)` });
          gsap.set(shot.firstElementChild, { scale: 1.25 - 0.25 * t });
        });
        const now = Math.round(pos);
        if (now !== active) {
          active = now;
          rows.forEach((r, i) => r.toggleAttribute("data-active", i === now));
          details.forEach((d, i) => d.toggleAttribute("data-active", i === now));
          count.textContent = pad(now + 1);
          big.textContent = pad(now + 1);
          gsap.fromTo(big, { yPercent: 18, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: true });
        }
      };

      const dial = { p: 0 };
      gsap.to(dial, {
        p: 1,
        ease: "none",
        onUpdate: () => render(dial.p),
        scrollTrigger: {
          trigger: el.querySelector("[data-stage]"),
          start: "top top",
          end: `+=${items.length * 42}%`,
          pin: true,
          scrub: 0.6,
          refreshPriority: -4,
          onRefresh: place,
          // Settle on a service, like a dial clicking into its detent.
          snap: { snapTo: 1 / last, duration: { min: 0.2, max: 0.55 }, delay: 0.04, ease: "power2.inOut" },
        },
      });
      render(0);

      return () => {
        delete el.dataset.ready;
        rows.forEach((r) => r.removeAttribute("data-active"));
        details.forEach((d) => d.removeAttribute("data-active"));
      };
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.from(el.querySelectorAll("[data-row-text]"), {
        yPercent: 105,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: { trigger: el.querySelector("[data-list]"), start: "top 80%" },
      });
    });

    return () => mm.revert();
  });

  return (
    <section ref={root} className="group on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="capabilities-title">
      <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
      <div
        data-stage
        className="container-site relative py-24 sm:py-32 lg:group-data-ready:flex lg:group-data-ready:h-svh lg:group-data-ready:flex-col lg:group-data-ready:pb-12 lg:group-data-ready:pt-[calc(var(--header-h)+2rem)]"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 flex items-center gap-3 text-lime">
              <span className="text-steel-400">03</span>
              <span className="h-px w-8 bg-lime/60" aria-hidden="true" />
              What we do
            </p>
            <h2 id="capabilities-title" className="display-xl text-balance lg:group-data-ready:text-[clamp(1.75rem,2.8vw,2.6rem)]">
              One practice. Every material.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-steel-300 lg:col-span-5">
            Concrete, steel or both — designed, detailed and checked, from the first sketch to support on site.
          </p>
        </div>

        <div className="mt-16 sm:mt-20 lg:group-data-ready:mt-8 lg:group-data-ready:grid lg:group-data-ready:min-h-0 lg:group-data-ready:flex-1 lg:group-data-ready:grid-cols-12 lg:group-data-ready:gap-12">
          {/* The drum */}
          <div className="relative lg:group-data-ready:col-span-7 lg:group-data-ready:h-full">
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden h-[clamp(3.75rem,5.6vw,5.25rem)] -translate-y-1/2 border-y border-lime/60 lg:group-data-ready:block"
              aria-hidden="true"
            >
              <span className="absolute -top-px left-0 h-3 w-px bg-lime" />
              <span className="absolute -bottom-px right-0 h-3 w-px bg-lime" />
              <span className="absolute -top-6 left-0 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-lime">Selected</span>
            </div>

            <ol
              data-list
              className="lg:group-data-ready:relative lg:group-data-ready:h-full lg:group-data-ready:perspective-[1600px] lg:group-data-ready:mask-[linear-gradient(transparent,#000_22%,#000_78%,transparent)]"
            >
              {items.map((item, i) => (
                <li
                  key={item.id}
                  data-row
                  className="group/row relative border-t border-white/15 lg:group-data-ready:absolute lg:group-data-ready:inset-x-0 lg:group-data-ready:top-1/2 lg:group-data-ready:flex lg:group-data-ready:h-[clamp(3.75rem,5.6vw,5.25rem)] lg:group-data-ready:items-center lg:group-data-ready:border-0 lg:group-data-ready:backface-hidden"
                >
                  <Link
                    href={item.href}
                    className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors duration-300 hover:text-lime group-data-active/row:text-lime sm:grid-cols-[4rem_1fr_auto] sm:py-6 lg:group-data-ready:py-0"
                  >
                    <span className="font-mono text-xs text-steel-500 group-data-active/row:text-lime">{pad(i + 1)}</span>
                    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                      <span data-row-text className="block font-display text-[clamp(1.4rem,2.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] lg:group-data-ready:whitespace-nowrap lg:group-data-ready:text-[clamp(1.35rem,2.1vw,2.1rem)]">
                        {item.title}
                      </span>
                      <span className="mt-2 block text-base text-steel-400 lg:hidden">{item.summary}</span>
                    </span>
                    <ArrowUpRight
                      className="size-6 text-steel-500 transition-transform duration-500 ease-[var(--ease-precise)] group-data-active/row:rotate-45 group-data-active/row:text-lime sm:size-8"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
              <li className="h-px bg-white/15 lg:group-data-ready:hidden" aria-hidden="true" />
            </ol>
          </div>

          {/* The selected service */}
          <div className="relative hidden lg:group-data-ready:col-span-5 lg:group-data-ready:flex lg:group-data-ready:min-h-0 lg:group-data-ready:flex-col" aria-hidden="true">
            <span
              data-big
              className="text-outline pointer-events-none absolute -left-20 top-4 z-20 select-none font-display text-[clamp(4.5rem,7.5vw,7.5rem)] font-extrabold leading-none text-lime"
            >
              01
            </span>
            <div className="relative z-10 min-h-0 flex-1 overflow-hidden bg-graphite">
              {items.map((item) => (
                <div key={item.id} data-shot className="absolute inset-0 will-change-[clip-path]">
                  <div className="absolute inset-0 will-change-transform">
                    <Image src={item.image.src} alt="" fill sizes="40vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                </div>
              ))}
              <p className="absolute bottom-4 left-4 z-10 bg-lime px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink">
                <span data-count>01</span> / {pad(items.length)}
              </p>
            </div>
            <div className="relative z-10 mt-6 grid">
              {items.map((item) => (
                <div
                  key={item.id}
                  data-detail
                  className="pointer-events-none translate-y-3 opacity-0 transition-[opacity,translate] duration-500 ease-[var(--ease-precise)] [grid-area:1/1] data-active:pointer-events-auto data-active:translate-y-0 data-active:opacity-100"
                >
                  <p className="max-w-md leading-relaxed text-steel-300">{item.summary}</p>
                  <Link
                    href={item.href}
                    tabIndex={-1}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-lime hover:underline"
                  >
                    Explore {item.title} <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
