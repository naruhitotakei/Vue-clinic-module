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
  @eventClick="eventData"
  />
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
      modalShow: false,
      calendarOptions: {
        plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin, resourceTimeGrid],
        timeZone: 'UTC',
        defaultView: 'dayGridMonth',
        resources: [
          { id: 'a', title: 'Resource A', eventColor: 'sandybrown' },
          { id: 'b', title: 'Resource B', eventColor: 'blue' },
          { id: 'c', title: 'Resource C', eventColor: 'red' },
          { id: 'd', title: 'Resource D', eventColor: 'black' }
        ],
        // events: 'https://fullcalendar.io/demo-events.json?with-resources=4&single-day'
        events: [
          { title: 'Event 1', start: '2021-03-04T08:00:00', end: '2021-03-04T09:00:00', allDay: 'false', resourceId: 'a' },
          { title: 'Event 1.1', start: '2021-03-05T08:00:00', end: '2021-03-05T10:00:00', allDay: 'false', resourceId: 'a' },
          { title: 'Event 2', start: '2021-03-07T09:00:00', end: '2021-03-07T10:00:00', allDay: 'false', resourceId: 'b' },
          { title: 'Event 3', start: '2021-03-05T12:00:00', end: '2021-03-05T01:00:00', allDay: 'false', resourceId: 'c' },
          { title: 'Event 4', start: '2021-03-08T10:00:00', end: '2021-03-08T11:00:00', allDay: 'false', resourceId: 'd' }
        ]
      }
    }
  },
  methods: {
    eventData () {
      console.log('before alert', this.modalShow)
      this.modalShow = true
      alert('Hii')
      console.log('after alert', this.modalShow)
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
