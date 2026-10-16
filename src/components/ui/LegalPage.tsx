import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={`Last updated: ${updated}`} crumbs={[{ name: title, path }]} />
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-site">
          <div className="max-w-3xl space-y-10 text-steel-600 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
