<template>
<b-container ref="invoice" fluid>
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
                                  <b-th colspan="5">{{ $t('advPayments.newAdvPaymentColumn.issuedIn') }}</b-th>
                                </b-thead>
                                <b-tbody>
                                  <b-tr>
                                    <b-td colspan="2">{{usersCompany.company_name}}</b-td>
                                    <b-td colspan="3" v-html="billingDetails"></b-td>
                                    <b-td colspan="5">
                                      <v-select :clearable="false" label="premise_name" :reduce="opt => opt.premise_name" class="premises" v-model="issuedIn" :options="companyPremises"></v-select>
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
                          <b-form-input v-model="dateOfInvoice" type="date"></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('advPayments.newAdvPayment.details.header') }}</h5>
                            </template>
                            <template v-slot:body>
                              <b-row>
                                <b-col md="12" class="table-responsive">
                                  <b-table bordered hover :items="advPayments" :fields="detailColumns">
                                    <template v-slot:cell(name)="data">
                                      <span>{{ data.item.name }}</span>
                                    </template>
                                    <template v-slot:cell(amount)="data">
                                      <span v-if="!data.item.editable">{{ data.item.amount }}</span>
                                      <input type="number"  v-model="data.item.amount" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitPayment(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-primary mr-1 mb-1" size="sm" @click="editPayment(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="5" offset-lg="7">
                          <h2 class="text-center">{{ $t('advPayment.advPaymentInfo.advPaymentTotal')}}: {{advPayments[0].amount | euro}}</h2>
                      </b-col>
                      <b-col lg="5" offset-lg="7">
                          <b-alert :show="!canBeSaved" variant="danger">
                            <div class="iq-alert-icon">
                              <i class="ri-alert-line"></i>
                            </div>
                            <div class="iq-alert-text">{{ $t('advPayments.newAdvPayment.alert') }}</div>
                          </b-alert>
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
                                  <b-table striped :items="paymentMethods" :fields="paymentMethodColumns">
                                    <template v-slot:cell(paymentMethod)="data">
                                      <span v-if="!data.item.editable">{{ data.item.paymentMethod }}</span>
                                      <div v-else>
                                        <v-select :clearable="false" label="name" :reduce="opt => opt.name" class="style-chooser" v-model="data.item.paymentMethod" :options="paymentMethodOptions"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(amount)="data">
                                      <span v-if="!data.item.editable">{{ data.item.amount }}</span>
                                      <input type="number"  v-model="data.item.amount" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" :disabled="!data.item.paymentMethod" @click="submitPaymentMethod(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-primary mr-1 mb-1" size="sm" @click="editPaymentMethod(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
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
                                {{ $t('advPayments.newAdvPayment.downloadPrint') }}
                            </b-button>
                            <b-button :disabled="!canBeSaved" variant="primary mr-4" @click="saveAsDraft">
                                <i class="ri-bookmark-3-fill mr-2"></i>{{ $t('advPayments.newAdvPayment.saveDraft') }}
                            </b-button>
                            <b-button :disabled="!canBeSaved" variant="warning mr-3" @click="saveInvoice">
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
</b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import moment from 'moment'
import { sso } from '../../services/userService'
import { getCompanyById } from '../../services/companies'
import { getEnquiryById } from '../../services/enquiry'
import { createInvoice } from '../../services/invoice'
import { getPremisesForCompany } from '../../services/companyPremises'
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
      return this.advPayments[0].amount === this.paymentMethods[0].amount && this.advPayments[0].amount !== 0
    }
  },
  data () {
    return {
      detailColumns: [
        { label: this.$t('advPayments.newAdvPayment.details.item'), key: 'name', class: 'text-left item-name' },
        { label: this.$t('advPayments.newAdvPayment.details.amount'), key: 'amount', class: 'text-left' },
        { label: this.$t('advPayments.newAdvPayment.details.action'), key: 'action', class: 'text-center action-column' }
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
        },
        {
          label: this.$t('paymentMethodsColumn.action'),
          key: 'action',
          class: 'text-center action-column',
          thAttr: { 'data-html2canvas-ignore': true },
          tdAttr: { 'data-html2canvas-ignore': true }
        }
      ],
      invoiceDate: moment().format('DD MMM, YYYY'),
      patientId: this.$route.params.patientId,
      billingDetails: '',
      issuedIn: '',
      isEditMode: false,
      logedInUser: {},
      patient: {},
      usersCompany: {},
      invoice: {},
      canPrintPdf: false,
      companyPremises: [],
      dateOfInvoice: moment().format('YYYY-MM-DD')
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
          this.issuedIn = this.companyPremises[0].premise_name
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
        issued_in: this.issuedIn,
        lines_sum: this.advPayments[0].amount,
        discount_sum: 0,
        charges_sum: this.advPayments[0].amount,
        total_without_vat: 0,
        total_vat_amount: 0,
        total_with_vat: 0,
        paid_amount: 0,
        amount_due_for_payment: 0,
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
