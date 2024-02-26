import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Style from '@/styles/slug.module.css'
import Link from 'next/link'
import Menubar from '@/components/menubar'
import axios from 'axios'
import Loading from '@/components/loading'
import BackBtn from '@/components/backBtn'
import Head from 'next/head'
const Slug = () => {
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const { slug } = router.query
  const [value, setValue] = useState("loading")
  const [cartNum, setCartNum] = useState(0);
  const [add_to_cartText, setadd_to_cartText] = useState("Add to cart")
  const [addtoCart, setaddtoCart] = useState(true);
  const [product, setProduct] = useState({});
  const query = router.route.split("/")
  const setCart_to_menu = () => {
    const cart = localStorage.getItem('cart')
    if (cart && cart != '[]') {
      const len = cart.split('},{').length;
      setCartNum(len)
    }
  }
  const addtocart = (getCart) => {
    setaddtoCart(false)
    const cart = localStorage.getItem('cart');
    if (cart) {
      const tempCart = JSON.parse(cart);
      tempCart.push(getCart);
      localStorage.setItem('cart', JSON.stringify(tempCart));
    }
    else {
      localStorage.setItem('cart', JSON.stringify([getCart]));
    }
    setTimeout(() => {
      setaddtoCart(true)
    }, 1000)
    setCart_to_menu();
  }
  const fetchData = async () => {
    const getProducts = await axios.post("/api/v1/product/getProduct", { product_id: slug });
    setProduct(getProducts.data.results);
    setIsFetching(false);
  };

  const purchaseFunc = () => {
    addtocart(product);
    router.push('/cart');
  };

  const addtoCartFunc = () => {
    addtocart(product)
  };

  const routing = (path) => {
    path = "/" + path
    router.push(path)
  };
  useEffect(() => {
    if (slug) {
      fetchData()
    }
    setCart_to_menu()
    setValue(slug)
  }, [slug])
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Browse Bella10's wide range of sports products - Online and Offline Sport Shop" />
        <title>{`${slug} | Bella10 Sport Shop`}</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Add any additional CSS or JavaScript links here */}
      </Head>
      <Menubar cartNum={cartNum} />
      {isFetching ?
        <Loading /> :
        <>
          <div className='bg-slate-100 min-h-screen w-full'>
            <div className='flex pt-5 ml-60 max-sm:ml-6 text-sm text-gray-600'>
              <span className='cursor-pointer hover:text-red-500 brightness-105 font-medium' onClick={() => { routing("") }}>Home </span>
              {query.map((el, index) => (
                <div key={index} className='font-medium text-center px-0.5'>{index == query.length - 1 ?
                  <span className='hover:text-red-500 brightness-105 cursor-pointer' onClick={() => { routing("shop/" + slug) }}>{slug}</span> :
                  <>
                    <span className='hover:text-red-500 brightness-105 cursor-pointer' onClick={() => { routing(el) }}>{el}</span><span className='text-sm text-slate-400'>{" >"}</span>
                  </>
                }
                </div>
              ))}
            </div>
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
                  <div className='text-xl w-full overflow-hidden text-start my-4 text-pretty'>{product.name}</div>
                  <div className='flex items-center font-bold text-xl'><span className='text-3xl mr-2.5 text-red-500 brightness-105'>{product.percentage}% off</span></div>
                  {product.stock <= 0 ?
                    <div className="w-full flex-none text-sm font-medium text-slate-700 mb-2">
                      Out of stock
                    </div>
                    :
                    <div className="w-full flex-none text-sm font-medium text-slate-700 mb-2">
                      In stock [{product.stock}]
                    </div>}
                  <div>
                    <div className='text-blue-600'>Special price</div>
                    <div className='font-bold text-3xl'>₹{product.price_after_discount} <span className='font-normal text-base line-through text-slate-400'>₹{product.price}</span></div>
                  </div>
                  <div className='mt-2 font-medium'>
                    <div className='text-lg'>Offers :</div>
                    {product.offer.map((el, index) => (
                      <div key={index} className='ml-3 text-sm text-red-500 brightness-105'>
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
                {product.stock <= 0 ? <div className={`flex justify-center items-center ${Style.outofStock}`}>
                  <a className='opacity-60'>Out of stock</a>
                </div>
                  :
                  <div className={`flex justify-center items-center ${Style.loginArea}`}>
                    <a onClick={purchaseFunc}>Buy</a>
                    {addtoCart ? <a onClick={addtoCartFunc}>Add to cart</a>
                      :
                      <a>Adding...</a>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Slug