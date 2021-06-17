<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
              <b-modal v-model="modalShow" no-close-on-backdrop size="md" :title="$t('invoices.addNewInvoice.selectPatient')" :ok-disabled="!selectedPatient" :ok-title="$t('advPayments.addNewAdvPayment.create')" @ok="addAdvPayment" @close="selectedPatient = null"  @cancel="selectedPatient = null" :cancel-title="$t('advPayments.addNewAdvPayment.close')">
                <form>
                  <div class="form-row">
                    <div class="col-md-12 mb-3">
                      <label for="patient">{{ $t('advPayments.addNewAdvPayment.patient') }} *</label>
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
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('advPayments.advPaymentsHeader') }}</h3>
                        <div class="btn-add-patient col-12 col-sm-3 col-md-4 col-lg-3 mb-4 mb-sm-0 adv-payment">
                            <b-button variant="primary" @click="modalShow = true"><i class="ri-add-line mr-2"></i>{{ $t('advPayments.advPaymentsBtn') }}</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-sm-flex align-items-center col-12 col-sm-9 col-md-8 col-lg-9" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="text" v-model="filter" class="text search-input" placeholder="Search">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card class="mt-4 mt-sm-0">
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
                                <b-table
                                    id="my-table"
                                    class="table-t"
                                  bordered
                                  hover
                                  :busy="!isDataLoaded"
                                  @row-clicked="paymentSelected"
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
                                  v-if="hidePaymentsPagination"
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
import { getPatients } from '../../services/enquiry'
import moment from 'moment'
export default {
  components: {
  },
  computed: {
    hidePaymentsPagination () {
      return Math.floor(this.advPayments.length / this.perPage) !== 0
    }
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
      modalShow: false,
      advPayments: [],
      selectedPatient: {},
      patients: [],
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
            return item.enquiries_name + ' ' + item.enquiries_last_name
          },
          filterByFormatted: true
        },
        {
          label: this.$t('advPayments.advPaymentsColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('DD-MM-YYYY')
          },
          filterByFormatted: true
        },
        { label: this.$t('advPayments.advPaymentsColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
        { label: this.$t('advPayments.advPaymentsColumn.amount'), key: 'lines_sum', class: 'text-left' }
      ]
    }
  },
  methods: {
    getPatients () {
      getPatients().then(response => {
        this.patients = response
      })
    },
    paymentSelected (item) {
      this.$router.push({ path: `/documents/advance-payments/${item.invoice_id}` })
    },
    filterSelected (value) {
      let array = [value]
      this.filterOn = array
    },
    addAdvPayment () {
      this.$router.push({ path: `/documents/advance-payments/${this.selectedPatient.id}/new-adv-payment` })
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
    this.getPatients()
  }
}
</script>

<style lang="scss">
.adv-payment {
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
  .adv-payment {
    justify-content: flex-start;
  }
}
</style>
