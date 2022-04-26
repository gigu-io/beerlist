<template lang="">
    <div>
      <pre>{{ firebaseUser }}</pre>
        
    </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
});

const firebaseUser = useFirebaseUser();
</script>
<style lang="">
    
</style>