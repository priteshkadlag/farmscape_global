import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/content/types";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { BlueprintLines } from "./BlueprintLines";

/** Dark inner-page hero with blueprint grid, breadcrumbs and optional image. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  image?: ImageAsset;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink pb-16 pt-[calc(var(--header-h)+3rem)] text-paper sm:pb-20 lg:pb-24 lg:pt-[calc(var(--header-h)+5rem)]">
      {image && (
        <div className="absolute inset-0 -z-20">
          <Image src={image.src} alt="" fill preload sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        </div>
      )}
      <div className="bg-blueprint-dark absolute inset-0 -z-10" aria-hidden="true" />
      <BlueprintLines className="absolute inset-0 -z-10 h-full w-full text-brand-300/25" />
      <div className="container-site">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="rise-in">
              <p className="eyebrow mb-6 flex items-center gap-3 text-brand-300">
                <span className="h-px w-8 bg-brand-300/60" aria-hidden="true" />
                {eyebrow}
              </p>
              <h1 className="display-xl text-balance">{title}</h1>
            </div>
          </div>
          {intro && (
            <div className="rise-in lg:col-span-4" style={{ animationDelay: "0.15s" }}>
              <div className="text-lg leading-relaxed text-steel-300">{intro}</div>
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
