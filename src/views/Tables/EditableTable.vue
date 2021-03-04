<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h3 class="card-title">Patients</h3>
          </template>
          <template v-slot:headerAction>
          <iq-card>
          <template v-slot:headerTitle>
          </template>
          <template v-slot:body>
            <b-form-group label-for="searchoption" label="Search By:" style="margin-top: 15px;">
                <b-form-select plain v-model="selected" :options="searchoption" id="searchoption">
                </b-form-select>
              </b-form-group>
          </template>
        </iq-card>
            <b-button variant="primary" @click="add"><i class="ri-add-line mr-2"></i>Add New</b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table bordered hover :items="rows" :fields="columns" foot-clone>
                  <template v-slot:cell(name)="data">
                    <span v-if="!data.item.editable">{{ data.item.name }}</span>
                    <input type="text" v-model="data.item.name" v-else class="form-control">
                  </template>
                  <template v-slot:cell(surname)="data">
                    <span v-if="!data.item.editable">{{ data.item.surname }}</span>
                    <input type="text" v-model="data.item.surname" v-else class="form-control">
                  </template>
                  <template v-slot:cell(telephone)="data">
                    <span v-if="!data.item.editable">{{ data.item.telephone }}</span>
                    <input type="text" v-model="data.item.telephone" v-else class="form-control">
                  </template>
                  <template v-slot:cell(email)="data">
                    <span v-if="!data.item.editable">{{ data.item.email }}</span>
                    <input type="text" v-model="data.item.email" v-else class="form-control">
                  </template>
                  <template v-slot:cell(region)="data">
                    <span v-if="!data.item.editable">{{ data.item.region }}</span>
                    <input type="text" v-model="data.item.region" v-else class="form-control">
                  </template>
                  <template v-slot:cell(state)="data">
                    <span v-if="!data.item.editable">{{ data.item.state }}</span>
                    <input type="text" v-model="data.item.state" v-else class="form-control">
                  </template>
                  <template v-slot:cell(last_visit)="data">
                    <span v-if="!data.item.editable">{{ data.item.last_visit }}</span>
                    <input type="text" v-model="data.item.last_visit" v-else class="form-control">
                  </template>
                  <template v-slot:cell(next_visit)="data">
                    <span v-if="!data.item.editable">{{ data.item.next_visit }}</span>
                    <input type="text" v-model="data.item.next_visit" v-else class="form-control">
                  </template>
                  <template v-slot:cell(personal_dentist)="data">
                    <span v-if="!data.item.editable">{{ data.item.personal_dentist }}</span>
                    <input type="text" v-model="data.item.personal_dentist" v-else class="form-control">
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submit(data.item)" v-else>Ok</b-button>
                    <b-button variant=" iq-bg-warning" size="sm" @click="remove(data.item)"><i class="ri-mail-line m-0"></i></b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <template>
            <b-collapse id="collapse-6" class="mb-2">
              <div class="card">
                <kbd class="bg-dark">
                  <pre class="text-white" id="pagination-align">
                    <code>
&lt;b-pagination value="1"
              prev-text="Previous"
              next-text="Next"
              first-text="First"
              last-text="Last"
              :total-rows="50"
&gt;&lt;/b-pagination&gt;
</code></pre>
                </kbd>
              </div>
            </b-collapse>
            <div class="mt-3">
            <b-pagination value="1" prev-text="Previous" next-text="Next" first-text="First" last-text="Last" :total-rows="50" align="center"/>
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
export default {
  name: 'UiDataTable',
  mounted () {
    xray.index()
  },
  methods: {
    add () {
      let obj = this.default()
      this.rows.push(obj)
    },
    default () {
      return {
        id: this.rows.length,
        name: '',
        position: '',
        office: '',
        age: '',
        start_date: '2011/04/25',
        salary: '$0',
        editable: false
      }
    },
    edit (item) {
      item.editable = true
    },
    submit (item) {
      item.editable = false
    },
    remove (item) {
      let index = this.rows.indexOf(item)
      this.rows.splice(index, 1)
    }
  },
  data () {
    return {
      selected: this.value,
      searchoption: [
        { value: 'name', text: 'Name' },
        { value: 'lastname', text: 'Last Name' },
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
        { label: 'Surname', key: 'surname', class: 'text-left' },
        { label: 'Telephone', key: 'telephone', class: 'text-left' },
        { label: 'Email', key: 'email', class: 'text-left' },
        { label: 'Region', key: 'region', class: 'text-left' },
        { label: 'State', key: 'state', class: 'text-left' },
        { label: 'Last Visit', key: 'last_visit', class: 'text-left' },
        { label: 'Next Visit', key: 'next_visit', class: 'text-center' },
        { label: 'Personal Dentist', key: 'personal_dentist', class: 'text-center' },
        { label: 'Actions', key: 'action', class: 'text-center' }
      ],
      rows: [
        {
          id: 1,
          name: 'Tiger',
          surname: 'Nixon',
          telephone: '7876678787',
          email: 'tiger@gmail.com',
          region: 'Edinburgh',
          state: 'xyz',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor1',
          editable: false
        },
        {
          id: 2,
          name: 'Garrett',
          surname: 'Winters',
          telephone: '9834567755',
          email: 'garrett@gmail.com',
          region: 'Tokyo',
          state: 'abc',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor2',
          editable: false
        },
        {
          id: 3,
          name: 'Ashton',
          surname: 'Cox',
          telephone: '9834567755',
          email: 'ashton@gmail.com',
          region: 'San Francisco',
          state: 'pqr',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor3',
          editable: false
        },
        {
          id: 1,
          name: 'Tiger',
          surname: 'Nixon',
          telephone: '7876678787',
          email: 'tiger@gmail.com',
          region: 'Edinburgh',
          state: 'xyz',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor1',
          editable: false
        },
        {
          id: 2,
          name: 'Garrett',
          surname: 'Winters',
          telephone: '9834567755',
          email: 'garrett@gmail.com',
          region: 'Tokyo',
          state: 'abc',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor2',
          editable: false
        },
        {
          id: 3,
          name: 'Ashton',
          surname: 'Cox',
          telephone: '9834567755',
          email: 'ashton@gmail.com',
          region: 'San Francisco',
          state: 'pqr',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor3',
          editable: false
        },
        {
          id: 1,
          name: 'Tiger',
          surname: 'Nixon',
          telephone: '7876678787',
          email: 'tiger@gmail.com',
          region: 'Edinburgh',
          state: 'xyz',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor1',
          editable: false
        },
        {
          id: 2,
          name: 'Garrett',
          surname: 'Winters',
          telephone: '9834567755',
          email: 'garrett@gmail.com',
          region: 'Tokyo',
          state: 'abc',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor2',
          editable: false
        },
        {
          id: 3,
          name: 'Ashton',
          surname: 'Cox',
          telephone: '9834567755',
          email: 'ashton@gmail.com',
          region: 'San Francisco',
          state: 'pqr',
          last_visit: '2011/04/25',
          next_visit: '2011/04/30',
          personal_dentist: 'Doctor3',
          editable: false
        }
      ]
    }
  }
}
</script>
