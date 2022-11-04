import { product } from '@prisma/client'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import Product from '../components/Product'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

    const [products, setProducts] = useState<product[]>([])

    useMemo(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get<{products: product[]}>(`/api/product`)
                setProducts(res.data.products)
            } catch(e) {
                console.log(e.message);
            }
        }

        getProducts()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="row px-4 py-2">
                <div className="text-6xl">
                    TESILA
                </div>
            </div>

            <div className="col px-20">
                <div className="text-lg">
                    Secret Lab Chairs
                </div>
                <div className="flex flex-wrap h-40 gap-4">
                    {
                        products && products.length > 0 &&
                        products.map((item, index) => {
                            return (
                                <Product 
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    description={item.description}
                                    image={item.image}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
