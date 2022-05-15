import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../context/userContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <div className="bg-[url('/images/background/waves.svg')] bg-no-repeat bg-center bg-fixed bg-cover h-full min-h-screen items-stretch">
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  )
}

export default MyApp;
