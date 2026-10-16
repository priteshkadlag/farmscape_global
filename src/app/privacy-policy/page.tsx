import type { Metadata } from "next";
import { company, contact } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${company.name} collects and uses the information you share through this website.`,
  path: "/privacy-policy",
});

// DRAFT — have this reviewed for compliance with India's Digital Personal
// Data Protection Act, 2023 before launch (see docs/content-verification.md).
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="To be confirmed before launch">
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by {company.name}, {contact.address.lines.join(", ")}. You can contact us at{" "}
          <a className="text-brand underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>{" "}
          or {contact.phoneDisplay}.
        </p>
      </section>
      <section>
        <h2>Information we collect</h2>
        <p>When you send an enquiry or quote request we collect the details you choose to provide:</p>
        <ul>
          <li>your name, email address and phone number;</li>
          <li>optional company, project location, service, project type and timeline;</li>
          <li>your message and any drawings or documents you attach.</li>
        </ul>
        <p>Our hosting provider may also record standard technical logs such as IP address and browser type to keep the site secure.</p>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>We use your information only to respond to your enquiry, prepare proposals and provide our services. We do not sell your information.</p>
      </section>
      <section>
        <h2>Third-party services</h2>
        <p>
          Embedded Google Maps and YouTube content (loaded only when you play the video) are provided by Google and subject to Google’s privacy policy. Links
          to WhatsApp and social networks are governed by those services’ own policies.
        </p>
      </section>
      <section>
        <h2>Retention and your rights</h2>
        <p>
          We keep enquiry information only as long as needed to respond and for our legitimate business records. You may ask us to access, correct or delete
          your information by contacting us using the details above.
        </p>
      </section>
    </LegalPage>
  );
}
