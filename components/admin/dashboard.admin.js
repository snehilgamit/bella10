import Image from 'next/image'
import { useRouter } from 'next/router'

const dashboard = ({ data }) => {
    return (
        <div className='min-h-screen px-10 py-5 w-full mx-auto flex justify-center'>
            <div className='w-full text-3xl font-semibold relative'>
                <h1>
                    Account
                </h1>
                <div className='bellapoint items-center w-full my-7 flex justify-center'>
                    <div className='w-full flex justify-center text-white gap-5 max-sm:gap-1 flex-wrap'>
                        <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>User's :<span className='text-orange-500 ml-1 font-semibold'>{data.users || '0'}</span></div>
                        <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Order's :<span className='text-orange-500 ml-1 font-semibold'>{data.totalOrder}</span></div>
                        <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Pending Order's :<span className='text-orange-500 ml-1 font-semibold'>{data.totalOrder - data.cancelledOrder - data.completeOrder}</span></div>
                        <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Completed order's :<span className='text-orange-500 ml-1 font-semibold'>{data.completeOrder}</span></div>
                        <div className='font-semibold bg-black flex justify-center items-center h-56 w-[20rem] rounded-md max-sm:h-10 max-sm:w-full max-sm:text-xl max-sm:justify-start max-sm:px-2'>Cancelled order's :<span className='text-orange-500 ml-1 font-semibold'>{data.cancelledOrder}</span></div>
                    </div>
                </div>
                <div>Orders</div>
                <OrderList orders={data.orders} />
            </div>
        </div>
    )
}


const OrderList = ({ orders }) => {
    const router = useRouter();
    return (
        <>
            {orders.reverse().map((el, index) => (
                <div onClick={() => { router.push({ pathname: `order/${el.orderID}`, query: { email: el.email } }) }} key={index} className='cursor-pointer w-[65%] max-md:w-full my-4 mx-auto border rounded-md bg-white'>
                    <div className='w-full h-16 px-5 bg-gray-200 max-lg:hidden text-gray-600 border-b border-gray-700 flex items-center justify-around'>
                        <div className='text-xs font-semibold'><h1>ORDER PLACED:</h1> <h2>{el.time.split("T")[0].split("-").reverse().join("-")}</h2></div>
                        <div className='text-xs font-semibold'><h1>Total:</h1> <h2 className='text-black'>₹{el.totalbill}</h2></div>
                        <div className='text-xs font-semibold'><h1>Order id:</h1> <h2 className='text-black'>{el.orderID}</h2></div>
                        <div className='text-xs font-semibold'><h1>BellaPoint used:</h1> <h2 className='text-black'>{el.usedBellaPoints || '0'}</h2></div>

                        <div className='text-xs font-semibold'><h1>Coupon used:</h1> <h2 className='text-black'>{el.couponCode ? el.couponCode : 'None'}</h2></div>

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