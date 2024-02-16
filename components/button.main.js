import React from 'react'
import Link from 'next/link'
import Style from '..//styles/menubar.module.css'
const Button = ({ text , link }) => {
    return (
        <Link href={link} className={`${Style.menuitmes_sidebar}`}>
            {text}
        </Link>
    )
}

export default Button