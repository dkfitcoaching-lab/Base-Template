"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICE_OPTIONS, WEB3FORMS_KEY } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1];

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const inputClasses =
  "w-full bg-white/[0.03] border border-white/[0.06] rounded-btn px-4 py-3 text-text-primary font-body text-sm placeholder:text-text-caption focus:outline-none focus:border-vermillion/50 focus:shadow-[0_0_15px_rgba(192,48,48,0.15)] transition-all duration-300";

const labelClasses =
  "block text-sm font-heading text-text-secondary uppercase tracking-wide mb-2";

/* Stagger animation for form fields */
function fieldVariants(delay: number) {
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease },
    },
  };
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New inquiry from ${formData.name} — ${formData.service || "General"}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          company: formData.company || "N/A",
          service: formData.service || "Not selected",
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleReset() {
    setFormData(initialFormData);
    setStatus("idle");
  }

  /* ── Success state ── */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-hero p-8 sm:p-12 text-center"
      >
        {/* Animated checkmark with ring draw-in */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <svg
            className="w-20 h-20"
            viewBox="0 0 80 80"
            fill="none"
            aria-hidden="true"
          >
            {/* Outer ring that draws in */}
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              stroke="#C03030"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            />
            {/* Inner glow circle */}
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="rgba(192, 48, 48, 0.08)"
            />
            {/* Checkmark */}
            <motion.path
              d="M26 40 L36 50 L54 32"
              stroke="#C03030"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.7, ease }}
            />
          </svg>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease }}
          className="font-heading font-semibold text-2xl text-text-primary mb-3"
        >
          Message received.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease }}
          className="text-text-secondary mb-10 text-lg"
        >
          We&apos;ll be in touch within 24 hours.
        </motion.p>
        <motion.button
          onClick={handleReset}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease }}
          className="px-8 py-3 rounded-btn border border-white/[0.08] text-text-secondary font-heading text-sm tracking-wide hover:border-white/[0.16] hover:text-text-primary transition-all duration-300"
        >
          Send another message
        </motion.button>
      </motion.div>
    );
  }

  /* ── Form ── */
  return (
    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-hero p-6 sm:p-8 lg:p-10 shadow-glass">
      <form onSubmit={handleSubmit} className="text-left space-y-6">
        {/* Name / Email — two-column on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            variants={fieldVariants(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <label htmlFor="cf-name" className={labelClasses}>
              Name <span className="text-vermillion">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Chen"
              className={inputClasses}
            />
          </motion.div>

          <motion.div
            variants={fieldVariants(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <label htmlFor="cf-email" className={labelClasses}>
              Email <span className="text-vermillion">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@peakfitness.com"
              className={inputClasses}
            />
          </motion.div>
        </div>

        {/* Company */}
        <motion.div
          variants={fieldVariants(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label htmlFor="cf-company" className={labelClasses}>
            Business Name{" "}
            <span className="normal-case tracking-normal text-text-caption">
              (optional)
            </span>
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Peak Performance Training"
            className={inputClasses}
          />
        </motion.div>

        {/* Service interest */}
        <motion.div
          variants={fieldVariants(0.18)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label htmlFor="cf-service" className={labelClasses}>
            Service Interest
          </label>
          <select
            id="cf-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23808090%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]`}
          >
            <option value="">Select a tier...</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Message */}
        <motion.div
          variants={fieldVariants(0.24)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label htmlFor="cf-message" className={labelClasses}>
            How can we help? <span className="text-vermillion">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your business and what you need..."
            className={`${inputClasses} resize-none`}
          />
        </motion.div>

        {/* Submit */}
        <motion.div
          variants={fieldVariants(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <button
            type="submit"
            disabled={status === "submitting"}
            className="shimmer-btn w-full sm:w-auto px-12 py-4 rounded-btn bg-vermillion text-white font-heading font-semibold text-base tracking-wide hover:shadow-[0_0_40px_rgba(192,48,48,0.4)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting..." : "Get Started"}
          </button>

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-sm text-red-400"
            >
              Unable to send your message. Please try again or email us directly at david@vermillionaxistech.com.
            </motion.p>
          )}
        </motion.div>
      </form>
    </div>
  );
}
