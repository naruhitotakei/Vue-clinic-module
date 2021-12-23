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
          <!-- Desktop version -->
          <div class="card forDesktop" v-for="appointment in appointments" :key="appointment.id">
            <b-row class="card-titles no-margin">
              <b-col lg="1" md="1">
                Time
              </b-col>
              <b-col lg="1" md="1">
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
              <b-col lg="3" md="3">
                Interest level
              </b-col>
            </b-row>
            <b-row class="no-margin pt-2">
              <b-col lg="1" md="1">
                <p class="black-text">{{ appointment.time }}</p>
              </b-col>
              <b-col lg="1" md="1">
                <p class="black-text">{{ appointment.enquiry_name + ' ' + appointment.enquiry_last_name }}</p>
              </b-col>
              <b-col lg="2" md="2">
                <p class="black-text">{{ appointment.product_name }}</p>
              </b-col>
              <b-col lg="3" md="3">
                <p class="black-text">{{ appointment.doctor_name }}</p>
              </b-col>
              <b-col lg="2" md="2">
                <p v-if="!appointment.attendance" class="black-text">-</p>
                <p v-if="appointment.attendance" class="black-text">{{ appointment.attendance }}</p>
              </b-col>
              <b-col lg="3" md="3">
                <b-button-group class="align-center button-group-style">
                  <b-button
                    v-if="appointment.level_of_interest == 'Not interested' || appointment.level_of_interest == 'Not Interested'"
                    size="sm"
                    variant="primary"
                  >
                    Not Interested
                  </b-button>
                  <b-button
                    v-else
                    size="sm"
                    variant="info"
                    @click="handleUpdateLevelOfInterest(appointment.id, 'Not Interested')"
                  >
                    Not Interested
                  </b-button>
                  <b-button
                    v-if="appointment.level_of_interest == 'Interested'"
                    size="sm"
                    variant="primary"
                  >
                    Interested
                  </b-button>
                  <b-button
                    v-else
                    size="sm"
                    variant="info"
                    @click="handleUpdateLevelOfInterest(appointment.id, 'Interested')"
                  >
                    Interested
                  </b-button>
                  <b-button
                    v-if="appointment.level_of_interest == 'Very interested' || appointment.level_of_interest == 'Very Interested'"
                    size="sm"
                    variant="primary"
                  >
                    Very Interested
                  </b-button>
                  <b-button
                    v-else
                    size="sm"
                    variant="info"
                    @click="handleUpdateLevelOfInterest(appointment.id, 'Very Interested')"
                  >
                    Very Interested
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
            <b-row class="no-margin pt-2 mb-3 align-center">
              <b-form-textarea
                id="notes-textarea"
                placeholder="Enter notes..."
                rows="4"
                max-rows="6"
                v-model="appointment.notes"
                @blur="handleUpdateNotes($event, appointment.id)"
              ></b-form-textarea>
            </b-row>
          </div>

          <!-- Mobile version -->
          <div class="card forMobile" v-for="appointment in appointments" :key="appointment.id + '_mobile'">
            <b-row class="no-margin flexMobileParent">
              <b-col md="3" sm="3" class="col-title-sm">Time:</b-col>
              <b-col md="9" sm="9" class="col-data-sm"><p class="black-text">{{ appointment.time }}</p></b-col>
            </b-row>
            <b-row class="no-margin flexMobileParent">
              <b-col md="3" sm="3" class="col-title-sm">Name:</b-col>
              <b-col md="9" sm="9" class="col-data-sm"><p class="black-text">{{ appointment.enquiry_name + ' ' + appointment.enquiry_last_name }}</p></b-col>
            </b-row>
            <b-row class="no-margin flexMobileParent">
              <b-col md="3" sm="3" class="col-title-sm">Product:</b-col>
              <b-col md="9" sm="9" class="col-data-sm"><p class="black-text">{{ appointment.product_name }}</p></b-col>
            </b-row>
            <b-row class="no-margin flexMobileParent">
              <b-col md="3" sm="3" class="col-title-sm">Doctor:</b-col>
              <b-col md="9" sm="9" class="col-data-sm"><p class="black-text">{{ appointment.doctor_name }}</p></b-col>
            </b-row>
            <b-row class="no-margin flexMobileParent">
              <b-col md="3" sm="3" class="col-title-sm">Attendance:</b-col>
              <b-col md="9" sm="9" class="col-data-sm">
                <p v-if="!appointment.attendance" class="black-text">-</p>
                <p v-if="appointment.attendance" class="black-text">{{ appointment.attendance }}</p>
              </b-col>
            </b-row>
            <b-row class="no-margin flexMobileParent">
              <b-col md="3" sm="3" class="col-title-sm">Interest level:</b-col>
              <b-col md="9" sm="9" class="col-data-sm">
                <b-button-group class="align-center button-group-style">
                  <b-button
                    v-if="appointment.level_of_interest == 'Not interested' || appointment.level_of_interest == 'Not Interested'"
                    size="sm"
                    variant="primary"
                  >
                    Not Interested
                  </b-button>
                  <b-button
                    v-else
                    size="sm"
                    variant="info"
                    @click="handleUpdateLevelOfInterest(appointment.id, 'Not Interested')"
                  >
                    Not Interested
                  </b-button>
                  <b-button
                    v-if="appointment.level_of_interest == 'Interested'"
                    size="sm"
                    variant="primary"
                  >
                    Interested
                  </b-button>
                  <b-button
                    v-else
                    size="sm"
                    variant="info"
                    @click="handleUpdateLevelOfInterest(appointment.id, 'Interested')"
                  >
                    Interested
                  </b-button>
                  <b-button
                    v-if="appointment.level_of_interest == 'Very interested' || appointment.level_of_interest == 'Very Interested'"
                    size="sm"
                    variant="primary"
                  >
                    Very Interested
                  </b-button>
                  <b-button
                    v-else
                    size="sm"
                    variant="info"
                    @click="handleUpdateLevelOfInterest(appointment.id, 'Very Interested')"
                  >
                    Very Interested
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
            <b-row class="no-margin flexMobileParent">
              <b-col md="12" sm="12" class="mt-2 mb-3 align-center display-flex">
                <b-form-textarea
                  id="notes-textarea"
                  class="relative-pos"
                  placeholder="Enter notes..."
                  rows="4"
                  max-rows="6"
                  v-model="appointment.notes"
                  @blur="handleUpdateNotes($event, appointment.id)"
                ></b-form-textarea>
              </b-col>
            </b-row>
          </div>

          <b-modal v-model="showModal" title="Modal" ok-title="Save Changes" cancel-title="Close">
            <p>Modal</p>
          </b-modal>

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
  getAppointments,
  updateLevelOfInterest,
  updateNotes
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
      showModal: false,
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
    },
    async handleUpdateLevelOfInterest (appointmentID, levelOfInterest) {
      updateLevelOfInterest({ 'id': appointmentID, 'interest': levelOfInterest }).then(response => {
        if (response.success === true) {
          this.getAppointmentsData(this.selectedLocation, this.selectedDoctor, this.dateSelected)
        }
      })
    },
    async handleUpdateNotes (e, appointmentID) {
      updateNotes({ 'id': appointmentID, 'notes': e.target.value }).then(response => {
        if (response.success === true) {
          this.getAppointmentsData(this.selectedLocation, this.selectedDoctor, this.dateSelected)
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
  .button-group-style {
    flex-direction: column;
    width: 100%;
  }
  .button-group-style button {
    width: 100%;
    margin-bottom: 0.5rem !important;
  }
  .align-center {
    align-items: center !important;
  }
  .black-text {
    color: black;
  }
  #notes-textarea {
    height: auto !important;
  }
  .forMobile {
    display: none !important;
  }
  .flexMobileParent {
    display: flex;
    flex-direction: row;
  }
  .col-title-sm {
    width: 30%;
  }
  .col-data-sm {
    width: 70%;
  }
  .display-flex {
    display: flex;
  }
  .relative-pos {
    position: relative;
  }

  /* media */
  @media only screen and (max-width: 1401px) {
    .filter-select {
      min-width: 220px;
    }
  }

   @media only screen and (max-width: 921px) {
     .forDesktop {
       display: none !important;
     }
     .forMobile {
       display: flex !important;
       flex-direction: column;
     }
   }

  @media only screen and (max-width: 841px) {
    .filters-section {
      flex-direction: column;
      align-items: flex-start;
    }
    .filter-select {
      min-width: 300px;
      margin-left: 0;
      margin-bottom: 0.75rem;
    }
  }

  @media only screen and (max-width: 481px) {
    .filter-select {
      min-width: 100%;
    }
  }
</style>
