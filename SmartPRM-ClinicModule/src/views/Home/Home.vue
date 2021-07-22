<template>
  <b-container fluid>
    <b-row>
      <b-col lg="8">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" style="height: auto !important;">
          <template v-slot:headerTitle>
              <h4 class="card-title">{{ $t('home.todaysAppointments') }}</h4>
          </template>
          <template v-slot:headerAction>
           <!-- <b-dropdown size="lg p-0"  variant="link" toggle-class="text-decoration-none" no-caret>
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
            </b-dropdown> -->
          </template>
              <template v-slot:body>
                  <b-table v-if="todaysAppointments.length > 0"
                           borderless outlined
                           id="todaysAppointmentsTable"
                           :items="todaysAppointments"
                           :fields="todaysAppointmentsColumns"
                           :per-page="todaysAppointmentsPerPage"
                           :current-page="currentTodaysAppointmentsPage"></b-table>
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
                <h4 class="card-title">{{ $t('home.openAssignments') }}</h4>
              </template>
              <template v-slot:headerAction>
                <div class="iq-card-header-toolbar d-flex align-items-center">
                  <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                      <i class="ri-more-fill"></i>
                    </template>
                    <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>{{ $t('home.operationsDropDown.view') }}</b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
              <template v-slot:body>
                      <b-table v-if="openAssignments.length > 0"
                               borderless outlined
                               id="openAssignmentsTable"
                               :items="openAssignments"
                               :fields="openAssignmentsColumns"
                               :per-page="openAssignmentsPerPage"
                               :current-page="currentOpenAssignmentsPage"></b-table>
                      <p v-else>{{ $t('home.noOpenAssignments') }}</p>
                  </template>
                  <template>
                      <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                      <div class="ml-4 pb-2">
                          <b-pagination v-if="hideOpenAssignmentsPagination"
                                        v-model="currentOpenAssignmentsPage"
                                        :total-rows="openAssignments.length"
                                        :per-page="openAssignmentsPerPage"
                                        aria-controls="openAssignmentsTable">
                          </b-pagination>
                      </div>
              </template>
            </iq-card>
      </b-col>
      <b-col lg="4">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" style="height: auto;">
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ $t('home.staffList') }}</h4>
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
            <a href="javascript:void(0);" class="btn btn-primary d-block mt-3"><i class="ri-add-line"></i>{{ $t('home.staffListBtn') }}</a>
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
    <b-col lg="12">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">{{ $t('home.activityStatistics') }}</h4>
        </template>
        <template v-slot:body>
          <ApexChart element="patient-chart-01" :chartOption="chart5"/>
        </template>
      </iq-card>
    </b-col>
    </b-row>
  </b-container>
</template>
<script>
import IqCard from '../../components/xray/cards/iq-card'
import { xray } from '../../config/pluginInit'
import { getTodaysAppointments, getStaff, getAssignmentsForUser } from '../../services/homeService'
import moment from 'moment'
const body = document.getElementsByTagName('body')
export default {
  name: 'Home',
  components: { IqCard },
  data () {
    return {
      chart5: {
        series: [{
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14]
        }],
        colors: ['#089bab', '#FC9F5B', '#5bc5d1'],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ]
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      todaysAppointments: [],
      todaysAppointmentsColumns: [
        { label: this.$t('home.todaysAppointmentsColumn.patient'), key: 'patient_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.doctor'), key: 'doctor_name', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.time'), key: 'time', class: 'text-left' },
        { label: this.$t('home.todaysAppointmentsColumn.contact'), key: 'patient_phone', class: 'text-left' }
      ],
      staff: [],
      openAssignments: [],
      openAssignmentsColumns: [
        { label: this.$t('home.openAssignmentsColumn.description'), key: 'description', class: 'text-left' },
        { label: this.$t('home.openAssignmentsColumn.patientName'), key: 'patient_name', class: 'text-left' },
        {
          label: this.$t('home.openAssignmentsColumn.dueAt'),
          key: 'due_at',
          class: 'text-center',
          formatter: value => { return moment(value).format('ddd, D MMM') }
        }
      ],
      todaysAppointmentsPerPage: 10,
      currentTodaysAppointmentsPage: 1,
      openAssignmentsPerPage: 5,
      currentOpenAssignmentsPage: 1
    }
  },
  mounted () {
    xray.index()
    this.getTodaysAppointmentsList()
    this.getStaffList()
    this.getAssignmentsForUserList()
    body[0].classList.add('sidebar-main-menu')
  },
  computed: {
    hideTodaysAppointmentsPagination () {
      return Math.floor(this.todaysAppointments.length / this.todaysAppointmentsPerPage) !== 0
    },
    hideOpenAssignmentsPagination () {
      return Math.floor(this.openAssignments.length / this.openAssignmentsPerPage) !== 0
    }
  },
  destroyed () {
    body[0].classList.remove('sidebar-main-menu')
  },
  methods: {
    getTodaysAppointmentsList () {
      getTodaysAppointments().then(response => {
        this.todaysAppointments = response
      })
    },
    getStaffList () {
      getStaff().then(response => {
        this.staff = response
      })
    },
    getAssignmentsForUserList () {
      getAssignmentsForUser().then(response => {
        this.openAssignments = response
      })
    }
  }
}
</script>

<style scoped>

</style>
