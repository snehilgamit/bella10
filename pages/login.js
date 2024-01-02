import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
const login = () => {
    const router = useRouter();
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');

    const login = async ()=>{
        if(password == "" || email == ""){
            alert("Something missing");
        }
        else{
            
            const req = await axios.post('/api/v1/login',{email,password});
            if(req.data.status){
                localStorage.setItem('bella10_state',JSON.stringify({email:req.data.email,token:req.data.token}));
                router.push('/account');
            }
            else{
                alert(req.data.message);
                localStorage.setItem('bella10_state','{}');
            }
        }
    }
    const session = async ()=>{
        const getSession = localStorage.getItem('bella10_state')
        if (getSession) {
            const { token } = JSON.parse(getSession);
            const req = await axios.post('/api/v1/session',{token})
            if(req.data.status){
                localStorage.setItem('bella10_state',JSON.stringify({email:req.data.email,token:req.data.token}))
                router.push('/account')
            }
            else{
                localStorage.setItem('bella10_state','{}')
            }
        }
    }
    useEffect(() => {
        session()
    }, [])
    return (
        <>
                <div className='w-full flex justify-center min-h-[60vh] mt-[10rem] max-sm:mt-4 max-sm:px-3'>
                    <div className='overflow-hidden w-[700px] min-h-[50vh] max-sm:flex-col border-2 rounded-3xl flex justify-center items-start'>
                        <div className="w-[50%] max-sm:w-full h-full bg-orange-500 flex flex-col justify-center items-start p-7">
                            <span className='text-4xl font-bold ml-1 max-sm:text-3xl'>Championships are won at practice</span>
                            <span className='text-start text-white text-sm mt-1 ml-1'>Create new account?</span>
                            <Link href={'/signup'} className='mt-3 text-2xl bg-white w-[50%] min-w-[100px] mb-8 text-center py-1 rounded-lg cursor-pointer hover:bg-gray-300'>
                              Signup
                            </Link>
                        </div>
                        <div className="w-[50%] max-sm:w-full h-full flex flex-col justify-start items-center p-7 relative">
                            <span className="text-3xl font-medium ml-1 mb-4 max-sm:mb-4 max-sm:text-2xl ">Login</span>
                            <form onSubmit={(e)=>{e.preventDefault()}} className='mb-10 max-sm:mb-0'>

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter email' type="text" name="email" id="email" />

                            <input className='h-10 my-2 text-sm bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter password' type="text" name="password" id="password" />

                            <div className='mt-3 text-2xl bg-black text-white cursor-pointer min-w-[100px] mb-10 text-center py-1 rounded-lg max-sm:mb-4 hover:opacity-60' onClick={login}>
                                Login
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default login;