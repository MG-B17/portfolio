"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const { contact, contactContext } = portfolioData;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset success state after a few seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-blue-500 tracking-widest font-bold text-sm uppercase mb-4 block drop-shadow-sm">{contactContext.preTitle}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter drop-shadow-lg text-foreground">{contactContext.title}</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed text-balance font-medium drop-shadow-sm">
            {contactContext.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
            <p className="text-foreground/70 mb-10 leading-relaxed text-lg">
              I&apos;m always interested in hearing about new projects, opportunities, or just having a chat about the latest in mobile development.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 mt-1">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 font-medium mb-1 uppercase tracking-wider">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-lg font-semibold hover:text-blue-500 transition-colors break-all text-foreground">
                    {contact.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 mt-1">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 font-medium mb-1 uppercase tracking-wider">Location</p>
                  <p className="text-lg font-semibold text-foreground">{contact.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={contact.github} aria-label="Github" className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors text-foreground/70 hover:text-foreground">
                <Github size={20} />
              </a>
              <a href={contact.linkedin} aria-label="LinkedIn" className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors text-foreground/70 hover:text-foreground">
                <Linkedin size={20} />
              </a>
              <a href={contact.twitter} aria-label="Twitter" className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors text-foreground/70 hover:text-foreground">
                <Twitter size={20} />
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-green-500/10 transition-colors text-foreground/70 hover:text-green-500">
                <FaWhatsapp size={22} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="bg-foreground/[0.02] rounded-3xl p-6 sm:p-10 border border-foreground/5 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80 pl-1">Name</label>
                  <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl bg-background border border-foreground/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder={contactContext.placeholders.name} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80 pl-1">Email</label>
                  <input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl bg-background border border-foreground/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder={contactContext.placeholders.email} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground/80 pl-1">Subject</label>
                <input type="text" id="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl bg-background border border-foreground/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Inquiry" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80 pl-1">Message</label>
                <textarea id="message" required value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3.5 rounded-xl bg-background border border-foreground/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none" placeholder={contactContext.placeholders.message} />
              </div>

              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"} 
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed ${
                  status === "success" 
                  ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                  : status === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/20 shadow-[0_8px_30px_rgba(59,130,246,0.2)]"
                }`}
              >
                {status === "loading" && (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {status === "idle" && (
                   <>{contactContext.buttonText} <Send size={18} /></>
                )}
                {status === "success" && (
                   <>Message Sent Successfully! <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>✅</motion.div></>
                )}
                {status === "error" && (
                   <>Failed to Send. Try Again? ❌</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
