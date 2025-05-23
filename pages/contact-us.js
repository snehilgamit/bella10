import BackBtn from '@/components/backBtn'
import React from 'react'
import Head from 'next/head'
const details = {mobileNo:{no:999999999,name:'bella10(1)'},email:'bella10@bella10.store',mobileNo2:{no:999999998,name:'bella10(2)'}}
const contactus = () => {
  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Contact Bella10 for any inquiries or support - Online and Offline Sport Shop" />
      <title>Contact Us | Bella10 Sport Shop</title>
      <link rel="icon" href="/favicon.ico" />
      {/* Add any additional CSS or JavaScript links here */}
    </Head>
    <BackBtn/>
    <div className='flex justify-center items-center w-full mt-5 flex-col gap-2 text-center text-lg text-red-500'>
      <div className='px-10 py-2 w-[50%] max-md:w-[90%] rounded-lg bg-white brightness-105  border-black border-2'><span className='text-black'>Phone No:</span> +91{details.mobileNo.no}</div>
      <div className='px-10 py-2 w-[50%] max-md:w-[90%] rounded-lg bg-white brightness-105  border-black border-2'><span className='text-black'>Phone No(2):</span> +91{details.mobileNo2.no}</div>
      <div className='px-10 py-2 w-[50%] max-md:w-[90%] rounded-lg bg-white brightness-105  border-black border-2'><span className='text-black'>Email:</span> {details.email}</div>
    </div>
    </>
  )
}

export default contactus