import { useRouter } from 'next/router'
import React from 'react'
const BackBtn = () => {
  const router = useRouter();
  const backFunc = () => {
    router.back()
  }
  return (
    <div className='bg-black text-white rounded-3xl mt-5 ml-8 w-[60px] py-1 flex justify-center items-center  cursor-pointer z-50' onClick={backFunc}>back</div>
  )
}

export default BackBtn