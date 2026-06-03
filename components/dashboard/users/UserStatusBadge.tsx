import type {
    UserStatus,
    UserRole,
    VerificationStatus,
    SubscriptionStatus,
} from "@/stores/useAdminUsersStore";
import { JSX } from "react";

type BadgeValue =
    | UserStatus
    | UserRole
    | VerificationStatus
    | SubscriptionStatus
    | "NO_SUBSCRIPTION";

interface UserStatusBadgeProps {
    status: BadgeValue;
}

const styles: Record<BadgeValue, { background: string; color: string }> = {
    ACTIVE: { background: "#22c55e", color: "#fff" },
    SUSPENDED: { background: "#ef4444", color: "#fff" },

    ADMIN: { background: "#06443f", color: "#fff" },
    SUPPLIER: { background: "#d5d51f", color: "#000" },
    AGENCY: { background: "#38bdf8", color: "#fff" },

    PROFILE_PENDING: { background: "#fef3c7", color: "#92400e" },
    PENDING_APPROVAL: { background: "#d5d51f", color: "#000" },
    VERIFIED: { background: "#22c55e", color: "#fff" },
    REJECTED: { background: "#ef4444", color: "#fff" },

    PENDING: { background: "#fef3c7", color: "#92400e" },
    EXPIRED: { background: "#ef4444", color: "#fff" },
    FAILED: { background: "#ef4444", color: "#fff" },
    NO_SUBSCRIPTION: { background: "#e5e7eb", color: "#000" },
};

export default function UserStatusBadge({
    status,
}: UserStatusBadgeProps): JSX.Element {
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
            }}
        >
            {status}
        </span>
    );
}