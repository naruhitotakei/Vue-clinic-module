<template>
  <VueFullCalendar @dateClick="handleDateClick"
  defaultView="dayGridMonth"
  :header="header"
  :plugins="calendarPlugins"
  :weekends="false"
  :events="eventArray"
  @eventClick="eventClick"
  />
  <!-- <FullCalendar
  defaultView="dayGridMonth"
  :plugins="calendarPlugins"
  :weekends="false"
  :events="[
    { title: 'event 1', date: '2019-04-01' },
    { title: 'event 2', date: '2019-04-02' }
  ]"
  /> -->
</template>
<script>
import VueFullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
export default {
  name: 'FullCalendar',
  props: {
    // eslint-disable-next-line vue/require-valid-default-prop
    calendarEvents: { type: Array, default: [ { title: 'event 1', date: '2021-04-01' }, { title: 'event 2', date: '2021-04-02' } ] },
    header: { type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default () {
        return {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }
      }
    }
  },
  data () {
    return {
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin
      ],
      eventArray: [
        { title: 'Repeating Event', start: '2021-03-03T08:00:00', end: '2021-03-03T10:00:00', color: '#17a2b8' },
        { title: 'Event 3', start: '2021-03-09T08:00:00', end: '2021-03-09T11:00:00', color: '#27e3f4' },
        { title: 'Event 4', start: '2021-03-20T06:00:00', end: '2021-03-20T08:00:00', color: 'rgb(243, 0, 101)' },
        { title: 'Event 5', start: '2021-03-24T09:00:00', end: '2021-03-24T12:00:00', color: 'rgb(0, 255, 136)' },
        { title: 'Meeting', start: '2021-03-13T08:00:00', end: '2021-03-13T08:00:00', color: 'brown' }
      ],
      eventClick: function (info) {
        var eventObj = info.event
        if (eventObj.start) {
          alert('Clicked' + eventObj.title)
          console.log('event details:', eventObj)
        }
      }
    }
  },
  components: {
    VueFullCalendar // make the <VueFullCalendar> tag available
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    handleDateClick (arg) {
      alert(arg.date)
      console.log(arg)
    }
  }
}
</script>

<style lang='scss'>
  .fc-event, .fc-event:hover{
    color: #fcf8f8 !important;
    background-color: rgb(0, 67, 143);
  }
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
