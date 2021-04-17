<template>
    <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
              <h3 class="card-title" style="margin-top: 10px;">{{ $t('invoices.invoicesHeader') }}</h3>
                        <div class="btn-add-patient">
                            <b-button variant="primary" @click="add_invoice"><i class="ri-add-line mr-2"></i>{{ $t('invoices.invoicesBtn') }}</b-button>
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
                  @row-clicked="onInvoiceClick"
                  style="cursor: pointer;"
                  :items="invoiceItems"
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
                :total-rows="invoiceItems.length"
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
      invoiceItems: [],
      currentPage: 1,
      perPage: 10,
      columns: [
        { label: this.$t('invoices.invoicesColumn.no'), key: 'invoice_number', class: 'text-left' },
        { label: this.$t('invoices.invoicesColumn.patientName'),
          key: 'patient_name',
          formatter: (value, key, item) => {
            return item.enquiries_name + ' ' + item.enquiries_last_name
          },
          class: 'text-left' },
        { label: this.$t('invoices.invoicesColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return value.split('T').shift()
          }
        },
        { label: this.$t('invoices.invoicesColumn.issuedBy'), key: 'company_name', class: 'text-left' },
        { label: this.$t('invoices.invoicesColumn.amount'), key: 'total_with_vat', class: 'text-left' },
        { label: this.$t('invoices.invoicesColumn.status'),
          key: 'status',
          formatter: (value, key, item) => {
            if (item.paid_amount === '$0.00') {
              return 'Unpaid'
            }
            return item.total_with_vat === item.paid_amount ? 'Paid' : 'Partialy Paid'
          },
          class: 'text-left' }
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
    onInvoiceClick (item) {
      this.$router.push({ path: `/documents/invoices/${item.invoice_id}` })
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
        var sorted = this.invoiceItems.filter((item) => {
          return item[this.dropDownText].toLowerCase().includes(event.toLowerCase())
        })
        this.paginatedItems = sorted
      }
      console.log('sorted', sorted)
    },
    add_invoice () {
      this.$router.push('/extra-pages/new-invoice')
    },
    getInvoices () {
      getInvoices().then(response => {
        this.invoiceItems = response
      })
    }
  },
  mounted () {
    xray.index()
    this.getInvoices()
  }
}
</script>
