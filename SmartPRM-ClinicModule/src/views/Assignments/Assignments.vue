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
                            <b-list-group class="list-group-flush" id="todaysAssignments" :per-page="perPage" :current-page="currentPage">
                                <b-list-group-item v-for="item in items.slice(0, 15)" :key="item.id">
                                    <div class="assignments-container">
                                        <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment"></b-checkbox>
                                        <span>{{ item.description }}</span>
                                        <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                        <span class="pl-5">Dr. Zobo Zdravnik</span>
                                        <span class="text-right">{{ item.due_at | formatDate }}</span>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
                            <template>
                                <div class="mt-4 ml-2">
                                    <b-pagination v-model="currentPage"
                                                  :total-rows="totalRows"
                                                  :per-page="perPage"
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
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.overdueAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="overdueAssignments" :per-page="perPage" :current-page="currentPage">
                            <b-list-group-item v-for="item in items.slice(10, 23)" :key="item.id">
                                <div class="assignments-container">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                    <span class="pl-5">Dr. Zobo Zdravnik</span>
                                    <span class="text-right">{{ item.due_at | formatDate }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <b-pagination v-model="currentPage"
                                              :total-rows="totalRows"
                                              :per-page="perPage"
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
                        <b-list-group class="list-group-flush" id="futureAssignments" :per-page="perPage" :current-page="currentPage">
                            <b-list-group-item v-for="item in items.slice(33, 49)" :key="item.id">
                                <div class="assignments-container">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                    <span class="pl-5">Dr. Zobo Zdravnik</span>
                                    <span class="text-right">{{ item.due_at | formatDate }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <b-pagination v-model="currentPage"
                                              :total-rows="totalRows"
                                              :per-page="perPage"
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
                        <b-list-group class="list-group-flush" id="completedAssignments" :per-page="perPage" :current-page="currentPage">
                            <b-list-group-item v-for="item in items.slice(60, 78)" :key="item.id">
                                <div class="assignments-container">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="completed-assignment"></b-checkbox>
                                    <span>{{ item.description }}</span>
                                    <span class="pl-5">{{ item.patientname }} {{ item.patientlastname }}</span>
                                    <span class="pl-5">Dr. Zobo Zdravnik</span>
                                    <span class="text-right">{{ item.due_at | formatDate }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <b-pagination v-model="currentPage"
                                              :total-rows="totalRows"
                                              :per-page="perPage"
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
</style>
<script>
import { xray } from '../../config/pluginInit'
import { getAssignments } from '../../services/assignmentsService'
var rows = []
export default {
  name: 'Assignments',
  mounted () {
    xray.index()
    this.getAssignments()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getAssignments () {
      getAssignments().then(response => {
        this.items = response
      }
      )
    }
  },
  data () {
    return {
      item: [],
      disabled: false,
      index: [],
      items: rows,
      currentPage: 1,
      perPage: 10,
      totalRows: rows.length,
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
