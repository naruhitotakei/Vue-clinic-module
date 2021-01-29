<template>
    <div class="container-fluid">
        <div class="header">
            <div class="header-body">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <div class="avatar avatar-md">
                            <img src="../assets/img/primadent_thin_R.png" alt="Logo" class="avatar-img">
                        </div>
                    </div>
                    <div class="col ml-n3 ml-md-n2">
                        <h2 class="header-title">
                            Emazing PRM
                        </h2>
                    </div>
                    <div class="col-12 col-md-auto mt-3 mt-md-0 row align-items-center">

                        <div class="avatar-group">
                            <div class="avatar avatar-xs">
                                <img src="../assets/img/Icon ionic-md-notifications.png" alt="Obvestila" class="avatar-img">
                            </div>
                            <div class="avatar avatar-xs">
                                <img src="../assets/img/settings.svg" alt="Nastavitve" class="avatar-img ">
                            </div>
                        </div>
                        <div>
                            <h3 class="header-title navbar-text" id="userName">Dr. Ime Priimek</h3>
                        </div>
                        <div class="btn btn-lg btn-rounded-circle" data-toggle="modal">
                            <img src="../assets/img/user.svg" alt="Uporabnik " class="avatar-img">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>