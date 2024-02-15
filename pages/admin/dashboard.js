import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Loading from '@/components/loading'
import BackBtn from '@/components/backBtn'
import NotAdmin from '@/components/notAdmin'
import Dashboard from '@/components/admin/dashboard.admin'


const account = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [accountDetails, setAccountdetails] = useState({
        users: 0,
        orders: [],
        totalOrder: 0,
        completeOrder: 0,
        Ordercanceled: 0,
    });
    const getDashboard = async (token) => {
        const getData = await axios.post('/api/v1/admin/dashboard', { token });
        setAccountdetails(getData.data);
        setisLoading(getData.data.status);
    }

    const session = async () => {
        const getSession = localStorage.bella10_state;
        if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]') {
            const { token } = JSON.parse(getSession);
            try {
                const req = await axios.post('/api/v1/session', { token });
                if (req.data.status) {
                    localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
                    setisAdmin(req.data.status);
                    if (req.data.isAdmin) {
                        getDashboard(req.data.token);
                    }
                    else {
                        router.push("/")
                    }
                }
                else {
                    localStorage.setItem('bella10_state', '{}');
                    router.push("/login");
                }
            }
            catch (err) {
            }
        }
        else {
            router.push("/login")
        }
    }

    useEffect(() => {
        session();
    }, [])


    return (
        <>
            {!isLoading ? <Loading />
                :
                <>
                    {!isAdmin ? <NotAdmin /> : <><BackBtn />
                        <Dashboard data={accountDetails} />
                    </>}
                </>}
        </>
    )
}

export default account
