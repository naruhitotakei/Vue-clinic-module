<template>
    <b-container fluid class="calendar-page">
        <iq-card class="p-3">
            <b-dropdown id="dropdown-aria" variant="primary" text="Select doctors" class="ml-2 mb-1">
                <b-dropdown-group class="select-checkbox">
                    <b-checkbox name="check-button" v-model="allDoctorsCheck" @change="allDoctorsFunc(allDoctorsCheck)"
                                inline>
                        {{ $t('calendar.selectAll') }}
                    </b-checkbox>
                </b-dropdown-group>
                <b-dropdown-form class="dropdown-list">
                    <b-dropdown-group v-for="(doctor,index) in doctors" :key="index">
                        <b-checkbox href="#" class="custom-switch-color" :color="doctor.color" @change="checkData(doctor)"
                                    v-model="doctor.checked" :ref="'doctor_'+index" name="check-button" inline>
                            {{ doctor.name }}
                        </b-checkbox>
                    </b-dropdown-group>
                </b-dropdown-form>
            </b-dropdown>
            <hr />
            <VueFullCalendar defaultView="timeGridWeek"
                             :header="calendarOptions.header"
                             :plugins="calendarPlugins"
                             :resources="getResources"
                             :events="getSlots"
                             :allDaySlot="calendarOptions.allDaySlot"
                             :minTime="calendarOptions.minTime"
                             :maxTime="calendarOptions.maxTime"
                             :slotDuration="calendarOptions.slotDuration"
                             :key="reFetchSlots" />
        </iq-card>
    </b-container>
</template>
<script>
import VueFullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { getFreeSlots } from '@/services/appointmentSlotsService'
import { getDoctorList } from '@/services/calendarService'
import moment from 'moment'
export default {
  name: 'FullCalendar',
  props: {
  },
  data () {
    return {
      allDoctorsCheck: true,
      slots: [],
      resources: [],
      reFetchSlots: 0,
      doctors: [],
      doctorsList: [],
      check: [],
      selectDoctor: {},
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
      }
    }
  },
  components: {
    VueFullCalendar // make the <VueFullCalendar> tag available
  },
  mounted () {
    this.getFreeSlotsList()
    this.getDoctors()
  },
  computed: {
    getSlots () {
      if (!this.check.length) {
        return this.slots
      }
      let slots = []
      this.slots.map(event => {
        return this.check.map(checked => {
          if (event.doctorId === checked.title) {
            slots.push(event)
          }
        })
      })
      return slots
    },
    getResources () {
      if (!this.check.length) {
        return this.resources
      }
      let resources = []
      this.resources.map(event => {
        this.check.map(checked => {
          if (event.title === checked.title) {
            resources.push(event)
          }
        })
      })
      return resources
    }
  },
  methods: {
    getFreeSlotsList () {
      getFreeSlots().then(response => {
        response.map(slot => {
          this.slots.push({
            id: slot.id,
            title: slot.doctor_name,
            start: moment(slot.starts_at).format('YYYY-MM-DDTHH:mm'),
            end: moment(slot.starts_at).add('0', 'hours').add('15', 'minutes').format('YYYY-MM-DDTHH:mm'),
            backgroundColor: slot.appointment_id ? '#F1773A' : '#64D6E8',
            resourceId: slot && slot.id,
            eventResourceId: slot && slot.id,
            doctorId: slot.doctor_name
          })
        })
        this.reFetchSlots++
      })
    },
    getDoctors () {
      getDoctorList().then(response => {
        this.doctors = response
        this.doctors.map(doctor => {
          this.resources.push({
            id: doctor.id,
            title: doctor.name
          })
        })
      })
    },
    allDoctorsFunc () {
      this.check = []
      this.doctors.map(doctor => {
        doctor.checked = false
      })
    },
    checkData (item) {
      this.selectDoctor = item
      this.doctors.map(doctor => {
        if (doctor.name === item.name) {
          if (item.checked) {
            this.check.push(item)
            doctor.checked = true
          } else {
            doctor.checked = false
            this.check.map((i, index) => {
              if (i.name === item.name) {
                this.check.splice(index, 1)
              }
            })
          }
        }
      })
      if (this.check.length) {
        this.$nextTick(() => {
          this.allDoctorsCheck = false
        })
      } else {
        this.$nextTick(() => {
          this.allDoctorsCheck = true
          this.selectDoctor = {}
        })
      }
    }
  },
  watch: {
    'allDoctorsCheck' () {
    }
  }
}
</script>

<style>
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

.select-checkbox {
    font-size: 13px;
}

.dropdown-list {
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  max-height: 140px;
  width: 400px;
  padding-top: 0;
  font-size: 13px;
}

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
@import '~@fullcalendar/list/main.min.css';
</style>
