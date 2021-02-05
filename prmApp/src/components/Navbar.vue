<template>
    <!--Sidebar Top-->
    <div class="container-fluid-navbar navbar-margin-top">
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
         <ul class="nav flex-column">
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Domov') ? selectedLinkClass : '']" href="#" @click="setActive('Domov')">Domov</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Pacienti') ? selectedLinkClass : '']" href="#" @click="setActive('Pacienti')">Pacienti</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Koledar') ? selectedLinkClass : '']" href="#" @click="setActive('Koledar')">Koledar</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'NovRacun') ? selectedLinkClass : '']" href="#" @click="setActive('NovRacun')">Nov račun</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'NovaPonudba') ? selectedLinkClass : '']" href="#" @click="setActive('NovaPonudba')">Nova ponudba</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'NovAvans') ? selectedLinkClass : '']" href="#" @click="setActive('NovAvans')">Nov avansni račun</a>
            </li>
        </ul>
    </nav>
    <!--Sidebar Bottom-->
    <nav class="navbar navbar-vertical navbar-expand-md navbar-light">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Klinika') ? selectedLinkClass : '']" href="#" @click="setActive('Klinika')">Klinika</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Storitve') ? selectedLinkClass : '']" href="#" @click="setActive('Storitve')">Storitve</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'DodatneStoritve') ? selectedLinkClass : '']" href="#" @click="setActive('DodatneStoritve')">Dodatne storitve</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Izdelki') ? selectedLinkClass : '']" href="#" @click="setActive('Izdelki')">Izdelki</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Kirurgi') ? selectedLinkClass : '']" href="#" @click="setActive('Kirurgi')">Kirurgi</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Doktorji') ? selectedLinkClass : '']" href="#" @click="setActive('Doktorji')">Doktorji</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Sestre') ? selectedLinkClass : '']" href="#" @click="setActive('Sestre')">Sestre</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="[linkClass, (currentPage === 'Statistika') ? selectedLinkClass : '']" href="#" @click="setActive('Statistika')">Statistika</a>
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
            currentPage: 'Domov',
            linkClass: 'nav-link',
            selectedLinkClass: 'nav-selected'
        }
    },
    methods: {
        setActive: function(screen) {
            this.currentPage = screen
            this.$emit("pageSelect", screen)
        }
    }
}
</script>