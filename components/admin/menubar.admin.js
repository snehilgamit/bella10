import React, { useState } from 'react'
import Link from 'next/link'
import Style from '../..//styles/menubar.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
const Menubar = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(false);
    const logout = () => {
        localStorage.removeItem('bella10_state');
        router.push('/login')
    }
    return (
        <div className='w-full py-4 shadow-md bg-white z-[999] relative'>
            <div className='w-full flex justify-between text-[16px] font-semibold items-center'>
                <Link href={'/'} className={`ml-12 max-sm:ml-6 cursor-pointer text-lg ${Style.bellaLogo}`}>
                    <div className="">
                        <span className='text-red-500 brightness-105 pr-0.5'>Bella</span><span className='text-xl'>10</span>
                    </div>
                    {/* <Image
                        alt='logo'
                        src={'/logo.png'}
                        height={60}
                        width={60}
                        loading='eager'
                    /> */}
                </Link>
                <div className='mr-12 relative'>
                    <Image
                        alt='logo'
                        onClick={() => setProfile(prev => !prev)}
                        className='cursor-pointer'
                        src={'/user.svg'}
                        height={20}
                        width={20}
                        loading='eager'
                    />
                    {profile &&
                        <div className='bg-white text-black absolute -left-[11.5rem] mt-2 w-[13rem] border p-6'>
                            <div className='text-sm'>
                                Hey, <span className='text-black/50'>admin</span>
                            </div>
                            <div className='text-red-500 text-sm cursor-pointer' onClick={logout}>
                                Logout
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Menubar
