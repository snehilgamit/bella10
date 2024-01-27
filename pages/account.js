import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
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
        location.reload();
    }
    const getUserSession = async () => {
        const user = JSON.parse(localStorage.getItem('bella10_state'));
        if (user) {
            const getRes = await axios.post('/api/v1/getUser', { token: user.token });
        }
    }
    useEffect(() => {
        session();
        getUserSession();
        getUser();
    }, []);
    return (
        <>
            {isLogined?<>Not logined</>:<div className='min-h-screen px-10 py-5 w-full mx-auto flex justify-center'>
                <div className='w-full text-3xl font-semibold relative'>
                    <h1>
                        Account
                    </h1>
                    <div className='absolute max-md:relative max-md:text-sm max-md:mt-3 text-lg right-0 top-0 flex gap-2'>
                        <div className='bg-black text-white py-1 rounded-3xl px-4 cursor-pointer' onClick={() => { router.push('/transaction') }}>Transaction</div>
                        <div className='bg-black text-white py-1 rounded-3xl px-4 cursor-pointer' onClick={() => { localStorage.removeItem('bella10_state'); router.push('/login') }}>Logout</div>
                    </div>
                    <div className='bellapoint items-center w-full my-7 flex justify-center'>
                        <div className='w-full flex justify-center text-white gap-5 max-sm:gap-1 flex-wrap'>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Bella Points :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.bellaPoints || 0}</span></div>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Orders :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.totalOrders}</span></div>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Cancelled order :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.Ordercanceled}</span></div>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Referral's order :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.Ordercanceled}</span></div>
                        </div>
                    </div>
                    <div>Orders</div>
                    {accountDetails.orders.map((el, index) => (
                        <div key={index} className='w-[65%] max-md:w-full my-4 mx-auto border rounded-md bg-white'>
                            <div className='w-full h-16 px-5 bg-gray-200 max-lg:hidden text-gray-600 border-b border-gray-700 flex items-center justify-around'>
                                <div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2>{el.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                                <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-black'>₹{el.totalbill}</h2></div>
                                <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-black'>{el.orderID}</h2></div>
                                <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-black'>{el.usedBellaPoints || 0}</h2></div>
                                <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-orange-500'>{el.isConfirmed ? 'Delivered' : 'Pending'}</h2></div>
                                {el.couponCode && <div className='text-xs font-semibold'><h1>Coupon used:</h1> <h2 className='text-black'>{el.couponCode}</h2></div>}
                            </div>
                            <div className='border px-2'>
                                <Link href={`/order/${el.orderID}`} className='bg-white mx-4 flex'>
                                    <Image
                                        className='p-4 max-md:p-2 mr-4'
                                        width={120}
                                        height={100}
                                        alt={el.orderCart[0].name}
                                        src={`/${el.orderCart[0].productIDs}.jpg`} />

                                    <div className='text-orange-500 hover:text-black text-xs mt-4 max-lg:hidden'>{el.orderCart[0].name} <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {el.orderCart.length - 1} more</span> </div>

                                    <div className='w-full hidden max-lg:block'>
                                        <div className='text-orange-500 hover:text-black text-xs mt-4'>{el.orderCart[0].name} <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {el.orderCart.length - 1} more</span> </div>
                                        <div className='flex items-center flex-wrap gap-2 my-3 p-2  border border-gray-200'><div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2 className='text-orange-500'>{el.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                                            <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-orange-500'>₹{el.totalbill}</h2></div>
                                            <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-orange-500'>{el.orderID}</h2></div>
                                            <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-orange-500'>{el.usedBellaPoints || 0}</h2></div>
                                            <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-orange-500'>{el.isConfirmed ? 'Delivered' : 'Pending'}</h2></div></div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default account
