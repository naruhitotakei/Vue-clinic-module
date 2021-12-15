<template>
<b-container ref="invoice" fluid>
  <div style="display: none">
      <div id="printInvoice" style="color:black;margin-left:40px;height:1500px">
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
            <p>{{ $t('invoices.newInvoice.invoiceNo') }}: {{referenceCodeFurs}}</p>
            <p>{{ $t('advPayments.newAdvPayment.copy') }}:<span style="margin-left:20px">Original</span></p>
            <p>{{ $t('advPayments.newAdvPayment.IssuedIn') }}:<span style="margin-left:20px">{{issuedIn.premise_city}}</span></p>
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
                <b-td colspan="2">{{ item.item.product_code }}</b-td>
                <b-td colspan="2">{{ item.item.product_name }}</b-td>
                <b-td colspan="1">{{item.quantity}}</b-td>
                <b-td colspan="1">{{item.item.product_price | euro}}</b-td>
                <b-td colspan="2">{{item.item.product_price | euro}}</b-td>
                <b-td colspan="2">{{item.total | euro}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8"></b-td>
                <b-td colspan="2"><strong>{{ $t('advPayments.newAdvPayment.total') }}: </strong></b-td>
                <b-td colspan="2">{{invoiceTotal | euro}}</b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="8" class="hidden-row"></b-td>
                <b-td colspan="2"><strong>{{ $t('advPayments.newAdvPayment.payment') }}: </strong></b-td>
                <b-td colspan="2">{{invoiceTotal | euro}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-row>
        <b-row>
          <b-col lg="3">
              <p>{{ $t('advPayments.newAdvPayment.paymentMethod') }}:</p>
            <p style="border-bottom: solid;">{{paymentMethods[0].type}}<span style="margin-left:20px">{{invoiceTotal | euro}}</span></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
              <p>{{ $t('advPayments.newAdvPayment.vatExemptionReason') }}</p>
              <p>{{ $t('invoice.pdfGuarantee') }}</p>
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
                            <h4 class="mb-0">{{ $t('invoices.newInvoice.newInvoiceHeader') }}</h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <div class="table-responsive-sm">
                              <b-table-simple>
                                <b-thead>
                                  <b-th colspan="2" class="text-left">{{ $t('invoices.newInvoice.newInvoiceColumn.issuedBy') }}</b-th>
                                  <b-th colspan="3 " class="text-left">{{ $t('invoices.newInvoice.newInvoiceColumn.customer') }}</b-th>
                                  <b-th colspan="4" class="text-left">{{ $t('invoices.newInvoice.newInvoiceColumn.issuedIn') }}</b-th>
                                  <b-th colspan="3" class="text-left">{{ $t('invoices.newInvoice.newInvoiceColumn.device') }}</b-th>
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
                                        <v-select v-else :clearable="false" :getOptionLabel="device => device.device_name" class="premises" v-model="device" :options="devices"></v-select>
                                      </div>
                                    </b-td>
                                  </b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col lg="4">
                              <label style="color:black"> {{ $t('invoices.newInvoice.dateOfInvoice') }}</label>
                              <p class="text-black mt-2 ml-2">{{ new Date() | formatInvoiceDate }}</p>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group :label="$t('invoices.newInvoice.dateOfService')" style="color:black">
                          <b-form-input v-model="dateOfService" type="date"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group :label="$t('invoices.newInvoice.newInvoiceSummary.dueDate')" style="color:black">
                          <b-form-input v-model="dueDate" type="date"></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col lg="12">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('invoices.newInvoice.newInvoiceDetails.header') }}</h5>
                            </template>
                            <template v-slot:headerAction>
                                <b-button variant="primary" style="white-space:nowrap" @click="add"><i class="ri-add-line mr-2"></i>{{ $t('invoices.newInvoice.newInvoiceDetails.addNewItem') }}</b-button>
                            </template>
                            <template v-slot:body>
                              <b-row>
                                <b-col md="12" class="table-responsive" style="min-height:250px">
                                  <b-table bordered hover :items="items" :fields="detailColumns">
                                   <template v-slot:cell(table_id)="data">
                                      <span>{{ items.indexOf(data.item) + 1 }}</span>
                                    </template>
                                    <template v-slot:cell(name)="data">
                                      <span v-if="!data.item.editable">{{ data.item.item.product_name }}</span>
                                      <div v-else>
                                        <v-select :clearable="false" :getOptionLabel="product => product.product_name" class="style-chooser" v-model="data.item.item" :options="products" @input="getPrice"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(teeth)="data">
                                      <span v-if="!data.item.editable">
                                        <v-select class="style-chooser" v-if="Array.isArray(data.item.teeth)" disabled multiple v-model="data.item.teeth" :options="teethOptions"></v-select>
                                      </span>
                                      <div v-else>
                                        <v-select class="style-chooser" multiple :close-on-select="false" v-model="data.item.teeth" :options="teethOptions"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(surfaces)="data">
                                      <span v-if="!data.item.editable">
                                        <v-select class="style-chooser" disabled multiple v-model="data.item.surfaces" :options="surfaceOptions"></v-select>
                                      </span>
                                      <div v-else>
                                        <v-select class="style-chooser" :close-on-select="false" multiple v-model="data.item.surfaces" :options="surfaceOptions"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(comment)="data">
                                      <span v-if="!data.item.editable">{{ data.item.comment }}</span>
                                      <input type="text" v-model="data.item.comment" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(quantity)="data">
                                      <span v-if="!data.item.editable">{{ data.item.quantity }}</span>
                                      <input type="number" min="1" v-model="data.item.quantity" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(product_price)="data">
                                      <span>{{ data.item.item.product_price }}</span>
                                    </template>
                                    <template v-slot:cell(discount)="data">
                                      <span v-if="!data.item.editable">{{ data.item.discount | percentage }}</span>
                                      <input type="number" min="0" max="100" :class="'form-control mb-0' +( data.item.discount < 100 ? '' : ' is-invalid')" v-model="data.item.discount" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                        <b-button :disabled="!data.item.item.product_name || data.item.discount > 100" variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submit(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="remove(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
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
                          <h2 class="text-center">{{ $t('advPayment.advPaymentInfo.advPaymentTotal')}}: {{invoiceTotal | euro}}</h2>
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="8">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('advPayments.newAdvPayment.paymentMethodSummary') }}</h5>
                            </template>
                            <template v-slot:headerAction>
                                <b-button variant="primary" style="white-space:nowrap" @click="addPaymentMethod"><i class="ri-add-line mr-2"></i>{{ $t('invoices.newInvoice.addPaymentMethod') }}</b-button>
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
                                    <template v-slot:cell(paid)="data">
                                      <input type="checkbox" style="height:28px;" :disabled="isInvoiceStatusIssued" v-model="data.item.paid" class="form-control">
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removePaymentMethod(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                        </b-col>
                        <b-col offset="6" cols="6" class="text-right">
                            <b-button :disabled="!showPdf" variant="primary mr-3" @click="exportToPDF">
                                <i class="ri-printer-line"></i>
                                {{ $t('invoices.newInvoice.downloadPrint') }}
                            </b-button>
                            <b-button variant="primary mr-4" @click="saveAsDraft">
                                <i class="ri-bookmark-3-fill mr-2"></i>{{ $t('invoices.newInvoice.saveAsDraft') }}
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

    <b-toast id="no-items" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-error-warning-fill"></i>At least one submitted item is mandatory</span>
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
import { getPremisesForCompany, getDevicesForPremise } from '../../services/companyPremises'
import { getEnquiryById } from '../../services/enquiry'
import { createInvoice, updateInvoice, getItemsOfInvoiceById, getPaymentItemsOfInvoiceById, getSerialForInvoiceNumberBasedOnType, getSerialForFursInvoiceNumberBasedOnType } from '../../services/invoice'
import { getProducts } from '../../services/products'
import html2pdf from 'html2pdf.js'
import _ from 'lodash'
import QrcodeVue from 'qrcode.vue'
import BigNumber from 'bignumber.js'

export default {
  name: 'NewInvoice',
  components: {
    QrcodeVue
  },
  props: {
    invoice: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    xray.index()
    this.getLoggedInUser()
    this.getPatient()
    this.getProducts()
  },
  data () {
    return {
      showPdf: false,
      detailColumns: [
        { label: '#', key: 'table_id', class: 'text-left' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.item'), key: 'name', class: 'text-left item-name' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.quantity'), key: 'quantity', class: 'text-left narrow-column' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.teeth'), key: 'teeth', class: 'text-left' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.surface'), key: 'surfaces', class: 'text-left' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.comment'), key: 'comment', class: 'text-left' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.price'), key: 'product_price', class: 'text-left narrow-column' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.discount'), key: 'discount', class: 'text-left narrow-column' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.amount'), key: 'total', class: 'text-left narrow-column' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.action'), key: 'action', class: 'text-center action-column' }
      ],
      items: [
        {
          table_id: 1,
          item: {
            name: ''
          },
          quantity: '1',
          teeth: '',
          surfaces: '',
          comment: '',
          discount: '0',
          total: '0',
          editable: true
        }
      ],
      paymentMethods: [
        {
          type: null,
          amount: 0,
          paid: false
        }
      ],
      paymentMethodOptions: [
        { id: 1, name: 'Cash', label: this.$t('paymentMethods.cash') },
        { id: 2, name: 'Credit card', label: this.$t('paymentMethods.creditCard') },
        { id: 3, name: 'Bank Account', label: this.$t('paymentMethods.bankAccount') }
      ],
      paymentMethodColumns: [
        {
          key: 'type',
          label: this.$t('paymentMethod')
        },
        {
          key: 'amount',
          label: this.$t('paymentMethodsColumn.amount'),
          class: 'action-column'
        },
        {
          key: 'paid',
          label: this.$t('paymentMethodsColumn.paid'),
          class: 'text-center action-column'
        },
        { label: this.$t('servicesAndProducts.productGroupColumn.productGroupAction'),
          key: 'action',
          class: 'text-center action-column'
        }

      ],
      teethOptions: ['11', '12', '13', '14', '15', '16', '17', '18', '21', '22', '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '51', '52', '53', '54', '55', '61', '62', '63', '64', '65', '71', '72', '73', '74', '75'],
      surfaceOptions: ['B', 'L', 'M', 'D', 'O'],
      products: [],
      selectedItemName: '',
      dateOfInvoice: moment().format('YYYY-MM-DDTHH:MM:SS'),
      dateOfService: moment().format('YYYY-MM-DD'),
      dueDate: moment().format('YYYY-MM-DD'),
      patientId: this.$route.params.patientId,
      issuedIn: '',
      isEditMode: false,
      logedInUser: {},
      patient: {},
      usersCompany: {},
      invoiceTotal: 0,
      paymentTotal: 0,
      subTotal: 0,
      discount: 0,
      // invoice: {},
      companyPremises: [],
      billingDetails: '',
      devices: [],
      device: {},
      deviceId: '',
      invoiceTime: '',
      status: '',
      invoiceDatePdf: moment().format('DD.MM.YYYY'),
      dateOfServicePdf: '',
      invoiceNumber: '',
      invoiceNumberFurs: '',
      invoiceId: '',
      paidAmount: 0,
      zoi: 'a7e5f55e1dbb48b799268e1a6d8618a3',
      decimalZoi: '',
      eor: 'a7e5f55e1dbb48b799268e1a6d8618a3',
      invoiceType: 'Invoice',
      referenceCode: '',
      referenceCodeFurs: '',
      qrCode: '',
      paymentStatus: '',
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
    addPaymentMethod () {
      this.paymentMethods.push(this.defaultPaymentMethod())
    },
    defaultPaymentMethod () {
      return {
        type: null,
        amount: 0,
        paid: false
      }
    },
    removePaymentMethod (item) {
      let index = this.paymentMethods.indexOf(item)
      this.paymentMethods.splice(index, 1)
    },
    exportToPDF () {
      this.calculateQRCode()
      this.calculatePdfNumber()
      this.setPdfName()
      this.dateOfServicePdf = moment(this.dateOfService).format('DD.MM.YYYY')
      this.invoiceTime = moment(this.invoice.invoice_time).format('DD.MM.YYYY HH:MM')
      let options = {
        filename: this.pdfName + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { y: 300 },
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
    getInvoiceTotal () {
      let totalCount = 0
      let totalSubCount = 0
      if (this.items.length === 0) {
        this.invoiceTotal = 0
        this.subTotal = 0
      } else {
        this.items.forEach(element => {
          totalCount += this.calculatePrice(element.item.product_price, element.quantity, element.discount)
          totalSubCount += this.calculatePriceBeforeDiscount(element)
        })
        this.invoiceTotal = totalCount.toFixed(2)
        this.subTotal = totalSubCount.toFixed(2)
        this.discount = (this.subTotal - this.invoiceTotal).toFixed(2)
      }
    },
    submitSummary (item) {
      item.editable = false
      item.dueDate = moment(item.dueDate).add(item.dueDateNumber, 'days').format('DD MMM, YYYY')
    },
    editSummary (item) {
      item.editable = true
    },
    getPrice (item) {
      this.selectedItemName = item.name
    },
    calculatePrice (productPrice, quantity, discount) {
      return productPrice ? quantity * (productPrice - (productPrice * discount / 100)) : 0
    },
    calculatePriceBeforeDiscount (item) {
      return item.item.product_price ? item.quantity * item.item.product_price : 0
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
    findDevicesForPremise (value) {
      getDevicesForPremise(value.premise_id).then(response => {
        this.devices = response
        this.device = this.devices[0]
      })
    },
    getPatient () {
      getEnquiryById(this.patientId).then(response => {
        this.patient = response[0]
        this.createBillingDetails(this.patient)
      })
    },
    createBillingDetails (selectedPatient) {
      let details = ''
      if (selectedPatient.name) details += selectedPatient.name
      if (selectedPatient.last_name) details += ' ' + selectedPatient.last_name
      details += '<br>'
      if (selectedPatient.address_line_1) details += selectedPatient.address_line_1 + '<br>'
      if (selectedPatient.post_code) details += selectedPatient.post_code
      if (selectedPatient.city) details += ' ' + selectedPatient.city + ', '
      if (selectedPatient.country) details += selectedPatient.country
      details += '<br>'
      if (selectedPatient.phone) details += 'Telefon: ' + selectedPatient.phone + '<br>'
      if (selectedPatient.email) details += 'Email: ' + selectedPatient.email
      this.billingDetails = details
    },
    getProducts () {
      getProducts('sl').then(response => {
        this.products = response
        if (Object.keys(this.invoice).length !== 0) {
          this.invoiceId = this.invoice.invoice_id
          this.fetchItemsAndPaymentMethods()
        }
      })
    },
    edit (item) {
      item.editable = true
      this.isEditMode = true
    },
    submit (item) {
      item.total = this.calculatePrice(item.item.product_price, item.quantity, item.discount).toFixed(2)
      item.editable = false
      this.getInvoiceTotal()
      if (!this.isEditMode) {
        this.items.push(this.default())
      }
      this.isEditMode = false
    },
    remove (item) {
      let index = this.items.indexOf(item)
      this.items.splice(index, 1)
      this.getInvoiceTotal()
    },
    add () {
      this.items.push(this.default())
    },
    default () {
      return {
        table_id: this.items.length + 1,
        item: {},
        quantity: '1',
        teeth: '',
        surfaces: '',
        comment: '',
        discount: '0',
        total: '0',
        editable: true
      }
    },
    calculatePaymentTotal () {
      this.paymentTotal = _.reduce(this.paymentMethods, function (sum, item) {
        return sum + parseFloat(item.amount)
      }, 0)
    },
    calculatePayedAmount () {
      let payed = _.filter(this.paymentMethods, function (method) { return method.paid })
      this.paidAmount = _.reduce(payed, function (sum, item) {
        return sum + parseFloat(item.amount)
      }, 0)
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
    generateReferenceCode () {
      let premiseNumber = this.issuedIn.premise_id < 10 ? '0' + this.issuedIn.premise_id : this.issuedIn.premise_id
      let year = moment().format('YY')
      let zeroFill = _.padStart(this.invoiceNumber, 5, '0')
      this.referenceCode = 'R-' + year + '-' + this.invoiceNumber
      this.referenceCodeFurs = premiseNumber + '-' + this.device.device_name + '-' + year + zeroFill
    },
    generateInvoiceNumber () {
      let data = {
        business_premise_id: this.issuedIn.business_premise_id,
        draft: 'invoice.draft'
      }
      getSerialForInvoiceNumberBasedOnType(data).then(response => {
        let number = parseInt(response[0].count) + 1
        this.invoiceNumber = number
        this.generateReferenceCode()
        getSerialForFursInvoiceNumberBasedOnType(data).then(furs => {
          let number = parseInt(furs[0].count) + 1
          this.invoiceNumberFurs = this.issuedIn.business_premise_id + '-' + this.device.electronic_device_id + '-' + number

          this.prepareInvoice()
          if (this.isInoiceValid()) this.createInvoice()
        })
      })
    },
    findProduct (productId) {
      return _.find(this.products, function (prod) { return prod.product_id === productId })
    },
    fetchItemsAndPaymentMethods () {
      getItemsOfInvoiceById(this.invoiceId).then(response => {
        let responseItems = []
        response.forEach((element, index) => {
          let item = {
            table_id: index + 1,
            id: element.id,
            item: this.findProduct(element.product_id),
            quantity: element.invoiced_quantity,
            discount: element.discount,
            total: this.calculatePrice(element.product_price, element.invoiced_quantity, element.discount).toFixed(2),
            editable: false,
            teeth: this.getTeeth(element.teeth),
            surfaces: this.getSurfaces(element.surfaces),
            comment: element.comment
          }
          responseItems.push(item)
        })
        this.items = responseItems
        this.getInvoiceTotal()
      })
      getPaymentItemsOfInvoiceById(this.invoiceId).then(items => {
        this.paymentMethods = items
      })
    },
    getTeeth (teeth) {
      if (teeth === '') {
        return []
      } else if (teeth.includes(',')) {
        return teeth.split(',')
      } else {
        return new Array(teeth)
      }
    },
    getSurfaces (surfaces) {
      if (surfaces === '') {
        return []
      } else if (surfaces.includes(',')) {
        return surfaces.split(',')
      } else {
        return new Array(surfaces)
      }
    },
    createInvoice () {
      if (!this.isItemValid()) this.items.pop()
      if (!this.invoiceId) {
        createInvoice(this.invoice).then(response => {
          this.invoiceId = response
          this.showPdf = true
          this.$bvToast.show('b-toaster-bottom-right')
          this.fetchItemsAndPaymentMethods()
          if (this.isInvoiceStatusIssued) this.redirectToDetailsPage()
        }).catch(errorMsg => {
          this.$bvToast.show('bottom-right-danger')
        })
      } else {
        updateInvoice(this.invoiceId, this.invoice).then(response => {
          this.fetchItemsAndPaymentMethods()
          this.$bvToast.show('b-toaster-bottom-right')
          if (response === 'invoice.issued') this.redirectToDetailsPage()
        })
      }
    },
    redirectToDetailsPage () {
      this.$router.push({ path: `/documents/invoices/${this.invoiceId}` })
    },
    isItemValid () {
      let item = _.last(this.items)
      return parseFloat(item.total) > 0
    },
    isInoiceValid () {
      this.calculatePaymentTotal()
      let valid = true
      if (this.invoiceTotal !== this.paymentTotal.toFixed(2)) {
        this.$bvToast.show('different-amount')
        valid = false
      }
      if (this.items.length < 1 && this.isItemValid()) {
        this.$bvToast.show('no-items')
        valid = false
      }
      if (!this.deviceId) {
        this.$bvToast.show('mandatory-device-id')
        valid = false
      }
      return valid
    },
    calculateQRCode () {
      let hexaNumber = new BigNumber(this.zoi, 16)
      let decimalNumber = hexaNumber.toString(10)
      this.decimalZoi = (decimalNumber.length < 39) ? '0'.repeat(39 - decimalNumber.length) + decimalNumber : decimalNumber
      let timeStamp = moment(this.dateOfInvoice).format('DDMMYYHHMMSS')
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
    calculatePaymentStatus () {
      if (this.paidAmount === 0) {
        this.paymentStatus = 'Unpaid'
      } else {
        this.paymentStatus = this.paidAmount === parseFloat(this.invoiceTotal) ? 'Paid' : 'Partialy Paid'
      }
    },
    prepareInvoice () {
      this.calculatePayedAmount()
      this.calculatePaymentStatus()
      let temp = {
        invoice_type: this.invoiceType,
        invoice_time: moment(this.dateOfInvoice).format('YYYY MM DD HH:MM:SS'),
        invoice_number: this.invoiceNumber,
        invoice_number_furs: this.invoiceNumberFurs,
        issued_in: this.issuedIn.premise_name,
        lines_sum: this.subTotal,
        discount_sum: this.discount,
        charges_sum: this.invoiceTotal,
        total_without_vat: 0,
        total_vat_amount: 0,
        total_with_vat: 0,
        paid_amount: this.paidAmount,
        amount_due_for_payment: 0,
        payment_methods: this.paymentMethods,
        warranty: true,
        vat_exemption_reason: 'test',
        operator_name: this.logedInUser.first_name + ' ' + this.logedInUser.surname,
        operator_tax_number: this.logedInUser.tax_number,
        zoi: this.zoi,
        eor: this.eor,
        invoice_special_notes: 'test',
        reverted: false,
        device_id: 1,
        premise_id: this.issuedIn.premise_id,
        business_customer_id: this.issuedIn.business_customer_id,
        invoiceItems: this.items,
        service_date: this.dateOfService,
        due_date: this.dueDate,
        verification_status: this.status,
        payment_status: this.paymentStatus,
        reference_code: this.referenceCode,
        reference_code_furs: this.referenceCodeFurs
      }
      this.invoice = _.assignIn(this.invoice, this.patient, this.usersCompany, temp)
    }
  }
}
</script>

<style lang="scss">
.action-column {
  width: 120px !important;
}

.item-name {
  min-width: 240px !important;
}

.v-select {
  display: grid;
}

.headerTitle {
  width: 60% !important;
}

.qr-margin {
    margin: 3rem 12rem 0 0;
}

.vs__deselect:disabled {
  display: none !important;
}
</style>
