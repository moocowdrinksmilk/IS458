import { Message } from "@aws-sdk/client-sqs"
import { product } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"

const Seller = () => {
    const [products, setProducts] = useState<product[]>([])

    useEffect(() => {
        const poll = async () => {
            const res = await axios.get<{products: product[]}>(`/api/product/seller/poll`)
            return res.data.products
        }
        const intervalId = setInterval(() => {
            const messages = poll().then(res => {
                if (res.length < 1) {
                    return
                }
                setProducts(() => [...res])
            })
        }, 10000)

        return () => clearInterval(intervalId)

    }, [])

    return (
        <div className="min-h-screen ">
            <div className="row px-4 py-2">
                <div className="text-6xl">
                    Seller Page
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {
                    products &&
                    products.length > 0 &&
                    products.map(item => {
                        return (
                            <div>
                                {
                                    item.name
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Seller