import { NextApiResponse } from "next"
import { ProductRepository } from "../../../../prisma/product"

type Req = {
    method: string,
    body: {
        id: string
    },
    headers: {
        authorization: string
    }
}

const handler = async (req: Req, res: NextApiResponse) => {
    const pid = req.body.id
    const id = Math.floor(Math.random() * Number(10000000))
    await ProductRepository.insertSoldProduct(id, pid)
    res.status(200).send({message: "Added"})
}

export default handler