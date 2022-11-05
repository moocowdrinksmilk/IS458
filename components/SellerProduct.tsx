import { product } from "@prisma/client"
import Modal from "antd/lib/modal/Modal"
import axios from "axios"
import Image from 'next/image'
import { useState } from "react"

const SellerProduct = (item: product) => {
    const [modal, setModal] = useState(false)

    const buy = async () => {
        console.log(item);
        
        await axios.post(`/api/product/seller/add`, {
            id: item.id,
        })
    }

    return (
        <>
            <Modal
                visible={modal}
                onCancel={() => {setModal(false)}}
                title={item.name}
                footer={null}
            >
                <button
                    className="px-4 py-2 rounded-lg bg-yellow-400"
                    onClick={buy}
                >
                    Approve!
                </button>
            </Modal>
            <div className="p4 bg-white rounded-lg col gap-4 cursor-pointer"
                onClick={() => {
                    setModal(true)
                }}
            >
                <div className="w-40 h-40 relative">
                    <Image
                        src={item.image as string}
                        objectFit="contain"
                        layout="fill"
                        alt="this is an image"
                    />
                </div>
                <div className="text-lg">
                    {
                        item.name
                    }
                </div>
            </div>
        </>
    )
}

export default SellerProduct