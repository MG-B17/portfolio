import { contactData } from "@/data/contact";

export const CONTACT_FIELD_LIMITS = contactData.form.limits;

export type ContactField = keyof typeof CONTACT_FIELD_LIMITS;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContactInput(input: Record<string, unknown>) {
  const singleLine = (value: unknown) =>
    typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
  const data = {
    name: singleLine(input.name),
    email: singleLine(input.email),
    subject: singleLine(input.subject),
    message: typeof input.message === "string" ? input.message.trim() : "",
  };
  const errors: ContactErrors = {};
  const messages = contactData.form.errors;
  if (!data.name) errors.name = messages.nameRequired;
  if (!data.email) errors.email = messages.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = messages.emailInvalid;
  if (!data.message) errors.message = messages.messageRequired;
  for (const field of Object.keys(CONTACT_FIELD_LIMITS) as ContactField[]) {
    if (data[field].length > CONTACT_FIELD_LIMITS[field])
      errors[field] = messages.tooLong
        .replace("{field}", field)
        .replace("{limit}", String(CONTACT_FIELD_LIMITS[field]));
  }
  return { data, errors };
}
