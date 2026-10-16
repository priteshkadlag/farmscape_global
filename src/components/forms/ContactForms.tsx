"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { EnquiryForm } from "./EnquiryForm";

const tabs = [
  { id: "contact", label: "General enquiry" },
  { id: "quote", label: "Request a quote" },
] as const;

/** Contact page: switch between the general and the quote-request forms. */
export function ContactForms() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("contact");
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + 1) % tabs.length;
    setActive(tabs[n].id);
    refs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Form type" className="mb-8 inline-flex border border-ink/15 p-1">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${id}-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${id}-panel`}
            tabIndex={active === t.id ? 0 : -1}
            onKeyDown={(e) => onKey(e, i)}
            onClick={() => setActive(t.id)}
            className={cn("min-h-11 px-5 text-sm font-medium transition-colors", active === t.id ? "bg-ink text-paper" : "text-steel-600 hover:text-ink")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`}>
        <EnquiryForm key={active} kind={active} idPrefix={`contact-${active}`} />
      </div>
    </div>
  );
}
