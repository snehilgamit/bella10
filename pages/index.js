import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const homeMenu = ["Cricket", "Football", "Tennis", "Volleyball", "All"];
const Home = () => {
  return (
    <div className='w-full overflow-hidden mb-10'>
      <div className='offer_banner w-full h-full text-white max-sm:my-5 flex justify-center'>
        <Image
          src={'/5aa39a1c-e561-4055-9a39-0698075d2d99.webp'}
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
            <Link href={el=="All"?"/shop":`/shop?categories=${el}`} key={index} className='p-4 cursor-pointer px-3 flex justify-center items-center flex-col rounded-full max-sm:scale-90 max-sm:p-2'>
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
    </div>
  )
}

export default Home