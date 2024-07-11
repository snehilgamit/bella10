import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Loading from '@/components/loading'
import BackBtn from '@/components/backBtn'
import Head from 'next/head'
const account = () => {
    const router = useRouter();
    const [isLogined, setisLogined] = useState(true);
    const [accountDetails, setAccountdetails] = useState({
        bellaPoints: 0,
        orders: [],
        totalOrders: 0,
        Ordercanceled: 0,
        email: ""
    });
    const getUser = async () => {
        const getSession = localStorage.getItem('bella10_state');
        if (getSession) {
            const { token } = JSON.parse(getSession);
            const getData = await axios.post('/api/v1/getUser', { token });
            setAccountdetails(getData.data);
        }
    }
    const session = async () => {
        const getSession = localStorage.getItem('bella10_state');
        if (getSession && getSession != '{}' && getSession != '') {
            const { token } = JSON.parse(getSession);
            const req = await axios.post('/api/v1/session', { token });
            if (req.data.status) {
                localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
                setisLogined(false);
            }
            else {
                setisLogined(true);
                localStorage.setItem('bella10_state', '{}');
            }
        }
        else {
            router.push('/login');
        }
    }
    const logout = () => {
        localStorage.removeItem('bella10_state');
        router.push('/login');
    }
    useEffect(() => {
        session();
        getUser();
    }, []);
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Manage your Bella10 account - Online and Offline Sport Shop" />
                <title>Account | Bella10 Sport Shop</title>
                <link rel="icon" href="/favicon.ico" />
                {/* Add any additional CSS or JavaScript links here */}
            </Head>
            <BackBtn />
            {isLogined ? <Loading /> : <div className='min-h-screen px-10 py-5 w-full mx-auto flex justify-center'>
                <div className='w-full text-3xl font-semibold relative'>
                    <div className='absolute max-md:relative max-md:text-sm max-md:mt-3 text-base right-20 max-lg:right-0 top-0 flex gap-2'>
                        <div className='text-black border-2 border-black rounded-3xl py-1.5 px-3 flex justify-center items-center cursor-pointer z-50 hover:bg-black hover:text-white active:bg-black active:opacity-50 active:text-white' onClick={() => { router.push('/transaction') }}>Transaction</div>
                        <div className='text-black border-2 border-black rounded-3xl py-1.5 px-3 flex justify-center items-center cursor-pointer z-50 hover:bg-black hover:text-white active:bg-black active:opacity-50 active:text-white' onClick={logout}>Logout</div>
                    </div>
                    <div className='flex w-full max-lg:flex-col my-2'>
                        <div className='w-[25%] max-xl:w-[60%] max-sm:w-full'>
                            <div className="">Account</div>
                            <div className="text-xl font-semibold mt-2 text-center w-[86%] max-sm:w-full">
                                <div className='flex justify-center items-center h-12 max-xl:text-base my-1 border-2 border-black hover:bg-black/5'>Bella Points :<span className='text-red-500 brightness-105 ml-1 font-semibold'>{accountDetails.bellaPoints || 0}</span></div>
                                <div className='flex justify-center items-center h-12 max-xl:text-base my-1 border-2 border-black max-md:w-[80] hover:bg-black/5'>Order's :<span className='text-red-500 brightness-105 ml-1 font-semibold'>{accountDetails.totalOrders}</span></div>
                                <div className='flex justify-center items-center h-12 max-xl:text-base  my-1 border-2 border-black hover:bg-black/5'>Cancelled order's :<span className='text-red-500 brightness-105 ml-1 font-semibold'>{accountDetails.Ordercanceled}</span></div>
                                <div className='flex justify-center items-center h-12 max-xl:text-base my-1 border-2 border-black hover:bg-black/5'>Referral's order's :<span className='text-red-500 brightness-105 ml-1 font-semibold'>{accountDetails?.referralsOrders}</span></div>
                            </div>
                        </div>
                        <div className='w-[70%] max-sm:w-full '>
                            <div className="">Orders</div>
                            {accountDetails.orders.map((el, index) => (
                                <div onClick={() => { router.push(`/order/${el.orderID}`) }} key={index} className='cursor-pointer max-md:w-full my-4 mx-auto border rounded-md bg-white hover:scale-[1.005] transition-all duration-700'>
                                    <div className='w-full h-16 px-5 bg-gray-200 max-lg:hidden text-gray-600 border-b border-gray-700 flex items-center justify-around'>
                                        <div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2>{el.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                                        <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-black'>₹{el.totalbill}</h2></div>
                                        <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-black'>{el.orderID}</h2></div>
                                        <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-black'>{el.usedBellaPoints || 0}</h2></div>

                                        <div className='text-xs font-semibold'><h1>Coupon used:</h1> <h2 className='text-black'>{el.couponCode ? el.couponCode : 'None'}</h2></div>

                                        <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-red-500 brightness-105'>{el.isConfirmed ? <span>Delivered</span> : <span>{el.isCancelled ? "Cancelled" : "Pending"}</span>}</h2></div>
                                    </div>
                                    <div className='border'>
                                        <div className='bg-white mx-4 flex'>
                                            <Image
                                                className='p-4 max-md:p-2 mr-4 h-[210px] w-[140px]'
                                                width={120}
                                                height={100}
                                                alt={el.orderCart[0].name}
                                                src={`/${el.orderCart[0].productIDs}.jpg`} />

                                            <div className='text-red-500 brightness-105 hover:text-black text-xs mt-4 max-lg:hidden'>{el.orderCart[0].name} { el.orderCart.length>1 && <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {el.orderCart.length - 1} more</span>} </div>

                                            <div className='w-full hidden max-lg:block'>
                                                <div className='text-red-500 brightness-105 hover:text-black text-xs mt-4'>{el.orderCart[0].name} <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {el.orderCart.length - 1} more</span> </div>
                                                <div className='flex items-center flex-wrap gap-2 my-3 p-2  border border-gray-200'><div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2 className='text-red-500 brightness-105'>{el.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                                                    <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-red-500 brightness-105'>₹{el.totalbill}</h2></div>
                                                    <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-red-500 brightness-105'>{el.orderID}</h2></div>
                                                    <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-red-500 brightness-105'>{el.usedBellaPoints || 0}</h2></div>
                                                    <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-red-500 brightness-105'>{el.isConfirmed ?
                                                        <span>Delivered</span> :
                                                        <span>{el.isCancelled ? "Cancelled" : "Pending"}
                                                        </span>}
                                                    </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default account;
