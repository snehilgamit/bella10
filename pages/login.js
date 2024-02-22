import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
const login = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const login = async (e) => {
        e.preventDefault()
        console.log(email)
        if (password == "" || email == "") {
            alert("Something missing");
        }
        else {
            try {
                const req = await axios.post('/api/v1/login', { email, password });
                if (req.data.status) {
                    localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
                    if (req.data.isAdmin) {
                        router.push('/admin')
                    }
                    else router.push('/account')
                }
                else {
                    alert(req.data.message);
                    localStorage.setItem('bella10_state', '{}');
                }
            }
            catch (e) {

            }
        }
    }
    const session = async () => {
        const getSession = localStorage.getItem('bella10_state')
        if (getSession) {
            const { token } = JSON.parse(getSession);
            const req = await axios.post('/api/v1/session', { token })
            if (req.data.status) {
                localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }))
                router.push('/account')
            }
            else {
                localStorage.setItem('bella10_state', '{}')
            }
        }
    }
    useEffect(() => {
        session()
    }, [])
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Login to Bella10 - Online and Offline Sport Shop" />
                <title>Login | Bella10 Sport Shop</title>
                <link rel="icon" href="/favicon.ico" />
                {/* Add any additional CSS or JavaScript links here */}
            </Head>
            <div className='w-full flex justify-center min-h-[60vh] mt-[10rem] max-sm:mt-12 max-sm:px-3'>
                <div className='overflow-hidden w-[700px] min-h-[50vh] max-sm:flex-col border-2 rounded-3xl flex justify-center items-start'>
                    <div className="w-[50%] max-sm:w-full h-full bg-orange-500 flex flex-col justify-center items-start p-7">
                        <span className='text-4xl font-bold ml-1 max-sm:text-3xl leading-9'>Championships are won at practice</span>
                        <span className='text-start text-white text-sm mt-2 ml-1'>Create new account?</span>
                        <Link href={'/signup'} className='mt-3 text-2xl bg-white w-[50%] min-w-[100px] mb-8 text-center py-1 rounded-lg cursor-pointer hover:bg-gray-300 font-semibold'>
                            SIGNUP
                        </Link>
                    </div>
                    <div className="w-[50%] max-sm:w-full h-full flex flex-col justify-start items-center p-7 relative text-center">
                        <span className="text-4xl font-medium ml-1 mb-4 max-sm:mb-4 max-sm:text-2xl leading-8">Login</span>
                        <form onSubmit={login} className='mb-10 max-sm:mb-0'>

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' value={email} onChange={(e) => { setEmail(e.target.value) }}
                                placeholder='Enter email'
                                autoComplete="off"
                                required={true}
                                type="email"
                                title={"email"} />

                            <input className='h-10 my-2 text-sm bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' value={password} onChange={(e) => { setPassword(e.target.value) }}
                                placeholder='Enter password'
                                required={true}
                                autoCorrect="off"
                                type="password"
                                title={"password"} />

                            <button type='submit' className='mt-3 text-2xl bg-black text-white cursor-pointer min-w-[100px] mb-10 text-center py-1 rounded-lg max-sm:mb-4 max-sm:text-xl px-4 hover:opacity-60 font-semibold'>
                                LOGIN
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login;