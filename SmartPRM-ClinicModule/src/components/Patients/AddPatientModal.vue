<template>
  <b-modal
    v-if="showModal"
    v-model="openAddPatient"
    :ok-disabled="isDisabled"
    no-close-on-backdrop
    size="md"
    :title="$t('patients.addPatient')"
    :ok-title="$t('patients.save')"
    :cancel-title="$t('patients.close')"
    @ok="addPatient"
    @close="cancelAddingPatient"
    @cancel="cancelAddingPatient"
    hide-footer
  >
    <form>
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="firstName"
            >{{ $t('patients.patientsColumn.name') }} *</label
          >
          <b-form-input
            type="text"
            v-model="addPatientForm.firstName"
          ></b-form-input>
        </div>
        <div class="col-md-12 mb-3">
          <label for="lastName"
            >{{ $t('patients.patientsColumn.lastName') }}*
          </label>
          <b-form-input
            type="text"
            v-model="addPatientForm.lastName"
          ></b-form-input>
        </div>
        <div class="col-md-12 mb-3">
          <label for="phone">{{
            $t('patients.patientsColumn.telephone')
          }}</label>
          <b-form-input
            type="text"
            v-model="addPatientForm.phone"
          ></b-form-input>
        </div>
        <div class="col-md-12 mb-3">
          <label for="email">{{ $t('patients.patientsColumn.email') }}</label>
          <b-form-input
            type="email"
            v-model="addPatientForm.email"
          ></b-form-input>
        </div>
        <div class="col-md-12 mb-3">
          <label for="country">{{ $t('shared.country') }} *</label>
          <v-select
            :clearable="false"
            label="country"
            :reduce="(country) => country.id"
            :getOptionLabel="(country) => country.name"
            class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
            v-model="addPatientForm.country"
            :options="countries"
            style="min-width:305px;"
          ></v-select>
        </div>
        <div class="col-md-12">
            <hr>
        </div>
        <div class="col-md-12 text-right">
            <button type="button" class="btn btn-secondary mr-2" @click="cancelAddingPatient">{{ $t('patients.close') }}</button>
            <button type="button" class="btn btn-primary" :disabled="isDisabled || loading" @click="addPatient">{{ $t('patients.save') }}</button>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { createEnquiry } from '@/services/enquiry'
import { getCountriesList } from '@/services/commonCodeLists'
export default {
  name: 'AddPatientModal',
  props: {
    openAddPatient: {
      type: Boolean,
      default: false
    },
    from: {
      type: String,
      default: null
    }
  },
  computed: {
    showModal () {
      return this.openAddPatient
    },
    isDisabled () {
      return (
        !this.addPatientForm.firstName ||
        !this.addPatientForm.lastName ||
        !this.addPatientForm.country
      )
    }
  },
  mounted () {
    if (!this.countries.length) {
      this.getCountries()
    }
  },
  methods: {
    getCountries () {
      getCountriesList().then(response => {
        this.countries = response
      })
    },
    async addPatient () {
      this.loading = true
      await createEnquiry(this.addPatientForm).then((result) => {
        if (result.status === 'OK') {
          this.addPatientForm = this.defaultAddPatientForm()
          if (this.from && this.from === 'calendar') {
            this.$emit('savedPatient', result.patient)
          } else {
            this.$router.push({ path: `/patients/${result.patient.id}` })
          }
        }
        // this.getPatients()
      })
      this.loading = false
      this.$emit('closeAddPatient', false)
    },
    cancelAddingPatient () {
      this.addPatientForm = this.defaultAddPatientForm()
      this.$emit('closeAddPatient', false)
    },
    defaultAddPatientForm () {
      return {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        country: ''
      }
    }
  },
  data () {
    return {
      countries: [],
      loading: false,
      addPatientForm: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        country: ''
      }
    }
  }
}
</script>
