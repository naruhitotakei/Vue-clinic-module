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
                                    <input type="text" v-model="filter" class="text search-input" placeholder="Search">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card>
                              <b-form-group label-for="searchOptions" label="Search By:">
                              <v-select class="patients" label="text"
                                :clearable="false" :reduce="filter => filter.value"
                                :options="searchOptions" @input="filterSelected">
                              </v-select>
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
                                  @row-clicked="$router.push('/extra-pages/advance-payment-example')"
                                  style="cursor: pointer;"
                                  :items="advPayments"
                                  :fields="columns"
                                  :per-page="perPage"
                                  :current-page="currentPage"
                                  :filter="filter"
                                  :filter-included-fields="filterOn"
                                  @filtered="onFiltered">
                                    <template #table-busy>
                                        <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong class="loading">Loading...</strong>
                                        </div>
                                     </template>
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
import { xray } from '../../config/pluginInit'
import { getAdvPayments } from '../../services/advPayments'
import moment from 'moment'
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
      advPayments: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 1,
      isDataLoaded: false,
      filter: '',
      filterOn: [],
      columns: [
        { label: this.$t('advPayments.advPaymentsColumn.no'), key: 'invoice_number', class: 'text-left' },
        {
          label: this.$t('advPayments.advPaymentsColumn.patientName'),
          key: 'patient_name',
          class: 'text-left',
          formatter: (value, key, item) => {
            return item.enquiries.name + ' ' + item.enquiries.last_name
          },
          filterByFormatted: true
        },
        {
          label: this.$t('advPayments.advPaymentsColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('YYYY-MM-DD')
          },
          filterByFormatted: true
        },
        { label: this.$t('advPayments.advPaymentsColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
        { label: this.$t('advPayments.advPaymentsColumn.amount'), key: 'total_with_vat', class: 'text-left' }
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
    filterSelected (value) {
      let array = [value]
      this.filterOn = array
    },
    add_invoice () {
      console.log('ADD NEW ADVANCE PAYMENT CLICKED')
    },
    getAdvPayments () {
      getAdvPayments().then(response => {
        this.advPayments = response
        this.setTotalRows(this.advPayments.length)
        this.toggleDataLoaded()
      })
    },
    onFiltered (filteredItems) {
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
  mounted () {
    xray.index()
    this.getAdvPayments()
  }
}
</script>
