import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
const dashboard = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const getData = async () => {
        const getSession = localStorage.bella10_state;
        if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]') {
            const { token } = JSON.parse(getSession);
            try {
                const rew = await axios.post('/api/v1/admin/getData', { token });
                if (rew.data.status) {
                    setChartData(rew.data.data)
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
        getData();
    }, [])
    return (
        <div className='h-screen overflow-x-scroll px-10 py-5 w-full mx-auto bg-gray-400/10'>
            <div className='w-[85%] mt-10 text-xl font-bold ml-[6.6rem] mb-2'>
                <h1>
                    Account
                </h1>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-[85%] flex'>
                    <div className='text-3xl font-semibold relative w-[65%] h-fit bg-white border rounded-lg p-4'>
                        <div className='w-[80%] text-base font-bold ml-3 mb-2'>
                            <h1>
                                Sale Statistics
                            </h1>
                        </div>
                        <ResponsiveContainer width="100%" minHeight={350} className='text-sm'>
                            <AreaChart
                                width={200}
                                height={300}
                                data={chartData}
                                margin={{
                                    top: 60,
                                    right: 20,
                                    left: 20,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="0 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="count" stroke="#84d88f" fill="#84d88f" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='mx-4 px-6 p-6 w-[25%] bg-white h-fit rounded-lg border'>
                        <div className='w-[80%] text-base font-bold mb-1'>
                            <h1>
                                Lifetime Sales
                            </h1>
                        </div>
                        <div className='ml-2 mt-2 font-normal text-sm flex flex-col gap-1'>
                            <div className='flex items-center gap-1.5'>
                                <div className='w-2.5 h-2.5 rounded-full bg-blue-400 opacity-25'></div>
                                <h1>{data.users || 0} users</h1>
                            </div>

                            <div className='flex items-center gap-1.5'>
                                <div className='w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-25'></div>
                                <h1>{data.totalSales || 0}₹ lifetime sale</h1>
                            </div>

                            <div className='flex items-center gap-1.5'>
                                <div className='w-2.5 h-2.5 rounded-full bg-red-400 opacity-25'></div>
                                <h1>{data.orders.length || 0} orders</h1>
                            </div>

                            <div className='flex items-center gap-1.5'>
                                <div className='w-2.5 h-2.5 rounded-full bg-purple-400 opacity-25'></div>
                                <h1>{data.completeOrder || 0} completed orders</h1>
                            </div>

                            <div className='flex items-center gap-1.5'>
                                <div className='w-2.5 h-2.5 rounded-full bg-cyan-400 opacity-25'></div>
                                <h1>{data.totalOrder - data.cancelledOrder - data.completeOrder || 0} pending orders</h1>
                            </div>

                            <div className='flex items-center gap-1.5'>
                                <div className='w-2.5 h-2.5 rounded-full bg-lime-500 opacity-25'></div>
                                <h1>{data.cancelledOrder || 0} cancelled orders</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center mt-2'>
                <div className='w-[85%] flex'>
                    <div className='text-3xl font-semibold relative w-[65%] h-fit bg-white border rounded-lg p-4'>
                        <div className='w-[80%] text-base font-bold ml-3 mb-2'>
                            <h1>
                                Recent order
                            </h1>
                        </div>
                        <OrderList orders={data.orders} />
                    </div>
                </div>
            </div>
            <div className='py-14'></div>
        </div>
    )
}






const OrderList = ({ orders }) => {
    const router = useRouter();
    return (
        <>
            {orders.slice(0, 10).reverse().map((el, index) => (
                <div onClick={() => { router.push({ pathname: `admin/order/${el.orderID}`, query: { email: el.email } }) }} key={index} className='cursor-pointer w-full  max-md:w-full my-4 border rounded-md bg-white'>
                    <div className='w-full h-16 px-5 bg-gray-200 max-lg:hidden text-gray-600 border-b border-gray-700 flex items-center justify-around text-xs font-semibold'>
                        <div><h1>ORDER PLACED:</h1> <h2>{el.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                        <div ><h1>Total:</h1> <h2 className='text-black'>₹{el.totalbill}</h2></div>
                        <div ><h1>Order id:</h1> <h2 className='text-black'>{el.orderID}</h2></div>
                        <div ><h1>BellaPoint used:</h1> <h2 className='text-black'>{el.usedBellaPoints || '0'}</h2></div>

                        <div ><h1>Coupon used:</h1> <h2 className='text-black'>{el.couponCode ? el.couponCode : 'None'}</h2></div>

                        <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-orange-500'>{el.isConfirmed ? <span>Delivered</span> : <span>{el.isCancelled ? "Cancelled" : "Pending"}</span>}</h2></div>
                    </div>
                    <div className='border px-2'>
                        <div className='bg-white mx-4 flex'>
                            <Image
                                className='p-4 max-md:p-2 mr-4 max-h-[250px]'
                                width={120}
                                height={100}
                                alt={el.orderCart[0].name}
                                src={`/${el.orderCart[0].productIDs}.jpg`} />

                            <div className='text-orange-500 hover:text-black text-xs mt-4 max-lg:hidden'>{el.orderCart[0].name} <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {el.orderCart.length - 1} more</span> </div>

                            <div className='w-full hidden max-lg:block'>
                                <div className='text-orange-500 hover:text-black text-xs mt-4'>{el.orderCart[0].name} <span className='text-sm ml-4 max-md:ml-0 mt-1 text-black'>+ {el.orderCart.length - 1} more</span> </div>
                                <div className='flex items-center flex-wrap gap-2 my-3 p-2  border border-gray-200'><div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2 className='text-orange-500'>{el.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                                    <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-orange-500'>₹{el.totalbill}</h2></div>
                                    <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-orange-500'>{el.orderID}</h2></div>
                                    <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-orange-500'>{el.usedBellaPoints || '0'}</h2></div>
                                    <div className='text-xs font-semibold'><h1>Status:</h1> <h2 className='text-orange-500'>{el.isConfirmed ?
                                        <span>Delivered</span> :
                                        <span>{el.isCancelled ? "Cancelled" : "Pending"}
                                        </span>}
                                    </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}



export default dashboard