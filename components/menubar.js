import React from 'react'
import { useRouter } from 'next/router'
const menubar = () => {
    const router = useRouter()
    const path = router.pathname
    const showMenu = () => {
        const menu = document.getElementById('side_menu')
        menu.style.right = '0%'
    }
    const hideMenu = () => {
        const menu = document.getElementById('side_menu')
        menu.style.right = '-50%'
    }
    return (
        <div className='w-full overflow-hidden'>
            <div className='w-full flex justify-between text-[16px] shadow-md items-center min-h-[65px]'>
                <div className='ml-12'>logo</div>
                <div className='flex gap-10 min-h-full menu'>
                    <div className='py-4 menu_item'><div style={{ color: path == '/' ? 'rgb(249 115 22)' : 'inherit' }}>Home</div></div>
                    <div className='py-4 menu_item'><div style={{ color: path == '/shop' ? 'rgb(249 115 22)' : 'inherit' }}>Shop</div></div>
                    <div className='py-4 menu_item'><div style={{ color: path == '/referral' ? 'rgb(249 115 22)' : 'inherit' }}>Referral</div></div>
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
                <div className='my-5 mx-7'>
                    <div className='cursor-pointer right-[3.3rem] top-[1.8rem] absolute' onClick={showMenu}>
                        <div className='closeLine'></div>
                        <div className='closeLine'></div>
                    </div>
                    <div className='menuitme_sidebar mt-16 px-6'>
                        <div className='py-2.5 menu_item'>Home</div>
                        <div className='py-2.5 menu_item'>Shop</div>
                        <div className='py-2.5 menu_item'>Referal</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default menubar