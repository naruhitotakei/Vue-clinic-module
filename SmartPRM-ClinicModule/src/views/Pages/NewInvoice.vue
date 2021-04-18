<template>
<b-container fluid>
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
                                <b-table :items="invoice">
                                    <template v-slot:cell(invoiceStatus)="data">
                                        <span class="badge badge-danger">Unpaid</span>
                                    </template>
                                    <template v-slot:cell(invoiceTotal)="data">
                                        <span class="font-weight-bold" v-html="data.value"></span>
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
                          <iq-card>
                                <template v-slot:headerTitle>
                                  <h5 style="margin-bottom: 15px;">{{ detail }}</h5>
                                </template>
                                <template v-slot:headerAction>
                                  <b-button variant="primary" style="white-space:nowrap" @click="add"><i class="ri-add-line mr-2"></i>Add New Item</b-button>
                                </template>
                                <template v-slot:body>
                                  <b-row>
                                    <b-col md="12" class="table-responsive">
                                      <b-table bordered hover :items="rows" :fields="columns">
                                        <template v-slot:cell(id)="data">
                                          <span v-if="!data.item.editable">{{ data.item.id }}</span>
                                          <input type="text" v-model="data.item.id" v-else class="form-control">
                                        </template>
                                        <template v-slot:cell(title)="data">
                                          <span v-if="!data.item.editable">{{ data.item.item.title }}</span>
                                          <!-- <input type="text" v-model="data.item.item.title" v-else class="form-control"> -->
                                         <div v-else>
                                          <b-form-input list="input-list" v-model="data.item.item.title" id="input-with-list"></b-form-input>
                                          <b-form-datalist id="input-list" :options="options"></b-form-datalist>
                                         </div>
                                        </template>
                                        <template v-slot:cell(quantity)="data">
                                          <span v-if="!data.item.editable">{{ data.item.quantity }}</span>
                                          <input type="number" v-model="data.item.quantity" v-else class="form-control">
                                        </template>
                                        <template v-slot:cell(price)="data">
                                          <span v-if="!data.item.editable">{{ data.item.price }}</span>
                                          <input type="text" v-model="data.item.price" v-else class="form-control">
                                        </template>
                                        <template v-slot:cell(discount)="data">
                                          <span v-if="!data.item.editable">{{ data.item.discount }}</span>
                                          <input type="text" v-model="data.item.discount" v-else class="form-control">
                                        </template>
                                        <template v-slot:cell(total)="data">
                                          <span v-if="!data.item.editable">{{ data.item.total }}</span>
                                          <input type="text" v-model="data.item.total" v-else class="form-control">
                                        </template>
                                        <template v-slot:cell(action)="data">
                                            <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                            <b-button variant=" iq-bg-danger" size="sm" v-if="!data.item.editable" @click="remove(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                            <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submit(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                            <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="cancel(data.item)" v-if="data.item.editable"><i class="ri-close-circle-fill m-0"></i></b-button>
                                        </template>
                                      </b-table>
                                    </b-col>
                                  </b-row>
                                </template>
                              </iq-card>
                            <h5 style="margin-bottom: 15px;">{{ summary }}</h5>
                            <div class="table-responsive-sm">
                                <b-table-simple striped>
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in invoiceSummaryFields" :key="index" :class="item.key === 'bank' ? 'text-left' : ''">{{ item.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, bodyKey) in invoiceSummary" :key="bodyKey">
                                            <template v-for="(item,index) in invoiceSummaryFields">
                                                <th v-if="item.key === 'bank'" :key="item.key+index">{{ body[item.key] }}</th>
                                                <td v-else :key="item.key+index" :class="item.key === 'total' ? 'font-weight-bold' : ''">
                                                    {{ body[item.key] }}
                                                </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </b-table-simple>
                            </div>
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

export default {
  name: 'NewInvoice',
  mounted () {
    xray.index()
  },
  computed: {
    title () {
      return this.text + this.invoiceID
    }
  },
  data () {
    return {
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Item', key: 'title', class: 'text-left' },
        { label: 'Quantity', key: 'quantity', class: 'text-left' },
        { label: 'Price', key: 'price', class: 'text-left' },
        { label: 'Discount', key: 'discount', class: 'text-left' },
        { label: 'Total', key: 'total', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center action-column' }
      ],
      rows: [
        {
          id: 1,
          item: {
            title: 'Odstranitev zobnega kamna'
          },
          quantity: '1',
          price: '100 EUR',
          discount: '20%',
          total: '80 EUR',
          editable: false
        },
        {
          id: 2,
          item: {
            title: 'Zobna krona'
          },
          quantity: '1',
          price: '350 EUR',
          discount: '/',
          total: '350 EUR',
          editable: false
        },
        {
          id: 3,
          item: {
            title: 'Beljenje zob'
          },
          quantity: '1',
          price: '350 EUR',
          discount: '/',
          total: '350 EUR',
          editable: false
        },
        {
          id: 4,
          item: {
            title: 'Zobni implantat'
          },
          quantity: '1',
          price: '800 EUR',
          discount: '10%',
          total: '720 EUR',
          editable: false
        }
      ],
      options: [
        'Odstranitev zobnega kamna', 'Zobna krona', 'Beljenje zob', 'Zobni implantat'
      ],
      text: 'Invoice N° : ',
      invoiceID: '250028',
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
        }
      ],
      invoiceSummary: [
        {
          dueDate: '20 April 2021',
          subTotal: '1.600 EUR',
          paymentMethod: 'Gotovina',
          discount: '100 EUR',
          total: '1.500 EUR'
        }
      ],
      invoice: [
        {
          invoiceDate: '20 Mar, 2021',
          invoiceTotal: '1.500 EUR',
          billingDetails: 'Natalija Kogoj <br> Prva cesta 1 <br> 1000 Ljubljana, Slovenija <br> Telefon: +38651365682 <br> Email: natalija.kogoj@staging-emazing.si',
          issuedIn: 'Ljubljana',
          issuedBy: 'Dr. Bojan Jernejc'
        }
      ],
      tempInvoice: null
    }
  },
  methods: {
    edit (item) {
      this.tempInvoice = Object.assign({}, item)
      item.editable = true
    },
    submit (item) {
      item.editable = false
    },
    cancel (item) {
      let index = this.rows.indexOf(item)
      this.rows.splice(index, 1, this.tempInvoice)
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
        quantity: '0',
        price: '0 EUR',
        discount: '',
        total: '0 EUR',
        editable: true
      }
    }
  }
}
</script>

<style scoped>
/deep/ .action-column {
  width: 120px !important;
}
</style>
