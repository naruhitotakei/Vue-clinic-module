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
                                    <template v-slot:cell(title)="data">
                                      <span v-if="!data.item.editable">{{ data.item.item.title }}</span>
                                      <div v-else>
                                      <v-select :clearable="false" label="name" :reduce="opt => opt.name" class="style-chooser" v-model="data.item.item.title" :options="options"></v-select>
                                      </div>
                                    </template>
                                    <template v-slot:cell(quantity)="data">
                                      <span v-if="!data.item.editable">{{ data.item.quantity }}</span>
                                      <input type="number" min="1" v-model="data.item.quantity" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(price)="data">
                                      <span v-if="!data.item.editable">{{ data.item.price }}</span>
                                      <input type="number" v-model="data.item.price" v-else class="form-control">
                                    </template>
                                    <template v-slot:cell(discount)="data">
                                      <span v-if="!data.item.editable">{{ data.item.discount | percentage }}</span>
                                      <input type="number" min="0" max="100" v-model="data.item.discount" v-else class="form-control">
                                    </template>
                                    <!-- <template v-slot:cell(total)="data">
                                      <span v-if="!data.item.editable">{{ data.item.total }}</span>
                                      <input type="text" disabled v-model="data.item.total" v-else class="form-control">
                                    </template> -->
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
                            <template v-slot:headerAction>
                              <b-button variant="primary" style="white-space:nowrap" @click="completInvoice"><i class="ri-save-3-line mr-2"></i>Save Invoice</b-button>
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
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitSummary(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="cancelSummary(data.item)" v-if="data.item.editable"><i class="ri-close-circle-fill m-0"></i></b-button>
                                    </template>
                                  </b-table>
                                </b-col>
                              </b-row>
                            </template>
                          </iq-card>
                        </b-col>
                        <!--<b-col offset="6" cols="6" class="text-right">
                            <b-button variant="link mr-3">
                                <i class="ri-printer-line"></i>
                                Download Print
                            </b-button>
                            <b-button variant="primary">
                                Submit
                            </b-button>
                        </b-col>-->
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
  },
  computed: {
    invoiceTotal: function () {
      let totalCount = 0
      if (this.rows.length === 0) {
        return 0
      } else {
        this.rows.forEach(element => {
          totalCount += this.calculatePrice(element)
        })
        return totalCount
      }
    },
    invoiceSubTotal: function () {
      let totalCount = 0
      if (this.rows.length === 0) {
        return 0
      } else {
        this.rows.forEach(element => {
          totalCount += this.calculatePriceBeforeDiscount(element)
        })
        return totalCount
      }
    }
  },
  data () {
    return {
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Item', key: 'title', class: 'text-left item-name' },
        { label: 'Quantity', key: 'quantity', class: 'text-left' },
        { label: 'Price', key: 'price', class: 'text-left' },
        { label: 'Discount', key: 'discount', class: 'text-left' },
        { label: 'Total', key: 'total', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center action-column' }
      ],
      rows: [],
      summaryRows: [],
      options: [
        { id: 1, name: 'Odstranitev zobnega kamna' },
        { id: 2, name: 'Beljenje zob' },
        { id: 3, name: 'Zobni implantat' },
        { id: 4, name: 'Odstranitev kamna' }
      ],
      paymentMethods: [
        { id: null, name: 'Select method' },
        { id: 1, name: 'Cash' },
        { id: 2, name: 'Credit card' }
      ],
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
        { label: '', key: 'action', class: 'text-center action-column' }
      ],
      invoiceSummary: [
        {
          dueDate: '',
          subTotal: '',
          paymentMethod: '',
          discount: '',
          total: ''
        }
      ],
      invoiceDate: moment().format('DD MMM, YYYY'),
      billingDetails: this.$route.params.billingDetails,
      issuedIn: 'Ljubljana',
      tempInvoice: null,
      logedInUser: {}
    }
  },
  methods: {
    completInvoice () {
      if (this.summaryRows.length === 0) {
        let obj = this.defaultSummary()
        this.summaryRows.push(obj)
      } else {
        this.summaryRows[0].editable = true
      }
    },
    submitSummary (item) {
      item.editable = false
      item.dueDate = moment(item.dueDate).add(item.dueDateNumber, 'days').format('DD MMM, YYYY')
    },
    cancelSummary (item) {
      item.editable = false
    },
    calculatePrice (item) {
      return item.quantity * (item.price - (item.price * item.discount / 100))
    },
    calculatePriceBeforeDiscount (item) {
      return item.quantity * item.price
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
    },
    cancel (item) {
      let index = this.rows.indexOf(item)
      this.tempInvoice ? this.rows.splice(index, 1, this.tempInvoice) : this.rows.shift()
    },
    remove (item) {
      let index = this.rows.indexOf(item)
      this.rows.splice(index, 1)
    },
    add () {
      let obj = this.default()
      this.rows.push(obj)
    },
    default () {
      return {
        id: this.rows.length + 1,
        item: {
          title: ''
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
        subTotal: this.invoiceSubTotal,
        discount: this.invoiceSubTotal - this.invoiceTotal,
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
.item-name {
  min-width: 240px !important;
}

.v-select {
  display: grid;
}

</style>
