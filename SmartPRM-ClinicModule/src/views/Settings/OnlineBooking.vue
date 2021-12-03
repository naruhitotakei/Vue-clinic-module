<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <!--Online Booking Services Table-->
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('onlineBooking.header') }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalServiceShow = true"><i class="ri-add-line mr-2"></i>{{ $t('onlineBooking.addBtn') }}</b-button>
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
                                    <template v-slot:cell(default_online_price)="data">
                                        <span>
                                            {{ data.item.default_online_price | euro }}
                                        </span>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="openEditModal(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeService(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-if="hideProductsPagination"
                                              v-model="currentProductPage"
                                              :total-rows="onlineBookingProducts.length"
                                              :per-page="productsPerPage"
                                              aria-controls="online-booking-table">
                                </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
                <!--END OF Online Booking Services Table-->
                <!--Online Booking Services modal-->
                <b-modal v-model="modalServiceShow" no-close-on-backdrop :title="$t('onlineBooking.serviceModal.title')" :ok-disabled="isServiceDisabled" @ok="addService"
                         @close="cancelService" @cancel="cancelService" :ok-title="$t('onlineBooking.serviceModal.save')" :cancel-title="$t('onlineBooking.serviceModal.close')">
                    <form>
                        <div class="form-row">
                            <div class="col-md-12 mb-3">
                                <label for="slovenian">{{ $t('onlineBooking.serviceModal.slovenian') }} *</label>
                                <div style="display: flex;">
                                    <input type="text" v-model="onlineBookingData.slovenian" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="italian">{{ $t('onlineBooking.serviceModal.italian') }}</label>
                                <div style="display: flex;">
                                    <input type="text" v-model="onlineBookingData.italian" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="english">{{ $t('onlineBooking.serviceModal.english') }}</label>
                                <div style="display: flex;">
                                    <input type="text" v-model="onlineBookingData.english" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="price">{{ $t('onlineBooking.serviceModal.price') }} (EUR) *</label>
                                <div style="display: flex;">
                                    <input type="number" v-model="onlineBookingData.price" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="duration">{{ $t('onlineBooking.serviceModal.duration') }} *</label>
                                <div style="display: flex;">
                                    <input type="number" v-model="onlineBookingData.duration" class="form-control" step="5" required>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="doctor">{{ $t('onlineBooking.serviceModal.doctor') }} *</label>
                                <v-select :clearable="false"
                                          label="doctor"
                                          :reduce="doctor => doctor.id"
                                          :getOptionLabel="doctor => doctor.name"
                                          class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                                          v-model="onlineBookingData.doctor"
                                          :options="doctors"
                                          style="min-width:305px;"></v-select>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="productGroup">{{ $t('onlineBooking.serviceModal.productGroup') }} *</label>
                                <v-select :clearable="false"
                                          label="productGroup"
                                          :reduce="product_group => product_group.id"
                                          :getOptionLabel="product_group => product_group.text"
                                          class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                                          v-model="onlineBookingData.productGroup"
                                          :options="productGroups"
                                          style="min-width:305px;"></v-select>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="premise">{{ $t('onlineBooking.serviceModal.premise') }} *</label>
                                <v-select :clearable="false"
                                          label="premise"
                                          :reduce="premise => premise.id"
                                          :getOptionLabel="premise => premise.name"
                                          class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                                          v-model="onlineBookingData.premise"
                                          :options="premises"
                                          style="min-width:305px;"></v-select>
                            </div>
                        </div>
                    </form>
                </b-modal>
                <!--END OF Online Booking Services modal-->
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { getOnlineBookingProducts, getOnlineBookingProductGroups, getPremises, createOnlineBookingService, deleteOnlineBookingService, updateOnlineBookingService } from '../../services/onlineBookingService'
import { getDoctorList } from '../../services/calendarService'

export default {
  name: 'OnlineBooking',
  components: {
  },
  mounted () {
    xray.index()
    this.getOnlineBookingProducts(this.$i18n.locale)
    this.getDoctors()
    this.getOnlineBookingProductGroups(this.$i18n.locale)
    this.getPremises()
  },
  data: function () {
    return {
      onlineBookingProducts: [],
      isProductDataLoaded: false,
      productsPerPage: 20,
      currentProductPage: 1,
      onlineBookingData: {
        id: '',
        slovenian: '',
        italian: '',
        english: '',
        price: '',
        duration: '',
        doctor: '',
        productGroup: '',
        premise: ''
      },
      doctors: [],
      productGroups: [],
      premises: [],
      onlineBookingColumns: [
        { label: this.$t('onlineBooking.onlineBookingColumns.serviceName'), key: 'booking_service_text', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.price'), key: 'default_online_price', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.duration'), key: 'default_duration', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.doctor'), key: 'doctor_name', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.productGroup'), key: 'product_group_text', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.premise'), key: 'premise_name', class: 'text-left' },
        { label: this.$t('onlineBooking.onlineBookingColumns.action'), key: 'action', class: 'text-center' }
      ],
      modalServiceShow: false
    }
  },
  computed: {
    hideProductsPagination () {
      return Math.floor(this.onlineBookingProducts.length / this.productsPerPage) !== 0
    },
    isServiceDisabled () {
      return !this.onlineBookingData.slovenian || !this.onlineBookingData.price || !this.onlineBookingData.duration || !this.onlineBookingData.doctor || !this.onlineBookingData.productGroup || !this.onlineBookingData.premise
    }
  },
  methods: {
    getOnlineBookingProducts (locale) {
      getOnlineBookingProducts(locale).then(response => {
        this.onlineBookingProducts = response
        this.isProductDataLoaded = true
      })
    },
    getDoctors () {
      getDoctorList().then(response => {
        this.doctors = response
      })
    },
    getOnlineBookingProductGroups (lang) {
      getOnlineBookingProductGroups(lang).then(response => {
        this.productGroups = response
      })
    },
    getPremises () {
      getPremises().then(response => {
        this.premises = response
      })
    },
    defaultOnlineBookingData () {
      return {
        slovenian: '',
        italian: '',
        english: '',
        price: '',
        duration: '',
        doctor: '',
        productGroup: '',
        premise: ''
      }
    },
    cancelService () {
      this.onlineBookingData = this.defaultOnlineBookingData()
    },
    addService () {
      if (this.onlineBookingData.id) {
        updateOnlineBookingService(this.onlineBookingData.id, this.onlineBookingData).then(() => {
          this.getOnlineBookingProducts()
        })
      } else {
        createOnlineBookingService(this.onlineBookingData).then(() => {
          this.getOnlineBookingProducts()
        })
      }
      this.onlineBookingData = this.defaultOnlineBookingData()
    },
    removeService (item) {
      let index = this.onlineBookingProducts.indexOf(item)
      this.onlineBookingProducts.splice(index, 1)
      deleteOnlineBookingService(item.id)
    },
    openEditModal (item) {
      this.onlineBookingData = {
        id: item.id,
        slovenian: item.slovenian,
        italian: item.italian,
        english: item.english,
        price: item.default_online_price,
        duration: item.default_duration,
        doctor: item.doctor_name,
        productGroup: item.product_group_text,
        premise: item.premise_name
      }
      this.modalServiceShow = true
      console.log('Info about service: ' + JSON.stringify(item))
    }
  }
}
</script>

<style>
</style>
