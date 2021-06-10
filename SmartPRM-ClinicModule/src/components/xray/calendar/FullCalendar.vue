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
  />
  <!-- Event description modal -->
  <b-modal
      v-model="showModal"
      no-close-on-esc
      no-close-on-backdrop
      size="lg"
      title="Appointment Details"
      ok-title="Save Changes"
      @ok="saveAppointment"
      @close="closeModal"
      cancel-title="Close"
      hide-footer
      >
    <form class="calendar-modal">
      <h3 v-if="modalTitle" style="text-align: center;">{{modalTitle}}</h3>
        <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="patient">{{ $t('calendarEvent.patient') }}</label>
          <v-select :disabled="disabled" :clearable="false" label="full_name" :reduce="patient => patient.id" class="style-chooser form-control-disabled font-size-15" v-model="formData.patientId" :options="patients"></v-select>
        </div>
<!--        <div class="col-md-12 mb-3">-->
<!--          <label for="title">Title</label>-->
<!--          <div style="display: flex;">-->
<!--            <input type="text" :disabled="disabled" v-model="formData.title" class="form-control form-control-disabled" placeholder="Title" id="title" required>-->
<!--          </div>-->
<!--        </div>-->
        <div class="col-md-12 mb-3">
          <label for="notes">{{ $t('calendarEvent.note') }}</label>
          <textarea :disabled="disabled" row="2" v-model="formData.notes" class="form-control form-control-disabled font-size-15" placeholder="Add your note here for event!" id="note" required ></textarea>
        </div>
        <div class="col-md-5 mb-3">
          <label for="location">{{ $t('calendarEvent.location') }}</label>
          <v-select :disabled="disabled" :clearable="false" label="city" :reduce="location => location.id" class="style-chooser form-control-disabled font-size-15" v-model="formData.locationId" :options="locations"></v-select>
        </div>
        <div class="col-md-5 offset-md-1 mb-3">
          <label for="doctor">{{ $t('calendarEvent.doctor') }}</label>
          {{formData.doctorId}}
          <v-select :disabled="disabled" :clearable="false" label="name" :reduce="doctor => doctor.id" class="style-chooser form-control-disabled font-size-15" v-model="formData.doctorId" :options="doctors"></v-select>
        </div>
        <div class="col-md-12 mb-3">
          <label for="patient">{{ $t('calendarEvent.product_group') }}</label>
          <v-select :disabled="disabled" :clearable="false" label="product_group_name" :reduce="product_group => product_group.product_group_id" class="style-chooser form-control-disabled font-size-15" v-model="formData.product_groups" :options="product_groups"></v-select>
        </div>
        <div class="col-md-12 mb-3">
          <label for="start">{{ $t('calendarEvent.start') }}</label>
          <input :disabled="disabled" type="datetime-local" v-model="formData.assignmentDate" class="form-control form-control-disabled" id="start" required style="max-width: 227px;">
        </div>
        <div class="col-md-12 mb-3">
          <label for="duration">{{ $t('calendarEvent.duration') }}</label>
          <div style="display: flex;">
            <div class="calendar-modal-input__hour mr-4">
              <input :disabled="disabled" type="number" v-model="formData.hours" class="form-control col-md-6 form-control-disabled" min="0" max="9" placeholder="Hours" required style="max-width: 150px;">
            </div>
            <div class="calendar-modal-input__minutes">
              <input :disabled="disabled" type="number" v-model="formData.minutes" min="0" max="59" class="form-control col-md-6 offset-1 form-control-disabled" step="5" placeholder="Minutes" required style="max-width: 150px;">
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <label for="color">{{ $t('calendarEvent.patient_attended') }}</label><br>
          <template v-for="(item,index) in patient_attend">
            <b-form-radio class="custom-radio-patient" inline v-model="formData.patient_attended" :value="item.value" :key="index" v-if="showPatientAttended(item)">{{ item.label }}</b-form-radio>
          </template>
        </div>
        <div class="col-md-12 mb-3">
          <label for="color">{{ $t('calendarEvent.labels') }}</label><br>
          <template v-for="(item,index) in color">
            <b-form-radio class="custom-radio-color" inline v-model="formData.backgroundColor" :color="item.color" :value="item.value" :key="index" v-if="showLabels(item)">{{ item.label }}</b-form-radio>
          </template>
        </div>
       <div class="modal-footer modal-footer-bt" style="width: 100%;">
         <template v-if="disabled">
           <button type="button" class="btn btn-secondary" @click="$emit('setModalShow', false)">Close</button>
           <button type="button" class="btn btn-secondary" @click="editMode">Edit Appointment</button>
           <button type="button" class="btn btn-primary" @click="viewPatient(formData.enquiry_id)">View Patient Record</button>
         </template>
         <template v-if="!disabled">
           <button type="button" class="btn btn-secondary" @click="$emit('setModalShow', false)">Close</button>
           <button type="button" class="btn btn-primary"   @click="saveAppointment">Save Changes</button>
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
// import { getDentists } from '../../../services/userService'
import { getLocationsList } from '../../../services/commonCodeLists'
import { getProductGroups } from '@/services/products'
import { createCalendar, getDoctorList, updateCalendar, updateCalendarLabel } from '@/services/calendarService'

export default {
  components: {
    calendar
  },
  computed: {
    isSelectable () {
      return !this.viewName.includes('dayGridMonth')
    },
    getEvents () {
      return this.events
    }
  },
  props: {
    resourcesOuter: Array,
    events: Array,
    modalShow: Boolean
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
      color: [
        {
          label: 'Default',
          color: 'default',
          value: '#64D6E8'
        },
        {
          label: 'Label 1',
          color: 'label1',
          value: '#F54E65'
        },
        {
          label: 'Label 2',
          color: 'label2',
          value: '#9E1729'
        },
        {
          label: 'Label 3',
          color: 'label3',
          value: '#148A9C'
        },
        {
          label: 'Label 4',
          color: 'label4',
          value: '#E8C007'
        },
        {
          label: 'Label 5',
          color: 'label5',
          value: '#9E8205'
        }
      ],
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
        product_groups: ''
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
        maxTime: '19:00:00',
        slotDuration: '00:15:00',
        allDaySlot: false,
        editable: true,
        selectable: true,
        events: []
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.getProductGroups(this.$i18n.locale)
    },
    'modalShow' () {
      if (!this.formData.id) {
        this.disabled = false
        this.formData = this.defaultAppointment()
      }
      this.showModal = this.modalShow
    }
  },
  mounted () {
    this.calendarApi = this.$refs.calendar.getApi()
    this.calendarOptions.events = this.events
    this.getPatients()
    this.getDoctors()
    this.getLocations()
    this.getProductGroups(this.$i18n.locale)
    xray.index()
  },
  methods: {
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
        this.$emit('updateApp')
      })
    },
    showPatientAttended (item) {
      if (this.disabled && this.formData.patient_attended === item.value) {
        return true
      } else if (!this.disabled) {
        return true
      }
    },
    showLabels (item) {
      if (this.disabled && this.formData.backgroundColor === item.value) {
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
      this.setAssignmentDateAndDuration(info.event.start, info.event.end)
      event.setStart(this.formData.start)
      event.setEnd(this.formData.end)
      event.setExtendedProp('hours', this.formData.hours)
      event.setExtendedProp('minutes', this.formData.minutes)
    },
    eventDrop (info) {
      let event = this.calendarApi.getEventById(info.event.id)
      console.log('res pre: ' + JSON.stringify(event.extendedProps.eventResourceId))
      console.log('doc pre: ' + JSON.stringify(event.extendedProps.doctorId))
      console.log('novi res id je: ' + JSON.stringify(info.event.extendedProps.eventResourceId))
      console.log('novi doctor id je: ' + JSON.stringify(info.event.extendedProps.doctorId))
      this.setAssignmentDateAndDuration(info.event.start, info.event.end)
      event.setExtendedProp('assignmentDate', this.formData.assignmentDate)
      event.setStart(this.formData.start)
      event.setEnd(this.formData.end)
      event.setExtendedProp('eventResourceId', +info.newResource.id)
      event.setExtendedProp('doctorId', +info.newResource.id)
    },
    defaultAppointment () {
      return {
        id: null,
        title: '',
        assignmentDate: '',
        start: '',
        end: '',
        hours: '',
        minutes: '',
        notes: '',
        backgroundColor: '#64D6E8',
        resourceId: '',
        eventResourceId: '',
        patientId: '',
        doctorId: '',
        locationId: '',
        enquiry_id: ''
      }
    },
    createCalendar (appointment) {
      createCalendar(appointment).then(() => {

      })
    },
    calculateEndDate (startDate, hours, minutes) {
      return moment(startDate).add(hours, 'hours').add(minutes, 'minutes').format('YYYY-MM-DDTHH:mm')
    },
    saveAppointment () {
      // this.modalShow = false
      if (this.formData.patientId && this.formData.doctorId && this.formData.assignmentDate) {
        this.disabled = true
        this.$emit('setModalShow', false)
        let id = this.calendarApi.getEvents().length + 1
        let endDate = this.calculateEndDate(this.formData.assignmentDate, this.formData.hours, this.formData.minutes)
        let title = this.patients.find(item => item.id === this.formData.patientId)
        this.modalTitle = title.full_name
        this.formData.title = title.full_name
        this.formData.resourceId = this.formData.doctorId

        if (typeof this.formData.patientId === 'object') {
          this.formData.patientId = this.formData.patientId.id
        } else {
          let title = this.patients.find(item => item.id === this.formData.patientId)
          this.modalTitle = title.full_name
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

        console.log(this.formData)
        if (!this.formData.id) {
          this.calendarApi.addEvent({
            id: id,
            title: this.formData.title,
            assignmentDate: this.formData.assignmentDate,
            start: this.formData.assignmentDate,
            end: endDate,
            hours: this.formData.hours,
            minutes: this.formData.minutes,
            notes: this.formData.notes,
            product_groups: this.formData.product_groups,
            patient_attended: this.formData.patient_attended,
            backgroundColor: this.formData.backgroundColor,
            resourceId: this.formData.resourceId,
            eventResourceId: this.formData.resourceId,
            patientId: this.formData.patientId,
            doctorId: this.formData.doctorId,
            locationId: this.formData.locationId
          })
          this.createCalendar(this.formData)
        } else {
          let event = this.calendarApi.getEventById(this.formData.id)
          console.log('EVENT ID OBJECT', event)
          event.setProp('title', this.formData.title)
          event.setProp('backgroundColor', this.formData.backgroundColor)
          event.setProp('resourceId', this.formData.resourceId)
          event.setStart(this.formData.assignmentDate)
          event.setEnd(endDate)
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
          this.updateCalendarLabel(this.formData.id, this.formData)
        }
      }
      this.formData = this.defaultAppointment()
    },
    openCreateModal (selectionInfo) {
      this.disabled = false
      this.formData = this.defaultAppointment()
      this.modalTitle = ''
      // this.modalShow = true
      this.$emit('setModalShow', true)
      this.formData.resourceId = selectionInfo.resource.id
      this.formData.doctorId = +this.formData.resourceId
      this.formData.eventResourceId = selectionInfo.resource.id
      this.setAssignmentDateAndDuration(selectionInfo.start, selectionInfo.end)
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
      console.log('openUpdateModal', event)
      this.formData = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: event.backgroundColor,
        resourceId: event.extendedProps.eventResourceId,
        locationId: location,
        ...event.extendedProps
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
  writing-mode: tb-rl !important;
  transform: rotate(180deg) !important;
  line-height: 13px !important;
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
    border: none;
    &>div {
      background-color: transparent !important;
      border: none;
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

  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
