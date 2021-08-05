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
                             :resources="getResources"
                             :events="getSlots"
                             :allDaySlot="calendarOptions.allDaySlot"
                             :minTime="calendarOptions.minTime"
                             :maxTime="calendarOptions.maxTime"
                             :slotDuration="calendarOptions.slotDuration"
                             @dateClick="createFreeSlots"
                             @eventClick="createAppointmentSlot"
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
                                             v-model="slotData.start"
                                             type="datetime"
                                             :minute-step="15"
                                             :show-second="false"
                                             :lang="'en'"
                                             :format="'DD.MM.YYYY HH.mm'"></date-picker>
                                <label for="end" class="mb-0 ml-5 mr-2 font-size-16">{{ $t('calendarEvent.end') }}</label>
                                <date-picker required
                                             class="form-control form-control-disabled font-size-16"
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
            <!--Open appointment modal on clicked event-->
            <b-modal v-model="openAppointmentModal"
                     no-close-on-esc
                     no-close-on-backdrop
                     size="lg"
                     title="Set appointment"
                     ok-title="Confirm"
                     @ok="addAppointment"
                     @close="openAppointmentModal = false"
                     cancel-title="Close">
                <form class="calendar-modal">
                    <div class="form-row">
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="patient" class="ml-0 mb-0 font-size-16">{{ $t('calendarEvent.patient') }}</label>
                            </div>
                            <div class="col-md-9">
                                <v-select :clearable="false"
                                          label="patient"
                                          :reduce="patient => patient.id"
                                          class="style-chooser form-control-disabled font-size-16"
                                          v-model="appointmentData.patient"
                                          :options="patients"
                                          :getOptionLabel="getPatientLabel"
                                          style="min-width:305px;"></v-select>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-between w-100">
                            <div class="col-md-3">
                                <label for="notes" class="ml-0 mb-0 font-size-16">{{ $t('calendarEvent.note') }}</label>
                            </div>
                            <div class="col-md-9">
                                <textarea row="2" v-model="appointmentData.note" class="form-control form-control-disabled font-size-16" placeholder="Add your note here for event!" id="note" required></textarea>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-between w-100 mb-3 mt-3">
                            <div class="col-md-3">
                                <label for="doctor" class="mr-2 mb-0 font-size-16">{{ $t('calendarEvent.doctor') }}</label>
                            </div>
                            <div class="col-md-9">
                                <v-select :clearable="false"
                                          label="doctor"
                                          :reduce="doctor => doctor.name"
                                          class="style-chooser form-control-disabled font-size-16"
                                          v-model="appointmentData.doctor"
                                          :options="doctors"
                                          :getOptionLabel="getDoctorLabel"
                                          style="min-width: 305px;"></v-select>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-between w-100 mb-3">
                            <div class="col-md-3">
                                <label for="product_group" class="mr-2 mb-0 font-size-16">{{ $t('calendarEvent.product_group') }}</label>
                            </div>
                            <div class="col-md-9">
                                <v-select :clearable="false"
                                          label="product_group_name"
                                          :reduce="product_group => product_group.product_group_id"
                                          class="style-chooser form-control-disabled font-size-16"
                                          v-model="appointmentData.productGroup"
                                          :options="productGroups"
                                          :getOptionLabel="getProductGroupLabel"
                                          style="min-width: 305px;"></v-select>
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
import { getFreeSlots, createFreeSlots } from '@/services/appointmentSlotsService'
import { getDoctorList } from '@/services/calendarService'
import { getLocationsList } from '@/services/commonCodeLists'
import { getPatients } from '@/services/enquiry'
import { getProductGroups } from '@/services/products'
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
      },
      openFreeSlotsModal: false,
      openAppointmentModal: false,
      locations: [],
      patients: [],
      productGroups: [],
      slotData: {
        location: '',
        doctor: '',
        start: '',
        end: ''
      },
      appointmentData: {
        patient: '',
        note: '',
        location: '',
        doctor: '',
        productGroup: '',
        start: '',
        end: ''
      }
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
    this.getPatientsList()
    this.getProductGroupsList(this.$i18n.locale)
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
    getLocations () {
      getLocationsList().then(response => {
        this.locations = response
      })
    },
    getPatientsList () {
      getPatients().then(response => {
        this.patients = response
      })
    },
    getProductGroupsList (lang) {
      getProductGroups(lang).then(response => {
        this.productGroups = response
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
    createFreeSlots () {
      this.openFreeSlotsModal = true
    },
    createAppointmentSlot () {
      this.openAppointmentModal = true
    },
    getDoctorLabel (doctor) {
      return (doctor && doctor.name)
    },
    getPatientLabel (patient) {
      return (patient && patient.full_name)
    },
    getProductGroupLabel (productGroup) {
      return (productGroup && productGroup.product_group_name)
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
        location: '',
        doctor: '',
        start: '',
        end: ''
      }
    }
  },
  watch: {
    'allDoctorsCheck' () {
    },
    '$i18n.locale' () {
      this.getProductGroupsList(this.$i18n.locale)
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
