import type { ContactData } from "@/types/content";

export const contactData: ContactData = {
  heading: "Let’s talk",
  subheading: "Open to Flutter roles. Email is the fastest way to reach me.",
  eyebrow: "Open to Flutter roles",
  directEmailLabel: "Direct email",
  email: "mostafagalalbakri@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/MG-B17" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mostafa-galal-17-m" },
    { label: "WhatsApp", href: "https://wa.me/201033589095" },
    { label: "X", href: "https://x.com/mostafagalal_17" },
  ],
  form: {
    ariaLabel: "Contact form",
    composeTitle: "New Message",
    recipientBadge: "To: Mostafa",
    websiteLabel: "Website",
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    subjectOptional: "Optional",
    messageLabel: "Message",
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    successMessage: "Message sent. I’ll reply by email.",
    limits: { name: 120, email: 254, subject: 200, message: 4000 },
    errors: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please write a short message.",
      genericFailure: "Could not send your message. Please try again or email me directly.",
      tooLong: "Please keep {field} under {limit} characters.",
    },
  },
};
