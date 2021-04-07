<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
          <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Select Doctor</h4>
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
            <b-checkbox name="check-button" v-model="allDoctorCheck" @change="allDoctorFun(allDoctorCheck)" :disabled="checkedListArray.length==0" inline>All Doctors</b-checkbox>
          </div>
          </template>
        </iq-card>
          </template>
          <template v-slot:headerAction>
            <b-button v-b-modal.modal-1 variant="primary"><i class="ri-add-line mr-2"></i>Book Appointment</b-button>
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
            <FullCalendar :resourcesOuter="resources" style="width: 100%; height: 100%;"/>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
import appointmentBook from '../../../services/appointbook'
export default {
  name: 'GoogleCalendar',
  components: { },
  data () {
    return {
      allDoctorCheck: true,
      checkedListArray: [],
      resources: [
        { id: 'a', title: 'Doctor 1', eventColor: 'sandybrown' },
        { id: 'b', title: 'Doctor 2', eventColor: 'blue' },
        { id: 'c', title: 'Doctor 3', eventColor: 'red' }
      ],
      clonedResources: [
        { id: 'a', title: 'Doctor 1', eventColor: 'sandybrown' },
        { id: 'b', title: 'Doctor 2', eventColor: 'blue' },
        { id: 'c', title: 'Doctor 3', eventColor: 'red' }
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
        {
          id: 'a',
          title: 'Doctor 1',
          checked: false,
          disabled: false
        },
        {
          id: 'b',
          title: 'Doctor 2',
          checked: false,
          disabled: false
        },
        {
          id: 'c',
          title: 'Doctor 3',
          checked: false,
          disabled: false
        }
      ],
      config: {
        dateFormat: 'Y-m-d',
        inline: true
      }
    }
  },
  mounted () {
    xray.index()
  },
  computed: {
  },
  methods: {
    allDoctorFun (value) {
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
      let check = this.checkedListArray.includes(item)
      let tempArray = this.checkedListArray
      let resourcesArrayCloned = this.resources
      let tempArray1 = []
      if (!check) {
        tempArray.push(item)
        for (var i = 0; i < tempArray.length; i++) {
          for (var j = 0; j < this.clonedResources.length; j++) {
            if (tempArray[i].id === this.clonedResources[j].id) {
              tempArray1.push(this.clonedResources[j])
            }
          }
        }
      } else {
        tempArray.filter((data, index) => {
          if (data.id === item.id) {
            tempArray.splice(index, 1)
          }
        })
        resourcesArrayCloned.filter((data) => {
          if (data.id === item.id) {
            tempArray1 = resourcesArrayCloned.filter((o) => {
              if (o.id !== item.id) {
                return o
              }
            })
          }
        })
      }
      this.checkedListArray = tempArray
      if (tempArray1.length < this.clonedResources.length && tempArray1.length !== 0) {
        this.resources = tempArray1
        this.allDoctorCheck = false
      } else {
        if (tempArray1.length === 0 || tempArray1.length === this.clonedResources.length) {
          this.resources = this.clonedResources
          this.allDoctorCheck = true
        }
      }
      // console.log('cloned array length:', this.clonedResources.length)
      // console.log('temparray1 array length:', tempArray1.length)
      // console.log('ALL DOCTOR CHECK', this.allDoctorCheck)
      // this.resources = tempArray1.length > 0 ? (tempArray1, this.allDoctorCheck = false) : this.clonedResources
      // console.log('TEMARRAY1:', tempArray1)
      // console.log('TEMARRAY:', tempArray)
      // console.log('ITEM:', item)
    },
    submitFormData () {
      console.log('FORM DATA:', this.formData)
      appointmentBook(this.formData)
    },
    scroll_left () {
      let content = document.querySelector('.wrapper-box')
      content.scrollLeft -= 90
    },
    scroll_right () {
      let content = document.querySelector('.wrapper-box')
      content.scrollLeft += 90
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
