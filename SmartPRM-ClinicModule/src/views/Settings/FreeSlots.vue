<template>
    <iq-card class="p-3">
        <VueFullCalendar defaultView="timeGridWeek"
                         :header="header"
                         :plugins="calendarPlugins"
                         :events="getEvents"
                         :allDaySlot="calendarOptions.allDaySlot"
                         :minTime="calendarOptions.minTime"
                         :maxTime="calendarOptions.maxTime"
                         :slotDuration="calendarOptions.slotDuration"
                         />
    </iq-card>
</template>
<script>
import VueFullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { getFreeSlots } from '@/services/appointmentSlotsService.js'
export default {
  name: 'FullCalendar',
  props: {
    // eslint-disable-next-line vue/require-valid-default-prop
    header: { type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default () {
        return {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }
      }
    }
  },
  data () {
    return {
      slots: [],
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin
      ],
      calendarOptions: {
        allDaySlot: false,
        minTime: '09:00:00',
        maxTime: '21:30:00',
        slotDuration: '00:15:00'
      }
    }
  },
  components: {
    VueFullCalendar // make the <VueFullCalendar> tag available
  },
  mounted () {
    this.getFreeSlotsList()
  },
  computed: {
    getEvents () {
      return this.slots
    }
  },
  methods: {
    getFreeSlotsList () {
      getFreeSlots().then(response => {
        this.slots = response
      })
    }
  }
}
</script>

<style lang='scss'>
.fc-event, .fc-event:hover{
  color: #ffffff !important;
}

.fc-head {
  text-align: center;
}

.fc-time {
  width: 59px !important;
}

.fc-axis {
  width: 59px !important;
}

VueFullCalendar {
  padding: 1rem;
}

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
@import '~@fullcalendar/list/main.min.css';
</style>
