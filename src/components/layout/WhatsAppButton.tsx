import { contact } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Persistent but unobtrusive WhatsApp action, bottom-right. */
export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsappMessageHref("Hello Formscape Global, I would like to discuss a project.")}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-4 right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lg shadow-ink/20 transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="sr-only">Chat with Formscape Global on WhatsApp (opens in a new tab)</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-ink px-3 py-2 text-xs text-paper opacity-0 transition-opacity group-hover:opacity-100 sm:block"
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
