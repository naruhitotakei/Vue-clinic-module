<template>
<b-container fluid>
    <b-row>
        <b-col lg="12">
            <iq-card>
                <template v-slot:body>
                    <b-row>
                        <b-col cols="4" align-self="center" style="margin-bottom: 25px;">
                            <h4 class="mb-0">{{ text }}</h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <div class="table-responsive-sm">
                              <b-table-simple>
                                <b-thead>
                                  <b-th>Invoice Date</b-th>
                                  <b-th>Invoice Total</b-th>
                                  <b-th>Billing Details</b-th>
                                  <b-th>Issued In</b-th>
                                  <b-th>Issued By</b-th>
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
                              <h5 style="margin-bottom: 15px;">{{ detail }}</h5>
                            </template>
                            <template v-slot:headerAction>
                              <b-button variant="primary" style="white-space:nowrap" @click="add"><i class="ri-add-line mr-2"></i>Add New Item</b-button>
                            </template>
                            <template v-slot:body>
                              <b-row>
                                <b-col md="12" class="table-responsive" style="min-height:250px">
                                  <b-table bordered hover :items="rows" :fields="columns">
                                    <template v-slot:cell(id)="data">
                                      <span>{{ rows.indexOf(data.item) + 1 }}</span>
                                    </template>
                                    <template v-slot:cell(name)="data">
                                      <span v-if="!data.item.editable">{{ data.item.item.name }}</span>
                                      <div v-else>
                                      <v-select :clearable="false" label="name" class="style-chooser" v-model="data.item.item" :options="options" @input="getPrice"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(quantity)="data">
                                      <span v-if="!data.item.editable">{{ data.item.quantity }}</span>
                                      <input type="number" min="1" v-model="data.item.quantity" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(price)="data">
                                      <span>{{ data.item.item.price }}</span>
                                    </template>
                                    <template v-slot:cell(discount)="data">
                                      <span v-if="!data.item.editable">{{ data.item.discount | percentage }}</span>
                                      <input type="number" min="0" max="100" v-model="data.item.discount" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-if="!data.item.editable" @click="remove(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submit(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="cancel(data.item)" v-if="data.item.editable"><i class="ri-close-circle-fill m-0"></i></b-button>
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                          <iq-card>
                            <template v-slot:headerTitle>
                              <h5 style="margin-bottom: 15px;">{{ summary }}</h5>
                            </template>
                            <template v-slot:body>
                               <b-row>
                                <b-col md="12" class="table-responsive" style="min-height:200px">
                                  <b-table striped :items="summaryRows" :fields="invoiceSummaryFields">
                                    <template v-slot:cell(dueDate)="data">
                                      <span v-if="!data.item.editable">{{ data.item.dueDate }}</span>
                                      <input type="number" min="0" v-model="data.item.dueDateNumber" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(paymentMethod)="data">
                                      <span v-if="!data.item.editable">{{ data.item.paymentMethod }}</span>
                                      <div v-else>
                                        <v-select :clearable="false" label="name" :reduce="opt => opt.name" class="style-chooser" v-model="data.item.paymentMethod" :options="paymentMethods"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(subTotal)="data">
                                      <span>{{ data.item.subTotal | euro }}</span>
                                    </template>
                                    <template v-slot:cell(discount)="data">
                                      <span >{{ data.item.discount | euro }}</span>
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
                        <b-col offset="6" cols="6" class="text-right">
                            <b-button variant="link mr-3">
                                <i class="ri-printer-line"></i>
                                Download Print
                            </b-button>
                            <b-button variant="primary mr-4">
                                <i class="ri-bookmark-3-fill mr-2"></i>Save Invoice as Draft
                            </b-button>
                            <b-button variant="primary mr-3">
                                <i class="ri-save-3-line mr-2"></i>Save Invoice
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
import moment from 'moment'
import { sso } from '../../services/userService'

export default {
  name: 'NewInvoice',
  mounted () {
    xray.index()
    this.getLoggedInUser()
    this.summaryRows.push(this.defaultSummary())
  },
  data () {
    return {
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Item', key: 'name', class: 'text-left item-name' },
        { label: 'Quantity', key: 'quantity', class: 'text-left narrow-column' },
        { label: 'Price', key: 'price', class: 'text-left' },
        { label: 'Discount', key: 'discount', class: 'text-left narrow-column' },
        { label: 'Total', key: 'total', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center action-column' }
      ],
      rows: [
        {
          id: 1,
          item: {
            name: ''
          },
          quantity: '1',
          price: '0',
          discount: '',
          total: '0 ',
          editable: true
        }
      ],
      summaryRows: [],
      options: [
        { id: 1, name: 'Odstranitev zobnega kamna', price: 300 },
        { id: 2, name: 'Beljenje zob', price: 50 },
        { id: 3, name: 'Zobni implantat', price: 100 },
        { id: 4, name: 'Odstranitev kamna', price: 200 }
      ],
      paymentMethods: [
        { id: null, name: 'Select method' },
        { id: 1, name: 'Cash' },
        { id: 2, name: 'Credit card' }
      ],
      selectedItemName: '',
      text: 'New Invoice',
      summary: 'Invoice Summary',
      detail: 'Invoice Detail',
      invoiceSummaryFields: [
        {
          key: 'dueDate',
          label: 'Due Date'
        },
        {
          key: 'paymentMethod',
          label: 'Payment Method'
        },
        {
          key: 'subTotal',
          label: 'Sub-total'
        },
        {
          key: 'discount',
          label: 'Discount'
        },
        {
          key: 'total',
          label: 'Total'
        },
        {
          label: 'Action',
          key: 'action',
          class: 'text-center action-column'
        }
      ],
      invoiceDate: moment().format('DD MMM, YYYY'),
      billingDetails: this.$route.params.billingDetails,
      issuedIn: 'Ljubljana',
      tempInvoice: null,
      logedInUser: {},
      invoiceTotal: 0
    }
  },
  methods: {
    getInvoiceTotal () {
      let totalCount = 0
      let totalSubCount = 0
      if (this.rows.length === 0) {
        this.invoiceTotal = 0
        this.summaryRows[0].invoiceSubTotal = 0
      } else {
        this.rows.forEach(element => {
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
      return item.item.price ? item.quantity * (item.item.price - (item.item.price * item.discount / 100)) : 0
    },
    calculatePriceBeforeDiscount (item) {
      return item.item.price ? item.quantity * item.item.price : 0
    },
    getLoggedInUser () {
      sso().then(response => {
        this.logedInUser = response
      })
    },
    edit (item) {
      this.tempInvoice = Object.assign({}, item)
      item.editable = true
    },
    submit (item) {
      item.total = this.calculatePrice(item)
      item.editable = false
      this.getInvoiceTotal()
      this.rows.push(this.default())
    },
    cancel (item) {
      let index = this.rows.indexOf(item)
      this.tempInvoice ? this.rows.splice(index, 1, this.tempInvoice) : this.rows.shift()
    },
    remove (item) {
      let index = this.rows.indexOf(item)
      this.rows.splice(index, 1)
      this.getInvoiceTotal()
    },
    add () {
      this.rows.push(this.default())
    },
    default () {
      return {
        id: this.rows.length + 1,
        item: {
          name: ''
        },
        quantity: '1',
        price: '0',
        discount: '',
        total: '0 ',
        editable: true
      }
    },
    defaultSummary () {
      return {
        dueDate: this.invoiceDate,
        dueDateNumber: 0,
        paymentMethod: null,
        subTotal: 0,
        discount: 0,
        total: this.invoiceTotal,
        editable: true
      }
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
