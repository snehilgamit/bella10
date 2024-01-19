import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import Login from './login'
import { useRouter } from 'next/router'
const account = () => {
    const router = useRouter();
    const [isLogined, setisLogined] = useState(true);
    const [accountDetails, setAccountdetails] = useState({
        bellaPoints: 0,
        orders: [],
        totalOrders: 0,
        Ordercanceled: 0,
        email: ""
    })
    const getUser = async () => {
        const getSession = localStorage.getItem('bella10_state');
        const { token } = JSON.parse(getSession);
        const getData = await axios.post('/api/v1/getUser', { token });
        setAccountdetails({bellaPoints:getData.data.bellaPoints});
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
            <div className='min-h-screen px-10 py-5 w-full mx-auto flex justify-center'>
                <div className='w-full text-3xl font-semibold'>
                    <h1>
                        Account
                    </h1>
                    <div className='bellapoint w-full h-56 bg-gray-200 rounded-lg mt-5 flex justify-center ;items-center'>
                        <div className='font-normal'>Bella Points:<span className='text-orange-500 font-semibold'> {accountDetails.bellaPoints}</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default account
