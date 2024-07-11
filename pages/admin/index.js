import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NotAdmin from '@/components/notAdmin';
import Loading from '@/components/loading';
import Content from '@/components/admin/home.admin';
import Menubar from '@/components/admin/menubar.admin';
import Account from './dashboard';
import Products from './products';
import VerifyOrder from './verifyOrder';
import AddProduct from './AddProduct';
import SideMenu from '@/components/admin/sideMenu.admin';
import Coupons from './coupons';
const routes = { 'Dashboard': <Account />, 'New Coupon':<Coupons/>,'New Product': <AddProduct /> };
const index = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  const [path, setPath] = useState('Dashboard');

  const session = async () => {
    const getSession = localStorage.bella10_state;
    if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]') {
      const { token } = JSON.parse(getSession);
      try {
        const req = await axios.post('/api/v1/session', { token });
        const rew = await axios.post('/api/v1/admin/getData', { token });
        console.log(rew.data);
        if (req.data.status) {
          localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
          setisLoading(false);
          setisAdmin(req.data.isAdmin);
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
      {isLoading ? <Loading />
        :
        <>
          {!isAdmin ? <NotAdmin />
            :
            <div className='overflow-hidden h-screen'>
              <Menubar />
              <div className='flex'>
                <SideMenu tabChanger={setPath} activePath={path} />
                {routes[path]}
              </div>
            </div>
          }
        </>
      }
    </>
  )
}

export default index