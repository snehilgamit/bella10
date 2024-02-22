import BackBtn from '@/components/backBtn'
import React from 'react'
const offerArr = ["Buy 2 get 5% extra off", "Buy 5 get 1 bat free"]
import Head from 'next/head'
const offers = () => {
  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Discover the latest offers and discounts at Bella10 - Online and Offline Sport Shop" />
      <title>Offers | Bella10 Sport Shop</title>
      <link rel="icon" href="/favicon.ico" />
      {/* Add any additional CSS or JavaScript links here */}
    </Head>
      <BackBtn />
      <div className='flex m-5 min-h-[80vh] flex-col gap-2'>
        {offerArr.map((el, index) => (
          <div key={index} className='px-5 py-2 max-md:w-full w-[60%] rounded-lg text-lg text-red-500 brightness-105  bg-black'><span className='text-white'>{index + 1})</span> {el}</div>
        ))}
        <div className='text-sm px-2'>Discount will be applied on bella10 offline shop only, not on website.<br />Discover exclusive savings at our online store with our limited-time offer!<br />Enjoy a discount on your purchases when you shop with us.<br />Please note that this special discount is subject to change, so be sure to visit our website regularly to make the most of this fantastic opportunity.<br />Hurry and explore our products – the perfect deal might be just a click away! *Discount will be applied at checkout.<br />*Terms and conditions apply.</div>
      </div>
    </>
  )
}

export default offers