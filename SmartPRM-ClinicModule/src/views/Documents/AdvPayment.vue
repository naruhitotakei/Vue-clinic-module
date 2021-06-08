<template>
<b-container fluid>
   <div style="display: none">
      <div id="printInvoice" style="color:black;margin-left:40px;height:1200px" v-if="invoice">
        <b-row>
            <b-col lg="12">
              <p>{{invoice.company_name}}</p>
              <p>{{invoice.company_address_line_1}}</p>
              <p>{{invoice.company_post_code}} {{invoice.company_city}}</p>
              <p>{{ $t('advPayments.newAdvPayment.IBAN') }}: {{invoice.company_iban}}</p>
              <p>{{ $t('advPayments.newAdvPayment.vatId') }}: {{invoice.company_tax_registration_number}}</p>
              <p>{{ $t('advPayments.newAdvPayment.regNumber') }}: {{invoice.company_legal_registration_identifier}}</p>
            </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <p>{{invoice.enquiries_name}} {{invoice.enquiries_last_name}}</p>
            <p>{{invoice.enquiries_address_line_1}}</p>
            <p>{{invoice.enquiries_post_code}} {{invoice.enquiries_city}}</p>
          </b-col>
          <b-col lg="6">
            <p>{{ $t('advPayments.newAdvPayment.advPaymentNo') }}: {{invoice.invoice_number}}</p>
            <p>{{ $t('advPayments.newAdvPayment.copy') }}:<span style="margin-left:20px">Original</span></p>
            <p>{{ $t('advPayments.newAdvPayment.IssuedIn') }}:<span style="margin-left:20px">{{premiseCity}}</span></p>
            <p>{{ $t('advPayments.newAdvPayment.dateOfAdvPayment') }}:<span style="margin-left:20px">{{invoiceDate}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-table-simple small responsive>
            <b-thead>
              <b-tr>
                <b-th colspan="4">{{ $t('advPayments.newAdvPayment.item') }}</b-th>
                <b-th colspan="1">{{ $t('advPayments.newAdvPayment.quantity') }}</b-th>
                <b-th colspan="2">{{ $t('advPayments.newAdvPayment.price') }}</b-th>
                <b-th colspan="2">{{ $t('advPayments.newAdvPayment.value') }}</b-th>
                <b-th colspan="2">{{ $t('advPayments.newAdvPayment.amount') }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td colspan="4">{{ $t('advPayment.advPaymentHeader') }}</b-td>
                <b-td colspan="1">1</b-td>
                <b-td colspan="2">{{invoice.lines_sum}}</b-td>
                <b-td colspan="2">{{invoice.lines_sum}}</b-td>
                <b-td colspan="2">{{invoice.lines_sum}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8"></b-td>
                <b-td colspan="2"><strong>{{ $t('advPayments.newAdvPayment.total') }}: </strong></b-td>
                <b-td colspan="2">{{invoice.lines_sum}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8" class="hidden-row"></b-td>
                <b-td colspan="2"><strong>{{ $t('advPayments.newAdvPayment.payment') }}: </strong></b-td>
                <b-td colspan="2">{{invoice.lines_sum | euro}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-row>
        <b-row>
          <b-col lg="3">
              <p>{{ $t('advPayments.newAdvPayment.paymentMethod') }}:</p>
            <p style="border-bottom: solid;">{{invoice.payment_method}}<span style="margin-left:20px">{{invoice.lines_sum | euro}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
              <p>{{ $t('advPayments.newAdvPayment.vatExemptionReason') }}</p>
            <br>
            <p>{{ $t('advPayments.newAdvPayment.issuedBy') }}: {{invoice.operator_name}}</p>
            <br>
            <p>{{ $t('advPayments.newAdvPayment.zoi') }}: {{invoice.zoi}}</p>
            <p>{{ $t('advPayments.newAdvPayment.eor') }}: {{invoice.eor}}</p>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-row>
        <b-col lg="12">
            <iq-card>
                <template v-slot:body>
                    <b-row>
                        <b-col cols="4" align-self="center" style="margin-bottom: 25px;">
                            <h4 class="mb-0">{{ title }}</h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <div class="table-responsive-sm">
                                <b-table :items="invoices" :fields="invoiceColumns">
                                    <template v-slot:cell(invoiceStatus)="data">
                                        <span class="badge badge-danger" v-if="data.value == 'Unpaid'">Unpaid</span>
                                        <span class="badge badge-warning" v-if="data.value == 'Partialy Paid'">Partialy Paid</span>
                                        <span class="badge badge-success" v-if="data.value == 'Paid'">Paid</span>
                                    </template>
                                    <template v-slot:cell(total_with_vat)="data">
                                        <span class="font-weight-bold">{{data.value | euro}}</span>
                                    </template>
                                    <template v-slot:cell(billingDetails)="data">
                                        <p v-html="data.value"></p>
                                    </template>
                                </b-table>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <h5 style="margin-bottom: 15px;">{{ detail }}</h5>
                            <div class="table-responsive-sm">
                                <b-table-simple striped class="text-center">
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in invoiceDetailField" :key="index" :class="item.key === 'item' ? 'text-left' : ''">{{ item.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, bodyKey) in invoiceDetails" :key="bodyKey">
                                            <template v-for="(item,index) in invoiceDetailField">
                                                <th v-if="item.key === 'id'" :key="item.key+index">{{ body[item.key] }}</th>
                                                <td v-else-if="item.key === 'item'" :key="item.key+index" class="text-left">
                                                    <h6 class="mb-0">{{ body[item.key].title }}</h6>
                                                </td>
                                                <td v-else :key="item.key+index" :class="item.key === 'total' ? 'font-weight-bold' : ''">
                                                    {{ body[item.key] }}
                                                </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </b-table-simple>
                            </div>
                            <h5 style="margin-bottom: 15px;">{{ summary }}</h5>
                            <div class="table-responsive-sm">
                                <b-table striped :items="invoices" :fields="invoiceSummaryFields">
                                    <template v-slot:cell(total_with_vat)="data">
                                        <span style="font-size:25px" class="font-weight-bold">{{data.value | euro}}</span>
                                    </template>
                                </b-table>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col offset-md="4" cols="12" md="8" class="text-right">
                            <b-button variant="primary mr-3" @click="exportToPDF">
                                <i class="ri-printer-line"></i>
                                {{ $t('advPayments.newAdvPayment.downloadPrint') }}
                            </b-button>
                        </b-col>
                    </b-row>
                </template>
            </iq-card>
        </b-col>
    </b-row>
</b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { getInvoiceById, getItemsOfInvoiceById } from '../../services/invoice'
import { getPremiseById } from '../../services/companyPremises'
import moment from 'moment'
import html2pdf from 'html2pdf.js'

export default {
  name: 'AdvPayment',
  mounted () {
    xray.index()
    this.getInvoice(this.advPaymentId)
  },
  computed: {
    title () {
      return this.text + this.invoiceNumber
    }
  },
  methods: {
    getInvoice (id) {
      getInvoiceById(id).then(response => {
        this.invoices = response
        this.invoice = response[0]
        this.invoiceNumber = this.invoice.invoice_number
        this.invoiceDate = moment(this.invoice.invoice_time).format('YYYY-MM-DD HH:MM')
        this.getItems(this.invoice.invoice_id)
        this.invoiceDetails[0].total = this.invoice.charges_sum
        getPremiseById(this.invoice.premise_id).then(response => {
          this.premiseCity = response[0].premise_city
        })
      }
      )
    },
    getItems (id) {
      getItemsOfInvoiceById(id).then(response => {
        this.items = response
      })
    },
    exportToPDF () {
      let options = {
        filename: this.invoice.invoice_number + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        jsPDF: { unit: 'mm', format: 'a3' }
      }
      var source = window.document.getElementById('printInvoice')
      html2pdf().set(options).from(source).save()
    }
  },
  data () {
    return {
      advPaymentId: this.$route.params.advPaymentId,
      invoiceNumber: '',
      text: this.$t('advPayment.advPaymentHeader') + ' N° : ',
      summary: this.$t('invoice.invoiceSummary'),
      detail: this.$t('invoice.invoiceDetail'),
      invoiceDetailField: [
        {
          key: 'name',
          label: this.$t('invoice.invoiceDetailColumn.item')
        },
        {
          key: 'total',
          label: this.$t('invoice.invoiceDetailColumn.total')
        }
      ],
      invoiceDetails: [
        {
          name: this.$t('advPayment.advPaymentHeader'),
          total: ''
        }
      ],
      invoiceSummaryFields: [
        {
          label: this.$t('invoice.invoiceSummaryColumn.dueDate'),
          key: 'invoice_time',
          formatter: value => {
            return moment(value).format('YYYY-MM-DD')
          }
        },
        {
          key: 'payment_method',
          label: this.$t('invoice.invoiceSummaryColumn.paymentMethod')
        },
        {
          key: 'total_with_vat',
          label: this.$t('invoice.invoiceSummaryColumn.total')
        }
      ],
      invoiceColumns: [
        { label: this.$t('invoice.invoiceInfo.invoiceDate'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('YYYY-MM-DD')
          }
        },
        { label: this.$t('invoice.invoiceInfo.invoiceStatus'), key: 'verification_status', class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.paymentStatus'),
          key: 'invoiceStatus',
          formatter: (value, key, item) => {
            if (item.paid_amount === '$0.00') {
              return 'Unpaid'
            }
            return item.total_with_vat === item.paid_amount ? 'Paid' : 'Partialy Paid'
          },
          class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.invoiceDetails'),
          key: 'billingDetails',
          formatter: (value, key, item) => {
            let details = ''
            if (item.enquiries_name) details += item.enquiries_name
            if (item.enquiries_last_name) details += ' ' + item.enquiries_last_name
            details += '<br>'
            if (item.enquiries_address_line_1) details += item.enquiries_address_line_1 + '<br>'
            if (item.enquiries_post_code) details += item.enquiries_post_code
            if (item.enquiries_city) details += ' ' + item.enquiries_city
            if (item.country) details += ', ' + item.country
            details += '<br>'
            if (item.phone) details += 'Telefon: ' + item.phone + '<br>'
            if (item.email) details += 'Email: ' + item.email
            return details
          },
          class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.invoiceIssuedIn'), key: 'company_city', class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.invoiceIssuedBy'), key: 'operator_name', class: 'text-left' }
      ],
      invoice: null,
      invoices: [],
      items: [],
      invoiceDate: '',
      premiseCity: ''
    }
  }
}
</script>
