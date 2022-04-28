import getConfig from "next/config";
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();

export default firebaseConfig;