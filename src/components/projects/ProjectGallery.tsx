"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

const Lightbox = dynamic(() => import("@/components/media/Lightbox"), { ssr: false });

/** Project photo gallery; every image opens the shared full-screen viewer. */
export function ProjectGallery({ images, title }: { images: ImageAsset[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(false);

  return (
    <>
      <ul className={cn("grid gap-4", images.length > 1 && "sm:grid-cols-2", images.length > 2 && "lg:grid-cols-3")}>
        {images.map((img, i) => (
          <li key={img.src} className={cn(images.length > 2 && i === 0 && "sm:col-span-2 lg:row-span-2")}>
            <button
              type="button"
              className="group relative block h-full w-full overflow-hidden bg-concrete-200"
              onPointerEnter={() => setLoad(true)}
              onFocus={() => setLoad(true)}
              onClick={() => {
                setLoad(true);
                setIndex(i);
                setOpen(true);
              }}
            >
              <span className={cn("relative block", images.length > 2 && i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]" : "aspect-[4/3]")}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className="absolute right-3 top-3 inline-flex size-10 items-center justify-center bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="size-4" aria-hidden="true" />
              </span>
              <span className="sr-only">
                Open image {i + 1} of {images.length} of {title} in the viewer
              </span>
            </button>
          </li>
        ))}
      </ul>
      {load && <Lightbox open={open} index={index} onIndex={setIndex} onClose={() => setOpen(false)} images={images} />}
    </>
  );
}
