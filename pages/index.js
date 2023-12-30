import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const homeMenu = ["Cricket", "Football", "Tennis", "Volleyball", "All"];
const Home = () => {
  const exampleArr = [
    {
      product_id: "123D", name: "dipsy Popular WillowBat for All Tennis Balls", price: 2000, price_after_discount: 1000, percentage: '50%', image_uri: "/exampleBat.webp"
    },
    {
      product_id: "124D", name: "dipsy Popular WillowBat for All Tennis Balls, Wood(.8 kg)", price: 4000, price_after_discount: 2000, percentage: '50%', image_uri: "/exampleBat.webp"
    },
    {
      product_id: "125D", name: "Grit Gear Poplar Willow Scooped Cricket Bat with German Vinyl Sticker - Alpha (Orange) Poplar Willow Cricket Bat  (0.85 kg)", price: 8000, price_after_discount: 4000, percentage: '50%', image_uri: "/exampleBat.webp"
    },
    {
      product_id: "125D", name: "bat bhai", price: 8000, price_after_discount: 4000, percentage: '50%', image_uri: "/exampleBat.webp"
    },
    {
      product_id: "125D", name: "bat bhai", price: 8000, price_after_discount: 4000, percentage: '50%', image_uri: "/exampleBat.webp"
    },
    {
      product_id: "125D", name: "bat bhai", price: 0, price_after_discount: 99999, percentage: '0%', image_uri: "/exampleBat.webp"
    }
  ]
  return (
    <div className='w-full overflow-hidden mb-10'>
      <div className='offer_banner w-full h-full text-white max-sm:my-5 flex justify-center'>
        <Image
          src={'/poster.webp'}
          height={1000}
          width={1600}
          priority='eagar'
        />
      </div>
      <div className='Home_shopmenu w-full h-full px-10 mt-8 font-semibold bg-orange-100'>
        <div className='w-full text-5xl mt-6 max-sm:text-4xl pt-5 max-sm:text-center'>
          SHOP
        </div>
        <div className='flex justify-start max-sm:justify-center items-center mt-6 flex-wrap pb-10 max-sm:gap-10 gap-14'>
          {homeMenu.map((el, index) => (
            <Link href={el == "All" ? "/shop" : `/shop?categories=${el}`} key={index} className='p-4 cursor-pointer px-3 flex justify-center items-center flex-col rounded-full max-sm:scale-90 max-sm:p-2'>
              <Image
                src={`/${el}.png`}
                height={50}
                width={50}
              />
              <span className='mt-1'>{el}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className='w-full text-5xl max-sm:text-4xl pt-5 max-sm:text-center font-semibold px-10 mt-8'>
          Top Selling
        </div>
      <div className='flex items-center text-center justify-start max-sm:justify-center flex-wrap w-[80%] gap-5 max-sm:w-[95%] mb-10 mx-auto mt-10 h-full'>
        {exampleArr.map((el, index) => (
          <Link href={`/shop/${el.name}`} key={index} className='w-[300px] max-sm:border h-96 batList flex flex-col justify-center items-center hover:shadow-md transition-all duration-100'>
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
  )
}

export default Home