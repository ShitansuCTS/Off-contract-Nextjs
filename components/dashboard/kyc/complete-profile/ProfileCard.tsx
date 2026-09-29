"use client";

<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react";
import "@/styles/dashboard/kyc/complete-profile.css";
=======
import { useEffect, useMemo, useRef, useState } from "react";
import type { JSX } from "react";
=======
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
import "@/styles/dashboard/kyc/complete-profile.css";

>>>>>>> 0ab8559 (insert all data)
import {
<<<<<<< HEAD
  Building2,
  MapPin,
  BriefcaseBusiness,
  Phone,
  User,
<<<<<<< HEAD
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

const steps = [
=======
  Globe,
  FileText,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Check,
  CheckCircle2,
  AlertCircle,
  Mail,
  Layers,
  Clock,
  Hourglass,
=======
  Building2, MapPin, BriefcaseBusiness, Phone, User, Globe, FileText, Mail, Layers, Clock,
  ChevronRight, ChevronLeft, Loader2, Check, CheckCircle2, AlertCircle, Hourglass,
  type LucideIcon,
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/useAuthStore";

/* ============================================================
   CONFIG  (change the route to match your app)
============================================================ */

<<<<<<< HEAD
const STEPS = [
>>>>>>> 0ab8559 (insert all data)
  "Personal Info",
  "Company Info",
  "Business Details",
  "Review & Submit",
<<<<<<< HEAD
];

type FormData = {
  fullName: string;
  phone: string;
  companyName: string;
  gstNumber: string;
  category: string;
  experience: string;
=======
] as const;

const TOTAL_STEPS = STEPS.length;

const BUSINESS_TYPES = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "PROPRIETORSHIP", label: "Proprietorship" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "LLP", label: "LLP" },
  { value: "PRIVATE_LIMITED", label: "Private Limited" },
  { value: "PUBLIC_LIMITED", label: "Public Limited" },
  { value: "OTHER", label: "Other" },
];

const CATEGORY_OPTIONS = ["Construction", "Supplier", "Electrical", "Plumbing"];
=======
export const SUBSCRIPTION_ROUTE = "/dashboard/kyc/complete-payment";
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+\..+/;

const opts = (list: string[]) => list.map((v) => ({ value: v, label: v }));

const BUSINESS_TYPES = [
  ["INDIVIDUAL", "Individual"], ["PROPRIETORSHIP", "Proprietorship"], ["PARTNERSHIP", "Partnership"],
  ["LLP", "LLP"], ["PRIVATE_LIMITED", "Private Limited"], ["PUBLIC_LIMITED", "Public Limited"], ["OTHER", "Other"],
].map(([value, label]) => ({ value, label }));

<<<<<<< HEAD
  companyName: string;
  businessType: string;
  gstNumber: string;
  panNumber: string;
  registrationNumber: string;

  category: string;
  experience: string;
  description: string;
  website: string;

  businessEmail: string;
  businessPhone: string;
  address: string;

>>>>>>> 0ab8559 (insert all data)
  stateId: string;
  cityId: string;
};

<<<<<<< HEAD
type StateOption = {
=======
=======
const EMPTY_FORM = {
  fullName: "", phone: "",
  companyName: "", businessType: "", gstNumber: "", panNumber: "", registrationNumber: "",
  businessEmail: "", businessPhone: "", website: "",
  category: "", experience: "", stateId: "", cityId: "", address: "", description: "",
};

type FormData = typeof EMPTY_FORM;
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
type FormErrors = Partial<Record<keyof FormData, string>>;
type Option = { value: string; label: string };

<<<<<<< HEAD
type LocationOption = {
>>>>>>> 0ab8559 (insert all data)
  id: string;
  name: string;
  slug: string;
};

<<<<<<< HEAD
type CityOption = {
  id: string;
  name: string;
  slug: string;
  stateId: string;
};

export default function ProfileCard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const { user, checkAuth } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    category: "",
    experience: "",
    stateId: "",
    cityId: "",
  });

  useEffect(() => {
    const fetchStates = async () => {
=======
type ProfileStatus =
  | "incomplete"
  | "ready"
  | "submitted"
  | "under_review"
  | "rejected"
  | "verified";
=======
type Field = {
  name: keyof FormData;
  label: string;
  icon?: LucideIcon;
  kind?: "text" | "email" | "url" | "number" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  hint?: string;
  maxLength?: number;
  pattern?: RegExp;
  patternMsg?: string;
  options?: Option[];
};

/* One config drives the form, validation AND the review screen */
const STEPS: { name: string; title: string; subtitle: string; icon: LucideIcon; fields: Field[] }[] = [
  {
    name: "Personal Info", title: "Personal Information", subtitle: "Provide your personal contact details.", icon: User,
    fields: [
      { name: "fullName", label: "Full Name", icon: User, required: true, placeholder: "Enter full name", hint: "Use your name as per official records." },
      { name: "phone", label: "Personal Phone Number", icon: Phone, required: true, placeholder: "Enter phone number", hint: "We may use this number for verification." },
    ],
  },
  {
    name: "Company Info", title: "Company Information", subtitle: "Provide your registered business information.", icon: Building2,
    fields: [
      { name: "companyName", label: "Company Name", icon: Building2, required: true, placeholder: "Enter company name" },
      { name: "businessType", label: "Business Type", icon: Layers, kind: "select", required: true, options: BUSINESS_TYPES },
      { name: "gstNumber", label: "GST Number", icon: BriefcaseBusiness, placeholder: "Enter GST number", maxLength: 15, hint: "15 characters, e.g. 22AAAAA0000A1Z5", pattern: GST_REGEX, patternMsg: "Enter a valid 15-character GST number." },
      { name: "panNumber", label: "PAN Number", icon: FileText, placeholder: "Enter PAN number", maxLength: 10, hint: "10 characters, e.g. ABCDE1234F", pattern: PAN_REGEX, patternMsg: "Enter a valid 10-character PAN number." },
      { name: "registrationNumber", label: "Registration Number", icon: FileText, placeholder: "Enter registration number" },
      { name: "businessEmail", label: "Business Email", icon: Mail, kind: "email", placeholder: "business@example.com", pattern: EMAIL_REGEX, patternMsg: "Enter a valid email address." },
      { name: "businessPhone", label: "Business Phone", icon: Phone, placeholder: "Enter business phone" },
      { name: "website", label: "Website", icon: Globe, kind: "url", placeholder: "https://example.com", pattern: URL_REGEX, patternMsg: "Enter a valid URL, e.g. https://example.com" },
    ],
  },
  {
    name: "Business Details", title: "Business Details", subtitle: "Add your business category, experience, address and location.", icon: Layers,
    fields: [
      { name: "category", label: "Business Category", icon: Layers, kind: "select", required: true, options: opts(["Construction", "Supplier", "Electrical", "Plumbing"]) },
      { name: "experience", label: "Experience (Years)", icon: Clock, kind: "number", placeholder: "Enter experience" },
      { name: "stateId", label: "State", icon: MapPin, kind: "select", required: true },
      { name: "cityId", label: "City", icon: MapPin, kind: "select", required: true, hint: "Select a state first to load cities." },
      { name: "address", label: "Business Address", icon: MapPin, kind: "textarea", maxLength: 300, placeholder: "Enter complete business address" },
      { name: "description", label: "Business Description", icon: FileText, kind: "textarea", maxLength: 500, placeholder: "Describe your business, services and expertise" },
    ],
  },
];
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)

const REVIEW_STEP = STEPS.length + 1;
const STEP_NAMES = [...STEPS.map((s) => s.name), "Review & Submit"];

/* ============================================================
   HELPERS
============================================================ */

const validate = (fields: Field[], data: FormData): FormErrors => {
  const errs: FormErrors = {};
  for (const f of fields) {
    const v = data[f.name].trim();
    if (!v) {
      if (f.required) errs[f.name] = `${f.label} is required.`;
    } else if (f.pattern && !f.pattern.test(v)) {
      errs[f.name] = f.patternMsg;
    }
  }
  return errs;
};

const clean = (d: FormData): FormData => {
  const out = Object.fromEntries(Object.entries(d).map(([k, v]) => [k, v.trim()])) as FormData;
  out.businessEmail = out.businessEmail.toLowerCase();
  return out;
};

const toPayload = (d: FormData) => {
  const c = clean(d);
  return {
    ...Object.fromEntries(Object.entries(c).map(([k, v]) => [k, v || null])),
    experience: c.experience ? Number(c.experience) : null,
  };
};

const focusField = (name: string) =>
  setTimeout(() => {
    const el = document.querySelector<HTMLElement>(`[name="${name}"]`);
    el?.focus();
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 0);

async function fetchList(url: string): Promise<Option[]> {
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message);
  return (json.data ?? []).map((x: { id: string | number; name: string }) => ({ value: String(x.id), label: x.name }));
}

function useLocations(stateId: string) {
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    fetchList("/api/v1/locations/states")
      .then(setStates)
      .catch(() => toast.error("Unable to load states. Please refresh the page."))
      .finally(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (!stateId) return setCities([]);
    let cancelled = false;
    setLoadingCities(true);
    fetchList(`/api/v1/locations/cities?stateId=${stateId}`)
      .then((d) => !cancelled && setCities(d))
      .catch(() => !cancelled && toast.error("Unable to load cities for the selected state."))
      .finally(() => !cancelled && setLoadingCities(false));
    return () => { cancelled = true; };
  }, [stateId]);

  return { states, cities, loadingStates, loadingCities };
}

const BADGES = {
  incomplete: { label: "Profile Incomplete", icon: <FileText size={15} />, tone: "neutral" },
  submitted: { label: "Profile Submitted", icon: <Check size={15} />, tone: "info" },
  review: { label: "Under Admin Verification", icon: <Hourglass size={15} />, tone: "warning" },
  rejected: { label: "Correction Required", icon: <AlertCircle size={15} />, tone: "danger" },
  verified: { label: "Company Verified", icon: <CheckCircle2 size={15} />, tone: "success" },
} as const;

/* ============================================================
   COMPONENT
============================================================ */

export default function ProfileCard() {
  const { user, checkAuth } = useAuthStore();

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [original, setOriginal] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const { states, cities, loadingStates, loadingCities } = useLocations(formData.stateId);

  /* ---------- status (single source of truth) ---------- */
  const onboarding = user?.onboardingStatus;
  const kyc = user?.company?.kycApplication;
  const submitted = !!user?.company?.onboardingCompleted;

  const isUnderReview = onboarding === "KYC_UNDER_REVIEW";
  const isRejected = onboarding === "KYC_REJECTED";
  const isVerified =
    kyc?.status === "VERIFIED" || onboarding === "SUBSCRIPTION_PENDING" || onboarding === "ACTIVE";
  const canProceed = isVerified && onboarding !== "ACTIVE"; // verified, but not paid yet

  const locked = loading || isUnderReview || isVerified || (isRejected && !isEditing);
  const hasChanges = !!original && JSON.stringify(clean(formData)) !== JSON.stringify(original);

  const status = isVerified ? "verified" : isUnderReview ? "review" : isRejected ? "rejected" : submitted ? "submitted" : "incomplete";
  const badge = BADGES[status];

  const completion = Math.round(
    (Object.values(formData).filter((v) => v.trim()).length / Object.keys(formData).length) * 100
  );
  const progress = Math.round((step / STEP_NAMES.length) * 100);

<<<<<<< HEAD
  const canSubmit = isRejected ? isEditing && hasChanges : true;

  const status: ProfileStatus = isVerified
    ? "verified"
    : isUnderReview
      ? "under_review"
      : isRejected
        ? "rejected"
        : profileSubmitted
          ? "submitted"
          : currentStep === TOTAL_STEPS
            ? "ready"
            : "incomplete";

  const STATUS_CONFIG: Record<ProfileStatus, { label: string; icon: JSX.Element; tone: string }> = {
    incomplete: { label: "Profile Incomplete", icon: <FileText size={15} />, tone: "neutral" },
    ready: { label: "Ready for Submission", icon: <CheckCircle2 size={15} />, tone: "info" },
    submitted: { label: "Profile Submitted", icon: <Check size={15} />, tone: "info" },
    under_review: { label: "Under Admin Verification", icon: <Hourglass size={15} />, tone: "warning" },
    rejected: { label: "Correction Required", icon: <AlertCircle size={15} />, tone: "danger" },
    verified: { label: "Company Verified", icon: <CheckCircle2 size={15} />, tone: "success" },
  };

  /* ------------------------------------------------------------
     LOAD STATES (once)
  ------------------------------------------------------------ */

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
>>>>>>> 0ab8559 (insert all data)
      try {
        const res = await fetch("/api/v1/locations/states");
        const data = await res.json();

<<<<<<< HEAD
        if (data.success) {
          setStates(data.data);
        }
      } catch (error) {
        console.log(error);
=======
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load states");
        }
        setStates(data.data || []);
      } catch (error) {
        console.error("FETCH STATES ERROR:", error);
        toast.error("Unable to load states. Please refresh the page.");
      } finally {
        setLoadingStates(false);
>>>>>>> 0ab8559 (insert all data)
      }
    };

    fetchStates();
  }, []);
<<<<<<< HEAD
=======

  /* ------------------------------------------------------------
     LOAD CITIES (dependent on state)
  ------------------------------------------------------------ */

>>>>>>> 0ab8559 (insert all data)
  useEffect(() => {
    if (!formData.stateId) {
      setCities([]);
      return;
    }

<<<<<<< HEAD
    const fetchCities = async () => {
      try {
        const res = await fetch(
          `/api/v1/locations/cities?stateId=${formData.stateId}`
        );

        const data = await res.json();

        if (data.success) {
          setCities(data.data);
        }
      } catch (error) {
        console.log(error);
=======
    let cancelled = false;

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const res = await fetch(`/api/v1/locations/cities?stateId=${formData.stateId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load cities");
        }
        if (!cancelled) setCities(data.data || []);
      } catch (error) {
        console.error("FETCH CITIES ERROR:", error);
        if (!cancelled) toast.error("Unable to load cities for the selected state.");
      } finally {
        if (!cancelled) setLoadingCities(false);
>>>>>>> 0ab8559 (insert all data)
      }
    };

    fetchCities();
<<<<<<< HEAD
  }, [formData.stateId]);

=======

    return () => {
      cancelled = true;
    };
  }, [formData.stateId]);

  /* ------------------------------------------------------------
     LOAD EXISTING USER DATA
  ------------------------------------------------------------ */
>>>>>>> 0ab8559 (insert all data)

=======
  /* ---------- load existing user data ---------- */
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
  useEffect(() => {
    if (!user) return;
    const c = user.company;
    const s = (v: unknown) => (v === null || v === undefined ? "" : String(v));

<<<<<<< HEAD
    setFormData({
      fullName: user.profile?.fullName || "",
      phone: user.profile?.phone || "",
      companyName: user.company?.name || "",
      gstNumber: user.company?.gstNumber || "",
      category: user.company?.category || "",
      experience: user.company?.experience
        ? String(user.company.experience)
        : "",
      stateId: user.company?.stateId || "",
      cityId: user.company?.cityId || "",
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
=======
    const loaded: FormData = {
      fullName: s(user.profile?.fullName), phone: s(user.profile?.phone),
      companyName: s(c?.name), businessType: s(c?.businessType), gstNumber: s(c?.gstNumber),
      panNumber: s(c?.panNumber), registrationNumber: s(c?.registrationNumber),
      businessEmail: s(c?.businessEmail), businessPhone: s(c?.businessPhone), website: s(c?.website),
      category: s(c?.category), experience: s(c?.experience), stateId: s(c?.stateId), cityId: s(c?.cityId),
      address: s(c?.address), description: s(c?.description),
    };

    setFormData(loaded);
    setOriginal(clean(loaded));

    if (c?.onboardingCompleted) {
      setStep(REVIEW_STEP);
      setMaxStep(REVIEW_STEP);
      setIsEditing(false);
    }
  }, [user]);

  /* ---------- handlers ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormData;
    const value = name === "gstNumber" || name === "panNumber" ? e.target.value.toUpperCase() : e.target.value;

    setFormData((p) => ({ ...p, [name]: value, ...(name === "stateId" && { cityId: "" }) }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const goTo = (n: number) => {
    if (!submitted && n > maxStep) return;
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    const errs = validate(STEPS[step - 1].fields, formData);
    setErrors(errs);
    if (Object.keys(errs).length) return focusField(Object.keys(errs)[0]);

    setMaxStep((m) => Math.max(m, step + 1));
    goTo(step + 1);
  };

<<<<<<< HEAD
  /* ------------------------------------------------------------
     STEP NAVIGATION
  ------------------------------------------------------------ */

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step: number) => {
    const allowedToJump = profileSubmitted || step <= maxStepReached;
    if (!allowedToJump) return;

    setCurrentStep(step);
    scrollTop();
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep, formData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstField = Object.keys(stepErrors)[0] as keyof FormData;
      focusField(firstField);
      return;
    }

    setErrors({});

    if (currentStep < TOTAL_STEPS) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setMaxStepReached((prev) => Math.max(prev, next));
      scrollTop();
>>>>>>> 0ab8559 (insert all data)
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
<<<<<<< HEAD
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
          stateId: formData.stateId,
          cityId: formData.cityId,
        }),
=======
      scrollTop();
    }
  };

  /* ------------------------------------------------------------
     SUBMIT
  ------------------------------------------------------------ */

=======
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
  const handleSubmit = async () => {
    if (loading) return;

    for (let i = 0; i < STEPS.length; i++) {
      const errs = validate(STEPS[i].fields, formData);
      if (Object.keys(errs).length) {
        setErrors(errs);
        setStep(i + 1);
        return focusField(Object.keys(errs)[0]);
      }
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/v1/profile/complete-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
<<<<<<< HEAD
        body: JSON.stringify(payload),
>>>>>>> 0ab8559 (insert all data)
=======
        body: JSON.stringify(toPayload(formData)),
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Unable to update your profile.");

<<<<<<< HEAD
      if (!res.ok || !data.success) {
<<<<<<< HEAD
        throw new Error(data.message || "Profile update failed");
      }

      await checkAuth();

      setMessage("Business profile updated successfully.");
      toast.success("Business profile updated successfully.");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
      toast.error(error.message || "Something went wrong");
=======
        throw new Error(data.message || "Unable to update your profile. Please try again.");
      }

      const savedFormData = normalizeForComparison(formData);
      setFormData(savedFormData);
      setOriginalFormData(savedFormData);

      const wasResubmission = profileSubmitted;

      setProfileSubmitted(true);
      setIsEditing(false);
      setCurrentStep(TOTAL_STEPS);
      setMaxStepReached(TOTAL_STEPS);

      toast.success(
        wasResubmission
          ? "Business profile resubmitted successfully."
          : "Business profile submitted successfully."
      );

      if (typeof checkAuth === "function") {
        await checkAuth();
      }
    } catch (error: any) {
      console.error("COMPLETE PROFILE ERROR:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
>>>>>>> 0ab8559 (insert all data)
=======
      toast.success(submitted ? "Business profile resubmitted successfully." : "Business profile submitted successfully.");
      await checkAuth?.(); // refreshes user -> effect above resets form, step & status
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
  return (
    <div className="dashboard-page">
=======
  const startCorrection = () => {
    setIsEditing(true);
    setErrors({});
    setCurrentStep(1);
    scrollTop();
=======
  /* ---------- rendering helpers ---------- */
  const optionsFor = (f: Field): Option[] =>
    f.name === "stateId" ? states : f.name === "cityId" ? cities : f.options ?? [];

  const displayValue = (f: Field) => {
    const v = formData[f.name];
    if (!v) return "N/A";
    if (f.kind === "select") return optionsFor(f).find((o) => o.value === v)?.label ?? v;
    return f.name === "experience" ? `${v} Years` : v;
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
  };

  const renderField = (f: Field) => {
    const err = errors[f.name];
    const Icon = f.icon;
    const isTextarea = f.kind === "textarea";
    const isCity = f.name === "cityId";
    const busy = (f.name === "stateId" && loadingStates) || (isCity && loadingCities);
    const common = { name: f.name, value: formData[f.name], onChange: handleChange, disabled: locked };

    const control =
      f.kind === "select" ? (
        <select {...common} disabled={locked || busy || (isCity && !formData.stateId)}>
          <option value="">{busy ? "Loading..." : `Select ${f.label.toLowerCase()}`}</option>
          {optionsFor(f).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea {...common} rows={4} maxLength={f.maxLength} placeholder={f.placeholder} />
      ) : (
        <input {...common} type={f.kind ?? "text"} min={f.kind === "number" ? 0 : undefined} maxLength={f.maxLength} placeholder={f.placeholder} />
      );

    // City hint only shows until a state is chosen
    const showHint = f.hint && !(isCity && formData.stateId);

    return (
      <div key={f.name} className={`profile-input-group ${isTextarea ? "profile-textarea-group full-width" : ""}`}>
        <label>
          {f.label}
          {f.required && <span className="profile-required">*</span>}
          {isTextarea && <span className="profile-char-count">{formData[f.name].length}/{f.maxLength}</span>}
        </label>
        <div className={`${isTextarea ? "profile-textarea-wrap" : "profile-input-wrap"} ${err ? "has-error" : ""}`}>
          {Icon && <Icon size={18} />}
          {control}
          {busy && <Loader2 size={16} className="profile-inline-spinner" />}
        </div>
        {err ? <small className="field-error">{err}</small> : showHint && <small className="profile-hint">{f.hint}</small>}
      </div>
    );
  };

  const renderAction = () => {
    const disabledBtn = (icon: React.ReactNode, text: string) => (
      <button type="button" className="profile-btn-primary" disabled>{icon}{text}</button>
    );

    if (canProceed)
      return (
        <Link href={SUBSCRIPTION_ROUTE} className="profile-btn-primary">
          Continue to Subscription <ChevronRight size={18} />
        </Link>
      );
    if (isVerified) return disabledBtn(<CheckCircle2 size={18} />, "Company Verified");
    if (isUnderReview) return disabledBtn(<Clock size={18} />, "Waiting for Admin Verification");
    if (isRejected && !isEditing)
      return (
        <button type="button" className="profile-btn-primary" onClick={() => { setIsEditing(true); setErrors({}); setStep(1); }}>
          <FileText size={18} /> Correct & Resubmit
        </button>
      );
    if (submitted && !isRejected) return disabledBtn(<Check size={18} />, "Profile Submitted");

    return (
      <button type="button" className="profile-btn-primary" onClick={handleSubmit} disabled={loading || (isRejected && !hasChanges)}>
        {loading ? <Loader2 size={18} className="profile-btn-spinner" /> : <Check size={18} />}
        {isRejected ? "Resubmit for Verification" : "Submit Profile"}
      </button>
    );
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="dashboard-page">
      {/* HEADER */}
>>>>>>> 0ab8559 (insert all data)
      <div className="profile-page-header">
        <div>
          <h1>Complete Business Profile</h1>
<<<<<<< HEAD
          <p>
<<<<<<< HEAD
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
=======
            Complete your business information to continue with KYC verification and unlock
            dashboard features.
          </p>
=======
          <p>Complete your business information to continue with KYC verification and unlock dashboard features.</p>
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
        </div>
        <div className={`status-badge status-badge--${badge.tone}`}>
          {badge.icon}
          {badge.label}
          <span className="status-badge__divider" />
          {completion}% Complete
        </div>
      </div>

      {/* STEPPER */}
      <div className="profile-stepper-card">
        <div className="profile-progress-head">
          <span>Step {step} of {STEP_NAMES.length}: {STEP_NAMES[step - 1]}</span>
          <span>{progress}%</span>
        </div>
        <div className="profile-progress-track">
          <div className="profile-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="profile-stepper-grid">
<<<<<<< HEAD
          {STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const active = currentStep === stepNumber;
            const completed = profileSubmitted || currentStep > stepNumber;
            const clickable = profileSubmitted || stepNumber <= maxStepReached;
>>>>>>> 0ab8559 (insert all data)

            return (
              <div
                key={step}
<<<<<<< HEAD
                className={`profile-step-item ${active ? "active" : ""
                  } ${completed ? "completed" : ""}`}
              >
                <div className="profile-step-circle">{stepNumber}</div>

                <div className="profile-step-content">
                  <strong>{step}</strong>
                  <span>Step {stepNumber}</span>
=======
                className={[
                  "profile-step-item",
                  active ? "active" : "",
                  completed ? "completed" : "",
                  !clickable ? "disabled" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => goToStep(stepNumber)}
=======
          {STEP_NAMES.map((name, i) => {
            const n = i + 1;
            const active = step === n;
            const completed = submitted || step > n;
            const clickable = submitted || n <= maxStep;
            return (
              <div
                key={name}
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
                role="button"
                aria-disabled={!clickable}
                onClick={() => goTo(n)}
                className={["profile-step-item", active && "active", completed && "completed", !clickable && "disabled"].filter(Boolean).join(" ")}
              >
                <div className="profile-step-circle">{completed ? <Check size={18} /> : n}</div>
                <div className="profile-step-content">
                  <strong>{name}</strong>
                  <span>{completed ? "Completed" : active ? "In progress" : "Pending"}</span>
>>>>>>> 0ab8559 (insert all data)
                </div>
              </div>
            );
          })}
        </div>
      </div>

<<<<<<< HEAD
      <div className="profile-form-card">
        {currentStep === 1 && (
          <div>
=======
      {/* FORM */}
      <div className="profile-form-card">
        {step < REVIEW_STEP ? (
          <div className="profile-step-fade">
>>>>>>> 0ab8559 (insert all data)
            <div className="profile-form-header">
<<<<<<< HEAD
              <h3>Personal Information</h3>
              <p>Provide your personal contact details.</p>
            </div>

            <div className="profile-form-grid">
              <div className="profile-input-group">
<<<<<<< HEAD
                <label>Full Name</label>
                <div className="profile-input-wrap">
                  <User size={18} />
                  <input
=======
                <label>
                  Full Name<span className="profile-required">*</span>
                </label>
                <div className={`profile-input-wrap ${errors.fullName ? "has-error" : ""}`}>
                  <User size={18} />
                  <input
                    ref={registerRef("fullName")}
>>>>>>> 0ab8559 (insert all data)
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
<<<<<<< HEAD
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>Phone Number</label>
                <div className="profile-input-wrap">
                  <Phone size={18} />
                  <input
=======
                    disabled={formDisabled}
                  />
                </div>
                {errors.fullName ? (
                  <small className="field-error">{errors.fullName}</small>
                ) : (
                  <small className="profile-hint">Use your name as per official records.</small>
                )}
              </div>

              <div className="profile-input-group">
                <label>
                  Personal Phone Number<span className="profile-required">*</span>
                </label>
                <div className={`profile-input-wrap ${errors.phone ? "has-error" : ""}`}>
                  <Phone size={18} />
                  <input
                    ref={registerRef("phone")}
>>>>>>> 0ab8559 (insert all data)
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
<<<<<<< HEAD
                  />
                </div>
=======
                    disabled={formDisabled}
                  />
                </div>
                {errors.phone ? (
                  <small className="field-error">{errors.phone}</small>
                ) : (
                  <small className="profile-hint">We may use this number for verification.</small>
                )}
>>>>>>> 0ab8559 (insert all data)
              </div>
=======
              <h3>{STEPS[step - 1].title}</h3>
              <p>{STEPS[step - 1].subtitle}</p>
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
            </div>
            <div className="profile-form-grid">{STEPS[step - 1].fields.map(renderField)}</div>
          </div>
<<<<<<< HEAD
        )}

        {currentStep === 2 && (
<<<<<<< HEAD
          <div>
            <div className="profile-form-header">
              <h3>Company Information</h3>
              <p>Provide your registered business details.</p>
=======
          <div className="profile-step-fade">
            <div className="profile-form-header">
              <h3>Company Information</h3>
              <p>Provide your registered business information.</p>
>>>>>>> 0ab8559 (insert all data)
            </div>

            <div className="profile-form-grid">
              <div className="profile-input-group">
<<<<<<< HEAD
                <label>Company Name</label>
                <div className="profile-input-wrap">
                  <Building2 size={18} />
                  <input
=======
                <label>
                  Company Name<span className="profile-required">*</span>
                </label>
                <div className={`profile-input-wrap ${errors.companyName ? "has-error" : ""}`}>
                  <Building2 size={18} />
                  <input
                    ref={registerRef("companyName")}
>>>>>>> 0ab8559 (insert all data)
                    type="text"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
<<<<<<< HEAD
=======
                    disabled={formDisabled}
                  />
                </div>
                {errors.companyName && <small className="field-error">{errors.companyName}</small>}
              </div>

              <div className="profile-input-group">
                <label>
                  Business Type<span className="profile-required">*</span>
                </label>
                <select
                  ref={registerRef("businessType") as any}
                  name="businessType"
                  className={errors.businessType ? "has-error" : ""}
                  value={formData.businessType}
                  onChange={handleChange}
                  disabled={formDisabled}
                >
                  <option value="">Select business type</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.businessType && <small className="field-error">{errors.businessType}</small>}
              </div>

              <div className="profile-input-group">
                <label>GST Number</label>
                <div className={`profile-input-wrap ${errors.gstNumber ? "has-error" : ""}`}>
                  <BriefcaseBusiness size={18} />
                  <input
                    ref={registerRef("gstNumber")}
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST number"
                    maxLength={15}
                    value={formData.gstNumber}
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </div>
                {errors.gstNumber ? (
                  <small className="field-error">{errors.gstNumber}</small>
                ) : (
                  <small className="profile-hint">15 characters, e.g. 22AAAAA0000A1Z5</small>
                )}
              </div>

              <div className="profile-input-group">
                <label>PAN Number</label>
                <div className={`profile-input-wrap ${errors.panNumber ? "has-error" : ""}`}>
                  <FileText size={18} />
                  <input
                    ref={registerRef("panNumber")}
                    type="text"
                    name="panNumber"
                    placeholder="Enter PAN number"
                    maxLength={10}
                    value={formData.panNumber}
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </div>
                {errors.panNumber ? (
                  <small className="field-error">{errors.panNumber}</small>
                ) : (
                  <small className="profile-hint">10 characters, e.g. ABCDE1234F</small>
                )}
              </div>

              <div className="profile-input-group">
                <label>Registration Number</label>
                <div className="profile-input-wrap">
                  <FileText size={18} />
                  <input
                    type="text"
                    name="registrationNumber"
                    placeholder="Enter registration number"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    disabled={formDisabled}
>>>>>>> 0ab8559 (insert all data)
                  />
                </div>
              </div>

              <div className="profile-input-group">
<<<<<<< HEAD
                <label>GST Number</label>
                <div className="profile-input-wrap">
                  <BriefcaseBusiness size={18} />
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gstNumber: e.target.value.toUpperCase(),
                      }))
                    }
                  />
                </div>
=======
                <label>Business Email</label>
                <div className={`profile-input-wrap ${errors.businessEmail ? "has-error" : ""}`}>
                  <Mail size={18} />
                  <input
                    ref={registerRef("businessEmail")}
                    type="email"
                    name="businessEmail"
                    placeholder="business@example.com"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </div>
                {errors.businessEmail && <small className="field-error">{errors.businessEmail}</small>}
              </div>

              <div className="profile-input-group">
                <label>Business Phone</label>
                <div className="profile-input-wrap">
                  <Phone size={18} />
                  <input
                    type="text"
                    name="businessPhone"
                    placeholder="Enter business phone"
                    value={formData.businessPhone}
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>Website</label>
                <div className={`profile-input-wrap ${errors.website ? "has-error" : ""}`}>
                  <Globe size={18} />
                  <input
                    ref={registerRef("website")}
                    type="url"
                    name="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </div>
                {errors.website && <small className="field-error">{errors.website}</small>}
>>>>>>> 0ab8559 (insert all data)
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
<<<<<<< HEAD
          <div>
            <div className="profile-form-header">
              <h3>Business Details</h3>
              <p>Add category, location and business experience.</p>
=======
          <div className="profile-step-fade">
            <div className="profile-form-header">
              <h3>Business Details</h3>
              <p>Add your business category, experience, address and location.</p>
>>>>>>> 0ab8559 (insert all data)
            </div>

            <div className="profile-form-grid">
              <div className="profile-input-group">
<<<<<<< HEAD
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
=======
                <label>
                  Business Category<span className="profile-required">*</span>
                </label>
                <select
                  ref={registerRef("category") as any}
                  name="category"
                  className={errors.category ? "has-error" : ""}
                  value={formData.category}
                  onChange={handleChange}
                  disabled={formDisabled}
                >
                  <option value="">Select category</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <small className="field-error">{errors.category}</small>}
>>>>>>> 0ab8559 (insert all data)
              </div>

              <div className="profile-input-group">
                <label>Experience (Years)</label>
<<<<<<< HEAD
                <input
                  type="number"
                  name="experience"
                  placeholder="Enter experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-input-group">
                <label>State</label>
                <select
                  name="stateId"
                  value={formData.stateId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stateId: e.target.value,
                      cityId: "",
                    }))
                  }
                >
                  <option value="">Select state</option>

                  {states.map((state: any) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="profile-input-group">
                <label>City</label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  disabled={!formData.stateId}
                >
                  <option value="">Select city</option>

                  {cities.map((city: any) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
=======
                <div className="profile-input-wrap">
                  <Clock size={18} />
                  <input
                    type="number"
                    min="0"
                    name="experience"
                    placeholder="Enter experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>
                  State<span className="profile-required">*</span>
                </label>
                <div className={`profile-input-wrap ${errors.stateId ? "has-error" : ""}`}>
                  <MapPin size={18} />
                  <select
                    ref={registerRef("stateId") as any}
                    name="stateId"
                    value={formData.stateId}
                    onChange={handleStateChange}
                    disabled={formDisabled || loadingStates}
                  >
                    <option value="">{loadingStates ? "Loading states..." : "Select state"}</option>
                    {states.map((state) => (
                      <option key={String(state.id)} value={String(state.id)}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {loadingStates && <Loader2 size={16} className="profile-inline-spinner" />}
                </div>
                {errors.stateId && <small className="field-error">{errors.stateId}</small>}
              </div>

              <div className="profile-input-group">
                <label>
                  City<span className="profile-required">*</span>
                </label>
                <div className={`profile-input-wrap ${errors.cityId ? "has-error" : ""}`}>
                  <MapPin size={18} />
                  <select
                    ref={registerRef("cityId") as any}
                    name="cityId"
                    value={formData.cityId}
                    onChange={handleChange}
                    disabled={!formData.stateId || formDisabled || loadingCities}
                  >
                    <option value="">
                      {loadingCities ? "Loading cities..." : "Select city"}
                    </option>
                    {cities.map((city) => (
                      <option key={String(city.id)} value={String(city.id)}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {loadingCities && <Loader2 size={16} className="profile-inline-spinner" />}
                </div>
                {errors.cityId ? (
                  <small className="field-error">{errors.cityId}</small>
                ) : (
                  !formData.stateId && (
                    <small className="profile-hint">Select a state first to load cities.</small>
                  )
                )}
              </div>

              <div className="profile-input-group profile-textarea-group full-width">
                <label>
                  Business Address
                  <span className="profile-char-count">{formData.address.length}/300</span>
                </label>
                <div className="profile-textarea-wrap">
                  <MapPin size={18} />
                  <textarea
                    name="address"
                    placeholder="Enter complete business address"
                    value={formData.address}
                    onChange={handleChange}
                    maxLength={300}
                    rows={4}
                    disabled={formDisabled}
                  />
                </div>
              </div>

              <div className="profile-input-group profile-textarea-group full-width">
                <label>
                  Business Description
                  <span className="profile-char-count">{formData.description.length}/500</span>
                </label>
                <div className="profile-textarea-wrap">
                  <FileText size={18} />
                  <textarea
                    name="description"
                    placeholder="Describe your business, services and expertise"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={500}
                    rows={5}
                    disabled={formDisabled}
                  />
                </div>
>>>>>>> 0ab8559 (insert all data)
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
<<<<<<< HEAD
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
                <strong>{cities.find((c: any) => c.id === formData.cityId)?.name || "N/A"}</strong>
              </div>

              <div className="profile-review-item">
                <span>State</span>
                <strong>{states.find((s: any) => s.id === formData.stateId)?.name || "N/A"}</strong>
=======
=======
        ) : (
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
          <div className="profile-step-fade">
            <div className="profile-form-header">
              <h3>Review Information</h3>
              <p>
                {isUnderReview
                  ? "Your business information is currently under admin verification."
                  : isVerified
                    ? "Your company is verified. Continue to choose your subscription plan."
                    : "Verify all information before submission."}
              </p>
            </div>

            {isRejected && (
              <div className="rejection-box">
                <div className="rejection-box__title"><AlertCircle size={18} /> Correction Required</div>
                <p className="rejection-box__lead">Your company information needs correction before it can be verified.</p>
                {kyc?.rejectionReason && (
                  <div className="rejection-box__message">
                    <span>Admin Message</span>
                    <p>{kyc.rejectionReason}</p>
                  </div>
                )}
              </div>
            )}

            {STEPS.map(({ title, icon: Icon, fields }) => (
              <div key={title} className="profile-review-section">
                <div className="profile-review-title"><Icon size={16} /> {title}</div>
                <div className="profile-review-grid">
                  {fields.map((f) => (
                    <div key={f.name} className={`profile-review-item ${f.kind === "textarea" ? "full-width" : ""}`}>
                      <span>{f.label}</span>
                      <strong>{displayValue(f)}</strong>
                    </div>
                  ))}
                </div>
              </div>
<<<<<<< HEAD
            </div>

            <div className="profile-review-section">
              <div className="profile-review-title">
                <Building2 size={16} />
                Company Details
              </div>
              <div className="profile-review-grid">
                <div className="profile-review-item">
                  <span>Company Name</span>
                  <strong>{formData.companyName || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>Business Type</span>
                  <strong>{selectedBusinessType?.label || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>GST Number</span>
                  <strong>{formData.gstNumber || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>PAN Number</span>
                  <strong>{formData.panNumber || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>Registration Number</span>
                  <strong>{formData.registrationNumber || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>Business Email</span>
                  <strong>{formData.businessEmail || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>Business Phone</span>
                  <strong>{formData.businessPhone || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>Website</span>
                  <strong>
                    {formData.website ? (
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-review-link"
                      >
                        {formData.website}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </strong>
                </div>
              </div>
            </div>

            <div className="profile-review-section">
              <div className="profile-review-title">
                <Layers size={16} />
                Business & Location
              </div>
              <div className="profile-review-grid">
                <div className="profile-review-item">
                  <span>Category</span>
                  <strong>{formData.category || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>Experience</span>
                  <strong>{formData.experience || "0"} Years</strong>
                </div>
                <div className="profile-review-item">
                  <span>State</span>
                  <strong>{selectedState?.name || "N/A"}</strong>
                </div>
                <div className="profile-review-item">
                  <span>City</span>
                  <strong>{selectedCity?.name || "N/A"}</strong>
                </div>
                <div className="profile-review-item full-width">
                  <span>Business Address</span>
                  <strong>{formData.address || "N/A"}</strong>
                </div>
                <div className="profile-review-item full-width">
                  <span>Business Description</span>
                  <strong>{formData.description || "N/A"}</strong>
                </div>
>>>>>>> 0ab8559 (insert all data)
              </div>
            </div>
=======
            ))}
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
          </div>
        )}

<<<<<<< HEAD
=======
        {/* ACTIONS */}
>>>>>>> 0ab8559 (insert all data)
        <div className="profile-form-actions">
<<<<<<< HEAD
          {currentStep > 1 && (
            <button
              type="button"
              className="profile-btn-secondary"
              onClick={prevStep}
<<<<<<< HEAD
=======
              disabled={loading}
>>>>>>> 0ab8559 (insert all data)
            >
              <ChevronLeft size={18} />
              Previous
            </button>
          )}

<<<<<<< HEAD
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
=======
          {currentStep < TOTAL_STEPS ? (
            <button type="button" className="profile-btn-primary" onClick={nextStep} disabled={loading}>
              Continue
              <ChevronRight size={18} />
            </button>
          ) : !profileSubmitted ? (
>>>>>>> 0ab8559 (insert all data)
            <button
              type="button"
              className="profile-btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
<<<<<<< HEAD
              {loading ? "Submitting..." : "Submit Profile"}
=======
              {loading ? (
                <>
                  <Loader2 size={18} className="profile-btn-spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Submit Profile
                </>
              )}
            </button>
          ) : isRejected && !isEditing ? (
            <button type="button" className="profile-btn-primary" onClick={startCorrection}>
              <FileText size={18} />
              Correct & Resubmit
            </button>
          ) : isRejected && isEditing ? (
            <button
              type="button"
              className="profile-btn-primary"
              onClick={handleSubmit}
              disabled={loading || !canSubmit}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="profile-btn-spinner" />
                  Resubmitting...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Resubmit for Verification
                </>
              )}
            </button>
          ) : isUnderReview ? (
            <button type="button" className="profile-btn-primary" disabled>
              <Clock size={18} />
              Waiting for Admin Verification
            </button>
          ) : isVerified ? (
            <button type="button" className="profile-btn-primary" disabled>
              <CheckCircle2 size={18} />
              Company Verified
            </button>
          ) : (
            <button type="button" className="profile-btn-primary" disabled>
              <Check size={18} />
              Profile Submitted
>>>>>>> 0ab8559 (insert all data)
            </button>
=======
          {step > 1 && (
            <button type="button" className="profile-btn-secondary" onClick={() => goTo(step - 1)} disabled={loading}>
              <ChevronLeft size={18} /> Previous
            </button>
          )}
          {step < REVIEW_STEP ? (
            <button type="button" className="profile-btn-primary" onClick={next} disabled={loading}>
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            renderAction()
>>>>>>> a4fa27d (Add subscription plans and update subscription flow)
          )}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 0ab8559 (insert all data)
