"use client";

import { useState, type FormEvent } from "react";
import { contactData } from "@/data/contact";
import SpotlightCard from "./SpotlightCard";
import DeviceStatusBar from "./DeviceStatusBar";
import { CONTACT_FIELD_LIMITS, validateContactInput, type ContactErrors } from "@/lib/contactValidation";


export default function ContactForm() {
  const { form } = contactData;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    text: string;
  }>({ type: "idle", text: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: validatedData, errors: validationErrors } =
      validateContactInput({ name, email, subject, message });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus({
        type: "error",
        text: Object.values(validationErrors)[0] ?? form.errors.genericFailure,
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "idle", text: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validatedData,
          website,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus({
          type: "error",
          text: data.error || form.errors.genericFailure,
        });
        return;
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
      setErrors({});
      setStatus({ type: "success", text: form.successMessage });
    } catch {
      setStatus({ type: "error", text: form.errors.genericFailure });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SpotlightCard
      ariaLabel={form.ariaLabel}
      focusable={false}
      className="device-card-phone mx-auto w-full max-w-[460px]"
    >
      {/* Machined titanium phone side buttons */}
      <span aria-hidden="true" className="device-hw-btn device-hw-btn-left-1" />
      <span aria-hidden="true" className="device-hw-btn device-hw-btn-left-2" />
      <span aria-hidden="true" className="device-hw-btn device-hw-btn-right" />

      <div className="device-card-bezel">
        <div className="device-card-screen p-[clamp(20px,2.8vw,28px)]">
          {/* Phone status bar with Dynamic Island */}
          <DeviceStatusBar />

          {/* Mobile app compose header */}
          <div className="mb-[18px] flex items-center justify-between border-b border-white/10 pb-[12px]">
            <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
              {form.composeTitle}
            </span>
            <span className="inline-flex items-center gap-[6px] rounded-full border border-white/10 bg-bg/60 px-[10px] py-[3px] font-mono text-[10.5px] text-muted">
              <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-signal" />
              {form.recipientBadge}
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[14px]">
            {/* Hidden honeypot field */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="contact-website">{form.websiteLabel}</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="contact-name"
                className="mb-[5px] block font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted"
              >
                {form.nameLabel}
              </label>
              <input
                id="contact-name"
                maxLength={CONTACT_FIELD_LIMITS.name}
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className="w-full rounded-[12px] border border-white/10 bg-[#07080a]/70 px-[14px] py-[10px] text-[14.5px] text-ink transition-colors focus:border-signal focus:outline-none"
              />
              {errors.name && (
                <p
                  id="contact-name-error"
                  className="mt-[5px] mb-0 font-mono text-[11.5px] text-signal"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-[5px] block font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted"
              >
                {form.emailLabel}
              </label>
              <input
                id="contact-email"
                maxLength={CONTACT_FIELD_LIMITS.email}
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className="w-full rounded-[12px] border border-white/10 bg-[#07080a]/70 px-[14px] py-[10px] text-[14.5px] text-ink transition-colors focus:border-signal focus:outline-none"
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  className="mt-[5px] mb-0 font-mono text-[11.5px] text-signal"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="mb-[5px] flex items-baseline justify-between gap-[8px]">
                <label
                  htmlFor="contact-subject"
                  className="block font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted"
                >
                  {form.subjectLabel}
                </label>
                <span className="font-mono text-[10.5px] text-muted/75">
                  {form.subjectOptional}
                </span>
              </div>
              <input
                id="contact-subject"
                maxLength={CONTACT_FIELD_LIMITS.subject}
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-[12px] border border-white/10 bg-[#07080a]/70 px-[14px] py-[10px] text-[14.5px] text-ink transition-colors focus:border-signal focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-[5px] block font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted"
              >
                {form.messageLabel}
              </label>
              <textarea
                id="contact-message"
                maxLength={CONTACT_FIELD_LIMITS.message}
                name="message"
                rows={4}
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message)
                    setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="w-full resize-y rounded-[12px] border border-white/10 bg-[#07080a]/70 px-[14px] py-[10px] text-[14.5px] text-ink transition-colors focus:border-signal focus:outline-none"
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  className="mt-[5px] mb-0 font-mono text-[11.5px] text-signal"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-[10px] pt-[4px]">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-[8px] rounded-[12px] border border-transparent bg-signal px-[22px] py-[13px] text-[15px] font-medium text-on-signal cursor-pointer transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{submitting ? form.sendingLabel : form.submitLabel}</span>
                {!submitting && <span aria-hidden="true">↗</span>}
              </button>

              <p
                role="status"
                aria-live="polite"
                className="m-0 min-h-[1.4em] text-center font-mono text-[12px] text-ink"
              >
                {status.text}
              </p>
            </div>
          </form>

          <div aria-hidden="true" className="device-home-indicator" />
        </div>
      </div>
    </SpotlightCard>
  );
}
