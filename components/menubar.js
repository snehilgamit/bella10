import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
const menubar = () => {
    const router = useRouter()
    const path = router.pathname
    const showMenu = () => {
        const menu = document.getElementById('side_menu')
        menu.style.right = '0%'
    }
    const hideMenu = () => {
        const menu = document.getElementById('side_menu')
        menu.style.right = '-100%'
    }
    return (
        <div className='w-full overflow-hidden py-4 shadow-md'>
            <div className='w-full flex justify-between text-[16px]  items-center'>
                <div className='ml-12'>
                    <Image
                        src={'/logo.jpg'}
                        height={50}
                        width={50}
                    />
                </div>
                <div className='flex gap-10 min-h-full menu'>
                    <Link href={'/'} className='py-4 menu_item'><div style={{ color: path == '/' ? 'rgb(249 115 22)' : 'inherit' }}>Home</div></Link>
                    <Link href={'/shop'} className='py-4 menu_item'><div style={{ color: path == '/shop' ? 'rgb(249 115 22)' : 'inherit' }}>Shop</div></Link>
                    <Link href={'/referral'} className='py-4 menu_item'><div style={{ color: path == '/referral' ? 'rgb(249 115 22)' : 'inherit' }}>Referral</div></Link>
                </div>
                <div className='mr-6 flex justify-center items-center gap-5'>
                    <div className='mt-0.5 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                    </div>
                    <div className='sidebar_icon cursor-pointer' onClick={showMenu}>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                    </div>
                </div>
            </div>
            <div className='side_menu' id='side_menu'>
                <div className='menuitme_sidebar font-semibold'>
                    <div className='flex justify-between items-center py-4 bg-orange-200 shadow-md'>
                        <Image
                        className='ml-12'
                            src={'/logo.jpg'}
                            height={50}
                            width={50}
                        />
                        <div className='cursor-pointer mr-5 w-10 h-10 flex justify-center items-center' onClick={hideMenu}>
                            <div className='closeLine-x'></div>
                            <div className='closeLine-x'></div>
                        </div>
                    </div>
                    <div className='py-3 mx-2 menu_item relative border-b flex justify-between border-orange-200'>
                        <a className='mx-1 text-black'>Shop</a>
                        <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                    <div className='py-3 mx-2 menu_item relative border-b flex justify-between border-orange-200'>
                        <a className='mx-1 text-black'>Referral</a>
                        <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                    <div className='py-3 mx-2 menu_item relative border-b flex justify-between border-orange-200'>
                        <a className='mx-1 text-black'>Location</a>
                        <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                    <div className='py-3 mx-2 menu_item relative border-b flex justify-between border-orange-200'>
                        <a className='mx-1 text-black'>Shop</a>
                        <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                    <div className='py-3 mx-2 menu_item relative border-b flex justify-between border-orange-200'>
                        <a className='mx-1 text-black'>Contact us</a>
                        <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default menubar