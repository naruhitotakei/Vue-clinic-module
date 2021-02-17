<template>
    <div class="add-patient-mask">
        <div class="add-patient-modal">
            <div class="add-patient-header">
                <h3>Dodaj pacienta<button type="button" class="btn btn-lg float-right x">X</button></h3>
            </div>
            <div class="add-patient-content">
                <form name="addPatient" method="post" action="">
                    <div class="row justify-content-around">
                        <input type="text" placeholder="Naziv" class="input-1" />
                        <input type="text" name="name" placeholder="Ime" class="input-1" />
                        <input type="text" name="last_name" placeholder="Priimek" class="input-1" />
                    </div>
                    <div class="row justify-content-around">
                        <input type="date" name="date_of_birth" placeholder="Datum rojstva" class="input-2" />
                        <div class="gender">
                            <label>Spol:</label>
                            <input type="radio" name="gender" value="male" />Moski
                            <input type="radio" name="gender" value="female" />Zenski
                            <input type="radio" name="gender" value="indefinite" />Neopredeljen
                        </div>
                    </div>
                    <div class="row">
                        <input type="text" name="address" placeholder="Stalen Naslov" class="input-1" />
                        <input type="text" name="zip_code" placeholder="Postna stevilka" class="input-1-2" />
                        <input type="text" name="city" placeholder="Kraj" class="input-1-2" />
                    </div>
                    <div class="row">
                        <b-icon icon="geo-alt" />
                        <input type="text" name="country" placeholder="Drzava" class="input-1" />
                        <input type="text" name="citizenship" placeholder="Drzavljanstvo" class="input-1-2" />
                        <input type="text" name="subregion" placeholder="Regija" class="input-1-2" />
                    </div>
                    <div class="row">
                        <input type="text" name="insurance_number" placeholder="Stevilka ZZ" class="input-2" />
                        <input type="text" name="insurance_company" placeholder="Zavarovalnica" class="input-2" />
                    </div>
                    <div class="row">
                        <b-icon icon="flag-fill" />
                        <select>
                            <option value="slovenia">SI +386</option>
                            <option value="austria">AT +43</option>
                            <option value="italy">IT +39</option>
                        </select>
                        <input type="text" name="mobile" placeholder="Mobilna stevilka" class="input-2-2" />
                        <input type="text" name="phone" placeholder="Telefon" class="input-2-4" />
                    </div>
                    <div class="row">
                        <b-icon icon="envelope-fill" />
                        <input type="email" name="email" placeholder="E-postni naslov" class="input-2-3" />
                        <input type="text" name="insurance_company" placeholder="Davcna stevilka" class="input-2-4" />
                    </div>
                    <div class="row justify-content-around buttons">
                        <button type="submit" class="btn btn-lg btn-wide btn-info">Potrdi</button>
                        <button type="button" class="btn btn-lg btn-wide btn-light" @click="addPatient = false">Preklici</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AddPatient',
        data() {
            return {
                addPatient: true
            }
        }, 
    }
</script>

<style scoped>
    .add-patient-mask {
        background-color: rgba(150,150,150,0.85);
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .add-patient-modal {
        z-index: 3;
        width: 1000px;
        height: 650px;
        background-color: white;
    }

    .add-patient-header {
        text-align: center;
        background-color: #f2f2f2;
        height: 2.5rem;
        vertical-align: middle;
        margin: 0 auto;
        padding: 0.6rem 0;
    }

    .add-patient-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .x {
        padding: 0 0.75rem;
        border: none;
        vertical-align: middle;
        line-height: 1;
    }

    h3 {
        margin:0 !important;
    }

    form {
        width: 100%;
    }

    .input-1 {
        background-color: #ededed;
        border: solid 1px #adadad;
        height: 2.5rem;
        width: 17.5rem;
    }

    .input-1-2 {
        background-color: #ededed;
        border: solid 1px #adadad;
        height: 2.5rem;
        width: 17.5rem;
        margin-left: 2.25rem;
    }

    .input-2 {
        background-color: #ededed;
        border: solid 1px #adadad;
        height: 2.5rem;
        width: 27.5rem;
        margin-left: 1.975rem;
    }

    .input-2-2 {
        background-color: #ededed;
        border: solid 1px #adadad;
        height: 2.5rem;
        width: 22.75rem;
        margin-left: 0;
    }

    .input-2-3 {
        background-color: #ededed;
        border: solid 1px #adadad;
        height: 2.5rem;
        width: 27.5rem;
        left: 0;
    }

    .input-2-4 {
        background-color: #ededed;
        border: solid 1px #adadad;
        height: 2.5rem;
        width: 27.5rem;
        margin-left: 2rem;
    }

    .row {
        margin: 1.5rem 0.5rem !important;
    }

    .gender {
        background-color: #ededed;
        border: solid 1px #adadad;
        width: 27.5rem;
        justify-content: space-between;
        display: flex;
        text-align: center;
    }

    select {
        background-color: #ededed;
        border: solid 1px #adadad;
    }

    .btn-wide {
        width: 15rem;
    }

    .buttons {
        margin: 5rem 1rem 0 1rem!important; 
    }

    .b-icon {
        height: 2.5rem;
        width: 2rem;
        background-color: #717171;
        color: white;
        padding: 0 0.25rem;
    }
</style>