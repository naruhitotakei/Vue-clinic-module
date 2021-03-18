<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h3 class="card-title">Patients</h3>
          </template>
          <template v-slot:headerAction>
              <div class="iq-search-bar">
                  <form action="#" class="searchbox">
                      <input type="text" class="text search-input" placeholder="Search" @keyup="myFunction()">
                      <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                  </form>
              </div>
              <iq-card>
                  <template v-slot:body>
                      <b-form-group label-for="searchoption"
                                    label="Search By:">
                          <b-form-select plain
                                         v-model="selected"
                                         :options="searchoption"
                                         id="searchoption"
                                         @change="searchOption($event)">
                          </b-form-select>
                      </b-form-group>
                  </template>
              </iq-card>
                  <b-button variant="primary" @click="add" class="btn-float-right"><i class="ri-add-line mr-2"></i>Add New</b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table
                  id="my-table"
                  bordered
                  hover
                  :items="computedList"
                  :fields="columns"
                  :per-page="perPage"
                  :current-page="currentPage"
                >
                  <template v-slot:cell(name)="data">
                    <span v-if="!data.item.editable">{{ data.item.name }}</span>
                    <input
                      type="text"
                      v-model="data.item.name"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(last_name)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.last_name
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.last_name"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(telephone)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.telephone
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.telephone"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(email)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.email
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.email"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(region)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.region
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.region"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(state)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.state
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.state"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(last_visit)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.last_visit
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.last_visit"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(next_visit)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.next_visit
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.next_visit"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(personal_dentist)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.personal_dentist
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.personal_dentist"
                      v-else
                      class="form-control"
                    />
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button
                      variant=" iq-bg-success mr-1 mb-1"
                      size="sm"
                      @click="edit(data.item)"
                      v-if="!data.item.editable"
                      ><i class="ri-ball-pen-fill m-0"></i
                    ></b-button>
                    <b-button
                      variant=" iq-bg-success mr-1 mb-1"
                      size="sm"
                      @click="submit(data.item)"
                      v-else
                      >Ok</b-button
                    >
                    <b-button
                      variant=" iq-bg-warning"
                      size="sm"
                      @click="remove(data.item)"
                      ><i class="ri-mail-line m-0"></i
                    ></b-button>
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
                aria-controls="my-table"
              ></b-pagination>
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
import { enquiry } from '../../services/enquiry'
// import Pagination from './Pagination.vue'
var rows = []
export default {
  name: 'UiDataTable',
  async mounted () {
    xray.index()
  },
  computed: {
    computedList () {
      this.replace()
      return this.items
    }
  },
  methods: {
    add () {
      let obj = this.default()
      this.rows.push(obj)
    },
    searchOption (event) {
      console.log('SEARCHBY OPTION:', event)
      return event
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
    edit  (item) {
      item.editable = true
    },
    submit  (item) {
      item.editable = false
    },
    remove  (item) {
      let index = this.rows.indexOf(item)
      this.rows.splice(index, 1)
    },
    async replace () {
      let finalData = await Promise.all([enquiry()])
      finalData = finalData[0]
      if (finalData.constructor === Array && finalData.length > 0) {
        finalData.map((currentElementOfFinalArray, indexOfDefaultItems) => {
          this.$set(this.items, indexOfDefaultItems, {
            id: currentElementOfFinalArray.id,
            name: currentElementOfFinalArray.name,
            last_name: currentElementOfFinalArray.last_name,
            telephone: currentElementOfFinalArray.phone,
            email: currentElementOfFinalArray.email,
            region: 'n/a',
            state: 'n/a',
            last_visit: '2011/04/25',
            next_visit: '2011/04/30',
            personal_dentist: 'Doctor3',
            editable: false
          })
        })
    myFunction () {
      var input, filter, table, tr, td, i, txtValue
      input = document.getElementById('myInput')
      filter = input.value.toUpperCase()
      table = document.getElementById('my-table')
      tr = table.getElementsByTagName('tr')
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0]
        if (td) {
          txtValue = td.textContent || td.innerText
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = ''
          } else {
            tr[i].style.display = 'none'
          }
        }
      }
    }
  },
  data  () {
    return {
      items: rows,
      paginatedItems: rows,
      currentPage: 1,
      perPage: 10,
      totalRows: rows.length,
      selected: this.value,
      searchoption: [
        // { text: 'Search By', disabled },
        { value: 'name', text: 'Name' },
        { value: 'last_name', text: 'Last Name' },
        { value: 'phone', text: 'Phone' },
        { value: 'email', text: 'Email' },
        { value: 'city', text: 'City' },
        { value: 'country', text: 'Country' },
        { value: 'last_visit', text: 'Last Visit' },
        { value: 'next_visit', text: 'Next Visit' },
        { value: 'personal_dentist', text: 'Personal Dentist' }
      ],
      columns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Last Name', key: 'last_name', class: 'text-left' },
        { label: 'Phone', key: 'telephone', class: 'text-left' },
        { label: 'Email', key: 'email', class: 'text-left' },
        { label: 'Region', key: 'region', class: 'text-left' },
        { label: 'State', key: 'state', class: 'text-left' },
        { label: 'Last Visit', key: 'last_visit', class: 'text-left' },
        { label: 'Next Visit', key: 'next_visit', class: 'text-center' },
        {
          label: 'Personal Dentist',
          key: 'personal_dentist',
          class: 'text-center'
        },
        { label: 'Actions', key: 'action', class: 'text-center' }
      ]
    }
  }
}
</script>
