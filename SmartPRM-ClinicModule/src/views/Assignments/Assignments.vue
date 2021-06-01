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
                                    <div class="assignments-container row align-items-center flex-nowrap" :class="{ 'taskIsActive' : !item.completed}">
                                        <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                        <span>{{ item.description }}</span>
                                        <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                      <span class="pl-5">{{ item.dentistname }}</span>
                                        <span class="text-right">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
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
                                <div class="assignments-container row align-items-center flex-nowrap" :class="{ 'taskIsActive' : !item.completed}">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                  <span class="pl-5">{{ item.dentistname }}</span>
                                    <span class="text-right">{{ item.due_at | formatDate }}</span>
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
                                <div class="assignments-container row align-items-center flex-nowrap" :class="{ 'taskIsActive' : !item.completed}">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                    <span class="pl-5">{{ item.dentistname }}</span>
                                    <span class="text-right">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
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
                                    <span>{{ item.description }}</span>
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                  <span class="pl-5">{{ item.dentistname }}</span>
                                    <span class="text-right">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
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
          :title="$t('assignments.addAssignmentsModal.addAssignments')"
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
                  label="name"
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
import { getAssignments, finishAssignment, createAssignments } from '../../services/assignmentsService'
import { getEnquires } from '@/services/enquiry'
import { sso } from '@/services/userService'

export default {
  name: 'Assignments',
  mounted () {
    xray.index()
    this.getAssignments()
    this.getEnquires()
    this.getUserLogin()
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
        this.enquires = response
      })
    },
    getDifferenceDate (date) {
      return Math.floor((Date.parse(new Date(Date.now())) - Date.parse(date)) / 86400000)
    },
    addAssignments () {
      createAssignments(this.formData).then(() => {
        this.getAssignments()
        this.formData = this.defaultFormData()
      })
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
    },
    getUserLogin () {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.formData.user_id = response.id
        }
      })
    }
  },
  data () {
    return {
      disabled: false,
      modalAssigmentShow: false,
      selectEnquires: null,
      logedInUser: {},
      enquires: [],
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
        enquiry: {},
        description: '',
        due_at: null,
        user_id: 0
      }
    }
  }
}
</script>
