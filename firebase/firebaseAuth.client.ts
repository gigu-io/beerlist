import getConfig from "next/config";
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

console.log(serverRuntimeConfig);

const firebaseConfig = {
    apiKey: serverRuntimeConfig.FIREBASE_API_KEY,
    authDomain: serverRuntimeConfig.FIREBASE_AUTH_DOMAIN,
    databaseURL: serverRuntimeConfig.FIREBASE_DATABASE_URL,
    projectId: serverRuntimeConfig.FIREBASE_PROJECT_ID,
    storageBucket: serverRuntimeConfig.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: serverRuntimeConfig.FIREBASE_MESSAGING_SENDER_ID,
    appId: serverRuntimeConfig.FIREBASE_APP_ID,
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();

export default firebaseConfig;