import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../context/userContext';
import Layout from '../components/Layout';
import { DashboardContextProvider } from '../context/dashboardContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

  if (typeof window !== 'undefined') {
    window.addEventListener('touchend', _ => {
      window.scrollTo(0, 0)
    });
  }

  return (
    <div>
      <Head>
        <title>BEER LIST</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="images/manifest/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"></meta>
        <meta name="theme-color" content="#fff"></meta>
      </Head>
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
