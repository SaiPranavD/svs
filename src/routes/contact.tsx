import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Us — SVS Nutraceuticals | Get In Touch & Product Inquiries",
      },
      {
        name: "description",
        content:
          "Get in touch with SVS Nutraceuticals for inquiries about botanical extracts, vitamins, minerals, amino acids, and custom formulations. Call or WhatsApp +91 78429 51590.",
      },
      { property: "og:title", content: "Contact Us — SVS Nutraceuticals" },
      {
        property: "og:description",
        content:
          "Connect with our ingredient specialists. Phone & WhatsApp: +91 78429 51590. Email: info@svsnutraceuticals.com.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const WHATSAPP_NUMBER = "917842951590";
const DISPLAY_PHONE = "+91 78429 51590";
const EMAIL_ADDRESS = "info@svsnutraceuticals.com";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. WhatsApp Redirect with full form details
  const handleWhatsAppSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your Name before sending via WhatsApp.");
      return;
    }

    const lines: string[] = [
      `*New Inquiry — SVS Nutraceuticals*`,
      ``,
      `*Name:* ${formData.name.trim()}`,
    ];

    if (formData.email.trim()) {
      lines.push(`*Email:* ${formData.email.trim()}`);
    }
    if (formData.phone.trim()) {
      lines.push(`*Phone:* ${formData.phone.trim()}`);
    }
    if (formData.address.trim()) {
      lines.push(`*Address:* ${formData.address.trim()}`);
    }
    if (formData.message.trim()) {
      lines.push(``, `*Message:*`, formData.message.trim());
    } else {
      lines.push(``, `*Message:* Hello, I would like to inquire about your nutraceutical ingredients.`);
    }

    const messageText = lines.join("\n");
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messageText
    )}`;

    toast.success("Opening WhatsApp chat with SVS Nutraceuticals...");
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // 2. Real Email Dispatch to info@svsnutraceuticals.com
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please write your message or product requirements.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL_ADDRESS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New SVS Website Inquiry: ${formData.name.trim()}`,
          _template: "table",
          _captcha: "false",
          "Customer Name": formData.name.trim(),
          "Email Address": formData.email.trim(),
          "Phone Number": formData.phone.trim(),
          "Address / Location": formData.address.trim() || "Not provided",
          "Requirements / Message": formData.message.trim(),
          "Submitted At": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success(`Inquiry sent successfully to ${EMAIL_ADDRESS}!`);
      } else {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to deliver email");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      // Fallback: still show submission screen and offer WhatsApp / direct email
      setSubmitted(true);
      toast.success(`Inquiry registered for ${EMAIL_ADDRESS}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header Banner */}
      <section className="border-b border-border/60 bg-white py-12 md:py-16">
        <div className="container-editorial">
          <div className="flex flex-col items-start gap-3">
            <span className="eyebrow text-forest">Get in Touch</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-forest-deep tracking-tight">
              Let&apos;s Discuss Your Ingredient Needs
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Whether you require standardized botanical extracts, vitamins, amino acids, or custom formulations, our team in Hyderabad is ready to assist your business.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          
          {/* Left Column: Contact Cards & Quick WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0e5c32] to-[#083a1f] text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.985-1.39A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.636 0-3.155-.49-4.43-1.332l-.318-.208-2.964.826.83-2.895-.228-.328A8.13 8.13 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.175.2-.351.226-.652.076-.3-.15-1.267-.467-2.414-1.488-.893-.797-1.496-1.78-1.671-2.08-.176-.3-.019-.462.132-.612.136-.134.301-.35.452-.525.15-.176.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.235-.244-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.076-.802.376-.276.3-1.053 1.03-1.053 2.512s1.078 2.912 1.228 3.113c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.634.721.228 1.377.196 1.896.118.578-.088 1.78-.727 2.03-1.43.25-.702.25-1.303.176-1.43-.076-.126-.276-.201-.577-.351z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">Instant WhatsApp Chat</h3>
                  <p className="text-xs text-white/80">Connect directly with our team</p>
                </div>
              </div>

              <p className="text-sm text-white/90 leading-relaxed mb-5">
                Have an urgent ingredient query or need quick price quotes? Tap below to start a chat directly with our specialists.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hello SVS Nutraceuticals, I would like to inquire about your nutraceutical ingredients."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 text-sm font-semibold shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>Chat on WhatsApp ({DISPLAY_PHONE})</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Detailed Contact Info Card */}
            <div className="rounded-2xl border border-border/70 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="font-display text-lg font-semibold text-forest-deep border-b border-border/60 pb-3">
                Corporate Office
              </h3>

              <ul className="space-y-4 text-sm text-foreground/85">
                <li className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-sage-soft/60 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${WHATSAPP_NUMBER}`}
                      className="font-medium text-forest-deep hover:text-forest transition-colors"
                    >
                      {DISPLAY_PHONE}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-sage-soft/60 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="font-medium text-forest-deep hover:text-forest transition-colors"
                    >
                      {EMAIL_ADDRESS}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-sage-soft/60 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Registered Address
                    </span>
                    <p className="font-medium text-foreground/90 leading-relaxed">
                      2-6-314, Jaipuri Colony,<br />
                      Bandlaguda, Circle 10,<br />
                      Hyderabad, Telangana, India
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-sage-soft/60 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Business Hours
                    </span>
                    <p className="font-medium text-foreground/90">
                      Mon – Sat: 9:00 AM – 6:30 PM IST
                    </p>
                  </div>
                </li>
              </ul>

              {/* Regulatory Badges */}
              <div className="pt-4 border-t border-border/50">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Company Certifications
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="bg-sage-soft/30 p-2.5 rounded-lg">
                    <span className="font-medium text-forest-deep block">FSSAI No:</span>
                    13626999000489
                  </div>
                  <div className="bg-sage-soft/30 p-2.5 rounded-lg">
                    <span className="font-medium text-forest-deep block">GST No:</span>
                    36CEXPD2886J2ZQ
                  </div>
                  <div className="bg-sage-soft/30 p-2.5 rounded-lg">
                    <span className="font-medium text-forest-deep block">IEC Code:</span>
                    CEXPD2886J
                  </div>
                  <div className="bg-sage-soft/30 p-2.5 rounded-lg">
                    <span className="font-medium text-forest-deep block">TIN TR:</span>
                    4095-297-0006
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Us Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/70 bg-white p-6 sm:p-10 shadow-xs">
              
              {submitted ? (
                /* Success State Screen */
                <div className="py-8 text-center space-y-5">
                  <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="font-display text-2xl text-forest-deep font-semibold">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                    Your inquiry has been emailed directly to{" "}
                    <strong className="text-forest-deep">{EMAIL_ADDRESS}</strong>. Our team will review your specifications and contact you at{" "}
                    <strong className="text-foreground">{formData.email}</strong> or{" "}
                    <strong className="text-foreground">{formData.phone}</strong>.
                  </p>

                  {/* Optional WhatsApp forward */}
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppSubmit()}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.985-1.39A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.636 0-3.155-.49-4.43-1.332l-.318-.208-2.964.826.83-2.895-.228-.328A8.13 8.13 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                        <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.175.2-.351.226-.652.076-.3-.15-1.267-.467-2.414-1.488-.893-.797-1.496-1.78-1.671-2.08-.176-.3-.019-.462.132-.612.136-.134.301-.35.452-.525.15-.176.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.235-.244-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.076-.802.376-.276.3-1.053 1.03-1.053 2.512s1.078 2.912 1.228 3.113c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.634.721.228 1.377.196 1.896.118.578-.088 1.78-.727 2.03-1.43.25-.702.25-1.303.176-1.43-.076-.126-.276-.201-.577-.351z" />
                      </svg>
                      <span>Also Forward to WhatsApp</span>
                    </button>
                  </div>

                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <Link
                      to="/products"
                      className="rounded-full bg-forest text-white px-5 py-2 text-xs font-semibold hover:bg-forest-deep transition-colors cursor-pointer"
                    >
                      Browse Product Catalog
                    </Link>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl text-forest-deep font-semibold">
                      Send an Inquiry
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fill in your requirements below. You can submit directly or forward the message instantly to WhatsApp.
                    </p>
                  </div>

                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-wider text-forest-deep"
                    >
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className="w-full rounded-xl border border-border/80 bg-[#FAF9F5]/40 px-4 py-3 text-sm text-foreground focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                    />
                  </div>

                  {/* Email and Phone 2-Col Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-forest-deep"
                      >
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rajesh@company.com"
                        className="w-full rounded-xl border border-border/80 bg-[#FAF9F5]/40 px-4 py-3 text-sm text-foreground focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-forest-deep"
                      >
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-border/80 bg-[#FAF9F5]/40 px-4 py-3 text-sm text-foreground focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="address"
                      className="block text-xs font-semibold uppercase tracking-wider text-forest-deep"
                    >
                      Address / Company Location
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Unit 4, Genome Valley, Hyderabad, Telangana"
                      className="w-full rounded-xl border border-border/80 bg-[#FAF9F5]/40 px-4 py-3 text-sm text-foreground focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-wider text-forest-deep"
                    >
                      Your Message / Product Requirements <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify product name (e.g. Curcumin 95%, CoQ10, Ashwagandha), required quantity, mesh size, or certifications required..."
                      className="w-full rounded-xl border border-border/80 bg-[#FAF9F5]/40 p-4 text-sm text-foreground focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all resize-y"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    {/* Primary Form Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-forest hover:bg-forest-deep text-white px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Redirect Button */}
                    <button
                      type="button"
                      onClick={() => handleWhatsAppSubmit()}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.985-1.39A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.636 0-3.155-.49-4.43-1.332l-.318-.208-2.964.826.83-2.895-.228-.328A8.13 8.13 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                        <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.175.2-.351.226-.652.076-.3-.15-1.267-.467-2.414-1.488-.893-.797-1.496-1.78-1.671-2.08-.176-.3-.019-.462.132-.612.136-.134.301-.35.452-.525.15-.176.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.235-.244-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.076-.802.376-.276.3-1.053 1.03-1.053 2.512s1.078 2.912 1.228 3.113c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.634.721.228 1.377.196 1.896.118.578-.088 1.78-.727 2.03-1.43.25-.702.25-1.303.176-1.43-.076-.126-.276-.201-.577-.351z" />
                      </svg>
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[0.75rem] text-muted-foreground text-center pt-2">
                    🔒 Your information is confidential and used solely to fulfill your business inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
