import React from 'react'
const offerArr = ["Buy 2 get 5% extra off", "Buy 5 get 1 bat free"]
const offers = () => {
  return (
    <div className='flex m-5 min-h-[80vh] flex-col gap-2'>
      {offerArr.map((el,index) => (
        <div key={index} className='px-5 py-2 max-md:w-full w-[60%] rounded-lg text-lg text-orange-500  bg-black'><span className='text-white'>{index+1})</span> {el}</div>
      ))}
      <div className='text-sm px-2'>Discount will be applied on bella10 offline shop only, not on website.<br/>Discover exclusive savings at our online store with our limited-time offer!<br/>Enjoy a discount on your purchases when you shop with us.<br/>Please note that this special discount is subject to change, so be sure to visit our website regularly to make the most of this fantastic opportunity.<br/>Hurry and explore our products – the perfect deal might be just a click away! *Discount will be applied at checkout.<br/>*Terms and conditions apply.</div>
    </div>
  )
}

export default offers