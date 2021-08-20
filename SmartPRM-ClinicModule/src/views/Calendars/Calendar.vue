<template>
  <b-container fluid class="calendar-page">
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <iq-card class="mb-0">
              <template v-slot:body>
                <div class="row justify-content-between align-items-center m-0">
                  <div class="row align-items-center">
                    <b-dropdown id="dropdown-aria" variant="primary" :text="$t('calendar.selectDoctor')" class="ml-2">
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
                    <div class="calendar-doctor-slider d-none">
                      <button @click="scroll_left" class="nav-btn btn-primary mr-1"><i class="ri-arrow-left-s-line"></i>
                      </button>
                      <VueSlickCarousel
                          v-bind="optionSlider"
                          v-if="doctors.length"
                          ref="carousel"
                      >
                        <div v-for="(item,index) in doctors" :key="index">
                          <b-checkbox class="custom-switch-color" :color="item.color" @change="checkData(item)"
                                      v-model="item.checked" :ref="'doctor_'+index" name="check-button" inline>
                            {{ item.title }}
                          </b-checkbox>
                        </div>
                      </VueSlickCarousel>
                      <button @click="scroll_right" class="nav-btn btn-primary ml-1"><i
                          class="ri-arrow-right-s-line"></i></button>
                    </div>
                  </div>
                  <b-button
                      @click="addAppointment"
                      variant="primary"
                      class="btn-add-patient mt-0"
                      style="width: 190px;"
                  >
                    <i class="ri-add-line mr-2"></i>
                    {{ $t('calendar.addAppointment') }}
                  </b-button>

                </div>
              </template>
            </iq-card>
          </template>
          <template v-slot:headerAction>
            <form class="mt-4" novalidate @submit="submitFormData()">
              <b-modal id="modal-1" title="Appointment details" hide-footer>
                <form @submit="submitFormData()">
                  <div class="form-row">
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault01">Appointment name</label>
                      <input type="text" v-model="formData.appName" class="form-control" id="validationDefault01"
                             required>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault02">Date and Time</label>
                      <input type="datetime-local" placeholder="2021-01-01T13:45:00" v-model="formData.dateTime"
                             class="form-control" id="validationDefault02" required>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault03">Regarding</label>
                      <input type="text" v-model="formData.regarding" class="form-control" id="validationDefault02"
                             required>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault04">Type</label>
                      <select class="form-control" v-model="formData.type" id="validationDefault04" required>
                        <option selected disabled value="type">Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault05">Name of Doctor</label>
                      <select class="form-control" v-model="formData.doctorList" id="validationDefault05" required>
                        <option selected disabled value="doctor_name">Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault06">Name of Patient</label>
                      <select class="form-control" v-model="formData.patientName" id="validationDefault06" required>
                        <option selected disabled value="patient_name">Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault06">Location</label>
                      <select class="form-control" v-model="formData.location" id="validationDefault06" required>
                        <option selected disabled value="location">Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault05">Telephone Input</label>
                      <input type="tel" class="form-control" v-model="formData.phone" id="validationDefault05" required>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault05">Answered by</label>
                      <input type="tel" v-model="formData.answeredBy" class="form-control" id="validationDefault05"
                             required>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationDefault05">Presence</label>
                      <input type="tel" v-model="formData.presence" class="form-control" id="validationDefault05"
                             required>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary" type="submit">Submit form</button>
                  </div>
                </form>
              </b-modal>
            </form>
          </template>
          <template v-slot:body>
            <FullCalendar :resourcesOuter="getResources" :events="getEvents" @updateApp="updateApp"
                          @checkData="checkData" @setModalShow="setModalShow" :modalShow="modalShow"
                          :selectDoctor="selectDoctor"
                          style="width: 100%; height: 100%;"/>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import appointmentBook from '../../services/appointbook'
import { getCalendar, getDoctorList, getLabels } from '@/services/calendarService'
import _ from 'lodash'
import moment from 'moment'
import { getProductGroups } from '@/services/products'
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  name: 'GoogleCalendar',
  components: { VueSlickCarousel },
  data () {
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
        'infinite': false
      },
      events: [],
      modalShow: {
        show: false,
        default: false
      },
      product_groups: [],
      resources: [
        // { id: 2, title: 'Dr. Katic22222', time: '2021-06-3' },
        // { id: 7, title: 'Dr. Fabjan' },
        // { id: 24, title: 'Dr. Kržič' }
      ],
      clonedResources: [
        // { id: 'a', title: 'Doctor 1', eventColor: 'sandybrown' },
        // { id: 'b', title: 'Doctor 2', eventColor: 'blue' },
        // { id: 'c', title: 'Doctor 3', eventColor: 'red' }
      ],
      formData: {
        appName: '',
        dateTime: '',
        regarding: '',
        type: '',
        doctorList: '',
        patientName: '',
        location: '',
        phone: '',
        answeredBy: '',
        presence: ''
      },
      doctorsList: [],
      doctors: [
        // {
        //   id: 'a',
        //   title: 'Doctor 1',
        //   checked: false,
        //   disabled: false
        // },
        // {
        //   id: 'b',
        //   title: 'Doctor 2',
        //   checked: false,
        //   disabled: false
        // },
        // {
        //   id: 'c',
        //   title: 'Doctor 3',
        //   checked: false,
        //   disabled: false
        // }
      ],
      config: {
        dateFormat: 'Y-m-d',
        inline: true
      },
      check: [],
      colors: []
    }
  },
  mounted () {
    xray.index()
    this.getApontments()
    this.getDoctors()
    this.getProductGroups(this.$i18n.locale)
    this.getLabels(this.$i18n.locale)
  },
  watch: {
    'allDoctorCheck' () {
    }
  },
  computed: {
    getEvents () {
      if (!this.check.length) {
        return this.events
      }
      let events = []
      this.events.map(e => {
        return this.check.map(c => {
          if (e.doctorId === c.title) {
            events.push(e)
          }
        })
      })
      return events
    },
    getResources () {
      if (!this.check.length) {
        return this.resources
      }
      let resources = []
      this.resources.map(e => {
        this.check.map(c => {
          if (e.title === c.title) {
            resources.push(e)
          }
        })
      })
      return resources
    }
  },
  methods: {
    getLabels (lang) {
      getLabels(lang).then(data => {
        data.map(label => {
          this.colors.push({
            id: label.id,
            label: label.type,
            color: label.type.split(' ').join(''),
            value: label.color
          })
        })
      })
    },
    addAppointment () {
      this.setModalShow(true)
    },
    setModalShow (bool) {
      this.modalShow.show = bool
    },
    getProductGroups (lang) {
      getProductGroups(lang).then(response => {
        this.product_groups = response
      })
    },
    getDoctors () {
      getDoctorList().then((data) => {
        this.doctorsList = data
        this.doctorsList.map(item => {
          this.resources.push({
            id: item.id,
            title: item.name
          })
          this.doctors.push({
            id: Date.now(),
            title: item.name,
            disabled: false,
            checked: false
          })
        })
      })
    },
    async updateApp () {
      await this.getApontments()
    },
    getApontments () {
      this.events = []
      getCalendar('2021-01-01', '2021-12-31', '', this.$i18n.locale).then(data => {
        let dataWithDoctor = data.filter(item => {
          if (item.doctor_user_id !== null) {
            // this.doctors.push({
            //   id: Date.now(),
            //   title: item.doctor_name.split(',')[0],
            //   disabled: false,
            //   checked: false
            // })
            // this.resources.push({
            //   id: item.doctor_user_id,
            //   title: item.doctor_name
            // })
          }
          return item
        })
        this.doctors = _.uniqBy(this.doctors, 'title')

        this.resources = _.uniqBy(this.resources, 'id')
        // this.resources = this.resources.map(item => {
        //   let name = item.title.split(',')[0]
        //   let nameWithoutDr = name.split('Dr.')[0].length ? name.split('Dr.')[0] : name.split('Dr.')[1]
        //   return {
        //     id: item.id,
        //     title: nameWithoutDr
        //   }
        // })
        this.clonedResources = this.resources
        dataWithDoctor.map(item => {
          let patientAttended = item.patient_attended === 'true' ? 'attended' : item.patient_attended === 'null' ? 'unknown' : 'not_attended'
          let endDay = this.calculateEndDate(moment(item.date).format('YYYY-MM-DD') + 'T' + item.time, 0, 15)
          let doctor = this.doctorsList.find(doc => doc.name === item.app_doctor_name)
          if (item.id === 41547) {
            // console.log(item)
          }
          this.events.push({
            id: item.id,
            title: item.name + ' ' + item.last_name,
            start: moment(item.date).format('YYYY-MM-DD') + 'T' + item.time,
            end: !item.end_time ? endDay : item.end_time,
            backgroundColor: item.app_lb_color ? item.app_lb_color : '#64D6E8',
            patient_attended: patientAttended,
            appointment_canceled_in_advance_by_patient: item.appointment_canceled_in_advance_by_patient,
            appointment_canceled_in_advance_by_clinic: item.appointment_canceled_in_advance_by_clinic,
            resourceId: doctor && doctor.id,
            eventResourceId: doctor && doctor.id,
            locationId: item.location ? item.location : item.app_location,
            product_groups: item.product_group_id,
            hours: 0,
            minutes: 15,
            assignmentDate: moment(item.date).format('YYYY-MM-DD') + 'T' + item.time,
            last_name: item.last_name,
            prm_client_id: item.prm_client_id,
            prm_client_name: item.prm_client_name,
            time: item.time,
            notes: item.note,
            doctorId: item.doctor_name ? item.doctor_name : item.app_doctor_name,
            enquiry_id: item.enquiry_id,
            label_id: item.app_lb_id,
            patientId: {
              id: item.enquiry_id,
              full_name: item.name + ' ' + item.last_name
            },
            allDay: false,
            app_lb_color: item.app_lb_color,
            app_lb_type: item.app_lb_type
          })
        })
        this.events = _.uniqBy(this.events, 'id')
        // console.log('Fetching calendar events: ' + JSON.stringify(this.events))
      })
    },
    calculateEndDate (startDate, hours, minutes) {
      return moment(startDate).add(hours, 'hours').add(minutes, 'minutes').toISOString()
    },
    allDoctorFun (value) {
      this.check = []
      this.doctors.map(item => {
        item.checked = false
      })
    },
    checkData (item) {
      // console.log(item, 'ITEM')
      this.selectDoctor = item
      this.doctors.map(doctor => {
        if (doctor.title === item.title) {
          if (item.checked) {
            this.check.push(item)
            doctor.checked = true
          } else {
            doctor.checked = false
            this.check.map((i, index) => {
              if (i.title === item.title) {
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
    },
    submitFormData () {
      appointmentBook(this.formData)
    },
    scroll_left () {
      this.$refs.carousel.prev()
    },
    scroll_right () {
      this.$refs.carousel.next()
    }
  }
}
</script>
<style  lang="scss">
.calendar-page {
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
}

</style>
