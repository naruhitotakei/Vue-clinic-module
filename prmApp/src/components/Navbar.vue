<template>
    <!--Sidebar Top-->
    <div class="container-fluid navbar-margin-top">
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
         <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="./index.html">Domov</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./pacienti.html">Pacienti</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./koledar.html">Koledar</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./nov_racun.html">Nov račun</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./nova_ponudba.html">Nova ponudba</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./nov_avansni_racun.html">Nov avansni račun</a>
            </li>
        </ul>
    </nav>
    <!--Sidebar Bottom-->
    <nav class="navbar navbar-vertical navbar-expand-md navbar-light">
        <ul class="nav flex-column">
            <li class="nav-item">
                <p class="nav-link nav-klinika">Klinika</p>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./storitve.html">Storitve</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./dodatne_storitve.html">Dodatne storitve</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./izdelki.html">Izdelki</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./kirurgi.html">Kirurgi</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./doktorji.html">Doktorji</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./sestre.html">Sestre</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./statistika.html">Statistika</a>
            </li>
        </ul>
    </nav> 
    </div>   
</template>

<script>

    export default {
        name: 'NavbarTop',
        props: ['navbarTop']
     }
</script>