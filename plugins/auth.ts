export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth', () => {
      const { $auth } = useNuxtApp()

      if (!$auth) {
          return navigateTo('/');
      }

      // console.log(firebaseUser.value);
  })
})