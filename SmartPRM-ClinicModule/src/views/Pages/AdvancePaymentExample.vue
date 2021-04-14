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
                                <b-table :items="advancePayment.advancePayment" :fields="advancePayment.advPaymentColumns">
                                    <template v-slot:cell(paymentStatus)="data">
                                        <span class="badge badge-danger">Unpaid</span>
                                    </template>
                                    <template v-slot:cell(paymentTotal)="data">
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
                            <h5 style="margin-bottom: 15px;">{{ advancePayment.detail }}</h5>
                            <div class="table-responsive-sm">
                                <b-table-simple striped class="text-center">
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in advancePayment.advancePaymentSummaryFields" :key="index" :class="item.key === 'item' ? 'text-left' : ''">{{ item.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, bodyKey) in advancePayment.advancePaymentSummary" :key="bodyKey">
                                            <template v-for="(item,index) in advancePayment.advancePaymentSummaryFields">
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
                            <h5 style="margin-bottom: 15px;">{{ advancePayment.summary }}</h5>
                            <div class="table-responsive-sm">
                                <b-table-simple striped>
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in advancePayment.advancePaymentDetailField" :key="index" :class="item.key === 'bank' ? 'text-left' : ''">{{ item.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, bodyKey) in advancePayment.advancePaymentDetails" :key="bodyKey">
                                            <template v-for="(item,index) in advancePayment.advancePaymentDetailField">
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
  name: 'advancePayments',
  mounted () {
    xray.index()
  },
  computed: {
    title () {
      return this.text + this.paymentID
    }
  },
  data () {
    return {
      text: this.$t('advPayment.advPaymentHeader') + ' N° : ',
      paymentID: '250028',
      advancePayment: {
        summary: this.$t('advPayment.advPaymentSummary'),
        detail: this.$t('advPayment.advPaymentDetail'),
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
        advancePayment: [
          {
            date: '20 Mar, 2021',
            paymentTotal: '1.500 EUR',
            paymentStatus: 2,
            billingDetails: 'Natalija Kogoj <br> Prva cesta 1 <br> 1000 Ljubljana, Slovenija <br> Telefon: +38651365682 <br> Email: natalija.kogoj@staging-emazing.si',
            issuedIn: 'Ljubljana',
            issuedBy: 'Dr. Bojan Jernejc'
          }
        ],
        advancePaymentSummaryFields: [
          {
            key: 'id',
            label: '#'
          },
          {
            key: 'item',
            label: this.$t('advPayment.advPaymentDetailColumn.item')
          },
          {
            key: 'quantity',
            label: this.$t('advPayment.advPaymentDetailColumn.quantity')
          },
          {
            key: 'price',
            label: this.$t('advPayment.advPaymentDetailColumn.price')
          },
          {
            key: 'discount',
            label: this.$t('advPayment.advPaymentDetailColumn.discount')
          },
          {
            key: 'total',
            label: this.$t('advPayment.advPaymentDetailColumn.total')
          }
        ],
        advancePaymentSummary: [
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
        advancePaymentDetailField: [
          {
            key: 'paymentDate',
            label: this.$t('advPayment.advPaymentSummaryColumn.paymentDate')
          },
          {
            key: 'paymentMethod',
            label: this.$t('advPayment.advPaymentSummaryColumn.paymentMethod')
          },
          {
            key: 'subTotal',
            label: this.$t('advPayment.advPaymentSummaryColumn.subTotal')
          },
          {
            key: 'discount',
            label: this.$t('advPayment.advPaymentSummaryColumn.discount')
          },
          {
            key: 'total',
            label: this.$t('advPayment.advPaymentSummaryColumn.total')
          }
        ],
        advancePaymentDetails: [
          {
            paymentDate: '20 April 2021',
            subTotal: '1.600 EUR',
            paymentMethod: 'Gotovina',
            discount: '100 EUR',
            total: '1.500 EUR'
          }
        ],
        advPaymentColumns: [
          { label: this.$t('advPayment.advPaymentInfo.advPaymentDate'), key: 'date', class: 'text-left' },
          { label: this.$t('advPayment.advPaymentInfo.advPaymentTotal'), key: 'paymentTotal', class: 'text-left' },
          { label: this.$t('advPayment.advPaymentInfo.advPaymentStatus'), key: 'paymentStatus', class: 'text-left' },
          { label: this.$t('advPayment.advPaymentInfo.advPaymentDetails'), key: 'billingDetails', class: 'text-left' },
          { label: this.$t('advPayment.advPaymentInfo.advPaymentIssuedIn'), key: 'issuedIn', class: 'text-left' },
          { label: this.$t('advPayment.advPaymentInfo.advPaymentIssuedBy'), key: 'issuedBy', class: 'text-left' }
        ]
      }
    }
  }
}
</script>
