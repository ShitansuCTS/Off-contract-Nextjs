"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { BadgeCheck, BadgeX } from "lucide-react";
import { usePublicProductsStore } from "@/stores/usePublicProductsStore";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PropertyList4Props {
    view?: string;
}

export default function PropertyList4({
    view = "grid",
}: PropertyList4Props) {
    // =========================================================
    // ZUSTAND PRODUCT STORE
    // =========================================================

    const {
        products,
        loading,
        pagination,
        fetchPublicProducts,
        setPage,
    } = usePublicProductsStore();

    // =========================================================
    // LOCAL UI STATE
    // =========================================================

    const [sortOrder, setSortOrder] = useState("default");
    const [viewMode, setViewMode] = useState(view || "grid");
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const [favoriteProducts, setFavoriteProducts] = useState<string[]>(
        []
    );

    // =========================================================
    // FETCH PRODUCTS
    // =========================================================

    useEffect(() => {
        fetchPublicProducts(itemsPerPage);
    }, [fetchPublicProducts, itemsPerPage]);

    // =========================================================
    // SORT PRODUCTS
    // =========================================================

    const filteredProducts = useMemo(() => {
        const result = [...products];

        if (sortOrder === "oldest") {
            result.sort((a, b) => {
                return Number(a.id) - Number(b.id);
            });
        }

        if (sortOrder === "newest") {
            result.sort((a, b) => {
                return Number(b.id) - Number(a.id);
            });
        }

        if (sortOrder === "price-low") {
            result.sort((a, b) => {
                return (a.price || 0) - (b.price || 0);
            });
        }

        if (sortOrder === "price-high") {
            result.sort((a, b) => {
                return (b.price || 0) - (a.price || 0);
            });
        }

        return result;
    }, [products, sortOrder]);

    // =========================================================
    // VIEW MODE
    // =========================================================

    const handleViewModeChange = useCallback((mode: string) => {
        setViewMode(mode);
    }, []);

    // =========================================================
    // SORT
    // =========================================================

    const handleSortOrderChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSortOrder(e.target.value);
    };

    // =========================================================
    // ITEMS PER PAGE
    // =========================================================

    const handleItemsPerPageChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = Number.parseInt(
            e.target.value,
            10
        );

        if (!value) return;

        setItemsPerPage(value);

        // Go back to first API page
        usePublicProductsStore.setState({
            page: 1,
            products: [],
            productsFetchedAt: null,
        });
    };

    // =========================================================
    // PAGINATION
    // =========================================================

    const currentPage = pagination?.page || 1;
    const totalPages = pagination?.totalPages || 1;

    const handlePageChange = (pageNumber: number) => {
        if (
            pageNumber < 1 ||
            pageNumber > totalPages ||
            pageNumber === currentPage
        ) {
            return;
        }

        setPage(pageNumber);
    };

    // =========================================================
    // FAVORITE
    // =========================================================

    const handleFavoriteToggle = (
        e: React.MouseEvent,
        productId: string
    ) => {
        e.preventDefault();
        e.stopPropagation();

        setFavoriteProducts((previous) => {
            if (previous.includes(productId)) {
                return previous.filter(
                    (id) => id !== productId
                );
            }

            return [...previous, productId];
        });
    };

    // =========================================================
    // SWIPER
    // =========================================================

    const swiperFade = {
        modules: [Autoplay, Pagination, Navigation],
        spaceBetween: 0,
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,

        autoplay: {
            delay: 2500,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    };

    // =========================================================
    // PRODUCT URL
    // =========================================================

    const getProductUrl = (product: any) => {
        return `/products/${product.category?.slug || "category"
            }/${product.subCategory?.slug || "general"
            }/${product.slug}`;
    };

    // =========================================================
    // PRODUCT IMAGES
    // =========================================================

    const renderProductImages = (product: any) => {
        const image =
            product.imageUrl ||
            "/assets/img/all-images/properties/property-img1.png";

        return (
            <Swiper
                {...swiperFade}
                className="swiper swiper-fade"
            >
                <div className="swiper-wrapper">
                    <SwiperSlide>
                        <img
                            src={image}
                            alt={product.title || "Product"}
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                            }}
                        />
                    </SwiperSlide>
                </div>

                <div className="swiper-pagination" />
            </Swiper>
        );
    };

    // =========================================================
    // GRID ITEM
    // =========================================================

    const renderGridItem = (product: any) => {
        const isFavorite = favoriteProducts.includes(
            product.id
        );

        const productUrl = getProductUrl(product);

        return (
            <div
                className="col-lg-4 col-md-6"
                key={product.id}
            >
                <div className="property-boxarea">

                    {/* IMAGE */}

                    <div className="img1 image-anime">
                        {renderProductImages(product)}
                    </div>

                    {/* CATEGORY / STATUS */}

                    <div className="category-list">
                        <ul>
                            {product.status && (
                                <li>
                                    <Link href={productUrl} style={{
                                        top: "15px",
                                        right: "15px",
                                        background: "#16a34a",
                                        color: "#fff",
                                        padding: "4px 14px",
                                        borderRadius: "5px",
                                        fontSize: "10px",
                                        fontWeight: "500",
                                        zIndex: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                    }}>
                                        <BadgeCheck size={16} /> In Stock
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </div>

                    {/* CONTENT */}

                    <div className="content-area">

                        <Link href={productUrl}>
                            {product.title}
                        </Link>

                        <div className="space18" />

                        <p>
                            {product.city?.name && (
                                <>
                                    {product.city.name}
                                </>
                            )}

                            {product.state?.name && (
                                <>
                                    {product.city?.name
                                        ? ", "
                                        : ""}
                                    {product.state.name}
                                </>
                            )}
                        </p>

                        <div className="space24" />



                        <div className="btn-area">

                            {/* PRICE */}
                            <Link
                                href={productUrl}
                                className="nm-btn"
                                style={{ backgroundColor: "rgb(0, 67, 63)", color: "white" }}
                            >
                                View Details
                            </Link>

                            {/* FAVORITE */}
                            <Link
                                href="#"
                                className={`heart ${isFavorite
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={(e) =>
                                    handleFavoriteToggle(
                                        e,
                                        product.id
                                    )
                                }
                            >
                                <img
                                    src="/assets/img/icons/heart1.svg"
                                    alt="favorite"
                                    className="heart1"
                                />

                                <img
                                    src="/assets/img/icons/heart2.svg"
                                    alt="favorite"
                                    className="heart2"
                                />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // =========================================================
    // LIST ITEM
    // =========================================================

    const renderListItem = (product: any) => {
        const isFavorite = favoriteProducts.includes(
            product.id
        );

        const productUrl = getProductUrl(product);

        return (
            <div
                className="col-lg-6"
                key={product.id}
            >
                <div className="property-boxarea2">

                    <div className="row align-items-center">

                        {/* IMAGE */}

                        <div className="col-lg-6 col-md-6">

                            <div className="img1 image-anime">
                                {renderProductImages(product)}
                            </div>

                        </div>

                        {/* CONTENT */}

                        <div className="col-lg-6 col-md-6">

                            <div className="category-list">
                                <ul>
                                    {product.status && (
                                        <li>
                                            <Link href={productUrl} style={{
                                                top: "15px",
                                                right: "15px",
                                                background: "#16a34a",
                                                color: "#fff",
                                                padding: "4px 14px",
                                                borderRadius: "5px",
                                                fontSize: "10px",
                                                fontWeight: "500",
                                                zIndex: 2,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                            }}>
                                                <BadgeCheck size={16} /> In Stock
                                            </Link>
                                        </li>
                                    )}

                                </ul>
                            </div>

                            <div className="content-area">

                                <Link href={productUrl}>
                                    {product.title}
                                </Link>

                                <div className="space18" />

                                <p>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C2.12132 8.15076 2.12132 13.8492 5.63604 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z" />
                                    </svg>

                                    {" "}

                                    {product.city?.name || ""}
                                    {product.city?.name &&
                                        product.state?.name
                                        ? ", "
                                        : ""}
                                    {product.state?.name || ""}

                                </p>

                                <div className="space24" />

                                <div className="btn-area">

                                    {/* COMPANY */}

                                    <div className="name-area">

                                        {product.company?.name && (
                                            <>
                                                <div className="img">
                                                    <img
                                                        src="/assets/img/logo/ofc-preloader.png"
                                                        alt="company"
                                                    />
                                                </div>

                                                <div className="text">
                                                    <Link href={productUrl}>
                                                        {
                                                            product.company
                                                                .name
                                                        }
                                                    </Link>
                                                </div>
                                            </>
                                        )}

                                    </div>

                                    {/* PRICE */}

                                    <Link
                                        href={productUrl}
                                        className="nm-btn"
                                    >
                                        View More
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    };


    // =========================================================
    // PRODUCT CARD SKELETON
    // =========================================================

    const renderProductSkeleton = () => {
        return (
            <SkeletonTheme
                baseColor="#edf3f2"
                highlightColor="#f9fbfb"
            >
                <div className="row">
                    {[...Array(itemsPerPage)].map((_, index) => (
                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={index}
                        >
                            <div
                                className="property-boxarea"
                                style={{
                                    background: "#fff",
                                    borderRadius: "18px",
                                    overflow: "hidden",
                                    border: "1px solid #edf0ef",
                                    boxShadow:
                                        "0 12px 30px rgba(8,23,31,0.08)",
                                    height: "100%",
                                }}
                            >
                                {/* IMAGE */}
                                <div
                                    style={{
                                        overflow: "hidden",
                                        borderRadius:
                                            "18px 18px 0 0",
                                    }}
                                >
                                    <Skeleton
                                        height={250}
                                        width="100%"
                                        borderRadius="18px 18px 0 0"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div
                                    style={{
                                        padding: "20px",
                                    }}
                                >
                                    {/* STATUS */}
                                    <Skeleton
                                        width={90}
                                        height={26}
                                        borderRadius={30}
                                    />

                                    {/* TITLE */}
                                    <div
                                        style={{
                                            marginTop: "14px",
                                        }}
                                    >
                                        <Skeleton
                                            height={22}
                                            width="95%"
                                        />

                                        <Skeleton
                                            height={22}
                                            width="70%"
                                        />
                                    </div>

                                    {/* LOCATION */}
                                    <div
                                        style={{
                                            marginTop: "12px",
                                        }}
                                    >
                                        <Skeleton
                                            height={16}
                                            width="65%"
                                        />
                                    </div>

                                    {/* BUTTON */}
                                    <div
                                        style={{
                                            marginTop: "20px",
                                        }}
                                    >
                                        <Skeleton
                                            height={44}
                                            width="140px"
                                            borderRadius={10}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SkeletonTheme>
        );
    };



    // =========================================================
    // PAGINATION
    // =========================================================

    const renderPagination = () => {
        if (totalPages <= 1) {
            return null;
        }
        return (
            <div className="pagination-area">
                <nav aria-label="Page navigation">
                    <ul className="pagination">

                        {/* PREVIOUS */}
                        <li
                            className={`page-item ${currentPage === 1 ? "disabled" : ""
                                }`}
                        >
                            <Link
                                className="page-link"
                                href="#"
                                aria-label="Previous"
                                onClick={(e) => {
                                    e.preventDefault();

                                    handlePageChange(
                                        Math.max(1, currentPage - 1)
                                    );
                                }}
                                style={{
                                    backgroundColor: "#073b3a",
                                    color: "#fff",
                                    borderColor: "#073b3a",
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
                                </svg>
                            </Link>
                        </li>

                        {/* PAGE NUMBERS */}
                        {Array.from(
                            {
                                length: Math.min(totalPages, 5),
                            },
                            (_, i) => {
                                let pageNumber;

                                if (totalPages <= 5) {
                                    pageNumber = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = i + 1;
                                } else if (
                                    currentPage >= totalPages - 2
                                ) {
                                    pageNumber =
                                        totalPages - 4 + i;
                                } else {
                                    pageNumber =
                                        currentPage - 2 + i;
                                }

                                const isActive =
                                    currentPage === pageNumber;

                                return (
                                    <li
                                        key={pageNumber}
                                        className={`page-item ${isActive ? "active" : ""
                                            }`}
                                    >
                                        <Link
                                            className="page-link"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                handlePageChange(
                                                    pageNumber
                                                );
                                            }}
                                            style={{
                                                backgroundColor:
                                                    "#073b3a",
                                                color: "#fff",
                                                borderColor:
                                                    "#073b3a",
                                                fontWeight: isActive
                                                    ? "600"
                                                    : "400",
                                            }}
                                        >
                                            {pageNumber}
                                        </Link>
                                    </li>
                                );
                            }
                        )}

                        {/* DOTS */}
                        {totalPages > 5 &&
                            currentPage < totalPages - 2 && (
                                <li className="page-item">
                                    <Link
                                        className="page-link"
                                        href="#"
                                        onClick={(e) =>
                                            e.preventDefault()
                                        }
                                        style={{
                                            backgroundColor:
                                                "#073b3a",
                                            color: "#fff",
                                            borderColor:
                                                "#073b3a",
                                        }}
                                    >
                                        ....
                                    </Link>
                                </li>
                            )}

                        {/* LAST PAGE */}
                        {totalPages > 5 &&
                            currentPage < totalPages - 2 && (
                                <li className="page-item">
                                    <Link
                                        className="page-link"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            handlePageChange(
                                                totalPages
                                            );
                                        }}
                                        style={{
                                            backgroundColor:
                                                "#073b3a",
                                            color: "#fff",
                                            borderColor:
                                                "#073b3a",
                                        }}
                                    >
                                        {totalPages}
                                    </Link>
                                </li>
                            )}

                        {/* NEXT */}
                        <li
                            className={`page-item ${currentPage === totalPages
                                ? "disabled"
                                : ""
                                }`}
                        >
                            <Link
                                className="page-link"
                                href="#"
                                aria-label="Next"
                                onClick={(e) => {
                                    e.preventDefault();

                                    handlePageChange(
                                        Math.min(
                                            totalPages,
                                            currentPage + 1
                                        )
                                    );
                                }}
                                style={{
                                    backgroundColor: "#073b3a",
                                    color: "#fff",
                                    borderColor: "#073b3a",
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13.1717 12.0007L8.22192 7.05093L14.364 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                                </svg>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        );
    };

    // =========================================================
    // RETURN
    // =========================================================

    return (
        <>
            <div className="property-mapgrid-area">

                {/* ================= HEADING ================= */}

                <div className="heading1">

                    <h3>
                        Products (
                        {pagination?.total || 0}
                        )
                    </h3>

                    <div className="tabs-btn">

                        <ul
                            className="nav nav-pills d-none d-lg-block"
                            id="pills-tab"
                            role="tablist"
                        >

                            {/* GRID */}

                            <li
                                className="nav-item"
                                role="presentation"
                            >
                                <button
                                    className={`nav-link ${viewMode === "grid"
                                        ? "active"
                                        : ""
                                        }`}
                                    id="pills-home-tab"
                                    type="button"
                                    onClick={() =>
                                        handleViewModeChange(
                                            "grid"
                                        )
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M22 12.999V20C22 20.5523 21.5523 21 21 21H13V12.999H22ZM11 12.999V21H3C2.44772 21 2 20.5523 2 20V12.999H11ZM11 3V10.999H2V4C2 3.44772 2.44772 3 3 3H11ZM21 3C21.5523 3 22 3.44772 22 4V10.999H13V3H21Z" />
                                    </svg>
                                </button>
                            </li>

                            {/* LIST */}

                            <li
                                className="nav-item"
                                role="presentation"
                            >
                                <button
                                    className={`nav-link ${viewMode === "list"
                                        ? "active"
                                        : ""
                                        }`}
                                    id="pills-profile-tab"
                                    type="button"
                                    onClick={() =>
                                        handleViewModeChange(
                                            "list"
                                        )
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
                                    </svg>
                                </button>
                            </li>

                        </ul>

                        {/* ================= FILTERS ================= */}

                        <div className="d-flex">

                            <div className="filter-group me-3">

                                <select
                                    onChange={
                                        handleItemsPerPageChange
                                    }
                                    value={itemsPerPage}
                                >
                                    <option value={9}>
                                        Show:(9)
                                    </option>

                                    <option value={12}>
                                        Show:(12)
                                    </option>

                                    <option value={24}>
                                        Show:(24)
                                    </option>

                                    <option value={48}>
                                        Show:(48)
                                    </option>
                                </select>

                            </div>

                            {/* <div className="filter-group">

                                <select
                                    onChange={
                                        handleSortOrderChange
                                    }
                                    value={sortOrder}
                                >
                                    <option value="default">
                                        Sort by (Default)
                                    </option>

                                    <option value="oldest">
                                        Oldest
                                    </option>

                                    <option value="newest">
                                        Newest
                                    </option>

                                    <option value="price-low">
                                        Price (Low to High)
                                    </option>

                                    <option value="price-high">
                                        Price (High to Low)
                                    </option>
                                </select>

                            </div> */}

                        </div>

                    </div>

                </div>

                <div className="space32" />

                {/* ================= CONTENT ================= */}

                <div
                    className="tab-content"
                    id="pills-tabContent"
                >

                    {/* ================= GRID ================= */}

                    <div
                        className={`tab-pane fade ${viewMode === "grid"
                            ? "show active"
                            : ""
                            }`}
                        id="pills-home"
                        role="tabpanel"
                    >

                        <div className="row">

                            {loading &&
                                products.length === 0 ? (

                                renderProductSkeleton()

                            ) : filteredProducts.length >
                                0 ? (

                                <>
                                    {filteredProducts.map(
                                        renderGridItem
                                    )}

                                    <div className="col-lg-12">
                                        {renderPagination()}
                                    </div>
                                </>

                            ) : (

                                <div className="col-12 text-center py-5">

                                    <h4>
                                        No products found
                                    </h4>

                                    <p>
                                        Try adjusting your
                                        filters to see more
                                        products.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* ================= LIST ================= */}

                    <div
                        className={`tab-pane fade ${viewMode === "list"
                            ? "show active"
                            : ""
                            }`}
                        id="pills-profile"
                        role="tabpanel"
                    >

                        <div className="row">

                            {loading &&
                                products.length === 0 ? (

                                renderProductSkeleton()

                            ) : filteredProducts.length >
                                0 ? (

                                <>
                                    {filteredProducts.map(
                                        renderListItem
                                    )}

                                    <div className="col-lg-12">
                                        {renderPagination()}
                                    </div>
                                </>

                            ) : (

                                <div className="col-12 text-center py-5">

                                    <h4>
                                        No products found
                                    </h4>

                                    <p>
                                        Try adjusting your
                                        filters to see more
                                        products.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}