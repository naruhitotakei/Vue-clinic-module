<template>
    <div>
        <Header />
        <Login v-if="!user" v-on:logedIn="setUser"/>
        <Navbar v-if="user" v-on:pageSelect="pageChanged"/>
        
        <Home v-if="user && currentPage == 'Domov'" />
        <Calendar v-if="user && currentPage == 'Koledar'" />
        <Enquiries v-if="user && currentPage == 'Pacienti'" />
        <Invoices v-if="user && currentPage == 'Racuni'" />
    </div>
</template>

<script>
import Header from './Header.vue'
import Login from './Login.vue'
import Navbar from './Navbar.vue'

import Home from './Home.vue'
import Calendar from './Calendar.vue'
import Enquiries from './Enquiries.vue'
import Invoices from './Invoices.vue'

export default {
    name: 'Dashboard',
    components: {
        Header,
        Login,
        Navbar,
        Home,
        Calendar,
        Enquiries,
        Invoices
    },
    data: function () {
        return {
            currentPage: 'Domov',
            user: null
        }
    },
    methods: {
        pageChanged (screen) {
            this.currentPage = screen
        },
        setUser (logedInUser) {
            this.user = logedInUser
        }
    }
}
</script>