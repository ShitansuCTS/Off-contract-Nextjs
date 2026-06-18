import { create } from "zustand";

export interface PublicProduct {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  category: string;
  subCategory?: string | null;
  price?: number | null;
  unit?: string | null;
  brand?: string | null;
  productModel?: string | null;
  imageUrl?: string | null;
  company?: {
    name?: string;
    category?: string;
  } | null;
  city?: {
    name?: string;
  } | null;
  state?: {
    name?: string;
  } | null;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PublicProductsStore {
  products: PublicProduct[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;

  fetchPublicProducts: () => Promise<void>;
  setPage: (page: number) => void;
}

export const usePublicProductsStore = create<PublicProductsStore>(
  (set, get) => ({
    products: [],
    pagination: null,
    loading: false,
    error: null,
    page: 1,
    limit: 4,

    fetchPublicProducts: async () => {
      try {
        set({ loading: true, error: null });

        const { page, limit } = get();

        const res = await fetch(
          `/api/v1/products?page=${page}&limit=${limit}`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        set({
          products: data.data || [],
          pagination: data.pagination || null,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Something went wrong",
        });
      } finally {
        set({ loading: false });
      }
    },

    setPage: (page) => {
      set({ page });
      setTimeout(() => get().fetchPublicProducts(), 0);
    },
  }),
);
