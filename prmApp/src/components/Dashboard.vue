<template>
    <div>
        <Header :user="user" v-on:logedOut="setUser"/>
        <Login v-if="!user" v-on:logedIn="setUser"/>
        <Navbar v-if="user" v-on:pageSelect="pageChanged" :user="user"/>
        
        <Home v-if="user && currentPage == 'Domov'" />
        <Calendar v-if="user && currentPage == 'Koledar'" />
        <Enquiries v-if="user && currentPage == 'Pacienti'" />
        <Invoices v-if="user && currentPage == 'Racuni'" />
        <Offers v-if="user && currentPage == 'Predracuni'" />
        <AdvInvoices v-if="user && currentPage == 'AvansniRacuni'" />
        <Assignments v-if="user && currentPage == 'Naloge'" />
        <StatisticsClinic v-if="user && currentPage == 'StatistikaKlinike'" />
        <StatisticsPerson v-if="user && currentPage == 'OsebnaStatistika'" />
        <AccountingEmazing v-if="user && currentPage == 'ObracunEmazing'" />
        <AccountingDoctor v-if="user && currentPage == 'ObracunDoktor'" />
        <ServicesProducts v-if="user && currentPage == 'StoritveInIzdelki'" />
        <Users v-if="user && currentPage == 'Uporabniki'" />
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
import Offers from './Offers.vue'
import AdvInvoices from './AdvInvoices.vue'
import Assignments from './Assignments.vue'
import StatisticsClinic from './StatisticsClinic.vue'
import StatisticsPerson from './StatisticsPerson.vue'
import AccountingEmazing from './AccountingEmazing.vue'
import AccountingDoctor from './AccountingDoctor.vue'
import ServicesProducts from './ServicesProducts.vue'
import Users from './Users.vue'

export default {
    name: 'Dashboard',
    components: {
        Header,
        Login,
        Navbar,
        Home,
        Calendar,
        Enquiries,
        Invoices,
        Offers,
        AdvInvoices,
        Assignments,
        StatisticsClinic,
        StatisticsPerson,
        AccountingEmazing,
        AccountingDoctor,
        ServicesProducts,
        Users
        
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