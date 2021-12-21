<template>
  <b-container fluid>
    <b-col lg="12" md="12">
      <iq-card>
        <template v-slot:headerTitle>
          <h3 class="mb-3 mt-2">Appointments</h3>
          <div class="filters-section d-flex mb-2">
            <h5>Filters</h5>
            <div class="filter-select">
              <v-select
                :options="filterLocations"
                :value="selectedLocation"
                v-model="selectedLocation"
              ></v-select>
            </div>
            <div class="filter-select">
              <v-select
                :options="filterDoctors"
                :value="selectedDoctor"
                v-model="selectedDoctor"
              ></v-select>
            </div>
            <div class="filter-select">
              <b-form-datepicker
                class="date"
                id="filter-datepicker"
                v-model="dateSelected"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                placeholder="yyyy-mm-dd"
            ></b-form-datepicker>
            </div>
          </div>
        </template>
        <template v-slot:body>
          <div class="card" v-for="appointment in appointments" :key="appointment.id">
            <b-row class="card-titles no-margin">
              <b-col lg="1" md="1">
                Time
              </b-col>
              <b-col lg="2" md="2">
                Name
              </b-col>
              <b-col lg="2" md="2">
                Product
              </b-col>
              <b-col lg="3" md="3">
                Doctor
              </b-col>
              <b-col lg="2" md="2">
                Attendance
              </b-col>
              <b-col lg="2" md="2">
                Interest level
              </b-col>
            </b-row>
            <b-row class="no-margin pt-2">
              <b-col lg="1" md="1">
                <p>{{ appointment.time }}</p>
              </b-col>
              <b-col lg="2" md="2">
                <p>{{ appointment.enquiry_name + ' ' + appointment.enquiry_last_name }}</p>
              </b-col>
              <b-col lg="2" md="2">
                <p>{{ appointment.product_name }}</p>
              </b-col>
              <b-col lg="3" md="3">
                <p>{{ appointment.doctor_name }}</p>
              </b-col>
              <b-col lg="2" md="2">
                -
              </b-col>
              <b-col lg="2" md="2">
                -
              </b-col>
            </b-row>
          </div>
        </template>
      </iq-card>
    </b-col>
  </b-container>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card.vue'
import { xray } from '../../config/pluginInit'
import {
  getAppointmentsLocations,
  getAppointmentsDoctors,
  getAppointments
} from '../../services/appointments'

export default {
  components: {
    IqCard
  },
  name: 'Appointments',
  mounted () {
    xray.index()
    this.getAppointmentsLocationsData()
    this.getAppointmentsDoctorsData()
    this.getAppointmentsData(this.selectedLocation, this.selectedDoctor, this.dateSelected)
  },
  data: function () {
    return {
      filterLocations: ['All Locations'],
      selectedLocation: 'All Locations',
      filterDoctors: ['All Doctors'],
      selectedDoctor: 'All Doctors',
      dateSelected: new Date().toISOString().slice(0, 10),
      appointments: []
    }
  },
  watch: {
    selectedLocation (newLocation) {
      this.selectedLocation = newLocation
      this.getAppointmentsData(this.selectedLocation, this.selectedDoctor, this.dateSelected)
    },
    selectedDoctor (newDoctor) {
      this.selectedDoctor = newDoctor
      this.getAppointmentsData(this.selectedLocation, this.selectedDoctor, this.dateSelected)
    },
    dateSelected (newDate) {
      this.dateSelected = newDate
      this.getAppointmentsData(this.selectedLocation, this.selectedDoctor, this.dateSelected)
    }
  },
  methods: {
    async getAppointmentsLocationsData () {
      getAppointmentsLocations().then(response => {
        if (Array.isArray(response)) {
          response.map(obj => {
            this.filterLocations.push(obj.location)
          })
        }
      })
    },
    async getAppointmentsDoctorsData () {
      getAppointmentsDoctors().then(response => {
        if (Array.isArray(response)) {
          response.map(obj => {
            this.filterDoctors.push(obj.doctor_name)
          })
        }
      })
    },
    async getAppointmentsData (filterLocation, filterDoctor, filterDate) {
      getAppointments(filterLocation, filterDoctor, filterDate).then(response => {
        this.appointments = []
        if (Array.isArray(response)) {
          response.map(obj => {
            this.appointments.push(obj)
          })
        }
      })
    }
  }
}
</script>

<style>
  .filters-section {
    flex-direction: row;
    align-items: center;
  }
  .filter-select {
    min-width: 300px;
    margin-left: 1rem;
  }
  .vs__clear {
    display: none !important;
  }
  .no-margin {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .card-titles {
    border-bottom: 1px solid #dbdbdb;
  }
  .card {
    padding-top: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid black !important;
    border-radius: 0 !important;
  }
</style>
