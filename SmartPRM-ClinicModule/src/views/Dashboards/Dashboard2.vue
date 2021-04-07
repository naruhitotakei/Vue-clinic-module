<template>
    <b-container>
        <b-row style="justify-content: center">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                    <template v-slot:headerTitle>
                        <h4 class="card-title">Overdue assignments</h4>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive table-borderless">
                                <b-table id="my-overdue-assignments"
                                         thead-class="d-none"
                                         hover
                                         :items="items"
                                         :fields="columns"
                                         :per-page="perPage"
                                         :current-page="currentPage">
                                    <template v-slot:cell(completed)="data">
                                        <b-checkbox v-model="data.item.completed" :disabled="item.disabled" name="check-button" inline :key="index">
                                        </b-checkbox>
                                    </template>
                                    <template v-slot:cell(description)="data">
                                        {{ data.item.description }}
                                    </template>
                                    <template v-slot:cell(fullname)="data">
                                        {{ data.item.patientname }} {{ data.item.patientlastname }}
                                    </template>
                                    <template v-slot:cell(due_at)="data">
                                        {{ data.item.due_at }}
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </template>
                    <!--<template v-slot:headerTitle>
                        <h4 class="card-title">My Assignments</h4>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive table-borderless">
                                <b-table id="my-assignments"
                                         thead-class="d-none"
                                         hover
                                         :items="items"
                                         :fields="columns"
                                         :per-page="perPage"
                                         :current-page="currentPage">
                                    <template v-slot:cell(completed)="data">
                                        <b-checkbox v-model="data.item.completed" :disabled="item.disabled" name="check-button" inline :key="index">
                                        </b-checkbox>
                                    </template>
                                    <template v-slot:cell(description)="data">
                                        {{ data.item.description }}
                                    </template>
                                    <template v-slot:cell(fullname)="data">
                                        {{ data.item.patientname }} {{ data.item.patientlastname }}
                                    </template>
                                    <template v-slot:cell(due_at)="data">
                                        {{ data.item.due_at }}
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </template>-->
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
const addZero = value => (`0${value}`).slice(-2)
const formatDate = value => {
  if (value) {
    const dt = new Date(value)
    return `${addZero(dt.getDate())}.${addZero(
      dt.getMonth() + 1
    )}.${dt.getFullYear()}`
  }
  return ''
}
var rows = []
export default {
  name: 'Dashboard2',
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
      getAssignments().then(response => { this.items = response })
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
      columns: [
        { label: 'Completed', key: 'completed', class: 'completed-column' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Patient name', key: 'fullname', class: 'text-left' },
        { label: 'Personal Dentist', key: 'dentistname', class: 'text-left' },
        { label: 'Due at', key: 'due_at', class: 'text-right', format: formatDate }
      ],
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
