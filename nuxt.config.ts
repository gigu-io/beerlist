import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        // The private keys which are only available within server-side
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        // Keys within public, will be also exposed to the client-side
        public: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        }
    }
});
