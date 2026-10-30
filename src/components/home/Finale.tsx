"use client";

import { useRef } from "react";
import { Mail, Phone } from "lucide-react";
import { contact } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { padMasks, scramble, useScrollScene } from "@/lib/scroll-scene";

// The Cantilever F, part by part (same geometry as LogoMark).
const parts = {
  base: "M0 291H126V302H0Z",
  column: "M27 0H98V279H27Z",
  arm: "M98 0H240V29L98 58Z",
  lime: "M115 120H219V169H115Z",
};

const callouts = [
  { d: "M240 14L300 -30H372", x: 300, y: -40, label: "Cantilever" },
  { d: "M27 150H-40", x: -112, y: 146, label: "Column" },
  { d: "M63 302V346H140", x: 146, y: 350, label: "Foundation" },
  { d: "M219 145H300V200H372", x: 262, y: 222, label: "Hidden connection" },
];

/**
 * Scene 7 — "Finale". The Cantilever F is set out, built and load-tested:
 * blueprint, foundation, column, cantilever (which deflects under load and
 * recovers), then the lime member clicks onto its hidden connection. It stays
 * alive afterwards and leans toward the pointer. Static and complete without JS.
 */
export function Finale() {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, ({ gsap, SplitText }, el) => {
    const q = gsap.utils.selector(el);
    const labels = q("[data-label]");
    const lime = q("[data-part='lime']");

    const build = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none none" },
    });

    build
      // 1 · Setting out: the blueprint draws itself.
      .fromTo(q("[data-setout]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.inOut" })
      .fromTo(q("[data-ghost]"), { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.9 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: "power2.inOut" }, 0.2)
      // 2 · Foundation lands; the column rises from it.
      .fromTo(q("[data-part='base']"), { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.9)
      .fromTo(q("[data-part='base']"), { scaleY: 1.8, svgOrigin: "63 302" }, { scaleY: 1, duration: 0.5, ease: "bounce.out" }, 1.25)
      .fromTo(q("[data-part='column']"), { scaleY: 0, svgOrigin: "62 279" }, { scaleY: 1, duration: 0.8, ease: "expo.out" }, 1.4)
      // 3 · Cantilever extends, takes load, deflects and recovers.
      .fromTo(q("[data-part='arm']"), { scaleX: 0, svgOrigin: "98 0" }, { scaleX: 1, duration: 0.6, ease: "expo.out" }, 1.95)
      .fromTo(q("[data-load]"), { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.in" }, 2.35)
      .fromTo(q("[data-part='arm']"), { rotation: 0, svgOrigin: "98 0" }, { rotation: 7, duration: 0.18, ease: "power2.in" }, 2.7)
      .to(q("[data-part='arm']"), { rotation: 0, duration: 1.3, ease: "elastic.out(1.1, 0.28)" }, 2.88)
      .to(q("[data-load]"), { opacity: 0, y: -14, duration: 0.4, stagger: 0.05 }, 3.2)
      // 4 · The lime member clicks onto its hidden connection.
      .fromTo(lime, { x: 220, opacity: 0, filter: "blur(10px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "expo.out" }, 3.05)
      .fromTo(lime, { scale: 1.12, svgOrigin: "167 144" }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, 3.6)
      .fromTo(q("[data-pulse]"), { attr: { r: 20 }, opacity: 0.9 }, { attr: { r: 110 }, opacity: 0, duration: 1, ease: "power2.out" }, 3.6)
      .to(q("[data-ghost]"), { opacity: 0.22, duration: 0.6 }, 3.6)
      // 5 · Callouts draw and their labels decode.
      .fromTo(q("[data-leader]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, stagger: 0.1, ease: "power2.inOut" }, 3.7);
    labels.forEach((label, i) => build.add(scramble(gsap, label, callouts[i].label, 0.7), 3.85 + i * 0.1));

    // 6 · Copy: the headline rises letter by letter, then everything that follows it.
    const split = padMasks(SplitText.create(q("[data-headline]"), { type: "words,chars", mask: "words" }));
    const copy = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none none" } });
    copy
      .from(split.chars, { yPercent: 115, rotation: 8, duration: 1, stagger: 0.018, ease: "power4.out" })
      .fromTo(q("[data-underline]"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, 0.8)
      .from(q("[data-follow]"), { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.7)
      .from(q("[data-cta] > *"), { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.6)" }, 1)
      .fromTo(q("[data-sheen]"), { xPercent: 0 }, { xPercent: 400, duration: 1.1, ease: "power2.inOut" }, 1.6);

    // 7 · Alive afterwards: the member floats, the connection pulses, a scan line sweeps.
    const idle = gsap.timeline({ paused: true });
    idle
      .to(lime, { y: -6, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
      .fromTo(q("[data-pulse]"), { attr: { r: 20 }, opacity: 0.7 }, { attr: { r: 90 }, opacity: 0, duration: 1.6, ease: "power2.out", repeat: -1, repeatDelay: 1.8 }, 0.5)
      .fromTo(q("[data-scan]"), { attr: { x: -240 }, opacity: 0 }, { attr: { x: 400 }, opacity: 1, duration: 2.6, ease: "none", repeat: -1, repeatDelay: 2.4 }, 1);
    build.eventCallback("onComplete", () => void idle.play());

    // The figure leans toward a fine pointer.
    const figure = q("[data-figure]")[0];
    const rx = gsap.quickTo(figure, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(figure, "rotationY", { duration: 0.8, ease: "power3.out" });
    gsap.set(figure, { transformPerspective: 900 });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 16);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      idle.kill();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <section ref={root} className="on-dark relative overflow-hidden bg-ink py-28 text-paper sm:py-40" aria-labelledby="finale-title">
      <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
      <div className="container-site relative grid gap-16 lg:grid-cols-12 lg:items-center">
        <figure data-figure className="mx-auto w-full max-w-sm will-change-transform lg:col-span-5 lg:max-w-none" aria-hidden="true">
          <svg viewBox="-120 -70 520 450" className="h-auto w-full overflow-visible">
            <defs>
              <linearGradient id="finale-scan" x1="0" x2="1">
                <stop offset="0" stopColor="var(--color-lime)" stopOpacity="0" />
                <stop offset="0.5" stopColor="var(--color-lime)" stopOpacity="0.16" />
                <stop offset="1" stopColor="var(--color-lime)" stopOpacity="0" />
              </linearGradient>
              <clipPath id="finale-clip">
                <rect x="-120" y="-70" width="520" height="450" />
              </clipPath>
            </defs>

            {/* Setting out: ground line and column centreline */}
            <g className="stroke-steel-500" strokeWidth="1" fill="none">
              <path data-setout d="M-100 302H380" pathLength={1} />
              <path data-setout d="M62 -60V330" pathLength={1} />
            </g>
            {/* Blueprint ghost of every part */}
            <g className="stroke-lime" strokeWidth="1.25" fill="none" opacity="0.22">
              {Object.entries(parts).map(([k, d]) => (
                <path key={k} data-ghost d={d} pathLength={1} />
              ))}
            </g>

            <path data-part="base" d={parts.base} className="fill-steel-400" />
            <path data-part="column" d={parts.column} className="fill-paper" />
            <path data-part="arm" d={parts.arm} className="fill-paper" />
            <circle data-pulse cx="167" cy="144" r="20" className="stroke-lime" strokeWidth="1.5" fill="none" opacity="0" />
            <path data-part="lime" d={parts.lime} className="fill-lime" />

            {/* Load on the cantilever tip */}
            <g className="stroke-lime" strokeWidth="2" strokeLinecap="round" fill="none">
              {[176, 206, 236].map((x) => (
                <path key={x} data-load d={`M${x} -56V-14M${x - 6} -22L${x} -12L${x + 6} -22`} opacity="0" />
              ))}
            </g>

            <rect data-scan x="-240" y="-70" width="120" height="450" fill="url(#finale-scan)" clipPath="url(#finale-clip)" opacity="0" />

            <g className="stroke-steel-400" strokeWidth="1" fill="none">
              {callouts.map((c) => (
                <path key={c.label} data-leader d={c.d} pathLength={1} />
              ))}
            </g>
            {callouts.map((c) => (
              <text key={c.label} data-label x={c.x} y={c.y} className="fill-steel-300 font-mono text-[12px] uppercase tracking-[0.18em]">
                {c.label}
              </text>
            ))}
          </svg>
        </figure>

        <div className="lg:col-span-7 lg:pl-8">
          <p data-follow className="eyebrow mb-6 flex items-center gap-3 text-lime">
            <span className="h-px w-8 bg-lime/60" aria-hidden="true" />
            Start a project
          </p>
          <h2 id="finale-title" className="font-display text-[clamp(2.1rem,4.6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-balance">
            <span data-headline>Every structure begins with a conversation.</span>
            <span data-underline className="mt-4 block h-1 w-40 origin-left bg-lime" aria-hidden="true" />
          </h2>
          <p data-follow className="mt-8 max-w-xl text-xl leading-relaxed text-steel-300">
            Tell us what you’re building. We’ll show you what makes it possible.
          </p>
          <div data-cta className="mt-12 flex flex-wrap gap-3">
            <span className="relative inline-flex overflow-hidden">
              <ButtonLink href="/request-a-quote" variant="accent" magnetic>
                Request a Quote
              </ButtonLink>
              <span
                data-sheen
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                aria-hidden="true"
              />
            </span>
            <ButtonLink href={contact.phoneHref} variant="outline-light" icon={<Phone className="size-4" />}>
              {contact.phoneDisplay}
            </ButtonLink>
            <ButtonLink href={`mailto:${contact.email}`} variant="outline-light" icon={<Mail className="size-4" />}>
              Email
            </ButtonLink>
            <ButtonLink href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="outline-light" icon={<WhatsAppIcon className="size-4" />}>
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
