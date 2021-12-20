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
              ></v-select>
            </div>
            <div class="filter-select">
              <v-select
                :options="filterDoctors"
                :value="selectedDoctor"
              ></v-select>
            </div>
            <div class="filter-select"></div>
          </div>
        </template>
        <template v-slot:body>
          <b-row>
            <b-col md="12"></b-col>
          </b-row>
        </template>
      </iq-card>
    </b-col>
  </b-container>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card.vue'
import { xray } from '../../config/pluginInit'

export default {
  components: {
    IqCard
  },
  name: 'Appointments',
  mounted () {
    xray.index()
    this.getAppointmentsData()
  },
  data: function () {
    return {
      isDataLoaded: false,
      filterLocations: ['All Locations', 'Canada', 'United States'],
      selectedLocation: 'All Locations',
      filterDoctors: ['All Doctors', 'Dr. John', 'Dr. Monica'],
      selectedDoctor: 'All Doctors',
      appointments: []
    }
  },
  methods: {
    async getAppointmentsData () {
      this.isDataLoaded = false
      // getAppointments().then(response => {
      //   this.appointments
      // })
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
</style>
