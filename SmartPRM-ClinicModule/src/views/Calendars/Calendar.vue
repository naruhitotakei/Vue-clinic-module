<template>
  <b-container fluid class="calendar-page">
    <b-row>
      <b-col lg="9">
        <iq-card>
          <template v-slot:headerTitle>
            <iq-card class="mb-0 d-lg-none">
              <template v-slot:body>
                <div class="row justify-content-between align-items-center m-0">
                  <div class="row align-items-center">
                    <b-dropdown id="dropdown-aria" variant="primary" :text="$t('calendar.selectDoctor')" class="ml-2 ml-sm-2">
                      <b-dropdown-group>
                        <b-checkbox name="check-button" v-model="allDoctorCheck" @change="allDoctorFun(allDoctorCheck)"
                                    inline>{{ $t('calendar.selectAll') }}
                        </b-checkbox>
                      </b-dropdown-group>
                      <b-dropdown-form>
                        <b-dropdown-group v-for="(item,index) in doctors" :key="index">
                          <b-checkbox href="#" class="custom-switch-color" :color="item.color" @change="checkData(item)"
                                      v-model="item.checked" :ref="'doctor_'+index" name="check-button" inline>
                            {{ item.title }}
                          </b-checkbox>
                        </b-dropdown-group>
                      </b-dropdown-form>
                    </b-dropdown>
                  </div>
                </div>
              </template>
            </iq-card>
          </template>
          <template v-slot:body>
            <FullCalendar :resourcesOuter="getResources" :events="getEvents" @updateApp="updateApp"
                          @checkData="checkData" @setModalShow="setModalShow" :modalShow="modalShow"
                          :selectDoctor="selectDoctor"
                          ref="fullCalendar"
                          style="width: 100%;"/>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="3" class="pl-lg-2 d-none d-lg-block">
        <iq-card
          class="overflow-hidden"
          footerClass="bg-transparent px-0 pt-0"
        >
          <template v-slot:headerTitle>
            <iq-card class="mb-0">
              <b-checkbox name="check-button" v-model="allDoctorCheck" @change="allDoctorFun(allDoctorCheck)" inline>
                {{ $t('calendar.selectAll') }}
              </b-checkbox>
            </iq-card>
          </template>
          <template v-slot:body>
            <div class="mb-2" v-for="(item,index) in doctors" :key="index">
              <b-checkbox href="#" class="custom-switch-color" :color="item.color" @change="checkData(item)"
                          v-model="item.checked" :ref="'doctor_'+index" name="check-button" inline>
                {{ item.title }}
              </b-checkbox>
            </div>
          </template>
          <template v-slot:footer>
            <date-picker
              class="w-100 rounded inline-calendar"
              :lang="{
                formatLocale: {
                  firstDayOfWeek: 1,
                },
                monthBeforeYear: false,
              }"
              :format="'DD.MM.YYYY'"
              :inline="true"
              @calendar-change="handleCalendarChange"
              @pick="handleDateClick"
            ></date-picker>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { getCalendar, getDoctorList } from '@/services/calendarService'
import moment from 'moment'
import { getProductGroups } from '@/services/products'
import { mapActions, mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  name: 'GoogleCalendar',
  components: { DatePicker },
  data() {
    return {
      allDoctorCheck: true,
      checkedListArray: [],
      selectDoctor: {},
      slideCount: 0,
      optionSlider: {
        'centerMode': true,
        'centerPadding': '0',
        'focusOnSelect': true,
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'arrows': false,
        'dots': false,
        'infinite': false,
      },
      events: [],
      modalShow: {
        show: false,
        default: false,
      },
      product_groups: [],
      resources: [],
      clonedResources: [],
      formData: {
        id: '',
        appName: '',
        dateTime: '',
        regarding: '',
        type: '',
        doctorList: '',
        patientName: '',
        location: '',
        phone: '',
        answeredBy: '',
        presence: '',
      },
      doctorsList: [],
      doctors: [],
      config: {
        dateFormat: 'Y-m-d',
        inline: true,
      },
      check: [],
    }
  },
  mounted() {
    xray.index()
    this.getDoctors()
    this.getProductGroups(this.$i18n.locale)
    this.check = [...this.selectedDoctors]
    this.allDoctorCheck = this.check.length === 0
  },
  watch: {
    'allDoctorCheck'() {
    },
    'events'(data) {
      // Add lagacy app recource if there is any event resourceId (doctor_id) is not exist
      if (data.some(evt => evt.resourceId === 'legacy-app') && !this.resources.find(rsc => rsc.id === 'legacy-app')) {
        this.resources.push({
          id: 'legacy-app',
          title: 'From Legacy App',
        })
        console.log('add res legacy', this.resources)
      }
      // Remove legacy app from recourses if all events have resourceId
      if (data.every(evt => evt.resourceId !== 'legacy-app') && this.resources.find(rsc => rsc.id === 'legacy-app')) {
        this.resources.splice(this.resources.findIndex(rsc => rsc.id === 'legacy-app'), 1)
        console.log('remove res legacy', this.resources)
      }
    },
  },
  computed: {
    ...mapGetters('Calendar', ['selectedDoctors']),
    getEvents() {
      if (!this.check.length) {
        return this.events
      }
      let events = []
      this.events.map(e => {
        return this.check.map(c => {
          if (e.eventResourceId === c.id) {
            events.push(e)
          }
        })
      })
      return events
    },
    getResources() {
      if (!this.check.length) {
        return this.resources
      }
      let resources = []
      this.resources.map(e => {
        this.check.map(c => {
          if (e.id === c.id) {
            resources.push(e)
          }
        })
      })
      return resources
    },
    calendar() {
      return this.$refs.fullCalendar.$refs.calendar.getApi()
    },
  },
  methods: {
    ...mapActions('Calendar', ['setSelectedDoctors']),
    /* addAppointment () {
      this.setModalShow(true)
    }, */
    setModalShow(bool) {
      this.modalShow.show = bool
    },
    getProductGroups(lang) {
      getProductGroups(lang).then(response => {
        this.product_groups = response
      })
    },
    getDoctors() {
      getDoctorList().then((data) => {
        if (Array.isArray(data)) {
          this.doctorsList = data
          this.resources = this.doctorsList.map(item => ({
            id: item.id,
            title: item.name,
            doctorInfo: { ...item },
          }))
          this.doctors = this.doctorsList.map(item => ({
            id: item.id,
            title: item.name,
            disabled: false,
            checked: !!this.check.find(doc => doc.id === item.id && doc.checked),
          }))
        }
      })
    },
    async updateApp({ start, end }) {
      await this.getApontments(moment(start).startOf('month').format('YYYY-MM-DD'), moment(end).endOf('month').format('YYYY-MM-DD'))
    },
    getApontments(start, end) {
      // this.events = []
      getCalendar(start, end, '', this.$i18n.locale).then(data => {
        if (Array.isArray(data)) {
          let dataWithDoctor = data.filter(item => {
            return item
          })
          this.clonedResources = this.resources
          this.events = dataWithDoctor.map(item => {
            return {
              id: item.id,
              title: this.getTitleOfEvent(item),
              start: moment(item.starts_at).format('YYYY-MM-DDTHH:mm'),
              end: item.ends_at ? moment(item.ends_at).format('YYYY-MM-DDTHH:mm') : moment(item.starts_at).add('0', 'hours').add('15', 'minutes').format('YYYY-MM-DDTHH:mm'),
              backgroundColor: item.app_lb_color ? item.app_lb_color : '#64D6E8',
              classNames: item.appointment_canceled ? 'bg-opacity-50' : '',
              assignmentDate: moment(item.starts_at).format('YYYY-MM-DDTHH:mm'),
              patient_attended: item.patient_attended,
              appointment_canceled: item.appointment_canceled,
              cancelation_reason: item.cancelation_reason,
              resourceId: item.doctor_id ? item.doctor_id : 'legacy-app',
              eventResourceId: item.doctor_id,
              location: item.location ? item.location : item.app_location,
              product_groups: item.product_group_id,
              last_name: item.last_name,
              prm_client_id: item.prm_client_id,
              prm_client_name: item.prm_client_name,
              prm_pr_group_name_text: item.prm_pr_group_name_text,
              time: item.time,
              notes: item.note ? item.note : '',
              doctorId: item.doctor_name,
              enquiry_id: item.enquiry_id,
              label_id: item.app_lb_id,
              patient_name: item.name + ' ' + item.last_name,
              display: 'block',
              patientId: {
                id: item.enquiry_id,
                full_name: item.name + ' ' + item.last_name,
              },
              allDay: item.all_day ? item.all_day : false,
              app_lb_color: item.app_lb_color,
              app_lb_type: item.app_lb_type,
            }
          })
        }
      })
    },
    getTitleOfEvent(item) {
      return `${item.name} ${item.last_name} - ${item.prm_pr_group_name_text} \n${item.all_day ? this.$t('calendar.noTimeSet') : moment(item.starts_at).format('HH:mm') + ' - ' + moment(item.ends_at).format('HH:mm')} ${item.note ? `\n${item.note}` : ''}`
    },
    calculateEndDate(startDate, hours, minutes) {
      return moment(startDate).add(hours, 'hours').add(minutes, 'minutes').toISOString()
    },
    allDoctorFun(value) {
      this.check = []
      this.setSelectedDoctors(this.check)
      this.doctors.map(item => {
        item.checked = false
      })
    },
    checkData(item) {
      this.selectDoctor = item
      this.doctors.map(doctor => {
        if (doctor.id === item.id) {
          if (item.checked) {
            this.check.push(item)
            doctor.checked = true
          } else {
            doctor.checked = false
            this.check.map((i, index) => {
              if (i.id === item.id) {
                this.check.splice(index, 1)
              }
            })
          }
        }
      })
      if (this.check.length) {
        this.$nextTick(() => {
          this.allDoctorCheck = false
        })
      } else {
        this.$nextTick(() => {
          this.allDoctorCheck = true
          this.selectDoctor = {}
        })
      }
      this.setSelectedDoctors(this.check)
    },
    scroll_left() {
      this.$refs.carousel.prev()
    },
    scroll_right() {
      this.$refs.carousel.next()
    },
    handleCalendarChange(e) {
      this.calendar.changeView('dayGridMonth', e)
    },
    handleDateClick(e) {
      this.calendar.changeView('resourceTimeGridDay', e)
    },
  },
}
</script>
<style  lang="scss">
.bg-opacity-50 {
  opacity: 0.5;
}
.calendar-page {
  .calendar-card {
    height: calc(100vh - 110px);
  }
  .inline-calendar {
    .mx-datepicker-main {
      border: none;
    }
    .mx-calendar {
      width: 100%;
    }
  }
  .main-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 50%;
    margin-left: -15px;
  }
  .wrapper-box {
    max-width: 250px;
    /* overflow: auto; */
    overflow: hidden;
  }
  .nav-btn {
    border-radius: 25px;
    border: none;
    height: 30px;
    width: 30px;
  }
  #box {
    width: max-content;
    /* height: 200px;
    border: 1px solid black; */
    position: relative;
  }
  #box b-checkbox{
    position: absolute;
    height: 100%;
    width: 50px;
  }
  #box .left {
    left: 0;
  }

  #box .right {
    right: 0;
  }

  #box .center {
    left: calc(50% - 25px);
  }
  .calendar-doctor-slider {
    display: flex;
  }
  .calendar-doctor-slider .slick-slider {
    max-width: 300px;
  }

  .calendar-doctor-slider .slick-slider .slick-slide div div {
    display: flex;
    justify-content: center;
  }

  body #dropdown-offset__BV_toggle_ {
    background: #089bab !important;
  }

  .custom-switch-color  .custom-control-label {
    width: max-content !important;
  }

  .b-dropdown-form {
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    max-height: 140px;
    width: 400px;
    padding-top: 0;
  }

  @media screen and (max-width: 460px) {
  .b-dropdown-form {
    flex-direction: row;
    max-height: fit-content;
    width: auto;
  }
}
  @media screen and (max-width:600px) { .fc-toolbar.fc-header-toolbar {font-size: 60%}}
  @media screen and (max-width:550px) { .fc-toolbar.fc-header-toolbar {font-size: 50%}}
  @media screen and (max-width:450px) { .fc-toolbar.fc-header-toolbar {font-size: 45%}}
  @media screen and (max-width:300px) { .fc-toolbar.fc-header-toolbar {font-size: 30%}}
}

</style>
