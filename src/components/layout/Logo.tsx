import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The Cantilever F (Poste and Co. identity, Oct 2026). The vertical is a
 * column, the top arm tapers like a real cantilever, and the lime middle arm
 * floats free on a connection you cannot see. Interim artwork drawn from the
 * approved concept until the final logo files are delivered.
 */
export function LogoMark({ light, className }: { light?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 240 302" className={className} aria-hidden="true" focusable="false">
      <path d="M27 0H240V29L98 58V279H27Z" fill={light ? "var(--color-paper)" : "var(--color-ink)"} />
      <path d="M115 120H219V169H115Z" fill="var(--color-lime)" />
      <path d="M0 291H126V302H0Z" fill="var(--color-steel-400)" />
    </svg>
  );
}

/** Formscape Global logo. `light` is the variant for dark backgrounds. */
export function Logo({ light, className }: { light?: boolean; className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center gap-3", className)} aria-label="Formscape Global — home">
      <LogoMark light={light} className="h-9 w-auto sm:h-10" />
      <span className={cn("flex flex-col leading-none", light ? "text-paper" : "text-ink")} aria-hidden="true">
        <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] sm:text-[1.3rem]">Formscape Global</span>
        <span className={cn("mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em]", light ? "text-steel-300" : "text-steel-500")}>
          Structural Engineering
        </span>
      </span>
    </Link>
  );
}
