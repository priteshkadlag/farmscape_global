import { Quote } from "lucide-react";
import type { Testimonial } from "@/content/types";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col border border-ink/10 bg-white p-8 sm:p-10">
      <Quote className="size-8 text-brand" aria-hidden="true" />
      <blockquote className="mt-6 flex-1 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
        <p>“{t.quote}”</p>
      </blockquote>
      <figcaption className="mt-8 border-t border-ink/10 pt-5">
        <span className="block font-medium">{t.person ?? "Client testimonial"}</span>
        {(t.role || t.company) && <span className="text-sm text-steel-600">{[t.role, t.company].filter(Boolean).join(", ")}</span>}
      </figcaption>
    </figure>
  );
}
