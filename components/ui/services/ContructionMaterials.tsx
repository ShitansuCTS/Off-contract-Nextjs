"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePublicProductsStore } from "@/stores/usePublicProductsStore";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "@/styles/public/services/constructsionMetrial.css";
import { ArrowRight } from "lucide-react";

export default function ContructionMaterials() {
    const products = usePublicProductsStore((state) => state.products);
    const loading = usePublicProductsStore((state) => state.loading);
    const error = usePublicProductsStore((state) => state.error);
    const fetchPublicProducts = usePublicProductsStore(
        (state) => state.fetchPublicProducts,
    );
    const pagination = usePublicProductsStore((state) => state.pagination);
    const setPage = usePublicProductsStore((state) => state.setPage);

    useEffect(() => {
        fetchPublicProducts();
    }, [fetchPublicProducts]);

    return (
        <div
            style={{
                backgroundImage: "url('/assets/img/all-images/bg/bg1.png')",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                padding: "70px 0",
            }}
        >
            <div className="container">
                <div className="row mb-4">
                    <div className="col-lg-12 text-center">
                        <h2
                            style={{
                                fontSize: "38px",
                                fontWeight: 800,
                                color: "#08171f",
                                marginBottom: "10px",
                            }}
                        >
                            Construction Products
                        </h2>

                        <p
                            style={{
                                color: "#5c727d",
                                fontSize: "16px",
                                maxWidth: "650px",
                                margin: "0 auto",
                            }}
                        >
                            Find verified construction materials, equipment, and services from
                            trusted suppliers.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <SkeletonTheme baseColor="#edf3f2" highlightColor="#f9fbfb">
                        <div className="row">
                            {[...Array(8)].map((_, index) => (
                                <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={index}>
                                    <div
                                        style={{
                                            background: "#fff",
                                            borderRadius: "18px",
                                            overflow: "hidden",
                                            border: "1px solid #edf0ef",
                                            boxShadow: "0 12px 30px rgba(8,23,31,0.08)",
                                            height: "100%",
                                        }}
                                    >
                                        {/* Image */}
                                        <Skeleton
                                            height={170}
                                            borderRadius="18px 18px 0 0"
                                            baseColor="#edf3f2"
                                            highlightColor="#ffffff"
                                        />

                                        <div style={{ padding: "14px" }}>
                                            {/* Category Badge */}
                                            <Skeleton width={90} height={24} borderRadius={30} />

                                            {/* Title */}
                                            <div style={{ marginTop: "12px" }}>
                                                <Skeleton height={22} width="95%" />
                                                <Skeleton height={22} width="70%" />
                                            </div>

                                            {/* Button */}
                                            <div style={{ marginTop: "18px" }}>
                                                <Skeleton height={44} borderRadius={10} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SkeletonTheme>
                ) : error ? (
                    <div className="text-center py-5 text-danger">{error}</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-5">No products found.</div>
                ) : (
                    <>
                        <div className="blog2-section-area">
                            <div className="container">

                                {/* ================= PRODUCTS ================= */}

                                <div className="row g-4">

                                    {products.slice(0, 8).map((item, index) => {
                                        const productUrl = `/products/${item.category?.slug || "category"
                                            }/${item.subCategory?.slug || "general"
                                            }/${item.slug}`;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`col-lg-3 col-md-6 col-sm-6 ${index >= 4 ? "d-none d-sm-block" : ""
                                                    }`}
                                                data-aos="zoom-in-up"
                                                data-aos-duration={800 + index * 100}
                                            >
                                                <div className="blog-single-boxarea h-100 d-flex flex-column overflow-hidden rounded-3 border bg-white shadow-sm" style={{ marginBottom: "0px" }}>

                                                    {/* ================= IMAGE ================= */}

                                                    <div
                                                        className="img1 image-anime position-relative overflow-hidden"
                                                        style={{ height: "220px" }}
                                                    >
                                                        <Link
                                                            href={productUrl}
                                                            className="d-block h-100"
                                                        >
                                                            <img
                                                                src={
                                                                    item.imageUrl ||
                                                                    "/assets/img/all-images/products/1.jpeg"
                                                                }
                                                                alt={
                                                                    item.title || "Product"
                                                                }
                                                                className="w-100 h-100"
                                                                style={{
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                        </Link>

                                                        {/* ================= PRICE BADGE ================= */}

                                                        <div className="position-absolute bottom-0 start-0 m-2">
                                                            <Link
                                                                href={productUrl}
                                                                className="text-decoration-none"
                                                            >
                                                                <span className="badge bg-warning text-dark px-3 py-2 rounded-2 shadow-sm d-flex align-items-center gap-1 fs-6 fw-bold">

                                                                    {/* Price / Tag Icon */}
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    >
                                                                        <path d="M20.59 13.41 11 3.83V3H4v7h.83l9.58 9.59a2 2 0 0 0 2.83 0l3.35-3.35a2 2 0 0 0 0-2.83Z" />
                                                                        <circle
                                                                            cx="7.5"
                                                                            cy="6.5"
                                                                            r="1"
                                                                        />
                                                                    </svg>

                                                                    ₹{item.price || "--"}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* ================= CONTENT ================= */}

                                                    <div className="content-area p-3 p-lg-4 d-flex flex-column flex-grow-1">

                                                        {/* CATEGORY */}

                                                        <div className="d-flex align-items-center gap-2 mb-2">

                                                            <span className="d-flex align-items-center justify-content-center text-muted">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="17"
                                                                    height="17"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.8"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path d="M3 7h18" />
                                                                    <path d="M5 7v13h14V7" />
                                                                    <path d="M8 7V4h8v3" />
                                                                </svg>
                                                            </span>

                                                            <Link
                                                                href={productUrl}
                                                                className="text-decoration-none text-muted small fw-medium text-truncate"
                                                            >
                                                                {item.category?.name ||
                                                                    "Product"}
                                                            </Link>

                                                        </div>

                                                        {/* ================= TITLE ================= */}

                                                        <Link
                                                            href={productUrl}
                                                            className="head d-block text-decoration-none text-dark fw-semibold"
                                                            style={{
                                                                minHeight: "52px",
                                                            }}
                                                        >
                                                            {item.title}
                                                        </Link>

                                                        {/* Push CTA to bottom */}


                                                        {/* ================= DIVIDER ================= */}

                                                        <div className="border-top my-3" />

                                                        {/* ================= VIEW PRODUCT ================= */}

                                                        <Link
                                                            href={productUrl}
                                                            className="readmore d-flex align-items-center justify-content-between text-decoration-none fw-semibold"
                                                        >
                                                            <span className="d-flex align-items-center gap-2">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="17"
                                                                    height="17"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.8"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <circle
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="9"
                                                                    />
                                                                    <path d="M8 12h8" />
                                                                    <path d="m13 8 4 4-4 4" />
                                                                </svg>

                                                                View Product
                                                            </span>

                                                            <span className="d-flex align-items-center justify-content-center">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M13.0508 12.361L7.39395 18.0179L5.97974 16.6037L11.6366 10.9468L6.68684 5.99707H18.0006V17.3108L13.0508 12.361Z" />
                                                                </svg>
                                                            </span>
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>

                                {/* ================= VIEW MORE ================= */}

                                {products.length > 8 && (
                                    <div className="text-center mt-5">
                                        <Link
                                            className="theme-btn1 inline-flex items-center gap-2"
                                            href="/product-listing"
                                        >
                                            View Details
                                            <ArrowRight size={18} strokeWidth={2.5} />
                                        </Link>
                                    </div>
                                )}

                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
