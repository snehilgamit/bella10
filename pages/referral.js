import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Loading from '@/components/loading'
const referral = () => {
    const router = useRouter();
    const [isLogined, setisLogined] = useState(true);
    const [accountDetails, setAccountdetails] = useState({
        bellaPoints: 0,
        orders: [],
        totalReferralOrders: 0,
        totalReferrals: 0,
        email: "",
        referrals:[]
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
    useEffect(() => {
        session();
        getUser();
    }, []);
    return (
        <>
            {isLogined ? <Loading /> : <div className='min-h-screen px-10 py-5 w-full mx-auto flex justify-center'>
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
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Referral's :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.totalReferrals || 0}</span></div>
                            <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Referral's order :<span className='text-orange-500 ml-1 font-semibold'>{accountDetails.totalReferralOrders || 0}</span></div>
                        </div>
                    </div>
                    <div>Refer link</div>
                    <div className='w-full bg-slate-100 text-xl rounded p-2 flex gap-2'>
                        <div>Share link with your friends and family:</div>
                        <div>https://bella10-delta.vercel.app?referral={accountDetails.referralCode}</div>
                        </div>
                    <div>Referrals</div>
                    {accountDetails.referrals.length>0?null:<div>No referral's</div>}
                    {accountDetails.referrals.map((el, index) => (
                        <div key={index} className='text-sm mt-8 flex justify-around min-w-[60%] w-[30%] max-md:w-[100%] bg-black text-white rounded-xl py-1 my-1 max-sm:text-sm text-center'>
                            <div className='p-2 px-4'>{index + 1}</div>
                            <div className='p-2 truncate'>{el.email.split("@")[0]}</div>
                            {/* <div className='p-2 text-orange-500'>{el.type === 'order' ? '-' + el.usedBellaPoints : '+' + el.usedBellaPoints}</div>
                            <div className='p-2'>{new Date(el.time).toLocaleDateString()}</div> */}
                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default referral
