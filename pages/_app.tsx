import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../context/userContext';
import Layout from '../components/Layout';
import { DashboardContextProvider } from '../context/dashboardContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div
    >
      <DashboardContextProvider>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </DashboardContextProvider>
    </div>
  )
}

export default MyApp;
