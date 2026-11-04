"use client";

import { JSX } from "react";

interface VendorStatusBadgeProps {
    status:
<<<<<<< HEAD
    | "PROFILE_PENDING"
    | "PENDING_APPROVAL"
    | "VERIFIED"
    | "REJECTED";
=======
        | "BUSINESS_PROFILE_PENDING"
        | "KYC_UNDER_REVIEW"
        | "KYC_REJECTED"
        | "SUBSCRIPTION_PENDING"
        | "ACTIVE";
>>>>>>> 0ab8559 (insert all data)
}

const styles: Record<
    VendorStatusBadgeProps["status"],
    {
        background: string;
        color: string;
    }
> = {
<<<<<<< HEAD
    PROFILE_PENDING: {
        background: "#fef3c7",
        color: "#92400e",
    },
    PENDING_APPROVAL: {
        background: "#d5d51f",
        color: "#000",
    },
    VERIFIED: {
        background: "#22c55e",
        color: "#fff",
    },
    REJECTED: {
        background: "#ef4444",
=======
    BUSINESS_PROFILE_PENDING: {
        background: "#fef3c7",
        color: "#92400e",
    },

    KYC_UNDER_REVIEW: {
        background: "#d5d51f",
        color: "#000",
    },

    KYC_REJECTED: {
        background: "#ef4444",
        color: "#fff",
    },

    SUBSCRIPTION_PENDING: {
        background: "#22c55e",
        color: "#fff",
    },

    ACTIVE: {
        background: "#22c55e",
>>>>>>> 0ab8559 (insert all data)
        color: "#fff",
    },
};

export default function VendorStatusBadge({
    status,
}: VendorStatusBadgeProps): JSX.Element {
    return (
        <span
            style={{
                ...styles[status],
<<<<<<< HEAD
                 padding: "2px 10px",
=======
                padding: "2px 10px",
>>>>>>> 0ab8559 (insert all data)
                borderRadius: "30px",
                fontWeight: 500,
                fontSize: "10px",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {status}
        </span>
    );
}