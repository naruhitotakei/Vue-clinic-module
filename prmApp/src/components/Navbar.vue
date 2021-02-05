<template>
    <!--Sidebar Top-->
    <div class="container-fluid-navbar navbar-margin-top">
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
         <ul class="nav flex-column">
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'Domov') ? selectedLinkClass : '']" href="#" @click="setActive('Domov', 'Domov', true)">Domov</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'Koledar') ? selectedLinkClass : '']" href="#" @click="setActive('Koledar', 'Koledar', true)">Koledar</a>
            </li>            
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'Pacienti') ? selectedLinkClass : '']" href="#" @click="setActive('Pacienti', 'Pacienti', true)">Pacienti</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'Dokumenti') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Racuni', true)">Dokumenti</a>
            </li>
            <li v-if="currentPage.menu === 'Dokumenti' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Racuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Racuni', false)">Računi</a>
            </li>
            <li v-if="currentPage.menu === 'Dokumenti' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Predracuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'Predracuni', false)">Predračuni</a>
            </li>
            <li v-if="currentPage.menu === 'Dokumenti' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'AvansniRacuni') ? selectedLinkClass : '']" href="#" @click="setActive('Dokumenti', 'AvansniRacuni', false)">Avansni računi</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'Naloge') ? selectedLinkClass : '']" href="#" @click="setActive('Naloge', 'Naloge', true)">Naloge</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'Statistika') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'StatistikaKlinike', true)">Statistika</a>
            </li>
            <li v-if="currentPage.menu === 'Statistika' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'StatistikaKlinike') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'StatistikaKlinike', false)">Statistika klinike</a>
            </li>
            <li v-if="currentPage.menu === 'Statistika' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'OsebnaStatistika') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika', 'OsebnaStatistika', false)">Osebna statistika</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'PorocilaInObracuni') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunEmazing', true)">Poročila in obračuni</a>
            </li>
            <li v-if="currentPage.menu === 'PorocilaInObracuni' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'ObracunEmazing') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunEmazing', false)">Obračun - Emazing</a>
            </li>
            <li v-if="currentPage.menu === 'PorocilaInObracuni' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'ObracunDoktor') ? selectedLinkClass : '']" href="#" @click="setActive('PorocilaInObracuni', 'ObracunDoktor', false)">Obračun - doktor</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage.menu === 'Nastavitve') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'StoritveInIzdelki', true)">Nastavitve</a>
            </li>
            <li v-if="currentPage.menu === 'Nastavitve' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'StoritveInIzdelki') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'StoritveInIzdelki', false)">Storitve in izdelki</a>
            </li>
            <li v-if="currentPage.menu === 'Nastavitve' && this.currentPage.opened" class="nav-item">
                <a class="nav-submenu" v-bind:class="[linkClass, (currentPage.submenu === 'Uporabniki') ? selectedLinkClass : '']" href="#" @click="setActive('Nastavitve', 'Uporabniki', false)">Uporabniki</a>
            </li>            
        </ul>
    </nav> 
    </div>   
</template>

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