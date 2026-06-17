import { NextResponse } from "next/server";
import {
    createProductController,
    getProductsController,
} from "@/controllers/product/product.controller";
import { getAuthUser } from "@/lib/getAuthUser";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const filters = {
            page: searchParams.get("page") || 1,
            limit: searchParams.get("limit") || 10,
            status: searchParams.get("status"),
            category: searchParams.get("category"),
            subCategory: searchParams.get("subCategory"),
            stateId: searchParams.get("stateId"),
            cityId: searchParams.get("cityId"),
            userId: searchParams.get("userId"),
            companyId: searchParams.get("companyId"),
            search: searchParams.get("search"),
        };

        const result = await getProductsController(filters);

        return NextResponse.json(
            {
                success: true,
                message: "Products fetched successfully",
                data: result.products,
                pagination: result.pagination,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to fetch products",
            },
            { status: error.statusCode || 500 }
        );
    }
}

export async function POST(req) {
    try {
        const authUser = await getAuthUser();
        const userId = authUser.id || authUser.userId;

        // console.log("AUTH USER IN PRODUCT POST:", authUser);

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
            status: formData.get("status") || "DRAFT",
            userId,
        };

        // console.log("PRODUCT POST BODY:", body);

        const product = await createProductController(body);

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully",
                data: product,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("PRODUCT CREATE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to create product",
            },
            { status: error.statusCode || 500 }
        );
    }
}