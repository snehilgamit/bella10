import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NotAdmin from '@/components/notAdmin';
const index = () => {
  const router = useRouter();
  const [isLogined, setisLogined] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)

  const routing = (path) => {
    router.push(path)
  }

  const session = async () => {
    const getSession = localStorage.bella10_state;
    if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]') {
      const { token } = JSON.parse(getSession);
      try {
        const req = await axios.post('/api/v1/session', { token });
        if (req.data.status) {
          localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
          setisLogined(true);
          setisAdmin(req.data.isAdmin);
        }
        else {
          localStorage.setItem('bella10_state', '{}');
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
      {!isAdmin ? <NotAdmin/>
        :
        <div className='flex justify-center items-center mt-10 text-center'>
          <ul className='text-white text-xl w-[250px]'>
            <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/dashboard')}>Dashboard</li>
            <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/verifyOrder')}>Verify order</li>
            <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/products')}>Product managment</li>
            <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/coupons')}>Coupon managment</li>
          </ul>
        </div>
      }
    </>
  )
}

export default index