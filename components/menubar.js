import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Style from '..//styles/menubar.module.css'
import axios from 'axios'
const menubar = ({ cartNum ,isLogined}) => {
    const router = useRouter();
    const path = router.pathname;
    const [cartNo, setCartNo] = useState();
    const menuItmes = [{ "": "Home" }, { "shop": "Shop" }, { "referral": "Referral" }, { "location": "Location" }, { "contact-us": "Contact us" }, { "account": "Account" }]
    const SubmenuItmes = [{ "cricket": "Cricket" }, { "football": "Football" }, { "tennis": "Tennis" }, { "volleyball": "Volleyball" }, { "": "All" }]

    const showMenu = (type) => {
        const side_menu = document.getElementById('side_menu')
        if (type === 'show') {
            side_menu.style.right = '0%'
        }
        else if (type === 'hide') {
            side_menu.style.right = '-100%'
        }
    }
    const navigator = (val) => {
        router.push(val)
        const side_menu = document.getElementById('side_menu')
        side_menu.style.right = '-100%'
    }
    const shop_subMenu = (type) => {
        const menuitem_shop = document.querySelector(`.${Style.menuitem_shop}`)
        if (type === 'show') {
            menuitem_shop.style.display = 'block'
        }
        else if (type === 'hide') {
            menuitem_shop.style.display = 'none';
        }
    }
    const shop_append = () => {
        const cross = document.querySelector(`.${Style.closeLine}`)
        const submenu = document.querySelector(".shop_Submenu")

        if (cross.style['rotate'] == '90deg') {
            cross.style.rotate = `0deg`
            submenu.style.display = 'none'
        }
        else {
            cross.style.rotate = `90deg`
            submenu.style.display = 'block'
        }
    }
    const setCart_to_menu = () => {
        const cart = localStorage.getItem('cart')
        if (cart && cart != '[]') {
            const len = cart.split('},{').length;
            if (len == 0) {
                setCartNo(0)
            } else {
                setCartNo(len)
            }
        }
    }
    useEffect(() => {
        setCart_to_menu()
        showMenu('hide')
    }, [router])
    return (
        <div className='w-full py-4 shadow-md bg-white z-[999] relative'>
            <div className='w-full flex justify-between text-[16px] font-semibold items-center'>
                <Link href={'/'} className='ml-12 cursor-pointer text-lg'>
                    Bella10
                    {/* <Image
                        alt='logo'
                        src={'/logo.png'}
                        height={60}
                        width={60}
                        loading='eager'
                    /> */}
                </Link>
                <div className={`flex gap-10 min-h-full ${Style.menu}`}>
                    {menuItmes.slice(0, 1).map((el, index) => {
                        for (let key in el) {
                            return <Link key={index} href={`/${key}`} className={`py-2 ${Style.menu_item}`}><span style={{ color: path == `/${key}` ? 'rgb(249 115 22)' : 'inherit' }}>{el[key]}</span></Link>
                        }
                    })
                    }
                    <div className={`py-2 ${Style.menu_itemtop}`} onMouseOver={() => { shop_subMenu('show') }} onMouseLeave={() => { shop_subMenu('hide') }}>
                        <span className='cursor-pointer' style={{ color: path == '/shop' ? 'rgb(249 115 22)' : 'inherit' }}>Shop</span>
                        <div className={`w-[110px] mt-2 min-h-[150px] absolute z-[1] cursor-pointer bg-black ${Style.menuitem_shop} shadow-md`}>
                            <div>
                                {SubmenuItmes.map((el, index) => {
                                    for (let key in el) {
                                        return <Link key={index} href={`/shop${key == '' ? '' : '?categories=' + key}`} className={`${Style.menuitmes_sidebar_main} text-sm py-2.5 relative flex justify-between`} >
                                            <div className='mx-5'>{el[key]}</div>
                                        </Link>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    {menuItmes.slice(2).map((el, index) => {
                        for (let key in el) {
                            return <Link key={index} href={`/${key}`} className={`py-2 ${Style.menu_item}`}><span style={{ color: path == `/${key}` ? 'rgb(249 115 22)' : 'inherit' }}>{el[key]}</span></Link>
                        }
                    })
                    }
                </div>
                <div className='mr-8 flex justify-center items-center gap-5'>
                    <Link href={'/cart'} className="cursor-pointer relative">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                        <div className='absolute -top-5 -right-4 text-orange-500'>{cartNum == 0 ? "" || cartNum == [] : cartNum || cartNo}</div>
                    </Link>
                    <div className={`${Style.sidebar_icon} cursor-pointer`} onClick={() => { showMenu('show') }}>
                        <div className={`${Style.line}`}></div>
                        <div className={`${Style.line}`}></div>
                        <div className={`${Style.line}`}></div>
                    </div>
                </div>
            </div>
            <div className={`${Style.side_menu}`} id='side_menu'>
                <div className={`font-semibold`}>
                    <div className='flex justify-between items-center py-4 bg-white shadow-md'>
                        <Link href={'/'} className='ml-12 cursor-pointer text-lg'>
                            Bella10
                            {/* <Image
                                alt='logo'
                                className='ml-12 cursor-pointer'
                                src={'/logo.jpg'}
                                height={50}
                                width={50}
                                loading='eager'
                            /> */}
                        </Link>
                        <div className='cursor-pointer mr-5 w-8 h-8 flex justify-center items-center' onClick={() => { showMenu('hide') }}>
                            <div className={`${Style['closeLine-x']}`}></div>
                            <div className={`${Style['closeLine-x']}`}></div>
                        </div>
                    </div>
                    <Link href={'/'} className={`${Style.menuitmes_sidebar} py-3.5 mx-2 ${Style.menu_item} relative border-b flex justify-between border-orange-200`}>
                        <div className='mx-1 text-black'>Home</div>
                    </Link>
                    <div className='py-3.5 mx-2 relative border-b border-orange-200 h-fit'>
                        <div className={`flex justify-between cursor-pointer ${Style.menu_item} ${Style.menuitmes_sidebar}`} onClick={shop_append}>
                            <div className='mx-1 text-black'>Shop</div>
                            <span className='mx-3.5 flex justify-center items-center'>
                                <div className={`${Style.closeLine}`}></div>
                                <div className={`${Style.closeLine}`}></div>
                            </span>
                        </div>
                        <div className={`hidden overflow-hidden shop_Submenu`}>
                            <div className='m-2 mt-4'>
                                <div>
                                    {SubmenuItmes.map((el, index) => {
                                        for (let keyvalue in el) {
                                            return <Link key={index} href={`/shop${keyvalue == "" ? '' : '?categories=' + keyvalue}`} className={`${Style.menuitmes_sidebar} text-sm py-2 mx-2 relative border-t border-l border-r flex justify-between border-orange-200`} style={{ 'borderBottom': keyvalue == "" ? '1px solid rgb(254 215 170)' : 'transparent' }}>
                                                <div className='mx-5 text-black'>{el[keyvalue]}</div>
                                            </Link>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href={'/referral'} className={`${Style.menuitmes_sidebar} py-3.5 mx-2 ${Style.menu_item} relative border-b flex justify-between border-orange-200`} >
                        <div className='mx-1 text-black'>Referral</div>
                    </Link>
                    <Link href={'/location'} className={`${Style.menuitmes_sidebar} py-3.5 mx-2 ${Style.menu_item} relative border-b flex justify-between border-orange-200`}>
                        <div className='mx-1 text-black'>Location</div>
                    </Link>
                    <Link href={'/offers'} className={`${Style.menuitmes_sidebar} py-3.5 mx-2 ${Style.menu_item} relative border-b flex justify-between border-orange-200`} >
                        <div className='mx-1 text-black'>Offers</div>
                    </Link>
                    <Link href={'/contact-us'} className={`${Style.menuitmes_sidebar} py-3.5 mx-2 ${Style.menu_item} relative border-b flex justify-between border-orange-200`} >
                        <div className='mx-1 text-black'>Contact us</div>
                    </Link>
                    {isLogined ?
                        <div className={`flex justify-center items-center ${Style.loginArea}`}>
                            <Link href={'/signup'} className={`${Style.menuitmes_sidebar}`}>
                                Signup
                            </Link>
                            <Link href={'/login'} className={`${Style.menuitmes_sidebar}`}>
                                Login
                            </Link>
                        </div>
                        :
                        <div className={`flex justify-center items-center ${Style.loginArea}`}>
                            <Link href={'/account'} className={`${Style.menuitmes_sidebar}`}>
                                Account
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default menubar