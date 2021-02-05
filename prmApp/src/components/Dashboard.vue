<template>
    <div>
        <Header />
        <Navbar v-on:pageSelect="pageChanged"/>
        
        <Home v-if="currentPage == 'Domov'" />
        <Calendar v-if="currentPage == 'Koledar'" />
        <Enquiries v-if="currentPage == 'Pacienti'" />
        <Invoices v-if="currentPage == 'Racuni'" />
    </div>
</template>

<script>
import Header from './Header.vue'
import Navbar from './Navbar.vue'

import Home from './Home.vue'
import Calendar from './Calendar.vue'
import Enquiries from './Enquiries.vue'
import Invoices from './Invoices.vue'

export default {
    name: 'Dashboard',
    components: {
        Header,
        Navbar,
        Home,
        Calendar,
        Enquiries,
        Invoices
    },
    data: function () {
        return {
            currentPage: 'Domov'
        }
    },
    methods: {
        pageChanged (screen) {
            this.currentPage = screen
        }
    }
}
</script>