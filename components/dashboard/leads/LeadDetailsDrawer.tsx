"use client";

import { X } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useLeadStore } from "@/stores/useLeadStore";
import LeadStatusBadge from "./LeadStatusBadge";

export default function LeadDetailsDrawer() {
  const drawerOpen = useLeadStore((state) => state.drawerOpen);
  const selectedLead = useLeadStore((state) => state.selectedLead);
  const detailsLoading = useLeadStore((state) => state.detailsLoading);
  const closeLeadDrawer = useLeadStore((state) => state.closeLeadDrawer);
  const updateLead = useLeadStore((state) => state.updateLead);

  if (!drawerOpen) return null;

  return (
    <div className="leads-drawer-overlay" onClick={closeLeadDrawer}>
      <aside className="leads-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="leads-drawer-header">
          <div>
            <span className="leads-drawer-eyebrow">Lead details</span>
            <h3>
              {detailsLoading ? <Skeleton width={190} /> : selectedLead?.name || "Unnamed lead"}
            </h3>
            <p>{detailsLoading ? <Skeleton width={140} /> : selectedLead?.formType || "General enquiry"}</p>
          </div>
          <button type="button" className="leads-drawer-close" onClick={closeLeadDrawer} aria-label="Close lead details">
            <X size={18} />
          </button>
        </div>

        <div className="leads-drawer-body">
          {detailsLoading || !selectedLead ? (
            <DrawerSkeleton />
          ) : (
            <>
              <section>
                <h4>Customer details</h4>
                <Info label="Email" value={selectedLead.email} href={`mailto:${selectedLead.email}`} />
                <Info label="Phone" value={selectedLead.phone} href={`tel:${selectedLead.phone}`} />
                <Info label="Subject" value={selectedLead.subject} />
                <Info label="Received" value={new Date(selectedLead.createdAt).toLocaleString("en-IN")} />
              </section>

              <section>
                <h4>Request</h4>
                {selectedLead.formData?.productName && <Info label="Requested item" value={selectedLead.formData.productName} />}
                <div className="leads-drawer-message">{selectedLead.message || "No message provided."}</div>
                <Info label="Source page" value={selectedLead.sourcePage} />
              </section>

              <section>
                <h4>Follow-up</h4>
                <div className="leads-drawer-status-row">
                  <span>Current status</span>
                  <LeadStatusBadge status={selectedLead.status} />
                </div>
                <div className="leads-drawer-status-row">
                  <span>Priority</span>
                  <strong className={`leads-priority leads-priority-${selectedLead.priority?.toLowerCase()}`}>{selectedLead.priority}</strong>
                </div>
                <label className="leads-drawer-field">
                  Status
                  <select value={selectedLead.status} onChange={(event) => updateLead(selectedLead.id, { status: event.target.value })}>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="CLOSED">Closed</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </label>
                <label className="leads-drawer-field">
                  Priority
                  <select value={selectedLead.priority} onChange={(event) => updateLead(selectedLead.id, { priority: event.target.value })}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </label>
                <label className="leads-drawer-field">
                  Admin notes
                  <textarea
                    defaultValue={selectedLead.adminNotes || ""}
                    maxLength={5000}
                    rows={5}
                    onBlur={(event) => updateLead(selectedLead.id, { adminNotes: event.target.value || null })}
                  />
                </label>
              </section>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function Info({ label, value, href }: { label: string; value?: string | null; href?: string }) {
  return (
    <div className="leads-drawer-info-row">
      <span>{label}</span>
      <strong>{href && value ? <a href={href}>{value}</a> : value || "N/A"}</strong>
    </div>
  );
}

function DrawerSkeleton() {
  return <>{Array.from({ length: 3 }).map((_, index) => <section key={index}><Skeleton width={140} height={18} /><Skeleton height={16} style={{ marginTop: 16 }} /><Skeleton height={16} style={{ marginTop: 12 }} /><Skeleton height={16} style={{ marginTop: 12 }} /></section>)}</>;
}
