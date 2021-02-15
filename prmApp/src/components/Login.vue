<template>
    <div class="container-login">
        <div class="container-fluid-logo">
            <h2>Emazing PRM</h2>
        </div>
        <div class="container-login-form">
            <form>
                <h3>Prijavite se v svoj racun</h3> <br />
                <input type="email" v-model="loginEmail" placeholder="E-postni naslov" /> <br />
                <input type="password" v-model="loginPassword" placeholder="Geslo" /> <br />
                <button type="submit" @click="loginUser()">Prijava</button> <br />
                <a href="#">Ste pozabili vase geslo?</a>
            </form>
        </div>
        <div class="container-login-footer">
            <h4>Copyright &#169; 2020 Emazing. Vse pravice pridrzane</h4>
        </div>
    </div>
</template>

<script>
import { login } from '../services/UserService'
import { sso } from '../services/UserService'

export default {
    name: 'Login',
    data: function () {
        return {
            loginEmail: null,
            loginPassword: null,
            user: null
        }
    },
    
    methods: {
        loginUser: function() {
            login(this.loginEmail, this.loginPassword).then(response => {
                if (typeof response === 'string' && response.startsWith("NOK")) {
                    alert(response)
                } else {
                    this.user = response
                    this.$emit("logedIn", this.user)
                }
            })
        },
        sso: function() {
            sso().then(response => {
                if (typeof response != 'string') {
                    this.user = response
                    this.$emit("logedIn", this.user)
                }
            })
        }
    },
    
    mounted () {
        this.sso();
    }
}
</script>

<style scoped>

    .container-login {
        width: 100%;
        padding-right: 0;
        padding-left: 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        background-color: #333939;
    }

    .container-fluid-logo {
        width: 100%;
        margin: 0 auto;
        position: relative;
        color: white;
        line-height: 0rem;
        text-align: center;
        top: 3rem;
    }

    .container-login-form {
        position: relative;
        background-color: #FFF;
        height: 375px;
        top: 5rem;
        border-radius: 5%;
        text-align: center;
        padding: 2rem 1rem 2rem 1rem;
        width: 500px;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .container-login-footer {
        position: relative;
        color: #FFF;
        height: 400px;
        top: 70px;
        border-radius: 10%;
        text-align: center;
        padding: 2rem 1rem;
    }

    input {
        height: 50px;
        width: 300px;
        margin-bottom: 0.5rem;
        border-radius: 1rem;
        background-color: #ededed;
        font-weight: 600;
    }

    button {
        margin: 10px 0 50px 0;
        display: inline-block;
        width: 300px;
        height: 50px;
        background-color: #13bafb;
        color: white;
        font-weight: 700;
        letter-spacing: .04em;
        border-radius: 2rem;
        border: none;
    }

    a {
        color: black;
        font-size: 18px;
    }

    h3 {
        padding-bottom: 20px;
    }
</style>