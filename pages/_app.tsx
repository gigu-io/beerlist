import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useUserContext } from '../context/userContext';
import Loading from '../components/Loading';
import { UserContextProvider } from '../context/userContext';
import Auth from '../components/Auth';

function MyApp({ Component, pageProps }: AppProps) {
  // const { user, loading, error } = useUserContext();

  return (
    <UserContextProvider>
      <div className='App'>
        {/* {error && <div className='error'>{error}</div>}
        {loading ? 
          <Loading /> : 
          user ?
            <Component {...pageProps} /> :
            <h1>lol</h1> :
            <Auth />
        } */}
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  )
}

export default MyApp;
