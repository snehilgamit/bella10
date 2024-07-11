// import React from 'react'
// import BackBtn from '@/components/backBtn'
// const Coupons = () => {
//   return (
//     <>
//     Under construction
//     </>
//   )
// }

// export default Coupons

import React, { useEffect, useState } from 'react'
import BackBtn from '@/components/backBtn'
import axios from 'axios'
const Coupons = () => {
  const [coupons,setCoupons] = useState([]);

  const getCoupons = async() => {
    const get = await axios.get("/api/v1/admin/coupon/getCoupons")
    setCoupons(get.data.coupons)
  }
  useEffect(()=>{
    if(coupons.length==0){
      // getCoupons()
    }
  },[])
  return (
    <>
    <div className="flex items-center mt-3 text-3xl border text-black w-full mx-3 max-sm:w-[90%]  rounded-3xl flex-col">
      <div className='my-4'>List of coupon</div>
      {coupons.map((el,index)=>(
        <div key={index} className="text-sm mb-2 border w-[90%] flex text-start items-center flex-col relative">
          <div className='text-lg font-semibold'>index: {index+1}</div>
          <div>Coupon code: {el.couponId}</div>
          <div>off: {el.off}</div>
          <div>minimumCart: {el.minimumCart}</div>
          <div>isActive: {el.isActive?"Yes":"No"}</div>
          <div>left: {el.left}</div>
          <div>maxLimit: {el.maxLimit}</div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Coupons