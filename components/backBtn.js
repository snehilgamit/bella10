import { useRouter } from 'next/router'
import React from 'react'
const BackBtn = () => {
  const router = useRouter();
  const backFunc = () => {
    // const path = router.pathname.split('/')[router.pathname.split('/').length-2]
      router.back();
  }
  return (
    <div className='text-black border-2 border-black rounded-3xl mt-5 ml-8 w-[60px] py-1 flex justify-center items-center cursor-pointer z-50 hover:bg-black hover:text-white active:bg-black active:opacity-50 active:text-white' onClick={backFunc}>
      back
    </div>
  )
}

export default BackBtn