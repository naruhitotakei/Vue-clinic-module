<template>
<b-container fluid>
  <div  style="display: none">
      <div id="printInvoice" style="color:black;margin-left:40px;height:900px">
        <b-row>
            <b-col lg="12">
              <p>{{usersCompany.company_name}}</p>
              <p>{{usersCompany.company_address_line_1}}</p>
              <p>{{usersCompany.company_post_code}} {{usersCompany.company_city}}</p>
              <p> IBAN: {{usersCompany.company_iban}}</p>
              <p>ID.štev za DDV: {{usersCompany.company_tax_registration_number}}</p>
              <p>Matična št.: {{usersCompany.company_legal_registration_identifier}}</p>
            </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <p>{{patient.name}} {{patient.last_name}}</p>
            <p>{{patient.address_line_1}}</p>
            <p>{{patient.post_code}} {{patient.city}}</p>
          </b-col>
          <b-col lg="6">
            <p>AVANSNI RAČUN št.: {{invoice_number}}</p>
            <p>Izvod:<span style="margin-left:20px">Original</span></p>
            <p>Kraj izdaje:<span style="margin-left:20px">{{issuedIn.premise_name}}</span></p>
            <p>Datum izdaje:<span style="margin-left:20px">{{dateOfAdvPaymentPdf}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-table-simple small responsive>
            <b-thead>
              <b-tr>
                <b-th colspan="1">Šifra</b-th>
                <b-th colspan="4">Opis</b-th>
                <b-th colspan="1">Kol/g</b-th>
                <b-th colspan="2">Cena/EM</b-th>
                <b-th colspan="2">Vrednost</b-th>
                <b-th colspan="2">Znesek</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td colspan="1"></b-td>
                <b-td colspan="4">{{ $t('advPayment.advPaymentHeader') }}</b-td>
                <b-td colspan="1">1</b-td>
                <b-td colspan="2">{{advPayments[0].amount}}</b-td>
                <b-td colspan="2">{{advPayments[0].amount}}</b-td>
                <b-td colspan="2">{{advPayments[0].amount}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8"></b-td>
                <b-td colspan="2"><strong>Skupaj: </strong></b-td>
                <b-td colspan="2">{{advPayments[0].amount}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8" class="hidden-row"></b-td>
                <b-td colspan="2"><strong>Vplačilo: </strong></b-td>
                <b-td colspan="2">{{advPayments[0].amount | euro}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-row>
        <b-row>
          <b-col lg="3">
            <p>Način plačila:</p>
            <p style="border-bottom: solid;">{{paymentMethods[0].paymentMethod}}<span style="margin-left:20px">{{advPayments[0].amount | euro}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Zdravstvene storitive in oskrba so v skladu z 2. in 4. točko, prvega odstavka, 42 člena ZDDV-1, oproščene plačila DDV, zato DDV ni nil obračunan</p>
            <br>
            <p>Račun izdal: {{logedInUser.name}}</p>
            <br>
            <p>ZOI: {{zoi}}</p>
            <p>EOR: {{eor}}</p>
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
                        <b-form-group class="col-md-4" :label="$t('advPayments.newAdvPayment.dateOfAdvPayment')" style="color:black">
                          <b-form-input v-model="dateOfAdvPayment" type="date"></b-form-input>
                        </b-form-group>
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
                                    <template v-slot:cell(paymentMethod)="data">
                                      <div>
                                        <v-select :disabled="isInvoiceStatusIssued" :clearable="false" label="name" :reduce="opt => opt.name" class="style-chooser" v-model="data.item.paymentMethod" :options="paymentMethodOptions"></v-select>
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
                        <b-col offset-md="4" cols="12" md="8" class="text-right" data-html2canvas-ignore="true">
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
          <span><i class="ri-error-warning-fill"></i> Advance payment amount can't be 0 </span>
      </template>
    </b-toast>

    <b-toast id="different-amount" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i> Amounts of payment method and advance payment must be the same </span>
      </template>
    </b-toast>

    <b-toast id="mandatory-payment-method" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i> Payment method must be selected </span>
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
          paymentMethod: null,
          amount: 0,
          editable: true
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
          key: 'paymentMethod',
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
      dateOfAdvPayment: moment().format('YYYY-MM-DD'),
      dateOfAdvPaymentPdf: moment().format('YYYY-MM-DD HH:MM'),
      device: null,
      devices: [],
      invoice_number: '02-blagajna1-21aleksa',
      zoi: '24as211d4232as1124',
      eor: '24as211d4232as1124',
      status: ''
    }
  },
  computed: {
    isInvoiceStatusIssued () {
      return this.status === 'issued'
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
      let options = {
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { y: 300 },
        jsPDF: { unit: 'pt', format: 'a3' }
      }
      var source = window.document.getElementById('printInvoice')
      html2pdf().set(options).from(source).save()
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
      this.status = 'draft'
      this.prepareInvoice()
      if (this.isInoiceValid()) this.createInvoice()
    },
    saveInvoice () {
      this.status = 'issued'
      this.prepareInvoice()
      if (this.isInoiceValid()) this.createInvoice()
    },
    isInoiceValid () {
      let valid = true
      if (this.advPayments[0].amount !== this.paymentMethods[0].amount) {
        this.$bvToast.show('different-amount')
        valid = false
      }
      if (this.advPayments[0].amount === 0) {
        this.$bvToast.show('amount-zero')
        valid = false
      }
      if (!this.paymentMethods[0].paymentMethod) {
        this.$bvToast.show('mandatory-payment-method')
        valid = false
      }
      return valid
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
    prepareInvoice () {
      let temp = {
        invoice_type: 'Advance payment',
        invoice_time: this.dateOfAdvPayment,
        invoice_number: this.invoice_number,
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
        zoi: this.zoi,
        eor: this.eor,
        invoice_special_notes: 'test',
        reverted: false,
        device_id: this.device.device_id,
        premise_id: 1,
        business_customer_id: 1,
        invoiceItems: [],
        invoice_status: this.status
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

</style>
