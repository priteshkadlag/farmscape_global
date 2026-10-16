import type { Metadata } from "next";
import { Check } from "lucide-react";
import { commitments } from "@/content/company";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactDetails } from "@/components/contact/ContactDetails";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Request a quote for structural design, proof checking, fabrication drawings or value engineering. Share your project details and drawings with Formscape Global.",
  path: "/request-a-quote",
});

const steps = ["Share your project details and any drawings", "We review the brief and structural requirements", "We respond with next steps and a proposal"];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us what you’re building."
        intro="We are dedicated to helping you transform your ideas into reality with innovative engineering solutions."
        crumbs={[{ name: "Request a Quote", path: "/request-a-quote" }]}
      />
      <section className="bg-paper py-16 sm:py-24" aria-label="Quote request">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <EnquiryForm kind="quote" idPrefix="quote" />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="eyebrow text-steel-500">What happens next</h2>
            <ol className="mt-4 border-t border-ink/10">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 border-b border-ink/10 py-4">
                  <span className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ol>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {commitments.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm font-medium">
                  <Check className="size-4 text-brand" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mt-12 text-steel-500">Prefer to talk?</h2>
            <div className="mt-2">
              <ContactDetails />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
