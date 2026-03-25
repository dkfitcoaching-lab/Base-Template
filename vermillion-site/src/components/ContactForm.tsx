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
  "w-full bg-surface-2 border border-border rounded-btn px-4 py-3 text-text-primary font-body text-sm placeholder:text-text-caption focus:outline-none focus:ring-2 focus:ring-vermillion/50 focus:border-vermillion/50 transition-all duration-200";

const labelClasses =
  "block text-sm font-heading text-text-secondary uppercase tracking-wide mb-2";

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

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-vermillion/10 border border-vermillion/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-vermillion"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
          Message received.
        </h3>
        <p className="text-text-secondary mb-8">
          We&apos;ll be in touch within 24 hours.
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-btn border border-border text-text-secondary font-heading text-sm tracking-wide hover:border-text-secondary hover:text-text-primary transition-all duration-300"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-5">
      {/* Name / Email — two-column on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <label htmlFor="cf-name" className={labelClasses}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={inputClasses}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
        >
          <label htmlFor="cf-email" className={labelClasses}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className={inputClasses}
          />
        </motion.div>
      </div>

      {/* Company */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
      >
        <label htmlFor="cf-company" className={labelClasses}>
          Company{" "}
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
          placeholder="Acme Fitness"
          className={inputClasses}
        />
      </motion.div>

      {/* Service interest */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15, ease }}
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
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
      >
        <label htmlFor="cf-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className={`${inputClasses} resize-none`}
        />
      </motion.div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
      >
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto px-10 py-4 rounded-btn bg-vermillion text-white font-heading font-semibold text-base tracking-wide hover:shadow-[0_0_40px_rgba(192,48,48,0.4)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>

        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </motion.div>
    </form>
  );
}
