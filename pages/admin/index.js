import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NotAdmin from '@/components/notAdmin';
import Loading from '@/components/loading';
import Contain from '@/components/admin/dashboard.admin';
const index = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true)
  const [isAdmin, setisAdmin] = useState(false)


  const session = async () => {
    const getSession = localStorage.bella10_state;
    if (getSession && getSession != '{}' && getSession != '' && getSession != '[Object, object]') {
      const { token } = JSON.parse(getSession);
      try {
        const req = await axios.post('/api/v1/session', { token });
        if (req.data.status) {
          localStorage.setItem('bella10_state', JSON.stringify({ email: req.data.email, token: req.data.token }));
          setisLoading(false);
          setisAdmin(req.data.isAdmin);
        }
        else {
          setisLoading(false);
          localStorage.setItem('bella10_state', '{}');
          router.push("/")
        }
      }
      catch (err) {
      }
    }
    else {
      router.push("/login")
    }
  }


  useEffect(() => {
    session();
  }, [])

  return (
    <>
      {isLoading ? <Loading />
        :
        <>
          {!isAdmin ? <NotAdmin />
            :
            <Contain/>
          }
        </>
      }
    </>
  )
}

export default index