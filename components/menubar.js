import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
const menubar = () => {
    const router = useRouter()
    const path = router.pathname
    const showMenu = () => {
        const side_menu = document.getElementById('side_menu')
        side_menu.style.right = '0%'
    }
    const hideMenu = () => {
        const side_menu = document.getElementById('side_menu')
        side_menu.style.right = '-100%'
    }
    const navigator = (val) => {
        router.push(val)
        const side_menu = document.getElementById('side_menu')
        side_menu.style.right = '-100%'

    }
    const shop_append = () => {
        const cross = document.querySelector('.closeLine')
        if (cross.style['rotate'] == '90deg') {
            cross.style.rotate = `0deg`
            document.querySelector('.shop_Submenu').style.display = 'none'
            document.querySelector('.shop_Submenu').style.opacity = '0'
        }
        else {
            cross.style.rotate = `90deg`
            document.querySelector('.shop_Submenu').style.display = 'block'
            document.querySelector('.shop_Submenu').style.opacity = '1'
        }
    }
    return (
        <div className='w-full overflow-hidden py-4 shadow-md'>
            <div className='w-full flex justify-between text-[16px] items-center'>
                <Link href={'/'} className='ml-12 cursor-pointer'>
                    <Image
                        alt='logo'
                        src={'/logo.jpg'}
                        height={50}
                        width={50}
                        loading='eager'
                    />
                </Link>
                <div className='flex gap-10 min-h-full menu'>
                    <Link href={'/'} className='py-2 menu_item'><div style={{ color: path == '/' ? 'rgb(249 115 22)' : 'inherit' }}>Home</div></Link>
                    <Link href={'/shop'} className='py-2 menu_item'><div style={{ color: path == '/shop' ? 'rgb(249 115 22)' : 'inherit' }}>Shop</div></Link>
                    <Link href={'/referral'} className='py-2 menu_item'><div style={{ color: path == '/referral' ? 'rgb(249 115 22)' : 'inherit' }}>Referral</div></Link>
                </div>
                <div className='mr-6 flex justify-center items-center gap-5'>
                    <div className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
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
                    <div className='flex justify-between items-center py-4 bg-white shadow-md'>
                        <Link
                            href={'/'} onClick={hideMenu}>
                            <Image
                                alt='logo'
                                className='ml-12 cursor-pointer'
                                src={'/logo.jpg'}
                                height={50}
                                width={50}
                                loading='eager'
                            />
                        </Link>
                        <div className='cursor-pointer mr-5 w-10 h-10 flex justify-center items-center' onClick={hideMenu}>
                            <div className='closeLine-x'></div>
                            <div className='closeLine-x'></div>
                        </div>
                    </div>
                    <Link href={'/'} onClick={hideMenu} className='menuitmes_sidebar py-3.5 mx-2 menu_item relative border-b flex justify-between border-orange-200'>
                        <div className='mx-1 text-black'>Home</div>
                        {/* <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span> */}
                    </Link>
                    <div className='py-3.5 mx-2 relative border-b  border-orange-200'>
                        <div className='flex justify-between menu_item menuitmes_sidebar' onClick={shop_append}>
                            <div className='mx-1 text-black'>Shop</div>
                            <span className='mx-3.5 flex justify-center items-center'>
                                <div className='closeLine'></div>
                                <div className='closeLine'></div>
                            </span>
                        </div>
                        <div className='opacity-0 hidden overflow-hidden shop_Submenu'>
                            <div className='m-2 mt-4'>
                                <div>
                                    <Link href={'/referral'} onClick={hideMenu} className='menuitmes_sidebar text-sm py-2 mx-2 relative border-t border-l border-r flex justify-between border-orange-200' >
                                        <div className='mx-5 text-black'>Cricket</div>
                                    </Link>
                                    <Link href={'/referral'} onClick={hideMenu} className='menuitmes_sidebar text-sm py-2 mx-2 relative border-t border-l border-r flex justify-between border-orange-200' >
                                        <div className='mx-5 text-black'>Football</div>
                                    </Link>
                                    <Link href={'/referral'} onClick={hideMenu} className='menuitmes_sidebar text-sm py-2 mx-2 relative border-t border-l border-r flex justify-between border-orange-200' >
                                        <div className='mx-5 text-black'>Tennis</div>
                                    </Link>
                                    <Link href={'/referral'} onClick={hideMenu} className='menuitmes_sidebar text-sm py-2 mx-2 relative border-t border-l border-r flex justify-between border-orange-200' >
                                        <div className='mx-5 text-black'>Volleyball</div>
                                    </Link>
                                    <Link href={'/referral'} onClick={hideMenu} className='menuitmes_sidebar text-sm py-2 mx-2 relative border flex justify-between border-orange-200' >
                                        <div className='mx-5 text-black'>Other</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href={'/referral'} onClick={hideMenu} className='menuitmes_sidebar py-3.5 mx-2 menu_item relative border-b flex justify-between border-orange-200' >
                        <div className='mx-1 text-black'>Referral</div>
                        {/* <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span> */}
                    </Link>
                    <Link href={'/location'} onClick={hideMenu} className='menuitmes_sidebar py-3.5 mx-2 menu_item relative border-b flex justify-between border-orange-200'>
                        <div className='mx-1 text-black'>Location</div>
                        {/* <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span> */}
                    </Link>
                    <Link href={'/offers'} onClick={hideMenu} className='menuitmes_sidebar py-3.5 mx-2 menu_item relative border-b flex justify-between border-orange-200' >
                        <div className='mx-1 text-black'>Offers</div>
                        {/* <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span> */}
                    </Link>
                    <Link href={'/contact-us'} onClick={hideMenu} className='menuitmes_sidebar py-3.5 mx-2 menu_item relative border-b flex justify-between border-orange-200' >
                        <div className='mx-1 text-black'>Contact us</div>
                        {/* <span className='mx-3.5 flex justify-center items-center'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span> */}
                    </Link>
                    <div className='flex justify-center items-center loginArea'>
                        <div className='menuitmes_sidebar'>
                            Signup
                        </div>
                        <div className='menuitmes_sidebar'>
                            Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default menubar