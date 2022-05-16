import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../context/userContext';
import Layout from '../components/Layout';
import { DashboardContextProvider } from '../context/dashboardContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <DashboardContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DashboardContextProvider>
    </UserContextProvider>
  )
}

export default MyApp;
