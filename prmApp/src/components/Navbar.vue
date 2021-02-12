<template>
    <!--Sidebar Top-->
    <div class="container-fluid-navbar navbar-margin-top">
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
         <ul class="nav flex-column">
            <a v-bind:class="[linkClass, (currentPage.menu === 'Domov') ? selectedLinkClass : '']" href="#" @click="setActive('Domov', 'Domov', true)"><b-icon icon="house"/>Domov</a>
            <a v-bind:class="[linkClass, (currentPage.menu === 'Koledar') ? selectedLinkClass : '']" href="#" @click="setActive('Koledar', 'Koledar', true)"><b-icon icon="calendar-date"/>Koledar</a>           
            <a v-bind:class="[linkClass, (currentPage.menu === 'Pacienti') ? selectedLinkClass : '']" href="#" @click="setActive('Pacienti', 'Pacienti', true)"><b-icon icon="people"/>Pacienti</a>
            <a v-bind:class="[linkClass, (currentPage.menu === 'Dokumenti') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Racuni', true)"><b-icon icon="journals"/>Dokumenti</a>
            <div v-if="currentPage.menu === 'Dokumenti' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Racuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Racuni', false)"><b-icon icon="journal-check"/>Računi</a>
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Predracuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Predracuni', false)"><b-icon icon="journal-text"/>Predračuni</a>
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'AvansniRacuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'AvansniRacuni', false)"><b-icon icon="journal-plus"/>Avansni računi</a>
            </div>
            <a v-bind:class="[linkClass, (currentPage.menu === 'Naloge') ? selectedLinkClass : '']" href="#" @click="setActive('Naloge', 'Naloge', true)"><b-icon icon="map"/>Naloge</a>
            <a v-bind:class="[linkClass, (currentPage.menu === 'Statistika') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'StatistikaKlinike', true)"><b-icon icon="bar-chart"/>Statistika</a>
            <div v-if="currentPage.menu === 'Statistika' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'StatistikaKlinike') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'StatistikaKlinike', false)"><b-icon icon="building"/>Statistika klinike</a>
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'OsebnaStatistika') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'OsebnaStatistika', false)"><b-icon icon="person"/>Osebna statistika</a>
            </div>
            <a v-bind:class="[linkClass, (currentPage.menu === 'PorocilaInObracuni') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunEmazing', true)"><b-icon icon="file-spreadsheet"/>Poročila in obračuni</a>
            <div v-if="currentPage.menu === 'PorocilaInObracuni' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'ObracunEmazing') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunEmazing', false)"><b-icon icon="check-all"/>Obračun - Emazing</a>
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'ObracunDoktor') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunDoktor', false)"><b-icon icon="person-check"/>Obračun - doktor</a>
            </div>
            <a v-bind:class="[linkClass, (currentPage.menu === 'Nastavitve') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'StoritveInIzdelki', true)"><b-icon icon="gear"/>Nastavitve</a>
            <div v-if="currentPage.menu === 'Nastavitve' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'StoritveInIzdelki') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'StoritveInIzdelki', false)"><b-icon icon="tags"/>Storitve in izdelki</a>
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Uporabniki') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'Uporabniki', false)"><b-icon icon="person-badge"/>Uporabniki</a>
            </div>            
        </ul>
    </nav> 
    </div>   
</template>

<style>
.b-icon {
    margin-right: 10px;
}
</style>

<script>

export default {
    name: 'Navbar',
    props: ['navbar'],
    data: function () {
        return {
            currentPage: { menu: 'Domov', submenu: 'Domov', opened: true},
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
        }
    }
}
</script>