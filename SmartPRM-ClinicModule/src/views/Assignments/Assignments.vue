<template>
    <b-container fluid>
        <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('assignments.assignmentsHeader') }}</h4>
                    </template>
                    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                        <template v-slot:headerTitle>
                            <h5>{{ $t('assignments.todaysAssignments') }}</h5>
                        </template>
                        <template v-slot:body>
                            <b-list-group class="list-group-flush" id="todaysAssignments">
                                <b-list-group-item v-for="(item, index) in todaysAssigments" :key="index">
                                    <div class="assignments-container" :class="{ 'taskIsActive' : !item.completed}">
                                        <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                        <span>{{ item.description }}</span>
                                        <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                        <span class="pl-5">Dr. Zobo Zdravnik</span>
                                        <span class="text-right">{{ item.due_at | formatDate }}</span>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
                            <template>
                                <div class="mt-4 ml-2">
                                    <p v-if="todaysTotalRows===0"> You have no assignment today.</p>
                                     <b-pagination v-else v-model="todayCurrentPage"
                                              :total-rows="todaysTotalRows"
                                              :per-page="todayPerPage"
                                              aria-controls="overdueAssignments"></b-pagination>
                                </div>
                            </template>
                        </template>
                    </iq-card>
                </iq-card>
            </b-col>
        </b-row>
        <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.overdueAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="overdueAssignments">
                            <b-list-group-item v-for="(item, index) in overdueAssignments" :key="index">
                                <div class="assignments-container" :class="{ 'taskIsActive' : !item.completed}">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                    <span class="pl-5">Dr. Zobo Zdravnik</span>
                                    <span class="text-right">{{ item.due_at | formatDate }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="overdueTotalRows===0"> You have no overdue assignments.</p>
                                <b-pagination v-else v-model="overdueCurrentPage"
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
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.futureAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="futureAssignments" :per-page="futurePerPage" :current-page="futureCurrentPage">
                            <b-list-group-item v-for="(item, index) in futureAssigments" :key="index">
                                <div class="assignments-container" :class="{ 'taskIsActive' : !item.completed}">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                    <span class="pl-5">Dr. Zobo Zdravnik</span>
                                    <span class="text-right">{{ item.due_at | formatDate }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="futureTotalRows===0"> You have no future assignments.</p>
                                <b-pagination v-else v-model="futureCurrentPage"
                                              :total-rows="futureTotalRows"
                                              :per-page="futurePerPage"
                                              aria-controls="futureAssignments"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.completedAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="completedAssignments" :per-page="completedPerPage" :current-page="completedCurrentPage">
                            <b-list-group-item v-for="(item, index) in completedAssigments" :key="index">
                                <div class="assignments-container" :class="{ 'taskIsActive' : !item.completed}">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                    <span class="pl-5">Dr. Zobo Zdravnik</span>
                                    <span class="text-right">{{ item.due_at | formatDate }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="completedTotalRows===0"> You have no completed assignments.</p>
                                <b-pagination v-else v-model="completedCurrentPage"
                                              :total-rows="completedTotalRows"
                                              :per-page="completedPerPage"
                                              aria-controls="completedAssignments"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<style>
[dir=ltr] .iq-sidebar .iq-menu li.active {
    background-color: #ffffff;
    border-radius: 15px;
}
.taskIsActive {
    color: black;
}
</style>
<script>
import { xray } from '../../config/pluginInit'
import { getAssignments, finishAssignment } from '../../services/assignmentsService'

export default {
  name: 'Assignments',
  mounted () {
    xray.index()
    this.getAssignments()
  },
  watch: {
  },
  methods: {
    getAssignments () {
      getAssignments('today').then(response => {
        this.todaysAssigments = response
        this.todaysTotalRows = response.length
      })
      getAssignments('future').then(response => {
        this.futureAssigments = response
        this.todaysTotalRows = response.length
      })
      getAssignments('past').then(response => {
        this.overdueAssignments = response
        this.overdueTotalRows = response.length
      })
    },
    finishAssignment (id, finished) {
      finishAssignment(id, finished).then(response => {
      })
    }
  },
  data () {
    return {
      disabled: false,
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
      overduePerPage: 10,
      futureCurrentPage: 1,
      futurePerPage: 10,
      completedCurrentPage: 1,
      completedPerPage: 10,
      bool: [
        { label: 'Completed', checked: true },
        { label: 'Completed', checked: false }
      ],
      state: [
        { label: 'False/Inactive', checked: false, disabled: false },
        { label: 'True/Active', checked: true, disabled: false }
      ]
    }
  }
}
</script>
