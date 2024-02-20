import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useQRCode } from 'next-qrcode';
import Link from 'next/link'
import Image from 'next/image'
import Loading from '@/components/loading';
import Style from '@/styles/slug.module.css'
import BackBtn from '@/components/backBtn';
const order = () => {
    const { Canvas } = useQRCode();
    const router = useRouter();
    const { slug } = router.query;
    const [token, setToken] = useState('');
    const [data, setData] = useState(null);
    const [cancelTxt, setCancelTxt] = useState('Cancel order')
    const [isLogined, setisLogined] = useState(false);

    const getOrder = async () => {
        const getSession = localStorage.getItem('bella10_state');
        if (getSession && getSession != '{}' && getSession != '[Object,object]') {
            const { token } = JSON.parse(getSession);
            const getData = await axios.post('/api/v1/orders/getOrder', { token, orderID: slug });
            if (getData.data.status) {
                setData(getData.data);
            }
        }
    }

    const session = async () => {
        const getSession = localStorage.getItem('bella10_state');
        if (getSession && getSession != '{}' && getSession != '') {
            const { token } = JSON.parse(getSession);
            const req = await axios.post('/api/v1/session', { token });
            if (req.data.status) {
                setToken(req.data.token)
                localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
                setisLogined(true);
            }
            else {
                localStorage.setItem('bella10_state', '{}');
            }
        }
        else {
            router.push('/login');
        }
    }
    const cancelFunc = async () => {
        setCancelTxt("Cancelling...");
        const req = await axios.post('/api/v1/orders/cancel', { token, orderID: slug });
        if (req.data.status) {
            getOrder();
            setCancelTxt("Cancel order")
        }
        else {
            setCancelTxt("Cancel order")
            alert(req.data.message)
        }
    }
    useEffect(() => {
        session();
        getOrder();
    }, [slug])
    return (
        <>
        <BackBtn/>
            {data == null ? <Loading /> :
                <>
                    <div className='w-full flex justify-center max-sm:flex-col max-sm:items-center pt-5 mb-20'>
                        <div className='w-[85%] border p-5'>
                            <div className='text-2xl flex items-center mb-2'>Cart <span className='ml-1'>({data.orders.orderCart.length} items)</span></div>
                            <div className='flex flex-col justify-start'>
                                {data.orders.orderCart.length == 0 ? <div className='ml-5 mt-5'>Invalid order id</div> : ""}
                                {data.orders.orderCart.map((el, index) => (
                                    <div key={index} className='relative'>
                                        <Link href={`/shop/${el.productIDs}`} className='w-full batList flex justify-center border transition-all duration-100 z-[1]'>
                                            <Image
                                                className='m-3'
                                                src={`/${el.productIDs}.jpg`}
                                                alt={el.name}
                                                width={80}
                                                height={100}
                                                priority='eagar'
                                            />
                                            <div className='w-full flex pt-4 max-md:my-2 max-md:mt-0 justify-start items-start flex-col z-10'>
                                                <div className='text-orange-500 text-sm overflow-hidden mt-4 text-start '>{el.name}</div>
                                                <div className='text-sm text-black'>{el.price}₹</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='w-[85%] h-full p-5'>
                            <div className='text-2xl flex items-center mb-2'>Bill</div>
                            <div className='w-full border-2 text-sm mt-4 p-9 font-medium'>
                                <div className='flex justify-between m-1'>
                                    <span>Item total</span>
                                    <span>₹{data.orders.totalProductSum}</span>
                                </div>
                                <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                    <span>Bella10 coins</span>
                                    <span className='text-orange-500'>-₹{data.orders.usedBellaPoints || 0}</span>
                                </div>
                                <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                    <span>Date</span>
                                    <span className='text-orange-500'>{new Date(data.orders.time).toLocaleDateString()}</span>
                                </div>
                                <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                    <span>Time</span>
                                    <span className='text-orange-500'>{new Date(data.orders.time).toLocaleTimeString('en-IN').toUpperCase()}</span>
                                </div>
                                {data.orders.couponCode &&
                                    <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                        <span>Coupon used</span>
                                        <span className='text-orange-500'>{data.orders.couponCode}</span>
                                    </div>
                                }
                                <div className='flex justify-between m-1 border-b-2 pb-2 border-dashed'>
                                    <span>Mobile No.</span>
                                    <span className='text-orange-500'>+91 {data.orders.mobileNo.slice(0, 5)} {data.orders.mobileNo.slice(5)}</span>
                                </div>
                                <div className='flex justify-between m-1 mt-2 text-2xl'>
                                    <span>Grand total</span>
                                    <span className=''>₹{data.orders.totalbill}</span>
                                </div>

                                <div className='text-sm text-gray-400 m-1 border-b-2 pb-6 border-dashed'>Inclusive of all taxes</div>
                                {data.orders.isCancelled || data.orders.isConfirmed ?
                                    <div className={`flex justify-center items-center ${Style.outofStock}`}>
                                        <a className='opacity-60'>{data.orders.isCancelled ? "Cancelled" : "Delivered"}</a>
                                    </div> :
                                    <div className={`flex justify-center items-center active:opacity-60 hover:opacity-80 ${Style.outofStock}`} onClick={cancelFunc}>
                                        <a>{cancelTxt}</a>
                                    </div>
                                }
                            </div>
                            <div className='w-full border-2 mt-4 p-9 font-medium flex justify-center items-center'>
                                <>
                                    {isLogined ?
                                        <div className='flex flex-col justify-center items-center'>
                                            <Canvas
                                                text={slug}
                                                options={{
                                                    errorCorrectionLevel: 'M',
                                                    margin: 3,
                                                    scale: 4,
                                                    width: 200,
                                                    color: {
                                                        dark: '#fff',
                                                        light: '#f97316',
                                                    },
                                                }}
                                            />
                                            <div className='text-center mt-4'>Share this qr code or <span className='text-orange-500 font-bold'>{slug} </span>in shop</div>
                                        </div>
                                        :
                                        <div className='cursor-pointer px-10 py-4 bg-black hover:opacity-60 text-white' onClick={() => { router.push('/login') }}>Login</div>
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default order