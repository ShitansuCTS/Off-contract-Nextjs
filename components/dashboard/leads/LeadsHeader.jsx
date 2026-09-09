import { ClipboardList, RefreshCw } from "lucide-react";
import { useLeadStore } from "@/stores/useLeadStore";

export default function LeadsHeader() {
  const fetchLeads = useLeadStore((state) => state.fetchLeads);
  const loading = useLeadStore((state) => state.loading);

  return (
    <div className="leads-page-header">
      <div className="leads-page-title">
        <div className="leads-page-title-icon"><ClipboardList size={21} /></div>
        <div>
          <span>Workspace</span>
          <h2>Leads Management</h2>
          <p>Track, prioritize, and follow up on every customer enquiry.</p>
        </div>
      </div>

      <button
        type="button"
        className="leads-refresh-btn"
        onClick={() => fetchLeads(true)}
        disabled={loading}
      >
        <RefreshCw size={16} className={loading ? "leads-spin" : ""} />
        {loading ? "Refreshing" : "Refresh data"}
      </button>
    </div>
  );
}