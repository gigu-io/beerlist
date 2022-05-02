import { User } from 'firebase/auth';
import type { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Auth from '../components/Auth';
import Dashboard from '../components/overview/Dashboard';
import Loading from '../components/Loading';
import { useUserContext } from '../context/userContext';

const Home = () => {
  const { user, loading, error }: any = useUserContext();

  return (
    <div>
      {
        loading ?
          <Loading/> :
          user && !error ?
            <Dashboard /> :
            <Auth />
      }
    </div>
  )
}

export default Home