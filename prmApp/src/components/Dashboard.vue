<template>
    <div>
        <Header />
        <Navbar v-on:pageSelect="pageChanged"/>
        
        <Home v-if="currentPage == 'Domov'" />
        <Enquiries v-if="currentPage == 'Pacienti'" />
        <Calendar v-if="currentPage == 'Koledar'" />
    </div>
</template>

<script>
import Header from './Header.vue'
import Navbar from './Navbar.vue'

import Home from './Home.vue'
import Enquiries from './Enquiries.vue'
import Calendar from './Calendar.vue'

export default {
    name: 'Dashboard',
    components: {
        Header,
        Navbar,
        Home,
        Enquiries,
        Calendar
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