"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { testimonials } from "@/content/company";
import { useNearViewport } from "@/lib/defer";
import { TestimonialCard } from "./TestimonialCard";

/** Prerendered static cards (crawlable, no layout shift) shown until the carousel loads. */
function StaticTestimonials() {
  return (
    <div>
      <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {testimonials.slice(0, 2).map((t, i) => (
          <li key={i} className={i === 1 ? "hidden lg:block" : undefined}>
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
      <div className="mt-8 h-12" aria-hidden="true" />
    </div>
  );
}

const Carousel = dynamic(() => import("./Testimonials"), { ssr: false, loading: StaticTestimonials });

/** Swiper is fetched only as the section approaches the viewport. */
export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearViewport(ref, "600px");
  return <div ref={ref}>{near ? <Carousel items={testimonials} /> : <StaticTestimonials />}</div>;
}
