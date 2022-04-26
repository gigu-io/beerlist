<template>
  <div>
    <p v-if="firebaseUser">
      <NuxtLink to="/secret">Go to Secret Page</NuxtLink>
    </p>
    <button class="button" @click="signOut" v-if="firebaseUser">
      Sign out
    </button>
    <button class="button" @click="signInWithGithub" v-if="!firebaseUser">
      Sign in with Github
    </button>
    <button class="button" @click="signInWithGoogle" v-if="!firebaseUser">
      Sign in with Google
    </button>
    <div class="container mx-auto bg-gray-300 p-8">
      <h1 class="font-bold text-gray-600 text-lg">Hello, Tailwind 3!</h1>
    </div>
    <div v-if="firebaseUser">
      <client-only>
        <pre
          >{{ firebaseUser }}
    </pre
        >
      </client-only>
    </div>
    <div v-else>User is signed out</div>
  </div>
</template>

<script setup>
const firebaseUser = useFirebaseUser();

const signInWithGithub = async () => {
  firebaseUser.value = await signInUserWithGithub().catch((error) => {
    console.error(error);
  });
};

const signInWithGoogle = async () => {
  firebaseUser.value = await signInUserWithGoogle().catch((error) => {
    console.error(error);
  });
};

const signOut = async () => {
  await signOutUser();
};
</script>

<style>
</style>