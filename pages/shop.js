import { useRouter } from 'next/router'
import React from 'react'

const shop = () => {
  const router = useRouter();
  const { category } = router.query
  return (
    <div>{category!=undefined?category:'all'}</div>
  )
}

export default shop