import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
const order = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [isLogined, setisLogined] = useState(true);
    const [accountDetails, setAccountdetails] = useState({
        bellaPoints: 0,
        orders: [],
        totalOrders: 0,
        Ordercanceled: 0,
        email: ""
    });
    const getUser = async () => {
        const getSession = localStorage.getItem('bella10_state');
        if (getSession && getSession!='{}' && getSession != '[Object,object]') {
            const { token } = JSON.parse(getSession);
            const getData = await axios.post('/api/v1/orders/getOrder', { token, orderID: slug });
            setAccountdetails(getData.data);
        }
    }
    const session = async () => {
        const getSession = localStorage.getItem('bella10_state');
        if (getSession && getSession != '{}' && getSession != '') {
            const { token } = JSON.parse(getSession);
            const req = await axios.post('/api/v1/session', { token });
            if (req.data.status) {
                localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
                setisLogined(false);
            }
            else {
                localStorage.setItem('bella10_state', '{}');
            }
        }
        else {
            router.push('/login');
        }
    }
    useEffect(() => {
        session();
        getUser();
    }, [slug])
    return (
        <div>{slug}</div>
    )
}

export default order