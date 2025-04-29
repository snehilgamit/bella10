import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@/components/loading'
import { useRouter } from 'next/router'
import BackBtn from '@/components/backBtn'
import Head from 'next/head'
const transaction = () => {
  const router = useRouter()
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

  const routering = (type, orderID) => {
    type !== 'order' ? router.push(`/transaction`) : router.push(`/order/${orderID}`)
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="View your transaction history at Bella10 - Online and Offline Sport Shop" />
        <title>Transaction History | Bella10 Sport Shop</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Add any additional CSS or JavaScript links here */}
      </Head>
      <BackBtn />
      {isLogined ? <div className='flex justify-center flex-col'>
        <div className='my-5 text-3xl font-semibold underline text-center'>Transactions</div>
        <table>
          <tbody className='w-full mb-20 flex justify-center flex-col items-center'>
            <tr className='flex justify-around w-[70%] max-md:w-[95%] max-sm:text-sm text-center'>
              <th>No</th>
              <th>Order ID</th>
              <th>BellaPoint</th>
              <th>Time</th>
            </tr>
            {transactions.map((el, index) => (
              <tr onClick={() => { routering(el.type, el.orderID) }} key={index} className='flex justify-around w-[70%] max-md:w-[95%] bg-black text-white rounded-xl py-1 my-1 max-sm:text-sm text-center cursor-pointer'>
                <td className="py-2">{index + 1}</td>
                <td className="py-2 truncate">{el.orderID}</td>
                <td className="py-2 text-red-500 brightness-105">{el.type === 'order' ? '-' + el.usedBellaPoints : '+' + el.usedBellaPoints}</td>
                <td className="py-2">{new Date(el.time).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <Loading />}
    </>
  )
}

export default transaction