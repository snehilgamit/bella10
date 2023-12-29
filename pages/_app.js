import '@/styles/globals.css'
import Menubar from '@/components/menubar'
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const path  = router.pathname
  return <>
    {path=='/shop/[slug]'?null:<Menubar />}
    <Component {...pageProps} />
  </>
}
