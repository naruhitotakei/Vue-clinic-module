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
              <template v-slot:headerTitle> </template>
              <template v-slot:body>
                <b-form-group
                  label-for="searchoption"
                  label="Search By:"
                  style="margin-top: 15px;"
                >
                  <b-form-select
                    plain
                    v-model="selected"
                    :options="searchoption"
                    id="searchoption"
                    @change="searchOption($event)"
                  >
                  </b-form-select>
                </b-form-group>
              </template>
            </iq-card>
            <b-button variant="primary" @click="add"
              ><i class="ri-add-line mr-2"></i>Add New</b-button
            >
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table bordered hover :items="rows" :fields="columns" foot-clone>
                  <template v-slot:cell(name)="data">
                    <span v-if="!data.item.editable">{{ data.item.name }}</span>
                    <input type="text" v-model="data.item.name" v-else class="form-control">
                  </template>
                  <template v-slot:cell(last_name)="data">
                    <span v-if="!data.item.editable">{{ data.item.last_name }}</span>
                    <input type="text" v-model="data.item.last_name" v-else class="form-control">
                  </template>
                  <template v-slot:cell(phone)="data">
                    <span v-if="!data.item.editable">{{ data.item.phone }}</span>
                    <input type="text" v-model="data.item.phone" v-else class="form-control">
                  </template>
                  <template v-slot:cell(email)="data">
                    <span v-if="!data.item.editable">{{ data.item.email }}</span>
                    <input type="text" v-model="data.item.email" v-else class="form-control">
                  </template>
                  <template v-slot:cell(city)="data">
                    <span v-if="!data.item.editable">{{ data.item.city }}</span>
                    <input type="text" v-model="data.item.city" v-else class="form-control">
                  </template>
                  <template v-slot:cell(country)="data">
                    <span v-if="!data.item.editable">{{ data.item.country }}</span>
                    <input type="text" v-model="data.item.country" v-else class="form-control">
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
                    <b-button variant=" iq-bg-danger" size="sm" @click="remove(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </template>
          <template>
              <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
              <div class="mt-3">
                <b-pagination align="center" class="mb-2"></b-pagination>
              </div>
            </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { enquiry } from '../../services/enquiry'
export default {
  name: 'UiDataTable',
  mounted () {
    xray.index()
    enquiry().then(response => {
      this.rows = response
    })
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
        last_name: '',
        phone: '',
        email: '',
        city: '',
        country: '',
        last_visit: '',
        next_visit: '',
        personal_dentist: '',
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
      initialData: [],
      selected: this.value,
      searchoption: [
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
        { label: 'Phone', key: 'phone', class: 'text-left' },
        { label: 'Email', key: 'email', class: 'text-left' },
        { label: 'City', key: 'city', class: 'text-left' },
        { label: 'Country', key: 'country', class: 'text-left' },
        { label: 'Last Visit', key: 'last_visit', class: 'text-left' },
        { label: 'Next Visit', key: 'next_visit', class: 'text-left' },
        { label: 'Personal Dentist', key: 'personal_dentist', class: 'text-left' }
      ],
      rows: [
        {
          id: 1,
          name: 'Tiger',
          last_name: 'Nixon',
          phone: '7876678787',
          email: 'tiger@gmail.com',
          city: 'New York',
          country: 'America',
          last_visit: '12/03/2021',
          next_visit: '13/04/2021',
          personal_dentist: 'xyz',
          editable: false
        },
        {
          id: 2,
          name: 'John',
          last_name: 'Doe',
          phone: '8746578666',
          email: 'john@gmail.com',
          city: 'New York',
          country: 'America',
          last_visit: '12/03/2021',
          next_visit: '13/04/2021',
          personal_dentist: 'xyz',
          editable: false
        }
      ]
    }
  }
}
</script>
