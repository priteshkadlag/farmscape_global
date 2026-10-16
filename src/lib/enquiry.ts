import { z } from "zod";

export const serviceOptions = [
  "Structural Design",
  "Fabrication Drawings",
  "Proof Checking",
  "Concrete Structures",
  "Steel Structures",
  "Composite Structures",
  "Liquid-Retaining Structures",
  "Machine Foundations",
  "Value Engineering",
  "Technical Drawing Preparation",
  "Not sure yet",
] as const;

export const projectTypeOptions = [
  "Residential",
  "Commercial",
  "Industrial",
  "Institutional",
  "Hospitality",
  "Infrastructure",
  "Other",
] as const;

export const timelineOptions = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "More than 6 months",
  "Not decided",
] as const;

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_UPLOADS = [".pdf", ".dwg", ".dxf", ".jpg", ".jpeg", ".png", ".zip"];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

// Indian and international numbers: digits, spaces, +, -, () — 7 to 15 digits.
const phone = z
  .string()
  .trim()
  .min(1, "Please enter your phone number.")
  .refine((v) => /^[+()\-\s\d]+$/.test(v) && v.replace(/\D/g, "").length >= 7 && v.replace(/\D/g, "").length <= 15, {
    message: "Please enter a valid phone number.",
  });

export const enquirySchema = z.object({
  kind: z.enum(["contact", "quote"]),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().min(1, "Please enter your email address.").pipe(z.email("Please enter a valid email address.")),
  phone,
  company: optionalText(120),
  projectLocation: optionalText(120),
  service: z.enum(serviceOptions).optional().or(z.literal("")),
  projectType: z.enum(projectTypeOptions).optional().or(z.literal("")),
  timeline: z.enum(timelineOptions).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little about your project (at least 10 characters).").max(4000),
  consent: z.boolean().refine((v) => v, { message: "Please agree to the privacy policy so we can respond." }),
  // Spam traps: `website` must stay empty; `startedAt` must be a few seconds old.
  website: z.string().max(500).optional(),
  startedAt: z.number(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
