<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('advPayments.advPaymentsHeader') }}</h3>
                        <div class="btn-add-patient">
                            <b-button variant="primary" @click="add_invoice"><i class="ri-add-line mr-2"></i>{{ $t('advPayments.advPaymentsBtn') }}</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="text" v-on:keyup="myFunction($event.target.value)" class="text search-input" placeholder="Search">
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
                                <b-table id="my-table"
                                         bordered
                                         hover
                                         @row-clicked="$router.push('/extra-pages/invoice-example')"
                                         style="cursor: pointer;"
                                         :items="paginatedItems"
                                         :fields="columns"
                                         :per-page="perPage"
                                         :current-page="currentPage">
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentPage"
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
var rows = [
  {
    invoice_no: 'advancepayment2393',
    patient_name: 'Vinko Erjavec',
    amount: '900 EUR',
    issued_by: 'Dr. Ana Mencin',
    date: '27.02.2021-13:00'
  },
  {
    invoice_no: 'advancepayment2416',
    patient_name: 'Kaja Novak',
    amount: '300 EUR',
    issued_by: 'Dr. Silvija Lenart',
    date: '02.03.2021-09:00'
  },
  {
    invoice_no: 'advancepayment2465',
    patient_name: 'Simona Majcen',
    amount: '200 EUR',
    issued_by: 'Dr. Bojan Jernejc',
    date: '10.03.2021-13:00'
  },
  {
    invoice_no: 'advancepayment2501',
    patient_name: 'Iztok Kotnik',
    amount: '1100 EUR',
    issued_by: 'Dr. Martin Sever',
    date: '14.03.2021-11:00'
  },
  {
    invoice_no: 'advancepayment2523',
    patient_name: 'Elizabeta Kralj',
    amount: '400 EUR',
    issued_by: 'Dr. Tanja Perme',
    date: '18.03.2021-12:30'
  },
  {
    invoice_no: 'advancepayment2654',
    patient_name: 'Ljudmila Furlan',
    amount: '150 EUR',
    issued_by: 'Dr. Bojan Jernejc',
    date: '22.03.2021-09:30'
  },
  {
    invoice_no: 'advancepayment2893',
    patient_name: 'Helena Bogataj',
    amount: '1000 EUR',
    issued_by: 'Dr. Ana Mencin',
    date: '02.04.2021-14:00'
  }
]
export default {
  components: {
  },
  name: 'AdvPayments',
  data: function () {
    return {
      dropDownText: '',
      selected: this.value,
      searchOptions: [
        { value: 'invoice_no', text: 'Invoice number' },
        { value: 'patient_name', text: 'Patient Name' },
        { value: 'date', text: 'Date' },
        { value: 'issued_by', text: 'Issued by' },
        { value: 'amount', text: 'Invoice amount' }
      ],
      items: rows,
      paginatedItems: rows,
      currentPage: 1,
      perPage: 10,
      totalRows: rows.length,
      columns: [
        { label: this.$t('advPayments.advPaymentsColumn.no'), key: 'invoice_no', class: 'text-left' },
        { label: this.$t('advPayments.advPaymentsColumn.patientName'), key: 'patient_name', class: 'text-left' },
        { label: this.$t('advPayments.advPaymentsColumn.date'), key: 'date', class: 'text-left' },
        { label: this.$t('advPayments.advPaymentsColumn.issuedBy'), key: 'issued_by', class: 'text-left' },
        { label: this.$t('advPayments.advPaymentsColumn.amount'), key: 'amount', class: 'text-left' }
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
      console.log('ADD NEW ADVANCE PAYMENT CLICKED')
    }
  },
  mounted () {
  }
}
</script>
