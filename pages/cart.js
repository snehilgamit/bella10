import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import purchase from '@/utils/purchase'
import axios from 'axios'
import BackBtn from '@/components/backBtn'
import Head from 'next/head'
const cart = () => {
    const router = useRouter();

    const [isLogined, setIsLogined] = useState(false);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [mobileNo, setMobileNo] = useState('');

    const [carts, setCarts] = useState([]);
    const cartsRef = useRef([]);

    const cartValue = useRef({});
    const [cartsM, setCartsM] = useState({});

    const [couponCode, setCouponCode] = useState('');
    const bellainputRef = useRef(null);

    const [loading, setLoading] = useState("Purchase");
    const purchaseBtn = useRef(null);

    const setCart = () => {
        let getcart = localStorage.getItem('cart');
        if (getcart && getcart != '') {
            getcart = JSON.parse(getcart);
            setCarts(getcart);
            cartsRef.current = getcart;
        }
    }

    const getCartValue = () => {
        const tempValues = {};
        if (cartsRef.current.length > 0) {
            cartsRef.current.forEach(el => {
                tempValues['price_after_discount'] ? tempValues.price_after_discount += el.price_after_discount : tempValues.price_after_discount = el.price_after_discount;
                tempValues['price'] ? tempValues.price += el.price : tempValues.price = el.price;
            })
            tempValues.percentage = (tempValues.price_after_discount / tempValues.price) * 100;
            tempValues.isCouponApplied = false;
            tempValues.isBellacoinsUsed = false;
            tempValues.total = tempValues.price_after_discount;
            tempValues.BellacoinsUsed = 0;
            tempValues.couponValue = 0;
            cartValue.current = tempValues;
            setCartsM(tempValues);
        }
        else {
            const temp = { "price_after_discount": 0, total: 0, BellacoinsUsed: 0, couponValue: 0, price: 0, isBellacoinsUsed: false, isCouponApplied: false, percentage: 0, price_after_discount: 0 };
            cartValue.current = temp;
            setCartsM(temp);
        }
    }

    const couponApply = async () => {
        if (carts.length <= 0) {
            alert("Cart is empty")
            return 0
        }
        const getProducts = await axios.post("/api/v1/coupon/checkCoupon", { couponCode });
        if (getProducts.data.status) {
            if (!cartsM.isCouponApplied) {
                if (getProducts.data.minimumCart <= cartsM.total) {
                    setCartsM(prev => {
                        if (prev.isBellacoinsUsed) {
                            return {
                                ...prev,
                                isCouponApplied: true,
                                couponValue: getProducts.data.off,
                                total: prev.price_after_discount - getProducts.data.off - prev.BellacoinsUsed,
                            }
                        } else {
                            return {
                                ...prev,
                                isCouponApplied: true,
                                couponValue: getProducts.data.off,
                                total: prev.price_after_discount - getProducts.data.off,
                            }
                        }
                    })
                }
                else {
                    alert(`Minimum cart value is ${getProducts.data.minimumCart}`);
                }
            }
        }
        else {
            setCouponCode("")
            alert(getProducts.data.message);
        }
    }

    const removeCoupon = async () => {
        if (cartsM.isCouponApplied) {
            setCartsM(prev => {
                if (prev.isBellacoinsUsed) {
                    return {
                        ...prev,
                        isCouponApplied: false,
                        couponValue: 0,
                        total: cartValue.current.price_after_discount - prev.BellacoinsUsed,
                    }
                }
                else {
                    return {
                        ...prev,
                        isCouponApplied: false,
                        couponValue: 0,
                        total: cartValue.current.price_after_discount,
                    }
                }
            })
        }
        setCouponCode("")
    }

    const useBella = () => {
        if (user) {
            if (bellainputRef.current.checked) {
                var common = {
                    BellacoinsUsed: cartsM.isCouponApplied ?
                        cartValue.current.price_after_discount - cartsM.couponValue
                        :
                        (cartValue.current.price_after_discount <= user.bellaPoints ? cartValue.current.price_after_discount : user.bellaPoints),
                    isBellacoinsUsed: true
                }
                setCartsM(prev => {
                    if (prev.price_after_discount <= user.bellaPoints) {
                        return {
                            ...prev,
                            ...common,
                            total: prev.isCouponApplied ? prev.price_after_discount - user.bellaPoints : 0
                        }
                    } else {
                        return {
                            ...prev,
                            ...common,
                            total: prev.isCouponApplied ? prev.price_after_discount - user.bellaPoints - prev.couponValue : prev.price_after_discount - user.bellaPoints
                        }
                    }
                })
            }
            else {
                var common = {
                    BellacoinsUsed: 0,
                    isBellacoinsUsed: false,
                }
                setCartsM(prev => {
                    return {
                        ...prev,
                        ...common,
                        total: prev.isCouponApplied ? cartValue.current.price_after_discount - prev.couponValue : cartValue.current.price_after_discount,
                    }
                })
            }
        }
    }

    const removeItem = (number) => {
        const tempCart = carts;
        setCarts(prev => prev - 1);
        tempCart.splice(number, 1);
        localStorage.setItem('cart', JSON.stringify(tempCart));
        setCarts(tempCart);
        cartsRef.current = tempCart
        getCartValue()
    }

    const session = async () => {
        const getSession = localStorage.getItem('bella10_state');
        if (getSession && getSession != '{}' && getSession != '') {
            const { token } = JSON.parse(getSession);
            const req = await axios.post('/api/v1/session', { token });
            if (req.data.status) {
                localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
                setToken(req.data.token);
                setIsLogined(true);
            }
            else {
                setIsLogined(false);
                localStorage.setItem('bella10_state', '{}');
            }
        }
    }

    const getUser = async () => {
        const getSession = localStorage.getItem('bella10_state');
        const { token } = JSON.parse(getSession);
        const getData = await axios.post('/api/v1/getUser', { token });
        setUser(getData.data);
    }

    const purchaseIt = async () => {
        purchaseBtn.current.disabled = true;
        setLoading("Loading...");
        if (mobileNo != null) {
            const getPurchased = await purchase(carts, couponCode, cartsM.isBellacoinsUsed, token, mobileNo);
            if (getPurchased.status) {
                setLoading("Done");
                localStorage.setItem('cart', '[]')
                setCart();
                router.push(`/order/${getPurchased.orderID}`);
            }
            else {
                setLoading("Faild");
                alert(getPurchased.message);
                setTimeout(() => {
                    setLoading("Purchase");
                }, 500);
            }
        }
        else {
            setLoading("Faild");
            alert("Enter mobile number");
            setTimeout(() => {
                setLoading("Purchase");
            }, 500)
        }
        purchaseBtn.current.disabled = false;
    }

    useEffect(() => {
        session();
        setCart();
        getCartValue();
    }, []);

    useEffect(() => {
        if (isLogined) {
            getUser();
        }
    }, [isLogined]);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Your shopping cart on Bella10 - Online and Offline Sport Shop" />
                <title>Cart | Bella10 Sport Shop</title>
                <link rel="icon" href="/favicon.ico" />
                {/* Add any additional CSS or JavaScript links here */}
            </Head>
            <BackBtn />
            <div className='w-full flex justify-center max-sm:flex-col max-sm:items-center pt-5 mb-20'>
                <div className='w-[85%] border p-5'>
                    <div className='text-2xl flex items-center mb-2'>Cart <span className='ml-1'>({carts.length || 0} items)</span></div>
                    <div className='flex flex-col justify-start'>
                        {carts.length == 0 ? <div className='ml-5 mt-5'>Empty cart</div> : ""}
                        {carts.map((el, index) => (
                            <div key={index} className='relative'>
                                <Link href={`/shop/${el.product_id}`} className='w-full batList flex justify-center border max-sm:flex-col items-center transition-all duration-100 z-[1]'>
                                    <Image
                                        className='m-3 max-sm:my-6 mx-6'
                                        src={el.image_uri}
                                        width={100}
                                        alt={el.name}
                                        height={160}
                                        priority='eagar'
                                    />
                                    <div className='w-full flex justify-start items-start flex-col'>
                                        <div className='text-sm overflow-hidden h-5 text-start'>{el.name}</div>
                                        <div className='flex items-center font-bold text-base mb-6'><span className='text-base mr-2.5 text-black'>{el.percentage}% off</span>₹{el.price_after_discount} <span className='ml-1 font-normal text-xs line-through text-slate-400'>₹{el.price}</span></div>
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
                            <input className='h-10 border w-full px-2 rounded-md' onChange={(e) => { setCouponCode(e.target.value) }} value={couponCode} placeholder='Enter coupon code' type="text" name="coupon code" id="coupon code" />
                            {cartsM.isCouponApplied ?
                                <div className='absolute rounded-r-md hover:bg-slate-700 bg-black text-white right-0 h-full w-20 cursor-pointer flex justify-center items-center' onClick={removeCoupon}>Remove</div> :
                                <div className='absolute rounded-r-md hover:bg-slate-700 bg-black text-white right-0 h-full w-20 cursor-pointer flex justify-center items-center' onClick={couponApply}>Apply</div>
                            }
                        </div>
                        <div className='flex justify-between m-1'>
                            <span>Item total</span>
                            <span>
                                {/* <span className='text-xs line-through mr-1 text-slate-400'>₹{cartsM.price}</span> */}
                                ₹{cartsM.price}</span>
                        </div>
                        {cartsM.isBellacoinsUsed &&
                            <div className='flex justify-between m-1'>
                                <span>Bella10 coins</span>
                                <span className='text-orange-500'>-₹{cartsM.BellacoinsUsed}</span>
                            </div>}
                        <div className='flex justify-between m-1 border-b-2 pb-6 border-dashed'>
                            <span>Discount</span>
                            <span className='text-orange-500'>-₹{cartsM.price - cartsM.price_after_discount || 0}({cartsM.percentage ? cartsM.percentage.toFixed(2) : 0}%)</span>
                        </div>
                        {isLogined && user.bellaPoints > 0 && carts.length != 0 ? <div className='flex justify-between mt-2 m-1 border-b-2 pb-2 border-dashed' style={isLogined ? {} : { opacity: 0.6 }}>
                            <div>
                                Use
                                <span className='text-orange-500 font-bold'> {user.bellaPoints} </span>
                                bella10 coins
                            </div>
                            <input className='text-orange-500 mt-[2px] w-[15px] h-[15px]' type='checkbox' ref={bellainputRef} onChange={useBella}></input>
                        </div> :
                            <div className='flex justify-between opacity-60 mt-2 m-1 border-b-2 pb-2 border-dashed'>
                                <div>Use <span className='text-orange-500 font-bold'> {user.bellaPoints || 0} </span> bella10 coins</div>
                                <input className='text-orange-500 mt-[2px] w-[15px] h-[15px]' disabled type='checkbox'></input>
                            </div>
                        }
                        {cartsM.isCouponApplied &&
                            <div className=' flex justify-between m-1 border-b-2 pb-4 mt-4 border-dashed'>
                                <span>Coupon discount</span>
                                <span className='text-orange-500'>-₹{cartsM.couponValue}</span>
                            </div>}
                        <div className='flex justify-between m-1 mt-2 text-2xl'>
                            <span>Grand total</span>
                            <span className=''>₹{cartsM.total}</span>
                        </div>

                        <div className='text-sm text-gray-400 m-1  border-b-2 pb-6 border-dashed'>Inclusive of all taxes</div>
                    </div>
                    {isLogined &&
                        <div className='flex justify-center m-4 relative'>
                            <div className='rounded-l-md absolute left-0 h-full  bg-black text-white w-20 flex justify-center items-center'>+91</div>
                            <input className='h-10 border w-full px-2 rounded-md pl-[5.3rem] placeholder:text-black' value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} pattern="[0-9]{10}" placeholder="Enter phone number" required name="Mobile number" id="mobileNo" />
                        </div>

                    }
                    <div className='w-full border-2 mt-4 p-9 font-medium flex justify-center items-center'>
                        {carts.length == 0 ?
                            <div className='cursor-pointer px-10 py-4 bg-black text-white'>Empty cart</div> : <>
                                {isLogined ?
                                    <div ref={purchaseBtn} className='cursor-pointer px-10 py-4 bg-black hover:opacity-60 text-white' onClick={() => { purchaseIt() }}>{loading}</div>
                                    :
                                    <div className='cursor-pointer px-10 py-4 bg-black hover:opacity-60 text-white' onClick={() => { router.push('/login') }}>Login</div>
                                }</>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default cart