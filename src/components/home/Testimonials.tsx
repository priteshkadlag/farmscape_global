"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { Testimonial } from "@/content/types";
import { TestimonialCard } from "./TestimonialCard";

/** Swiper carousel — client-only, because Swiper reads the clock while rendering. */
export default function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const swiper = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const [edge, setEdge] = useState({ begin: true, end: false });
  const sync = (s: SwiperType) => {
    setActive(s.realIndex);
    setEdge({ begin: s.isBeginning, end: s.isEnd });
  };

  return (
    <div>
      <Swiper
        modules={[A11y, Keyboard]}
        onSwiper={(s) => {
          swiper.current = s;
          sync(s);
        }}
        onSlideChange={sync}
        onBreakpoint={sync}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 1024: { slidesPerView: 2, spaceBetween: 32 } }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{ containerMessage: "Client testimonials", slideRole: "group", itemRoleDescriptionMessage: "testimonial" }}
      >
        {items.map((t, i) => (
          <SwiperSlide key={i} className="h-auto!">
            <TestimonialCard t={t} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => swiper.current?.slidePrev()}
          disabled={edge.begin}
          className="inline-flex size-12 items-center justify-center border border-ink/20 transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          <span className="sr-only">Previous testimonial</span>
        </button>
        <button
          type="button"
          onClick={() => swiper.current?.slideNext()}
          disabled={edge.end}
          className="inline-flex size-12 items-center justify-center border border-ink/20 transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
          <span className="sr-only">Next testimonial</span>
        </button>
        <p className="ml-2 font-mono text-sm text-steel-600" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
