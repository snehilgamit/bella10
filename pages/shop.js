import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const shop = () => {
  const router = useRouter();
  const { categories } = router.query
  const category = [ "cricket", "all","Cricket","All",undefined];
  const catagoryBool = category.includes(categories)
  const exampleArr = [
    {
      product_id:"123D",name:"dipsy Popular WillowBat for All Tennis Balls",price:2000,price_after_discount:1000,percentage:'50%',image_uri:"/exampleBat.webp"
    },
    {
      product_id:"124D",name:"dipsy Popular WillowBat for All Tennis Balls, Wood(.8 kg)",price:4000,price_after_discount:2000,percentage:'50%',image_uri:"/exampleBat.webp"
    },
    {
      product_id:"125D",name:"Grit Gear Poplar Willow Scooped Cricket Bat with German Vinyl Sticker - Alpha (Orange) Poplar Willow Cricket Bat  (0.85 kg)",price:8000,price_after_discount:4000,percentage:'50%',image_uri:"/exampleBat.webp"
    },
    {
      product_id:"125D",name:"bat bhai",price:8000,price_after_discount:4000,percentage:'50%',image_uri:"/exampleBat.webp"
    },
    {
      product_id:"125D",name:"bat bhai",price:8000,price_after_discount:4000,percentage:'50%',image_uri:"/exampleBat.webp"
    },
    {
      product_id:"125D",name:"bat bhai",price:0,price_after_discount:99999,percentage:'0%',image_uri:"/exampleBat.webp"
    }
  ]
  return (
    <div>
      {catagoryBool? 
      <div>
        <div className='flex items-center text-center justify-start max-sm:justify-center flex-wrap w-[80%] gap-5 max-sm:w-[95%] mb-10 mx-auto mt-10 h-full'>
          {exampleArr.map((el,index)=>(
              <Link href={`/${el.name}`} key={index} className='w-[300px] max-sm:border h-96 batList flex flex-col justify-center items-center hover:shadow-md transition-all duration-100'>
                <Image
                className='mt-2'
                src={`${el.image_uri}`}
                width={135}
                height={100}
                priority='eagar'
                />
                <div className='w-full h-full flex justify-start items-start flex-col'>
                    <div className='text-sm overflow-hidden h-10 text-start'>{el.name}...</div>
                    <div className='flex items-center font-bold text-base mb-5'><span className='text-base mr-2.5 text-black'>{el.percentage} off</span>₹{el.price_after_discount} <span className='ml-1 font-normal text-xs line-through text-slate-400'>₹{el.price}</span></div>
                </div>
              </Link>
          ))}
        </div>
      </div>
      :
        <div className='flex justify-center items-center text-center min-h-[75vh] text-4xl font-semibold'>
          <div>
            Coming soon!
          </div>
        </div>
      }
    </div>
  )
}

export default shop