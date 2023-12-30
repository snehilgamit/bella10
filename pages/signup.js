import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const signup = () => {
    useEffect(() => {
        localStorage.getItem('bella10_state')
        if (localStorage.getItem) {

        }
    }, [])
    return (
        <>
                <div className='w-full flex justify-center min-h-[60vh] mt-[10rem] max-sm:mt-4 max-sm:px-3'>
                    <div className='overflow-hidden w-[700px] min-h-[50vh] max-sm:flex-col border-2 rounded-3xl flex justify-center items-start'>
                        <div className="w-[50%] max-sm:w-full h-full bg-orange-500 flex flex-col justify-center items-start p-7">
                            <span className='text-4xl font-bold ml-1 max-sm:text-3xl'>Start cricket journey with bella10</span>
                            <span className='text-start text-white text-sm mt-1 ml-1'>Have an account?</span>
                            <Link href={'/login'} className='mt-3 text-2xl bg-white w-[50%] min-w-[100px] mb-8 text-center py-1 rounded-lg cursor-pointer'>
                                Login
                            </Link>
                        </div>
                        <div className="w-[50%] max-sm:w-full h-full flex flex-col justify-start items-center p-7 relative">
                            <span className="text-4xl font-medium ml-1 mb-4 max-sm:mb-4 max-sm:text-2xl ">Create new account</span>
                            <div className='mb-10 max-sm:mb-0'>

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' onChange={(e) => { }} placeholder='Enter email' type="text" name="email" id="email" />

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' onChange={(e) => { }} placeholder='Enter password' type="text" name="password" id="password" />
                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500  py-1 w-full px-2 rounded-md' onChange={(e) => { }} placeholder='Confirm password' type="text" name="confirmpassword" id="confirmpassword" />

                            <input className='h-10 my-2 text-sm   bg-gray-300 placeholder:text-gray-500 py-1 w-full px-2 rounded-md' onChange={(e) => { }} placeholder='Enter referral code' type="text" name="referral code" id="referral code" />

                            <div className='mt-3 text-2xl bg-black text-white cursor-pointer min-w-[100px] mb-10 text-center py-1 rounded-lg max-sm:mb-4'>
                                Signup
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default signup