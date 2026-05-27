"use client";

import { useEffect, useState } from "react";
import "@/styles/dashboard/kyc/complete-profile.css";
import {
  Building2,
  MapPin,
  BriefcaseBusiness,
  Phone,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

const steps = [
  "Personal Info",
  "Company Info",
  "Business Details",
  "Review & Submit",
];

type FormData = {
  fullName: string;
  phone: string;
  companyName: string;
  gstNumber: string;
  category: string;
  experience: string;
  city: string;
  state: string;
};

export default function ProfileCard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, checkAuth } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    category: "",
    experience: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      fullName: user.profile?.fullName || "",
      phone: user.profile?.phone || "",
      companyName: user.company?.name || "",
      gstNumber: user.company?.gstNumber || "",
      category: user.company?.category || "",
      experience: user.company?.experience
        ? String(user.company.experience)
        : "",
      city: user.company?.city || "",
      state: user.company?.state || "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setMessage("");
      setLoading(true);

      const res = await fetch("/api/v1/profile/complete-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          companyName: formData.companyName,
          gstNumber: formData.gstNumber || "",
          category: formData.category,
          experience: formData.experience ? Number(formData.experience) : null,
          city: formData.city || null,
          state: formData.state || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Profile update failed");
      }

      await checkAuth();

      setMessage("Business profile updated successfully.");
      toast.success("Business profile updated successfully.");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="profile-page-header">
        <div>
          <h1>Complete Business Profile</h1>
          <p>
            Complete your company verification process to unlock dashboard
            features and marketplace access.
          </p>
        </div>
      </div>

      {message && <p className="profile-message">{message}</p>}

      <div className="profile-stepper-card">
        <div className="profile-stepper-grid">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const active = currentStep === stepNumber;
            const completed = currentStep > stepNumber;

            return (
              <div
                key={step}
                className={`profile-step-item ${
                  active ? "active" : ""
                } ${completed ? "completed" : ""}`}
              >
                <div className="profile-step-circle">{stepNumber}</div>

                <div className="profile-step-content">
                  <strong>{step}</strong>
                  <span>Step {stepNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="profile-form-card">
        {currentStep === 1 && (
          <div>
            <div className="profile-form-header">
              <h3>Personal Information</h3>
              <p>Provide your personal contact details.</p>
            </div>

            <div className="profile-form-grid">
              <div className="profile-input-group">
                <label>Full Name</label>
                <div className="profile-input-wrap">
                  <User size={18} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>Phone Number</label>
                <div className="profile-input-wrap">
                  <Phone size={18} />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="profile-form-header">
              <h3>Company Information</h3>
              <p>Provide your registered business details.</p>
            </div>

            <div className="profile-form-grid">
              <div className="profile-input-group">
                <label>Company Name</label>
                <div className="profile-input-wrap">
                  <Building2 size={18} />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>GST Number</label>
                <div className="profile-input-wrap">
                  <BriefcaseBusiness size={18} />
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div className="profile-form-header">
              <h3>Business Details</h3>
              <p>Add category, location and business experience.</p>
            </div>

            <div className="profile-form-grid">
              <div className="profile-input-group">
                <label>Business Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  <option value="Construction">Construction</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                </select>
              </div>

              <div className="profile-input-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Enter experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-input-group">
                <label>City</label>
                <div className="profile-input-wrap">
                  <MapPin size={18} />
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <div className="profile-form-header">
              <h3>Review Information</h3>
              <p>Verify all information before submission.</p>
            </div>

            <div className="profile-review-grid">
              <div className="profile-review-item">
                <span>Full Name</span>
                <strong>{formData.fullName || "N/A"}</strong>
              </div>

              <div className="profile-review-item">
                <span>Phone</span>
                <strong>{formData.phone || "N/A"}</strong>
              </div>

              <div className="profile-review-item">
                <span>Company Name</span>
                <strong>{formData.companyName || "N/A"}</strong>
              </div>

              <div className="profile-review-item">
                <span>GST Number</span>
                <strong>{formData.gstNumber || "N/A"}</strong>
              </div>

              <div className="profile-review-item">
                <span>Category</span>
                <strong>{formData.category || "N/A"}</strong>
              </div>

              <div className="profile-review-item">
                <span>Experience</span>
                <strong>{formData.experience || "0"} Years</strong>
              </div>

              <div className="profile-review-item">
                <span>City</span>
                <strong>{formData.city || "N/A"}</strong>
              </div>

              <div className="profile-review-item">
                <span>State</span>
                <strong>{formData.state || "N/A"}</strong>
              </div>
            </div>
          </div>
        )}

        <div className="profile-form-actions">
          {currentStep > 1 && (
            <button
              type="button"
              className="profile-btn-secondary"
              onClick={prevStep}
            >
              <ChevronLeft size={18} />
              Previous
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              className="profile-btn-primary"
              onClick={nextStep}
            >
              Continue
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="profile-btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
