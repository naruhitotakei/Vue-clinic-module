<template>
<b-container fluid>
  <calendar
  :options="calendarOptions"
  id="calendar"
  ref="calendar"
  v-if="isDataLoaded"
  />
  <img v-else src="../../../assets/css/ajax-loader.gif" alt="Smart PRM" class="d-block m-auto"/>

  <!-- Event description modal -->
  <b-modal
      v-model="showModal"
      no-close-on-esc
      no-close-on-backdrop
      size="lg"
      :title="$t('calendar.appointmentDetails')"
      :ok-title="$t('calendar.btnSave')"
      @ok="saveAppointment"
      @close="closeModal"
      cancel-title="$t('calendar.btnCancel')"
      :ok-disabled="isSaveDisabled"
      hide-footer
      >
    <form class="calendar-modal">
        <div class="form-row">
            <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                <div class="col-md-3">
                    <label for="patient" class="pt-1 mb-0">{{ $t('calendarEvent.patient') }} *</label>
                </div>
                <div class="col-md-9">
                    <router-link v-if="disabled" tag="span" :to="'/patients/'+ formData.enquiry_id" style="cursor:pointer;" class="ml-2 text-black style-chooser form-control-disabled font-size-16">{{ formData.patient_name }}</router-link>
                    <v-select v-else
                              :disabled="disabled"
                              :clearable="false"
                              label="full_name"
                              class="style-chooser form-control-disabled font-size-16"
                              v-model="selectedPatient"
                              :options="patients"
                              @input="findPatientsDoctor"
                              style="max-height: 400px;">
                    </v-select>
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
                              :reduce="location => location.city"
                              class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                              v-model="formData.location"
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
                              :reduce="product_group => product_group.product_group_id"
                              class="style-chooser form-control-disabled font-size-16"
                              v-model="formData.product_groups"
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
                                 v-model="formData.assignmentDate"
                                 type="datetime"
                                 :minute-step="5"
                                 :show-second="false"
                                 :lang="'en'"
                                 :format="'DD.MM.YYYY HH.mm'"></date-picker>
                    <label for="start" class="mb-0 mr-3 ml-4">{{ $t('calendarEvent.end') }}*</label>
                    <date-picker :disabled="disabled"
                                 required
                                 class="form-control form-control-disabled font-size-16"
                                 :class="{'no-border': disabled}"
                                 v-model="formData.end"
                                 type="time"
                                 :minute-step="5"
                                 :show-second="false"
                                 :lang="'en'"
                                 :format="'HH.mm'"></date-picker>
                </div>
            </div>
            <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                <div class="col-md-3">
                    <label for="notes">{{ $t('calendarEvent.note') }}</label>
                </div>
                <div class="col-md-9">
                    <textarea :disabled="disabled" row="2" v-model="formData.notes" class="form-control form-control-disabled font-size-16 mt-3" placeholder="Add your note here for event!" id="note" required></textarea>
                </div>
            </div>
            <template v-if="formData.id">
                <div class="row align-items-center justify-content-between w-100 pt-1" :class="{'mb-3': !disabled}">
                    <div class="col-md-3">
                        <label for="color" class="mb-0">{{ $t('calendarEvent.patient_attended') }}</label><br>
                    </div>
                    <div class="col-md-9">
                        <template v-for="(item,index) in patient_attend">
                            <b-form-radio class="custom-radio-patient font-size-16"
                                          inline
                                          v-model="formData.patient_attended"
                                          :value="item.value"
                                          :key="index"
                                          v-if="showProps(item, formData.patient_attended)">
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
                        <b-form-radio class="custom-radio-color font-size-16 labels"
                                      inline
                                      v-model="formData.backgroundColor"
                                      :key="index"
                                      :value="item.id"
                                      :style="{'background': item.color}"
                                      name="labels"
                                      v-if="showLabels(item)">
                            <p class="text-white m-0 py-1 pr-2">{{ item.text }}</p>
                        </b-form-radio>
                    </template>
                </div>
            </div>
            <template>
            </template>
            <template>
                <div class="cancelation-text font-size-18 mt-3 mb-1 row align-items-center justify-content-center w-100">
                    <p v-if="formData.appointment_canceled_in_advance_by_clinic === true">{{ $t('calendarEvent.appointmentCanceledInAdvanceByClinic') }}</p>
                    <p v-if="formData.appointment_canceled_in_advance_by_patient === true">{{ $t('calendarEvent.appointmentCanceledInAdvanceByPatient') }}</p>
                </div>
            </template>
            <div class="modal-footer modal-footer-bt" style="width: 100%;">
                <template v-if="disabled">
                    <button v-if="formData.appointment_canceled_in_advance_by_clinic === false && formData.appointment_canceled_in_advance_by_patient === false || openCancelationModal === true" type="button" class="btn btn-secondary" @click="openCancelationModal = true">{{ $t('calendar.btnCancelation') }}</button>
                    <button type="button" class="btn btn-secondary" @click="$emit('setModalShow', false), formData = defaultAppointment">{{ $t('calendar.btnClose') }}</button>
                    <button type="button" class="btn btn-secondary" @click="editMode">{{ $t('calendar.btnEdit') }}</button>
                    <button type="button" class="btn btn-primary" @click="viewPatient(formData.enquiry_id)">{{ $t('calendar.btnEPR') }}</button>
                </template>
                <template v-if="!disabled">
                    <p v-if="isSaveDisabled" class="mt-1 mr-4 text-black">{{ $t('calendarEvent.requiredFields') }}</p>
                    <button type="button" class="btn btn-secondary" @click="$emit('setModalShow', false), formData = defaultAppointment">{{ $t('calendar.btnCancel') }}</button>
                    <button type="button" class="btn btn-primary" @click="saveAppointment">{{ $t('calendar.btnSave') }}</button>
                </template>
            </div>
            <b-modal v-model="openCancelationModal"
                     :ok-title="$t('calendar.btnCancel')"
                     :cancel-title="$t('calendar.btnClose')"
                     :title="$t('calendar.btnCancelation')"
                     @ok="saveAppointment"
                     @close="closeCancelation"
                     @cancel="closeCancelation">
                <div class="col-md-12 mb-2">
                    <div class="d-flex justify-content-around mt-2">
                        <b-form-radio class="custom-radio-color"
                                      inline
                                      v-model="formData.appointment_canceled_in_advance_by_patient"
                                      value="true"
                                      name="cancelation">
                            {{ $t('calendarEvent.appointmentCanceledInAdvanceByPatient') }}
                        </b-form-radio>
                        <b-form-radio class="custom-radio-color"
                                      inline
                                      v-model="formData.appointment_canceled_in_advance_by_clinic"
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
import '@fullcalendar/core/vdom'
import calendar from '@fullcalendar/vue'
import resourceTimeGrid from '@fullcalendar/resource-timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import slLocale from '@fullcalendar/core/locales/sl'
import enLocale from '@fullcalendar/core/locales/en-gb'
import { xray } from '../../../config/pluginInit'
import { getPatients } from '../../../services/enquiry'
import { getLocationsList } from '../../../services/commonCodeLists'
import { getProductGroups } from '@/services/products'
import {
  createCalendar,
  getDoctorList,
  updateCalendar,
  updateCalendarLabel,
  getLabels
} from '@/services/calendarService'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: {
    calendar, DatePicker
  },
  props: {
    resourcesOuter: Array,
    events: Array,
    modalShow: Object,
    selectDoctor: Object
  },
  data () {
    return {
      eventInfo: '',
      eventResourceId: '',
      patientData: '',
      patients: [],
      selectedDoctor: '',
      selectedPatient: '',
      product_groups: [],
      disabled: true,
      showModal: false,
      openCancelationModal: false,
      locations: [],
      doctors: [],
      state: [
        {
          label: 'Attended',
          value: true
        },
        {
          label: 'Not Attended',
          value: false
        }
      ],
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
      ],
      appointment_canceled_in_advance_by_patient: [
        {
          label: this.$t('calendarEvent.appointmentCanceledInAdvanceByPatient'),
          checked: false
        }
      ],
      appointment_canceled_in_advance_by_clinic: [
        {
          label: this.$t('calendarEvent.appointmentCanceledInAdvanceByClinic'),
          checked: false
        }
      ],
      isDataLoaded: false,
      colors: [],
      formData: {
        id: '',
        title: '',
        assignmentDate: '',
        start: '',
        end: '',
        notes: '',
        backgroundColor: '',
        patient_attended: '',
        patient_id: '',
        patient_name: '',
        doctor_id: '',
        doctor_name: '',
        location: '',
        enquiry_id: '',
        product_groups: '',
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      },
      calendarApi: null,
      modalTitle: '',
      // modalShow: false,
      viewName: 'resourceTimeGridWeek',
      event: {},
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGrid, listPlugin],
        defaultAllDay: false,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay'
        },
        initialView: 'resourceTimeGridWeek',
        resources: this.resourcesOuter,
        slotMinTime: '09:00:00',
        slotMaxTime: '21:30:00',
        slotDuration: '00:15:00',
        allDaySlot: false,
        editable: true,
        selectable: true,
        firstDay: 1,
        events: [],
        displayEventTime: false,
        datesAboveResources: true,
        select: this.openCreateModal,
        eventClick: this.openUpdateModal,
        eventDrop: this.eventDrop,
        eventResize: this.eventResize,
        datesSet: this.onViewChange,
        slotLabelInterval: '01:00:00',
        eventMinHeight: 5,
        expandRows: true,
        nowIndicator: true
      }
    }
  },
  watch: {
    'formData.assignmentDate' () {
      if (!this.formData.id && !this.formData.end) {
        this.formData.end = this.formData.assignmentDate
      }
    },
    '$i18n.locale' () {
      this.getProductGroups(this.$i18n.locale)
      this.getLabels(this.$i18n.locale)
    },
    'modalShow.show' () {
      if (!this.formData.id) {
        this.disabled = false
        // this.formData.doctorId = this.selectDoctor.title
        // this.formData.assignmentDate = moment(new Date()).format('YYYY-MM-DDTHH:mm')
      }
      this.showModal = this.modalShow.show
    },
    'formData.appointment_canceled_in_advance_by_clinic' () {
      if (this.formData.appointment_canceled_in_advance_by_clinic) {
        this.formData.appointment_canceled_in_advance_by_patient = false
      }
    },
    'formData.appointment_canceled_in_advance_by_patient' () {
      if (this.formData.appointment_canceled_in_advance_by_patient) {
        this.formData.appointment_canceled_in_advance_by_clinic = false
      }
    },
    'selectDoctor' () {
      this.$nextTick(() => {
        this.formData.doctorId = this.selectDoctor.title
      })
    },
    'colorsLabel' () {
      this.colors = this.colorsLabel
    },
    'events' (events) {
      if (events.length) {
        if (this.calendarApi && this.calendarApi.options) {
          this.calendarApi.options.events = events
          this.calendarApi.render()
        } else {
          this.calendarOptions.events = events
        }
      }
    },
    'isDataLoaded' (data) {
      if (data) {
        this.$nextTick(() => {
          this.calendarApi = this.$refs.calendar.getApi()
          this.calendarApi.render()
        })
      }
    },
    '$refs.calendar' () {
    },
    'isSelectable' () {
      if (this.calendarApi) this.calendarApi.setOption('selectable', this.isSelectable)
    },
    'resourcesOuter' (newResources) {
      this.calendarOptions.resources = newResources
      if (this.calendarApi) {
        this.calendarApi.render()
      }
    },
    'eventAndResources' (data) {
      if (data.events.length > 0 && data.resources.length > 0) {
        this.isDataLoaded = true
      }
    }
  },
  computed: {
    /* detectMinTime () {
      return this.events.filter(event => {
        if (new Date(moment(event.time).format('HH:mm:ss')) < new Date('09:00:00')) {
          return event.time
        } else {
          return '09:00:00'
        }
      })
    }, */
    calendarLocale () {
      return this.$i18n.locale === 'sl' ? slLocale : enLocale
    },
    isSelectable () {
      return !this.viewName.includes('dayGridMonth')
    },
    getEvents () {
      return this.events
    },
    getColors () {
      return this.colorsLabel
    },
    isSaveDisabled () {
      return !this.selectedPatient || !this.formData.location || !this.selectedDoctor || !this.formData.product_groups || !this.formData.assignmentDate || !this.formData.end
    },
    eventAndResources () {
      return {
        events: this.events,
        resources: this.resourcesOuter
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$forceUpdate()
      this.$emit('updateApp')
    })
    this.getPatients()
    this.getDoctors()
    this.getLocations()
    this.getProductGroups(this.$i18n.locale)
    this.getLabels(this.$i18n.locale)
    xray.index()
  },
  methods: {
    findPatientsDoctor (patient) {
      if (!this.selectedDoctor) {
        this.selectedDoctor = this.doctors.find(doctor => doctor.id === patient.prm_dentist_user_id)
      }
    },
    closeCancelation () {
      this.openCancelationModal = false
      this.formData.appointment_canceled_in_advance_by_clinic = false
      this.formData.appointment_canceled_in_advance_by_patient = false
    },
    getLabels (lang) {
      getLabels(lang).then(response => {
        this.colors = response
      })
    },
    closeModal () {
      this.$emit('setModalShow', false)
      this.formData = this.defaultAppointment()
      this.selectedDoctor = null
    },
    updateCalendar (id, appointment) {
      updateCalendar(id, appointment).then(() => {
        this.$emit('updateApp')
      })
    },
    updateCalendarLabel (id, appointment) {
      updateCalendarLabel(id, appointment).then(() => {
        // this.$emit('updateApp')
      })
    },
    checkRadio () {
      if (this.formData.appointment_canceled_in_advance_by_patient) {
        this.formData.appointment_canceled_in_advance_by_clinic = ''
      } else {
        this.formData.appointment_canceled_in_advance_by_patient = ''
      }
    },
    showProps (item, prop) {
      if (this.disabled && prop === item.value) {
        return true
      } else if (!this.disabled) {
        return true
      }
    },
    showLabels (item) {
      if (this.disabled && this.formData.label_id === item.id) {
        return true
      } else if (!this.disabled) {
        return true
      }
    },
    getProductGroups (lang) {
      getProductGroups(lang).then(response => {
        this.product_groups = response
      })
    },
    editMode (e) {
      e.preventDefault()
      this.disabled = false
    },
    viewPatient (id) {
      this.$router.push(`/patients/${id}`)
    },
    getPatients () {
      getPatients().then(response => {
        this.patients = response
      })
    },
    getLocations () {
      getLocationsList().then(response => {
        this.locations = response
      })
    },
    getDoctors () {
      getDoctorList().then((data) => {
        this.doctors = data
      })
    },
    onViewChange (info) {
      this.viewName = info.view.type
    },
    eventResize (info) {
      let event = this.calendarApi.getEventById(info.event.id)
      this.formData.id = event.id
      this.formData.assignmentDate = event.start
      this.formData.end = event.end
      this.updateCalendar(this.formData.id, this.formData, () => {
        event.setStart(this.formData.start)
        event.setEnd(this.formData.end)
      }, () => info.revert())
    },
    eventDrop (info) {
      if (info.view.type === 'dayGridMonth') {
        let event = this.calendarApi.getEventById(info.event.id)
        this.formData.id = event.id
        this.formData.assignmentDate = event.start
        this.formData.end = event.end
        this.formData.time = new Date(event.start).toTimeString()
        this.updateCalendar(this.formData.id, this.formData, () => {
          event.setExtendedProp('assignmentDate', this.formData.assignmentDate)
          event.setStart(this.formData.start)
          event.setEnd(this.formData.end)
        }, () => info.revert())
      } else {
        let event = this.calendarApi.getEventById(info.event.id)
        // newResource is null when you move within same resource
        let newResource = info.newResource ? this.calendarApi.getResourceById(info.newResource.id) : this.selectedDoctor
        this.formData.id = event.id
        this.formData.assignmentDate = event.start
        this.formData.end = event.end
        this.formData.doctor_id = newResource.id
        this.formData.doctor_name = newResource.title
        this.updateCalendar(this.formData.id, this.formData, () => {
          event.setExtendedProp('assignmentDate', this.formData.assignmentDate)
          event.setStart(this.formData.start)
          event.setEnd(this.formData.end)
          event.setProp('doctor_id', this.formData.doctor_id)
          event.setProp('doctor_name', this.formData.doctor_name)
        }, () => info.revert())
      }
    },
    defaultAppointment () {
      return {
        id: '',
        title: '',
        assignmentDate: '',
        start: '',
        end: '',
        notes: '',
        backgroundColor: '',
        patient_attended: '',
        patient_id: '',
        patient_name: '',
        doctor_id: '',
        doctor_name: '',
        location: this.locations.length === 1 ? this.locations[0].city : '',
        enquiry_id: '',
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      }
    },
    calculateEndDate (startDate, hours, minutes) {
      return moment(startDate).add(hours, 'hours').add(minutes, 'minutes').format('YYYY-MM-DDTHH:mm')
    },
    saveAppointment () {
      this.formData.doctor_id = this.selectedDoctor.id
      this.formData.doctor_name = this.selectedDoctor.name
      this.formData.patient_id = this.selectedPatient.id
      this.modalTitle = this.selectedPatient.full_name
      if (!this.formData.id) {
        createCalendar(this.formData).then(() => {
          this.$emit('updateApp')
          this.formData = this.defaultAppointment()
          this.$emit('setModalShow', false)
        })
      } else {
        let event = this.calendarApi.getEventById(this.formData.id)
        event.setProp('title', this.formData.title)
        event.setExtendedProp('backgroundColor', this.formData.backgroundColor)
        event.setExtendedProp('doctor_id', this.formData.doctor_id)
        event.setStart(this.formData.assignmentDate)
        event.setEnd(this.formData.end)
        event.setExtendedProp('assignmentDate', this.formData.assignmentDate)
        event.setExtendedProp('start', this.formData.assignmentDate)
        event.setExtendedProp('notes', this.formData.notes)
        event.setExtendedProp('patient_id', this.formData.patient_id)
        event.setExtendedProp('doctor_name', this.formData.doctor_name)
        event.setExtendedProp('location', this.formData.location)
        this.updateCalendar(this.formData.id, this.formData)
        // this.updateCalendarLabel(this.formData.id, this.formData)
        this.formData = this.defaultAppointment()
        this.$emit('setModalShow', false)
      }
    },
    openCreateModal (selectionInfo) {
      this.disabled = false
      this.formData = this.defaultAppointment()
      this.modalTitle = ''
      this.$emit('setModalShow', true)
      // this.formData.resourceId = selectionInfo.resource.id
      this.selectedDoctor = this.doctors.find(doctor => doctor.id === +selectionInfo.resource.id)
      // this.formData.doctorId = selectionInfo.resource.title
      // this.formData.eventResourceId = selectionInfo.resource.id
      this.formData.assignmentDate = new Date(selectionInfo.startStr)
      this.formData.end = new Date(selectionInfo.endStr)
      // this.setAssignmentDateAndDuration(selectionInfo.start, selectionInfo.end)
    },
    setAssignmentDateAndDuration (start, end) {
      this.formData.assignmentDate = moment(start).format('YYYY-MM-DDTHH:mm')
      let temp = moment.duration(moment(end).diff(moment(start))).asHours()
      let hourseAndMinutes = this.getHoursAndMinutes(temp)
      this.formData.hours = hourseAndMinutes.hours
      this.formData.minutes = hourseAndMinutes.minutes
      this.formData.start = start
      this.formData.end = end
    },
    getHoursAndMinutes (hours) {
      if (hours === 24) {
        return { hours: 0, minutes: 0 }
      } else if (hours > 1) {
        let tempHours = hours.toFixed(2).toString().split('.')
        if (tempHours.length === 1) {
          return { hours: tempHours[0], minutes: 0 }
        }
        return { hours: tempHours[0], minutes: 60 / 100 * tempHours[1] }
      } else if (hours === 1) {
        return { hours: 1, minutes: 0 }
      } else {
        return { hours: 0, minutes: 60 * hours }
      }
    },
    openUpdateModal (selectionInfo) {
      // this.modalShow = true
      this.$emit('setModalShow', true)
      this.disabled = true
      let event = this.calendarApi.getEventById(selectionInfo.event.id)
      let location = this.locations.find(item => item.city === event.extendedProps.location)
      let label = this.colors.find(color => color.id === event.extendedProps.backgroundColor)
      this.formData = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: label,
        doctor_id: event.extendedProps.doctor_id,
        doctor_name: event.extendedProps.doctor_name,
        patient_id: event.extendedProps.patient_id,
        patient_name: event.extendedProps.patient_name,
        // eventResourceId: event.extendedProps.eventResourceId,
        location: location,
        ...event.extendedProps,
        assignmentDate: new Date(event.extendedProps.assignmentDate)

      }
      this.selectedDoctor = event.extendedProps.doctorId
      this.selectedPatient = event.extendedProps.patientId.full_name
      this.modalTitle = this.formData.title
    }
  }
}
</script>

<style lang="scss">
@import '~@fullcalendar/common/main.css';
.fc-col-header, .fc-timegrid-body, .fc-timegrid-slots table {
  min-width: 100%;
}
.fc-timegrid-slot {
    line-height: 0 !important;
}
.fc .fc-timegrid-now-indicator-container {
  overflow: visible !important;
}
.fc-timegrid-cols table {
  height: 100% !important;
  width: 100% !important;
}

.fc-day-today {
    background-color: #08a4b4;
    color: white;
}

.fc-event{
  cursor: pointer;
  white-space: pre;
}
.fc-license-message{
  display:none;
}

.fc-toolbar-title {
    font-size: 1.625em !important;
}

::-webkit-scrollbar {
    display: none;
}

.fc-scroller {
  min-height: 0 !important;
}

th {
  text-align: center !important;
}
.fc-col-header-cell.fc-resource {
  writing-mode:  vertical-lr !important;
  transform: rotate(180deg) !important;
  line-height: 13px !important;
  vertical-align: middle !important;
}
body .wrapper .custom-control-label::before {
  top:50% !important;
}
body .wrapper .custom-control-label::after {
  top:50% !important;
}

.calendar-modal-input__hour {
  position: relative;
  &:after {
    content: "h";
    width: 29px;
    height: 26px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    right: -35px;
    display: block;
  }
}
.calendar-modal-input__minutes {
  position: relative;
  &:after {
    content: "min";
    width: 29px;
    height: 26px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    right: -42px;
    display: block;
  }
}

.custom-radio-color label,
.custom-radio-patient label {
  &:after,
  &:before{
    top:50% !important;
  }
}

.calendar-modal .form-control-disabled{
  &:disabled {
    background-color: transparent !important;
    border: none !important;
    &>div {
      background-color: transparent !important;
      border: none !important;
    }

    &::placeholder {
      color: transparent;
    }
  }

  input:disabled  {
    background-color: transparent !important;
    border:none;
  }
}

 .calendar-modal .vs--disabled {
  &>div {
    background-color: transparent !important;
    border:none;
    .vs__selected {
      background: transparent !important;
    }
    .vs__actions {
      display: none;
    }
  }
}

 .form-control .mx-input {
   border: none;
   box-shadow: none;
 }

 .fc-widget-content .fc-scroller {
   overflow: visible !important;
   height: auto !important;
 }

 .vs__dropdown-menu {
   max-height: 300px !important;
 }

 .no-border {
     border: none !important;
 }

.margin-left {
    margin-left: -0.775rem !important;
}

.cancelation-text {
    color: red;
}

.labels {
    border-radius: 10px !important;
    margin: .225rem !important;
}
  /* @import '~@fullcalendar/daygrid/main.css';
  // @import '~@fullcalendar/timegrid/main.css';
  // @import '~@fullcalendar/list/main.min.css'; */
</style>
