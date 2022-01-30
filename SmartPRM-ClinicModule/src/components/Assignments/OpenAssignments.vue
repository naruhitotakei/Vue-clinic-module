<template>
    <div>
        <AddEditAssignment
          v-if="todoToEdit"
          :modalAssigmentShow="editAssignmentModal"
          :todo="todoToEdit"
          @updated="getUserAssignments"
          @close="closeAssignmentModal"
        />
        <iq-card class-name="iq-card-block iq-card-stretch" style="margin-top: 0 !important">
            <template v-slot:headerTitle>
                <h4 class="card-title">{{ $t('home.openAssignments') }} ({{openAssignmentsLength}})</h4>
            </template>
            <template v-slot:headerAction>
                <div v-if="homePage" class="iq-card-header-toolbar d-flex align-items-center">
                    <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template v-slot:button-content>
                            <i class="ri-more-fill"></i>
                        </template>
                        <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>{{ $t('home.operationsDropDown.view') }}</b-dropdown-item>
                    </b-dropdown>
                </div>
            </template>
            <template v-slot:body>
                <b-list-group class="list-group-flush" id="openTodos">
                    <b-list-group-item v-for="(item, index) in openAssignmentsList"
                        :key="index"
                        :style="{'background': getDifferenceDate(item.due_at) === 1 && '#ffeeba' || getDifferenceDate(item.due_at) > 1 && 'white'}"
                    >
                        <div :class="{ 'taskIsActive' : !item.completed}">
                            <div class="checkbox_text">
                                <b-checkbox class="checkbox" v-model="item.completed" name="check-button" inline
                                    :key="index"
                                    @change="finishAssignment(item.id, $event)">
                                </b-checkbox>
                                    <!-- <strong v-if="!item.completed">{{ item.description }}</strong> -->
                                    <strong :class="{'red-text': isItOverdue(item.due_at)}" v-if="!item.completed">{{ item.description }}</strong>
                                    <strong :style="{ color: '#aaa' }" v-else>{{ item.description }}</strong>

                            </div>
                            <div class="d-flex align-items-center justify-content-between">
                                <div>
                                    <span v-if="epr" class="text-left">{{ item.name }}</span>&nbsp;
                                    <router-link v-if="homePage" tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                                    <span v-if="homePage" class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="text-right date">{{ item.due_at | formatDateWithYear }}</span>
                                    <b-button v-if="homePage" variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
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
    </div>
</template>

<script>
import { finishAssignment } from '../../services/assignmentsService'
import { getAssignmentsForUser } from '../../services/homeService'
import { getEnquiryAssignments } from '../../services/enquiry'
import { getDentists } from '@/services/userService'
import AddEditAssignment from '@/components/Assignments/AddEditAssignment'
import moment from 'moment'

export default {
  name: 'OpenAssignments',
  components: {
    AddEditAssignment,
  },
  mounted() {
    this.fetchOpenAssignmentsForUser()
    this.getDentists()
  },
  props: {
    userId: String,
    homePage: {
      type: Boolean,
      default: false,
    },
    epr: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openAssignments: [],
      openAssignmentsPerPage: 5,
      currentOpenAssignmentsPage: 1,
      dentists: [],
    }
  },
  computed: {
    openAssignmentsList() {
      return this.openAssignments.slice(
        (this.currentOpenAssignmentsPage - 1) * this.openAssignmentsPerPage,
        this.currentOpenAssignmentsPage * this.openAssignmentsPerPage)
    },
    openAssignmentsLength() {
      return this.openAssignments.length
    },
  },
  methods: {
    fetchOpenAssignmentsForUser() {
      if (this.homePage) {
        getAssignmentsForUser().then(response => {
          this.openAssignments = response
        })
      }
      if (this.epr) {
        getEnquiryAssignments(this.userId).then(response => {
          if (Array.isArray(response)) {
            this.openAssignments = response.filter(todo => !todo.completed)
            this.completedAssignments = response.filter(todo => todo.completed)
          }
        })
      }
    },
    getDifferenceDate(date) {
      return Math.floor((Date.parse(new Date(Date.now())) - Date.parse(date)) / 86400000)
    },
    finishAssignment(id, finished) {
      const completedBy = this.userId
      finishAssignment(id, finished, completedBy).then(response => {
        if (this.epr) {
          if (finished) {
            let open = this.openAssignments.find(todo => todo.id === id)
            open.completed = true
            this.completedAssignments.push(open)
            this.openAssignments = this.openAssignments.filter(todo => todo.id !== id)
            this.$emit('completed-assignments', this.completedAssignments)
          }
        }
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
    getDentists() {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    isItOverdue(date) {
      return moment().isAfter(date)
    },
    getUserAssignments() {
      this.editAssignmentModal = false
      getAssignmentsForUser().then(response => {
        this.openAssignments = response
      })
    },
  },
}
</script>

<style lang="scss">
.checkbox_text{
  display: flex;
  justify-content: flex-start;
}
.checkbox{
  margin-right: 0 !important;
}
.date{
  min-width: 150px;
}
</style>
