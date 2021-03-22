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
      <label for="validationDefault01">Event Name:</label> {{eventInfo.title}}
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Start:</label>
          <input type="datetime-local" v-model="formData.start" class="form-control" value="2021-03-30T13:45:00" id="validationDefault01" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">End:</label>
          <input type="datetime-local" v-model="formData.end" class="form-control" value="2021-03-30T13:45:00" id="validationDefault01" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Notes:</label>
          <textarea row="2" v-model="formData.notes" class="form-control" placeholder="Add your notes here for event!" id="validationDefault01" required></textarea>
        </div>
        <div class="col-md-12 mb-3">
          <template v-for="(item,index) in state">
          <b-form-radio class="custom-switch-color" v-model="formData.checked" name="check-button" inline :key="index">
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
      state: [
        {
          label: 'Attended'
        },
        {
          label: 'Not Attended'
        }
      ],
      formData: {
        start: '',
        end: '',
        notes: '',
        checked: ''
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
        // events: 'https://fullcalendar.io/demo-events.json?with-resources=4&single-day'
        events: [
          { title: 'Appointment 1', start: '2021-03-22T04:30:00', end: '2021-03-22T06:00:00', resourceId: 'a' },
          { title: 'Appointment 1.1', start: '2021-03-22T01:00:00', end: '2021-03-22T03:00:00', resourceId: 'a' },
          { title: 'Appointment 2', start: '2021-03-22T02:00:00', end: '2021-03-22T04:00:00', resourceId: 'b' },
          { title: 'Appointment 6', start: '2021-03-22T03:30:00', end: '2021-03-22T05:00:00', resourceId: 'b' },
          { title: 'Appointment 5', start: '2021-03-22T01:30:00', end: '2021-03-22T03:30:00', resourceId: 'c' },
          { title: 'Appointment 3', start: '2021-03-23T12:00:00', end: '2021-03-23T01:00:00', resourceId: 'c' },
          { title: 'Appointment 4', start: '2021-03-23T10:00:00', end: '2021-03-23T11:00:00', resourceId: 'b' }
        ]
      }
    }
  },
  methods: {
    submitFormData () {
      console.log('FORM DATA:', this.formData)
    },
    eventData (args) {
      console.log('ARGS:', args.event)
      this.eventInfo = args.event
      console.log('EVENT INFO:', this.eventInfo)
      // console.log('before alert', this.modalShow)
      // alert(args.event.start)
    }
  }
}
</script>

<style lang="scss">
.fc-event{
  color: white !important;
  border: none !important;
}
.fc-license-message{
  display:none;
}
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
