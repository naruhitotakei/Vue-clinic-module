<template>
<b-container ref="invoice" fluid>
    <b-row>
        <b-col lg="12">
            <iq-card>
                <template v-slot:body>
                    <b-row>
                        <b-col cols="4" align-self="center" style="margin-bottom: 25px;">
                            <h4 class="mb-0">{{ $t('invoices.newInvoice.newInvoiceHeader') }}</h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <div class="table-responsive-sm">
                              <b-table-simple>
                                <b-thead>
                                  <b-th colspan="2">{{ $t('invoices.newInvoice.newInvoiceColumn.issuedBy') }}</b-th>
                                  <b-th colspan="3">{{ $t('invoices.newInvoice.newInvoiceColumn.customer') }}</b-th>
                                  <b-th colspan="4">{{ $t('invoices.newInvoice.newInvoiceColumn.issuedIn') }}</b-th>
                                  <b-th colspan="3">{{ $t('invoices.newInvoice.newInvoiceColumn.device') }}</b-th>
                                </b-thead>
                                <b-tbody>
                                  <b-tr>
                                    <b-td colspan="2">{{usersCompany.company_name}}</b-td>
                                    <b-td colspan="3" v-html="billingDetails"></b-td>
                                    <b-td colspan="4">
                                      <v-select :clearable="false" label="premise_name" class="premises" v-model="issuedIn" @input="findDevicesForPremise" :options="companyPremises"></v-select>
                                    </b-td>
                                    <b-td colspan="3">
                                      <span v-if="devices.length == 1">{{device.device_name}}</span>
                                      <v-select v-else :clearable="false" label="device_name" class="premises" v-model="device" :options="devices"></v-select>
                                    </b-td>
                                  </b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <b-form-group class="col-md-4" :label="$t('invoices.newInvoice.dateOfInvoice')" style="color:black">
                          <b-form-input v-model="dateOfInvoice" type="date"></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('invoices.newInvoice.newInvoiceDetails.header') }}</h5>
                            </template>
                            <template v-slot:body>
                              <b-row>
                                <b-col md="12" class="table-responsive">
                                  <b-table bordered hover :items="advPayments" :fields="detailColumns">
                                    <template v-slot:cell(name)="data">
                                      <span>{{ data.item.name }}</span>
                                    </template>
                                    <template v-slot:cell(amount)="data">
                                      <input type="number"  v-model="data.item.amount" class="form-control">
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
                          <h2 class="text-center">Total: {{advPayments[0].amount | euro}}</h2>
                      </b-col>
                      <b-col lg="6" offset-lg="6">
                          <b-alert :show="!canBeSaved" variant="danger">
                            <div class="iq-alert-icon">
                              <i class="ri-alert-line"></i>
                            </div>
                            <div class="iq-alert-text">
                              <ul style="list-style:inherit">
                                <li>Amounts of payment method and advance payment must be the same</li>
                                <li>Advance payment amount can't be 0</li>
                                <li>Payment method must be selected</li>
                              </ul>
                            </div>
                          </b-alert>
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="8">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('invoices.newInvoice.paymentMethodSummary') }}</h5>
                            </template>
                            <template v-slot:body>
                               <b-row>
                                <b-col md="12" class="table-responsive" style="min-height:200px">
                                  <b-table striped :items="paymentMethods" :fields="paymentMethodColumns">
                                    <template v-slot:cell(paymentMethod)="data">
                                      <div>
                                        <v-select :clearable="false" label="name" :reduce="opt => opt.name" class="style-chooser" v-model="data.item.paymentMethod" :options="paymentMethodOptions"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(amount)="data">
                                      <input type="number"  v-model="data.item.amount" class="form-control">
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col offset="6" cols="6" class="text-right" data-html2canvas-ignore="true">
                            <b-button :disabled="!canPrintPdf" variant="primary mr-3" @click="exportToPDF">
                                <i class="ri-printer-line"></i>
                                {{ $t('invoices.newInvoice.downloadPrint') }}
                            </b-button>
                            <b-button :disabled="!canBeSaved" variant="primary mr-4" @click="saveAsDraft">
                                <i class="ri-bookmark-3-fill mr-2"></i>{{ $t('invoices.newInvoice.saveAsDraft') }}
                            </b-button>
                            <b-button :disabled="!canBeSaved" variant="warning mr-3" @click="saveInvoice">
                                <i class="ri-save-3-line mr-2"></i>Confirm and Save
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
</b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import moment from 'moment'
import { sso } from '../../services/userService'
import { getCompanyById } from '../../services/companies'
import { getEnquiryById } from '../../services/enquiry'
import { createInvoice } from '../../services/invoice'
import { getPremisesForCompany, getDevicesForPremise } from '../../services/companyPremises'
import html2pdf from 'html2pdf.js'
import _ from 'lodash'

export default {
  name: 'NewAdvPayment',
  mounted () {
    xray.index()
    this.getLoggedInUser()
    this.getPatient()
  },
  computed: {
    canBeSaved () {
      return this.advPayments[0].amount === this.paymentMethods[0].amount && this.advPayments[0].amount !== 0 && this.paymentMethods[0].paymentMethod
    }
  },
  data () {
    return {
      detailColumns: [
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.item'), key: 'name', class: 'text-left item-name' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.amount'), key: 'amount', class: 'text-left' }
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
          paymentMethod: null,
          amount: 0,
          editable: true
        }
      ],
      products: [],
      paymentMethodOptions: [
        { id: 1, name: 'Cash' },
        { id: 2, name: 'Credit card' },
        { id: 3, name: 'Bank Account' }
      ],
      selectedItemName: '',
      summary: 'Invoice Summary',
      paymentMethodColumns: [
        {
          key: 'paymentMethod',
          label: this.$t('invoices.newInvoice.newInvoiceSummary.paymentMethod')
        },
        {
          key: 'amount',
          label: this.$t('invoices.newInvoice.newInvoiceDetails.amount'),
          class: 'action-column'
        }
      ],
      invoiceDate: moment().format('DD MMM, YYYY'),
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
      dateOfInvoice: moment().format('YYYY-MM-DD'),
      device: null,
      devices: []
    }
  },
  methods: {
    defaultPayment () {
      return {
        paymentMethod: null,
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
      this.items.pop()
      let options = {
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { y: 350 },
        jsPDF: { unit: 'mm', format: 'legal', orientation: 'landscape' }
      }
      html2pdf().set(options).from(this.$refs.invoice).save()
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
      this.prepareInvoice('draft')
      this.createInvoice()
    },
    saveInvoice () {
      this.prepareInvoice('issued')
      this.createInvoice()
    },
    createInvoice () {
      createInvoice(this.invoice).then(response => {
        this.canPrintPdf = true
        this.$bvToast.show('b-toaster-bottom-right')
      }).catch(errorMsg => {
        console.log('Error: ' + errorMsg)
        this.$bvToast.show('bottom-right-danger')
      })
    },
    prepareInvoice (status) {
      let temp = {
        invoice_type: 'Advance payment',
        invoice_time: this.dateOfInvoice,
        invoice_number: '02-blagajna1-21aleksa',
        invoice_numbering_structure: '{c}',
        issued_in: this.issuedIn.premise_name,
        lines_sum: this.advPayments[0].amount,
        discount_sum: 0,
        charges_sum: this.advPayments[0].amount,
        total_without_vat: this.advPayments[0].amount,
        total_vat_amount: null,
        total_with_vat: this.advPayments[0].amount,
        paid_amount: 0,
        amount_due_for_payment: 1,
        payment_method: this.paymentMethods[0].paymentMethod,
        warranty: true,
        vat_exemption_reason: 'test',
        operator_name: this.logedInUser.name,
        operator_tax_number: this.logedInUser.tax_number,
        zoi: 'test',
        eor: 'test',
        invoice_special_notes: 'test',
        reverted: false,
        device_id: 1,
        premise_id: 1,
        business_customer_id: 1,
        invoiceItems: [],
        invoice_status: status
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

</style>
