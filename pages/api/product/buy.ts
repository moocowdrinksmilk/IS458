import { NextApiResponse } from "next"
import { sendMessage } from "../../../service/sqs"

type Req = {
    method: string,
    body: {
        productId: string,
        quantity: number
    },
    headers: {
        authorization: string
    }
}

const handler = async (req: Req, res: NextApiResponse) => {
    try {
        await sendMessage(req.body)

    } catch(e) {
        console.log(e);
        res.status(400).send({message: "error"})
        
    }
    res.status(200).send({message: "Sent!"})
}

export default handler