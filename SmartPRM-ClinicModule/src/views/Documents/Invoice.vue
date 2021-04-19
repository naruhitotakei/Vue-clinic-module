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
                                <b-table :items="invoice" :fields="invoiceColumns">
                                    <template v-slot:cell(invoiceStatus)="data">
                                        <span class="badge badge-danger" v-if="data.value == 'Unpaid'">Unpaid</span>
                                        <span class="badge badge-warning" v-if="data.value == 'Partialy Paid'">Partialy Paid</span>
                                        <span class="badge badge-success" v-if="data.value == 'Paid'">Paid</span>
                                    </template>
                                    <template v-slot:cell(total_with_vat)="data">
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
                            <h5 style="margin-bottom: 15px;">{{ detail }}</h5>
                            <div class="table-responsive-sm">
                                <b-table-simple striped class="text-center">
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in InvoiceDetailField" :key="index" :class="item.key === 'item' ? 'text-left' : ''">{{ item.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, bodyKey) in InvoiceDetails" :key="bodyKey">
                                            <template v-for="(item,index) in InvoiceDetailField">
                                                <th v-if="item.key === 'id'" :key="item.key+index">{{ body[item.key] }}</th>
                                                <td v-else-if="item.key === 'item'" :key="item.key+index" class="text-left">
                                                    <h6 class="mb-0">{{ body[item.key].title }}</h6>
                                                </td>
                                                <td v-else :key="item.key+index" :class="item.key === 'total' ? 'font-weight-bold' : ''">
                                                    {{ body[item.key] }}
                                                </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </b-table-simple>
                            </div>
                            <h5 style="margin-bottom: 15px;">{{ summary }}</h5>
                            <div class="table-responsive-sm">
                                <b-table striped :items="invoice" :fields="invoiceSummaryFields">
                                    <template v-slot:cell(total_with_vat)="data">
                                        <span class="font-weight-bold" v-html="data.value"></span>
                                    </template>
                                </b-table>
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
import { getInvoiceById } from '../../services/invoice'
import moment from 'moment'

export default {
  name: 'Invoice',
  mounted () {
    xray.index()
    this.getInvoice(this.invoiceId)
  },
  computed: {
    title () {
      return this.text + this.invoiceNumber
    }
  },
  methods: {
    getInvoice (id) {
      getInvoiceById(id).then(response => {
        this.invoice = response
        this.invoiceNumber = this.invoice[0].invoice_number
      }
      )
    }
  },
  data () {
    return {
      invoiceId: this.$route.params.invoiceId,
      invoiceNumber: '',
      text: this.$t('invoice.invoiceHeader') + ' N° : ',
      summary: this.$t('invoice.invoiceSummary'),
      detail: this.$t('invoice.invoiceDetail'),
      InvoiceDetailField: [
        {
          key: 'id',
          label: '#'
        },
        {
          key: 'item',
          label: this.$t('invoice.invoiceDetailColumn.item')
        },
        {
          key: 'quantity',
          label: this.$t('invoice.invoiceDetailColumn.quantity')
        },
        {
          key: 'price',
          label: this.$t('invoice.invoiceDetailColumn.price')
        },
        {
          key: 'discount',
          label: this.$t('invoice.invoiceDetailColumn.discount')
        },
        {
          key: 'total',
          label: this.$t('invoice.invoiceDetailColumn.total')
        }
      ],
      InvoiceDetails: [
        {
          id: 1,
          item: {
            title: 'Odstranitev zobnega kamna'
          },
          quantity: '1',
          price: '100 EUR',
          discount: '20%',
          total: '80 EUR'
        },
        {
          id: 2,
          item: {
            title: 'Zobna krona'
          },
          quantity: '1',
          price: '350 EUR',
          discount: '/',
          total: '350 EUR'
        },
        {
          id: 3,
          item: {
            title: 'Beljenje zob'
          },
          quantity: '1',
          price: '350 EUR',
          discount: '/',
          total: '350 EUR'
        },
        {
          id: 4,
          item: {
            title: 'Zobni implantat'
          },
          quantity: '1',
          price: '800 EUR',
          discount: '10%',
          total: '720 EUR'
        }
      ],
      invoiceSummaryFields: [
        {
          label: this.$t('invoice.invoiceSummaryColumn.dueDate'),
          key: 'invoice_time',
          formatter: value => {
            return moment(value).format('YYYY-MM-DD')
          }
        },
        {
          key: 'payment_method',
          label: this.$t('invoice.invoiceSummaryColumn.paymentMethod')
        },
        {
          key: 'total_with_vat',
          label: this.$t('invoice.invoiceSummaryColumn.subTotal')
        },
        {
          key: 'discount',
          label: this.$t('invoice.invoiceSummaryColumn.discount')
        },
        {
          key: 'with_discount',
          label: this.$t('invoice.invoiceSummaryColumn.total')
        }
      ],
      invoiceColumns: [
        { label: this.$t('invoice.invoiceInfo.invoiceDate'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('YYYY-MM-DD')
          }
        },
        { label: this.$t('invoice.invoiceInfo.invoiceTotal'), key: 'total_with_vat', class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.invoiceStatus'),
          key: 'invoiceStatus',
          formatter: (value, key, item) => {
            if (item.paid_amount === '$0.00') {
              return 'Unpaid'
            }
            return item.total_with_vat === item.paid_amount ? 'Paid' : 'Partialy Paid'
          },
          class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.invoiceDetails'),
          key: 'billingDetails',
          formatter: (value, key, item) => {
            return item.enquiries_name + ' ' + item.enquiries_last_name + '<br>' +
            item.enquiries_address_line_1 + '<br>' +
            item.enquiries_post_code + ' ' + item.enquiries_city + ', ' + item.country + '<br>' +
            'Telefon: ' + item.phone + '<br>' +
            'Email: ' + item.email
          },
          class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.invoiceIssuedIn'), key: 'company_name', class: 'text-left' },
        { label: this.$t('invoice.invoiceInfo.invoiceIssuedBy'), key: 'operator_name', class: 'text-left' }
      ],
      invoice: null
    }
  }
}
</script>
