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
                                  <b-th>{{ $t('invoices.newInvoice.newInvoiceColumn.invoiceDate') }}</b-th>
                                  <b-th>{{ $t('invoices.newInvoice.newInvoiceColumn.invoiceTotal') }}</b-th>
                                  <b-th>{{ $t('invoices.newInvoice.newInvoiceColumn.billingDetails') }}</b-th>
                                  <b-th>{{ $t('invoices.newInvoice.newInvoiceColumn.issuedIn') }}</b-th>
                                  <b-th>{{ $t('invoices.newInvoice.newInvoiceColumn.issuedBy') }}</b-th>
                                </b-thead>
                                <b-tbody>
                                  <b-tr>
                                    <b-td>{{ invoiceDate }}</b-td>
                                    <b-td><strong>{{invoiceTotal | euro}}</strong></b-td>
                                    <b-td v-html="billingDetails"></b-td>
                                    <b-td>{{issuedIn}}</b-td>
                                    <b-td>{{logedInUser.name}}</b-td>
                                  </b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('invoices.newInvoice.newInvoiceDetails.header') }}</h5>
                            </template>
                            <template v-slot:headerAction>
                                <b-button variant="primary" data-html2canvas-ignore="true" style="white-space:nowrap" @click="add"><i class="ri-add-line mr-2"></i>{{ $t('invoices.newInvoice.newInvoiceDetails.addNewItem') }}</b-button>
                            </template>
                            <template v-slot:body>
                              <b-row>
                                <b-col md="12" class="table-responsive" style="min-height:250px">
                                  <b-table bordered hover :items="items" :fields="detailColumns">
                                    <template v-slot:cell(id)="data">
                                      <span>{{ items.indexOf(data.item) + 1 }}</span>
                                    </template>
                                    <template v-slot:cell(name)="data">
                                      <span v-if="!data.item.editable">{{ data.item.item.product_name }}</span>
                                      <div v-else>
                                      <v-select :clearable="false" label="product_name" class="style-chooser" v-model="data.item.item" :options="products" @input="getPrice"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(quantity)="data">
                                      <span v-if="!data.item.editable">{{ data.item.quantity }}</span>
                                      <input type="number" min="1" v-model="data.item.quantity" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(price)="data">
                                      <span>{{ data.item.item.product_price }}</span>
                                    </template>
                                    <template v-slot:cell(discount)="data">
                                      <span v-if="!data.item.editable">{{ data.item.discount | percentage }}</span>
                                      <input type="number" min="0" max="100" v-model="data.item.discount" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-if="!data.item.editable" @click="remove(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                        <b-button :disabled="!data.item.item.product_name" variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submit(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                          <iq-card>
                            <template v-slot:headerTitle>
                                <h5 style="margin-bottom: 15px;">{{ $t('invoices.newInvoice.newInvoiceSummary.header') }}</h5>
                            </template>
                            <template v-slot:body>
                               <b-row>
                                <b-col md="12" class="table-responsive" style="min-height:200px">
                                  <b-table striped :items="summaryRows" :fields="summaryColumns">
                                    <template v-slot:cell(dueDate)="data">
                                      <span v-if="!data.item.editable">{{ data.item.dueDate }}</span>
                                      <input type="date"  v-model="data.item.dueDate" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(paymentMethod)="data">
                                      <span v-if="!data.item.editable">{{ data.item.paymentMethod }}</span>
                                      <div v-else>
                                        <v-select :clearable="false" label="name" :reduce="opt => opt.name" class="style-chooser" v-model="data.item.paymentMethod" :options="paymentMethods"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(total)="data">
                                      <span>{{ data.item.total | euro }}</span>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" :disabled="!data.item.paymentMethod" @click="submitSummary(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-primary mr-1 mb-1" size="sm" @click="editSummary(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                        </b-col>
                        <b-col offset="6" cols="6" class="text-right" data-html2canvas-ignore="true">
                            <b-button v-if="showPdf" variant="link mr-3" @click="exportToPDF">
                                <i class="ri-printer-line"></i>
                                {{ $t('invoices.newInvoice.downloadPrint') }}
                            </b-button>
                            <b-button variant="primary mr-4" @click="saveAsDraft">
                                <i class="ri-bookmark-3-fill mr-2"></i>{{ $t('invoices.newInvoice.saveAsDraft') }}
                            </b-button>
                            <b-button variant="primary mr-3" @click="saveInvoice">
                                <i class="ri-save-3-line mr-2"></i>{{ $t('invoices.newInvoice.saveInvoice') }}
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
import { getProducts } from '../../services/products'
import html2pdf from 'html2pdf.js'
import _ from 'lodash'

export default {
  name: 'NewAdvPayment',
  mounted () {
    xray.index()
    this.getLoggedInUser()
    this.getPatient()
    this.getProducts()
    this.summaryRows.push(this.defaultSummary())
  },
  data () {
    return {
      detailColumns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.item'), key: 'name', class: 'text-left item-name' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.quantity'), key: 'quantity', class: 'text-left narrow-column' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.price'), key: 'price', class: 'text-left' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.discount'), key: 'discount', class: 'text-left narrow-column' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.total'), key: 'total', class: 'text-left' },
        { label: this.$t('invoices.newInvoice.newInvoiceDetails.action'), key: 'action', class: 'text-center action-column', thAttr: { 'data-html2canvas-ignore': true }, tdAttr: { 'data-html2canvas-ignore': true } }
      ],
      items: [
        {
          id: 1,
          item: {},
          quantity: '1',
          price: '0',
          discount: '',
          total: '0 ',
          editable: true
        }
      ],
      summaryRows: [],
      products: [],
      paymentMethods: [
        { id: 1, name: 'Cash' },
        { id: 2, name: 'Credit card' }
      ],
      selectedItemName: '',
      summary: 'Invoice Summary',
      summaryColumns: [
        {
          key: 'dueDate',
          label: this.$t('invoices.newInvoice.newInvoiceSummary.dueDate')
        },
        {
          key: 'paymentMethod',
          label: this.$t('invoices.newInvoice.newInvoiceSummary.paymentMethod')
        },
        {
          key: 'total',
          label: this.$t('invoices.newInvoice.newInvoiceSummary.total')
        },
        {
          label: this.$t('invoices.newInvoice.newInvoiceSummary.action'),
          key: 'action',
          class: 'text-center action-column',
          thAttr: { 'data-html2canvas-ignore': true },
          tdAttr: { 'data-html2canvas-ignore': true }
        }
      ],
      invoiceDate: moment().format('DD MMM, YYYY'),
      billingDetails: this.$route.params.billingDetails,
      enquireId: this.$route.params.enquireId,
      issuedIn: 'Ljubljana',
      isEditMode: false,
      logedInUser: {},
      patient: {},
      usersCompany: {},
      invoiceTotal: 0,
      invoice: {},
      showPdf: false
    }
  },
  methods: {
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
    getInvoiceTotal () {
      let totalCount = 0
      let totalSubCount = 0
      if (this.items.length === 0) {
        this.invoiceTotal = 0
        this.summaryRows[0].invoiceSubTotal = 0
      } else {
        this.items.forEach(element => {
          totalCount += this.calculatePrice(element)
          totalSubCount += this.calculatePriceBeforeDiscount(element)
        })
        this.invoiceTotal = totalCount.toFixed(2)
        this.summaryRows[0].total = this.invoiceTotal
        this.summaryRows[0].subTotal = totalSubCount.toFixed(2)
        this.summaryRows[0].discount = (this.summaryRows[0].subTotal - this.summaryRows[0].total).toFixed(2)
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
    calculatePrice (item) {
      return item.item.product_price ? item.quantity * (item.item.product_price - (item.item.product_price * item.discount / 100)) : 0
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
      })
    },
    getPatient () {
      getEnquiryById(this.enquireId).then(response => {
        this.patient = response[0]
      })
    },
    getProducts () {
      getProducts('sl').then(response => {
        this.products = response
      })
    },
    edit (item) {
      item.editable = true
      this.isEditMode = true
    },
    submit (item) {
      item.total = this.calculatePrice(item)
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
        id: this.items.length + 1,
        item: {},
        quantity: '1',
        price: '0',
        discount: '',
        total: '0 ',
        editable: true
      }
    },
    defaultSummary () {
      return {
        dueDate: moment().format('YYYY-MM-DD'),
        paymentMethod: null,
        total: this.invoiceTotal,
        editable: true
      }
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
      this.items.pop()
      createInvoice(this.invoice).then(response => {
        this.showPdf = true
        this.$bvToast.show('b-toaster-bottom-right')
      }).catch(errorMsg => {
        console.log('Error: ' + errorMsg)
        this.$bvToast.show('bottom-right-danger')
      })
    },
    prepareInvoice (status) {
      let temp = {
        invoice_type: 'Advance payment',
        invoice_time: moment(this.invoiceDate).format('YYYY MM DD HH:MM:SS'),
        invoice_number: '02-blagajna1-21aleksa',
        invoice_numbering_structure: '{c}',
        issued_in: this.issuedIn,
        lines_sum: this.summaryRows[0].subTotal,
        discount_sum: this.summaryRows[0].subTotal - this.invoiceTotal,
        charges_sum: this.invoiceTotal,
        total_without_vat: 0,
        total_vat_amount: 0,
        total_with_vat: 0,
        paid_amount: 0,
        amount_due_for_payment: 0,
        payment_method: this.summaryRows[0].paymentMethod,
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
        invoiceItems: this.items,
        invoice_status: status
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

.narrow-column {
  width: 100px !important;
}
.item-name {
  min-width: 240px !important;
}

.v-select {
  display: grid;
}

</style>
