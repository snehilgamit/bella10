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
        menu.style.right = '-60%'
    }
    return (
        <div className='w-full overflow-hidden'>
            <div className='w-full flex justify-between text-[16px] shadow-md items-center min-h-[65px]'>
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
                    <div>login</div>
                    <div className='sidebar_icon cursor-pointer' onClick={showMenu}>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                    </div>
                </div>
            </div>
            <div className='side_menu' id='side_menu' onClick={hideMenu}>
                {/* <div className='cursor-pointer right-[3.3rem] top-[1.8rem] absolute' onClick={showMenu}>
                        <div className='closeLine'></div>
                        <div className='closeLine'></div>
                    </div> */}
                <div className='menuitme_sidebar font-semibold'>
                    <div className='p-2.5 menu_item relative border-b-2 border-black'>
                        <a className='ml-2'>Shop</a>
                        <span className='absolute right-7 top-5'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                    <div className='p-2.5 menu_item relative border-b-2 border-black'>
                        <a className='ml-2'>Referral</a>
                        <span className='absolute right-7 top-5'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                    <div className='p-2.5 menu_item relative border-b-2 border-black'>
                        <a className='ml-2'>Location</a>
                        <span className='absolute right-7 top-5'>
                            <div className='closeLine'></div>
                            <div className='closeLine'></div>
                        </span>
                    </div>
                    <div className='p-2.5 menu_item relative border-b-2 border-black'>
                        <a className='ml-2'>Contact us</a>
                        <span className='absolute right-7 top-5'>
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