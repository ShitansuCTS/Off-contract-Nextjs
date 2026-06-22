"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePublicProductsStore } from "@/stores/usePublicProductsStore";
import Skeleton, {
    SkeletonTheme,
} from "react-loading-skeleton"; import "react-loading-skeleton/dist/skeleton.css";

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
                    <SkeletonTheme
                        baseColor="#edf3f2"
                        highlightColor="#f9fbfb"
                    >
                        <div className="row">
                            {[...Array(8)].map((_, index) => (
                                <div className="col-lg-3 col-md-6 mb-4" key={index}>
                                    <div
                                        style={{
                                            border: "1px solid #e8eeee",
                                            borderRadius: "18px",
                                            background: "#fff",
                                            overflow: "hidden",
                                            height: "100%",
                                            boxShadow: "0 12px 34px rgba(8, 23, 31, 0.08)",
                                        }}
                                    >
                                        <div style={{ padding: "12px 12px 0" }}>
                                            <Skeleton
                                                height={205}
                                                borderRadius={14}
                                            />
                                        </div>

                                        <div style={{ padding: "16px 18px 18px" }}>
                                            <Skeleton
                                                width={90}
                                                height={24}
                                                borderRadius={30}
                                            />

                                            <div style={{ marginTop: "14px" }}>
                                                <Skeleton
                                                    height={24}
                                                    width="85%"
                                                />
                                            </div>

                                            <div style={{ marginTop: "8px" }}>
                                                <Skeleton
                                                    height={16}
                                                    width="100%"
                                                />
                                                <Skeleton
                                                    height={16}
                                                    width="70%"
                                                    style={{ marginTop: "6px" }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "8px",
                                                    marginTop: "14px",
                                                }}
                                            >
                                                <Skeleton
                                                    width={110}
                                                    height={30}
                                                    borderRadius={8}
                                                />

                                                <Skeleton
                                                    width={90}
                                                    height={30}
                                                    borderRadius={8}
                                                />
                                            </div>

                                            <div style={{ marginTop: "14px" }}>
                                                <Skeleton
                                                    width={140}
                                                    height={30}
                                                />
                                            </div>

                                            <div style={{ marginTop: "18px" }}>
                                                <Skeleton
                                                    height={48}
                                                    borderRadius={12}
                                                />
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
                        <div className="row">
                            {products.map((item) => {
                                const productUrl = `/products/${item.category?.slug || "category"}/${item.subCategory?.slug || "general"}/${item.slug}`;

                                return (
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={item.id}>
                                        <div
                                            className="product-small-card"
                                            style={{
                                                background: "#fff",
                                                borderRadius: "16px",
                                                overflow: "hidden",
                                                border: "1px solid #edf0ef",
                                                boxShadow: "0 10px 26px rgba(8,23,31,0.08)",
                                                height: "100%",
                                                transition: "0.3s ease",
                                            }}
                                        >
                                            <Link href={productUrl}>
                                                <div
                                                    style={{
                                                        height: "170px",
                                                        background: "#f5f8f7",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <img
                                                        src={item.imageUrl || "/assets/img/all-images/products/1.jpeg"}
                                                        alt={item.title}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            </Link>

                                            <div style={{ padding: "14px" }}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        fontSize: "11px",
                                                        fontWeight: 800,
                                                        color: "#00433f",
                                                        background: "rgba(0,67,63,0.08)",
                                                        padding: "5px 10px",
                                                        borderRadius: "30px",
                                                        marginBottom: "8px",
                                                    }}
                                                >
                                                    {item.category?.name || "Product"}
                                                </span>

                                                <h3
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: 800,
                                                        lineHeight: "22px",
                                                        marginBottom: "14px",
                                                    }}
                                                >
                                                    <Link
                                                        href={productUrl}
                                                        style={{
                                                            color: "#08171f",
                                                            textDecoration: "none",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </h3>

                                                <Link
                                                    href={productUrl}
                                                    style={{
                                                        display: "block",
                                                        textAlign: "center",
                                                        background: "#00433f",
                                                        color: "#fff",
                                                        padding: "10px 12px",
                                                        borderRadius: "10px",
                                                        fontSize: "14px",
                                                        fontWeight: 800,
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    View More →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {pagination && pagination.totalPages > 1 && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                    marginTop: "30px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <button
                                    disabled={!pagination.hasPrev}
                                    onClick={() => setPage(pagination.page - 1)}
                                    style={{
                                        border: "none",
                                        background: pagination.hasPrev ? "#00433f" : "#d9e0df",
                                        color: pagination.hasPrev ? "#fff" : "#7b8a89",
                                        padding: "11px 18px",
                                        borderRadius: "10px",
                                        fontWeight: 800,
                                        cursor: pagination.hasPrev ? "pointer" : "not-allowed",
                                    }}
                                >
                                    Prev
                                </button>

                                {Array.from({ length: pagination.totalPages }).map(
                                    (_, index) => {
                                        const pageNumber = index + 1;

                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setPage(pageNumber)}
                                                style={{
                                                    border: "none",
                                                    background:
                                                        pagination.page === pageNumber
                                                            ? "#d4d629"
                                                            : "#ffffff",
                                                    color: "#08171f",
                                                    padding: "11px 15px",
                                                    borderRadius: "10px",
                                                    fontWeight: 900,
                                                    boxShadow: "0 8px 20px rgba(8, 23, 31, 0.08)",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    },
                                )}

                                <button
                                    disabled={!pagination.hasNext}
                                    onClick={() => setPage(pagination.page + 1)}
                                    style={{
                                        border: "none",
                                        background: pagination.hasNext ? "#00433f" : "#d9e0df",
                                        color: pagination.hasNext ? "#fff" : "#7b8a89",
                                        padding: "11px 18px",
                                        borderRadius: "10px",
                                        fontWeight: 800,
                                        cursor: pagination.hasNext ? "pointer" : "not-allowed",
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}