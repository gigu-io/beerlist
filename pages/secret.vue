<template>
  <div>
    <div>Secret</div>
    <div v-if="firebaseUser">
      <clien-only>
        <pre>{{ firebaseUser }}</pre>
      </clien-only>
    </div>
    <div v-else>
      Not logged in
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const firebaseUser = useFirebaseUser();
</script>

<style></style>