<template>
    <div class="container-fluid-header">
        <div class="header">
            <div class="header-body">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <div class="avatar avatar-md">
                            <img src="../assets/img/primadent_thin_R.png" alt="Logo" class="avatar-img">
                        </div>
                    </div>
                    <div class="col-auto ml-n3 ml-md-n2">
                        <h2 class="header-title">
                            Smart PRM
                        </h2>
                    </div>
                    <div class="avatar-logo avatar-md mx-auto d-block">
                       <img src="../assets/img/emazing_logo.png" alt="Emazing Logo" class="avatar-img" >
                    </div>
                    <div class="col-12 col-md-auto mt-3 mt-md-0 row align-items-center">
                        <div class="avatar-group">
                            <div class="avatar avatar-xs">
                                <img src="../assets/img/bell.png" alt="Obvestila" class="avatar-img">
                            </div>
                            <div class="avatar avatar-xs">
                                <img src="../assets/img/settings.png" alt="Nastavitve" class="avatar-img ">
                            </div>
                        </div>
                        <div>
                            <h3 class="header-title navbar-text" id="userName">Dr. Ime Priimek</h3>
                        </div>
                        <div class="btn btn-md btn-rounded-circle" @click="showProfile = true" v-bind:class="{'show-profile' : showProfile}">
                            <img src="../assets/img/user1.png" alt="Uporabnik " class="avatar-img">
                                <div class="modal-overlay" v-if="showProfile">
                                    <div class="modal-header">
                                        <p>KLINIKA PRIMADENT d.o.o.</p>
                                        <span><a href="#">Izpisi se</a></span>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <img src="../assets/img/user1.png" alt="Uporabnik " class="avatar-lg modal-img">
                                        </div>
                                        <div class="modal-user-info">
                                            <p><strong>Dr. Ime Priimek</strong></p> <br />
                                            <p>ime.priimek@gmail.com</p> <br />
                                            <a href="#">Oglej si racun</a>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                showProfile: false
            }
        },
        methods: {
            closeProfileModal() {
                this.showProfile = false;
            }
        }
    }
</script>

<style scoped>
.modal-overlay {
    background-color: #FFF;
    position: absolute;
    top: 3.55rem;
    right: -0.345rem;
    height: 150px;
    width: 300px;
    text-decoration: none;
    border: 1px solid #E3EBF6;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    z-index: 1;
}

.modal-header {
    position: relative;
    padding: 0.875rem 1rem 0.5rem 0.5rem !important;
    width: 100%;
    height: 3rem;
    text-align: center;
}

.modal-body {
    padding: 0 !important;
    position: absolute !important;
    justify-content: center;
    width: 100%;
    height: calc(100% - 3rem);
}

.modal-img {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
}

.modal-user-info {
    position: relative;
    display: inline-block;
    line-height: 0.33rem;
    top: 1.25rem;
    left: 1.5rem;
}

.show-profile {
    background-color: #3a8698;
    border-radius: 0 !important;
    transition: none !important;
}
</style>