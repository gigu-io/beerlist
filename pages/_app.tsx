import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../context/userContext';
import Layout from '../components/Layout';
import { DashboardContextProvider } from '../context/dashboardContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DashboardContextProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </DashboardContextProvider>
  )
}

export default MyApp;
