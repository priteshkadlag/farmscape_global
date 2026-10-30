"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollScene } from "@/lib/scroll-scene";

export type ReelItem = {
  slug: string;
  name: string;
  image: { src: string; alt: string };
  meta: string;
  credit?: string;
};

// Clip tweens always state both ends: browsers shorten a computed inset() (e.g.
// "inset(30% 34%)"), which would interpolate into a lopsided frame.
const CARD = "inset(30% 34% 30% 34%)";
const FULL = "inset(0% 0% 0% 0%)";

/**
 * Scene 4 — "The reel". Each project opens from a small card to the full
 * frame, graded black and white until it lands, then colour returns — the
 * building, unfiltered. Its name slides through the frame in outline.
 */
export function WorkReel({ items }: { items: ReelItem[] }) {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, ({ gsap }, el) => {
    const frames = gsap.utils.toArray<HTMLElement>("[data-frame]", el);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      el.dataset.ready = "";
      el.dataset.headerOverlay = "";
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el.querySelector("[data-stage]"),
          start: "top top",
          end: `+=${frames.length * 120}%`,
          pin: true,
          scrub: 0.7,
          refreshPriority: -3,
        },
      });

      frames.forEach((frame, i) => {
        const q = gsap.utils.selector(frame);
        const last = i === frames.length - 1;
        const s = i;
        if (i === 0) {
          tl.fromTo(q("[data-clip]"), { clipPath: CARD }, { clipPath: FULL, duration: 0.6, ease: "power2.inOut" }, s);
        } else {
          tl.fromTo(q("[data-clip]"), { clipPath: "inset(100% 34% 0% 34%)" }, { clipPath: CARD, duration: 0.3, ease: "power2.out" }, s - 0.05)
            .fromTo(q("[data-clip]"), { clipPath: CARD }, { clipPath: FULL, duration: 0.5, ease: "power2.inOut", immediateRender: false }, s + 0.25)
            .to(frames[i - 1].querySelector("[data-clip]"), { scale: 0.92, duration: 0.6 }, s)
            .to(frames[i - 1].querySelector("[data-shade]"), { opacity: 0.75, duration: 0.6 }, s);
        }
        tl.fromTo(q("[data-img]"), { scale: 1.35 }, { scale: 1, duration: 0.9 }, s)
          .fromTo(q("[data-img]"), { filter: "grayscale(1) contrast(1.15)" }, { filter: "grayscale(0) contrast(1)", duration: 0.3 }, s + 0.55)
          // A slow drift across the frame, not a race.
          .fromTo(q("[data-title]"), { x: "5vw" }, { x: "-5vw", duration: 1 }, s)
          .fromTo(q("[data-title]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, s + 0.12)
          .fromTo(q("[data-meta]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.15, ease: "power2.out" }, s + 0.6)
          .to("[data-count]", { yPercent: (-100 / frames.length) * i, duration: 0.2, ease: "power2.inOut" }, s + 0.5);
        if (!last) {
          tl.to(q("[data-title]"), { autoAlpha: 0, duration: 0.1 }, s + 0.9).to(q("[data-meta]"), { autoAlpha: 0, duration: 0.1 }, s + 0.9);
        }
      });
      tl.to({}, { duration: 0.35 });

      return () => {
        delete el.dataset.ready;
        delete el.dataset.headerOverlay;
      };
    });

    mm.add("(max-width: 1023px)", () => {
      frames.forEach((frame) => {
        const q = gsap.utils.selector(frame);
        gsap
          .timeline({ scrollTrigger: { trigger: frame, start: "top 80%" } })
          .fromTo(q("[data-clip]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: FULL, duration: 1.1, ease: "power3.inOut" })
          .fromTo(q("[data-img]"), { scale: 1.25, filter: "grayscale(1)" }, { scale: 1, filter: "grayscale(0)", duration: 1.4, ease: "power2.out" }, 0);
      });
    });

    return () => mm.revert();
  });

  return (
    <section ref={root} className="group on-dark relative bg-ink text-paper" aria-labelledby="work-title">
      <div data-stage className="relative py-24 sm:py-32 group-data-ready:h-svh group-data-ready:overflow-hidden group-data-ready:py-0">
        <div className="container-site relative z-30 group-data-ready:pointer-events-none group-data-ready:absolute group-data-ready:inset-x-0 group-data-ready:top-[calc(var(--header-h)+2rem)] group-data-ready:[text-shadow:0_2px_30px_rgb(0_0_0/0.5)]">
          <p className="eyebrow mb-5 flex items-center gap-3 text-lime">
            <span className="text-steel-400">02</span>
            <span className="h-px w-8 bg-lime/60" aria-hidden="true" />
            Selected work
          </p>
          <h2 id="work-title" className="display-lg group-data-ready:text-[clamp(1.4rem,2.1vw,2rem)]">
            Proof, not promises.
          </h2>
        </div>

        <ol className="container-site mt-14 grid gap-16 sm:grid-cols-2 group-data-ready:absolute group-data-ready:inset-0 group-data-ready:m-0 group-data-ready:block group-data-ready:max-w-none group-data-ready:p-0">
          {items.map((item, i) => (
            <li key={item.slug} data-frame className="relative group-data-ready:absolute group-data-ready:inset-0">
              <div data-clip className="relative aspect-[4/3] overflow-hidden bg-graphite will-change-[clip-path] group-data-ready:absolute group-data-ready:inset-0 group-data-ready:aspect-auto">
                <div data-img className="absolute inset-0 will-change-transform">
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 100vw, (min-width: 640px) 50vw, 100vw" quality={75} className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/40" aria-hidden="true" />
                <div data-shade className="absolute inset-0 bg-ink opacity-0" aria-hidden="true" />
              </div>

              <h3
                data-title
                className="mt-5 font-display text-2xl font-semibold tracking-tight group-data-ready:pointer-events-none group-data-ready:absolute group-data-ready:left-1/2 group-data-ready:top-1/2 group-data-ready:z-10 group-data-ready:mt-0 group-data-ready:w-[86vw] group-data-ready:-translate-x-1/2 group-data-ready:-translate-y-1/2 group-data-ready:text-center group-data-ready:text-balance group-data-ready:text-[clamp(3rem,6.5vw,6.5rem)] group-data-ready:font-extrabold group-data-ready:uppercase group-data-ready:leading-[0.95] group-data-ready:tracking-[-0.03em] group-data-ready:text-white group-data-ready:[text-shadow:0_4px_60px_rgb(0_0_0/0.45)]"
              >
                {item.name}
              </h3>

              <div data-meta className="mt-2 group-data-ready:absolute group-data-ready:bottom-10 group-data-ready:left-10 group-data-ready:z-20 group-data-ready:mt-0 group-data-ready:max-w-md">
                <p className="hidden font-display text-3xl font-semibold tracking-tight group-data-ready:block">{item.name}</p>
                <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-steel-300">{item.meta}</p>
                {item.credit && <p className="mt-1 text-sm text-steel-300">{item.credit}</p>}
                <Link
                  href={`/projects/${item.slug}`}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-lime underline-offset-4 hover:underline"
                >
                  View project <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">: {item.name}</span>
                </Link>
              </div>
              <span className="sr-only">
                Project {i + 1} of {items.length}
              </span>
            </li>
          ))}
        </ol>

        {/* Frame counter and exit */}
        <div className="absolute bottom-10 right-28 z-20 hidden items-end gap-8 group-data-ready:flex">
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-steel-300 hover:text-lime">
            All projects <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <p className="flex items-baseline font-display text-5xl font-extrabold leading-none tabular-nums" aria-hidden="true">
            <span className="relative inline-block h-[1em] overflow-hidden">
              <span data-count className="flex flex-col">
                {items.map((_, i) => (
                  <span key={i} className="h-[1em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </span>
            </span>
            <span className="ml-2 text-2xl text-steel-400">/ {String(items.length).padStart(2, "0")}</span>
          </p>
        </div>

        <div className="mt-16 flex justify-center group-data-ready:hidden">
          <Link href="/projects" className="inline-flex min-h-12 items-center gap-2 border border-white/30 px-6 font-medium hover:border-white hover:bg-white hover:text-ink">
            See all projects <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
