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

export const ProductRepository = {
    getProductsBySeller,
    getAllProducts
}