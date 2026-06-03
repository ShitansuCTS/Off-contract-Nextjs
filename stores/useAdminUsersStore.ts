import { create } from "zustand";
import toast from "react-hot-toast";

export type UserRole = "ADMIN" | "SUPPLIER" | "AGENCY";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type VerificationStatus =
  | "PROFILE_PENDING"
  | "PENDING_APPROVAL"
  | "VERIFIED"
  | "REJECTED";

export type SubscriptionStatus = "PENDING" | "ACTIVE" | "EXPIRED" | "FAILED";

export interface AdminUserProfile {
  id: string;
  fullName: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUserLocation {
  id: string;
  name: string;
  slug: string;
  stateId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUserCompany {
  id: string;
  name: string;
  gstNumber?: string | null;
  category: string;
  experience?: number | null;
  verificationStatus: VerificationStatus;
  rejectionReason?: string | null;
  state?: AdminUserLocation | null;
  city?: AdminUserLocation | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUserSubscription {
  id: string;
  planName: string;
  amount: number;
  status: SubscriptionStatus;
  paymentId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
  profile?: AdminUserProfile | null;
  company?: AdminUserCompany | null;
  subscriptions?: AdminUserSubscription[];
}

export interface UserTimelineStep {
  key: string;
  label: string;
  completed: boolean;
  status?: VerificationStatus;
  reason?: string | null;
}

export interface AdminUsersPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface AdminUsersFilters {
  page: number;
  limit: number;
  search: string;
  role: "" | UserRole;
  status: "" | UserStatus;
  verificationStatus: "" | VerificationStatus;
}

interface AdminUsersStore {
  users: AdminUser[];
  selectedUser: AdminUser | null;
  timeline: UserTimelineStep[];

  pagination: AdminUsersPagination | null;

  loading: boolean;
  detailsLoading: boolean;
  error: string;

  drawerOpen: boolean;

  filters: AdminUsersFilters;

  setFilter: <K extends keyof AdminUsersFilters>(
    key: K,
    value: AdminUsersFilters[K],
  ) => void;

  resetFilters: () => void;

  fetchUsers: () => Promise<void>;
  fetchUserDetails: (userId: string) => Promise<void>;

  openUserDrawer: (userId: string) => Promise<void>;
  closeUserDrawer: () => void;
}

export const useAdminUsersStore = create<AdminUsersStore>((set, get) => ({
  users: [],
  selectedUser: null,
  timeline: [],

  pagination: null,

  loading: false,
  detailsLoading: false,
  error: "",

  drawerOpen: false,

  filters: {
    page: 1,
    limit: 10,
    search: "",
    role: "",
    status: "",
    verificationStatus: "",
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        page: key === "page" ? Number(value) : 1,
      },
    })),

  resetFilters: () =>
    set({
      filters: {
        page: 1,
        limit: 10,
        search: "",
        role: "",
        status: "",
        verificationStatus: "",
      },
    }),

  fetchUsers: async () => {
    const { filters } = get();

    try {
      set({ loading: true, error: "" });

      const query = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) query.append(key, String(value));
      });

      const res = await fetch(`/api/v1/admin/users?${query.toString()}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch users");
      }

      set({
        users: result.data || [],
        pagination: result.pagination || null,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch users";

      set({ error: message });
      toast.error(message);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserDetails: async (userId) => {
    try {
      set({
        detailsLoading: true,
        error: "",
      });

      const res = await fetch(`/api/v1/admin/users/${userId}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch user details");
      }

      set({
        selectedUser: result.data || null,
        timeline: result.timeline || [],
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch user details";

      set({ error: message });
      toast.error(message);
    } finally {
      set({ detailsLoading: false });
    }
  },

  openUserDrawer: async (userId) => {
    set({
      drawerOpen: true,
      selectedUser: null,
      timeline: [],
    });

    await get().fetchUserDetails(userId);
  },

  closeUserDrawer: () =>
    set({
      drawerOpen: false,
      selectedUser: null,
      timeline: [],
    }),
}));
