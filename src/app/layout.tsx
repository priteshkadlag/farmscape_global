import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Manrope } from "next/font/google";
import { company, siteUrl } from "@/content/site";
import { organizationSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import "./globals.css";

// "optional": the preloaded display face is used when it arrives in time; otherwise the
// fallback stays, so large headings never reflow (no font-swap layout shift).
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "optional" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
// Mono is only used for small annotations, so it is not preloaded.
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Structural Engineering Consultants in Goa, India`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  keywords: [
    "structural engineering Goa",
    "structural design consultants",
    "proof checking",
    "fabrication drawings",
    "steel structures",
    "RCC design",
    "Formscape Global",
    "Nayan Fatania",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_IN",
    images: [{ url: "/og/formscape-global.jpg", width: 1200, height: 630, alt: "Formscape Global — Structural Engineering" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#25282b",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The home intro script sets data-intro on <html> before hydration, and browser extensions
    // add attributes to <body>; neither is a real mismatch.
    <html lang="en-IN" className={`${manrope.variable} ${dmSans.variable} ${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="fixed left-4 top-4 z-100 -translate-y-24 bg-lime px-4 py-3 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <WhatsAppButton />
        <SmoothScroll />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
