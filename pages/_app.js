import '@/styles/globals.css'
import Menubar from '@/components/menubar'
export default function App({ Component, pageProps }) {
  return<>
  <Menubar/>
  <Component {...pageProps} />
  </>
}
