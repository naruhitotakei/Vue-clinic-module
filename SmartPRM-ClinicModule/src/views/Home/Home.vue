<template>
    <b-container fluid>
        <b-row>
            <b-col lg="8">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" style="height: auto !important;">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.todaysAppointments') }}</h4>
                    </template>
                    <!-- <template v-slot:headerAction>
                    <b-dropdown size="lg p-0"  variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                        <span class="dropdown-toggle p-0" id="dropdownMenuButton5" data-toggle="dropdown">
                          <i class="ri-more-fill m-0 text-primary"></i>
                        </span>
                  </template>
                  <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.view') }}</b-dropdown-item>
                  <b-dropdown-item href="#"><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.delete') }}</b-dropdown-item>
                  <b-dropdown-item href="#"><i class="ri-pencil-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.edit') }}</b-dropdown-item>
                  <b-dropdown-item href="#"><i class="ri-printer-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.print') }}</b-dropdown-item>
                  <b-dropdown-item href="#"><i class="ri-file-download-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.download') }}</b-dropdown-item>
                </b-dropdown>
                </template> -->
                    <template v-slot:body>
                        <b-table v-if="todaysAppointments.length > 0"
                                 borderless
                                 id="todaysAppointmentsTable"
                                 :items="todaysAppointments"
                                 :fields="todaysAppointmentsColumns"
                                 :per-page="todaysAppointmentsPerPage"
                                 :current-page="currentTodaysAppointmentsPage">
                            <template v-slot:cell(patient_name)="data">
                                <router-link tag="span" :to="'/patients/' + data.item.patient_id" style="cursor:pointer;" class="style-chooser form-control-disabled">{{ data.item.patient_name }}</router-link>
                            </template>
                            <template v-slot:cell(product_group_name)="data">
                                <p @click="openAppointmentModal(data.item)" style="cursor: pointer;" class="p-0 m-0">{{ data.item.product_group_name }}</p>
                            </template>
                        </b-table>
                        <p v-else>{{ $t('home.noAppointmentsToday') }}</p>
                    </template>
                    <template>
                        <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                        <div class="ml-4 pb-2">
                            <b-pagination v-if="hideTodaysAppointmentsPagination"
                                          v-model="currentTodaysAppointmentsPage"
                                          :total-rows="todaysAppointments.length"
                                          :per-page="todaysAppointmentsPerPage"
                                          aria-controls="todaysAppointmentsTable">
                            </b-pagination>
                        </div>
                    </template>
                </iq-card>
                <iq-card class-name="iq-card-block iq-card-stretch" style="margin-top: 0 !important">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.openAssignments') }}</h4>
                    </template>
                    <template v-slot:headerAction>
                        <div class="iq-card-header-toolbar d-flex align-items-center">
                            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                                <template v-slot:button-content>
                                    <i class="ri-more-fill"></i>
                                </template>
                                <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>{{ $t('home.operationsDropDown.view') }}</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-table v-if="openAssignments.length > 0"
                                 borderless
                                 id="openAssignmentsTable"
                                 :items="openAssignments"
                                 :fields="openAssignmentsColumns"
                                 :per-page="openAssignmentsPerPage"
                                 :current-page="currentOpenAssignmentsPage"></b-table>
                        <p v-else>{{ $t('home.noOpenAssignments') }}</p>
                    </template>
                    <template>
                        <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                        <div class="ml-4 pb-2">
                            <b-pagination v-if="hideOpenAssignmentsPagination"
                                          v-model="currentOpenAssignmentsPage"
                                          :total-rows="openAssignments.length"
                                          :per-page="openAssignmentsPerPage"
                                          aria-controls="openAssignmentsTable">
                            </b-pagination>
                        </div>
                    </template>
                </iq-card>
            </b-col>
            <b-col lg="4">
                <iq-card class-name="iq-card-block iq-card-stretch">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.staffList') }}</h4>
                    </template>
                    <template v-slot:body>
                        <ul class="doctors-lists m-0 p-0">
                            <li class="d-flex mb-4 align-items-center" v-for="member in staff" :key="member.id">
                                <div class="user-img img-fluid"><img :src="'/api/files/avatar/' + member.id + '?' + Math.random()" alt="story-img" class="rounded-circle avatar-40"></div>
                                <div class="media-support-info ml-3">
                                    <h6>{{member.name}}</h6>
                                    <p class="mb-0 font-size-12">{{member.specialization}}</p>
                                </div>
                                <div class="iq-card-header-toolbar d-flex align-items-center">
                                    <!--<b-dropdown size="lg"  variant="link" toggle-class="p-0 text-decoration-none" no-caret>
                                  <template v-slot:button-content class="p-0">
                                  <span class="dropdown-toggle p-0" id="dropdownMenuButton6" data-toggle="dropdown">
                                    <i class="ri-more-2-line"></i>
                                  </span>
                                  </template>
                                  <b-dropdown-item href="#"><i class="ri-eye-line mr-2"></i>{{ $t('home.doctorsListDropDown.view') }}</b-dropdown-item>
                                  <b-dropdown-item href="#"><i class="ri-bookmark-line mr-2"></i>{{ $t('home.doctorsListDropDown.appointment') }}</b-dropdown-item>
                                </b-dropdown> -->
                                </div>
                            </li>
                        </ul>
                    </template>
                </iq-card>
                <iq-card class-name="iq-card-block iq-card-stretch">
                  <template v-slot:headerTitle>
                    <h4 class="card-title">{{ $t('home.patientsByCountry') }}</h4>
                  </template>
                  <template v-slot:body>
                    <div class="iq-details" :class="{'mt-3': index !== 0}" v-for="(country, index) in countriesWithPatients" :key="index">
                      <span class="title text-dark">{{country.name}}</span>
                      <div class="percentage float-right text-primary">{{country.percentage ? country.percentage : 0}} <span>%</span></div>
                      <div class="iq-progress-bar-linear d-inline-block w-100">
                        <b-progress :value="country.percentage ? country.percentage : 0" class="pr-bar" :key="index"></b-progress>
                      </div>
                    </div>
                  </template>
                </iq-card>
            </b-col>
            <b-col lg="8">
              <iq-card class-name="iq-card-block iq-card-stretch">
                  <template v-slot:headerTitle>
                    <h4 class="card-title">{{ $t('home.appointmentChart') }}</h4>
                  </template>
                  <template v-slot:body>
                    <apex-chart type="bar" height="350" :options="chartOptions" :series="series"></apex-chart>
                  </template>
                </iq-card>
            </b-col>
            <b-col lg="3">
                <!--<iq-card>
              <template v-slot:headerTitle>
                  <h4 class="card-title">{{ $t('home.todaysSchedule') }}</h4>
              </template>
              <template v-slot:body>
                <ul class="m-0 p-0 today-schedule">
                  <li class="d-flex">
                    <div class="schedule-icon"><i class="ri-checkbox-blank-circle-fill text-primary" /></div>
                    <div class="schedule-text"> <span>Implant</span>
                      <span>09:00 to 12:00</span></div>
                  </li>
                  <li class="d-flex">
                    <div class="schedule-icon"><i class="ri-checkbox-blank-circle-fill text-success" /></div>
                    <div class="schedule-text"> <span>Invisalign</span>
                      <span>09:00 to 12:00</span></div>
                  </li>
                </ul>
              </template>
            </iq-card>-->
            </b-col>
            <!--<b-col lg="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">{{ $t('home.activityStatistics') }}</h4>
            </template>
            <template v-slot:body>
              <ApexChart element="patient-chart-01" :chartOption="chart5"/>
            </template>
          </iq-card>
        </b-col>-->
        </b-row>
        <!-- Appointment Modal-->
        <b-modal v-model="appointmentModal"
                 no-close-on-esc
                 no-close-on-backdrop
                 size="lg"
                 :title="$t('calendar.appointmentDetails')"
                 hide-footer>
            <form class="calendar-modal">
                <div class="form-row">
                    <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                        <div class="col-md-3">
                            <label for="patient" class="pt-1 mb-0">{{ $t('calendarEvent.patient') }} *</label>
                        </div>
                        <div class="col-md-9">
                            <router-link tag="span" :to="'/patients/' + appointmentData.patient_id" style="cursor:pointer;" class="ml-2 text-black style-chooser form-control-disabled font-size-16">{{ appointmentData.patient_name }}</router-link>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                        <div class="col-md-3">
                            <label for="location" class="mb-0 mt-2">{{ $t('calendarEvent.location') }} *</label>
                        </div>
                        <div class="col-md-9">
                            <v-select :disabled="disabled"
                                      :clearable="false"
                                      label="city"
                                      :reduce="location => location.id"
                                      class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                                      v-model="appointmentData.location"
                                      :options="locations"
                                      style="min-width:305px;"></v-select>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                        <div class="col-md-3">
                            <label for="doctor" class="mr-2 mb-0 pt-1">{{ $t('calendarEvent.doctor') }} *</label>
                        </div>
                        <div class="col-md-9">
                            <v-select :disabled="disabled"
                                      :clearable="false"
                                      label="doctor"
                                      class="style-chooser form-control-disabled font-size-16"
                                      v-model="selectedDoctor"
                                      :options="doctors"
                                      style="min-width: 305px;"></v-select>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                        <div class="col-md-3 pl-3 pr-0">
                            <label for="patient" class="mb-0 pt-1">{{ $t('calendarEvent.product_group') }} *</label>
                        </div>
                        <div class="col-md-9">
                            <v-select :disabled="disabled"
                                      :clearable="false"
                                      label="product_group_name"
                                      class="style-chooser form-control-disabled font-size-16"
                                      v-model="selectedProductGroup"
                                      :options="product_groups"></v-select>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-between w-100 pt-2 " :class="{'mb-3': !disabled}">
                        <div class="col-md-3">
                            <label for="start" class="mb-0" :style="{ 'margin-top': '13px' }">{{ $t('calendarEvent.start') }} *</label>
                        </div>
                        <div class="col-md-9 d-flex align-items-center">
                            <date-picker :disabled="disabled"
                                         class="form-control form-control-disabled font-size-16"
                                         :class="{'no-border margin-left': disabled}"
                                         v-model="appointmentData.start_time"
                                         :style="{ 'height': !disabled ? '53px' : '45px' }"
                                         type="datetime"
                                         :minute-step="5"
                                         :show-second="false"
                                         :lang="'en'"
                                         :format="'DD.MM.YYYY HH.mm'"></date-picker>
                            <label for="start" class="mb-0" :style="{ 'margin-top': '13px' }">{{ $t('calendarEvent.end') }}*</label>
                            <date-picker :disabled="disabled"
                                         required
                                         class="form-control form-control-disabled font-size-16"
                                         :class="{'no-border': disabled}"
                                         :style="{ 'height': !disabled ? '53px' : '45px' }"
                                         v-model="appointmentData.end_time"
                                         type="time"
                                         :minute-step="5"
                                         :show-second="false"
                                         :lang="'en'"
                                         :format="'HH.mm'"></date-picker>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-between w-100" v-if="!disabled || appointmentData.note" :class="{'mb-3': !disabled}">
                        <div class="col-md-3">
                            <label for="notes">{{ $t('calendarEvent.note') }}</label>
                        </div>
                        <div class="col-md-9">
                            <textarea :disabled="disabled" row="2" v-model="appointmentData.note" class="form-control form-control-disabled font-size-16 mt-3" placeholder="Add your note here for event!" id="note" required></textarea>
                        </div>
                    </div>
                    <template v-if="!disabled || appointmentData.patient_attended">
                        <div class="row align-items-center justify-content-between w-100 pt-1 mb-3" :class="{'mb-3': !disabled}">
                            <div class="col-md-3">
                                <label for="color" class="mb-0">{{ $t('calendarEvent.patient_attended') }}</label><br>
                            </div>
                            <div class="col-md-9">
                                <template v-for="(item,index) in patient_attend">
                                    <b-form-radio class="custom-radio-patient font-size-16"
                                                  inline
                                                  v-model="appointmentData.patient_attended"
                                                  :value="item.value"
                                                  :key="index"
                                                  v-if="showProps(item, appointmentData.patient_attended)">
                                        {{ item.label }}
                                    </b-form-radio>
                                </template>
                            </div>
                        </div>
                    </template>
                    <div class="row align-items-center justify-content-between w-100 pt-3 mb-3" v-if="!disabled || appointmentData.backgroundColor">
                        <div class="col-md-3">
                            <label for="color" class="mt-1 ml-1">{{ $t('calendarEvent.labels') }}</label><br>
                        </div>
                        <div class="col-md-9 mb-1">
                            <template v-for="(item,index) in colors">
                                <b-form-radio class="custom-radio-color font-size-16 labels"
                                              inline
                                              v-model="appointmentData.backgroundColor"
                                              :key="index"
                                              :value="item.id"
                                              :style="{'border': '1px solid ' + item.color}"
                                              name="labels"
                                              v-if="showLabels(item)">
                                    <p class="m-0 py-1 pr-2" :style="{'color': item.color}">{{ item.text }}</p>
                                </b-form-radio>
                            </template>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-bt" style="width: 100%;">
                        <template v-if="disabled">
                            <button v-if="appointmentData.appointment_canceled_in_advance_by_clinic === false && appointmentData.appointment_canceled_in_advance_by_patient === false || openCancelationModal === true" type="button" class="btn btn-secondary" @click="openCancelationModal = true">{{ $t('calendar.btnCancelation') }}</button>
                            <button type="button" class="btn btn-secondary" @click="appointmentModal = false">{{ $t('calendar.btnClose') }}</button>
                            <button type="button" class="btn btn-secondary" @click="editMode">{{ $t('calendar.btnEdit') }}</button>
                            <button type="button" class="btn btn-primary" @click="viewPatient(appointmentData.enquiry_id)">{{ $t('calendar.btnEPR') }}</button>
                        </template>
                        <template v-if="!disabled">
                            <button type="button" class="btn btn-secondary" @click="appointmentModal = false, disabled = true">{{ $t('calendar.btnClose') }}</button>
                            <button type="button" class="btn btn-primary" @click="updateAppointment">{{ $t('calendar.btnSave') }}</button>
                        </template>
                    </div>
                    <b-modal v-model="openCancelationModal"
                             :ok-title="$t('calendar.btnSave')"
                             :cancel-title="$t('calendar.btnCancel')"
                             :title="$t('calendar.btnCancelation')"
                             @ok="updateAppointment"
                             @close="closeCancelation"
                             @cancel="closeCancelation">
                        <div class="col-md-12 mb-2">
                            <div class="d-flex justify-content-around mt-2">
                                <b-form-radio class="custom-radio-color"
                                              inline
                                              v-model="appointmentData.appointment_canceled_in_advance_by_patient"
                                              value="true"
                                              name="cancelation">
                                    {{ $t('calendarEvent.appointmentCanceledInAdvanceByPatient') }}
                                </b-form-radio>
                                <b-form-radio class="custom-radio-color"
                                              inline
                                              v-model="appointmentData.appointment_canceled_in_advance_by_clinic"
                                              value="true"
                                              name="cancelation">
                                    {{ $t('calendarEvent.appointmentCanceledInAdvanceByClinic') }}
                                </b-form-radio>
                            </div>
                        </div>
                    </b-modal>
                </div>
            </form>
        </b-modal>
        <FooterStyle1>
            <template v-slot:left>
                <li class="list-inline-item"><a href="#">{{ $t('footer.privacyPolicy') }}</a></li>
                <li class="list-inline-item"><a href="#">{{ $t('footer.termsOfUse') }}</a></li>
            </template>
            <template v-slot:right>
                Copyright {{ new Date().getFullYear() }}
                <a href="https://www.emazing.si/en">Emazing</a> {{ $t('footer.allRightsReserved') }}.
            </template>
        </FooterStyle1>
    </b-container>
</template>
<script>
import IqCard from '../../components/xray/cards/iq-card'
import { xray } from '../../config/pluginInit'
import { getTodaysAppointments, getStaff, getAssignmentsForUser, updateAppointment } from '../../services/homeService'
import moment from 'moment'
import { getLocationsList, getCountriesWithPatients, getDatesForCurrentWeek } from '../../services/commonCodeLists'
import { visitsByCountryInAWeek, getDoctorsStatisticPerWeek } from '../../services/statistics'
import { getProductGroups } from '@/services/products'
import { getDoctorList, getLabels } from '@/services/calendarService'
import { sso } from '@/services/userService'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import _ from 'lodash'
const body = document.getElementsByTagName('body')
export default {
  name: 'Home',
  components: { IqCard, DatePicker },
  data () {
    return {
      doctorsData: [],
      datesForCurrentWeek: [],
      dataForChart: [],
      series: [],
      dates: [],
      colors: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              pan: false,
              zoom: false
            }
          },
          zoom: {
            enabled: true
          }
        },
        colors: ['#089bab', '#ffb177', '#00d0ff', '#e64141', '#00ca00', '#777D74', '#374948', '#6610f2'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ]
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      totalVisits: 0,
      countriesWithPatients: [],
      todaysAppointments: [],
      todaysAppointmentsColumns: [
        { label: this.$t('home.todaysAppointmentsColumn.patient'), key: 'patient_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.productGroup'), key: 'product_group_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.doctor'), key: 'doctor_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.time'), key: 'time', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.contact'), key: 'patient_phone', class: 'text-left' }
      ],
      staff: [],
      a: 13,
      openAssignments: [],
      openAssignmentsColumns: [
        { label: this.$t('home.openAssignmentsColumn.description'), key: 'description', class: 'text-left' },
        { label: this.$t('home.openAssignmentsColumn.patientName'), key: 'patient_name', class: 'text-left' },
        {
          label: this.$t('home.openAssignmentsColumn.dueAt'),
          key: 'due_at',
          class: 'text-center',
          formatter: value => { return moment(value).format('ddd, D MMM') }
        }
      ],
      todaysAppointmentsPerPage: 10,
      currentTodaysAppointmentsPage: 1,
      openAssignmentsPerPage: 5,
      currentOpenAssignmentsPage: 1,
      appointmentData: {
        id: '',
        patient_name: '',
        start_time: '',
        time: '',
        end_time: '',
        note: '',
        patient_attended: '',
        doctor_id: '',
        doctor_name: '',
        location: '',
        patient_id: '',
        product_group: '',
        productGroupName: '',
        crmProduct: '',
        label_id: '',
        backgroundColor: '',
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      },
      selectedDoctor: '',
      selectedProductGroup: '',
      disabled: true,
      locations: [],
      product_groups: [],
      doctors: [],
      appointmentModal: false,
      openCancelationModal: false,
      patient_attend: [
        {
          label: this.$t('calendarEvent.unknown'),
          value: 'Unknown',
          checked: true
        },
        {
          label: this.$t('calendarEvent.attended'),
          value: 'Attended',
          checked: false
        },
        {
          label: this.$t('calendarEvent.notAttended'),
          value: 'Not attended',
          checked: false
        }
      ]
    }
  },
  mounted () {
    xray.index()
    this.getUserLogin()
    this.getCountriesWithPatients()
    this.getDoctorsStatisticPerWeek()
    body[0].classList.add('sidebar-main-menu')
  },
  computed: {
    hideTodaysAppointmentsPagination () {
      return Math.floor(this.todaysAppointments.length / this.todaysAppointmentsPerPage) !== 0
    },
    hideOpenAssignmentsPagination () {
      return Math.floor(this.openAssignments.length / this.openAssignmentsPerPage) !== 0
    }
  },
  methods: {
    getUserLogin () {
      sso().then(response => {
        if (typeof response !== 'string') {
          getTodaysAppointments(this.$i18n.locale).then(response => {
            if (Array.isArray(response)) {
              response.map(appointment => {
                this.todaysAppointments.push({
                  id: appointment.id,
                  patient_name: appointment.patient_name,
                  location: appointment.location,
                  doctor_id: appointment.doctor_id,
                  doctor_name: appointment.doctor_name,
                  product_group: appointment.product_group_name,
                  product_group_id: appointment.product_group_id,
                  product_group_name: appointment.product_group_name,
                  start_time: new Date(appointment.starts_at),
                  time: appointment.time,
                  end_time: new Date(appointment.ends_at),
                  patient_phone: appointment.patient_phone,
                  patient_id: appointment.patient_id,
                  patient_attended: appointment.patient_attended,
                  appointment_canceled_in_advance_by_clinic: false,
                  appointment_canceled_in_advance_by_patient: false
                })
              })
            }
          })
          getStaff().then(response => {
            this.staff = response
          })
          getAssignmentsForUser().then(response => {
            this.openAssignments = response
          })
          getLocationsList().then(response => {
            this.locations = response
          })
          getProductGroups(this.$i18n.locale).then(response => {
            this.product_groups = response
          })
          getDoctorList().then((data) => {
            this.doctors = data
            this.getDatesForCurrentWeek()
          })
          getLabels(this.$i18n.locale).then(response => {
            this.colors = response
          })
        }
      })
    },
    showLabels (item) {
      if (this.disabled && this.appointmentData.label_id === item.id) {
        return true
      } else if (!this.disabled) {
        return true
      }
    },
    getTodaysAppointmentsList (locale) {
      getTodaysAppointments(locale).then(response => {
        this.todaysAppointments = response
      })
    },
    getDatesForCurrentWeek () {
      getDatesForCurrentWeek().then(response => {
        let temp = _.map(response, '?column?')
        this.dates = temp
        this.datesForCurrentWeek = _.map(temp, function (date) {
          return moment(date).format('DD-MM-YYYY')
        })
        this.prepareDataForChart()
      })
    },
    updateAppointment (info) {
      this.todaysAppointments.splice(0, this.todaysAppointments.length)
      this.appointmentData.doctor_id = this.selectedDoctor.id
      this.appointmentData.doctor_name = this.selectedDoctor.name
      this.appointmentData.product_group = this.selectedProductGroup.product_group_id
      this.appointmentData.productGroupName = this.selectedProductGroup.product_group_name
      this.appointmentData.crmProduct = this.selectedProductGroup.crm_product_id
      updateAppointment(this.appointmentData.id, this.appointmentData).then(() => {
        this.disabled = true
        this.appointmentModal = false
        this.getTodaysAppointmentsList(this.$i18n.locale)
      })
    },
    closeCancelation () {
      this.openCancelationModal = false
      this.appointmentData.appointment_canceled_in_advance_by_clinic = false
      this.appointmentData.appointment_canceled_in_advance_by_patient = false
    },
    editMode (e) {
      e.preventDefault()
      this.disabled = false
    },
    checkRadio () {
      if (this.appointmentData.appointment_canceled_in_advance_by_patient) {
        this.appointmentData.appointment_canceled_in_advance_by_clinic = ''
      } else {
        this.appointmentData.appointment_canceled_in_advance_by_patient = ''
      }
    },
    showProps (item, prop) {
      if (this.disabled && prop === item.value) {
        return true
      } else if (!this.disabled) {
        return true
      }
    },
    openAppointmentModal (item) {
      this.appointmentData = item
      this.appointmentModal = true
      this.selectedDoctor = item.doctor_name
      this.selectedProductGroup = item.product_group_name
    },
    getDoctorsStatisticPerWeek () {
      getDoctorsStatisticPerWeek().then(response => {
        this.doctorsData = _.map(response, function (element) {
          let parsedElement = Object.assign({}, element)
          parsedElement.starts_at = moment(parsedElement.starts_at).format('DD-MM-YYYY')
          return parsedElement
        })
      })
    },
    prepareDataForChart () {
      this.doctors.forEach(doctor => {
        let tempObj = {}
        tempObj.name = doctor.name
        tempObj.data = []
        let allDoctorsData = this.doctorsData
        let tempDoctorData = _.filter(allDoctorsData, { doctor_id: doctor.id })
        this.datesForCurrentWeek.forEach(date => {
          let tempArr = _.filter(tempDoctorData, { starts_at: date })
          tempObj.data.push(tempArr.length)
        })
        const isZero = tempObj.data.every(item => item === 0)
        if (!isZero) {
          this.dataForChart.push(tempObj)
        }
      })
      this.chartOptions = { ...this.chartOptions, ...{ series: this.dataForChart, xaxis: { categories: this.dates } } }
    },
    getCountriesWithPatients () {
      getCountriesWithPatients().then(response => {
        this.countriesWithPatients = response
        this.getVisitsByCountryInAWeek()
      })
    },
    getVisitsByCountryInAWeek () {
      visitsByCountryInAWeek().then(response => {
        let visitsByCountry = response
        this.totalVisits = _.sumBy(visitsByCountry, function (o) { return +o.count })
        if (visitsByCountry && Array.isArray(visitsByCountry)) {
          visitsByCountry.forEach(element => {
            element.percentage = (element.count / this.totalVisits * 100).toFixed(2)
          })
        }

        this.countriesWithPatients = _.map(this.countriesWithPatients, function (country) {
          return _.assign(country, _.find(visitsByCountry, {
            name: country.name
          }))
        })
        this.countriesWithPatients = _.filter(this.countriesWithPatients, function (country) {
          return country.hasOwnProperty('percentage')
        })
      })
    }
  }
}
</script>

<style lang="scss">
.pr-bar {
  height: 6px !important;
}

.pr-bar > div {
  background-color: #089bab !important;
}
</style>
