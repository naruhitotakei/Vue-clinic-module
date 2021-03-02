<template>
  <VueFullCalendar @dateClick="handleDateClick"
  defaultView="dayGridMonth"
  :header="header"
  :plugins="calendarPlugins"
  :weekends="false"
  :events="[
    { title: 'event 1', date: '2021-04-01' },
    { title: 'event 2', date: '2021-04-02' }
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
// import listPlugin from '@fullcalendar/list'
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
        interactionPlugin
        // listPlugin
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
    }
  }
}
</script>

<style lang='scss'>
  .fc-event, .fc-event:hover{
    color: #ffffff !important;
  }
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
