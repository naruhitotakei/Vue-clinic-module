<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('onlineBooking.header') }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalProductShow = true"><i class="ri-add-line mr-2"></i>{{ $t('onlineBooking.addBtn') }}</b-button>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="online-booking-table"
                                         class="table-t"
                                         bordered
                                         hover
                                         :busy="!isProductDataLoaded"
                                         :items="onlineBookingProducts"
                                         :fields="onlineBookingColumns"
                                         :per-page="productsPerPage"
                                         :current-page="currentProductPage">
                                    <template #table-busy>
                                        <div class="text-center text-primary my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="loading">Loading...</strong>
                                        </div>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProduct(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeProduct(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductPage"
                                              :total-rows="onlineBookingProducts.length"
                                              :per-page="productsPerPage"
                                              aria-controls="online-booking-table">
                                </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { getOnlineBookingProducts } from '../../services/onlineBookingService'

export default {
  name: 'OnlineBooking',
  components: {
  },
  mounted () {
    xray.index()
    this.getOnlineBookingProducts(this.$i18n.locale)
  },
  data: function () {
    return {
      onlineBookingProducts: [],
      isProductDataLoaded: false,
      productsPerPage: 20,
      currentProductPage: 1,
      onlineBookingColumns: [
        { label: this.$t('onlineBooking.onlineBookingColumns.serviceName'), key: 'booking_service_text', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.price'), key: 'default_online_price', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.duration'), key: 'default_duration', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.doctor'), key: 'doctor_name', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.productGroup'), key: 'online_booking_service', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.premise'), key: 'premise_name', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.action'), key: 'action', class: 'text-center' }
      ]
    }
  },
  methods: {
    getOnlineBookingProducts (locale) {
      getOnlineBookingProducts(locale).then(response => {
        this.onlineBookingProducts = response
        this.isProductDataLoaded = true
        console.log('Response: ', response)
      })
    }
  }
}
</script>

<style>
</style>
