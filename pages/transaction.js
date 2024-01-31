import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Loading from '@/components/loading'
import router from 'next/router'
const transaction = () => {

  const [isLogined, setIsLogined] = useState(false);
  const [token, setToken] = useState('');
  const [transactions, setTransacion] = useState([]);

  const session = async () => {
    const getSession = localStorage.getItem('bella10_state');
    if (getSession && getSession != '{}' && getSession != '') {
      const { token } = JSON.parse(getSession);
      const req = await axios.post('/api/v1/session', { token });
      if (req.data.status) {
        localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
        setToken(req.data.token);
        setIsLogined(true);
      }
      else {
        setIsLogined(false);
        localStorage.setItem('bella10_state', '{}');
      }
    }
    else {
      router.push('/login');
    }
  }
  const getUser = async () => {
    const getSession = localStorage.getItem('bella10_state');
    if (getSession && getSession != '{}' && getSession != '[Object,object]') {
      const { token } = JSON.parse(getSession);
      const getData = await axios.post('/api/v1/user/transactions', { token });
      if (getData.data.status) {
        const { bellaTransaction } = getData.data;
        setTransacion(bellaTransaction);
      }
    }
  }
  useEffect(() => {
    session();
    if (isLogined) {
      getUser();
    }
  }, [isLogined])
  return (
    <>
      {isLogined ? <div className='flex justify-center flex-col'>
        <div className='my-5 text-3xl font-semibold underline text-center'>Transactions</div>
        <div className='flex justify-center items-center flex-col mb-20'>
          <div className='flex justify-around w-[70%] max-md:w-[95%] max-sm:text-sm text-center gap-2'>
            <div className='p-2 px-4'>No</div>
            <div className='p-2 max-w-[20%]'>Order ID</div>
            <div className='p-2'>BellaPoint</div>
            <div className='p-2'>Time</div>
          </div>
          {transactions.map((el, index) => (
            <Link href={`/order/${el.orderID}`} key={index} className='flex justify-around w-[70%] max-md:w-[95%] bg-black text-white rounded-xl py-1 my-1 max-sm:text-sm text-cente'>
              <div className='p-2 px-4'>{index + 1}</div>
              <div className='p-2 max-w-[30%] truncate'>{el.orderID}</div>
              <div className='p-2 text-orange-500'>{el.type === 'order'?'-'+el.usedBellaPoints:'+'+el.usedBellaPoints}</div>
              <div className='p-2'>{new Date(el.time).toLocaleDateString()}</div>
            </Link>
          ))}
        </div>
      </div> : <Loading/>}
    </>
  )
}

export default transaction