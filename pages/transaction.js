import React, { useState } from 'react'
import axios from 'axios'
const transaction = () => {
  const [isLogined, setIsLogined] = useState(false);
  const session = async () => {
    const getSession = localStorage.getItem('bella10_state');
    if (getSession && getSession != '{}' && getSession != '') {
        const { token } = JSON.parse(getSession);
        const req = await axios.post('/api/v1/session', { token });
        if (req.data.status) {
            localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
            setIsLogined(true);
        }
        else {
            setIsLogined(false);
            localStorage.setItem('bella10_state', '{}');
        }
    }
    else {
        router.push('/login');
    }
}
useState(()=>{
  session()
},[])
  return (
    <>
      {isLogined ? <div className='flex justify-center'>
        <div className='mt-5 text-3xl font-semibold underline'>Transactions</div>
      </div> : <>Not logined</>}
    </>
  )
}

export default transaction