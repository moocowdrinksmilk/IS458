import { Message, SQS } from "@aws-sdk/client-sqs";

type SqsBody = {
    productId: string
    quantity: number
}

const sqs = new SQS({
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_SQS as string,
        secretAccessKey: process.env.SECRET_SQS as string
    }
})

export const sendMessage = async (body: SqsBody) => {
    const bodyString = JSON.stringify(body)    

    try {
        await sqs.sendMessage({
            QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/812613482467/OrderQueue.fifo",
            MessageBody: bodyString,
            MessageGroupId: "1"
        })
    } catch (e) {
        throw e
    }
}

export const consumeMessage = async () => {
    let messages: Message[] = []
    try {
        const message = await sqs.receiveMessage({
            QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/812613482467/OrderQueue.fifo"
        })
        messages = message.Messages as Message[]
        
        return messages
    } catch(e) {
        throw e
    }
}