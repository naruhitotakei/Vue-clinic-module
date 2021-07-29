<template>
    <iq-card class="p-3">
        <VueFullCalendar defaultView="timeGridWeek"
                         :header="calendarOptions.header"
                         :plugins="calendarPlugins"
                         :events="getEvents"
                         :allDaySlot="calendarOptions.allDaySlot"
                         :minTime="calendarOptions.minTime"
                         :maxTime="calendarOptions.maxTime"
                         :slotDuration="calendarOptions.slotDuration"
                         @updateApp="updateApp"
                         ref="calendar"
                         v-if="isDataLoaded" />
        <img v-else src="../../assets/css/ajax-loader.gif" alt="Smart PRM" class="d-block m-auto" />
    </iq-card>
</template>
<script>
import VueFullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { getFreeSlots } from '@/services/appointmentSlotsService.js'
import moment from 'moment'
export default {
  name: 'FullCalendar',
  props: {
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
        slotDuration: '00:15:00',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }
      },
      calendarApi: null,
      isDataLoaded: false
    }
  },
  components: {
    VueFullCalendar // make the <VueFullCalendar> tag available
  },
  mounted () {
    this.getFreeSlotsList()
    this.$nextTick(() => {
      this.$forceUpdate()
      this.$emit('updateApp')
    })
  },
  computed: {
    getEvents () {
      return this.slots
    }
  },
  methods: {
    getFreeSlotsList () {
      getFreeSlots().then(response => {
        response.map(slot => {
          this.slots.push({
            id: slot.id,
            title: slot.location,
            start: moment(slot.starts_at).format('YYYY-MM-DDTHH:mm'),
            end: moment(slot.starts_at).add('0', 'hours').add('15', 'minutes').format('YYYY-MM-DDTHH:mm'),
            backgroundColor: slot.appointment_id ? '#F1773A' : '#64D6E8'
          })
        })
      })
    },
    async updateApp () {
      await this.getFreeSlotsList()
    }
  },
  watch: {
    'slots' () {
      if (this.slots.length) {
        this.isDataLoaded = true
        this.$nextTick(() => {
          this.calendarApi = this.$refs.calendar.getApi()
          console.log('API', this.calendarApi)
        })
      }
    },
    '$refs.calendar' () {
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
