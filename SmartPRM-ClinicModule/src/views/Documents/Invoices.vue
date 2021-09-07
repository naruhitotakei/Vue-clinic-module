<template>
    <b-container fluid>
    <b-row>
      <b-col md="12">
          <b-modal v-model="modalShow"
                   no-close-on-backdrop size="md"
                   :title="$t('invoices.addNewInvoice.selectPatient')"
                   :ok-disabled="!selectedPatient"
                   :ok-title="$t('invoices.addNewInvoice.create')"
                   @ok="addInvoice"
                   @close="selectedPatient = null"
                   @cancel="selectedPatient = null"
                   :cancel-title="$t('invoices.addNewInvoice.close')">
            <form>
              <div class="form-row">
                <div class="col-md-12 mb-3">
                  <label for="patient">{{ $t('invoices.addNewInvoice.patient') }} *</label>
                  <v-select :clearable="false" label="full_name" class="style-chooser" v-model="selectedPatient" :options="patients">
                    <template v-slot:option="option">
                      {{ option.full_name }} <span v-if="option.city" style="float:right"> {{option.city}} </span>
                    </template>
                  </v-select>
                </div>
              </div>
            </form>
          </b-modal>
        <iq-card>
          <template v-slot:headerTitle>
              <h3 class="card-title" style="margin-top: 10px;">{{ $t('invoices.invoicesHeader') }}</h3>
                        <div class="btn-add-patient col-12 col-sm-3 col-md-3 col-lg-2 mb-4 mb-sm-0 invoice">
                            <b-button variant="primary" @click="modalShow = true"><i class="ri-add-line mr-2"></i>{{ $t('invoices.invoicesBtn') }}</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-sm-flex align-items-center col-12 col-sm-9 col-md-9 col-lg-10" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="search" v-model="filter" class="text search-input" :placeholder="$t('shared.search')">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card class="mt-4 mt-sm-0">
                              <b-form-group label-for="searchOptions" :label="$t('shared.searchBy')">
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
                <b-table
                  id="my-table"
                  class="table-t"
                  bordered
                  hover
                  :busy="!isDataLoaded"
                  @row-clicked="invoiceSelected"
                  style="cursor: pointer;"
                  :items="invoices"
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
                </b-table>
              </b-col>
            </b-row>
            <template>
              <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
              <div class="mt-3">
                <b-pagination
                  v-if="hidePagination"
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
import { getInvoices } from '../../services/invoice'
import { getPatients } from '../../services/enquiry'
import moment from 'moment'

export default {
  components: {
  },
  computed: {
    hidePagination () {
      return Math.floor(this.totalRows / this.perPage) !== 0
    }
  },
  name: 'Invoices',
  data: function () {
    return {
      dropDownText: '',
      selected: this.value,
      modalShow: false,
      selectedPatient: null,
      patients: [],
      searchOptions: [
        { value: 'invoice_number', text: 'Number' },
        { value: 'patient_name', text: 'Patient Name' },
        { value: 'invoice_time', text: 'Date' },
        { value: 'company_name', text: 'Issued by' },
        { value: 'total_with_vat', text: 'Invoice amount' },
        { value: 'status', text: 'Status' }
      ],
      invoices: [],
      currentPage: 1,
      perPage: 10,
      columns: [
        { label: this.$t('invoices.invoicesColumn.no'),
          key: 'invoice_number',
          class: 'text-left',
          formatter: (value, key, item) => {
            return item.invoice_number === 'invoice.draft' ? this.$t(item.invoice_number) : item.invoice_number
          },
          filterByFormatted: true
        },
        { label: this.$t('invoices.invoicesColumn.patientName'),
          key: 'patient_name',
          class: 'text-left',
          formatter: (value, key, item) => {
            return item.enquiries_name + ' ' + item.enquiries_last_name
          },
          filterByFormatted: true
        },
        { label: this.$t('invoices.invoicesColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('DD-MM-YYYY')
          },
          filterByFormatted: true
        },
        { label: this.$t('invoices.invoicesColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
        { label: this.$t('invoices.invoicesColumn.amount'), key: 'total_with_vat', class: 'text-left' },
        { label: this.$t('invoices.invoicesColumn.status'),
          key: 'status',
          class: 'text-left',
          formatter: (value, key, item) => {
            if (item.paid_amount === '$0.00') {
              return 'Unpaid'
            }
            return item.total_with_vat === item.paid_amount ? 'Paid' : 'Partialy Paid'
          },
          filterByFormatted: true
        }
      ],
      filter: '',
      filterOn: [],
      isDataLoaded: false,
      totalRows: 1,
      selectedInvoices: ''
    }
  },
  methods: {
    getPatients () {
      getPatients().then(response => {
        this.patients = response
      })
    },
    invoiceSelected (item) {
      this.$router.push({ path: `/documents/invoices/${item.invoice_id}` })
    },
    addInvoice () {
      this.$router.push({ path: `/documents/invoices/${this.selectedPatient.id}/new-invoice` })
    },
    getInvoices () {
      getInvoices().then(response => {
        this.invoices = response
        this.setTotalRows(this.invoices.length)
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
    },
    filterSelected (value) {
      let array = [value]
      this.filterOn = array
    }
  },
  mounted () {
    xray.index()
    this.getInvoices()
    this.getPatients()
  }
}
</script>

<style lang="scss">
.invoice {
  display: flex;
  justify-content: flex-end;
}
@media (max-width: 479px) {
.iq-search-bar {
  padding: 0 15px 0 0 !important;
  margin: 0 !important;
}
.search-link {
  right: -4px !important;
  top: 94px !important;
}
.search-input {
  width: 105% !important;
}
}

@media (min-width: 320px) and (max-width: 575px) {
  .invoice {
    justify-content: flex-start;
  }
}
</style>
