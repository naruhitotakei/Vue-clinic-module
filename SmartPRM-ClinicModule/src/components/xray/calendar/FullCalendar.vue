<template>
<b-container fluid>
  <calendar
  :datesAboveResources="true"
  :defaultView="calendarOptions.defaultView"
  :plugins="calendarOptions.plugins"
  :events="getEvents"
  :resources="resourcesOuter"
  :minTime="calendarOptions.minTime"
  :maxTime="calendarOptions.maxTime"
  :allDaySlot="calendarOptions.allDaySlot"
  :slotDuration="calendarOptions.slotDuration"
  :selectable="isSelectable"
  editable="true"
  :header="calendarOptions.header"
  :allDayDefault="false"
  @select="openCreateModal"
  @eventClick="openUpdateModal"
  @datesRender="onViewChange"
  @eventResize="eventResize"
  @eventDrop="eventDrop"
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
      hide-footer
      >
    <form class="calendar-modal">
        <div class="form-row">
            <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                <div class="col-md-3">
                    <label for="patient" class="mb-0">{{ $t('calendarEvent.patient') }}</label>
                </div>
                <div class="col-md-9">
                    <v-select :disabled="disabled"
                              :clearable="false"
                              label="full_name"
                              :reduce="patient => patient.id"
                              class="style-chooser form-control-disabled font-size-16"
                              v-model="formData.patientId"
                              :options="patients"
                              style="max-height: 400px;">
                    </v-select>
                </div>
            </div>
            <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                <div class="col-md-3">
                    <label for="location" class="ml-0 mb-0">{{ $t('calendarEvent.location') }}</label>
                </div>
                <div class="col-md-9">
                    <v-select :disabled="disabled"
                              :clearable="false"
                              label="city"
                              :reduce="location => location.id"
                              class="style-chooser form-control-disabled font-size-16"
                              v-model="formData.locationId"
                              :options="locations"
                              style="min-width:305px;"></v-select>
                </div>
            </div>
            <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                <div class="col-md-3">
                    <label for="doctor" class="mr-2 mb-0">{{ $t('calendarEvent.doctor') }}</label>
                </div>
                <div class="col-md-9">
                    <v-select :disabled="disabled"
                              :clearable="false"
                              label="name"
                              :reduce="doctor => doctor.id"
                              class="style-chooser form-control-disabled font-size-16"
                              v-model="formData.doctorId"
                              :options="doctors"
                              style="min-width: 305px;"></v-select>
                </div>
            </div>
            <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                <div class="col-md-3 pl-3 pr-0">
                    <label for="patient" class="mb-0">{{ $t('calendarEvent.product_group') }}</label>
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
            <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                <div class="col-md-3">
                    <label for="start" class="mb-0">{{ $t('calendarEvent.start') }}</label>
                </div>
                <div class="col-md-9 d-flex align-items-center">
                    <date-picker :disabled="disabled"
                                 class="form-control form-control-disabled font-size-16"
                                 v-model="formData.assignmentDate"
                                 type="datetime"
                                 :minute-step="5"
                                 :show-second="false"
                                 :lang="'en'"
                                 :format="'DD.MM.YYYY HH.mm'"></date-picker>
                    <label for="start" class="mb-0 ml-5 mr-2">{{ $t('calendarEvent.end') }}</label>
                    <date-picker :disabled="disabled"
                                 required
                                 class="form-control form-control-disabled font-size-16"
                                 v-model="formData.end"
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
                    <textarea :disabled="disabled" row="2" v-model="formData.notes" class="form-control form-control-disabled font-size-16" placeholder="Add your note here for event!" id="note" required></textarea>
                </div>
            </div>
            <template v-if="formData.id">
                <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
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
            <template v-if="formData.id">
                <div class="row align-items-center justify-content-between w-100" :class="{'mb-3': !disabled}">
                    <div class="col-md-3">
                        <label for="title">{{ $t('assignments.addAssignmentsModal.appointmentCanceledInAdvanceByClinic') }} </label>
                    </div>
                    <div class="col-md-9">
                        <template v-for="(item,index) in appointment_canceled_in_advance_by_clinic">
                            <b-form-radio class="custom-radio-patient font-size-16"
                                          inline
                                          v-model="formData.appointment_canceled_in_advance_by_clinic"
                                          :value="item.value"
                                          :key="index"
                                          v-if="showProps(item, formData.appointment_canceled_in_advance_by_clinic)">
                                {{ item.label }}
                            </b-form-radio>
                        </template>
                    </div>
                </div>
                <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                    <div class="col-md-3">
                        <label for="title">{{ $t('assignments.addAssignmentsModal.appointmentCanceledInAdvanceByPatient') }} </label>
                    </div>
                    <div class="col-md-9">
                        <template v-for="(item,index) in appointment_canceled_in_advance_by_patient">
                            <b-form-radio class="custom-radio-patient font-size-16"
                                          inline
                                          v-model="formData.appointment_canceled_in_advance_by_patient"
                                          :value="item.value"
                                          :key="index"
                                          :click="checkRadio"
                                          v-if="showProps(item, formData.appointment_canceled_in_advance_by_patient)">
                                {{ item.label }}
                            </b-form-radio>
                        </template>
                    </div>
                </div>
            </template>
            <div class="row align-items-center justify-content-between w-100 mb-3">
                <div class="col-md-3">
                    <label for="color">{{ $t('calendarEvent.labels') }}</label><br>
                </div>
                <div class="col-md-9">
                    <template v-for="(item,index) in colors">
                        <b-form-radio class="custom-radio-color font-size-16"
                                      inline
                                      v-model="formData.backgroundColor"
                                      :color="item.color"
                                      :value="item.value"
                                      :key="index"
                                      v-if="showLabels(item)">
                            {{ item.label }}
                        </b-form-radio>
                    </template>
                </div>
            </div>
            <div class="modal-footer modal-footer-bt" style="width: 100%;">
                <template v-if="disabled">
                    <button type="button" class="btn btn-secondary" @click="$emit('setModalShow', false), formData = defaultAppointment">{{ $t('calendar.btnClose') }}</button>
                    <button type="button" class="btn btn-secondary" @click="editMode">{{ $t('calendar.btnEdit') }}</button>
                    <button type="button" class="btn btn-primary" @click="viewPatient(formData.enquiry_id)">{{ $t('calendar.btnEPR') }}</button>
                </template>
                <template v-if="!disabled">
                    <button type="button" class="btn btn-secondary" @click="$emit('setModalShow', false), formData = defaultAppointment">{{ $t('calendar.btnClose') }}</button>
                    <button type="button" class="btn btn-primary" @click="saveAppointment">{{ $t('calendar.btnSave') }}</button>
                </template>
            </div>
        </div>
    </form>
  </b-modal>
</b-container>
</template>
<script>
import calendar from '@fullcalendar/vue'
import resourceTimeGrid from '@fullcalendar/resource-timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
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
// import { getDentists } from '../../../services/userService'
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
      product_groups: [],
      disabled: true,
      showModal: false,
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
          label: 'Unknown',
          value: 'unknown',
          checked: true
        },
        {
          label: 'Attended',
          value: 'attended',
          checked: false
        },
        {
          label: 'Not Attended',
          value: 'not_attended',
          checked: false
        }
      ],
      appointment_canceled_in_advance_by_clinic: [
        {
          label: 'Canceled',
          value: true,
          checked: false
        }
      ],
      appointment_canceled_in_advance_by_patient: [
        {
          label: 'Canceled',
          value: true,
          checked: false
        }
      ],
      isDataLoaded: false,
      colors: [],
      formData: {
        title: '',
        assignmentDate: '',
        start: '',
        end: '',
        hours: '',
        minutes: '',
        notes: '',
        backgroundColor: '',
        patient_attended: '',
        resourceId: '',
        eventResourceId: '',
        patientId: '',
        doctorId: '',
        locationId: '',
        enquiry_id: '',
        product_groups: '',
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      },
      calendarApi: null,
      modalTitle: '',
      // modalShow: false,
      viewName: 'dayGridMonth',
      event: {},
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGrid, listPlugin],
        allDayDefault: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay'
        },
        timeZone: 'UTC',
        defaultView: 'resourceTimeGridWeek',
        resources: this.resourcesOuter,
        minTime: '09:00:00',
        maxTime: '21:30:00',
        slotDuration: '00:15:00',
        allDaySlot: false,
        editable: true,
        selectable: true,
        events: []
      }
    }
  },
  watch: {
    'formData.assignmentDate' () {
      if (!this.formData.id) {
        // this.formData.end = this.formData.assignmentDate
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
    'events' () {
      if (this.events.length) {
        this.isDataLoaded = true
        this.$nextTick(() => {
          this.calendarApi = this.$refs.calendar.getApi()
        })
      }
    },
    '$refs.calendar' () {
    }
  },
  computed: {
    isSelectable () {
      return !this.viewName.includes('dayGridMonth')
    },
    getEvents () {
      return this.events
    },
    getColors () {
      return this.colorsLabel
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
    getLabels (lang) {
      getLabels(lang).then(data => {
        data.map(label => {
          this.colors.push({
            id: label.id,
            label: label.type,
            color: label.type.split(' ').join(''),
            value: label.color
          })
        })
      })
    },
    closeModal () {
      this.$emit('setModalShow', false)
      this.formData = this.defaultAppointment()
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
      // this.setAssignmentDateAndDuration(info.event.start, info.event.end)
      this.formData.assignmentDate = event.start
      this.formData.end = event.end
      event.setStart(this.formData.start)
      event.setEnd(this.formData.end)
      event.setExtendedProp('hours', this.formData.hours)
      event.setExtendedProp('minutes', this.formData.minutes)
      this.updateCalendar(this.formData.id, this.formData)
    },
    eventDrop (info) {
      let event = this.calendarApi.getEventById(info.event.id)
      // console.log('res pre: ' + JSON.stringify(event.extendedProps.eventResourceId))
      // console.log('doc pre: ' + JSON.stringify(event.extendedProps.doctorId))
      // console.log('novi res id je: ' + JSON.stringify(info.event.extendedProps.eventResourceId))
      // console.log('novi doctor id je: ' + JSON.stringify(info.event.extendedProps.doctorId))
      // this.setAssignmentDateAndDuration(info.event.start, info.event.end)
      this.formData.assignmentDate = event.start
      this.formData.end = event.end
      this.formData.time = new Date(event.start).toTimeString()
      event.setExtendedProp('assignmentDate', this.formData.assignmentDate)
      event.setStart(this.formData.start)
      event.setEnd(this.formData.end)
      event.setExtendedProp('eventResourceId', info.newResource && +info.newResource.id)
      event.setExtendedProp('doctorId', info.newResource && +info.newResource.id)
      // this.updateCalendar(+event.id, this.formData)
    },
    defaultAppointment () {
      return {
        id: null,
        title: '',
        assignmentDate: '',
        start: '',
        end: '',
        hours: '0',
        minutes: '15',
        notes: '',
        backgroundColor: '#64D6E8',
        patient_attended: 'unknown',
        resourceId: '',
        eventResourceId: '',
        patientId: '',
        doctorId: '',
        locationId: this.locations.length === 1 ? this.locations[0].city : '',
        enquiry_id: ''
      }
    },
    calculateEndDate (startDate, hours, minutes) {
      return moment(startDate).add(hours, 'hours').add(minutes, 'minutes').format('YYYY-MM-DDTHH:mm')
    },
    saveAppointment () {
      if (this.formData.patientId && this.formData.doctorId && this.formData.assignmentDate) {
        this.disabled = true
        let id = this.calendarApi.getEvents().length + 1
        this.formData.resourceId = this.formData.doctorId
        if (!this.formData.appointment_canceled_in_advance_by_clinic) {
          this.formData.appointment_canceled_in_advance_by_clinic = false
        }
        if (!this.formData.appointment_canceled_in_advance_by_patient) {
          this.formData.appointment_canceled_in_advance_by_patient = false
        }
        if (typeof this.formData.patientId === 'object') {
          this.formData.patientId = this.formData.patientId.id
        } else {
          let title = this.patients.find(item => item.id === this.formData.patientId)
          this.modalTitle = title.full_name
          this.formData.title = title.full_name
        }
        if (typeof this.formData.doctorId === 'number') {
          let doctor = this.doctors.find(doctor => doctor.id === this.formData.doctorId)
          this.formData.doctorId = doctor.name
        }
        if (typeof this.formData.locationId === 'number') {
          let location = this.locations.find(location => location.id === this.formData.locationId)
          this.formData.locationId = location.city
        }
        if (typeof this.formData.product_groups === 'object') {
          this.formData.product_groups = this.formData.product_groups.product_group_id
        }
        if (typeof this.formData.backgroundColor === 'string') {
          let label = this.colors.find(label => {
            return label.value === this.formData.backgroundColor
          })
          this.formData.backgroundColor = label
        }

        if (!this.formData.id) {
          this.calendarApi.addEvent({
            id: id,
            title: this.formData.title,
            assignmentDate: this.formData.assignmentDate,
            start: this.formData.assignmentDate,
            end: this.formData.end,
            hours: this.formData.hours,
            minutes: this.formData.minutes,
            notes: this.formData.notes,
            product_groups: this.formData.product_groups,
            appointment_canceled_in_advance_by_clinic: this.formData.appointment_canceled_in_advance_by_clinic,
            appointment_canceled_in_advance_by_patient: this.formData.appointment_canceled_in_advance_by_patient,
            patient_attended: this.formData.patient_attended,
            backgroundColor: this.formData.backgroundColor,
            resourceId: this.formData.resourceId,
            eventResourceId: this.formData.resourceId,
            patientId: this.formData.patientId,
            doctorId: this.formData.doctorId,
            locationId: this.formData.locationId
          })
          createCalendar(this.formData).then((data) => {
            this.$emit('updateApp')
            this.formData = this.defaultAppointment()
            this.$emit('setModalShow', false)
          })
        } else {
          let event = this.calendarApi.getEventById(this.formData.id)
          event.setProp('title', this.formData.title)
          event.setProp('backgroundColor', this.formData.backgroundColor)
          event.setProp('resourceId', this.formData.resourceId)
          event.setStart(this.formData.assignmentDate)
          event.setEnd(this.formData.end)
          event.setExtendedProp('assignmentDate', this.formData.assignmentDate)
          event.setExtendedProp('start', this.formData.assignmentDate)
          event.setExtendedProp('hours', this.formData.hours)
          event.setExtendedProp('minutes', this.formData.minutes)
          event.setExtendedProp('notes', this.formData.notes)
          event.setExtendedProp('eventResourceId', this.formData.resourceId)
          event.setExtendedProp('patientId', this.formData.patientId)
          event.setExtendedProp('doctorId', this.formData.doctorId)
          event.setExtendedProp('locationId', this.formData.locationId)
          this.updateCalendar(this.formData.id, this.formData)
          // this.updateCalendarLabel(this.formData.id, this.formData)
          this.formData = this.defaultAppointment()
          this.$emit('setModalShow', false)
        }
      }
    },
    openCreateModal (selectionInfo) {
      this.disabled = false
      this.formData = this.defaultAppointment()
      this.modalTitle = ''
      this.$emit('setModalShow', true)
      this.formData.resourceId = selectionInfo.resource.id
      this.formData.doctorId = selectionInfo.resource.title
      this.formData.eventResourceId = selectionInfo.resource.id
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
      let location = this.locations.find(item => item.city === event.location)
      this.formData = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: event.backgroundColor,
        resourceId: event.extendedProps.eventResourceId,
        locationId: location,
        ...event.extendedProps,
        assignmentDate: new Date(event.extendedProps.assignmentDate)

      }
      this.modalTitle = this.formData.title
    }
  }
}
</script>

<style lang="scss">
.fc-event{
  color: white !important;
  border: none !important;
  cursor: pointer;
}
.fc-license-message{
  display:none;
}

::-webkit-scrollbar {
    display: none;
}
.fc-resourceTimeGridWeek-view .fc-resource-cell {
  writing-mode:  vertical-lr !important;
  transform: rotate(180deg) !important;
  line-height: 13px !important;
  vertical-align: middle;
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

  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
