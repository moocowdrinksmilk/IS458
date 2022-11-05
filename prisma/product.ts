import { PrismaClient, product } from "@prisma/client"

const getProductsBySeller = async (id: string) => {
    const db = new PrismaClient()
    let products: product[] = []
    try {
        const res = await db.product.findMany({
            where: {
                seller_id: id
            }
        })
        products = res
    } catch(e) {
        throw e
    }
    return products
}

const getAllProducts = async () => {
    const db = new PrismaClient()
    let products: product[] = []
    try {
        const res = await db.product.findMany({
            take: 50
        })
        products = res
    } catch(e) {
        throw e
    }
    return products
}

const getProductById = async (id : string) => {
    const db = new PrismaClient()
    const res = await db.product.findFirst({
        where: {
            id
        }
    })
    return res
}

const insertSoldProduct = async (id: number, product_id: string) => {
    const db = new PrismaClient()
    await db.sold.create({
        data: {
            id,
            product_id
        }
    })
}

const getSoldProducts = async () => {
    const db = new PrismaClient()
    let products: product[] = []
    const ids = await db.sold.findMany()
    for (let id of ids) {
        const dbProducts = await db.product.findMany()
        products = [...products, ...dbProducts]
    }
    return products
}

export const ProductRepository = {
    getProductsBySeller,
    getAllProducts,
    getProductById,
    insertSoldProduct
}