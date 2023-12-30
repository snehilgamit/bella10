import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Style from '@/styles/account.module.css'
import axios from 'axios'
import Login from './login'
const account = () => {
    const [isLogined, setisLogined] = useState(true)

    const session = async ()=>{
        const getSession = localStorage.getItem('bella10_state')
        if (getSession && getSession !='{}'&& getSession !='' ) {
            const { token } = JSON.parse(getSession);
            const req = await axios.post('/api/v1/session',{token})
            if(req.data.status){
                localStorage.setItem('bella10_state',JSON.stringify({email:req.data.email,token:req.data.token}))
                setisLogined(false)
            }
            else{
                localStorage.setItem('bella10_state',{})
            }
        }
    }
    const logout = ()=>{
        localStorage.removeItem('bella10_state')
        location.reload()
    }
    useEffect(() => {
        session()
    }, [])
    return (
        <>
            {isLogined ?
                <Login/>
                :
                <div>Account
                    <div onClick={logout}>Logout</div>
                </div>
            }
        </>
    )
}

export default account