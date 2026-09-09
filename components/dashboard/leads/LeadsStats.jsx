"use client";

import { useLeadStore } from "@/stores/useLeadStore";
import { CheckCircle2, Clock3, Inbox, Timer } from "lucide-react";

export default function LeadsStats() {
  const { pagination, leads } = useLeadStore();

  const total = pagination?.total || 0;
  const newLeads = leads.filter((lead) => lead.status === "NEW").length;
  const inProgress = leads.filter((lead) => lead.status === "IN_PROGRESS").length;
  const closed = leads.filter((lead) => lead.status === "CLOSED").length;

  const stats = [
    { label: "Total Leads", value: total, icon: Inbox, tone: "blue" },
    { label: "New Leads", value: newLeads, icon: Clock3, tone: "yellow" },
    { label: "In Progress", value: inProgress, icon: Timer, tone: "teal" },
    { label: "Closed Leads", value: closed, icon: CheckCircle2, tone: "green" },
  ];

  return (
    <div className="leads-stats-grid">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <div className="leads-stat-card" key={label}>
          <div className={`leads-stat-icon leads-stat-icon-${tone}`}><Icon size={19} /></div>
          <div>
            <span>{label}</span>
            <h3>{value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}