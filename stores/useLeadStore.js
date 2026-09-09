import { create } from "zustand";

export const useLeadStore = create((set, get) => ({
    leads: [],
    pagination: null,
    loading: false,
    error: "",
    fetchedKey: "",
    selectedLead: null,
    drawerOpen: false,
    detailsLoading: false,

    filters: {
        page: 1,
        limit: 10,
        status: "",
        priority: "",
        formType: "",
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
    },

    setFilter: (key, value) =>
        set((state) => {
            if (state.filters[key] === value) return state;

            return {
                filters: {
                    ...state.filters,
                    [key]: value,
                    page: key === "page" ? value : 1,
                },
            };
        }),

    fetchLeads: async (force = false) => {
        const { filters } = get();
        const requestKey = JSON.stringify(filters);

        if (!force && get().fetchedKey === requestKey && !get().error) {
            return;
        }

        if (get().loading) return;

        try {
            set({ loading: true, error: "" });

            const query = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value) query.append(key, value);
            });

            const res = await fetch(`/api/v1/leads?${query.toString()}`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to fetch leads");
            }

            set({
                leads: result.data || [],
                pagination: result.pagination,
                fetchedKey: requestKey,
            });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch leads" });
        } finally {
            set({ loading: false });
        }
    },

    updateLead: async (leadId, changes) => {
        const res = await fetch(`/api/v1/leads/${leadId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(changes),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error(result.message || "Failed to update lead");
        }

        const updatedLead = result.data;

        set((state) => ({
            leads: state.leads.map((lead) =>
                lead.id === leadId ? { ...lead, ...updatedLead } : lead,
            ),
            selectedLead: state.selectedLead?.id === leadId
                ? { ...state.selectedLead, ...updatedLead }
                : state.selectedLead,
        }));

        return updatedLead;
    },

    openLeadDrawer: (lead) => set({ drawerOpen: true, selectedLead: lead }),

    closeLeadDrawer: () => set({ drawerOpen: false, selectedLead: null }),
}));