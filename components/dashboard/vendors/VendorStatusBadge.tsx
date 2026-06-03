"use client";

import { JSX } from "react";

interface VendorStatusBadgeProps {
    status:
    | "PROFILE_PENDING"
    | "PENDING_APPROVAL"
    | "VERIFIED"
    | "REJECTED";
}

const styles: Record<
    VendorStatusBadgeProps["status"],
    {
        background: string;
        color: string;
    }
> = {
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
                 padding: "2px 10px",
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