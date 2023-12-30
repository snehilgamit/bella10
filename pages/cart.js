import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const cart = () => {
    const [carts, setCarts] = useState([]);
    const [cartNo, setCartNo] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setisCouponApplied] = useState(false);
    const isApplied = useRef(false)
    const [coupon_amount, setCoupon_amount] = useState(0);
    const [billAmount, setBillAmount] = useState(0);
    const [finalPrice, setfinalPrice] = useState(0);
    const [without_discount_Amount, setwithout_discount_Amount] = useState(0);
    const exampleCoupon = { bella10: { discount: 200 },OFF50:{discount:1000} }
    const setCart = () => {
        const cart = localStorage.getItem('cart')
        if (cart && cart != '') {
            const cartTemp = JSON.parse(cart)
            setCarts(cartTemp)
        }
    }
    const removeItem = (number) => {
        const tempCart = carts
        setCartNo(prev => prev - 1)
        tempCart.splice(number, 1);
        localStorage.setItem('cart', JSON.stringify(tempCart))
        setCarts(tempCart)
        setCart()
        getCartValue()
    }
    const getCartValue = () => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            const cartTemp = JSON.parse(cart)
            let total_bill = 0
            let without_discount_bill = 0
            cartTemp.forEach(element => total_bill += element.price_after_discount);
            cartTemp.forEach(element => without_discount_bill += element.price);
            if (exampleCoupon[couponCode]) {
                setisCouponApplied(true)
                setCoupon_amount(exampleCoupon[couponCode].discount)
                isApplied.current=true
                setfinalPrice(total_bill - exampleCoupon[couponCode].discount)
            }
            else {
                setisCouponApplied(false)
                isApplied.current=false
                setfinalPrice(total_bill)
            }
            setBillAmount(total_bill)
            setwithout_discount_Amount(without_discount_bill)
        }
    }
    const setCart_to_menu = () => {
        const cart = localStorage.getItem('cart')
        if (cart && cart != '[]' && cart != '') {
            const len = cart.split('},{').length;
            if (len == 0) {
                setCartNo(0)
            } else {
                setCartNo(len)
            }
        }
    }
    const couponApply = () => {
        getCartValue()
        if (!isApplied.current) {
            alert("Invalid code")
        }
    }
    useEffect(() => {
        setCart_to_menu()
        setCart()
        getCartValue()
    }, [])
    return (
        <>
            <div className='w-full flex justify-center max-sm:flex-col max-sm:items-center pt-5 mb-20'>
                <div className='w-[85%] border p-5'>
                    <div className='text-2xl flex items-center mb-2'>Cart <span className='ml-1'>({cartNo} items)</span></div>
                    <div className='flex flex-col justify-start'>
                        {carts.length == 0 ? <div className='ml-5 mt-5'>Empty cart</div> : ""}
                        {carts.map((el, index) => (
                            <div key={index} className='relative'>
                                <Link href={`/shop/${el.name}`} className='w-full batList flex justify-center border max-sm:flex-col items-center transition-all duration-100 z-[1]'>
                                    <Image
                                        className='m-5'
                                        src={`${el.image_uri}`}
                                        alt={el.name}
                                        width={80}
                                        height={80}
                                        priority='eagar'
                                    />
                                    <div className='w-full flex justify-start items-start flex-col'>
                                        <div className='text-sm overflow-hidden h-10 text-start'>{el.name}</div>
                                        <div className='flex items-center font-bold text-base mb-5'><span className='text-base mr-2.5 text-black'>{el.percentage} off</span>₹{el.price_after_discount} <span className='ml-1 font-normal text-xs line-through text-slate-400'>₹{el.price}</span></div>
                                    </div>
                                </Link>
                                <div className='absolute right-3 top-3 text-sm bg-black text-white px-2.5 py-1 z-[2] hover:opacity-60 rounded-md cursor-pointer' onClick={() => { removeItem(index) }}>
                                    Remove
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-[85%] h-full p-5'>
                    <div className='text-2xl flex items-center mb-2'>Bill</div>
                    <div className='w-full border-2 text-sm mt-4 p-9 font-medium'>
                        <div className='flex justify-center m-1 mb-4 relative'>
                            <input className='h-10 border w-full px-2' onChange={(e) => { setCouponCode(e.target.value) }} placeholder='Enter coupon code' type="text" name="coupon code" id="coupon code" />
                            <div onClick={couponApply} className='absolute hover:bg-slate-700 bg-black text-white right-0 h-full w-20 cursor-pointer flex justify-center items-center'>Apply</div>
                        </div>
                        <div className='flex justify-between m-1'>
                            <span>Item total</span>
                            <span><span className='text-xs line-through mr-1 text-slate-400'>₹{without_discount_Amount}</span>₹{billAmount}</span>
                        </div>
                        <div className='flex justify-between m-1 border-b-2 pb-6 border-dashed'>
                            <span>Discount</span>
                            <span className='text-orange-500'>-₹{without_discount_Amount - billAmount}</span>
                        </div>
                        {isCouponApplied ?
                            <div className=' flex justify-between m-1 border-b-2 pb-4 mt-4 border-dashed'>
                                <span>Coupon discount</span>
                                <span className='text-orange-500'>-₹{coupon_amount}</span>
                            </div> : ""}
                        <div className='flex justify-between m-1 mt-2 text-2xl'>
                            <span>Grand total</span>
                            <span className=''>₹{finalPrice}</span>
                        </div>
                        <div className='text-sm text-gray-400 m-1  border-b-2 pb-6 border-dashed'>Inclusive of all taxes</div>
                    </div>
                    <div className='w-full border-2 mt-4 p-9 font-medium flex justify-center items-center'>
                        {cartNo == 0 ? <div className='cursor-pointer px-10 py-4 bg-black text-white'>Empty cart</div> : <div className='cursor-pointer px-10 py-4 bg-black hover:opacity-60 text-white'>Purchase</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default cart