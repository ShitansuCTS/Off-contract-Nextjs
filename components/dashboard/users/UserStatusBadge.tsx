import type {
    UserStatus,
    UserRole,
<<<<<<< HEAD
    VerificationStatus,
=======
    OnboardingStatus,
>>>>>>> 0ab8559 (insert all data)
    SubscriptionStatus,
} from "@/stores/useAdminUsersStore";
import { JSX } from "react";

type BadgeValue =
    | UserStatus
    | UserRole
<<<<<<< HEAD
    | VerificationStatus
=======
    | OnboardingStatus
>>>>>>> 0ab8559 (insert all data)
    | SubscriptionStatus
    | "NO_SUBSCRIPTION";

interface UserStatusBadgeProps {
    status: BadgeValue;
}

const styles: Record<BadgeValue, { background: string; color: string }> = {
<<<<<<< HEAD
    ACTIVE: { background: "#22c55e", color: "#fff" },
    SUSPENDED: { background: "#ef4444", color: "#fff" },

=======
    
    // Account Status
    ACTIVE: { background: "#22c55e", color: "#fff" },
    SUSPENDED: { background: "#ef4444", color: "#fff" },
    INACTIVE: { background: "#e5e7eb", color: "#374151" },

    // User Role
>>>>>>> 0ab8559 (insert all data)
    ADMIN: { background: "#06443f", color: "#fff" },
    SUPPLIER: { background: "#d5d51f", color: "#000" },
    AGENCY: { background: "#38bdf8", color: "#fff" },

<<<<<<< HEAD
    PROFILE_PENDING: { background: "#fef3c7", color: "#92400e" },
    PENDING_APPROVAL: { background: "#d5d51f", color: "#000" },
    VERIFIED: { background: "#22c55e", color: "#fff" },
    REJECTED: { background: "#ef4444", color: "#fff" },

    PENDING: { background: "#fef3c7", color: "#92400e" },
    EXPIRED: { background: "#ef4444", color: "#fff" },
    FAILED: { background: "#ef4444", color: "#fff" },
    NO_SUBSCRIPTION: { background: "#e5e7eb", color: "#000" },
=======
    // Onboarding Status
    EMAIL_VERIFICATION_PENDING: {
        background: "#fef3c7",
        color: "#92400e",
    },

    BUSINESS_PROFILE_PENDING: {
        background: "#fef3c7",
        color: "#92400e",
    },

    KYC_PENDING: {
        background: "#fef3c7",
        color: "#92400e",
    },

    KYC_UNDER_REVIEW: {
        background: "#fef3c7",
        color: "#92400e",
    },

    KYC_REJECTED: {
        background: "#ef4444",
        color: "#fff",
    },

    SUBSCRIPTION_PENDING: {
        background: "#dbeafe",
        color: "#1e40af",
    },

    // Subscription Status
    PENDING: {
        background: "#fef3c7",
        color: "#92400e",
    },

    EXPIRED: {
        background: "#ef4444",
        color: "#fff",
    },

    FAILED: {
        background: "#ef4444",
        color: "#fff",
    },

    NO_SUBSCRIPTION: {
        background: "#e5e7eb",
        color: "#000",
    },
>>>>>>> 0ab8559 (insert all data)
};

export default function UserStatusBadge({
    status,
}: UserStatusBadgeProps): JSX.Element {
    return (
        <span
            style={{
                ...styles[status],
<<<<<<< HEAD
                padding: "2px 10px",
=======
                padding: "4px 10px",
>>>>>>> 0ab8559 (insert all data)
                borderRadius: "30px",
                fontWeight: 500,
                fontSize: "10px",
                whiteSpace: "nowrap",
                display: "inline-flex",
<<<<<<< HEAD
            }}
        >
            {status}
=======
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {status.replaceAll("_", " ")}
>>>>>>> 0ab8559 (insert all data)
        </span>
    );
}