<template>
<b-container fluid>
  <div style="display: none">
      <div id="printInvoice" style="color:black;margin-left:40px;height:1200px">
        <b-row>
            <b-col lg="12">
              <p>{{usersCompany.company_name}}</p>
              <p>{{usersCompany.company_address_line_1}}</p>
              <p>{{usersCompany.company_post_code}} {{usersCompany.company_city}}</p>
              <p>{{ $t('advPayments.newAdvPayment.IBAN') }}: {{usersCompany.company_iban}}</p>
              <p>{{ $t('advPayments.newAdvPayment.vatId') }}: {{usersCompany.company_tax_registration_number}}</p>
              <p>{{ $t('advPayments.newAdvPayment.regNumber') }}: {{usersCompany.company_legal_registration_identifier}}</p>
            </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <p>{{patient.name}} {{patient.last_name}}</p>
            <p>{{patient.address_line_1}}</p>
            <p>{{patient.post_code}} {{patient.city}}</p>
          </b-col>
          <b-col lg="6">
            <p>{{ $t('advPayments.newAdvPayment.advPaymentNo') }}: {{referenceCodeFurs}}</p>
            <p>{{ $t('advPayments.newAdvPayment.copy') }}:<span style="margin-left:20px">Original</span></p>
            <p>{{ $t('advPayments.newAdvPayment.IssuedIn') }}:<span style="margin-left:20px">{{issuedIn.premise_city}}</span></p>
            <p>{{ $t('advPayments.newAdvPayment.dateOfAdvPayment') }}:<span style="margin-left:20px">{{invoiceTime}}</span></p>
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
                <b-td colspan="2">{{advPayments[0].amount | euro}}</b-td>
                <b-td colspan="2">{{advPayments[0].amount | euro}}</b-td>
                <b-td colspan="2">{{advPayments[0].amount | euro}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8"></b-td>
                <b-td colspan="2"><strong>{{ $t('advPayments.newAdvPayment.total') }}: </strong></b-td>
                <b-td colspan="2">{{advPayments[0].amount | euro}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8" class="hidden-row"></b-td>
                <b-td colspan="2"><strong>{{ $t('advPayments.newAdvPayment.payment') }}: </strong></b-td>
                <b-td colspan="2">{{advPayments[0].amount | euro}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-row>
        <b-row>
          <b-col lg="3">
              <p>{{ $t('advPayments.newAdvPayment.paymentMethod') }}:</p>
            <p style="border-bottom: solid;">{{paymentMethods[0].type}}<span style="margin-left:20px">{{advPayments[0].amount | euro}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
              <p>{{ $t('advPayments.newAdvPayment.vatExemptionReason') }}</p>
            <br>
          </b-col>
          <b-col lg="6">
            <p>{{ $t('advPayments.newAdvPayment.issuedBy') }}: {{logedInUser.name}}</p>
            <br>
            <p>{{ $t('advPayments.newAdvPayment.zoi') }}: {{zoi}}</p>
            <p>{{ $t('advPayments.newAdvPayment.eor') }}: {{eor}}</p>
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
                            <h4 class="mb-0">{{ $t('advPayments.newAdvPayment.newAdvPaymentHeader') }}</h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <div class="table-responsive-sm">
                              <b-table-simple>
                                <b-thead>
                                  <b-th colspan="2">{{ $t('advPayments.newAdvPaymentColumn.issuedBy') }}</b-th>
                                  <b-th colspan="3">{{ $t('advPayments.newAdvPaymentColumn.customer') }}</b-th>
                                  <b-th colspan="4">{{ $t('advPayments.newAdvPaymentColumn.issuedIn') }}</b-th>
                                  <b-th colspan="3">{{ $t('invoices.newInvoice.newInvoiceColumn.device') }}</b-th>
                                </b-thead>
                                <b-tbody>
                                  <b-tr>
                                    <b-td colspan="2">{{ logedInUser.first_name }} {{logedInUser.surname}}</b-td>
                                    <b-td colspan="3" v-html="billingDetails"></b-td>
                                    <b-td colspan="4">
                                      <span v-if="isInvoiceStatusIssued">
                                          {{ issuedIn.premise_name}}
                                      </span>
                                      <v-select v-else :clearable="false" label="premise_name" class="premises" v-model="issuedIn" @input="findDevicesForPremise" :options="companyPremises"></v-select>
                                    </b-td>
                                    <b-td colspan="3">
                                      <span v-if="devices.length == 1">{{device.device_name}}</span>
                                      <div v-else>
                                        <span v-if="isInvoiceStatusIssued">
                                          {{ device.device_name}}
                                        </span>
                                        <v-select v-else :clearable="false" label="device_name" class="premises" v-model="device" :options="devices"></v-select>
                                      </div>
                                    </b-td>
                                  </b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="4" class="mt-3 ml-3 mb-3">
                            <label style="color:black"> {{ $t('advPayments.newAdvPayment.dateOfAdvPayment') }}</label>
                            <span class="text-black mt-5 ml-5">{{ new Date() | formatInvoiceDate }}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="8">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('advPayments.newAdvPayment.details.header') }}</h5>
                            </template>
                            <template v-slot:body>
                              <b-row>
                                <b-col md="12" class="table-responsive">
                                  <b-table bordered :items="advPayments" :fields="detailColumns">
                                    <template v-slot:cell(name)="data">
                                      <span>{{ data.item.name }}</span>
                                    </template>
                                    <template v-slot:cell(amount)="data">
                                      <input type="number" :disabled="isInvoiceStatusIssued" min="0" v-model="data.item.amount" class="form-control">
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="6" offset-lg="6">
                          <h2 class="text-center">{{ $t('advPayment.advPaymentInfo.advPaymentTotal')}}: {{advPayments[0].amount | euro}}</h2>
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="8">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('advPayments.newAdvPayment.paymentMethodSummary') }}</h5>
                            </template>
                            <template v-slot:body>
                               <b-row>
                                <b-col md="12" class="table-responsive" style="min-height:200px">
                                  <b-table bordered :items="paymentMethods" :fields="paymentMethodColumns">
                                    <template v-slot:cell(type)="data">
                                      <span v-if="isInvoiceStatusIssued">
                                          {{ data.item.type }}
                                      </span>
                                      <div v-else>
                                        <v-select :clearable="false" label="name" :reduce="opt => opt.name" class="style-chooser" v-model="data.item.type" :options="paymentMethodOptions"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(amount)="data">
                                      <input type="number" :disabled="isInvoiceStatusIssued" min="0"  v-model="data.item.amount" class="form-control">
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col offset-md="4" cols="12" md="8" class="text-right">
                            <b-button :disabled="!canPrintPdf" variant="primary mr-3" @click="exportToPDF">
                                <i class="ri-printer-line"></i>
                                {{ $t('advPayments.newAdvPayment.downloadPrint') }}
                            </b-button>
                            <b-button variant="primary mr-4" :disabled="isInvoiceStatusIssued" @click="saveAsDraft">
                                <i class="ri-bookmark-3-fill mr-2"></i>{{ $t('advPayments.newAdvPayment.saveDraft') }}
                            </b-button>
                            <b-button variant="warning mr-3" @click="saveInvoice">
                                <i class="ri-save-3-line mr-2"></i>{{ $t('advPayments.newAdvPayment.save') }}
                            </b-button>
                        </b-col>
                    </b-row>
                </template>
            </iq-card>
        </b-col>
    </b-row>
    <b-toast id="b-toaster-bottom-right" variant="primary" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-checkbox-circle-line"></i>  {{ $t('invoice.saved') }}</span>
      </template>
    </b-toast>

    <b-toast id="bottom-right-danger" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i>  {{ $t('invoice.notSaved') }}</span>
      </template>
    </b-toast>

    <b-toast id="amount-zero" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i>{{ $t('advPayments.newAdvPayment.alert2') }}</span>
      </template>
    </b-toast>

    <b-toast id="different-amount" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i>{{ $t('advPayments.newAdvPayment.alert') }}</span>
      </template>
    </b-toast>

    <b-toast id="mandatory-payment-method" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i>{{ $t('advPayments.newAdvPayment.alert3') }}</span>
      </template>
    </b-toast>

    <b-toast id="mandatory-device-id" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i>Device id is mandatory</span>
      </template>
    </b-toast>
</b-container>

</template>
<script>
import { xray } from '../../config/pluginInit'
import moment from 'moment'
import { sso } from '../../services/userService'
import { getCompanyById } from '../../services/companies'
import { getEnquiryById } from '../../services/enquiry'
import { createInvoice, updateInvoice, getSerialForInvoiceNumberBasedOnType, getPaymentItemsOfInvoiceById, getSerialForFursInvoiceNumberBasedOnType } from '../../services/invoice'
import { getPremisesForCompany, getDevicesForPremise } from '../../services/companyPremises'
import html2pdf from 'html2pdf.js'
import _ from 'lodash'
import QrcodeVue from 'qrcode.vue'
import BigNumber from 'bignumber.js'

export default {
  name: 'NewAdvPayment',
  components: {
    QrcodeVue
  },
  mounted () {
    xray.index()
    this.getLoggedInUser()
    this.getPatient()
  },
  data () {
    return {
      detailColumns: [
        { label: this.$t('advPayments.newAdvPayment.details.item'), key: 'name', class: 'text-left item-name' },
        { label: this.$t('advPayments.newAdvPayment.details.amount'), key: 'amount', class: 'text-left action-column' }
      ],
      advPayments: [
        {
          name: this.$t('advPayment.advPaymentHeader'),
          amount: 0,
          editable: true
        }
      ],
      summaryRows: [],
      paymentMethods: [
        {
          type: null,
          amount: 0,
          paid: true
        }
      ],
      products: [],
      paymentMethodOptions: [
        { id: 1, name: 'Cash', label: this.$t('paymentMethods.cash') },
        { id: 2, name: 'Credit card', label: this.$t('paymentMethods.creditCard') },
        { id: 3, name: 'Bank Account', label: this.$t('paymentMethods.bankAccount') }
      ],
      selectedItemName: '',
      summary: this.$t('advPayment.advPaymentSummary'),
      paymentMethodColumns: [
        {
          key: 'type',
          label: this.$t('paymentMethod')
        },
        {
          key: 'amount',
          label: this.$t('paymentMethodsColumn.amount'),
          class: 'action-column'
        }
      ],
      patientId: this.$route.params.patientId,
      billingDetails: '',
      issuedIn: {},
      isEditMode: false,
      logedInUser: {},
      patient: {},
      usersCompany: {},
      invoice: {},
      canPrintPdf: false,
      companyPremises: [],
      dateOfAdvPayment: moment().format('YYYY-MM-DDTHH:MM:SS'),
      device: {},
      deviceId: '',
      devices: [],
      invoiceNumber: '',
      zoi: 'a7e5f55e1dbb48b799268e1a6d8618a3',
      eor: 'a7e5f55e1dbb48b799268e1a6d8618a3',
      status: '',
      invoiceId: '',
      consecutiveInvoiceNumber: null,
      invoiceTime: '',
      invoiceType: 'Advance payment',
      referenceCode: '',
      referenceCodeFurs: '',
      qrCode: '',
      pdfNumber: '',
      pdfName: ''
    }
  },
  computed: {
    isInvoiceStatusIssued () {
      return this.status === 'invoice.issued'
    }
  },
  methods: {
    defaultPayment () {
      return {
        type: null,
        amount: 0,
        editable: true
      }
    },
    findDevicesForPremise (value) {
      getDevicesForPremise(value.premise_id).then(response => {
        this.devices = response
        this.device = this.devices[0]
      })
    },
    exportToPDF () {
      this.calculateQRCode()
      this.calculatePdfNumber()
      this.setPdfName()
      this.invoiceTime = moment(this.invoice.invoice_time).format('YYYY-MM-DD HH:MM')
      let options = {
        filename: this.pdfName + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { y: 170 },
        jsPDF: { unit: 'mm', format: 'a3' }
      }
      var source = window.document.getElementById('printInvoice')
      html2pdf().set(options).from(source).save()
    },
    setPdfName () {
      this.pdfName = this.invoiceNumber === 'invoice.draft' ? this.$t('invoice.draft') : this.invoiceNumber
    },
    calculatePdfNumber () {
      let year = moment().format('YY')
      let premiseNumber = this.issuedIn.premise_id < 10 ? '0' + this.issuedIn.premise_id : this.issuedIn.premise_id
      let invoiceNumber = this.invoiceNumber === 'invoice.draft' ? this.$t('invoice.draft').toLowerCase() : this.invoiceNumber
      let zeroFill = _.padStart(invoiceNumber, 5, '0')
      this.pdfNumber = premiseNumber + '-' + this.device.device_name + '-' + year + zeroFill
    },
    createBillingDetails (selectedPatient) {
      let details = ''
      if (selectedPatient.name) details += selectedPatient.name
      if (selectedPatient.last_name) details += ' ' + selectedPatient.last_name
      details += '<br>'
      if (selectedPatient.address_line_1) details += selectedPatient.address_line_1 + '<br>'
      if (selectedPatient.post_code) details += selectedPatient.post_code
      if (selectedPatient.city) details += ' ' + selectedPatient.city
      if (selectedPatient.country) details += ', ' + selectedPatient.country
      details += '<br>'
      if (selectedPatient.phone) details += 'Telefon: ' + selectedPatient.phone + '<br>'
      if (selectedPatient.email) details += 'Email: ' + selectedPatient.email
      this.billingDetails = details
    },
    submitPaymentMethod (item) {
      item.editable = false
    },
    editPaymentMethod (item) {
      item.editable = true
    },
    editPayment (item) {
      item.editable = true
    },
    getLoggedInUser () {
      sso().then(response => {
        this.logedInUser = response
        getCompanyById(this.logedInUser.prm_company_id).then(response => {
          this.usersCompany = response[0]
        })
        getPremisesForCompany(this.logedInUser.prm_company_id).then(response => {
          this.companyPremises = response
          this.issuedIn = this.companyPremises[0]
          this.findDevicesForPremise(this.issuedIn)
        })
      })
    },
    getPatient () {
      getEnquiryById(this.patientId).then(response => {
        this.patient = response[0]
        this.createBillingDetails(this.patient)
      })
    },
    submitPayment (item) {
      item.editable = false
    },
    saveAsDraft () {
      this.status = 'invoice.draft'
      this.invoiceNumber = 'invoice.draft'
      this.deviceId = this.device ? this.device.device_id : ''
      this.prepareInvoice()
      if (this.isInoiceValid()) this.createInvoice()
    },
    saveInvoice () {
      this.status = 'invoice.issued'
      this.deviceId = this.device ? this.device.device_id : ''
      this.generateInvoiceNumber()
    },
    generateInvoiceNumber () {
      let data = {
        business_premise_id: this.issuedIn.business_premise_id,
        draft: 'invoice.draft'
      }
      getSerialForInvoiceNumberBasedOnType(data).then(response => {
        let number = parseInt(response[0].count) + 1
        console.log('inv_num: ' + number)
        this.invoiceNumber = number
        this.generateReferenceCode()
        getSerialForFursInvoiceNumberBasedOnType(data).then(furs => {
          let number = parseInt(furs[0].count) + 1
          this.invoiceNumberFurs = this.issuedIn.business_premise_id + '-' + this.device.electronic_device_id + '-' + number
          console.log('furs: ' + this.invoiceNumberFurs)

          this.prepareInvoice()
          if (this.isInoiceValid()) this.createInvoice()
        })
      })
    },
    generateReferenceCode () {
      let premiseNumber = this.issuedIn.premise_id < 10 ? '0' + this.issuedIn.premise_id : this.issuedIn.premise_id
      let year = moment().format('YY')
      let zeroFill = _.padStart(this.invoiceNumber, 5, '0')
      this.referenceCode = 'AR-' + year + '-' + this.invoiceNumber
      this.referenceCodeFurs = premiseNumber + '-' + this.device.device_name + '-' + year + zeroFill
    },
    isInoiceValid () {
      let valid = true
      if (parseFloat(this.advPayments[0].amount).toFixed(2) !== parseFloat(this.paymentMethods[0].amount).toFixed(2)) {
        this.$bvToast.show('different-amount')
        valid = false
      }
      if (this.advPayments[0].amount === 0) {
        this.$bvToast.show('amount-zero')
        valid = false
      }
      if (!this.paymentMethods[0].type) {
        this.$bvToast.show('mandatory-payment-method')
        valid = false
      }
      if (!this.deviceId) {
        this.$bvToast.show('mandatory-device-id')
        valid = false
      }
      return valid
    },
    createInvoice () {
      if (!this.invoiceId) {
        createInvoice(this.invoice).then(response => {
          this.invoiceId = response
          this.canPrintPdf = true
          this.fetchItemsAndPaymentMethods(this.invoiceId)
          this.$bvToast.show('b-toaster-bottom-right')
          if (this.isInvoiceStatusIssued) this.redirectToDetailsPage()
        }).catch(errorMsg => {
          console.log('Error: ' + errorMsg)
          this.$bvToast.show('bottom-right-danger')
        })
      } else {
        updateInvoice(this.invoiceId, this.invoice).then(response => {
          this.fetchItemsAndPaymentMethods(this.invoiceId)
          this.$bvToast.show('b-toaster-bottom-right')
          if (response === 'invoice.issued') this.redirectToDetailsPage()
        })
      }
    },
    fetchItemsAndPaymentMethods (invoiceId) {
      getPaymentItemsOfInvoiceById(invoiceId).then(items => {
        this.paymentMethods = items
      })
    },
    redirectToDetailsPage () {
      this.$router.push({ path: `/documents/advance-payments/${this.invoiceId}` })
    },
    calculateQRCode () {
      let hexaNumber = new BigNumber(this.zoi, 16)
      let decimalNumber = hexaNumber.toString(10)
      this.decimalZoi = (decimalNumber.length < 39) ? '0'.repeat(39 - decimalNumber.length) + decimalNumber : decimalNumber
      let timeStamp = moment(this.dateOfAdvPayment).format('DDMMYYHHMMSS')
      this.qrCode = this.decimalZoi + this.logedInUser.tax_number + timeStamp
      this.calculateControlNumber()
    },
    calculateControlNumber () {
      let sum = 0
      for (let c of this.qrCode) {
        sum += parseInt(c)
      }
      this.qrCode += sum % 10
    },
    prepareInvoice () {
      let temp = {
        invoice_type: this.invoiceType,
        invoice_time: this.dateOfAdvPayment,
        invoice_number: this.invoiceNumber,
        invoice_number_furs: this.invoiceNumberFurs,
        issued_in: this.issuedIn.premise_name,
        lines_sum: this.advPayments[0].amount,
        discount_sum: 0,
        charges_sum: this.advPayments[0].amount,
        total_without_vat: this.advPayments[0].amount,
        total_vat_amount: null,
        total_with_vat: this.advPayments[0].amount,
        paid_amount: this.advPayments[0].amount,
        amount_due_for_payment: 1,
        payment_methods: this.paymentMethods,
        warranty: true,
        vat_exemption_reason: 'test',
        operator_name: this.logedInUser.first_name + ' ' + this.logedInUser.surname,
        operator_tax_number: this.logedInUser.tax_number,
        zoi: this.zoi,
        eor: this.eor,
        invoice_special_notes: 'test',
        reverted: false,
        device_id: this.deviceId,
        premise_id: this.issuedIn.premise_id,
        business_customer_id: this.issuedIn.business_customer_id,
        invoiceItems: [],
        verification_status: this.status,
        payment_status: 'Paid',
        reference_code: this.referenceCode,
        reference_code_furs: this.referenceCodeFurs
      }
      this.invoice = _.assignIn(this.invoice, this.patient, this.usersCompany, temp)
    },
    add () {
      // TODO add payment
    }
  }
}
</script>

<style lang="scss">
.action-column {
  width: 120px !important;
}

.narrow-column {
  width: 100px !important;
}
.item-name {
  min-width: 240px !important;
}

.v-select {
  display: grid;
}

.premises .vs__search::placeholder,
.premises .vs__dropdown-toggle,
.premises .vs__dropdown-menu {
    border-radius: 10px;
    min-height: 45px;
    min-width: 300px;
}

.hidden-row {
  border: none !important;
}

.qr-margin {
    margin: 3rem 12rem 0 0;
}

</style>
