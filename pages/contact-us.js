import React from 'react'
const details = {mobileNo:{no:999999999,name:'bella10(1)'},email:'bella10@bella10.store',mobileNo2:{no:999999998,name:'bella10(2)'}}
const contactus = () => {
  return (
    <div className='flex justify-center items-center w-full min-h-[60vh] flex-col gap-2 text-center'>
      <div className='px-10 py-2 w-[50%] max-md:w-[90%] rounded-lg text-lg text-orange-500  bg-black'><span className='text-white'>Phone No:</span> +91{details.mobileNo.no}</div>
      <div className='px-10 py-2 w-[50%] max-md:w-[90%] rounded-lg text-lg text-orange-500  bg-black'><span className='text-white'>Phone No(2):</span> +91{details.mobileNo2.no}</div>
      <div className='px-10 py-2 w-[50%] max-md:w-[90%] rounded-lg text-lg text-orange-500  bg-black'><span className='text-white'>Email:</span> {details.email}</div>
    </div>
  )
}

export default contactus