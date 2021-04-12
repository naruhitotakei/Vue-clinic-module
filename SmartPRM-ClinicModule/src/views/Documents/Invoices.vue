<template>
    <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">Invoices</h3>
                        <div class="btn-add-patient">
                            <b-button variant="primary" @click="add_invoice"><i class="ri-add-line mr-2"></i>New Invoice</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="text" v-on:keyup="myFunction($event.target.value)" class="text search-input" placeholder="Search" >
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card>
                                <b-form-group label-for="searchOptions"
                                              label="Search By:">
                                    <b-form-select plain
                                                   v-model="selected"
                                                   :options="searchOptions"
                                                   id="searchFunction"
                                                   @change="searchFunction($event)">
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
                  @row-clicked="$router.push('/extra-pages/invoice-example')"
                  style="cursor: pointer;"
                  :items="paginatedItems"
                  :fields="columns"
                  :per-page="perPage"
                  :current-page="currentPage"
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
    invoice_no: 'invoice12312',
    patient_name: 'Matej Dolenc',
    amount: '90 EUR',
    issued_by: 'Dr. Damjan Ahlin',
    date: '27.01.2021-18:00',
    status: 'Paid'
  },
  {
    invoice_no: 'invoice1454',
    patient_name: 'Damjan Rupnik',
    amount: '70 EUR',
    issued_by: 'Dr. Silvija Lenart',
    date: '27.01.2021-18:00',
    status: 'Unpaid'
  },
  {
    invoice_no: 'invoice111',
    patient_name: 'Ljudmila Furlan',
    amount: '70 EUR',
    issued_by: 'Dr. Bojan Jernejc',
    date: '27.01.2021-18:00',
    status: 'Paid'
  }
]
export default {
  components: {
  },
  name: 'Invoices',
  data: function () {
    return {
      dropDownText: '',
      selected: this.value,
      searchOptions: [
        { value: 'invoice_no', text: 'Number' },
        { value: 'patient_name', text: 'Patient Name' },
        { value: 'date', text: 'Date' },
        { value: 'issued_by', text: 'Issued by' },
        { value: 'amount', text: 'Invoice amount' },
        { value: 'status', text: 'Status' }
      ],
      items: rows,
      paginatedItems: rows,
      currentPage: 1,
      perPage: 10,
      totalRows: rows.length,
      columns: [
        { label: 'Number', key: 'invoice_no', class: 'text-left' },
        { label: 'Patient Name', key: 'patient_name', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left' },
        { label: 'Issued by', key: 'issued_by', class: 'text-left' },
        { label: 'Invoice amount', key: 'amount', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' }
      ]
    }
  },
  methods: {
    default () {
      return {
        invoice_no: this.rows.length,
        patient_name: '',
        amount: '',
        issued_by: '',
        status: '',
        date: ''
      }
    },
    searchFunction (event) {
      this.dropDownText = event
      console.log('SEARCHBY OPTION:', event)
      return event
    },
    myFunction (event) {
      console.log('evemt', event)
      console.log('this.dropDownText', this.dropDownText)

      if (this.dropDownText) {
        var sorted = rows.filter((item) => {
          return item[this.dropDownText].toLowerCase().includes(event.toLowerCase())
        })
        this.paginatedItems = sorted
      }
      console.log('sorted', sorted)
    },
    add_invoice () {
      console.log('ADD NEW INVOICE CLICKED')
    }
  },
  mounted () {
  }
}
</script>
