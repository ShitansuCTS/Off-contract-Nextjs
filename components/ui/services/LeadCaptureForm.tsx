"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type LeadFormType =
  | "CONTACT"
  | "ENQUIRY"
  | "MATERIAL_INQUIRY"
  | "EQUIPMENT_RENTAL"
  | "INSURANCE"
  | "FINANCE"
  | "SERVICE_REQUEST"
  | "GENERAL";

interface LeadCaptureFormProps {
  formType: LeadFormType;
  title: string;
  submitLabel?: string;
  defaultSubject?: string;
  defaultMessage?: string;
  successMessage?: string;
  submitButtonClassName?: string;
}

const emptyState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function LeadCaptureForm({
  formType,
  title,
  submitLabel = "Send Now",
  defaultSubject,
  defaultMessage,
  successMessage = "Your enquiry has been submitted successfully.",
  submitButtonClassName = "theme-btn1",
}: LeadCaptureFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedName = formData.name.trim();
    const cleanedEmail = formData.email.trim();
    const cleanedPhone = formData.phone.trim();
    const cleanedMessage = (formData.message || defaultMessage || "").trim();

    if (!cleanedName || !cleanedEmail || !cleanedPhone) {
      toast.error("Please fill in your name, email, and phone number.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanedName,
          email: cleanedEmail,
          phone: cleanedPhone,
          message: cleanedMessage,
          subject: defaultSubject || `${title} Inquiry`,
          formType,
          sourcePage: window.location.pathname,
          sourceWebsite: window.location.origin,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(successMessage);
      setFormData(emptyState);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit enquiry";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-lg-12">
        <div className="input-area">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="input-area">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="input-area">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="input-area">
          <textarea
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="input-area">
          <button
            type="submit"
            disabled={loading}
            className={submitButtonClassName}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Submitting..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
