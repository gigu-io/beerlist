import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useUserContext } from '../context/userContext';
import Loading from '../components/Loading';
import { UserContextProvider } from '../context/userContext';
import Auth from '../components/Auth';
import { useContext } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <div className='bg-highlight h-screen'>
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  )
}

export default MyApp;
