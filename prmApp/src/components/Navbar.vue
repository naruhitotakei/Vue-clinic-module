<template>
    <!--Sidebar Top-->
    <div class="container-fluid-navbar navbar-margin-top">
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
         <ul class="nav flex-column">
            <a v-if="permissionContains('Home')" v-bind:class="[linkClass, (currentPage.menu === 'Domov') ? selectedLinkClass : '']" href="#" @click="setActive('Domov', 'Domov', true)"><b-icon icon="house"/>Domov</a>
            <a v-if="permissionContains('Calendar')" v-bind:class="[linkClass, (currentPage.menu === 'Koledar') ? selectedLinkClass : '']" href="#" @click="setActive('Koledar', 'Koledar', true)"><b-icon icon="calendar-date"/>Koledar</a>           
            <a v-if="permissionContains('Enquiries')" v-bind:class="[linkClass, (currentPage.menu === 'Pacienti') ? selectedLinkClass : '']" href="#" @click="setActive('Pacienti', 'Pacienti', true)"><b-icon icon="people"/>Pacienti</a>
            <a v-if="permissionContainsOneOf(documentsSubmenus)" v-bind:class="[linkClass, (currentPage.menu === 'Dokumenti') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Racuni', true)"><b-icon icon="journals"/>Dokumenti</a>
            <div v-if="currentPage.menu === 'Dokumenti' && this.currentPage.opened" class="nav-item">
                <a v-if="permissionContains('Invoices')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Racuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Racuni', false)"><b-icon icon="journal-check"/>Računi</a>
                <a v-if="permissionContains('Offers')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Predracuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Predracuni', false)"><b-icon icon="journal-text"/>Predračuni</a>
                <a v-if="permissionContains('AdvInvoices')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'AvansniRacuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'AvansniRacuni', false)"><b-icon icon="journal-plus"/>Avansni računi</a>
            </div>
            <a v-if="permissionContains('Assignments')" v-bind:class="[linkClass, (currentPage.menu === 'Naloge') ? selectedLinkClass : '']" href="#" @click="setActive('Naloge', 'Naloge', true)"><b-icon icon="map"/>Naloge</a>
            <a v-if="permissionContainsOneOf(statisticssSubmenus)" v-bind:class="[linkClass, (currentPage.menu === 'Statistika') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'StatistikaKlinike', true)"><b-icon icon="bar-chart"/>Statistika</a>
            <div v-if="currentPage.menu === 'Statistika' && this.currentPage.opened" class="nav-item">
                <a v-if="permissionContains('StatisticsClinic')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'StatistikaKlinike') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'StatistikaKlinike', false)"><b-icon icon="building"/>Statistika klinike</a>
                <a v-if="permissionContains('StatisticsPerson')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'OsebnaStatistika') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'OsebnaStatistika', false)"><b-icon icon="person"/>Osebna statistika</a>
            </div>
            <a v-if="permissionContainsOneOf(reportsSubmenus)" v-bind:class="[linkClass, (currentPage.menu === 'PorocilaInObracuni') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunEmazing', true)"><b-icon icon="file-spreadsheet"/>Poročila in obračuni</a>
            <div v-if="currentPage.menu === 'PorocilaInObracuni' && this.currentPage.opened" class="nav-item">
                <a v-if="permissionContains('AccountingEmazing')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'ObracunEmazing') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunEmazing', false)"><b-icon icon="check-all"/>Obračun - Emazing</a>
                <a v-if="permissionContains('AccountingDoctor')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'ObracunDoktor') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunDoktor', false)"><b-icon icon="person-check"/>Obračun - doktor</a>
            </div>
            <a v-if="permissionContainsOneOf(settingsSubmenus)" v-bind:class="[linkClass, (currentPage.menu === 'Nastavitve') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'StoritveInIzdelki', true)"><b-icon icon="gear"/>Nastavitve</a>
            <div v-if="currentPage.menu === 'Nastavitve' && this.currentPage.opened" class="nav-item">
                <a v-if="permissionContains('ServicesProducts')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'StoritveInIzdelki') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'StoritveInIzdelki', false)"><b-icon icon="tags"/>Storitve in izdelki</a>
                <a v-if="permissionContains('Users')" class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Uporabniki') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'Uporabniki', false)"><b-icon icon="person-badge"/>Uporabniki</a>
            </div>            
        </ul>
    </nav> 
    </div>   
</template>

<style scoped>
.b-icon {
    margin-right: 10px;
}
</style>

<script>

export default {
    name: 'Navbar',
    props: {
        user: Object
    },
    data: function () {
        return {
            currentPage: { menu: 'Domov', submenu: 'Domov', opened: true},
            documentsSubmenus: ['Invoices','Offers','AdvInvoices'],
            statisticssSubmenus: ['StatisticsClinic','StatisticsPerson'],
            reportsSubmenus: ['AccountingEmazing','AccountingDoctor'],
            settingsSubmenus: ['ServicesProducts','Users'],            
            linkClass: 'nav-link',
            selectedLinkClass: 'nav-selected'
        }
    },
    methods: {
        setActive: function(menu, submenu, isMain) {
            if (isMain &&  this.currentPage.menu === menu) { // second click on the same main menu
                 this.currentPage.opened = !this.currentPage.opened
                 return
            }
            this.currentPage.opened = true
            this.currentPage.menu = menu
            this.currentPage.submenu = submenu
            this.$emit("pageSelect", submenu)
            //alert(this.currentPage.menu+"/"+this.currentPage.submenu+"/"+this.currentPage.opened)
        },
        permissionContains: function(resource_name) {
            if (!this.user) return false
            for (var i = 0; i < this.user.permissions.length; i++) {
                if(this.user.permissions[i].resource_name == resource_name) return true
            }
            return false
        },
        permissionContainsOneOf: function(resource_names) {
            if (!this.user) return false
            if (!resource_names) return false
            for (var i = 0; i < this.user.permissions.length; i++) {
            console.log(i + ":")
                for (var j = 0; j < resource_names.length; j++) {
                console.log(i + " " + j)
                    if(this.user.permissions[i].resource_name == resource_names[j]) return true
                }
            }
            return false
        },
    }
}
</script>