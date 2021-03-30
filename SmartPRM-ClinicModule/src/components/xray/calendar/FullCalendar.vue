<template>
<b-container fluid>
  <VueFullCalendar
  :defaultView="calendarOptions.defaultView"
  :plugins="calendarOptions.plugins"
  :events="calendarOptions.events"
  :resources="calendarOptions.resources"
  :header="{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,/*timeGridWeek,timeGridDay*/,resourceTimeGridWeek,resourceTimeGridDay'
    }"
  @eventClick="function(view) {
          this.modalShow = true;
          eventData(view);
        }.bind(this)"
  />
  <!-- Event description modal -->
  <b-modal v-model="modalShow" size="lg" title="Event Details" ok-title="Save Changes" @ok="submitFormData" cancel-title="Close">
    <form @submit="submitFormData">
      <h3 style="text-align: center;">{{this.patientData.patient_name}} - {{this.patientData.desc}}</h3>
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Start:</label>
          <input type="date" v-model="formData.start" class="form-control" id="validationDefault01" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Duration:</label>
          <div style="display: flex;">
          <input type="number" v-model="formData.hours" class="form-control col-md-6" min="0" placeholder="Hours" id="validationDefault01" required>
          <input type="number" v-model="formData.minutes" class="form-control col-md-6" min="0" step="5" placeholder="Minutes" id="validationDefault01" required>
        </div></div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Notes:</label>
          <textarea row="2" v-model="formData.notes" class="form-control" placeholder="Add your notes here for event!" id="validationDefault01" required></textarea>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Change Color:</label><br>
          <template v-for="(item,index) in color">
              <b-form-radio class="custom-radio-color" inline v-model="formData.color" :color="item.color" name="color" :key="index" :value="item.value" :disabled="item.disabled">{{ item.label }}</b-form-radio>
            </template>
      </div>
        <div class="col-md-12 mb-3">
          <template v-for="(item,index) in state">
          <b-form-radio class="custom-switch-color" v-model="formData.checked" :value="item.value" name="check-button" inline :key="index">
            {{ item.label }}
          </b-form-radio>
        </template>
        </div>
      </div>
      <button type="" class="btn btn-primary">View Patient</button>&nbsp;&nbsp;
      <button type="" class="btn btn-primary">Change Display Color</button>&nbsp;&nbsp;
      <button type="" class="btn btn-primary">Appointment Dismissed by Patient</button>
    </form>
  </b-modal>
</b-container>
</template>
<script>
import VueFullCalendar from '@fullcalendar/vue'
import resourceTimeGrid from '@fullcalendar/resource-timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

export default {
  // name: 'VueFullCalendar',
  components: {
    VueFullCalendar
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
          label: 'Purple',
          color: 'primary',
          value: 'primary'
        },
        {
          label: 'Green',
          color: 'success',
          value: 'success'
        },
        {
          label: 'Red',
          color: 'danger',
          value: 'danger'
        },
        {
          label: 'Yellow',
          color: 'warning',
          value: 'warning'
        },
        {
          label: 'Black',
          color: 'dark',
          value: 'dark'
        },
        {
          label: 'Blue',
          color: 'info',
          value: 'info'
        }
      ],
      formData: {
        start: '',
        hours: '',
        minutes: '',
        notes: '',
        checked: '',
        color: ''
      },
      modalShow: false,
      calendarOptions: {
        plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin, resourceTimeGrid],
        timeZone: 'UTC',
        defaultView: 'dayGridMonth',
        resources: [
          { id: 'a', title: 'Doctor 1', eventColor: 'sandybrown' },
          { id: 'b', title: 'Doctor 2', eventColor: 'blue' },
          { id: 'c', title: 'Doctor 3', eventColor: 'red' }
        ],
        events: [
          { id: '1', title: 'Appointment 1', start: '2021-03-22T04:30:00', end: '2021-03-22T06:00:00', resourceId: 'a', patient_data: { patient_name: 'Patient 1', desc: 'Cavity' } },
          { id: '2', title: 'Appointment 1.1', start: '2021-03-22T01:00:00', end: '2021-03-22T03:00:00', resourceId: 'a', patient_data: { patient_name: 'Patient 2', desc: 'Implant' } },
          { id: '3', title: 'Appointment 2', start: '2021-03-22T02:00:00', end: '2021-03-22T04:00:00', resourceId: 'b', patient_data: { patient_name: 'Patient 3', desc: 'Braces' } },
          { id: '4', title: 'Appointment 6', start: '2021-03-22T03:30:00', end: '2021-03-22T05:00:00', resourceId: 'b', patient_data: { patient_name: 'Patient 4', desc: 'Checkup' } },
          { id: '5', title: 'Appointment 5', start: '2021-03-22T01:30:00', end: '2021-03-22T03:30:00', resourceId: 'c', patient_data: { patient_name: 'Patient 5', desc: 'Braces' } },
          { id: '6', title: 'Appointment 3', start: '2021-03-23T12:00:00', end: '2021-03-23T01:00:00', resourceId: 'c', patient_data: { patient_name: 'Patient 6', desc: 'Cavity' } },
          { id: '7', title: 'Appointment 4', start: '2021-03-23T10:00:00', end: '2021-03-23T11:00:00', resourceId: 'b', patient_data: { patient_name: 'Patient 7', desc: 'Implant' } }
        ]
      }
    }
  },
  methods: {
    submitFormData () {
      console.log('FORM DATA:', this.formData)
    },
    eventData (args) {
      console.log('EVENT INFO:', args.event)
      this.eventInfo = args.event
      this.eventId = this.eventInfo.id
      // var arr = this.calendarOptions.resources
      // var doctorName = arr.find(item => item.id === this.eventResourceId)
      // console.log('ITEM:', doctorName.title)
      var patientArr = this.calendarOptions.events
      this.patientData = patientArr.find(item => item.id === this.eventId).patient_data
      console.log('PATIENT DATA:', this.patientData.patient_name)
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
