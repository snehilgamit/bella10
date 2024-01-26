import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Style from '@/styles/slug.module.css'
import Link from 'next/link'
import Menubar from '@/components/menubar'
import axios from 'axios'
const Slug = () => {
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const { slug } = router.query
  const [value, setValue] = useState("loading")
  const [cartNum, setCartNum] = useState(0)
  const [add_to_cartText, setadd_to_cartText] = useState("Add to cart")
  const [product, setProduct] = useState({});

  const setCart_to_menu = () => {
    const cart = localStorage.getItem('cart')
    if (cart && cart != '[]') {
      const len = cart.split('},{').length;
      setCartNum(len)
    }
  }
  const addtocart = (getCart) => {
    setadd_to_cartText("Added!")
    const cart = localStorage.getItem('cart')
    if (cart) {
      const tempCart = JSON.parse(cart);
      tempCart.push(getCart)
      localStorage.setItem('cart', JSON.stringify(tempCart))
    }
    else {
      localStorage.setItem('cart', JSON.stringify([getCart]))
    }
    setTimeout(() => {
      setadd_to_cartText("Add to cart")
    }, 800)
    setCart_to_menu();
  }
  useEffect(() => {
    if (slug) {
      fetchData()
    }
    setCart_to_menu()
    setValue(slug)
  }, [slug])
  const fetchData = async () => {
    const getProducts = await axios.post("/api/v1/product/getProduct", { product_id: slug })
    setProduct(getProducts.data.results)
    setIsFetching(false)
  }
  return (
    <>
      <Menubar cartNum={cartNum} />
      {isFetching ?
        <div>Loading</div> :
        <>
          <div className='bg-slate-100 min-h-screen'>
            <div className='flex justify-center max-sm:flex-col w-full h-full p-5'>
              <div className='Image border max-sm:ml-0 bg-white flex justify-center items-center'>
                <Image
                  className='p-6'
                  src={product.image_uri}
                  width={300}
                  height={300}
                  alt={product.name}
                />
              </div>
              <div className='order_details flex flex-col justify-start max-sm:justify-center w-[50%] ml-20 max-sm:ml-0 max-sm:w-full'>
                <div className='w-full details flex justify-start flex-col'>
                  <div className='text-xl w-full overflow-hidden text-start my-5 text-pretty'>{product.name}</div>
                  <div className='flex items-center font-bold text-xl mb-2'><span className='text-3xl mr-2.5 text-orange-500'>{product.percentage}% off</span></div>
                  <div>
                    <div className='text-blue-600'>Special price</div>
                    <div className='font-bold text-3xl mt-1'>₹{product.price_after_discount} <span className=' font-normal text-base line-through text-slate-400'>₹{product.price}</span></div>
                  </div>
                  <div className='mt-2 font-medium'>
                    <div className='text-lg'>Offers :</div>
                    {product.offer.map((el, index) => (
                      <div key={index} className='ml-3 text-sm text-orange-500'>
                        * {el}
                      </div>
                    ))}
                  </div>
                  <div className='mt-2'>
                    <div className='text-lg font-medium'>Highlights :</div>
                    <div className='ml-3 text-sm'>
                      Age Group 12 - 14 Yrs<br />
                      Blade Made of Poplar Willow<br />
                      Beginner Playing Level<br />
                      Bat Grade: Grade 1<br />
                      Sport Type: Cricket<br />
                      Weight Range 0.85 kg
                    </div>
                  </div>
                </div>
                <div className={`flex justify-center items-center ${Style.loginArea}`}>
                  <a onClick={
                    () => {
                      addtocart(product);
                      router.push('/cart');
                    }
                  }>
                    Buy
                  </a>
                  <a onClick={() => { addtocart(product) }}>
                    {add_to_cartText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Slug