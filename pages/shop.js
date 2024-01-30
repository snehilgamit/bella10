import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import connectDB from '@/util/mongoDB'
import products from '@/models/products'
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
  await connectDB();
  const category = ctx.query.categories || 'all';
  if (category === 'all') {
    try{
      const result = await products.find();
      const resResult = [];
      result.forEach(el => {
        resResult.push({
          product_id: el.product_id,
          name: el.name,
          percentage: el.percentage,
          image_uri: el.image_uri,
          price_after_discount: el.price_after_discount,
          category: el.category,
          price: el.price,
        });
      });
      return { props: { products: resResult } };
    }
    catch(e){
      console.log(e)
    }
  }
  else {
    const result = await products.find({ category });
    const resResult = [];
    result.forEach(el => {
      resResult.push({
        product_id: el.product_id,
        name: el.name,
        percentage: el.percentage,
        image_uri: el.image_uri,
        price_after_discount: el.price_after_discount,
        category: el.category,
        price: el.price,
      });
    });
    return { props: { products: resResult } };
  }
}