"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Drawing } from "@/content/types";
import { cn } from "@/lib/cn";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

const tabs = [
  { id: "rcc", label: "RCC Details" },
  { id: "structural", label: "Structural Details" },
] as const;

export function DrawingViewer({ drawings }: { drawings: Drawing[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("rcc");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loadViewer, setLoadViewer] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const reduce = useReducedMotion();
  const list = drawings.filter((d) => d.set === tab);

  const onTabKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Drawing sets" className="flex border-b border-ink/15">
        {tabs.map((t, i) => {
          const selected = tab === t.id;
          const count = drawings.filter((d) => d.set === t.id).length;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(e) => onTabKey(e, i)}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative -mb-px flex min-h-14 items-center gap-3 px-5 text-sm font-medium transition-colors sm:px-8",
                selected ? "text-ink" : "text-steel-500 hover:text-ink",
              )}
            >
              {t.label}
              <span className="font-mono text-xs text-steel-500">{String(count).padStart(2, "0")}</span>
              {selected && <m.span layoutId={`${baseId}-underline`} className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" />}
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab}`} className="pt-10">
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((d, i) => (
              <li key={d.id}>
                <button
                  type="button"
                  onPointerEnter={() => setLoadViewer(true)}
                  onFocus={() => setLoadViewer(true)}
                  onClick={() => {
                    setLoadViewer(true);
                    setIndex(i);
                    setOpen(true);
                  }}
                  className="group block w-full text-left"
                >
                  <span className="relative block border border-ink/10 bg-white p-3 transition-shadow duration-300 group-hover:shadow-xl">
                    {/* object-contain: drawings are never cropped */}
                    <span className="relative block" style={{ aspectRatio: `${d.image.width} / ${d.image.height}` }}>
                      <Image src={d.image.src} alt={d.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-contain" />
                    </span>
                    <span className="absolute right-5 top-5 inline-flex size-10 items-center justify-center bg-ink text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 className="size-4" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="mt-3 flex items-center justify-between">
                    <span className="font-display font-semibold">{d.title}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-steel-500">Open viewer</span>
                  </span>
                </button>
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>

      {loadViewer && (
        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          index={index}
          onIndex={setIndex}
          images={list.map((d) => ({ ...d.image, title: d.title }))}
          download
          maxZoom={4}
        />
      )}
    </div>
  );
}
