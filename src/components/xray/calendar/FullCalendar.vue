<template>
  <VueFullCalendar @dateClick="handleDateClick"
  defaultView="dayGridMonth"
  :header="header"
  :plugins="calendarPlugins"
  :weekends="true"
  :events="[
    { title: 'Event 1', date: '2021-03-04', color: 'rgb(0, 255, 136)', resource: 'a'},
    { title: 'Event 2', date: '2021-03-04', color: 'rgb(243, 0, 101)', resource: 'b'},
    { title: 'Repeating Event', start: '2021-03-03T10:00:00', end: '2021-03-04T08:00:00', color: '#17a2b8',  resource: 'c'},
    { title: 'Event 3', start: '2021-03-09', end: '2021-03-13', color: '#27e3f4' },
    { title: 'Event 4', start: '2021-03-20', end: '2021-03-25', color: 'rgb(243, 0, 101)' },
    { title: 'Event 5', start: '2021-03-24', end: '2021-03-28T07:00:00', color: 'rgb(0, 255, 136)' },
    { title: 'Meeting', start: '2021-03-13', end: '2021-03-17', color: 'red' }
  ]"
  :resources="[
      { id: 'a', resource: 'A' },
      { id: 'b', resource: 'B'},
      { id: 'c', resource: 'C' }
    ]"
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
      ]
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
      console.log(arg.props)
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
