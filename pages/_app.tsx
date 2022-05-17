import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../context/userContext';
import Layout from '../components/Layout';
import { DashboardContextProvider } from '../context/dashboardContext';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  if (typeof window !== 'undefined') {
    window.addEventListener('touchend', _ => {
      window.scrollTo(0, 0)
    });
  }

  useEffect(() => {
    if("serviceWorker" in navigator && typeof window !== 'undefined') {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  return (
    <div>
      <Head>
        <title>BEER LIST</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="images/manifest/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"></meta>
        <meta name="theme-color" content="#8BD3DD"></meta>
        <meta name="description" content="A Beer List for handling beer betting debts"></meta>
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
