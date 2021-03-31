<template>
    <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">Offers</h3>
                        <div class="btn-add-patient">
                            <b-button variant="primary" @click="add_offer"><i class="ri-add-line mr-2"></i>New Offer</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="text" class="text search-input" placeholder="Search" @keyup="myFunction()">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card>
                                <b-form-group label-for="searchoption"
                                              label="Search By:">
                                    <b-form-select plain
                                                   v-model="selected"
                                                   :options="searchoption"
                                                   id="searchoption"
                                                   @change="searchOption($event)">
                                    </b-form-select>
                                </b-form-group>
                            </iq-card>
                        </div>
                    </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table
                  id="my-table"
                  bordered
                  hover
                  :items="paginatedItems"
                  :fields="columns"
                  :per-page="perPage"
                  :current-page="currentPage"
                  foot-clone
                >
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
var rows = [
  {
    offer_no: 'offer12312',
    desc: 'Teeth extraction',
    offer_name: 'offer1',
    amount: '300',
    issued_by: '118',
    created_at: '27.01.2021-18:00'
  }
]
export default {
  components: {
  },
  name: 'Offers',
  methods: {
    default () {
      return {
        offer_no: this.rows.length,
        desc: '',
        offer_name: '',
        amount: '',
        issued_by: '',
        fully_paid: '',
        created_at: ''
      }
    },
    searchOption (event) {
      console.log('SEARCHBY OPTION:', event)
      return event
    },
    add_offer () {
      console.log('ADD NEW OFFER CLICKED')
    }
  },
  data  () {
    return {
      selected: this.value,
      searchoption: [
        { value: 'offer_no', text: 'Offer Number' },
        { value: 'offer_name', text: 'Offer Name' },
        { value: 'description', text: 'Description' },
        { value: 'amount', text: 'Amount' },
        { value: 'issue_by', text: 'Issued by' },
        { value: 'created_at', text: 'Created at' }
      ],
      items: rows,
      paginatedItems: rows,
      currentPage: 1,
      perPage: 10,
      totalRows: rows.length,
      columns: [
        { label: 'Offer Number', key: 'offer_no', class: 'text-left' },
        { label: 'Offer Name', key: 'offer_name', class: 'text-left' },
        { label: 'Description', key: 'desc', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' },
        { label: 'Issued by', key: 'issued_by', class: 'text-left' },
        { label: 'Created at', key: 'created_at', class: 'text-left' }
      ]
    }
  },
  mounted () {
  }
}
</script>
