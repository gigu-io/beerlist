<template lang="">
  <div>
    <button class="button" @click="signIn">Sign in</button>
    <button class="button" @click="signOut">Sign out</button>
  </div>
</template>
<script setup>
  console.log('---App.vue---');
  const signIn = async () => {
    const email = "jan.lauber2@gmail.com";
    const password = "password";
    const credentials = await signInUser(email, password);
    console.log(credentials);
  };

  const signOut = async () => {
    const result = await signOutUser();
    console.log(result);
  };
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
