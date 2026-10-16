"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import type { ImageAsset } from "@/content/types";

/**
 * YouTube facade: shows a custom poster and loads the privacy-enhanced
 * player only when the visitor chooses to play (never autoplays on load).
 */
export function CompanyVideo({ youtubeId, title, poster }: { youtubeId: string; title: string; poster: ImageAsset }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-graphite">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full text-left">
          <Image src={poster.src} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" aria-hidden="true" />
          <span className="bg-blueprint-dark absolute inset-0 opacity-60" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex size-20 items-center justify-center bg-paper text-ink transition-transform duration-300 group-hover:scale-110 sm:size-24">
              <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
              <span className="absolute -inset-3 border border-white/30" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute bottom-0 left-0 p-5 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-brand-300">Company film · 2 min</span>
            <span className="mt-2 block font-display text-xl font-semibold text-paper sm:text-2xl">Play: {title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
