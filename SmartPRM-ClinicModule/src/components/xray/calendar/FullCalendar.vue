<template>
<b-container fluid>
  <calendar
  :datesAboveResources="true"
  :defaultView="calendarOptions.defaultView"
  :plugins="calendarOptions.plugins"
  :events="events"
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
  <b-modal v-model="modalShow" no-close-on-backdrop size="lg" title="Event Details" ok-title="Save Changes" @ok="saveAppointment" cancel-title="Close">
    <form>
      <h3 v-if="modalTitle" style="text-align: center;">{{modalTitle}}</h3>
      <pre>
      </pre>
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="patient">{{ $t('calendarEvent.patient') }}</label>
          <v-select :clearable="false" label="full_name" :reduce="patient => patient.id" class="style-chooser" v-model="formData.patientId" :options="patients"></v-select>
        </div>
        <div class="col-md-12 mb-3">
          <label for="title">Title</label>
          <div style="display: flex;">
            <input type="text" v-model="formData.title" class="form-control" placeholder="Title" id="title" required>
          </div>
        </div>
        <div class="col-md-5 mb-3">
          <label for="location">{{ $t('calendarEvent.location') }}</label>
          <v-select :clearable="false" label="city" :reduce="location => location.id" class="style-chooser" v-model="formData.locationId" :options="locations"></v-select>
        </div>
        <div class="col-md-5 offset-md-1 mb-3">
          <label for="doctor">{{ $t('calendarEvent.doctor') }}</label>
          <v-select :clearable="false" :reduce="doctor => doctor.code" class="style-chooser" v-model="formData.doctorId" :options="doctors"></v-select>
        </div>
        <div class="col-md-12 mb-3">
          <label for="start">{{ $t('calendarEvent.start') }}</label>
          <input type="datetime-local" v-model="formData.assignmentDate" class="form-control" id="start" required style="max-width: 220px;">
        </div>
        <div class="col-md-12 mb-3">
          <label for="duration">{{ $t('calendarEvent.duration') }}</label>
          <div style="display: flex;">
            <input type="number" v-model="formData.hours" class="form-control col-md-6" min="0" max="9" placeholder="Hours" required style="max-width: 150px;">
            <input type="number" v-model="formData.minutes" min="0" max="59" class="form-control col-md-6 offset-1" step="5" placeholder="Minutes" required style="max-width: 150px;">
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <label for="notes">{{ $t('calendarEvent.notes') }}</label>
          <textarea row="2" v-model="formData.notes" class="form-control" placeholder="Add your notes here for event!" id="notes" required></textarea>
        </div>
        <div class="col-md-12 mb-3">
          <label for="color">{{ $t('calendarEvent.changeColor') }}</label><br>
          <template v-for="(item,index) in color">
            <b-form-radio class="custom-radio-color" inline v-model="formData.backgroundColor" :color="item.color" :value="item.value" :key="index">{{ item.label }}</b-form-radio>
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
import { getDentists } from '../../../services/userService'
import { getLocationsList } from '../../../services/commonCodeLists'

export default {
  components: {
    calendar
  },
  computed: {
    isSelectable () {
      return !this.viewName.includes('dayGridMonth')
    }
  },
  props: {
    resourcesOuter: Array,
    events: Array
  },
  data () {
    return {
      eventInfo: '',
      eventResourceId: '',
      patientData: '',
      patients: [],
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
        resourceId: '',
        eventResourceId: '',
        patientId: '',
        doctorId: '',
        locationId: ''
      },
      calendarApi: null,
      modalTitle: '',
      modalShow: false,
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
        defaultView: 'dayGridMonth',
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
  mounted () {
    this.calendarApi = this.$refs.calendar.getApi()
    this.calendarOptions.events = this.events
    this.getPatients()
    this.getDoctors()
    this.getLocations()
    xray.index()
  },
  methods: {
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
      getDentists().then(response => {
        this.doctors = response
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
        locationId: ''
      }
    },
    calculateEndDate (startDate, hours, minutes) {
      return moment(startDate).add(hours, 'hours').add(minutes, 'minutes').format('YYYY-MM-DDTHH:mm')
    },
    saveAppointment () {
      let id = this.calendarApi.getEvents().length + 1
      let endDate = this.calculateEndDate(this.formData.assignmentDate, this.formData.hours, this.formData.minutes)
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
          backgroundColor: this.formData.backgroundColor,
          resourceId: this.formData.resourceId,
          eventResourceId: this.formData.resourceId,
          patientId: this.formData.patientId,
          doctorId: this.formData.doctorId,
          locationId: this.formData.locationId
        })
        console.log('calendarAPI', this.calendarApi)
        console.log('calendarAPI', this.events)
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
        console.log('event', event)
      }
      this.formData = this.defaultAppointment()
    },
    openCreateModal (selectionInfo) {
      console.log('selectionInfo', selectionInfo)
      this.formData = this.defaultAppointment()
      this.modalTitle = ''
      this.modalShow = true
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
      this.modalShow = true
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

  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
