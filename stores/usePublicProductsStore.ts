import { create } from "zustand";

export interface PublicProduct {
  id: string;
  title: string;
  slug: string;
  description?: string | null;

  category?: {
    id?: string;
    name?: string;
    slug?: string;
  } | null;

  subCategory?: {
    id?: string;
    name?: string;
    slug?: string;
  } | null;

  price?: number | null;
  unit?: string | null;
  stock?: number | null;
  brand?: string | null;
  productModel?: string | null;
  imageUrl?: string | null;
  status?: string;

  user?: {
    id?: string;
    email?: string;
    role?: string;
  } | null;

  company?: {
    name?: string;
    category?: string;
  } | null;

  city?: {
    name?: string;
    slug?: string;
  } | null;

  state?: {
    name?: string;
    slug?: string;
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
  productDetails: PublicProduct | null;
  pagination: Pagination | null;

  loading: boolean;
  detailsLoading: boolean;
  error: string | null;

  page: number;
  limit: number;

  // Cache timestamps
  productsFetchedAt: number | null;
  productDetailsFetchedAt: number | null;

  fetchPublicProducts: (customLimit?: number, force?: boolean) => Promise<void>;

  fetchPublicProductDetails: (slug: string, force?: boolean) => Promise<void>;

  setPage: (page: number) => void;
  clearProductsCache: () => void;
}

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const usePublicProductsStore = create<PublicProductsStore>(
  (set, get) => ({
    products: [],
    productDetails: null,
    pagination: null,

    loading: false,
    detailsLoading: false,
    error: null,

    page: 1,
    limit: 9,

    productsFetchedAt: null,
    productDetailsFetchedAt: null,

    // =========================================================
    // FETCH PUBLIC PRODUCTS
    // =========================================================

    fetchPublicProducts: async (customLimit, force = false) => {
      const { page, limit, products, productsFetchedAt, loading } = get();

      const finalLimit = customLimit || limit;

      const now = Date.now();

      // ---------------------------------------------------------
      // Prevent duplicate API calls
      // ---------------------------------------------------------

      if (loading) {
        return;
      }

      // ---------------------------------------------------------
      // Use existing Zustand data if cache is still valid
      // ---------------------------------------------------------

      const cacheIsValid =
        !force &&
        products.length > 0 &&
        productsFetchedAt !== null &&
        now - productsFetchedAt < CACHE_TIME;

      if (cacheIsValid) {
        return;
      }

      try {
        set({
          loading: true,
          error: null,
        });

        const res = await fetch(
          `/api/v1/products?page=${page}&limit=${finalLimit}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        set({
          products: data.data || [],
          pagination: data.pagination || null,
          productsFetchedAt: Date.now(),
          loading: false,
          error: null,
        });
      } catch (error) {
        set({
          loading: false,
          error:
            error instanceof Error ? error.message : "Something went wrong",
        });
      }
    },

    // =========================================================
    // FETCH PRODUCT DETAILS
    // =========================================================

    fetchPublicProductDetails: async (slug, force = false) => {
      const { productDetails, productDetailsFetchedAt, detailsLoading } = get();

      const now = Date.now();

      // ---------------------------------------------------------
      // Prevent duplicate requests
      // ---------------------------------------------------------

      if (detailsLoading) {
        return;
      }

      // ---------------------------------------------------------
      // Use cached details if still valid
      // ---------------------------------------------------------

      const cacheIsValid =
        !force &&
        productDetails?.slug === slug &&
        productDetailsFetchedAt !== null &&
        now - productDetailsFetchedAt < CACHE_TIME;

      if (cacheIsValid) {
        return;
      }

      try {
        set({
          detailsLoading: true,
          error: null,
        });

        const res = await fetch(`/api/v1/products/public/${slug}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch product details");
        }

        set({
          productDetails: data.data || null,
          productDetailsFetchedAt: Date.now(),
          detailsLoading: false,
          error: null,
        });
      } catch (error) {
        set({
          detailsLoading: false,
          error:
            error instanceof Error ? error.message : "Something went wrong",
        });
      }
    },

    // =========================================================
    // PAGINATION
    // =========================================================

    setPage: (page) => {
      const currentPage = get().page;

      if (currentPage === page) {
        return;
      }

      set({
        page,
        products: [],
        productsFetchedAt: null,
      });

      get().fetchPublicProducts();
    },

    // =========================================================
    // CLEAR CACHE
    // =========================================================

    clearProductsCache: () => {
      set({
        products: [],
        pagination: null,
        productsFetchedAt: null,
        error: null,
      });
    },
  }),
);
