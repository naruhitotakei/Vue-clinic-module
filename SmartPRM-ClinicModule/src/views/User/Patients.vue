<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('patients.patientsHeader') }}</h3>
                        <div class="btn-add-patient">
                            <b-button variant="primary" @click="add"><i class="ri-add-line mr-2"></i>{{ $t('patients.addPatient') }}</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="search" class="text search-input" v-model="filter" placeholder="Search">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card>
                                <b-form-group label-for="searchOptions"
                                              label="Search By:">
                                    <b-form-select
                                      plain
                                      v-model="filterOn"
                                      :options="searchOptions"
                                      id="searchOptions"
                                    >
                                    </b-form-select>
                                </b-form-group>
                            </iq-card>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                  bordered
                                  hover
                                  :busy="!isDataLoaded"
                                  @row-clicked="onPatientClick"
                                  style="cursor: pointer;"
                                  :items="patients"
                                  :fields="columns"
                                  :per-page="perPage"
                                  :current-page="currentPage"
                                  :filter="filter"
                                  :filter-included-fields="filterOn"
                                  @filtered="onFiltered"
                                >
                                    <template #table-busy>
                                      <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong class="loading">Loading...</strong>
                                      </div>
                                    </template>
                                    <template v-slot:cell(name)="data">
                                      <span v-if="!data.item.editable">{{ data.item.name }}</span>
                                      <input type="text" v-model="data.item.name" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(last_name)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.last_name }}
                                      </span>
                                      <input type="text" v-model="data.item.last_name" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(phone)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.phone }}
                                      </span>
                                      <input type="text" v-model="data.item.phone" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(email)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.email }}
                                      </span>
                                      <input type="text" v-model="data.item.email" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(region)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.region }}
                                      </span>
                                      <input type="text" v-model="data.item.region" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(country)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.country }}
                                      </span>
                                      <input type="text" v-model="data.item.country" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(last_visit)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.last_visit }}
                                      </span>
                                      <input type="text" v-model="data.item.last_visit" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(next_visit)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.next_visit }}
                                      </span>
                                      <input type="text" v-model="data.item.next_visit" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(personal_dentist)="data">
                                      <span v-if="!data.item.editable">
                                          {{ data.item.personal_dentist }}
                                      </span>
                                      <input type="text" v-model="data.item.personal_dentist" v-else class="form-control" />
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable">
                                          <i class="ri-ball-pen-fill m-0"></i>
                                      </b-button>
                                      <b-button variant=" iq-bg-primary mr-1 mb-1" size="sm" @click="emailPatient(data.item)" v-if="!data.item.editable">
                                          <i class="ri-mail-line m-0"></i>
                                      </b-button>
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submit(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="cancel(data.item)" v-if="data.item.editable"><i class="ri-close-circle-fill m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination
                                  v-model="currentPage"
                                  :total-rows="totalRows"
                                  :per-page="perPage"
                                  aria-controls="my-table"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { getEnquires } from '../../services/enquiry'

var rows = []
export default {
  name: 'UiDataTable',
  async mounted () {
    xray.index()
    this.getPatients()
  },
  methods: {
    add () {
      let obj = this.default()
      this.patients.push(obj)
      this.setTotalRows(this.patients.length)
    },
    onPatientClick (item) {
      this.$router.push({ path: `/patients/${item.id}` })
    },
    default () {
      return {
        id: this.rows.length,
        name: '',
        last_name: '',
        phone: '',
        email: '',
        age: '',
        start_date: '2011/04/25',
        salary: '$0',
        editable: false
      }
    },
    edit (item) {
      this.tempPatient = Object.assign({}, item)
      item.editable = true
    },
    submit (item) {
      item.editable = false
    },
    cancel (item) {
      let index = this.patients.indexOf(item)
      this.patients.splice(index, 1, this.tempPatient)
    },
    emailPatient (item) {
      console.log('Email sent to patients address: ' + item.email)
    },
    async getPatients () {
      getEnquires().then(response => {
        this.toggleDataLoaded()
        this.patients = response.map(obj => (
          { ...obj,
            editable: false,
            region: 'n/a',
            country: 'n/a',
            last_visit: '2011/04/25',
            next_visit: '2011/04/30',
            personal_dentist: 'Doctor3'
          }
        ))
        this.setTotalRows(this.patients.length)
      })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    setTotalRows (number) {
      this.totalRows = number
    },
    toggleDataLoaded () {
      this.isDataLoaded = !this.isDataLoaded
    }
  },
  data () {
    return {
      dropDownText: '',
      isDataLoaded: false,
      patients: [],
      items: rows,
      paginatedItems: rows,
      tempPatient: null,
      currentPage: 1,
      perPage: 10,
      totalRows: 1,
      filter: '',
      filterOn: [],
      searchOptions: [
        // { value: null, text: 'Select search option' },
        { value: 'name', text: 'Name' },
        { value: 'last_name', text: 'Last Name' },
        { value: 'phone', text: 'Phone' },
        { value: 'email', text: 'Email' },
        { value: 'country', text: 'Country' },
        { value: 'region', text: 'Region' },
        { value: 'last_visit', text: 'Last Visit' },
        { value: 'next_visit', text: 'Next Visit' },
        { value: 'personal_dentist', text: 'Personal Dentist' }
      ],
      columns: [
        { label: this.$t('patients.patientsColumn.name'), key: 'name', class: 'text-left' },
        { label: this.$t('patients.patientsColumn.lastName'), key: 'last_name', class: 'text-left' },
        { label: this.$t('patients.patientsColumn.telephone'), key: 'phone', class: 'text-left' },
        { label: this.$t('patients.patientsColumn.email'), key: 'email', class: 'text-left' },
        { label: this.$t('patients.patientsColumn.region'), key: 'region', class: 'text-left' },
        { label: this.$t('patients.patientsColumn.state'), key: 'country', class: 'text-left' },
        { label: this.$t('patients.patientsColumn.lastVisit'), key: 'last_visit', class: 'text-left' },
        { label: this.$t('patients.patientsColumn.nextVisit'), key: 'next_visit', class: 'text-center' },
        { label: this.$t('patients.patientsColumn.personalDentist'), key: 'personal_dentist', class: 'text-center' },
        { label: this.$t('patients.patientsColumn.action'), key: 'action', class: 'text-center action-column' }
      ]
    }
  }
}
</script>

<style scoped>
.loading {
  padding-left: 10px;
}
/deep/ .action-column {
  width: 120px !important;
}
</style>
