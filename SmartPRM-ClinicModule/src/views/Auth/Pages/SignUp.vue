<template>
  <div>
    <h1 class="mb-0">Sign Up</h1>
    <p>Enter your email address and password to access admin panel.</p>
    <sign-up-form formType="jwt"></sign-up-form>
  </div>
</template>
<script>
import SignUpForm from '../Forms/SignUpForm'
import auth0 from 'auth0-js'
import constant from '../../../config/constant'
export default {
  name: 'SignUp',
  components: { SignUpForm },
  data: () => ({}),
  methods: {
    loginOAuth0 () {
      new auth0.WebAuth(constant.auth0Config).authorize()
    }
  }
}
</script>
