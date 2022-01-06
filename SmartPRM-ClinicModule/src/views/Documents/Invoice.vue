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
            <p>{{ $t('invoices.newInvoice.invoiceNo') }}: {{invoice.reference_code_furs}}</p>
            <p>{{ $t('advPayments.newAdvPayment.copy') }}:<span style="margin-left:20px">Original</span></p>
            <p>{{ $t('advPayments.newAdvPayment.IssuedIn') }}:<span style="margin-left:20px">{{premiseCity}}</span></p>
            <p>{{ $t('advPayments.newAdvPayment.dateOfAdvPayment') }}:<span style="margin-left:20px">{{invoiceTime}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-table-simple small responsive>
            <b-thead>
              <b-tr>
                <b-th colspan="2">{{ $t('invoice.invoiceInfo.invoiceDate') }}</b-th>
                <b-th colspan="2">{{ $t('advPayments.newAdvPayment.code') }}</b-th>
                <b-th colspan="2">{{ $t('advPayments.newAdvPayment.item') }}</b-th>
                <b-th colspan="1">{{ $t('advPayments.newAdvPayment.quantity') }}</b-th>
                <b-th colspan="1">{{ $t('advPayments.newAdvPayment.price') }}</b-th>
                <b-th colspan="2">{{ $t('advPayments.newAdvPayment.value') }}</b-th>
                <b-th colspan="2">{{ $t('advPayments.newAdvPayment.amount') }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item,index) in items" :key="index">
                <b-td colspan="2">{{ dateOfServicePdf }}</b-td>
                <b-td colspan="2">{{ item.product_code }}</b-td>
                <b-td colspan="2">{{ item.product_name }}</b-td>
                <b-td colspan="1">{{item.invoiced_quantity}}</b-td>
                <b-td colspan="1">{{item.product_price | euro}}</b-td>
                <b-td colspan="2">{{item.product_price | euro}}</b-td>
                <b-td colspan="2">{{item.net_amount | euro}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8"></b-td>
                <b-td colspan="2"><strong>{{ $t('advPayments.newAdvPayment.total') }}: </strong></b-td>
                <b-td colspan="2">{{invoice.lines_sum | euro}}</b-td>
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
              <p v-for="(payment,index) in payments" :key="index">{{payment.type}}<span style="margin-left:20px">{{payment.amount | euro}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
              <p>{{ $t('advPayments.newAdvPayment.vatExemptionReason') }}</p>
              <p>{{ $t('invoice.pdfGuarantee') }}</p>
            <br>
          </b-col>
          <b-col lg="6">
            <p>{{ $t('advPayments.newAdvPayment.issuedBy') }}: {{invoice.operator_name}}</p>
            <br>
            <p>{{ $t('advPayments.newAdvPayment.zoi') }}: {{invoice.zoi}}</p>
            <p>{{ $t('advPayments.newAdvPayment.eor') }}: {{invoice.eor}}</p>
          </b-col>
          <b-col lg="6">
            <qrcode-vue
              class="qr-margin float-right"
              :value="qrCode"
              size="120"
              level="M"
            ></qrcode-vue>
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
                            <h4 class="mb-0">{{ $t('invoice.invoiceHeader') }}  N° : {{invoiceHeader}} </h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <div class="table-responsive-sm">
                                <b-table :items="invoices" :fields="invoiceColumns">
                                    <template v-slot:cell(payment_status)="data">
                                        <span class="badge badge-danger" v-if="data.value == 'Unpaid'">{{ $t('invoice.unpaid') }}</span>
                                        <span class="badge badge-warning" v-if="data.value == 'Partialy Paid'">{{ $t('invoice.partialyPaid') }}</span>
                                        <span class="badge badge-success" v-if="data.value == 'Paid'">{{ $t('invoice.paid') }}</span>
                                    </template>
                                   <template v-slot:cell(billingDetails)="data">
                                        <p v-html="data.value"></p>
                                    </template>
                                </b-table>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="2">
                        <div class="table-responsive-sm">
                          <b-table-simple striped>
                            <b-thead>
                              <b-th colspan="2">{{ $t('advPayments.advPaymentsColumn.date') }}</b-th>
                            </b-thead>
                            <b-tbody>
                              <b-tr>
                                <b-td colspan="2">{{invoiceDate}}</b-td>
                              </b-tr>
                            </b-tbody>
                          </b-table-simple>
                        </div>
                      </b-col>
                      <b-col class="mt-4" lg="12">
                          <h5 style="margin-bottom: 15px;">{{ $t('invoice.invoiceDetail') }}</h5>
                          <div class="table-responsive-sm">
                            <b-table bordered hover :items="items" :fields="invoiceDetailField">
                                <template v-slot:cell(id)="data">
                                  <span>{{ items.indexOf(data.item) + 1 }}</span>
                                </template>
                                <template v-slot:cell(product_name)="data">
                                  <span>{{ data.item.product_name }}</span>
                                </template>
                                <template v-slot:cell(invoiced_quantity)="data">
                                  <span>{{ data.item.invoiced_quantity }}</span>
                                </template>
                                <template v-slot:cell(teeth)="data">
                                  <v-select class="style-chooser" v-if="Array.isArray(data.item.teeth)" disabled multiple v-model="data.item.teeth" :options="teethOptions"></v-select>
                                </template>
                                <template v-slot:cell(surfaces)="data">
                                  <v-select class="style-chooser" disabled multiple v-model="data.item.surfaces" :options="surfaceOptions"></v-select>
                                </template>
                                <template v-slot:cell(product_price)="data">
                                  <span>{{ data.item.product_price | numeral('0,0.00') | euro }}</span>
                                </template>
                                <template v-slot:cell(discount)="data">
                                  <span>{{ data.item.discount | percentage }}</span>
                                </template>
                                <template v-slot:cell(net_amount)="data">
                                  <span>{{ data.item.net_amount | numeral('0,0.00') | euro }}</span>
                                </template>
                              </b-table>
                          </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col class="mt-4" lg="6" offset-lg="6">
                          <h2 class="text-center">{{ $t('advPayment.advPaymentInfo.advPaymentTotal')}}: {{itemAmount | euro}}</h2>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col class="mt-4" lg="8">
                          <h5 style="margin-bottom: 15px;">{{ $t('advPayments.newAdvPayment.paymentMethodSummary') }}</h5>
                          <div class="table-responsive-sm">
                              <b-table striped :items="payments" :fields="invoiceSummaryFields">
                                  <template v-slot:cell(amount)="data">
                                      <span class="font-weight-bold">{{data.item.amount | numeral('0,0.00') | euro}}</span>
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
import { getInvoiceById, getItemsOfInvoiceById, getPaymentItemsOfInvoiceById } from '../../services/invoice'
import { getPremiseById, getPremiseDeviceById } from '../../services/companyPremises'
import moment from 'moment'
import html2pdf from 'html2pdf.js'
import QrcodeVue from 'qrcode.vue'
import BigNumber from 'bignumber.js'

export default {
  name: 'Invoice',
  components: {
    QrcodeVue,
  },
  mounted() {
    xray.index()
    this.getInvoice(this.invoiceId)
    this.getItems(this.invoiceId)
    this.getPaymentItems(this.invoiceId)
  },
  computed: {
    invoiceHeader() {
      return this.invoiceNumber.includes('.') ? this.$t('invoice.draft') : this.invoiceNumber
    },
  },
  methods: {
    getInvoice(id) {
      getInvoiceById(id).then(response => {
        this.invoices = response
        this.invoice = response[0]
        this.invoiceNumber = this.invoice.invoice_number
        this.invoiceDatePdf = moment(this.invoice.invoice_time).format('DD.MM.YYYY HH:MM')
        this.invoiceDate = moment(this.invoice.invoice_time).format('DD.MM.YYYY')
        this.itemAmount = this.invoice.charges_sum
        getPremiseById(this.invoice.premise_id).then(response => {
          this.premiseCity = response[0].premise_city
          this.premiseId = response[0].premise_id
          this.invoice.company_city = this.premiseCity
        })
        getPremiseDeviceById(this.invoice.device_id).then(response => {
          this.deviceName = response[0].device_name
        })
      }
      )
    },
    getItems(id) {
      getItemsOfInvoiceById(id).then(response => {
        this.items = response
        this.items.forEach(item => {
          item.teeth = this.getTeeth(item.teeth)
          item.surfaces = this.getSurfaces(item.surfaces)
        })
      })
    },
    getTeeth(teeth) {
      if (teeth === '') {
        return []
      } else if (teeth.includes(',')) {
        return teeth.split(',')
      } else {
        return new Array(teeth)
      }
    },
    getSurfaces(surfaces) {
      if (surfaces === '') {
        return []
      } else if (surfaces.includes(',')) {
        return surfaces.split(',')
      } else {
        return new Array(surfaces)
      }
    },
    getPaymentItems(id) {
      getPaymentItemsOfInvoiceById(id).then(response => {
        this.payments = response
      })
    },
    calculateQRCode() {
      let hexaNumber = new BigNumber(this.invoice.zoi, 16)
      let decimalNumber = hexaNumber.toString(10)
      this.decimalZoi = (decimalNumber.length < 39) ? '0'.repeat(39 - decimalNumber.length) + decimalNumber : decimalNumber
      let timeStamp = moment(this.invoice.invoice_time).format('DDMMYYHHMMSS')
      this.qrCode = this.decimalZoi + this.invoice.operator_tax_number + timeStamp
      this.calculateControlNumber()
    },
    calculateControlNumber() {
      let sum = 0
      for (let c of this.qrCode) {
        sum += parseInt(c)
      }
      this.qrCode += sum % 10
    },
    exportToPDF() {
      this.calculateQRCode()
      this.calculatePdfNumber()
      this.dateOfServicePdf = moment(this.dateOfService).format('DD.MM.YYYY')
      this.invoiceTime = moment(this.invoice.invoice_time).format('DD.MM.YYYY HH:MM')
      let options = {
        filename: this.invoice.invoice_number + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { y: 240 },
        jsPDF: { unit: 'mm', format: 'a3' },
      }
      var source = window.document.getElementById('printInvoice')
      html2pdf().set(options).from(source).save()
    },
    calculatePdfNumber() {
      let premiseNumber = this.premiseId < 10 ? '0' + this.premiseId : this.premiseId
      this.pdfNumber = premiseNumber + '-' + this.deviceName + '-' + this.invoice.invoice_number
    },
  },
  data() {
    return {
      invoiceId: this.$route.params.invoiceId,
      invoiceNumber: '',
      teethOptions: ['11', '12', '13', '14', '15', '16', '17', '18', '21', '22', '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '51', '52', '53', '54', '55', '61', '62', '63', '64', '65', '71', '72', '73', '74', '75'],
      surfaceOptions: ['B', 'L', 'M', 'D', 'O'],
      invoiceDetailField: [
        {
          key: 'id',
          label: '#',
          class: 'text-left',
        },
        {
          key: 'product_name',
          label: this.$t('invoice.invoiceDetailColumn.item'),
          class: 'text-left',
        },
        {
          key: 'invoiced_quantity',
          label: this.$t('invoice.invoiceDetailColumn.quantity'),
          class: 'text-left',
        },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.teeth'),
          key: 'teeth',
          class: 'text-left',
        },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.surface'),
          key: 'surfaces',
          class: 'text-left',
        },
        {
          key: 'product_price',
          label: this.$t('invoice.invoiceDetailColumn.price'),
          class: 'text-left',
        },
        {
          key: 'discount',
          label: this.$t('invoice.invoiceDetailColumn.discount'),
          class: 'text-left',
        },
        {
          key: 'net_amount',
          label: this.$t('advPayments.advPaymentsColumn.amount'),
          class: 'text-left',
        },
      ],
      invoiceSummaryFields: [
        {
          label: this.$t('invoice.invoiceSummaryColumn.paymentMethod'),
          key: 'type',
          class: 'text-left',
        },
        {
          label: this.$t('advPayments.advPaymentsColumn.amount'),
          key: 'amount',
          class: 'text-left',
        },
      ],
      invoiceColumns: [
        { label: this.$t('invoice.invoiceInfo.invoiceStatus'),
          key: 'verification_status',
          class: 'text-left',
          formatter: (value, key, item) => {
            return this.$t(item.verification_status)
          },
          filterByFormatted: true,
        },
        { label: this.$t('invoice.invoiceInfo.paymentStatus'),
          key: 'payment_status',
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
        { label: this.$t('invoice.invoiceInfo.invoiceIssuedBy'), key: 'operator_name', class: 'text-left' },
      ],
      invoice: null,
      invoices: [],
      payments: [],
      items: [],
      invoiceDate: '',
      itemAmount: '',
      qrCode: '',
      dateOfServicePdf: '',
      premiseCity: '',
      premiseId: '',
      invoiceTime: '',
      pdfNumber: '',
      deviceName: '',
    }
  },
}
</script>

<style lang="scss">

.qr-margin {
    margin: 3rem 12rem 0 0;
}

</style>
