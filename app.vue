<template lang="">
  <div>
    <button class="button" @click="signIn" v-if="!firebaseUser">Sign in</button>
    <button class="button" @click="signOut" v-if="firebaseUser">Sign out</button>
    <div  v-if="firebaseUser">
    <client-only>
      <pre>{{ firebaseUser }}</pre>
    </client-only>
    </div>
    <div v-else>User signed out</div>
  </div>
</template>
<script setup>
console.log("---App.vue---");
const firebaseUser = useFireBaseUser();

const credentials = ref();

const signIn = async () => {
  const email = "jan.lauber2@gmail.com";
  const password = "password";
  credentials.value = await signInUser(email, password);
};

const signOut = async () => {
  credentials.value = await signOutUser();
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
