import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
const shop = ({ products }) => {
  const router = useRouter();
  const { categories } = router.query;
  const category = ["cricket", "all", "Cricket", "All", undefined];
  const categoryBool = category.includes(categories);
  return (
    <>
      <div>
        {categoryBool ?
          <div>
            <div className='flex items-center text-center justify-start max-sm:justify-center flex-wrap w-[80%] gap-5 max-sm:w-[95%] mb-10 mx-auto mt-10 h-full'>
              {products.map((el, index) => (
                <Link href={`/shop/${el.product_id}`} key={index} className='w-[300px] max-sm:border h-96 batList flex flex-col justify-center items-center hover:shadow-md transition-all duration-100'>
                  <Image
                    className='my-3'
                    src={el.image_uri}
                    width={140}
                    alt={el.name}
                    height={180}
                    priority='eagar'
                  />
                  <div className='w-full h-full flex justify-start items-start flex-col'>
                    <div className='text-sm overflow-hidden h-10 text-start'>{el.name}...</div>
                    <div className='flex items-center font-bold text-base mb-5'><span className='text-base mr-2.5 text-black'>{el.percentage}% off</span>₹{el.price_after_discount} <span className='ml-1 font-normal text-xs line-through text-slate-400'>₹{el.price}</span></div>
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
    </>
  )
}

export default shop


export async function getServerSideProps(ctx) {
  const getProducts = await axios.post('https://bella10-delta.vercel.app/api/v1/product/getProducts', { category: ctx.query.categories || 'all' });
  const products = await getProducts.data.results;
  return { props: { products } };
}