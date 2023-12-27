import { useRouter } from 'next/router'
import React from 'react'

const shop = () => {
  const router = useRouter();
  const { categories } = router.query
  return (
    <div>{categories!=undefined?categories:'all'}</div>
  )
}

export default shop