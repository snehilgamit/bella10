import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
const referral = () => {
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
            const getData = await axios.post('/api/v1/user/referrals', { token });
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
                        Referral dashboard
                    </h1>
                    <div className='absolute max-md:relative max-md:text-sm max-md:mt-3 text-lg right-0 top-0 flex gap-2'>
                        <div className='bg-black text-white py-1 rounded-3xl px-4 cursor-pointer' onClick={() => { router.push('/transaction') }}>Transaction</div>
                    </div>
                    <div className='bellapoint items-center w-full my-7 flex justify-center'>
                        <div className='w-full flex justify-center text-white gap-5 max-sm:gap-1 flex-wrap'>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Bella Points :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.bellaPoints || 0}</span></div>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Referral's :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.totalOrders}</span></div>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Referral's order :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.Ordercanceled}</span></div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default referral
