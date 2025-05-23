import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
const signup = () => {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [repassword, setrePassword] = useState('')
    const [referralcode, setreferralcode] = useState('')
    const [email, setEmail] = useState('')
    const [signupTxt, setSignupTxt] = useState('SIGNUP')


    const signupFun = async (e) => {
        e.preventDefault()
        setSignupTxt("Logining...");
        if (password == repassword) {
            const req = await axios.post('/api/v1/signup', { email, password, repassword, referralcode });
            if (req.data.status) {
                setSignupTxt("Signup")
                localStorage.setItem('bella10_state', JSON.stringify(req.data));
                router.push("/account")
            }
            else {
                alert(req.data.message);
                if (req.data.message === 'Email already exist!') {
                    setEmail("");
                }
                if (req.data.message === "Confirm password not matched") {
                    setPassword("");
                    setrePassword("");
                }
                setSignupTxt("Failed");
                setTimeout(() => {
                    setSignupTxt("SIGNUP")
                }, 600)
            }
        }
        else {
            setSignupTxt("SIGNUP")
            alert('Password not match')
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
    const { referral } = router.query;
    useEffect(() => {
        if (referral) {
            setreferralcode(referral);
        }
    }, [referral])
    useEffect(() => {
        session();
    }, [])
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Sign up for an account at Bella10 - Online and Offline Sport Shop" />
                <title>Sign Up | Bella10 Sport Shop</title>
                <link rel="icon" href="/favicon.ico" />
                {/* Add any additional CSS or JavaScript links here */}
            </Head>
            <div className='w-full flex justify-center min-h-[60vh] mt-[10rem] max-sm:mt-12 max-sm:px-3'>
                <div className='overflow-hidden w-[700px] min-h-[50vh] max-sm:flex-col border-2 rounded-3xl flex justify-center items-start'>
                    <div className="w-[50%] max-sm:w-full h-full bg-red-500 brightness-105 flex flex-col justify-center items-start p-7">
                        <span className='text-4xl font-bold ml-1 max-sm:text-3xl leading-9'>Championships are won at practice</span>
                        <span className='text-start text-white text-sm mt-2 ml-1'>Have an account?</span>
                        <Link href={'/login'} className='mt-3 text-2xl bg-white w-[50%] min-w-[100px] mb-8 text-center py-1 rounded-lg cursor-pointer hover:bg-gray-200 font-semibold'>
                            LOGIN
                        </Link>
                    </div>
                    <form onSubmit={signupFun} className="w-[50%] max-sm:w-full h-full flex flex-col justify-start items-center p-7 relative text-center">
                        <span className="text-4xl font-medium ml-1 mb-4 max-sm:mb-4 max-sm:text-2xl leading-8">Create new account</span>
                        <div className='mb-10 max-sm:mb-0'>

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter email' type="email" name="email" id="email" required={true} />

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter password' type="password" name="password" id="password" required={true} />
                            <input className='h-10 my-2 text-sm  bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' value={repassword} onChange={(e) => { setrePassword(e.target.value) }} placeholder='Confirm password' type="password" name="confirmpassword" id="confirmpassword" />

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500 py-1 w-full px-2 rounded-md' value={referralcode} onChange={(e) => { setreferralcode(e.target.value) }} placeholder='Enter referral code' type="text" name="referral code" id="referral code" required={true} />

                            <button type='submit' className='mt-3 text-2xl bg-white text-black border-2 border-black cursor-pointer min-w-[100px] mb-10 text-center py-1 rounded-lg max-sm:mb-4 max-sm:text-xl px-4 font-semibold hover:bg-black hover:text-white'>
                                {signupTxt}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default signup