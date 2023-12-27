import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Style  from '..//styles/menubar.module.css'
const menubar = () => {
    const router = useRouter();
    const path = router.pathname;
    const menuItmes = [{ "": "Home" }, { "shop": "Shop" }, { "referral": "Referral" }, { "location": "Location" }, { "contact-us": "Contact us" }]
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
        console.log(menuitem_shop)
        if (type === 'show') {
            menuitem_shop.style.display = 'block'
        }
        else if (type === 'hide') {
            menuitem_shop.style.display = 'none';
        }
    }
    const shop_append = () => {
        const cross = document.querySelector(`.${Style.closeLine}`)
        const submenu = document.querySelector('.shop_Submenu')

        if (cross.style['rotate'] == '90deg') {
            cross.style.rotate = `0deg`
            submenu.style.display = 'none'
            submenu.style.opacity = '0'
            console.log("done 1")
        }
        else {
            cross.style.rotate = `90deg`
            submenu.style.display = 'block'
            submenu.style.opacity = '1'
            console.log("done 2")
        }
    }
    useEffect(() => {
        showMenu('hide')
    }, [router])
    return (
        <div className='w-full py-4 shadow-md bg-white z-[1] relative'>
            <div className='w-full flex justify-between text-[16px] font-semibold items-center'>
                <Link href={'/'} className='ml-12 cursor-pointer'>
                    <Image
                        alt='logo'
                        src={'/logo.jpg'}
                        height={50}
                        width={50}
                        loading='eager'
                    />
                </Link>
                <div className={`flex gap-10 min-h-full ${Style.menu}`}>
                    {menuItmes.slice(0, 1).map((el, index) => {
                        for (let key in el) {
                            return <Link key={index} href={`/${key}`} className={`py-2 ${Style.menu_item}`}><span style={{ color: path == `/${key}` ? 'rgb(249 115 22)' : 'inherit' }}>{el[key]}</span></Link>
                        }
                    })
                    }
                    <div className={`py-2 ${Style.menu_itemtop}`} onMouseOver={() => {shop_subMenu('show') }} onMouseLeave={() => { shop_subMenu('hide') }}>
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
                <div className='mr-6 flex justify-center items-center gap-5'>
                    <div className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                    </div>
                    <div className={`${Style.sidebar_icon} cursor-pointer`} onClick={() => { showMenu('show') }}>
                        <div className={`${Style.line}`}></div>
                        <div className={`${Style.line}`}></div>
                        <div className={`${Style.line}`}></div>
                    </div>
                </div>
            </div>
            <div className={`${Style.side_menu}`} id='side_menu'>
                <div className={`${Style.menuitme_sidebar} font-semibold`}>
                    <div className='flex justify-between items-center py-4 bg-white shadow-md'>
                        <Link
                            href={'/'}>
                            <Image
                                alt='logo'
                                className='ml-12 cursor-pointer'
                                src={'/logo.jpg'}
                                height={50}
                                width={50}
                                loading='eager'
                            />
                        </Link>
                        <div className='cursor-pointer mr-5 w-10 h-10 flex justify-center items-center' onClick={() => { showMenu('hide') }}>
                            <div className={`${Style['closeLine-x']}`}></div>
                            <div className={`${Style['closeLine-x']}`}></div>
                        </div>
                    </div>
                    <Link href={'/'} className={`${Style.menuitmes_sidebar} py-3.5 mx-2 ${Style.menu_item} relative border-b flex justify-between border-orange-200`}>
                        <div className='mx-1 text-black'>Home</div>
                    </Link>
                    <div className='py-3.5 mx-2 relative border-b border-orange-200'>
                        <div className={`flex justify-between ${Style.menu_item} ${Style.menuitmes_sidebar}`} onClick={shop_append}>
                            <div className='mx-1 text-black'>Shop</div>
                            <span className='mx-3.5 flex justify-center items-center'>
                                <div className={`${Style.closeLine}`}></div>
                                <div className={`${Style.closeLine}`}></div>
                            </span>
                        </div>
                        <div className={`opacity-0 hidden overflow-hidden shop_Submenu`}>
                            <div className='m-2 mt-4'>
                                <div>
                                    {SubmenuItmes.map((el, index) => {
                                        for(let keyvalue in el){
                                        return <Link key={index} href={`/shop${keyvalue == "" ? '' : '?categories=' + keyvalue}`} className={`${Style.menuitmes_sidebar} text-sm py-2 mx-2 relative border-t border-l border-r flex justify-between border-orange-200`} style={{ 'border-bottom': keyvalue == 'all' ? '1px solid rgb(254 215 170)' : 'transparent' }}>
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

                    <div className={`flex justify-center items-center ${Style.loginArea}`}>
                        <Link href={'/signup'} className={`${Style.menuitmes_sidebar}`}>
                            Signup
                        </Link>
                        <Link href={'/login'} className={`${Style.menuitmes_sidebar}`}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default menubar