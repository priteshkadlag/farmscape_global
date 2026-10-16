"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, ChevronDown, LoaderCircle, Paperclip, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import {
  ACCEPTED_UPLOADS,
  MAX_UPLOAD_BYTES,
  enquirySchema,
  projectTypeOptions,
  serviceOptions,
  timelineOptions,
  type EnquiryInput,
} from "@/lib/enquiry";
import { contact } from "@/content/site";
import { cn } from "@/lib/cn";

/** Timestamp for the spam time-trap (only ever called from effects/handlers). */
const now = () => Date.now();

type Status = { state: "idle" } | { state: "submitting" } | { state: "success"; name: string } | { state: "error"; message: string };

const labels: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  projectLocation: "Project location",
  service: "Service required",
  projectType: "Project type",
  timeline: "Estimated timeline",
  message: "Message",
  consent: "Privacy consent",
};

const inputCls =
  "block w-full border border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder:text-steel-400 transition-colors focus:border-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-500 aria-[invalid=true]:border-red-700";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-steel-500"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-steel-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const a11y = (id: string, error?: string, hint?: boolean) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

function Select({ reg, options, placeholder, ...rest }: { reg: UseFormRegisterReturn; options: readonly string[]; placeholder: string } & Record<string, unknown>) {
  return (
    <div className="relative">
      <select {...reg} {...rest} className={cn(inputCls, "appearance-none pr-10")}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-steel-600" aria-hidden="true" />
    </div>
  );
}

/**
 * Contact / quote request form. `kind="quote"` adds project details and an
 * optional drawing upload. Submits multipart data to /api/enquiry.
 */
export function EnquiryForm({ kind, idPrefix }: { kind: "contact" | "quote"; idPrefix?: string }) {
  const auto = useId();
  const p = idPrefix ?? auto.replace(/:/g, "");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, submitCount },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      kind,
      name: "",
      email: "",
      phone: "",
      company: "",
      projectLocation: "",
      service: "",
      projectType: "",
      timeline: "",
      message: "",
      consent: false,
      website: "",
      startedAt: 0,
    },
  });

  // Time-trap: humans take more than a few seconds to fill a form.
  useEffect(() => {
    setValue("startedAt", now());
  }, [setValue]);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
  }, [status]);



  const onFile = (f: File | undefined) => {
    setFileError(null);
    if (!f) return setFile(null);
    const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
    if (!ACCEPTED_UPLOADS.includes(ext)) {
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      return setFileError(`Unsupported file type. Please upload ${ACCEPTED_UPLOADS.join(", ")}.`);
    }
    if (f.size > MAX_UPLOAD_BYTES) {
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      return setFileError("File is larger than 10 MB. Please email large drawing sets instead.");
    }
    setFile(f);
  };

  const onSubmit = async (values: EnquiryInput) => {
    if (fileError) return;
    setStatus({ state: "submitting" });
    const body = new FormData();
    Object.entries(values).forEach(([k, v]) => body.append(k, String(v ?? "")));
    if (file) body.append("attachment", file);
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "Something went wrong.");
      setStatus({ state: "success", name: values.name.split(" ")[0] });
      reset();
      setFile(null);
      setValue("startedAt", now());
    } catch (e) {
      setStatus({ state: "error", message: e instanceof Error ? e.message : "Something went wrong." });
    }
  };

  if (status.state === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border border-brand/30 bg-brand-100/60 p-8 outline-none sm:p-10">
        <CheckCircle2 className="size-10 text-brand" aria-hidden="true" />
        <h3 className="display-md mt-6">Thank you, {status.name}.</h3>
        <p className="mt-3 max-w-lg text-steel-600">
          Your {kind === "quote" ? "quote request" : "message"} has reached our team. We’ll get back to you soon. For anything urgent, call{" "}
          <a href={contact.phoneHref} className="font-medium text-brand underline">
            {contact.phoneDisplay}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-brand underline underline-offset-4">
          Send another {kind === "quote" ? "request" : "message"}
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors);
  const submitting = status.state === "submitting";

  return (
    <form onSubmit={(e) => handleSubmit(onSubmit)(e)} noValidate aria-busy={submitting} className="grid gap-6">
      {submitCount > 0 && errorList.length > 1 && (
        // Announced via role="alert"; react-hook-form moves focus to the first invalid field.
        <div role="alert" className="border border-red-700/40 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-medium">Please check {errorList.length} fields:</p>
          <ul className="mt-2 list-inside list-disc">
            {errorList.map(([k, v]) => (
              <li key={k}>
                <a href={`#${p}-${k}`} className="underline">
                  {labels[k] ?? k}
                </a>
                {v?.message ? ` — ${String(v.message)}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      <input type="hidden" {...register("kind")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${p}-website`}>Website</label>
        <input id={`${p}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${p}-name`} label="Name" required error={errors.name?.message}>
          <input {...register("name")} {...a11y(`${p}-name`, errors.name?.message)} autoComplete="name" className={inputCls} />
        </Field>
        <Field id={`${p}-email`} label="Email" required error={errors.email?.message}>
          <input type="email" {...register("email")} {...a11y(`${p}-email`, errors.email?.message)} autoComplete="email" inputMode="email" className={inputCls} />
        </Field>
        <Field id={`${p}-phone`} label="Phone" required error={errors.phone?.message}>
          <input type="tel" {...register("phone")} {...a11y(`${p}-phone`, errors.phone?.message)} autoComplete="tel" inputMode="tel" className={inputCls} />
        </Field>
        <Field id={`${p}-company`} label="Company" error={errors.company?.message}>
          <input {...register("company")} {...a11y(`${p}-company`, errors.company?.message)} autoComplete="organization" className={inputCls} />
        </Field>
      </div>

      {kind === "quote" && (
        <fieldset className="grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-2">
          <legend className="eyebrow mb-2 text-steel-600 sm:col-span-2">Project details</legend>
          <Field id={`${p}-projectLocation`} label="Project location" error={errors.projectLocation?.message}>
            <input {...register("projectLocation")} {...a11y(`${p}-projectLocation`, errors.projectLocation?.message)} placeholder="e.g. Porvorim, Goa" className={inputCls} />
          </Field>
          <Field id={`${p}-service`} label="Service required" error={errors.service?.message}>
            <Select reg={register("service")} options={serviceOptions} placeholder="Select a service" {...a11y(`${p}-service`, errors.service?.message)} />
          </Field>
          <Field id={`${p}-projectType`} label="Project type" error={errors.projectType?.message}>
            <Select reg={register("projectType")} options={projectTypeOptions} placeholder="Select a project type" {...a11y(`${p}-projectType`, errors.projectType?.message)} />
          </Field>
          <Field id={`${p}-timeline`} label="Estimated timeline" error={errors.timeline?.message}>
            <Select reg={register("timeline")} options={timelineOptions} placeholder="Select a timeline" {...a11y(`${p}-timeline`, errors.timeline?.message)} />
          </Field>
        </fieldset>
      )}

      <Field id={`${p}-message`} label={kind === "quote" ? "Project brief" : "Message"} required error={errors.message?.message}>
        <textarea
          rows={kind === "quote" ? 6 : 5}
          {...register("message")}
          {...a11y(`${p}-message`, errors.message?.message)}
          placeholder={kind === "quote" ? "Structure type, size, number of floors, spans, existing drawings…" : "How can we help?"}
          className={cn(inputCls, "resize-y")}
        />
      </Field>

      {kind === "quote" && (
        <Field
          id={`${p}-attachment`}
          label="Drawings or documents"
          error={fileError ?? undefined}
          hint={`PDF, DWG, DXF, JPG, PNG or ZIP — up to ${MAX_UPLOAD_BYTES / 1024 / 1024} MB.`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor={`${p}-attachment`}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 border border-dashed border-ink/30 px-5 text-sm font-medium transition-colors hover:border-brand hover:text-brand has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500"
            >
              <Paperclip className="size-4" aria-hidden="true" />
              {file ? "Replace file" : "Attach a file"}
              <input
                ref={fileInput}
                type="file"
                className="sr-only"
                accept={ACCEPTED_UPLOADS.join(",")}
                {...a11y(`${p}-attachment`, fileError ?? undefined, true)}
                onChange={(e) => onFile(e.target.files?.[0])}
              />
            </label>
            {file && (
              <span className="inline-flex items-center gap-2 bg-concrete-100 px-3 py-2 text-sm">
                {file.name} <span className="text-steel-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    if (fileInput.current) fileInput.current.value = "";
                  }}
                  className="inline-flex size-8 items-center justify-center hover:text-red-700"
                >
                  <X className="size-4" aria-hidden="true" />
                  <span className="sr-only">Remove {file.name}</span>
                </button>
              </span>
            )}
          </div>
        </Field>
      )}

      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("consent")}
            {...a11y(`${p}-consent`, errors.consent?.message)}
            className="mt-1 size-5 shrink-0 accent-brand"
          />
          <label htmlFor={`${p}-consent`} className="text-sm text-steel-600">
            I agree that Formscape Global may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy-policy" className="font-medium text-brand underline">
              privacy policy
            </Link>
            .{" "}
            <span className="text-red-700" aria-hidden="true">
              *
            </span>
          </label>
        </div>
        {errors.consent?.message && (
          <p id={`${p}-consent-error`} className="mt-1.5 flex items-center gap-1.5 pl-8 text-sm text-red-700">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center gap-3 bg-brand px-7 font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          {submitting ? "Sending…" : kind === "quote" ? "Send quote request" : "Send message"}
        </button>
        <p className="text-xs text-steel-600">
          <span className="text-red-700">*</span> Required fields
        </p>
      </div>

      <div aria-live="assertive" className="empty:hidden">
        {status.state === "error" && (
          <p className="flex items-start gap-2 border border-red-700/40 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {status.message} You can also reach us at{" "}
              <a href={`mailto:${contact.email}`} className="underline">
                {contact.email}
              </a>{" "}
              or{" "}
              <a href={contact.phoneHref} className="underline">
                {contact.phoneDisplay}
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
