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
                <button type="submit" @click="login()">Prijava</button> <br />
                <hr />
                <a href="#">Ste pozabili vase geslo?</a>
            </form>
        </div>
        <div class="container-login-footer">
            <h4>Copyright © 2020 Emazing. Vse pravice pridrzane</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data: function () {
            return {
                loginEmail: null,
                loginPassword: null,
                user: {name: 'Janez'}
            }
        },
        methods: {
            login: function() {
                this.$emit("logedIn", this.user)
            }
        }
    }
</script>

<style scoped>
    body {
        background-color: #333939;
    }

    .container-login {
        width: 100%;
        padding-right: 0;
        padding-left: 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 500px;
        top: 3rem;
        position: relative;
    }

    .container-fluid-logo {
        width: 50%;
        margin: 0 auto;
        position: relative;
        color: white;
        line-height: 0rem;
        text-align: center;
    }

    .container-login-form {
        position: relative;
        background-color: #FFF;
        height: 400px;
        top: 20px;
        border-radius: 10%;
        text-align: center;
        padding: 2rem 1rem;
    }

    .container-login-footer {
        position: relative;
        color: #FFF;
        height: 400px;
        top: 20px;
        border-radius: 10%;
        text-align: center;
        padding: 2rem 1rem;
    }

    input {
        height: 50px;
        width: 300px;
        margin-bottom: 0.5rem;
    }
</style>