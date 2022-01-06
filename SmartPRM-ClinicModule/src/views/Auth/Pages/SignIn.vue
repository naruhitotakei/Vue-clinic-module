<template>
  <div>
    <h1 class="mb-0">Sign in</h1>
    <!-- <p>Enter your email address and password to access admin panel.</p> -->
    <sign-in-form formType="jwt" email="info@emazing.si" password="emazing"></sign-in-form>
  </div>
</template>

<script>
import auth0 from 'auth0-js'
import SignInForm from '../Forms/SignInForm'
import constant from '../../../config/constant'
export default {
  name: 'SignIn',
  components: { SignInForm },
  data: () => ({}),
  mounted() {
    const loggedIn = localStorage.getItem('access_token')
    if (loggedIn !== undefined && loggedIn !== null) {
      this.$router.push({ name: 'mini.dashboard.home-2' })
    }
  },
  methods: {
    loginOAuth0: function () {
      new auth0.WebAuth(constant.auth0Config).authorize()
    },
  },
}
</script>
<style lang="scss">
@media (max-width: 479px) {
[dir=ltr] h1 {
  font-size: 2.052em !important;
}
}
</style>
