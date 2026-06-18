import { prisma } from "@/lib/prisma";

const generateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

export const createProductService = async (data) => {
    const {
        userId,
        companyId,
        title,
        description,
        category,
        subCategory,
        price,
        unit,
        stock,
        brand,
        productModel,
        imageUrl,
        imagePublicId,
        status,
        stateId,
        cityId,
    } = data;

    console.log("CREATE PRODUCT SERVICE DATA:", data.userId);

    if (!userId) {
        const error = new Error("userId is required");
        error.statusCode = 400;
        throw error;
    }

    if (!title) {
        const error = new Error("Product title is required");
        error.statusCode = 400;
        throw error;
    }

    if (!category) {
        const error = new Error("Product category is required");
        error.statusCode = 400;
        throw error;
    }

    const baseSlug = generateSlug(title);

    let slug = baseSlug;
    let count = 1;

    while (await prisma.product.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${count}`;
        count++;
    }

    const product = await prisma.product.create({
        data: {
            userId,
            companyId: companyId || null,
            title,
            slug,
            description,
            category,
            subCategory,
            price: price ? Number(price) : null,
            unit,
            stock: stock ? Number(stock) : null,
            brand,
            productModel,
            imageUrl,
            imagePublicId,
            status: status || "DRAFT",
            stateId: stateId || null,
            cityId: cityId || null,
        },
    });

    return product;
};

export const getProductsService = async (filters) => {
    
    const {
        page = 1,
        limit = 10,
        status,
        category,
        subCategory,
        stateId,
        cityId,
        userId,
        companyId,
        search,
    } = filters;

    const skip = (Number(page) - 1) * Number(limit);

    const where = {};

    if (status) where.status = status;
    if (category) where.category = category;
    if (subCategory) where.subCategory = subCategory;
    if (stateId) where.stateId = stateId;
    if (cityId) where.cityId = cityId;
    if (userId) where.userId = userId;
    if (companyId) where.companyId = companyId;

    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                category: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                brand: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
                company: {
                    select: {
                        id: true,
                        name: true,
                        category: true,
                    },
                },
                state: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                city: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        }),

        prisma.product.count({ where }),
    ]);

    return {
        products,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
            hasNext: Number(page) < Math.ceil(total / Number(limit)),
            hasPrev: Number(page) > 1,
        },
    };
};

export const getProductByIdService = async (id) => {
    if (!id) {
        const error = new Error("Product id is required");
        error.statusCode = 400;
        throw error;
    }

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                },
            },
            company: true,
            state: true,
            city: true,
        },
    });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return product;
};

export const updateProductService = async (id, data) => {
    if (!id) {
        const error = new Error("Product id is required");
        error.statusCode = 400;
        throw error;
    }

    const existingProduct = await prisma.product.findUnique({
        where: { id },
    });

    if (!existingProduct) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    const updateData = { ...data };

    if (data.price !== undefined) {
        updateData.price = data.price ? Number(data.price) : null;
    }

    if (data.stock !== undefined) {
        updateData.stock = data.stock ? Number(data.stock) : null;
    }

    if (data.title && data.title !== existingProduct.title) {
        const baseSlug = generateSlug(data.title);
        let slug = baseSlug;
        let count = 1;

        while (
            await prisma.product.findFirst({
                where: {
                    slug,
                    NOT: {
                        id,
                    },
                },
            })
        ) {
            slug = `${baseSlug}-${count}`;
            count++;
        }

        updateData.slug = slug;
    }

    return await prisma.product.update({
        where: { id },
        data: updateData,
    });
};

export const deleteProductService = async (id) => {
    if (!id) {
        const error = new Error("Product id is required");
        error.statusCode = 400;
        throw error;
    }

    const existingProduct = await prisma.product.findUnique({
        where: { id },
    });

    if (!existingProduct) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    await prisma.product.delete({
        where: { id },
    });

    return {
        message: "Product deleted successfully",
    };
};