import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/** Numbered eyebrow + heading block used to open every section. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  dark,
  align = "left",
  className,
  id,
  as: H = "h2",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "split";
  className?: string;
  id?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn(align === "split" ? "grid gap-8 lg:grid-cols-12 lg:items-end" : "max-w-3xl", className)}>
      <Reveal className={align === "split" ? "lg:col-span-7" : undefined}>
        <p className={cn("eyebrow mb-5 flex items-center gap-3", dark ? "text-brand-300" : "text-brand")}>
          {index && <span className={dark ? "text-steel-400" : "text-steel-500"}>{index}</span>}
          <span className={cn("h-px w-8", dark ? "bg-brand-300/60" : "bg-brand/50")} aria-hidden="true" />
          {eyebrow}
        </p>
        <H id={id} className={cn("display-lg text-balance", dark ? "text-paper" : "text-ink")}>
          {title}
        </H>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className={align === "split" ? "lg:col-span-5" : "mt-6"}>
          <div className={cn("max-w-xl text-lg leading-relaxed", dark ? "text-steel-300" : "text-steel-600")}>{intro}</div>
        </Reveal>
      )}
    </div>
  );
}

/** Small technical annotation, e.g. "IS 456" or "SPAN 20 m". */
export function Annotation({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em]",
        dark ? "border-white/15 text-steel-300" : "border-ink/15 text-steel-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
