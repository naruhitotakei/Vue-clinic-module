<template>
    <b-container fluid>
        <b-row>
            <b-col lg="8">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" style="height: auto !important;">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.todaysAppointments') }} ({{todaysAppointments.length}})</h4>
                    </template>
                    <!-- <template v-slot:headerAction>
                <b-dropdown size="lg p-0"  variant="link" toggle-class="text-decoration-none" no-caret>
              <template v-slot:button-content>
                    <span class="dropdown-toggle p-0" id="dropdownMenuButton5" data-toggle="dropdown">
                      <i class="ri-more-fill m-0 text-primary"></i>
                    </span>
              </template>
              <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.view') }}</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.delete') }}</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-pencil-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.edit') }}</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-printer-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.print') }}</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-file-download-fill mr-2"></i>{{ $t('home.newAppointmentsDropDown.download') }}</b-dropdown-item>
            </b-dropdown>
            </template> -->
                    <template v-slot:body>
                        <b-table v-if="todaysAppointments.length > 0"
                                 borderless
                                 id="todaysAppointmentsTable"
                                 :items="todaysAppointments"
                                 :fields="todaysAppointmentsColumns"
                                 :per-page="todaysAppointmentsPerPage"
                                 :current-page="currentTodaysAppointmentsPage">
                            <template v-slot:cell(patient_name)="data">
                                <router-link tag="span" :to="'/patients/' + data.item.patient_id" style="cursor:pointer;" class="style-chooser form-control-disabled">{{ data.item.patient_name }}</router-link>
                            </template>
                        </b-table>
                        <p v-else>{{ $t('home.noAppointmentsToday') }}</p>
                    </template>
                    <template>
                        <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                        <div class="ml-4 pb-2">
                            <b-pagination v-if="hideTodaysAppointmentsPagination"
                                          v-model="currentTodaysAppointmentsPage"
                                          :total-rows="todaysAppointments.length"
                                          :per-page="todaysAppointmentsPerPage"
                                          aria-controls="todaysAppointmentsTable">
                            </b-pagination>
                        </div>
                    </template>
                </iq-card>
                <iq-card class-name="iq-card-block iq-card-stretch" style="margin-top: 0 !important">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.openAssignments') }} ({{openAssignmentsLength}})</h4>
                    </template>
                    <template v-slot:headerAction>
                        <div class="iq-card-header-toolbar d-flex align-items-center">
                            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                                <template v-slot:button-content>
                                    <i class="ri-more-fill"></i>
                                </template>
                                <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>{{ $t('home.operationsDropDown.view') }}</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>
                    <template v-slot:body>
                        <!-- <b-table v-if="openAssignments.length > 0"
                  borderless
                  id="openAssignmentsTable"
                  :items="openAssignments"
                  :fields="openAssignmentsColumns"
                  :per-page="openAssignmentsPerPage"
                  :current-page="currentOpenAssignmentsPage"
                >
                  <template v-slot:cell(dentist)="data">
                    {{ patientsDentist(data.item) }}
                  </template>
                </b-table> -->
                        <!-- <template>
                    <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                    <div class="ml-4 pb-2">
                        <b-pagination v-if="hideOpenAssignmentsPagination"
                                      v-model="currentOpenAssignmentsPage"
                                      :total-rows="openAssignments.length"
                                      :per-page="openAssignmentsPerPage"
                                      aria-controls="openAssignmentsTable">
                        </b-pagination>
                    </div>
                </template> -->
                        <b-list-group class="list-group-flush" id="openTodos">
                            <b-list-group-item v-for="(item, index) in openAssignmentsList"
                              :key="index"
                              :style="{'background': getDifferenceDate(item.due_at) === 1 && '#ffeeba' || getDifferenceDate(item.due_at) > 1 && '#f5c6cb'}"
                            >
                                <div :class="{ 'taskIsActive' : !item.completed}">
                                    <div>
                                        <b-checkbox v-model="item.completed" name="check-button" inline
                                          :key="index"
                                          @change="finishAssignment(item.id, $event)">
                                          <strong v-if="!item.completed">{{ item.description }}</strong>
                                          <strong :style="{ color: '#aaa' }" v-else>{{ item.description }}</strong>
                                        </b-checkbox>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span class="text-left">{{ item.patientname }} {{ item.patientlastname }}</span>&nbsp;
                                            <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                                            <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                                                <i class="ri-ball-pen-fill m-0"></i>
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="openAssignments.length === 0">{{ $t('home.noOpenAssignments') }}</p>
                                <b-pagination v-if="openAssignments.length > openAssignmentsPerPage"
                                              v-model="currentOpenAssignmentsPage"
                                              :total-rows="openAssignments.length"
                                              :per-page="openAssignmentsPerPage"
                                              aria-controls="openTodos"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
                <iq-card class-name="iq-card-block iq-card-stretch">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.appointmentChart') }}</h4>
                    </template>
                    <template v-slot:body>
                        <apex-chart type="bar" height="350" :options="chartOptions" :series="series"></apex-chart>
                    </template>
                </iq-card>
            </b-col>
            <b-col lg="4">
                <iq-card class-name="iq-card-block iq-card-stretch">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.staffList') }} ({{staff.length}})</h4>
                    </template>
                    <template v-slot:body>
                        <ul class="doctors-lists m-0 p-0">
                            <li class="d-flex mb-4 align-items-center" v-for="member in staff" :key="member.id">
                                <div class="user-img img-fluid"><img :src="'/api/files/avatar/' + member.id + '?' + Math.random()" alt="story-img" class="rounded-circle avatar-40"></div>
                                <div class="media-support-info ml-3">
                                    <h6>{{member.name}}</h6>
                                    <p class="mb-0 font-size-12">{{member.specialization}}</p>
                                </div>
                                <div class="iq-card-header-toolbar d-flex align-items-center">
                                    <!--<b-dropdown size="lg"  variant="link" toggle-class="p-0 text-decoration-none" no-caret>
                              <template v-slot:button-content class="p-0">
                              <span class="dropdown-toggle p-0" id="dropdownMenuButton6" data-toggle="dropdown">
                                <i class="ri-more-2-line"></i>
                              </span>
                              </template>
                              <b-dropdown-item href="#"><i class="ri-eye-line mr-2"></i>{{ $t('home.doctorsListDropDown.view') }}</b-dropdown-item>
                              <b-dropdown-item href="#"><i class="ri-bookmark-line mr-2"></i>{{ $t('home.doctorsListDropDown.appointment') }}</b-dropdown-item>
                            </b-dropdown> -->
                                </div>
                            </li>
                        </ul>
                    </template>
                </iq-card>
                <iq-card class-name="iq-card-block iq-card-stretch">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('home.patientsByCountry') }} ({{countriesWithPatients.length}})</h4>
                    </template>
                    <template v-slot:body>
                        <div class="iq-details" :class="{'mt-3': index !== 0}" v-for="(country, index) in countriesWithPatients" :key="index">
                            <span class="title text-dark">{{country.name}}</span>
                            <div class="percentage float-right text-primary">{{ country.count }} ({{country.percentage ? Math.round(country.percentage) : 0}} <span>%</span>)</div>
                            <div class="iq-progress-bar-linear d-inline-block w-100">
                                <b-progress :value="country.percentage ? country.percentage : 0" class="pr-bar" :key="index"></b-progress>
                            </div>
                        </div>
                    </template>
                </iq-card>
            </b-col>
            <b-col lg="3">
                <!--<iq-card>
          <template v-slot:headerTitle>
              <h4 class="card-title">{{ $t('home.todaysSchedule') }}</h4>
          </template>
          <template v-slot:body>
            <ul class="m-0 p-0 today-schedule">
              <li class="d-flex">
                <div class="schedule-icon"><i class="ri-checkbox-blank-circle-fill text-primary" /></div>
                <div class="schedule-text"> <span>Implant</span>
                  <span>09:00 to 12:00</span></div>
              </li>
              <li class="d-flex">
                <div class="schedule-icon"><i class="ri-checkbox-blank-circle-fill text-success" /></div>
                <div class="schedule-text"> <span>Invisalign</span>
                  <span>09:00 to 12:00</span></div>
              </li>
            </ul>
          </template>
        </iq-card>-->
            </b-col>
            <!--<b-col lg="12">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">{{ $t('home.activityStatistics') }}</h4>
        </template>
        <template v-slot:body>
          <ApexChart element="patient-chart-01" :chartOption="chart5"/>
        </template>
      </iq-card>
    </b-col>-->
        </b-row>

        <AddEditAssignment
          v-if="todoToEdit"
          :modalAssigmentShow="editAssignmentModal"
          :todo="todoToEdit"
          :users="users"
          :enquires="enquires"
          @updated="getUserAssignments"
          @close="closeAssignmentModal"
        />

        <FooterStyle1>
            <template v-slot:left>
                <li class="list-inline-item"><a href="#">{{ $t('footer.privacyPolicy') }}</a></li>
                <li class="list-inline-item"><a href="#">{{ $t('footer.termsOfUse') }}</a></li>
            </template>
            <template v-slot:right>
                Copyright {{ new Date().getFullYear() }}
                <a href="https://www.emazing.si/en">Emazing</a> {{ $t('footer.allRightsReserved') }}.
            </template>
        </FooterStyle1>
    </b-container>
</template>
<script>
import IqCard from '../../components/xray/cards/iq-card'
import { xray } from '../../config/pluginInit'
import { getTodaysAppointments, getStaff, getAssignmentsForUser } from '../../services/homeService'
import moment from 'moment'
import { getCountriesWithPatients, getDatesForCurrentWeek } from '../../services/commonCodeLists'
import { visitsByCountryInAWeek, getDoctorsStatisticPerWeek } from '../../services/statistics'
import { getDoctorList } from '@/services/calendarService'
import { sso, getDentists, getUsers } from '@/services/userService'
import { finishAssignment } from '../../services/assignmentsService'
import { getEnquires } from '@/services/enquiry'
import AddEditAssignment from '@/components/Assignments/AddEditAssignment'

import _ from 'lodash'
const body = document.getElementsByTagName('body')
export default {
  name: 'Home',
  components: { IqCard, AddEditAssignment },
  data() {
    return {
      userId: null,
      users: [],
      enquires: [],
      todoToEdit: null,
      doctorsData: [],
      datesForCurrentWeek: [],
      dataForChart: [],
      series: [],
      dates: [],
      colors: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              pan: false,
              zoom: false,
            },
          },
          zoom: {
            enabled: true,
          },
        },
        colors: ['#089bab', '#ffb177', '#00d0ff', '#e64141', '#00ca00', '#777D74', '#374948', '#6610f2'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT',
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
      totalVisits: 0,
      countriesWithPatients: [],
      todaysAppointments: [],
      todaysAppointmentsColumns: [
        { label: this.$t('home.todaysAppointmentsColumn.patient'), key: 'patient_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.productGroup'), key: 'product_group_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.doctor'), key: 'doctor_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.time'), key: 'time', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.contact'), key: 'patient_phone', class: 'text-left' },
      ],
      staff: [],
      a: 13,
      openAssignments: [],
      openAssignmentsColumns: [
        { label: this.$t('home.openAssignmentsColumn.description'), key: 'description', class: 'text-left' },
        { label: this.$t('home.openAssignmentsColumn.patientName'), key: 'patient_name', class: 'text-left' },
        { label: 'Dentist', key: 'dentist', class: 'text-left' },
        {
          label: this.$t('home.openAssignmentsColumn.dueAt'),
          key: 'due_at',
          class: 'text-center',
          formatter: value => { return moment(value).format('ddd, D MMM') },
        },
      ],
      todaysAppointmentsPerPage: 10,
      currentTodaysAppointmentsPage: 1,
      openAssignmentsPerPage: 5,
      currentOpenAssignmentsPage: 1,
      disabled: true,
      doctors: [],
      dentists: [],
    }
  },
  async mounted() {
    xray.index()
    await this.getUserLogin()
    this.getUsersList()
    this.getEnquires()
    this.getDentists()
    this.getCountriesWithPatients()
    this.getDoctorsStatisticPerWeek()
    body[0].classList.add('sidebar-main-menu')
  },
  computed: {
    openAssignmentsList() {
      return this.openAssignments.slice(
        (this.currentOpenAssignmentsPage - 1) * this.openAssignmentsPerPage,
        this.currentOpenAssignmentsPage * this.openAssignmentsPerPage)
    },
    hideTodaysAppointmentsPagination() {
      return Math.floor(this.todaysAppointments.length / this.todaysAppointmentsPerPage) !== 0
    },
    hideOpenAssignmentsPagination() {
      return Math.floor(this.openAssignments.length / this.openAssignmentsPerPage) !== 0
    },
    openAssignmentsLength() {
      return this.openAssignments.length
    },
  },
  methods: {
    getDifferenceDate(date) {
      return Math.floor((Date.parse(new Date(Date.now())) - Date.parse(date)) / 86400000)
    },
    getDentists() {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    getUsersList() {
      getUsers().then(response => {
        if (response && Array.isArray(response)) {
          this.users = response
          this.users = this.users.map(user => {
            const userObj = Object.assign({}, user)
            userObj.full_name = user.name + ' ' + user.surname
            return userObj
          })
        }
      })
    },
    getEnquires() {
      getEnquires().then(response => {
        let enquires = [...response]
        enquires.map((item, index) => {
          enquires[index].full_name = item.name + ' ' + item.last_name
        })
        this.enquires = enquires
      })
    },
    patientsDentist(patient) {
      if (this.dentists && this.dentists.length) {
        let dentist = this.dentists.find((item) => {
          return item.code === patient.prm_dentist_user_id
        })
        return dentist && dentist.label ? dentist.label : this.$t('shared.noDoctor')
      }
    },
    getUserLogin() {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.userId = response.id
          getStaff().then(response => {
            this.staff = response
          })
          getAssignmentsForUser().then(response => {
            this.openAssignments = response
          })
          getDoctorList().then((data) => {
            this.doctors = data
            this.getDatesForCurrentWeek()
          })
        }
      })
    },
    getUserAssignments() {
      this.editAssignmentModal = false
      getAssignmentsForUser().then(response => {
        this.openAssignments = response
      })
    },
    closeAssignmentModal(val) {
      this.editAssignmentModal = false
    },
    getTodaysAppointmentsList(locale) {
      getTodaysAppointments(locale).then(response => {
        this.todaysAppointments = response
      })
    },
    getDatesForCurrentWeek() {
      getDatesForCurrentWeek().then(response => {
        let temp = _.map(response, '?column?')
        let currentWeek = temp.filter(
          (date) =>
            moment(date).week() === moment().week() &&
            moment(date).year() === moment().year()
        )
        this.dates = currentWeek
        this.datesForCurrentWeek = _.map(temp, function (date) {
          return moment(date).format('DD-MM-YYYY')
        })
        this.prepareDataForChart()
      })
    },
    editMode(e) {
      e.preventDefault()
      this.disabled = false
    },
    getDoctorsStatisticPerWeek() {
      getDoctorsStatisticPerWeek().then(response => {
        this.doctorsData = _.map(response, function (element) {
          let parsedElement = Object.assign({}, element)
          parsedElement.starts_at = moment(parsedElement.starts_at).format('DD-MM-YYYY')
          return parsedElement
        })
      })
    },
    prepareDataForChart() {
      this.doctors.forEach(doctor => {
        let tempObj = {}
        tempObj.name = doctor.name
        tempObj.data = []
        let allDoctorsData = this.doctorsData
        let tempDoctorData = _.filter(allDoctorsData, { doctor_id: doctor.id })
        this.datesForCurrentWeek.forEach(date => {
          let tempArr = _.filter(tempDoctorData, { starts_at: date })
          tempObj.data.push(tempArr.length)
        })
        const isZero = tempObj.data.every(item => item === 0)
        if (!isZero) {
          this.dataForChart.push(tempObj)
        }
      })
      this.chartOptions = { ...this.chartOptions, ...{ series: this.dataForChart, xaxis: { categories: this.dates } } }
    },
    getCountriesWithPatients() {
      getCountriesWithPatients().then(response => {
        this.countriesWithPatients = response
        this.getVisitsByCountryInAWeek()
      })
    },
    getVisitsByCountryInAWeek() {
      visitsByCountryInAWeek().then(response => {
        let visitsByCountry = response
        this.totalVisits = _.sumBy(visitsByCountry, function (o) { return +o.count })
        if (visitsByCountry && Array.isArray(visitsByCountry)) {
          visitsByCountry.forEach(element => {
            element.percentage = (element.count / this.totalVisits * 100).toFixed(2)
          })
        }

        this.countriesWithPatients = _.map(this.countriesWithPatients, function (country) {
          return _.assign(country, _.find(visitsByCountry, {
            name: country.name,
          }))
        })
        this.countriesWithPatients = _.filter(this.countriesWithPatients, function (country) {
          return country.hasOwnProperty('percentage')
        })
      })
    },
    finishAssignment(id, finished) {
      const completedBy = this.userId
      finishAssignment(id, finished, completedBy).then(response => {})
    },
    editAssignments(todo) {
      if (todo && todo.due_at) {
        todo.due_at = moment(todo.due_at).format('YYYY-MM-DD')
      }
      if (todo && todo.user_id) {
        let user = this.users.find(user => user.id === todo.user_id)
        todo.user_id = user
      }
      this.todoToEdit = Object.assign({}, todo)
      this.editAssignmentModal = true
    },
  },
}
</script>

<style lang="scss">
.pr-bar {
  height: 6px !important;
}

.pr-bar > div {
  background-color: #089bab !important;
}
</style>
