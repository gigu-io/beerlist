import getConfig from "next/config";
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = !(getApps().length) ? initializeApp(firebaseConfig) : getApps()[0];

export const database = getDatabase();

export const auth = getAuth();

export const analytics = isSupported().then(yes => yes ? getAnalytics() : console.log('Analytics not supported'));

export const performance = isSupported().then(yes => yes ? getPerformance() : console.log('Performance is not supported'));

export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LegxwggAAAAAIyZyiIbsm0LuMe-g5G2CayAvSz1'),
  
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
  });

export default firebaseConfig;