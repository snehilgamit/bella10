import '@/styles/globals.css'
import Menubar from '@/components/menubar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isLogined,setisLogined]=useState(true);
  const path  = router.pathname
  const session = async () => {
    const getSession = localStorage.getItem('bella10_state');

    if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]'){
        const { token } = JSON.parse(getSession);
        try{
          const req = await axios.post('/api/v1/session', { token });
          if (req.data.status) {
            localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
            setisLogined(false);
          }
          else {
            localStorage.setItem('bella10_state', {});
          }
        }
        catch(err){
          location.reload();
        }
        }
}
  useEffect(()=>{
    session()
  },[router])
  return <>
    {path=='/shop/[slug]'?null:<Menubar isLogined={isLogined}/>}
    <Component {...pageProps} />
  </>
}
