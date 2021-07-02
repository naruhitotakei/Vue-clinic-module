<template>
    <b-container fluid>
        <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height todaysAssignments-body">
                    <template v-slot:headerTitle>
                      <div class="row justify-content-between pl-3 pr-3">
                        <h4 class="card-title">{{ $t('assignments.assignmentsHeader') }}</h4>
                        <div class="btn-add-patient  mt-0">
                          <b-button variant="primary" @click="modalAssigmentShow = true"><i class="ri-add-line mr-2"></i>{{ $t('assignments.addAssignments') }}</b-button>
                        </div>
                      </div>
                    </template>
                    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                        <template v-slot:headerTitle>
                            <h5>{{ $t('assignments.todaysAssignments') }}</h5>
                        </template>
                        <template v-slot:body>
                            <b-list-group class="list-group-flush" id="todaysAssignments">
                                <b-list-group-item
                                    v-for="(item, index) in todaysAssigments"
                                    :key="index"
                                >
                                    <div class="assignments-container row align-items-center flex-nowrap justify-content-between w-100" :class="{ 'taskIsActive' : !item.completed}">
                                       <div class="row align-items-center flex-nowrap w-40">
                                         <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment ml-3 mr-0" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                         <span class="assignments-descriptions w-100 text-break">{{ item.description }}</span>
                                       </div>
                                       <div class="w-60 row justify-content-end flex-nowrap">
                                         <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                         <span class="pl-5">{{ patientsDentist(item) }}</span>
                                         <span class="text-right text-width-150">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%" @click="editAssignments(item)" >
                                          <i class="ri-ball-pen-fill m-0"></i>
                                        </b-button>
                                       </div>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
                            <template>
                                <div class="mt-4 ml-2">
                                    <p v-if="todaysTotalRows === 0"> You have no assignment today.</p>
                                     <b-pagination
                                         v-else-if="todaysTotalRows > 20"
                                         v-model="todayCurrentPage"
                                        :total-rows="todaysTotalRows"
                                        :per-page="todayPerPage"
                                        aria-controls="todaysAssignments"></b-pagination>
                                </div>
                            </template>
                        </template>
                    </iq-card>
                </iq-card>
            </b-col>
        </b-row>
        <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height overdueAssignments-body">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.overdueAssignments') }}</h5>
                    </template>
                  <template v-slot:body>
                    <b-list-group class="list-group-flush" id="overdueAssignments">
                      <b-list-group-item
                          v-for="(item, index) in overdueAssignments[overdueCurrentPage]"
                          :key="index"
                          :style="{'background': getDifferenceDate(item.due_at) === 1 && '#ffeeba' || getDifferenceDate(item.due_at) > 1 && '#f5c6cb'}">
                        <div class="assignments-container row align-items-center flex-nowrap justify-content-between w-100"
                             :class="{ 'taskIsActive' : !item.completed}">
                           <div class="w-40 flex-nowrap row">
                             <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline
                                         :key="index" class="completed-assignment ml-3 mr-0"
                                         @change="finishAssignment(item.id, $event)"></b-checkbox>
                             <span class="assignments-descriptions  w-100 text-break">{{ item.description }}</span>
                           </div>
                           <div class="w-60 row justify-content-end flex-nowrap">
                             <span class="pl-5 text-left">{{ item.patientname }} {{ item.patientlastname }}</span>
                             <span class="pl-5 text-left">{{ patientsDentist(item) }}</span>
                             <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                             <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                               <i class="ri-ball-pen-fill m-0"></i>
                             </b-button>
                           </div>
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                    <template>
                            <div class="mt-4 ml-2">
                              <p v-if="overdueTotalRows === 0"> You have no overdue assignments.</p>
                                <b-pagination
                                    v-else-if="overdueTotalRows > 20"
                                    v-model="overdueCurrentPage"
                                    :total-rows="overdueTotalRows"
                                    :per-page="overduePerPage"
                                    aria-controls="overdueAssignments"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height futureAssignments-body">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.futureAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="futureAssignments" :per-page="futurePerPage" :current-page="futureCurrentPage">
                            <b-list-group-item
                                v-for="(item, index) in futureAssigments[futureCurrentPage]"
                                :key="index"
                            >
                                <div class="assignments-container row align-items-center flex-nowrap justify-content-between w-100" :class="{ 'taskIsActive' : !item.completed}">
                                    <div class="w-40 flex-nowrap row">
                                      <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment ml-3 mr-0" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                      <span class="assignments-description  w-100 text-break">{{ item.description }}</span>
                                    </div>
                                  <div class="w-60 row justify-content-end flex-nowrap">
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5 text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                    <span class="pl-5 text-left">{{ patientsDentist(item) }}</span>
                                    <span class="text-right text-width-150">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
                                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                                      <i class="ri-ball-pen-fill m-0"></i>
                                    </b-button>
                                  </div>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="futureTotalRows===0"> You have no future assignments.</p>
                                <b-pagination
                                    v-else
                                    v-model="futureCurrentPage"
                                    :total-rows="futureTotalRows"
                                    :per-page="futurePerPage"
                                    aria-controls="futureAssignments"
                                ></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height completedAssignments-body">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.completedAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="completedAssignments" :per-page="completedPerPage" :current-page="completedCurrentPage">
                            <b-list-group-item v-for="(item, index) in completedAssigments[completedCurrentPage]" :key="index">
                                <div class="assignments-container row align-items-center flex-nowrap" :class="{ 'taskIsActive' : !item.completed}">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                    <span class="assignments-description">{{ item.description }}</span>
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                  <span class="pl-5">{{ patientsDentist(item) }}</span>
                                    <span class="text-right ">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="completedTotalRows===0"> You have no completed assignments.</p>
                                <b-pagination
                                    v-else-if="completedTotalRows > 20"
                                    v-model="completedCurrentPage"
                                    :total-rows="completedTotalRows"
                                    :per-page="completedPerPage"
                                    aria-controls="completedAssignments"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
      <b-modal
          v-model="modalAssigmentShow"
          no-close-on-backdrop
          size="md"
          :ok-disabled="isOkDisabled"
          :title="!formData.id ? $t('assignments.addAssignmentsModal.addAssignments') : $t('assignments.addAssignmentsModal.editAssignments')"
          :ok-title="$t('assignments.addAssignmentsModal.save')"
          :cancel-title="$t('assignments.addAssignmentsModal.close')"
          @ok="addAssignments"
          @close="cancelAssignments"
          @cancel="cancelAssignments"
      >
        <form>
          <div class="form-row">
            <div class="col-md-12 mb-3">
              <label for="title">{{ $t('assignments.addAssignmentsModal.enquiry') }} *</label>
              <v-select
                  taggable
                  :clearable="false"
                  label="full_name"
                  :options="enquires"
                  v-model="formData.enquiry"
              >
                <template v-slot:option="option">
                  {{ option.name }} {{option.last_name}}
                </template>
              </v-select>
            </div>
            <div class="col-md-12 mb-3">
              <label for="title">{{ $t('assignments.addAssignmentsModal.description') }} *</label>
              <div style="display: flex;">
                <textarea type="text" v-model="formData.description" class="form-control" placeholder="Description"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label for="title">{{ $t('assignments.addAssignmentsModal.due_at') }} </label>
                <b-form-input class="date" id="exampleInputdate" type="date" v-model="formData.due_at" ></b-form-input>
            </div>
            <template v-if="formData.id">
              <div class="col-md-12 mb-3">
                <label for="title">{{ $t('assignments.addAssignmentsModal.patientAttended') }} </label>
               <div>
                 <b-form-radio inline v-model="formData.patient_attended"  value="null">null</b-form-radio>
                 <b-form-radio inline v-model="formData.patient_attended"  value="true">true</b-form-radio>
                 <b-form-radio inline v-model="formData.patient_attended"  value="false">false</b-form-radio>
               </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="title">{{ $t('assignments.addAssignmentsModal.appointmentCanceledInAdvanceByClinic') }} </label>
                <div >
                  <b-form-radio inline v-model="formData.appointment_canceled_in_advance_by_clinic"  value="true">true</b-form-radio>
                  <b-form-radio inline v-model="formData.appointment_canceled_in_advance_by_clinic"  value="false">false</b-form-radio>
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="title">{{ $t('assignments.addAssignmentsModal.appointmentCanceledInAdvanceByPatient') }} </label>
                <div>
                  <b-form-radio inline v-model="formData.appointment_canceled_in_advance_by_patient"  value="true">true</b-form-radio>
                  <b-form-radio inline v-model="formData.appointment_canceled_in_advance_by_patient"  value="false">false</b-form-radio>
                </div>
              </div>
            </template>
          </div>
        </form>
      </b-modal>
    </b-container>
</template>
<style lang="scss" >
[dir=ltr] .iq-sidebar .iq-menu li.active {
    background-color: #ffffff;
    border-radius: 15px;
}

.taskIsActive {
    color: black;
}

.custom-control-label {
  &:before,
  &:after{
    top: 50%;
    transform: translateY(-50%);
  }
}

body  .custom-control-label::before {
  top:50% !important;
}
body  .custom-control-label::after {
  top:50% !important;
}

@media (max-width: 1661px) {
  body .wrapper .assignments-container .assignments-description {
    width: 384px;
  }
  body .wrapper .assignments-container span {
    width: 265px;
  }
  .text-width-150 {
    width: 150px !important;
  }
}

@media (max-width: 1441px) {
  body .wrapper .assignments-container .assignments-description {
    width: 284px;
  }
  body .wrapper .assignments-container span {
    width: 227px;
  }
}

@media (max-width: 1361px) {
  body .wrapper .assignments-container span {
    width: 189px;
  }
}

@media(max-width: 1000px) {
  #todaysAssignments,
  #overdueAssignments,
  #futureAssignments,
  #completedAssignments{
    width: 900px;
  }

  .todaysAssignments-body,
  .overdueAssignments-body,
  .futureAssignments-body,
  .completedAssignments-body{
    overflow-y: scroll;
  }

}

</style>
<script>
import { xray } from '../../config/pluginInit'
import { getAssignments, finishAssignment, createAssignments, updateAssignments } from '../../services/assignmentsService'
import { getEnquires } from '@/services/enquiry'
import { getDentists, sso } from '@/services/userService'
import moment from 'moment'

export default {
  name: 'Assignments',
  mounted () {
    xray.index()
    this.getAssignments()
    this.getEnquires()
    this.getUserLogin()
    this.getDentists()
  },
  watch: {
  },
  computed: {
    getLocale () {
      return this.$store.getters['Setting/langState'].value ? this.$store.getters['Setting/langState'].value : this.$store.getters['Setting/langState']
    },
    isOkDisabled () {
      return !this.formData.due_at || !this.formData.description
    }
  },
  methods: {
    editAssignments (assignment) {
      console.log(assignment)
      let enquiry = this.enquires.find(item => item.id === assignment.enquiry_id)
      this.formData = {
        id: assignment.id,
        enquiry: enquiry,
        description: assignment.description,
        due_at: moment(assignment.due_at).format('YYYY-MM-DD'),
        user_id: assignment.user_id,
        patient_attended: assignment.patient_attended,
        appointment_canceled_in_advance_by_clinic: assignment.appointment_canceled_in_advance_by_clinic,
        appointment_canceled_in_advance_by_patient: assignment.appointment_canceled_in_advance_by_patient

      }
      this.modalAssigmentShow = true
    },
    getAssignments () {
      getAssignments('today').then(response => {
        this.todaysAssigments = response
        this.todaysTotalRows = response.length
      })
      getAssignments('future').then(response => {
        let res = []
        let reverseResponse = response.reverse()
        for (let i = 0; i < response.length; i += 3) {
          res = [...res, reverseResponse.slice(i, i + 20)]
        }
        this.futureAssigments = res
        this.futureTotalRows = response.length
      })
      getAssignments('past').then(response => {
        let res = []
        let reverseResponse = response.reverse()
        for (let i = 0; i < response.length; i += 3) {
          res = [...res, reverseResponse.slice(i, i + 20)]
        }
        this.overdueAssignments = res
        this.overdueTotalRows = response.length
      })
      getAssignments('finished').then(response => {
        let res = []
        let reverseResponse = response.reverse()
        for (let i = 0; i < response.length; i += 3) {
          res = [...res, reverseResponse.slice(i, i + 20)]
        }
        this.completedAssigments = res
        this.completedTotalRows = response.length
      })
    },
    finishAssignment (id, finished) {
      finishAssignment(id, finished).then(response => {
      })
    },
    getEnquires () {
      getEnquires().then(response => {
        let enquires = [...response]
        enquires.map((item, index) => {
          enquires[index].full_name = item.name + ' ' + item.last_name
        })
        this.enquires = enquires
      })
    },
    getDifferenceDate (date) {
      return Math.floor((Date.parse(new Date(Date.now())) - Date.parse(date)) / 86400000)
    },
    addAssignments () {
      if (this.formData.id) {
        updateAssignments(this.formData.id, this.formData).then(() => {
          this.getAssignments()
          console.log('udpated', this.formData)
          this.formData = this.defaultFormData()
          this.getUserLogin()
        })
      } else {
        createAssignments(this.formData).then(() => {
          this.getAssignments()
          this.formData = this.defaultFormData()
          this.getUserLogin()
        })
      }
    },
    defaultFormData () {
      return {
        enquiry: null,
        description: '',
        due_at: null,
        user_id: 0
      }
    },
    cancelAssignments () {
      this.formData = this.defaultFormData()
      this.getUserLogin()
    },
    getUserLogin () {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.formData.user_id = response.id
        }
      })
    },
    getDentists () {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    patientsDentist (patient) {
      let dentist = this.dentists.find((item) => {
        return item.code === patient.prm_dentist_user_id
      })
      return dentist && dentist.label
    }
  },
  data () {
    return {
      disabled: false,
      modalAssigmentShow: false,
      selectEnquires: null,
      logedInUser: {},
      enquires: [],
      dentists: [],
      index: [],
      todaysAssigments: [],
      overdueAssignments: [],
      futureAssigments: [],
      todaysTotalRows: 0,
      overdueTotalRows: 0,
      futureTotalRows: 0,
      completedAssigments: [],
      completedTotalRows: 0,
      todayCurrentPage: 1,
      todayPerPage: 10,
      overdueCurrentPage: 1,
      overduePerPage: 20,
      futureCurrentPage: 1,
      futurePerPage: 10,
      completedCurrentPage: 0,
      completedPerPage: 10,
      bool: [
        { label: 'Completed', checked: true },
        { label: 'Completed', checked: false }
      ],
      state: [
        { label: 'False/Inactive', checked: false, disabled: false },
        { label: 'True/Active', checked: true, disabled: false }
      ],
      formData: {
        id: 0,
        enquiry: {},
        description: '',
        due_at: null,
        user_id: 0,
        patient_attended: null,
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      }
    }
  }
}
</script>
