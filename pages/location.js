import React from 'react'
import Head from 'next/head'

const location = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Find Bella10's physical locations for offline shopping - Online and Offline Sport Shop" />
        <title>Locations | Bella10 Sport Shop</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Add any additional CSS or JavaScript links here */}
      </Head>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3570.4254716629753!2d73.38945596385386!3d21.11072586496715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be07eb6e04ca381%3A0x30a46957fe570cd8!2sAARAM%20GUEST%20HOUSE!5e0!3m2!1sen!2sin!4v1703679599975!5m2!1sen!2sin" width="100%" height="650" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </>
  )
}

export default location