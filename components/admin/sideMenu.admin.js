import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '../..//styles/menubar.module.css'
import Button from '../button.main'
import Image from 'next/image'
import { useRouter } from 'next/router'
const menuItems = [
    { name: "QUICK LINKS", value: [{ name: "Dashboard", imgUrl: "user.svg" }, { name: "New Product", imgUrl: "product.svg" }, { name: "New Coupon", imgUrl: "coupon.svg" }] },
    { name: "CATALOG", value: [{ name: "Products", imgUrl: "product.svg" }, { name: "Categories", imgUrl: "link.svg" }, { name: "Collections", imgUrl: "tag.svg" }, { name: "Attributes", imgUrl: "hashtag.svg" }] },
    { name: "SALE", value: [{ name: "Orders", imgUrl: "dice-d6.svg" }] },
    { name: "CUSTOMER", value: [{ name: "Customers", imgUrl: "users.svg" }] },
    { name: "PROMOTION", value: [{ name: "Coupons", imgUrl: "coupon.svg" }] }
]

const SideMenu = ({ tabChanger, activePath }) => {
    const router = useRouter();
    return (
        <div className='w-[18%] left-0 top-0 h-screen bg-white border-r-4'>
            {menuItems.map((el) => (
                <div key={el.name}>
                    <div className='font-semibold text-xs p-5 pb-2'>{el.name}</div>
                    {el.value.map((el) => (
                        <div key={el.name} className='w-full border-l-4' style={{ borderColor: activePath === el.name ? 'rgb(21 128 61)' : 'rgba(0 0 0/0)' }}>
                            <div className='hover:bg-gray-500/10 pl-8 mx-2 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-sm cursor-pointer' style={{ backgroundColor: activePath === el.name ? 'rgb(107 114 128 / 0.1)' : 'rgb(0 0 0/0)' }} onClick={() => tabChanger(el.name)}>
                                <div>
                                    <Image
                                        src={el.imgUrl}
                                        width={12}
                                        height={12}
                                    />
                                </div>
                                {el.name}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SideMenu
