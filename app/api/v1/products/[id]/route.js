import { NextResponse } from "next/server";
import {
    getProductByIdController,
    updateProductController,
    deleteProductController,
} from "@/controllers/product/product.controller";
import { getAuthUser } from "@/lib/getAuthUser";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const product = await getProductByIdController(id);

        return NextResponse.json(
            {
                success: true,
                message: "Product fetched successfully",
                data: product,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to fetch product",
            },
            { status: error.statusCode || 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    try {
        const authUser = await getAuthUser();
        const { id } = await params;

        const formData = await req.formData();

        const body = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            subCategory: formData.get("subCategory"),
            price: formData.get("price"),
            unit: formData.get("unit"),
            stock: formData.get("stock"),
            brand: formData.get("brand"),
            productModel: formData.get("productModel"),
            status: formData.get("status"),
        };

        // console.log("PRODUCT UPDATE BODY:", body);

        const product = await updateProductController(id, body, authUser);

        return NextResponse.json(
            {
                success: true,
                message: "Product updated successfully",
                data: product,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("PRODUCT UPDATE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to update product",
            },
            { status: error.statusCode || 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        const result = await deleteProductController(id);

        return NextResponse.json(
            {
                success: true,
                message: result.message,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to delete product",
            },
            { status: error.statusCode || 500 }
        );
    }
}