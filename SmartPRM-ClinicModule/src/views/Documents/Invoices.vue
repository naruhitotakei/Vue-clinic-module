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
                                <b-table :items="invoice.invoice">
                                    <template v-slot:cell(invoiceStatus)="data">
                                        <span class="badge badge-danger">Unpaid</span>
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
                            <h5 style="margin-bottom: 15px;">{{ invoice.detail }}</h5>
                            <div class="table-responsive-sm">
                                <b-table-simple striped class="text-center">
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in invoice.invoiceSummaryFields" :key="index" :class="item.key === 'item' ? 'text-left' : ''">{{ item.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, bodyKey) in invoice.invoiceSummary" :key="bodyKey">
                                            <template v-for="(item,index) in invoice.invoiceSummaryFields">
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
                            <h5 style="margin-bottom: 15px;">{{ invoice.summary }}</h5>
                            <div class="table-responsive-sm">
                                <b-table-simple striped>
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in invoice.InvoiceDetailField" :key="index" :class="item.key === 'bank' ? 'text-left' : ''">{{ item.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, bodyKey) in invoice.InvoiceDetails" :key="bodyKey">
                                            <template v-for="(item,index) in invoice.InvoiceDetailField">
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
  name: 'Invoices',
  mounted () {
    xray.index()
  },
  data () {
    return {
      title: 'Invoice',
      invoice: {
        summary: 'Invoice Summary',
        detail: 'Invoice Detail',
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
        invoice: [
          {
            invoiceDate: '20 Mar, 2021',
            invoiceStatus: 2,
            invoiceID: '250028',
            invoiceTotal: '1.000 EUR',
            billingDetails: 'Natalija Kogoj <br> Prva cesta 1 <br> 1000 Ljubljana, Slovenija <br> Telefon: +38651365682 <br> Email: natalija.kogoj@staging-emazing.si'
          }
        ],
        invoiceSummaryFields: [
          {
            key: 'id',
            label: '#'
          },
          {
            key: 'item',
            label: 'Item'
          },
          {
            key: 'quantity',
            label: 'Quantity'
          },
          {
            key: 'price',
            label: 'Price'
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
        InvoiceDetailField: [
          {
            key: 'bank',
            label: 'Bank'
          },
          {
            key: 'accNo',
            label: 'Acc.No'
          },
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
            key: 'total',
            label: 'Total'
          }
        ],
        InvoiceDetails: [
          {
            bank: 'Banka Intesa Sanpaolo d.d.',
            accNo: 'SI56 1010 0005 6606 867',
            dueDate: '20 April 2021',
            subTotal: '1600 EUR',
            paymentMethod: 'Gotovina',
            total: '1500 EUR'
          }
        ]
      }
    }
  }
}
</script>
