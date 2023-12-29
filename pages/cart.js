import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const cart = () => {
    const [carts, setCarts] = useState([]);
    const setCart_to_menu = () => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            setCarts(cart)
            console.log(cart)
        }
    }
    useEffect(() => {
        setCart_to_menu()
    }, [])
    return (
        <>
            <div className='w-full flex justify-center pt-5'>
                <div className='w-[85%] border p-5'>
                    <div className='font-semibold text-3xl'>Cart</div>
                    <div className='flex flex-col justify-start'>
                        {carts.map((el,index) => (
                            <Link href={`/shop/${el.name}`} key={index} className='w-[300px] max-sm:border h-96 batList flex flex-col justify-center items-center hover:shadow-md transition-all duration-100'>
                            <Image
                            className='mt-2'
                            src={`${el.image_uri}`}
                            width={135}
                            height={100}
                            priority='eagar'
                            />
                            <div className='w-full h-full flex justify-start items-start flex-col'>
                                <div className='text-sm overflow-hidden h-10 text-start'>{el.name}...</div>
                                <div className='flex items-center font-bold text-base mb-5'><span className='text-base mr-2.5 text-black'>{el.percentage} off</span>₹{el.price_after_discount} <span className='ml-1 font-normal text-xs line-through text-slate-400'>₹{el.price}</span></div>
                            </div>
                          </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default cart