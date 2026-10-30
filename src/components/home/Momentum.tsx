"use client";

import Image from "next/image";
import { Fragment, useRef, type ReactNode } from "react";
import { m, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

export type MarqueeLogo = { name: string; src: string; alt: string; width: number; height: number };

/** Wraps `v` into [min, max) so four identical copies loop seamlessly. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * A band that drifts on its own and answers the scroll: faster as you scroll
 * faster, reversing with you, leaning into the motion.
 */
function Band({ speed, render, className }: { speed: number; render: (hidden: boolean) => ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const velocity = useSpring(useVelocity(useScroll().scrollY), { damping: 50, stiffness: 400 });
  // Scrolling nudges the band along (at most ~2× its drift), rather than whipping it past.
  const boost = useTransform(velocity, [-3000, 0, 3000], [-1.2, 0, 1.2]);
  const skewX = useTransform(velocity, [-3000, 0, 3000], [3, 0, -3]);
  const x = useTransform(base, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let step = direction.current * speed * (delta / 1000);
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    step += direction.current * step * b;
    base.set(base.get() + step);
  });

  return (
    <div className="overflow-hidden">
      <m.div className={cn("flex w-max", className)} style={{ x, skewX: reduce ? 0 : skewX }}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
            {render(copy > 0)}
          </div>
        ))}
      </m.div>
    </div>
  );
}

const words = ["Rethinking", "Structural", "Engineering"];

/** Scene 6 — "Momentum". The brand line and the people who trust it, in motion. */
export function Momentum({ logos }: { logos: MarqueeLogo[] }) {
  return (
    <section className="relative overflow-hidden bg-concrete-100 py-20 sm:py-28" aria-labelledby="clients-title">
      <Band
        speed={-0.9}
        className="bg-concrete-100"
        render={() =>
          words.map((w, i) => (
            <Fragment key={w}>
              <span
                className={cn(
                  "px-[0.25em] font-display text-[clamp(3rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-ink",
                  i === 1 && "text-outline",
                )}
              >
                {w}
              </span>
              {i === words.length - 1 && <LogoMark className="mx-[0.4em] h-[clamp(2.6rem,6.5vw,6rem)] w-auto shrink-0" />}
            </Fragment>
          ))
        }
      />

      <div className="container-site mt-16 flex flex-col gap-3 sm:mt-20 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 id="clients-title" className="eyebrow flex items-center gap-3 text-brand">
          <span className="h-px w-8 bg-brand/50" aria-hidden="true" />
          Trusted by
        </h2>
        <p className="text-steel-600">Developers, architects and industry across India.</p>
      </div>

      <div className="mt-8 border-y border-ink/10">
        <Band
          speed={0.7}
          className="bg-concrete-100"
          render={(hidden) =>
            logos.map((l) => (
              <span key={l.name} className="flex h-28 w-52 shrink-0 items-center justify-center border-r border-ink/10 px-8">
                <Image
                  src={l.src}
                  alt={hidden ? "" : l.alt}
                  width={l.width}
                  height={l.height}
                  sizes="160px"
                  className="max-h-12 w-auto object-contain mix-blend-multiply grayscale transition duration-300 hover:grayscale-0"
                />
              </span>
            ))
          }
        />
      </div>
    </section>
  );
}
