import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, contact, socials } from "@/content/site";
import { WhatsAppIcon, socialIcon } from "@/components/ui/icons";

function Row({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-ink/10 py-6">
      <span className="mt-0.5 text-brand">{icon}</span>
      <div>
        <h3 className="eyebrow text-steel-500">{title}</h3>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

export function ContactDetails() {
  return (
    <div className="border-t border-ink/10">
      <Row icon={<MapPin className="size-5" aria-hidden="true" />} title="Office address">
        <address className="not-italic leading-relaxed">
          <strong className="font-medium">{company.name}</strong>
          <br />
          {contact.address.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
          <span className="mt-1 block text-sm text-steel-600">Landmark: {contact.address.landmark}</span>
        </address>
        <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-brand underline-offset-4 hover:underline">
          Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span> →
        </a>
      </Row>
      <Row icon={<Phone className="size-5" aria-hidden="true" />} title="Call us">
        <a href={contact.phoneHref} className="inline-flex min-h-11 items-center font-display text-xl font-semibold hover:text-brand">
          {contact.phoneDisplay}
        </a>
      </Row>
      <Row icon={<Mail className="size-5" aria-hidden="true" />} title="Email us">
        <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center font-medium break-all hover:text-brand">
          {contact.email}
        </a>
        <a href={`mailto:${contact.emailAlt}`} className="flex min-h-9 items-center text-sm text-steel-600 break-all hover:text-brand">
          {contact.emailAlt}
        </a>
      </Row>
      <Row icon={<WhatsAppIcon className="size-5" />} title="WhatsApp">
        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-medium hover:text-brand">
          Enquire on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Row>
      {contact.officeHours && (
        <Row icon={<Clock className="size-5" aria-hidden="true" />} title="Office hours">
          <p>{contact.officeHours}</p>
        </Row>
      )}
      <div className="py-6">
        <h3 className="eyebrow text-steel-500">Follow us</h3>
        <ul className="mt-3 flex gap-2">
          {socials.map((s) => {
            const Icon = socialIcon[s.icon];
            return (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{s.label} (opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function MapEmbed() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-concrete-200 sm:aspect-[21/9]">
      <iframe
        src={contact.mapEmbedSrc}
        title={`Map showing the ${company.name} office at Nova Cidade Complex, Alto-Porvorim, Goa`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[60%] contrast-[1.05]"
      />
    </div>
  );
}
