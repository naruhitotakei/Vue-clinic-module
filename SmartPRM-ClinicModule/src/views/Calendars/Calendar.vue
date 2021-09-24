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
                  </div>
                  <b-button
                      @click="addAppointment"
                      variant="primary"
                      class="btn-add-patient mt-0"
                  >
                    <i class="ri-add-line mr-2"></i>
                    {{ $t('calendar.addAppointment') }}
                  </b-button>

                </div>
              </template>
            </iq-card>
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
import { getCalendar, getDoctorList } from '@/services/calendarService'
import moment from 'moment'
import { getProductGroups } from '@/services/products'

export default {
  name: 'GoogleCalendar',
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
        presence: ''
      },
      doctorsList: [],
      doctors: [],
      config: {
        dateFormat: 'Y-m-d',
        inline: true
      },
      check: []
    }
  },
  mounted () {
    xray.index()
    this.getDoctors()
    this.getProductGroups(this.$i18n.locale)
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
          return item
        })
        this.clonedResources = this.resources
        dataWithDoctor.map(item => {
          let patientAttended = item.patient_attended === 'true' ? 'attended' : item.patient_attended === 'false' ? 'not_attended' : 'unknown'
          let doctor = this.doctorsList.find(doc => doc.name === item.app_doctor_name)
          this.events.push({
            id: item.id,
            title: item.note ? item.name + ' ' + item.last_name + ' - ' + item.prm_pr_group_name_text + '\n' + moment(item.starts_at).format('HH:mm') + ' - ' + moment(item.ends_at).format('HH:mm') + '\n' + item.note : item.name + ' ' + item.last_name + ' - ' + item.prm_pr_group_name_text + '\n' + moment(item.starts_at).format('HH:mm') + ' - ' + moment(item.ends_at).format('HH:mm'),
            start: moment(item.starts_at).format('YYYY-MM-DDTHH:mm'),
            end: item.ends_at ? moment(item.ends_at).format('YYYY-MM-DDTHH:mm') : moment(item.starts_at).add('0', 'hours').add('15', 'minutes').format('YYYY-MM-DDTHH:mm'),
            backgroundColor: item.app_lb_color ? item.app_lb_color : '#64D6E8',
            assignmentDate: moment(item.starts_at).format('YYYY-MM-DDTHH:mm'),
            patient_attended: patientAttended,
            appointment_canceled_in_advance_by_patient: item.appointment_canceled_in_advance_by_patient,
            appointment_canceled_in_advance_by_clinic: item.appointment_canceled_in_advance_by_clinic,
            resourceId: doctor && doctor.id,
            eventResourceId: doctor && doctor.id,
            locationId: item.location ? item.location : item.app_location,
            product_groups: item.product_group_id,
            last_name: item.last_name,
            prm_client_id: item.prm_client_id,
            prm_client_name: item.prm_client_name,
            time: item.time,
            notes: item.note ? item.note : '',
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
          /* console.log('Fetching events on the FE: ' + JSON.stringify(this.events[0])) */
        })
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
