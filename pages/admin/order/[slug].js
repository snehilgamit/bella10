import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Loading from '@/components/loading';
import BackBtn from '@/components/backBtn';
import NotAdmin from '@/components/notAdmin';
const order = () => {
    const [isAdmin, setisAdmin] = useState(false);
    const [isLoading, setisLoading] = useState(true)
    const [token, setToken] = useState(null);
    const router = useRouter();
    const { slug } = router.query;
    const [data, setData] = useState(null);

    const getOrder = async (getToken) => {
        const getData = await axios.post('/api/v1/admin/orders/getOrder', { email: router.query.email, orderID: slug, token: getToken });
        if (getData.data.status) {
            setData(getData.data);
            setisLoading(false);
        }
    }
    const cancelFunc = async () => {
        const req = await axios.post('/api/v1/admin/orders/cancel', { email: router.query.email, orderID: slug, token });
        if (req.data.status) {
            getOrder();
            alert("Order cancelled !")
        }
        else {
            alert(req.data.message)
        }
    }
    const completeFunc = async () => {
        const req = await axios.post('/api/v1/admin/orders/complete', { email: router.query.email, orderID: slug, token });
        if (req.data.status) {
            getOrder();
            alert(req.data.message);
        }
        else {
            alert(req.data.message);
        }
    }
    const session = async () => {
        const getSession = localStorage.bella10_state;
        if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]') {
            const { token } = JSON.parse(getSession);
            try {
                const req = await axios.post('/api/v1/session', { token });
                if (req.data.status) {
                    localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
                    setToken(req.data.token);
                    if (req.data.isAdmin) {
                        setisAdmin(req.data.status);
                        getOrder(req.data.token);
                    }
                    else {
                        setisLoading(false);
                    }
                }
                else {
                    localStorage.setItem('bella10_state', '{}');
                }
            }
            catch (err) {
            }
        }
        else {
            router.push("/login")
        }
    }


    useEffect(() => {
        session();;
    }, [slug])
    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    {!isAdmin ? <NotAdmin /> :
                        <>
                            <BackBtn />
                            <div className='w-full flex justify-center max-sm:flex-col max-sm:items-center pt-5 mb-20'>
                                <div className='w-[85%] border p-5'>
                                    <div className='text-2xl flex items-center mb-2'>Cart <span className='ml-1'>({data.orders.orderCart.length} items)</span></div>
                                    <div className='flex flex-col justify-start'>
                                        {data.orders.orderCart.length == 0 ? <div className='ml-5 mt-5'>Invalid order id</div> : ""}
                                        {data.orders.orderCart.map((el, index) => (
                                            <Link href={`/shop/${el.productIDs}`} key={index} className='relative'>
                                                <div className='w-full cursor-pointer batList flex justify-center border transition-all duration-100 z-[1]'>
                                                    <Image
                                                        className='m-3'
                                                        src={`/${el.productIDs}.jpg`}
                                                        alt={el.name}
                                                        width={80}
                                                        height={100}
                                                        priority='eagar'
                                                    />
                                                    <div className='w-full flex pt-4 max-md:my-2 max-md:mt-0 justify-start items-start flex-col text-orange-500 z-10'>
                                                        <div className='text-sm overflow-hidden h-10 text-start '>{el.name} ({el.productIDs})</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className='w-[85%] h-full p-5'>
                                    <div className='text-2xl flex items-center mb-2'>Bill</div>
                                    <div className='w-full border-2 text-sm mt-4 p-9 font-medium'>
                                        <div className='flex justify-between m-1'>
                                            <span>Item total</span>
                                            <span>₹{data.orders.totalProductSum}</span>
                                        </div>
                                        <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                            <span>Bella10 coins</span>
                                            <span className='text-orange-500'>-₹{data.orders.usedBellaPoints || 0}</span>
                                        </div>
                                        <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                            <span>Date</span>
                                            <span className='text-orange-500'>{new Date(data.orders.time).toLocaleDateString()}</span>
                                        </div>
                                        <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                            <span>Time</span>
                                            <span className='text-orange-500'>{new Date(data.orders.time).toLocaleTimeString('en-IN').toUpperCase()}</span>
                                        </div>
                                        {data.orders.couponCode &&
                                            <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                                <span>Coupon used</span>
                                                <span className='text-orange-500'>{data.orders.couponCode}</span>
                                            </div>
                                        }
                                        <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                            <span>Mobile No.</span>
                                            <span className='text-orange-500'>+91 {data.orders.mobileNo.slice(0, 5)} {data.orders.mobileNo.slice(5)}</span>
                                        </div>
                                        <div className='flex justify-between m-1 mt-2 text-2xl'>
                                            <span>Grand total</span>
                                            <span className=''>₹{data.orders.totalbill}</span>
                                        </div>

                                        <div className='text-sm text-gray-400 m-1  border-b-2 pb-6 border-dashed'>Inclusive of all taxes</div>
                                    </div>
                                    <div className='w-full border-2 mt-4 p-9 gap-4 font-medium flex justify-center items-center max-sm:flex-col text-center'>
                                        {!data.orders.isConfirmed && !data.orders.isCancelled &&
                                            <div className='cursor-pointer max-sm:w-[90%] max-sm:px-0 px-10 py-4 bg-black hover:opacity-60 text-white' onClick={completeFunc}>Complete Order</div>
                                        }
                                        {data.orders.isCancelled || data.orders.isConfirmed ?
                                            <div className='cursor-pointer max-sm:w-[90%] max-sm:px-0 px-10 py-4 opacity-60 bg-black text-white' >
                                                <a>{data.orders.isCancelled ? "Cancelled" : "Delivered"}</a>
                                            </div> :
                                            <div className='cursor-pointer max-sm:w-[90%] max-sm:px-0 px-10 py-4 bg-black hover:opacity-60 text-white' onClick={cancelFunc}>
                                                <a>Cancel order</a>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}

export default order