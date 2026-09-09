"use client";

import { useEffect } from "react";
import { useLeadStore } from "@/stores/useLeadStore";

import LeadsHeader from "@/components/dashboard/leads/LeadsHeader";
import LeadsStats from "@/components/dashboard/leads/LeadsStats";
import LeadsFilters from "@/components/dashboard/leads/LeadsFilters";
import LeadsTable from "@/components/dashboard/leads/LeadsTable";
import LeadsPagination from "@/components/dashboard/leads/LeadsPagination";

import "@/styles/dashboard/leads/dashboard-leads.css";

export default function DashboardLeadsPage() {
  const filters = useLeadStore((state) => state.filters);
  const fetchLeads = useLeadStore((state) => state.fetchLeads);

  useEffect(() => {
    fetchLeads();
  }, [
    filters.page,
    filters.limit,
    filters.status,
    filters.priority,
    filters.formType,
    filters.search,
    filters.sortBy,
    filters.sortOrder,
    fetchLeads,
  ]);

  return (
    <div className="dashboard-page leads-page">
      <LeadsHeader />
      <LeadsStats />
      <LeadsFilters />
      <LeadsTable />
      <LeadsPagination />
    </div>
  );
}
