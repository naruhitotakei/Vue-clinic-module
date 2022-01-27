<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <!--Online Booking Services Table-->
        <iq-card>
          <template v-slot:headerTitle>
            <h3 class="card-title" style="margin-top: 10px">
              <!-- {{ $t('onlineBooking.header') }} -->
              <span v-if="premise != null">
                {{ premise.name }}
              </span>
            </h3>
            <div class="btn-add-patient mb-4 mt-0">
              <b-button variant="primary" @click="modalServiceShow = true"
                ><i class="ri-add-line mr-2"></i
                >{{ $t('onlineBooking.addBtn') }}</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table
                  id="online-booking-table"
                  class="table-t"
                  bordered
                  hover
                  :busy="!isProductDataLoaded"
                  :items="onlineBookingProducts"
                  :fields="onlineBookingColumns"
                  :per-page="productsPerPage"
                  :current-page="currentProductPage"
                >
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
                  <template v-slot:cell(doctors)="data">
                    <div v-for="{ id, name } of data.item.doctors" :key="id">
                      {{ name }}
                    </div>
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button
                      variant=" iq-bg-success mr-1 mb-1"
                      size="sm"
                      @click="openEditModal(data.item)"
                      ><i class="ri-ball-pen-fill m-0"></i
                    ></b-button>
                    <b-button
                      variant=" iq-bg-danger mr-1 mb-1"
                      size="sm"
                      @click="removeService(data.item)"
                      ><i class="ri-delete-bin-line m-0"></i
                    ></b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <template>
              <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
              <div class="mt-3">
                <b-pagination
                  v-if="hideProductsPagination"
                  v-model="currentProductPage"
                  :total-rows="onlineBookingProducts.length"
                  :per-page="productsPerPage"
                  aria-controls="online-booking-table"
                >
                </b-pagination>
              </div>
            </template>
          </template>
        </iq-card>
        <!--END OF Online Booking Services Table-->
        <!--Online Booking Services modal-->
        <b-modal
          v-model="modalServiceShow"
          no-close-on-backdrop
          :title="$t('onlineBooking.serviceModal.title')"
          :ok-disabled="isServiceDisabled"
          @ok="addService"
          @close="cancelService"
          @cancel="cancelService"
          :ok-title="$t('onlineBooking.serviceModal.save')"
          :cancel-title="$t('onlineBooking.serviceModal.close')"
        >
          <form>
            <div class="form-row">
              <div class="col-md-12 mb-3">
                <label for="slovenian"
                  >{{ $t('onlineBooking.serviceModal.slovenian') }} *</label
                >
                <div style="display: flex">
                  <input
                    type="text"
                    v-model="onlineBookingData.slovenian"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="italian">{{
                  $t('onlineBooking.serviceModal.italian')
                }}</label>
                <div style="display: flex">
                  <input
                    type="text"
                    v-model="onlineBookingData.italian"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="english">{{
                  $t('onlineBooking.serviceModal.english')
                }}</label>
                <div style="display: flex">
                  <input
                    type="text"
                    v-model="onlineBookingData.english"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="price"
                  >{{ $t('onlineBooking.serviceModal.price') }} (EUR) *</label
                >
                <div style="display: flex">
                  <input
                    type="number"
                    v-model="onlineBookingData.default_online_price"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="duration"
                  >{{ $t('onlineBooking.serviceModal.duration') }} *</label
                >
                <div style="display: flex">
                  <input
                    type="number"
                    v-model="onlineBookingData.default_duration"
                    class="form-control"
                    step="5"
                    required
                  />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="doctor"
                  >{{ $t('onlineBooking.serviceModal.doctor') }} *</label
                >
                <v-select
                  v-model="onlineBookingData.doctor_ids"
                  multiple
                  label="doctor"
                  :options="doctors"
                  :reduce="(doctor) => doctor.id"
                  :getOptionLabel="(doctor) => doctor.name"
                  :clearable="false"
                  :closeOnSelect="false"
                  class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                  style="min-width: 305px"
                ></v-select>
              </div>
              <div class="col-md-12 mb-3">
                <label for="productGroup"
                  >{{ $t('onlineBooking.serviceModal.productGroup') }} *</label
                >
                <v-select
                  :clearable="false"
                  label="productGroup"
                  :reduce="(product_group) => product_group.id"
                  :getOptionLabel="(product_group) => product_group.text"
                  class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                  v-model="onlineBookingData.product_group_id"
                  :options="productGroups"
                  style="min-width: 305px"
                ></v-select>
              </div>
              <div class="col-md-12 mb-3">
                <label for="premise"
                  >{{ $t('onlineBooking.serviceModal.premise') }} *</label
                >
                <v-select
                  :clearable="false"
                  label="premise"
                  :reduce="(premise) => premise.id"
                  :getOptionLabel="(premise) => premise.name"
                  class="style-chooser form-control-disabled font-size-16 ml-0 mt-1"
                  v-model="onlineBookingData.premise_id"
                  :options="premises"
                  style="min-width: 305px"
                ></v-select>
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
import {
  getOnlineBookingProducts,
  getOnlineBookingProductGroups,
  getOnlineBookingProductsNaming,
  getPremises,
  createOnlineBookingService,
  deleteOnlineBookingService,
  updateOnlineBookingService,
} from '../../services/onlineBookingService'
import { getDoctorList } from '../../services/calendarService'
import { defineComponent } from '@vue/composition-api'
import { getPremiseById } from '@/services/companyPremises'

export default defineComponent({
  name: 'OnlineBooking',
  components: {},
  async mounted() {
    xray.index()
    this.getOnlineBookingProducts(this.$i18n.locale)
    this.getDoctors()
    this.getOnlineBookingProductGroups(this.$i18n.locale)
    this.getPremises()
    this.premise = await getPremiseById(this.$route.params.id)
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
        default_online_price: '',
        default_duration: '',
        doctor_ids: [],
        product_group_id: '',
        premise_id: '',
      },
      doctors: [],
      productGroups: [],
      premise: null,
      premises: [],
      onlineBookingColumns: [
        {
          label: this.$t('onlineBooking.onlineBookingColumns.serviceName'),
          key: 'booking_service_text',
          class: 'text-left',
        },
        {
          label: this.$t('onlineBooking.onlineBookingColumns.price'),
          key: 'default_online_price',
          class: 'text-left',
        },
        {
          label: this.$t('onlineBooking.onlineBookingColumns.duration'),
          key: 'default_duration',
          class: 'text-left',
        },
        {
          label: this.$t('onlineBooking.onlineBookingColumns.doctor'),
          key: 'doctors',
          class: 'text-left',
        },
        {
          label: this.$t('onlineBooking.onlineBookingColumns.productGroup'),
          key: 'product_group_text',
          class: 'text-left',
        },
        // {
        //   label: this.$t('onlineBooking.onlineBookingColumns.premise'),
        //   key: 'premise_name',
        //   class: 'text-left',
        // },
        {
          label: this.$t('onlineBooking.onlineBookingColumns.action'),
          key: 'action',
          class: 'text-center',
        },
      ],
      modalServiceShow: false,
    }
  },
  computed: {
    hideProductsPagination() {
      return (
        Math.floor(this.onlineBookingProducts.length / this.productsPerPage) !==
        0
      )
    },
    isServiceDisabled() {
      return (
        !this.onlineBookingData.slovenian ||
        !this.onlineBookingData.default_online_price ||
        !this.onlineBookingData.default_duration ||
        !this.onlineBookingData.doctor_ids ||
        !this.onlineBookingData.product_group_id ||
        !this.onlineBookingData.premise_id
      )
    },
  },
  methods: {
    getOnlineBookingProducts(locale) {
      getOnlineBookingProducts(locale, this.$route.params.id).then(
        (response) => {
          this.onlineBookingProducts = response
          this.isProductDataLoaded = true
        },
      )
    },
    getDoctors() {
      getDoctorList().then((response) => {
        this.doctors = response
      })
    },
    getOnlineBookingProductGroups(lang) {
      getOnlineBookingProductGroups(lang).then((response) => {
        this.productGroups = response
      })
    },
    getPremises() {
      getPremises().then((response) => {
        this.premises = response
      })
    },
    defaultOnlineBookingData() {
      return {
        id: '',
        slovenian: '',
        italian: '',
        english: '',
        default_online_price: '',
        default_duration: '',
        doctor_ids: [],
        product_group_id: '',
        premise_id: '',
      }
    },
    cancelService() {
      this.onlineBookingData = this.defaultOnlineBookingData()
    },
    addService() {
      if (this.onlineBookingData.id) {
        updateOnlineBookingService(
          this.onlineBookingData.id,
          this.onlineBookingData,
        ).then(() => {
          this.getOnlineBookingProducts(this.$i18n.locale)
        })
      } else {
        createOnlineBookingService(this.onlineBookingData).then(() => {
          this.getOnlineBookingProducts(this.$i18n.locale)
        })
      }
      this.onlineBookingData = this.defaultOnlineBookingData()
    },
    removeService(item) {
      let index = this.onlineBookingProducts.indexOf(item)
      this.onlineBookingProducts.splice(index, 1)
      deleteOnlineBookingService(item.id)
    },
    populateNaming(namingArray, object) {
      namingArray.forEach((naming) => {
        if (naming.language === 'sl') {
          object.slovenian = naming.text
        } else if (naming.language === 'en') {
          object.english = naming.text
        } else if (naming.language === 'it') {
          object.italian = naming.text
        }
      })
      return object
    },
    openEditModal(item) {
      getOnlineBookingProductsNaming(item.id).then((response) => {
        this.onlineBookingData = this.populateNaming(
          response,
          Object.assign(
            {},
            { ...item, doctor_ids: item.doctors.map(({ id }) => id) },
          ),
        )
      })
      this.modalServiceShow = true
    },
  },
})
</script>

<style></style>
