<template>
    <b-container fluid>
        <b-row>
            <b-col lg="8">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" style="height: auto !important;">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.todaysAppointments') }}</h4>
                    </template>
                    <template v-slot:headerAction>
                        <!-- <b-dropdown size="lg p-0"  variant="link" toggle-class="text-decoration-none" no-caret>
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
                    </b-dropdown> -->
                    </template>
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
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" style="height: auto;">
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
                        <a href="javascript:void(0);" class="btn btn-primary d-block mt-3"><i class="ri-add-line"></i>{{ $t('home.staffListBtn') }}</a>
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
                                      label="name"
                                      :reduce="doctor => doctor.id"
                                      class="style-chooser form-control-disabled font-size-16"
                                      v-model="appointmentData.doctor_name"
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
                                      :reduce="product_group => product_group.product_group_id"
                                      class="style-chooser form-control-disabled font-size-16"
                                      v-model="appointmentData.product_group_name"
                                      :options="product_groups"></v-select>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-between w-100 pt-2 " :class="{'mb-3': !disabled}">
                        <div class="col-md-3">
                            <label for="start" class="mb-0">{{ $t('calendarEvent.start') }} *</label>
                        </div>
                        <div class="col-md-9 d-flex align-items-center">
                            <date-picker :disabled="disabled"
                                         class="form-control form-control-disabled font-size-16"
                                         :class="{'no-border margin-left': disabled}"
                                         v-model="appointmentData.date"
                                         type="datetime"
                                         :minute-step="5"
                                         :show-second="false"
                                         :lang="'en'"
                                         :format="'DD.MM.YYYY HH.mm'"></date-picker>
                            <label for="start" class="mb-0">{{ $t('calendarEvent.end') }}*</label>
                            <date-picker :disabled="disabled"
                                         required
                                         class="form-control form-control-disabled font-size-16"
                                         :class="{'no-border': disabled}"
                                         v-model="appointmentData.end_time"
                                         type="time"
                                         :minute-step="5"
                                         :show-second="false"
                                         :lang="'en'"
                                         :format="'DD.MM.YYYY HH.mm'"></date-picker>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                        <div class="col-md-3">
                            <label for="notes">{{ $t('calendarEvent.note') }}</label>
                        </div>
                        <div class="col-md-9">
                            <textarea :disabled="disabled" row="2" v-model="appointmentData.note" class="form-control form-control-disabled font-size-16 mt-3" placeholder="Add your note here for event!" id="note" required></textarea>
                        </div>
                    </div>
                    <template v-if="appointmentData.id">
                        <div class="row align-items-center justify-content-between w-100 pt-1" :class="{'mb-3': !disabled}">
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
                    <div class="row align-items-center justify-content-between w-100 pt-3 mb-3">
                        <div class="col-md-3">
                            <label for="color" class="mt-1 ml-1">{{ $t('calendarEvent.labels') }}</label><br>
                        </div>
                        <div class="col-md-9 mb-1">
                            <template v-for="(item,index) in colors">
                                <b-form-radio class="custom-radio-color font-size-16"
                                              inline
                                              v-model="appointmentData.label"
                                              :color="item.color"
                                              :value="item.value"
                                              :key="index"
                                              v-if="showLabels(item)">
                                    {{ item.text }}
                                </b-form-radio>
                            </template>
                        </div>
                    </div>
                    <template>
                        <div class="cancelation-text font-size-18 mt-3 mb-1 row align-items-center justify-content-center w-100">
                            <p v-if="appointmentData.appointment_canceled_in_advance_by_clinic === true">{{ $t('calendarEvent.appointmentCanceledInAdvanceByClinic') }}</p>
                            <p v-if="appointmentData.appointment_canceled_in_advance_by_patient === true">{{ $t('calendarEvent.appointmentCanceledInAdvanceByPatient') }}</p>
                        </div>
                    </template>
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
    </b-container>
</template>
<script>
import IqCard from '../../components/xray/cards/iq-card'
import { xray } from '../../config/pluginInit'
import { getTodaysAppointments, getStaff, getAssignmentsForUser, updateAppointment } from '../../services/homeService'
import moment from 'moment'
import { getLocationsList } from '../../services/commonCodeLists'
import { getProductGroups } from '@/services/products'
import { getDoctorList, getLabels } from '@/services/calendarService'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

const body = document.getElementsByTagName('body')
export default {
  name: 'Home',
  components: { IqCard, DatePicker },
  data () {
    return {
      chart5: {
        series: [{
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14]
        }],
        // colors: ['#089bab', '#FC9F5B', '#5bc5d1'],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
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
            horizontal: false
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
      todaysAppointments: [],
      todaysAppointmentsColumns: [
        { label: this.$t('home.todaysAppointmentsColumn.patient'), key: 'patient_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.productGroup'), key: 'product_group_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.doctor'), key: 'doctor_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.time'), key: 'time', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.contact'), key: 'patient_phone', class: 'text-left' }
      ],
      staff: [],
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
        date: '',
        end_time: '',
        note: '',
        label: '',
        patient_attended: '',
        doctor_name: '',
        location: '',
        patient_id: '',
        product_group_name: '',
        product_group_id: '',
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      },
      disabled: true,
      locations: [],
      product_groups: [],
      doctors: [],
      colors: [],
      appointmentModal: false,
      openCancelationModal: false,
      patient_attend: [
        {
          label: this.$t('calendarEvent.unknown'),
          value: 'unknown',
          checked: true
        },
        {
          label: this.$t('calendarEvent.attended'),
          value: 'attended',
          checked: false
        },
        {
          label: this.$t('calendarEvent.notAttended'),
          value: 'not_attended',
          checked: false
        }
      ]
    }
  },
  mounted () {
    xray.index()
    this.getTodaysAppointmentsList(this.$i18n.locale)
    this.getStaffList()
    this.getAssignmentsForUserList()
    this.getLocations()
    this.getProductGroups(this.$i18n.locale)
    this.getDoctors()
    this.getLabels(this.$i18n.locale)
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
  destroyed () {
    body[0].classList.remove('sidebar-main-menu')
  },
  methods: {
    getTodaysAppointmentsList (locale) {
      getTodaysAppointments(locale).then(response => {
        response.map(appointment => {
          this.todaysAppointments.push({
            id: appointment.id,
            patient_name: appointment.patient_name,
            location: appointment.location,
            doctor_name: appointment.doctor_name,
            product_group_id: appointment.product_group_id,
            product_group_name: appointment.product_group_name,
            date: new Date(moment(appointment.date).format('YYYY-MM-DD') + 'T' + appointment.time),
            time: appointment.time,
            end_time: new Date(appointment.end_time),
            patient_phone: appointment.patient_phone,
            patient_id: appointment.patient_id
            // backgroundColor: slot.appointment_id ? '#F1773A' : '#64D6E8'
          })
        })
        console.log('Fetching todays appointments on FE: ' + JSON.stringify(response[0]))
      })
    },
    getStaffList () {
      getStaff().then(response => {
        this.staff = response
      })
    },
    getAssignmentsForUserList () {
      getAssignmentsForUser().then(response => {
        this.openAssignments = response
      })
    },
    getLocations () {
      getLocationsList().then(response => {
        this.locations = response
      })
    },
    getProductGroups (lang) {
      getProductGroups(lang).then(response => {
        this.product_groups = response
      })
    },
    getDoctors () {
      getDoctorList().then((data) => {
        this.doctors = data
      })
    },
    updateAppointment () {
      updateAppointment(this.appointmentData.id, this.appointmentData).then(() => {
        console.log('updating event on home page: ' + this.appointmentData.id + ' ' + JSON.stringify(this.appointmentData))
        this.appointmentModal = false
        this.getTodaysAppointmentsList()
      })
    },
    getLabels (lang) {
      getLabels(lang).then(data => {
        data.map(label => {
          this.colors.push({
            id: label.id,
            label: label.type,
            color: label.type.split(' ').join(''),
            value: label.color,
            text: label.text
          })
        })
      })
    },
    closeCancelation () {
      this.openCancelationModal = false
      this.formData.appointment_canceled_in_advance_by_clinic = false
      this.formData.appointment_canceled_in_advance_by_patient = false
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
    showLabels (item) {
      if (this.disabled && this.appointmentData.label_id === item.id) {
        return true
      } else if (!this.disabled) {
        return true
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
      console.log('appointment data:' + JSON.stringify(this.appointmentData))
    }
  },
  watch: {
    '$i18n.locale' () {
      this.getTodaysAppointmentsList(this.$i18n.locale)
      this.getProductGroups(this.$i18n.locale)
      this.getLabels(this.$i18n.locale)
    }
  }
}
</script>

<style scoped>

</style>
