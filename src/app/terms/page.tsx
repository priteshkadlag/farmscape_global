import type { Metadata } from "next";
import { company, contact } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms governing the use of the ${company.name} website.`,
  path: "/terms",
});

// DRAFT — have this reviewed by the business's legal adviser before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="To be confirmed before launch">
      <section>
        <h2>Use of this website</h2>
        <p>
          This website provides general information about {company.name} and its structural engineering services. Content is provided for information only
          and does not constitute engineering advice for any specific project.
        </p>
      </section>
      <section>
        <h2>Drawings, images and content</h2>
        <p>
          Project photographs, sample drawings, the company profile and other content on this site belong to {company.name} or are used with permission.
          They may not be reproduced, used for construction or redistributed without written consent.
        </p>
      </section>
      <section>
        <h2>Enquiries and quotations</h2>
        <p>Submitting an enquiry does not create a contract. Any engagement is subject to a separate written proposal and agreement.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a className="text-brand underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
