import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BackBtn from '@/components/backBtn'
import NotAdmin from '@/components/notAdmin'
import Loading from '@/components/loading'
import { useEffect } from 'react'
const verifyOrder = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [details, setDetails] = useState({ email: "", orderID: "" });
  const [data, setData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [email, setEmail] = useState(null);

  const fillDetails = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const search = async (e) => {
    e.preventDefault();
    setSearching(true);
    const getData = await axios.post('/api/v1/admin/orders/getOrder', { ...details, token });
    if (getData.data.status) {
      setData(getData.data.orders);
      setEmail(getData.data.email)
      setSearching(false);
      setDetails({ email: "", orderID: "" });
    }
    else {
      setSearching(false);
      setDetails({ email: "", orderID: "" });
      alert(getData.data.message);
    }
  }
  const session = async () => {
    const getSession = localStorage.bella10_state;
    if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]') {
      const { token } = JSON.parse(getSession);
      try {
        const req = await axios.post('/api/v1/session', { token });
        if (req.data.status) {
          localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
          setisAdmin(req.data.isAdmin);
          if (req.data.isAdmin) {
            setToken(req.data.token)
          }
          else {
            router.push('/')
          }
          setisLoading(false)
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
  const routing = (orderID) => {
    router.push({ pathname: `order/${orderID}`, query: { email } })
  }

  const SearchComponent = ({ data }) => (
    <form onSubmit={search} className='flex flex-col mt-5 gap-2 w-full items-center'>
      <input className='border border-black p-2 w-[400px] max-sm:w-[250px] rounded-xl' placeholder='Enter email' type="email" name="email" value={data.email} onChange={fillDetails} id="email" />
      <input className='border border-black p-2 w-[400px] max-sm:w-[250px] rounded-xl' type="text" name="orderID" placeholder='Enter orderID' value={data.orderID} onChange={fillDetails} id="orderID" />
      {searching ?
        <button type="button" className='px-10 py-1.5 rounded-xl text-lg mt-6 bg-black text-white'>Searching...</button>
        :
        <button type="submit" className='px-10 py-1.5 rounded-xl text-lg mt-6 bg-black text-white '>Search</button>
      }
    </form>
  )

  useEffect(() => {
    session();
  }, [])

  return (
    <>{isLoading ? <Loading /> :
      <>{!isAdmin ? <NotAdmin /> :
        <>
          <BackBtn />
          <div className='flex my-5 h-full items-center flex-col w-full'>
            <div className='text-3xl font-semibold'>Verify order</div>

            <SearchComponent data={details} />
            
            {data &&
              <div onClick={() => routing(data.orderID)} className='cursor-pointer w-[65%] max-md:w-full my-4 mx-auto border rounded-md bg-white'>
                <div className='w-full h-16 px-5 bg-gray-200 max-lg:hidden text-gray-600 border-b border-gray-700 flex items-center justify-around'>
                  <div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2>{data.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                  <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-black'>₹{data.totalbill}</h2></div>
                  <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-black'>{data.orderID}</h2></div>
                  <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-black'>{data.usedBellaPoints || 0}</h2></div>

                  <div className='text-xs font-semibold'><h1>Coupon used:</h1> <h2 className='text-black'>{data.couponCode ? data.couponCode : 'None'}</h2></div>

                  <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-orange-500'>{data.isConfirmed ? <span>Delivered</span> : <span>{data.isCancelled ? "Cancelled" : "Pending"}</span>}</h2></div>
                </div>
                <div className='border px-2'>
                  <div className='bg-white mx-4 flex'>
                    <Image
                      className='p-4 max-md:p-2 mr-4 max-h-[250px]'
                      width={120}
                      height={100}
                      alt={data.orderCart[0].name}
                      src={`/${data.orderCart[0].productIDs}.jpg`} />

                    <div className='text-orange-500 hover:text-black text-xs mt-4 max-lg:hidden'>{data.orderCart[0].name} <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {data.orderCart.length - 1} more</span> </div>

                    <div className='w-full hidden max-lg:block'>
                      <div className='text-orange-500 hover:text-black text-xs mt-4'>{data.orderCart[0].name} <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {data.orderCart.length - 1} more</span> </div>
                      <div className='flex items-center flex-wrap gap-2 my-3 p-2  border border-gray-200'><div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2 className='text-orange-500'>{data.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                        <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-orange-500'>₹{data.totalbill}</h2></div>
                        <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-orange-500'>{data.orderID}</h2></div>
                        <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-orange-500'>{data.usedBellaPoints || 0}</h2></div>
                        <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-orange-500'>{data.isConfirmed ?
                          <span>Delivered</span> :
                          <span>{data.isCancelled ? "Cancelled" : "Pending"}
                          </span>}
                        </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </>}
      </>
    }
    </>
  )
}

export default verifyOrder