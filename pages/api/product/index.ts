import { NextApiResponse } from "next"
import { ProductRepository } from "../../../prisma/product"

type Req = {
    method: string,
    query: {
        id: string
    },
    headers: {
        authorization: string
    }
}

const handler = async (req: Req, res: NextApiResponse) => {
    const products = await ProductRepository.getAllProducts()
    res.status(200).send({products: products})
}

export default handler