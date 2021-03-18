<template>
  <VueFullCalendar
  :defaultView="calendarOptions.defaultView"
  :plugins="calendarOptions.plugins"
  :events="calendarOptions.events"
  :resources="calendarOptions.resources"
  :header="{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,resourceTimeGridDay,resourceTimeGridWeek'
    }"
  @eventClick="eventData(args)"
  />
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
      calendarOptions: {
        plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin, resourceTimeGrid],
        timeZone: 'UTC',
        defaultView: 'dayGridMonth',
        resources: [
          { id: 'a', title: 'Resource A' },
          { id: 'b', title: 'Resource B' },
          { id: 'c', title: 'Resource C' },
          { id: 'd', title: 'Resource D' }
        ],
        events: 'https://fullcalendar.io/demo-events.json?with-resources=4&single-day'
        // events: { title: 'Event Now', start: new Date(), resourceId: 'a', color: 'black' }
      }
    }
  },
  methods: {
    eventData (args) {
      console.log('ARGS:', args)
      alert('Hii')
    }
  }
}
</script>

<style lang="scss">
.fc-event, .fc-event:hover{
    color: #050505 !important;
    background-color: rgb(250, 112, 0);
  }
  .fc-license-message{
    display:none;
  }
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
