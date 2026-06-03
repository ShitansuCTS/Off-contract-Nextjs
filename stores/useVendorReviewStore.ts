import { create } from "zustand";
import toast from "react-hot-toast";

export type VendorRole = "SUPPLIER" | "AGENCY";
export type VerificationStatus =
  | "PROFILE_PENDING"
  | "PENDING_APPROVAL"
  | "VERIFIED"
  | "REJECTED";

export interface VendorProfile {
  fullName: string;
  phone: string;
}

export interface VendorLocation {
  id: string;
  name: string;
  slug: string;
  stateId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VendorCompany {
  id: string;
  name: string;
  gstNumber?: string | null;
  category: string;
  experience?: number | null;
  verificationStatus: VerificationStatus;
  rejectionReason?: string | null;
  state?: VendorLocation | null;
  city?: VendorLocation | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface VendorSubscription {
  id: string;
  planName: string;
  amount: number;
  status: string;
  paymentId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  createdAt?: string;
}

export interface Vendor {
  id: string;
  email: string;
  role: VendorRole;
  status: string;
  createdAt: string;
  profile?: VendorProfile | null;
  company?: VendorCompany | null;
  subscriptions?: VendorSubscription[];
}

interface VendorFilters {
  search: string;
  status: VerificationStatus;
  role: "" | VendorRole;
  limit: number;
}

interface VendorReviewStore {
  vendors: Vendor[];
  loading: boolean;
  actionLoading: boolean;
  error: string;

  filters: VendorFilters;

  setFilter: <K extends keyof VendorFilters>(
    key: K,
    value: VendorFilters[K],
  ) => void;

  fetchVendors: () => Promise<void>;
  approveVendor: (userId: string) => Promise<void>;
  rejectVendor: (userId: string, reason: string) => Promise<void>;
}

export const useVendorReviewStore = create<VendorReviewStore>((set, get) => ({
  vendors: [],
  loading: false,
  actionLoading: false,
  error: "",

  filters: {
    search: "",
    status: "PENDING_APPROVAL",
    role: "",
    limit: 10,
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  fetchVendors: async () => {
    const { filters } = get();

    try {
      set({ loading: true, error: "" });

      const res = await fetch("/api/v1/admin/vendors/pending", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch vendors");
      }

      let vendors: Vendor[] = result.vendors || [];

      if (filters.search) {
        const search = filters.search.toLowerCase();

        vendors = vendors.filter((vendor) => {
          return (
            vendor.email?.toLowerCase().includes(search) ||
            vendor.profile?.fullName?.toLowerCase().includes(search) ||
            vendor.profile?.phone?.toLowerCase().includes(search) ||
            vendor.company?.name?.toLowerCase().includes(search) ||
            vendor.company?.gstNumber?.toLowerCase().includes(search)
          );
        });
      }

      if (filters.role) {
        vendors = vendors.filter((vendor) => vendor.role === filters.role);
      }

      vendors = vendors.slice(0, Number(filters.limit));

      set({ vendors });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch vendors",
      });
    } finally {
      set({ loading: false });
    }
  },

  approveVendor: async (userId) => {
    try {
      set({ actionLoading: true });

      const res = await fetch(`/api/v1/admin/vendors/${userId}/approve`, {
        method: "PATCH",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to approve vendor");
      }

      set((state) => ({
        vendors: state.vendors.filter((vendor) => vendor.id !== userId),
      }));

      toast.success("Vendor approved successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to approve vendor",
      );
    } finally {
      set({ actionLoading: false });
    }
  },

  rejectVendor: async (userId, reason) => {
    try {
      set({ actionLoading: true });

      const res = await fetch(`/api/v1/admin/vendors/${userId}/reject`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to reject vendor");
      }

      set((state) => ({
        vendors: state.vendors.filter((vendor) => vendor.id !== userId),
      }));

      toast.success("Vendor rejected successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reject vendor",
      );
    } finally {
      set({ actionLoading: false });
    }
  },
}));
