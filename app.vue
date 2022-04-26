<template lang="">
  <div>
    <button class="button">Click Me</button>
  </div>
</template>
<script setup>
onMounted(async () => {
  const email = "jan.lauber2@gmail.com";
  const password = "password";
  const credentials = await createUser(email, password);
  console.log(credentials);
});
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
