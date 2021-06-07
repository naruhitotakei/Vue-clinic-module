<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
          <iq-card>
          <template v-slot:headerTitle>
              <h4 class="card-title">{{ $t('calendar.selectDoctor') }}</h4>
          </template>
          <template v-slot:body>
          <div class="main-wrapper">
          <button @click="scroll_left" class="nav-btn btn-primary"><i class="ri-arrow-left-s-line"></i></button>
            <div class="wrapper-box">
              <div id="box">
            <template v-for="(item,index) in doctors">
              <b-checkbox class="custom-switch-color" :color="item.color" @change="checkData(item)" v-model="item.checked" name="check-button" inline :key="index">
                {{ item.title }}
              </b-checkbox>
            </template></div></div>
          <button @click="scroll_right" class="nav-btn btn-primary"><i class="ri-arrow-right-s-line"></i></button>
          <b-checkbox name="check-button" v-model="allDoctorCheck" @change="allDoctorFun(allDoctorCheck)"  inline>{{ $t('calendar.selectAll') }}</b-checkbox>
          </div>
          </template>
        </iq-card>
          </template>
          <template v-slot:headerAction>
              <b-button v-b-modal.modal-1 variant="primary" class="btn-add-patient" style="width: 190px;"><i class="ri-add-line mr-2"></i>{{ $t('calendar.bookAppointment') }}</b-button>
            <form class="mt-4" novalidate @submit="submitFormData()">
              <b-modal id="modal-1" title="Appointment details" hide-footer>
              <form @submit="submitFormData()">
              <div class="form-row">
                <div class="col-md-12 mb-3">
                  <label for="validationDefault01">Appointment name</label>
                  <input type="text" v-model="formData.appName" class="form-control" id="validationDefault01" required>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault02">Date and Time</label>
                  <input type="datetime-local" placeholder="2021-01-01T13:45:00" v-model="formData.dateTime" class="form-control" id="validationDefault02" required>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault03">Regarding</label>
                  <input type="text" v-model="formData.regarding" class="form-control" id="validationDefault02" required>
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
                  <input type="tel" v-model="formData.answeredBy" class="form-control" id="validationDefault05" required>
              </div>
              <div class="col-md-12 mb-3">
                  <label for="validationDefault05">Presence</label>
                  <input type="tel" v-model="formData.presence" class="form-control" id="validationDefault05" required>
              </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" type="submit">Submit form</button>
              </div>
            </form>
          </b-modal>
          </form>
          </template>
          <template  v-slot:body>
            <FullCalendar :resourcesOuter="resources" :events="getEvents" style="width: 100%; height: 100%;"/>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import appointmentBook from '../../services/appointbook'
import { getApontments } from '@/services/calendarService'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'GoogleCalendar',
  components: { },
  data () {
    return {
      allDoctorCheck: true,
      checkedListArray: [],
      events: [
        {
          id: 340,
          title: '',
          start: '2021-06-07T07:30:00.000Z',
          end: '2021-06-07T07:45:00.000Z',
          backgroundColor: '#64D6E8',
          resourceId: 28,
          eventResourceId: 28,
          locationId: '',
          assignmentDate: '2021-06-07T10:30',
          hours: 0,
          minutes: 15,
          notes: '',
          patientId: '',
          doctorId: 28
        }
      ],
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
      check: null
    }
  },
  mounted () {
    xray.index()
    this.getApontments()
  },
  computed: {
    getEvents () {
      return this.events.filter(e => {
        if (!this.check) {
          return this.events
        }
        return e.doctorId === this.check.title
      })
    }
  },
  methods: {
    getApontments () {
      getApontments('2021-01-01', '2021-06-30').then(data => {
        let dataWithDoctor = data.filter(item => {
          if (item.doctor_user_id !== null) {
            this.doctors.push({
              id: Date.now(),
              title: item.doctor_name,
              disabled: false,
              checked: false
            })
            this.resources.push({
              id: item.doctor_user_id,
              title: item.doctor_name
            })
            return item
          }
        })
        this.doctors = _.uniqBy(this.doctors, 'title')
        this.resources = _.uniqBy(this.resources, 'id')
        this.clonedResources = this.resources
        dataWithDoctor.map(item => {
          // let startDay = `${moment(item.date).add(moment.duration(item.time)).toISOString()}`
          let endDay = this.calculateEndDate(moment(item.date).format('YYYY-MM-DD') + 'T' + item.time, 0, 15)
          this.events.push({
            id: item.id,
            title: item.name + ' ' + item.last_name,
            start: moment(item.date).format('YYYY-MM-DD') + 'T' + item.time,
            end: endDay,
            backgroundColor: '#148A9C',
            resourceId: item.doctor_user_id,
            eventResourceId: item.doctor_user_id,
            locationId: item.location,
            hours: 0,
            minutes: 15,
            assignmentDate: moment(item.date).format('YYYY-MM-DD') + 'T' + item.time,
            last_name: item.last_name,
            prm_client_id: item.prm_client_id,
            prm_client_name: item.prm_client_name,
            time: item.time,
            doctorId: item.doctor_name,
            enquiry_id: item.enquiry_id,
            patientId: 0,
            allDay: false
          })
        })
      })
    },
    calculateEndDate (startDate, hours, minutes) {
      return moment(startDate).add(hours, 'hours').add(minutes, 'minutes').toISOString()
    },
    allDoctorFun (value) {
      this.check = null
      this.doctors.map(item => {
        item.checked = false
      })
      // console.log('before THIS.CLONEDRESOURCES:', this.clonedResources)
      // if (value) {
      //   this.clonedResources.map((x) => {
      //     x.checked = true
      //   })
      //   console.log('THIS.CLONEDRESOURCES:', this.clonedResources)
      // }
      this.resources = value ? this.clonedResources : this.checkedListArray
    },
    checkData (item) {
      // let check = this.checkedListArray.includes(item)
      // let tempArray = this.checkedListArray
      // let resourcesArrayCloned = this.resources
      // let tempArray1 = []
      if (item.checked) {
        this.check = item
        this.allDoctorCheck = false
      } else {
        this.check = null
        this.allDoctorCheck = true
      }
      if (!item) {

      } else {
        // console.log(item)
        // console.log('before', this.events)
        // this.events = this.events.filter(event => event.doctorId === item.title)
        // console.log('after', this.events)
      }
      // if (!check) {
      //   tempArray.push(item)
      //   for (var i = 0; i < tempArray.length; i++) {
      //     for (var j = 0; j < this.clonedResources.length; j++) {
      //       if (tempArray[i].id === this.clonedResources[j].id) {
      //         tempArray1.push(this.clonedResources[j])
      //       }
      //     }
      //   }
      // } else {
      //   tempArray.filter((data, index) => {
      //     if (data.id === item.id) {
      //       tempArray.splice(index, 1)
      //     }
      //   })
      //   resourcesArrayCloned.filter((data) => {
      //     if (data.id === item.id) {
      //       tempArray1 = resourcesArrayCloned.filter((o) => {
      //         if (o.id !== item.id) {
      //           return o
      //         }
      //       })
      //     }
      //   })
      // }
      // this.checkedListArray = tempArray
      // if (tempArray1.length < this.clonedResources.length && tempArray1.length !== 0) {
      //   this.resources = tempArray1
      //   this.allDoctorCheck = false
      // } else {
      //   if (tempArray1.length === 0 || tempArray1.length === this.clonedResources.length) {
      //     this.resources = this.clonedResources
      //     this.allDoctorCheck = true
      //   }
      // }
      // console.log('cloned array length:', this.clonedResources.length)
      // console.log('temparray1 array length:', tempArray1.length)
      // console.log('ALL DOCTOR CHECK', this.allDoctorCheck)
      // this.resources = tempArray1.length > 0 ? (tempArray1, this.allDoctorCheck = false) : this.clonedResources
      // console.log('TEMARRAY1:', tempArray1)
      // console.log('TEMARRAY:', tempArray)
      // console.log('ITEM:', item)
    },
    submitFormData () {
      appointmentBook(this.formData)
    },
    scroll_left () {
      let content = document.querySelector('.wrapper-box')
      content.scrollLeft -= 250
    },
    scroll_right () {
      let content = document.querySelector('.wrapper-box')
      content.scrollLeft += 250
    }
  }
}
</script>
<style scoped>

.main-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  margin-left: -15px;
}
.wrapper-box {
  max-width: 185px;
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

</style>
