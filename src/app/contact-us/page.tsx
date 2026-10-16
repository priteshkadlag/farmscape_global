import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { ContactDetails, MapEmbed } from "@/components/contact/ContactDetails";
import { ContactForms } from "@/components/forms/ContactForms";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Formscape Global — Nova Cidade Complex, Alto-Porvorim, Goa 403521. Call +91 99219 99974, email or WhatsApp us for structural design enquiries and quotes.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let’s talk about your structure."
        intro="Connect with our team for engineering solutions that move your project forward."
        crumbs={[{ name: "Contact Us", path: "/contact-us" }]}
      />
      <section className="bg-paper py-16 sm:py-24" aria-labelledby="form-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brand">Reach us</p>
            <h2 className="display-md mb-8 mt-4">Our office</h2>
            <ContactDetails />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SectionHeading eyebrow="Send a message" id="form-title" title="Write to us." className="mb-10" />
            <ContactForms />
          </div>
        </div>
      </section>
      <section aria-label="Office location map" className="bg-paper pb-16 sm:pb-24">
        <div className="container-site">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
