"use client";
import { JSX } from "react";

import { X } from "lucide-react";
import type { Vendor } from "@/stores/useVendorReviewStore";
import VendorStatusBadge from "./VendorStatusBadge";

interface VendorDetailsDrawerProps {
    vendor: Vendor | null;
    open: boolean;
    onClose: () => void;
}

export default function VendorDetailsDrawer({
    vendor,
    open,
    onClose,
}: VendorDetailsDrawerProps): JSX.Element | null {
    if (!open || !vendor) return null;

    const activeSub = vendor.subscriptions?.[0];

    return (
        <div className="vendors-drawer-overlay" onClick={onClose}>
            <aside
                className="vendors-drawer"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="vendors-drawer-header">
                    <div>
                        <h3>{vendor.company?.name || "Company Details"}</h3>
                        <p>{vendor.role}</p>
                    </div>

                    <button onClick={onClose} className="vendors-drawer-close">
                        <X size={18} />
                    </button>
                </div>

                <div className="vendors-drawer-body">
                    <section>
                        <h4>Company Information</h4>
                        <Info label="Company Name" value={vendor.company?.name} />
                        <Info label="GST Number" value={vendor.company?.gstNumber} />
                        <Info label="Category" value={vendor.company?.category} />
                        <Info
                            label="Experience"
                            value={`${vendor.company?.experience || 0} Years`}
                        />
                    </section>

                    <section>
                        <h4>Owner Information</h4>
                        <Info label="Owner Name" value={vendor.profile?.fullName} />
                        <Info label="Email" value={vendor.email} />
                        <Info label="Phone" value={vendor.profile?.phone} />
                    </section>

                    <section>
                        <h4>Location</h4>
                        <Info label="State" value={vendor.company?.state?.name} />
                        <Info label="City" value={vendor.company?.city?.name} />
                    </section>

                    <section>
                        <h4>Subscription</h4>
                        <Info label="Plan" value={activeSub?.planName} />
                        <Info
                            label="Amount"
                            value={activeSub?.amount ? `₹${activeSub.amount}` : "N/A"}
                        />
                        <Info label="Payment ID" value={activeSub?.paymentId} />
                        <Info label="Status" value={activeSub?.status} />
                    </section>

                    <section>
                        <h4>Verification</h4>
                        {vendor.company?.verificationStatus && (
                            <VendorStatusBadge
                                status={vendor.company.verificationStatus}
                            />
                        )}
                    </section>
                </div>
            </aside>
        </div>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) {
    return (
        <div className="vendors-info-row">
            <span>{label}</span>
            <strong>{value || "N/A"}</strong>
        </div>
    );
}