<template>
    <b-container fluid class="calendar-page">
        <iq-card class="p-3">
            <!-- Free Slots Header -->
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
            <!-- Free Slots Calendar -->
            <VueFullCalendar defaultView="timeGridWeek"
                             :header="calendarOptions.header"
                             :plugins="calendarPlugins"
                             :events="getSlots"
                             :allDaySlot="calendarOptions.allDaySlot"
                             :minTime="calendarOptions.minTime"
                             :maxTime="calendarOptions.maxTime"
                             :slotDuration="calendarOptions.slotDuration"
                             editable="true"
                             selectable="true"
                             @select="createFreeSlots"
                             @eventClick="showFreeSlot"
                             :key="reFetchSlots" />
            <!--Add Free Slots Modal-->
            <b-modal v-model="openFreeSlotsModal"
                     no-close-on-esc
                     no-close-on-backdrop
                     size="lg"
                     title="Slots Details"
                     ok-title="Confirm"
                     @ok="addFreeSlots"
                     @close="openFreeSlotsModal = false, slotData = defaultSlotData"
                     cancel-title="Close">
                <form class="calendar-modal">
                    <div class="form-row">
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="location" class="ml-0 mb-0 font-size-16">{{ $t('calendarEvent.location') }}</label>
                            </div>
                            <div class="col-md-9">
                                <v-select :clearable="false"
                                          :disabled="disabled"
                                          label="city"
                                          :reduce="location => location.city"
                                          class="style-chooser form-control-disabled font-size-16"
                                          v-model="slotData.location"
                                          :options="locations"
                                          style="min-width:305px;"></v-select>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="doctor" class="mr-2 mb-0 font-size-16">{{ $t('calendarEvent.doctor') }}</label>
                            </div>
                            <div class="col-md-9">
                                <v-select :clearable="false"
                                          :disabled="disabled"
                                          label="doctor"
                                          :reduce="doctor => doctor.name"
                                          class="style-chooser form-control-disabled font-size-16"
                                          v-model="slotData.doctor"
                                          :options="doctors"
                                          :getOptionLabel="getDoctorLabel"
                                          style="min-width: 305px;"></v-select>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="start" class="mb-0 font-size-16">{{ $t('calendarEvent.start') }}</label>
                            </div>
                            <div class="col-md-9 d-flex align-items-center">
                                <date-picker class="form-control form-control-disabled font-size-16"
                                             :disabled="disabled"
                                             v-model="slotData.start"
                                             type="datetime"
                                             :minute-step="15"
                                             :show-second="false"
                                             :lang="'en'"
                                             :format="'DD.MM.YYYY HH.mm'"></date-picker>
                                <label for="end" class="mb-0 ml-5 mr-2 font-size-16">{{ $t('calendarEvent.end') }}</label>
                                <date-picker required
                                             class="form-control form-control-disabled font-size-16"
                                             :disabled="disabled"
                                             v-model="slotData.end"
                                             type="time"
                                             :minute-step="15"
                                             :show-second="false"
                                             :lang="'en'"
                                             :format="'DD.MM.YYYY HH.mm'"></date-picker>
                            </div>
                        </div>
                    </div>
                </form>
            </b-modal>
            <!--View Free Slots Modal-->
            <b-modal v-model="viewFreeSlotModal"
                     no-close-on-esc
                     no-close-on-backdrop
                     size="lg"
                     title="Slots Details"
                     ok-title="Delete"
                     @ok="deleteSlot(slot)"
                     @close="viewFreeSlotModal = false"
                     cancel-title="Close">
                <form class="calendar-modal">
                    <div class="form-row">
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="location" class="ml-0 mb-0 font-size-16">{{ $t('calendarEvent.location') }}</label>
                            </div>
                            <div class="col-md-9">
                                <v-select :clearable="false"
                                          :disabled="disabled"
                                          label="city"
                                          :reduce="location => location.city"
                                          class="style-chooser form-control-disabled font-size-16"
                                          v-model="slotData.location"
                                          :options="locations"
                                          style="min-width:305px;"></v-select>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="doctor" class="mr-2 mb-0 font-size-16">{{ $t('calendarEvent.doctor') }}</label>
                            </div>
                            <div class="col-md-9">
                                <v-select :clearable="false"
                                          :disabled="disabled"
                                          label="doctor"
                                          :reduce="doctor => doctor.name"
                                          class="style-chooser form-control-disabled font-size-16"
                                          v-model="slotData.doctor"
                                          :options="doctors"
                                          :getOptionLabel="getDoctorLabel"
                                          style="min-width: 305px;"></v-select>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="start" class="mb-0 font-size-16">{{ $t('calendarEvent.start') }}</label>
                            </div>
                            <div class="col-md-9 d-flex align-items-center">
                                <date-picker class="form-control form-control-disabled font-size-16"
                                             :disabled="disabled"
                                             v-model="slotData.start"
                                             type="datetime"
                                             :minute-step="15"
                                             :show-second="false"
                                             :lang="'en'"
                                             :format="'DD.MM.YYYY HH.mm'"></date-picker>
                                <label for="end" class="mb-0 ml-5 mr-2 font-size-16">{{ $t('calendarEvent.end') }}</label>
                                <date-picker required
                                             class="form-control form-control-disabled font-size-16"
                                             :disabled="disabled"
                                             v-model="slotData.end"
                                             type="time"
                                             :minute-step="15"
                                             :show-second="false"
                                             :lang="'en'"
                                             :format="'DD.MM.YYYY HH.mm'"></date-picker>
                            </div>
                        </div>
                    </div>
                </form>
            </b-modal>
        </iq-card>
    </b-container>
</template>
<script>
import VueFullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { getFreeSlots, createFreeSlots, deleteFreeSlot } from '@/services/appointmentSlotsService'
import { getDoctorList } from '@/services/calendarService'
import { getLocationsList } from '@/services/commonCodeLists'
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
export default {
  name: 'FullCalendar',
  props: {
  },
  data () {
    return {
      allDoctorsCheck: true,
      slots: [],
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
      },
      openFreeSlotsModal: false,
      viewFreeSlotModal: false,
      locations: [],
      slot: {},
      slotData: {
        id: '',
        location: '',
        doctor: '',
        start: '',
        end: ''
      },
      editable: true,
      disabled: false,
      calendarApi: null
    }
  },
  components: {
    VueFullCalendar, // make the <VueFullCalendar> tag available
    DatePicker
  },
  mounted () {
    this.getFreeSlotsList()
    this.getDoctors()
    this.getLocations()
  },
  computed: {
    getSlots () {
      if (!this.check.length) {
        return this.slots
      }
      let slots = []
      this.slots.map(event => {
        return this.check.map(checked => {
          if (event.title === checked.name) {
            slots.push(event)
          }
        })
      })
      return slots
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
            backgroundColor: slot.appointment_id ? '#F1773A' : '#64D6E8'
          })
        })
        this.reFetchSlots++
      })
    },
    getDoctors () {
      getDoctorList().then(response => {
        this.doctors = response
      })
    },
    getLocations () {
      getLocationsList().then(response => {
        this.locations = response
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
    },
    createFreeSlots (slotsInfo) {
      this.openFreeSlotsModal = true
      this.slotData = this.defaultSlotData()
      this.slotData.start = new Date(slotsInfo.startStr)
      this.slotData.end = new Date(slotsInfo.endStr)
    },
    getDoctorLabel (doctor) {
      return (doctor && doctor.name)
    },
    addFreeSlots () {
      createFreeSlots(this.slotData).then(() => {
        this.openFreeSlotsModal = false
        this.slotData = this.defaultSlotData()
        this.getFreeSlotsList()
      })
    },
    defaultSlotData () {
      return {
        id: '',
        location: '',
        doctor: '',
        start: '',
        end: ''
      }
    },
    showFreeSlot (slotInfo) {
      this.viewFreeSlotModal = true
      this.disabled = true
      this.slotData = {
        id: slotInfo.event.id,
        doctor: slotInfo.event.title,
        start: slotInfo.event.start,
        end: slotInfo.event.end
      }
    },
    deleteSlot (slot) {
      let index = this.slots.indexOf(slot)
      this.slots.splice(index, 1)
      deleteFreeSlot(this.slotData.id)
      this.viewFreeSlotModal = false
      this.getFreeSlotsList()
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
