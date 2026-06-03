"use client";

import { X } from "lucide-react";
import Skeleton from "react-loading-skeleton";

import { useAdminUsersStore } from "@/stores/useAdminUsersStore";
import UserStatusBadge from "./UserStatusBadge";
import UserTimeline from "./UserTimeline";
import { JSX } from "react";

export default function UserDetailsDrawer(): JSX.Element | null {
    const drawerOpen = useAdminUsersStore((state) => state.drawerOpen);
    const closeUserDrawer = useAdminUsersStore((state) => state.closeUserDrawer);
    const selectedUser = useAdminUsersStore((state) => state.selectedUser);
    const timeline = useAdminUsersStore((state) => state.timeline);
    const detailsLoading = useAdminUsersStore((state) => state.detailsLoading);

    if (!drawerOpen) return null;

    const activeSub = selectedUser?.subscriptions?.find(
        (sub) => sub.status === "ACTIVE",
    );

    const latestSub = selectedUser?.subscriptions?.[0];

    return (
        <div className="users-drawer-overlay" onClick={closeUserDrawer}>
            <aside
                className="users-drawer"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="users-drawer-header">
                    <div>
                        <h3>
                            {detailsLoading ? (
                                <Skeleton width={190} />
                            ) : (
                                selectedUser?.profile?.fullName || "User Details"
                            )}
                        </h3>

                        <p>
                            {detailsLoading ? (
                                <Skeleton width={90} />
                            ) : (
                                selectedUser?.role || "N/A"
                            )}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="users-drawer-close"
                        onClick={closeUserDrawer}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="users-drawer-body">
                    {detailsLoading ? (
                        <DrawerSkeleton />
                    ) : (
                        <>
                            <section>
                                <h4>Basic Details</h4>

                                <Info label="Full Name" value={selectedUser?.profile?.fullName} />
                                <Info label="Email" value={selectedUser?.email} />
                                <Info label="Phone" value={selectedUser?.profile?.phone} />

                                <div className="users-info-row">
                                    <span>Role</span>
                                    <strong>
                                        {selectedUser?.role ? (
                                            <UserStatusBadge status={selectedUser.role} />
                                        ) : (
                                            "N/A"
                                        )}
                                    </strong>
                                </div>

                                <div className="users-info-row">
                                    <span>Account Status</span>
                                    <strong>
                                        {selectedUser?.status ? (
                                            <UserStatusBadge status={selectedUser.status} />
                                        ) : (
                                            "N/A"
                                        )}
                                    </strong>
                                </div>
                            </section>

                            <section>
                                <h4>Company Details</h4>

                                <Info label="Company Name" value={selectedUser?.company?.name} />
                                <Info label="Category" value={selectedUser?.company?.category} />
                                <Info label="GST Number" value={selectedUser?.company?.gstNumber} />
                                <Info
                                    label="Experience"
                                    value={
                                        selectedUser?.company?.experience !== null &&
                                            selectedUser?.company?.experience !== undefined
                                            ? `${selectedUser.company.experience} Years`
                                            : "N/A"
                                    }
                                />
                                <Info label="City" value={selectedUser?.company?.city?.name} />
                                <Info label="State" value={selectedUser?.company?.state?.name} />

                                <div className="users-info-row">
                                    <span>Verification</span>
                                    <strong>
                                        <UserStatusBadge
                                            status={
                                                selectedUser?.company?.verificationStatus ||
                                                "PROFILE_PENDING"
                                            }
                                        />
                                    </strong>
                                </div>

                                {selectedUser?.company?.rejectionReason && (
                                    <div className="users-rejected-box">
                                        <span>Rejection Reason</span>
                                        <p>{selectedUser.company.rejectionReason}</p>
                                    </div>
                                )}
                            </section>

                            <section>
                                <h4>Subscription</h4>

                                <Info
                                    label="Plan"
                                    value={activeSub?.planName || latestSub?.planName}
                                />
                                <Info
                                    label="Amount"
                                    value={
                                        activeSub?.amount || latestSub?.amount
                                            ? `₹${activeSub?.amount || latestSub?.amount}`
                                            : "N/A"
                                    }
                                />
                                <Info
                                    label="Payment ID"
                                    value={activeSub?.paymentId || latestSub?.paymentId}
                                />

                                <div className="users-info-row">
                                    <span>Status</span>
                                    <strong>
                                        <UserStatusBadge
                                            status={
                                                activeSub?.status ||
                                                latestSub?.status ||
                                                "NO_SUBSCRIPTION"
                                            }
                                        />
                                    </strong>
                                </div>
                            </section>

                            <section>
                                <h4>Verification Timeline</h4>
                                <UserTimeline timeline={timeline} />
                            </section>
                        </>
                    )}
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
}): JSX.Element {
    return (
        <div className="users-info-row">
            <span>{label}</span>
            <strong>{value || "N/A"}</strong>
        </div>
    );
}

function DrawerSkeleton(): JSX.Element {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <section key={index}>
                    <Skeleton width={150} height={18} />
                    <Skeleton height={16} style={{ marginTop: 16 }} />
                    <Skeleton height={16} style={{ marginTop: 14 }} />
                    <Skeleton height={16} style={{ marginTop: 14 }} />
                </section>
            ))}
        </>
    );
}