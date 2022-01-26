<template>
  <b-container fluid>
      <iq-card>
        <template v-slot:headerTitle>
          <h3 class="mb-3 mt-2">{{ $t('appointments.header') }}</h3>
          <div class="filters-section d-flex mb-2 ml-2">
            <h5>{{ $t('appointments.filters') }}</h5>
            <div class="filter-select">
              <v-select
                :options="filterLocations"
                :value="selectedLocation"
                v-model="selectedLocation"
                @input="getAppointmentsData"
              ></v-select>
            </div>
            <div class="filter-select">
              <v-select
                :options="filterDoctors"
                v-model="selectedDoctor"
                :reduce="(option) => option.value"
                @input="getAppointmentsData"
              ></v-select>
            </div>
            <div class="filter-select">
              <date-picker
                required
                v-model="dateSelected"
                type="date"
                @input="getAppointmentsData"
                :format="'DD.MM.YYYY'"></date-picker>
            </div>
          </div>
        </template>
        <template v-slot:body>
          <!-- Desktop version -->
          <div
            class="card forDesktop"
            v-for="appointment in appointments"
            :key="appointment.id"
          >
          <b-row class="no-margin">
            <p class="text-black sm_margin_b">{{ appointment.time }} - {{ appointment.doctor_id ? appointment.doctor_name : '' }}</p>
          </b-row>
          <b-row class="no-margin">
            <p class="text-black sm_margin_b">
              {{ appointment.product_name }} -  {{ appointment.enquiry_name || '' }} {{ appointment.enquiry_last_name || '' }} ({{ appointment.enquiry_phone }})
            </p>
          </b-row>
          <b-row class="card-titles no-margin">
            <p class="text-black sm_margin_b">
              Note to the doctor :
            </p>
          </b-row>
          <b-row class="mt-4">
            <b-col lg="5" md="5">
              <label for="clinicNotes" class="ml-2 mb-1 header-color">{{ $t('appointments.clinicNotes') }}</label>
                <b-form-textarea
                  id="notes-textarea"
                  :placeholder="$t('appointments.enterNotes')"
                  rows="4"
                  max-rows="6"
                  v-model="appointment.notes"
                  @blur="handleUpdateClinicNotes($event, appointment.id)"
              ></b-form-textarea>
              <label for="callCenterNotes" class="ml-2 mb-1 header-color">{{ $t('appointments.callCenterNotes') }}</label>
                <b-form-textarea
                  id="notes-textarea"
                  :placeholder="$t('appointments.enterNotes')"
                  rows="4"
                  max-rows="6"
                  v-model="appointment.note"
                  @blur="handleUpdateCallCenterNotes($event, appointment.id)"
              ></b-form-textarea>
            </b-col>
            <b-col lg="7" md="7">
              <b-row class="card-titles no-margin">
                <b-col lg="6" md="6">
                {{ $t('appointments.attendance') }}
              </b-col>
              <b-col lg="6" md="6">
                {{ $t('appointments.interest') }}
              </b-col>
              </b-row>
              <b-row style="margin-top:10px">
                <b-col lg="4" md="4" class="attendance_style">
                <div v-if="!appointment.attendance" class="attendance_">
                  <b-button
                    size="sm"
                    variant="light"
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'Attended')"
                  >
                    {{ $t('shared.yes') }}
                  </b-button>
                  <b-button
                    size="sm"
                    variant="light"
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'No-show')"
                  >
                    {{ $t('shared.no') }}
                  </b-button>
                </div>
                <div v-if="appointment.attendance" class="attendance_">
                  <b-button
                    size="sm"
                    :variant="
                      appointment.attendance === 'Attended'
                        ? 'success'
                        : 'light'
                    "
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'Attended')"
                  >
                    {{ $t('shared.yes') }}
                  </b-button>
                  <b-button
                    size="sm"
                    :variant="
                      appointment.attendance !== 'Attended' ? 'danger' : 'light'
                    "
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'No-show')"
                  >
                    {{ $t('shared.no') }}
                  </b-button>
                </div>
              </b-col>
              <b-col lg="8" md="8">
                <b-form-group class="align-center my-1 pt-2">
                  <b-form-radio-group class="form-radio-group">
                    <b-form-radio
                      class="radio_container"
                      v-for="[value, label] of [
                        ['Not interested', 'notInterested'],
                        ['Interested', 'interested'],
                        ['Very interested', 'veryInterested'],
                      ]"
                      :key="value"
                      v-model="appointment.level_of_interest"
                      :value="value"
                      @change="handleUpdateLevelOfInterest(appointment.id, value)"
                    >
                    <span>{{ $t(`appointments.${label}`) }}</span>
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              </b-row>
            </b-col>
          </b-row>
          </div>
       <!--     <b-row class="card-titles no-margin">
              <b-col lg="1" md="1">
                {{ $t('appointments.time') }}
              </b-col>
              <b-col lg="2" md="2">
                {{ $t('appointments.patient') }}
              </b-col>
              <b-col lg="2" md="2">
                {{ $t('appointments.product') }}
              </b-col>
              <b-col lg="2" md="2">
                {{ $t('appointments.doctor') }}
              </b-col>
              <b-col lg="2" md="2">
                {{ $t('appointments.attendance') }}
              </b-col>
              <b-col lg="2" md="2">
                {{ $t('appointments.interest') }}
              </b-col>
            </b-row>
            <b-row class="no-margin pt-2">
              <b-col lg="1" md="1">
                <p class="black-text">{{ appointment.time }}</p>
              </b-col>
              <b-col lg="2" md="2">
                <p class="black-text mb-0">
                  {{ appointment.enquiry_name || '' }} {{ appointment.enquiry_last_name || '' }}
                </p>
                <p class="black-text">
                    {{ appointment.enquiry_phone }}
                </p>
              </b-col>
              <b-col lg="2" md="2">
                <p class="black-text">{{ appointment.product_name }}</p>
              </b-col>
              <b-col lg="2" md="2">
                <p class="black-text">{{ appointment.doctor_id ? appointment.doctor_name : '' }}</p>
              </b-col>
              <b-col lg="2" md="2">
                <div v-if="!appointment.attendance">
                  <b-button
                    size="sm"
                    variant="light"
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'Attended')"
                  >
                    {{ $t('shared.yes') }}
                  </b-button>
                  <b-button
                    size="sm"
                    variant="light"
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'No-show')"
                  >
                    {{ $t('shared.no') }}
                  </b-button>
                </div>
                <div v-if="appointment.attendance">
                  <b-button
                    size="sm"
                    :variant="
                      appointment.attendance === 'Attended'
                        ? 'success'
                        : 'light'
                    "
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'Attended')"
                  >
                    {{ $t('shared.yes') }}
                  </b-button>
                  <b-button
                    size="sm"
                    :variant="
                      appointment.attendance !== 'Attended' ? 'danger' : 'light'
                    "
                    class="width-50"
                    @click="handleUpdateAttendance(appointment.id, 'No-show')"
                  >
                    {{ $t('shared.no') }}
                  </b-button>
                </div>
              </b-col>
              <b-col lg="3" md="3">
                <b-form-group class="align-center my-1">
                  <b-form-radio
                    v-for="[value, label] of [
                      ['Not interested', 'notInterested'],
                      ['Interested', 'interested'],
                      ['Very interested', 'veryInterested'],
                    ]"
                    :key="value"
                    v-model="appointment.level_of_interest"
                    :value="value"
                    @change="handleUpdateLevelOfInterest(appointment.id, value)"
                  >
                    {{ $t(`appointments.${label}`) }}
                  </b-form-radio>
                </b-form-group>
              </b-col>
            </b-row>
              <b-row class="no-margin pt-2 mt-1 align-center">
              <label for="callCenterNotes" class="ml-2 mb-1 header-color">{{ $t('appointments.callCenterNotes') }}</label>
                <b-form-textarea
                  id="notes-textarea"
                  :placeholder="$t('appointments.enterNotes')"
                  rows="4"
                  max-rows="6"
                  v-model="appointment.note"
                  @blur="handleUpdateCallCenterNotes($event, appointment.id)"
              ></b-form-textarea>
            </b-row>
            <b-row class="no-margin pt-2 align-center">
              <label for="clinicNotes" class="ml-2 mb-1 header-color">{{ $t('appointments.clinicNotes') }}</label>
                <b-form-textarea
                  id="notes-textarea"
                  :placeholder="$t('appointments.enterNotes')"
                  rows="4"
                  max-rows="6"
                  v-model="appointment.notes"
                  @blur="handleUpdateClinicNotes($event, appointment.id)"
              ></b-form-textarea>
            </b-row>
          </div> -->

          <!-- Mobile version -->
          <div class="card forMobile"
               v-for="appointment in appointments"
               :key="appointment.id + '_mobile'">
              <b-row class="no-margin flexMobileParent">
                  <b-col md="2" sm="2" class="col-title-sm">{{ $t('appointments.time') }}:</b-col>
                  <b-col md="3" sm="3" class="col-data-sm"><p class="black-text">{{ appointment.time }}</p></b-col>
                  <b-col md="2" sm="2" class="col-title-sm">{{ $t('appointments.patient') }}:</b-col>
                  <b-col md="3" sm="3" class="col-data-sm">
                      <p class="black-text mb-0">
                          {{
                    appointment.enquiry_name +
                    ' ' +
                    appointment.enquiry_last_name
                          }}
                      </p>
                      <p class="black-text">
                          {{ appointment.enquiry_phone }}
                      </p>
                  </b-col>
              </b-row>
              <b-row class="no-margin flexMobileParent">
                  <b-col md="2" sm="2" class="col-title-sm">{{ $t('appointments.product') }}:</b-col>
                  <b-col md="3" sm="3" class="col-data-sm"><p class="black-text">{{ appointment.product_name }}</p></b-col>
                  <b-col md="2" sm="2" class="col-title-sm">{{ $t('appointments.doctor') }}:</b-col>
                  <b-col md="3" sm="3" class="col-data-sm"><p class="black-text">{{ appointment.doctor_name }}</p></b-col>
              </b-row>
              <b-row class="no-margin flexMobileParent mb-2">
                  <b-col md="2" sm="2" class="col-title-sm mt-2">{{ $t('appointments.attendance') }}:</b-col>
                  <b-col md="3" sm="3" class="col-data-sm mt-2">
                      <div v-if="!appointment.attendance">
                          <b-button size="sm"
                                    variant="light"
                                    class="width-50"
                                    @click="handleUpdateAttendance(appointment.id, 'Attended')">
                              {{ $t('shared.yes') }}
                          </b-button>
                          <b-button size="sm"
                                    variant="light"
                                    class="width-50"
                                    @click="handleUpdateAttendance(appointment.id, 'No-show')">
                              {{ $t('shared.no') }}
                          </b-button>
                      </div>
                      <div v-if="appointment.attendance">
                          <b-button size="sm"
                                    :variant="
                      appointment.attendance === 'Attended'
                        ? 'success'
                        : 'light'
                    "
                                    class="width-50"
                                    @click="handleUpdateAttendance(appointment.id, 'Attended')">
                              {{ $t('shared.yes') }}
                          </b-button>
                          <b-button size="sm"
                                    :variant="
                      appointment.attendance !== 'Attended' ? 'danger' : 'light'
                    "
                                    class="width-50"
                                    @click="handleUpdateAttendance(appointment.id, 'No-show')">
                              {{ $t('shared.no') }}
                          </b-button>
                      </div>
                  </b-col>
                  <b-col md="2" sm="2" class="col-title-sm mt-2">{{ $t('appointments.interest') }}:</b-col>
                  <b-col md="3" sm="3" class="col-data-sm">
                      <b-form-group class="align-center">
                          <b-form-radio v-for="[value, label] of [
                      ['Not interested', 'notInterested'],
                      ['Interested', 'interested'],
                      ['Very interested', 'veryInterested'],
                    ]"
                                        :key="value"
                                        v-model="appointment.level_of_interest"
                                        :value="value"
                                        @change="handleUpdateLevelOfInterest(appointment.id, value)">
                              {{ $t(`appointments.${label}`) }}
                          </b-form-radio>
                      </b-form-group>
                  </b-col>
              </b-row>
              <b-row class="no-margin pt-2 align-center">
                  <label for="clinicNotes" class="ml-2 mb-1 header-color">{{ $t('appointments.clinicNotes') }}</label>
                  <b-form-textarea id="notes-textarea"
                                   :placeholder="$t('appointments.enterNotes')"
                                   rows="4"
                                   max-rows="6"
                                   v-model="appointment.notes"
                                   @blur="handleUpdateClinicNotes($event, appointment.id)"></b-form-textarea>
              </b-row>
              <b-row class="no-margin pt-2 mt-1 align-center">
                  <label for="callCenterNotes" class="ml-2 mb-1 header-color">{{ $t('appointments.callCenterNotes') }}</label>
                  <b-form-textarea id="notes-textarea"
                                   :placeholder="$t('appointments.enterNotes')"
                                   rows="4"
                                   max-rows="6"
                                   v-model="appointment.note"
                                   @blur="handleUpdateCallCenterNotes($event, appointment.id)"></b-form-textarea>
              </b-row>
              <hr />
          </div>

          <b-modal
            v-model="showModal"
            title="Modal"
            ok-title="Save Changes"
            cancel-title="Close"
          >
            <p>Modal</p>
          </b-modal>
        </template>
      </iq-card>
  </b-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'
import IqCard from '../../components/xray/cards/iq-card.vue'
import { xray } from '../../config/pluginInit'

import {
  getAppointmentsLocations,
  getAppointmentsDoctors,
  getAppointments,
  updateLevelOfInterest,
  updateClinicNotes,
  updateCallCenterNotes,
  updateAttendance,
} from '../../services/appointments'

export default defineComponent({
  components: {
    IqCard,
  },
  name: 'Appointments',
  mounted() {
    xray.index()
    this.getAppointmentsLocationsData()
    this.getAppointmentsDoctorsData()
    this.getAppointmentsData()
  },
  data() {
    return {
      filterLocations: ['All Locations'],
      selectedLocation: 'All Locations',
      filterDoctors: [{ value: 'All Doctors', label: 'All Doctors' }],
      selectedDoctor: 'All Doctors',
      dateSelected: new Date(),
      showModal: false,
      appointments: [],
    }
  },
  methods: {
    async getAppointmentsLocationsData() {
      getAppointmentsLocations().then((response) => {
        if (Array.isArray(response)) {
          response.map((obj) => {
            this.filterLocations.push(obj.location)
          })
        }
      })
    },
    async getAppointmentsDoctorsData() {
      getAppointmentsDoctors().then((response) => {
        if (Array.isArray(response)) {
          response.map((obj) => {
            this.filterDoctors.push({
              value: obj.doctor_id,
              label: obj.doctor_name,
            })
          })
        }
      })
    },
    async getAppointmentsData() {
      getAppointments(this.selectedLocation, this.selectedDoctor, moment(this.dateSelected).format('YYYY-MM-DD'), this.$i18n.locale).then(
        (response) => {
          this.appointments = []
          if (Array.isArray(response)) {
            response.map((obj) => {
              this.appointments.push(obj)
            })
          }
        },
      )
    },
    async handleUpdateLevelOfInterest(appointmentID, levelOfInterest) {
      updateLevelOfInterest({
        id: appointmentID,
        interest: levelOfInterest,
      }).then((response) => {
        if (response.success === true) {
          this.getAppointmentsData()
        }
      })
    },
    async handleUpdateClinicNotes(e, appointmentID) {
      updateClinicNotes({ id: appointmentID, clinicNotes: e.target.value }).then(
        (response) => {
          if (response.success === true) {
            this.getAppointmentsData()
          }
        },
      )
    },
    async handleUpdateCallCenterNotes(e, appointmentID) {
      updateCallCenterNotes({ id: appointmentID, callCenterNotes: e.target.value }).then(
        (response) => {
          if (response.success === true) {
            this.getAppointmentsData()
          }
        },
      )
    },
    async handleUpdateAttendance(appointmentID, attendance) {
      updateAttendance({ id: appointmentID, attendance: attendance }).then(
        (response) => {
          if (response.success === true) {
            this.getAppointmentsData()
          }
        },
      )
    },
  },
})
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
.sm_margin_b {
  margin-bottom: 4px !important;
}
.card-titles {
  border-bottom: 1px solid #dbdbdb;
}
.card {
  padding-top: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid black;
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
  width: 20% !important;
}
.col-data-sm {
  width: 30% !important;
}
.display-flex {
  display: flex;
}
.relative-pos {
  position: relative;
}
.width-50 {
  width: 50px !important;
}
.mobile-width {
  width: 165px !important;
}
.header-color {
  color: #a09e9e !important;
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
.attendance_style{
  display:flex;
  justify-content:flex-start;
  align-items: center;
  width:20%
}
.interestLevel{
  width:80%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}
.attendance_{
  margin-left:15px
}
.form-radio-group{
  display:flex;
}
.radio_container{
  margin:4px !important
}
.custom-control-label{
  display: flex !important;
  align-items: center !important;
}
</style>
