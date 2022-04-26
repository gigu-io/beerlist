<template>
  <div>
    <p v-if="firebaseUser"><NuxtLink to="/secret">Go to Secret Page</NuxtLink></p>
    <button class="button" @click="signOut" v-if="firebaseUser">Sign out</button>
    <button class="button" @click="signIn" v-else>Sign in</button>
    <button class="button" @click="signInWithGithub" v-if="!firebaseUser">Sign in with Github</button>
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

const signIn = async () => {
  const email = "jan.lauber2@gmail.com";
  const password = "password";
  firebaseUser.value = await signInUser(email, password).catch(error => {
    console.error(error);
  });
};

const signInWithGithub = async () => {
  firebaseUser.value = await signInUserWithGithub().then(user => {
    console.log(user);
  }).catch(error => {
    console.error(error);
  });
};

const signOut = async () => {
  await signOutUser();
};

</script>

<style>
</style>