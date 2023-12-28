import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
const Slug = () => {
  const router = useRouter();
  const { slug } = router.query
  const [value, setValue] = useState("loading")
  const exampleArr = {
    product_id: "123D", name: "Grit Gear Poplar Willow Scooped Cricket Bat with German Vinyl Sticker - Alpha (Orange) Poplar Willow Cricket Bat  (0.85 kg)", price: 2000, price_after_discount: 1000, percentage: '50%', image_uri: "/exampleBat.webp"
  }
  useEffect(() => {
    setValue(slug)
  }, [slug])
  return (
    <div>
      <div className='flex justify-center max-sm:flex-col w-full h-full p-5 mt-6'>
        <div className='Image border ml-10 max-sm:ml-0 flex justify-center items-center'>
          <Image
            className='p-4'
            src={exampleArr.image_uri}
            width={300}
            height={300}
          />
        </div>
        <div className='order_details flex flex-col justify-start max-sm:justify-center w-[50%] ml-20 max-sm:ml-0 max-sm:w-full'>
          <div className='w-full details h-full flex justify-start flex-col'>
            <div className='text-xl w-full overflow-hidden text-start my-5 text-pretty'>{exampleArr.name}</div>
            <div className='flex items-center font-bold text-xl mb-2'><span className='text-3xl mr-2.5 text-orange-500'>{exampleArr.percentage} off</span></div>
            <div>
              <div className='text-blue-600'>Special price</div>
              <div className='font-bold text-3xl mt-1'>₹{exampleArr.price_after_discount} <span className=' font-normal text-base line-through text-slate-400'>₹{exampleArr.price}</span></div>
            </div>
            <div className='mt-2'>
              <div className='text-lg'>Offers :</div>
            </div>
          </div>
          <div className="order">
            <div className='buynow'>
              s
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slug