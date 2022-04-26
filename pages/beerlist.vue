<template>
  <div>
    <div>BEER LIST</div>
    <div v-if="firebaseUser">
      <pre>{{ firebaseUser }}</pre>
      <button
        @click="signOut"
        type="button"
        class="
          inline-flex
          items-center
          px-2.5
          py-1.5
          border border-transparent
          text-xs
          font-medium
          rounded
          shadow-sm
          text-white
          bg-yellow-400
          hover:bg-yellow-500
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        Sign out
      </button>
    </div>
    <div v-else>Not signed in</div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const signOut = async () => {
  await signOutUser();
};

const firebaseUser = useFirebaseUser();
</script>

<style></style>