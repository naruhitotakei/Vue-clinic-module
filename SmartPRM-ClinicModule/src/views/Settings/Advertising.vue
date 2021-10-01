<template>
    <b-container fluid @click="logEvents">
        <VueFullCalendar :options="calendarOptions" style="width: 100%; height: 100%;" />
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import VueFullCalendar from '@fullcalendar/vue'
import resourceTimeGrid from '@fullcalendar/resource-timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

export default {
  components: {
    VueFullCalendar
  },
  name: 'Advertising',
  mounted () {
    xray.index()
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGrid, listPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay'
        },
        initialView: 'resourceTimeGridWeek',
        slotMinTime: '09:00:00',
        slotMaxTime: '21:30:00',
        allDaySlot: false,
        resources: [
          {
            id: 1,
            title: 'Resource One'
          },
          {
            id: 2,
            title: 'Resource Two'
          }
        ],
        events: [
          {
            title: 'Event 2',
            start: '2021-09-28T09:00',
            end: '2021-09-28T10:30',
            allDay: false,
            resourceId: 1
          },
          {
            title: 'Event 1',
            start: '2021-09-28T11:00',
            end: '2021-09-28T13:00',
            allDay: false,
            resourceId: 2
          }
        ]
      }
    }
  },
  methods: {
    logEvents () {
      console.log(this.calendarOptions.events)
    }
  }
}
</script>

<style>

.fc-event {
    background-color: black !important;
    color: white !important;
}

@import '~@fullcalendar/list/main.min.css';
</style>
