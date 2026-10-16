"use client";

import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group inline-flex min-h-12 items-center gap-3 border border-white/20 bg-ink/70 px-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-steel-300 backdrop-blur-sm transition-colors hover:border-brand-300 hover:text-white focus-visible:border-brand-300"
      aria-label="Scroll back to the top of the page"
    >
      Back to top
      <span className="grid size-8 place-items-center bg-brand text-white transition-transform duration-300 group-hover:-translate-y-1">
        <ArrowUp className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </span>
    </button>
  );
}
