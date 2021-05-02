<template>
<b-container fluid>
  <calendar
  :datesAboveResources="true"
  :defaultView="calendarOptions.defaultView"
  :plugins="calendarOptions.plugins"
  :events="calendarOptions.events"
  :resources="resourcesOuter"
  :minTime="calendarOptions.minTime"
  :maxTime="calendarOptions.maxTime"
  :allDaySlot="calendarOptions.allDaySlot"
  :slotDuration="calendarOptions.slotDuration"
  :selectable="isSelectable"
  editable="true"
  :header="calendarOptions.header"
  @select="createAppointment"
  @eventClick="updateAppointment"
  @datesRender="onViewChange"
  @eventResize="eventResize"
  id="calendar"
  ref="calendar"
  />
  <!-- Event description modal -->
  <b-modal v-model="modalShow" size="lg" title="Event Details" ok-title="Save Changes" @ok="saveAppointment" cancel-title="Close">
    <form @submit="saveAppointment">
      <h3 v-if="formData.title" style="text-align: center;">{{formData.title}}</h3>
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Title</label>
          <div style="display: flex;">
            <input type="text" v-model="formData.title" class="form-control col-md-6" placeholder="Title" id="validationDefault01" required>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">{{ $t('calendarEvent.start') }}</label>
          <input type="date" v-model="formData.date" class="form-control" id="validationDefault01" required style="max-width: 200px;">
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">{{ $t('calendarEvent.duration') }}</label>
          <div style="display: flex;">
            <input type="number" v-model="formData.hours" class="form-control col-md-6" min="0" placeholder="Hours" id="validationDefault01" required style="max-width: 150px;">
            <input type="number" v-model="formData.minutes" class="form-control col-md-6 offset-1" min="0" step="5" placeholder="Minutes" id="validationDefault01" required style="max-width: 150px;">
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">{{ $t('calendarEvent.notes') }}</label>
          <textarea row="2" v-model="formData.notes" class="form-control" placeholder="Add your notes here for event!" id="validationDefault01" required></textarea>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">{{ $t('calendarEvent.changeColor') }}</label><br>
          <template v-for="(item,index) in color">
            <b-form-radio class="custom-radio-color" inline v-model="formData.assignmentColor" :color="item.color" :value="item.value" :key="index">{{ item.label }}</b-form-radio>
          </template>
      </div>
        <div class="col-md-12 mb-3">
          <template v-for="(item,index) in state">
          <b-form-radio class="custom-switch-color" v-model="formData.attended" :value="item.value" inline :key="index">
            {{ item.label }}
          </b-form-radio>
        </template>
        </div>
      </div>
      <button type="" class="btn btn-primary">{{ $t('calendarEvent.viewPatient') }}</button>&nbsp;&nbsp;
      <button type="" class="btn btn-primary">{{ $t('calendarEvent.appointmentCancelled') }}</button>
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
    resourcesOuter: Array
  },
  data () {
    return {
      eventInfo: '',
      eventResourceId: '',
      patientData: '',
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
          value: 'default'
        },
        {
          label: 'Label 1',
          color: 'label1',
          value: 'label1'
        },
        {
          label: 'Label 2',
          color: 'label2',
          value: 'label2'
        },
        {
          label: 'Label 3',
          color: 'label3',
          value: 'label3'
        },
        {
          label: 'Label 4',
          color: 'label4',
          value: 'label4'
        },
        {
          label: 'Label 5',
          color: 'label5',
          value: 'label5'
        }
      ],
      formData: {
        title: '',
        date: '',
        start: '',
        end: '',
        hours: '',
        minutes: '',
        notes: '',
        attended: '',
        assignmentColor: '',
        resourceId: ''
      },
      calendarApi: null,
      modalShow: false,
      viewName: 'dayGridMonth',
      event: {},
      calendarOptions: {
        plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin, resourceTimeGrid],
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
        events: [
          { id: '1', title: 'Appointment 1', start: '2021-04-22T16:30:00', end: '2021-04-22T18:00:00', resourceId: 'a' },
          { id: '2', title: 'Appointment 1.1', start: '2021-04-22T09:00:00', end: '2021-04-22T10:00:00', resourceId: 'a' },
          { id: '3', title: 'Appointment 2', start: '2021-04-22T12:00:00', end: '2021-04-22T13:00:00', resourceId: 'b' },
          { id: '4', title: 'Appointment 6', start: '2021-04-22T14:30:00', end: '2021-04-22T15:00:00', resourceId: 'b' },
          { id: '5', title: 'Appointment 5', start: '2021-04-22T11:30:00', end: '2021-04-22T11:45:00', resourceId: 'c' },
          { id: '6', title: 'Appointment 3', start: '2021-04-23T12:00:00', end: '2021-04-23T01:00:00', resourceId: 'c' },
          { id: '7', title: 'Appointment 4', start: '2021-04-23T10:00:00', end: '2021-04-23T11:00:00', resourceId: 'b' }
        ]
      }
    }
  },
  mounted () {
    console.log('this.resourcesOuter', this.resourcesOuter)
    xray.index()
  },
  methods: {
    onViewChange (info) {
      this.viewName = info.view.type
    },
    eventResize (info) {
      let resizedIndex = this.calendarOptions.events.findIndex(obj => obj.id === +info.event.id)
      this.setAssignmentDateAndDuration(info.event.start, info.event.end)
      this.calendarOptions.events[resizedIndex].hours = this.formData.hours
      this.calendarOptions.events[resizedIndex].minutes = this.formData.minutes
      this.calendarOptions.events[resizedIndex].start = this.formData.start
      this.calendarOptions.events[resizedIndex].end = this.formData.end
    },
    defaultAppointment () {
      return {
        title: '',
        date: '',
        start: '',
        end: '',
        hours: '',
        minutes: '',
        notes: '',
        attended: '',
        assignmentColor: '',
        resourceId: ''
      }
    },
    saveAppointment () {
      let id = this.calendarOptions.events.length + 1
      this.calendarOptions.events.push(
        { id: id,
          title: this.formData.title,
          date: this.formData.date,
          start: this.formData.start,
          end: this.formData.end,
          hours: this.formData.hours,
          minutes: this.formData.minutes,
          notes: this.formData.notes,
          attended: this.formData.attended,
          assignmentColor: this.formData.assignmentColor,
          resourceId: this.formData.resourceId
        })
      this.formData = this.defaultAppointment()
    },
    createAppointment (info) {
      this.formData = this.defaultAppointment()
      this.modalShow = true
      this.formData.resourceId = info.resource.id
      this.setAssignmentDateAndDuration(info.start, info.end)
    },
    setAssignmentDateAndDuration (start, end) {
      this.formData.date = moment(start).format('YYYY-MM-DD')
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
    updateAppointment (info) {
      this.modalShow = true
      this.formData = this.calendarOptions.events.find(event => event.id === +info.event.id)
      console.log(JSON.stringify(this.formData))
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
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
