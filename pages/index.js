import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
const homeMenu = ["Cricket", "Football", "Tennis", "Volleyball", "All"];
const Home = () => {
  const [product, setProduct] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const getProducts = await axios.post('/api/v1/product/getProducts', { category: 'cricket' });
      setProduct(getProducts.data.results)
      setIsFetching(false)
    }
    fetchData();
  }, [])
  return (
    <div className='w-full overflow-hidden mb-10'>
      <div className='offer_banner w-full h-full text-white max-sm:my-5 flex justify-center'>
        <Image
          src={'/poster.png'}
          height={1000}
          width={1200}
          priority='eagar'
        />
      </div>
      <div className='Home_shopmenu w-full h-full px-10 mt-8 font-semibold bg-orange-100'>
        <div className='w-full text-5xl mt-6 max-sm:text-4xl pt-5 max-sm:text-center'>
          SHOP
        </div>
        <div className='flex justify-start max-sm:justify-center items-center mt-6 flex-wrap pb-10 max-sm:gap-10 gap-14'>
          {homeMenu.map((el, index) => (
            <Link href={el == "All" ? "/shop" : `/shop?categories=${el.toLowerCase()}`} key={index} className='p-4 cursor-pointer px-3 flex justify-center items-center flex-col rounded-full max-sm:scale-90 max-sm:p-2'>
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
      {isFetching ? <div>loading</div> :
        <div className='flex items-center text-center justify-start max-sm:justify-center flex-wrap w-[80%] gap-5 max-sm:w-[95%] mb-10 mx-auto mt-10 h-full'>
          {product.map((el, index) => (
            <Link href={`/shop/${el.product_id}`} key={index} className='w-[300px] max-sm:border h-96 batList flex flex-col justify-center items-center hover:shadow-md transition-all duration-100'>
              <Image
                className='mt-2'
                src={el.image_uri}
                width={135}
                alt={el.name}
                height={100}
                priority='eagar'
              />
              <div className='w-full h-full flex justify-start items-start flex-col'>
                <div className='text-sm overflow-hidden h-10 text-start'>{el.name}...</div>
                <div className='flex items-center font-bold text-base mb-5'><span className='text-base mr-2.5 text-black'>{el.percentage} %off</span>₹{el.price_after_discount} <span className='ml-1 font-normal text-xs line-through text-slate-400'>₹{el.price}</span></div>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  )
}

export default Home