import { Message } from "@aws-sdk/client-sqs"
import { product } from "@prisma/client"
import { NextApiResponse } from "next"
import Product from "../../../../components/Product"
import { ProductRepository } from "../../../../prisma/product"
import { consumeMessage } from "../../../../service/sqs"

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
    let messages: Message[] = []
    const resp = await consumeMessage()
    if (resp && resp.length > 0) {
        messages = resp
    }
    let products: product[] = []
    for (let message of messages) {
        const body = JSON.parse(message.Body as string)
        const product = await ProductRepository.getProductById(body.productId)
        if (product)
        products.push(product)
    }
    res.status(200).send({products: products})
}

export default handler