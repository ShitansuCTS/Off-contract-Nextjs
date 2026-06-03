"use client";

import { JSX, useEffect, useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { useDebounce } from "use-debounce";

import { useAdminUsersStore } from "@/stores/useAdminUsersStore";
import type {
    UserRole,
    UserStatus,
    VerificationStatus,
} from "@/stores/useAdminUsersStore";

export default function UserFilters(): JSX.Element {
    const filters = useAdminUsersStore((state) => state.filters);
    const setFilter = useAdminUsersStore((state) => state.setFilter);
    const resetFilters = useAdminUsersStore((state) => state.resetFilters);

    const [searchText, setSearchText] = useState<string>(filters.search || "");
    const [debouncedSearch] = useDebounce(searchText, 500);

    useEffect(() => {
        setFilter("search", debouncedSearch);
    }, [debouncedSearch, setFilter]);

    const handleReset = (): void => {
        setSearchText("");
        resetFilters();
    };

    return (
        <div className="users-card users-section">
            <div className="users-filter-header">
                <div>
                    <h4>Filter Users</h4>
                    <p>Search and filter admin, suppliers and agencies</p>
                </div>

                <button type="button" className="users-reset-btn" onClick={handleReset}>
                    <RotateCcw size={15} />
                    Reset
                </button>
            </div>

            <div className="users-filters-grid">
                <div className="users-search-field">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search name, email, phone, company, GST..."
                        value={searchText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchText(e.target.value)
                        }
                    />
                </div>

                <select
                    className="users-select"
                    value={filters.role}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFilter("role", e.target.value as "" | UserRole)
                    }
                >
                    <option value="">All Roles</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPPLIER">Supplier</option>
                    <option value="AGENCY">Agency</option>
                </select>

                <select
                    className="users-select"
                    value={filters.status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFilter("status", e.target.value as "" | UserStatus)
                    }
                >
                    <option value="">All Account Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="SUSPENDED">Suspended</option>
                </select>

                <select
                    className="users-select"
                    value={filters.verificationStatus}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFilter(
                            "verificationStatus",
                            e.target.value as "" | VerificationStatus,
                        )
                    }
                >
                    <option value="">All Verification</option>
                    <option value="PROFILE_PENDING">Profile Pending</option>
                    <option value="PENDING_APPROVAL">Pending Approval</option>
                    <option value="VERIFIED">Verified</option>
                    <option value="REJECTED">Rejected</option>
                </select>

                <select
                    className="users-select"
                    value={filters.limit}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFilter("limit", Number(e.target.value))
                    }
                >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                </select>
            </div>
        </div>
    );
}