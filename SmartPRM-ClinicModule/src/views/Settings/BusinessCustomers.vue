<template>
<b-container fluid>
<b-row>
  <b-col md="12">
    <iq-card>
      <template v-slot:headerTitle>
        <h3 class="card-title" style="margin-top: 10px;">{{ $t('business.headerBusiness') }}</h3>
        <div class="btn-add-patient mb-4 mt-0">
          <b-button variant="primary" @click="modalBusinessShow = true"><i class="ri-add-line mr-2"></i>{{ $t('business.addBusiness') }}</b-button>
        </div>
      </template>
      <template v-slot:body>
        <b-row>
          <b-col md="12" class="table-responsive">
            <b-table id="my-table"
                     bordered
                     hover
                     :busy="!isBusinessDataLoaded"
                     :fields="businessColumns"
                     :items="business"
                     :per-page="businessPerPage"
                     :current-page="currentBusinessPage">
              <template #table-busy>
                <div class="text-center text-primary my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong class="loading">Loading...</strong>
                </div>
              </template>
              <template v-slot:cell(zip_code)="data">
                <span>
                    {{ data.item.post_code }}
                </span>
              </template>
              <template v-slot:cell(countries_name)="data">
                <span>
                    {{ data.item.countries_name }}
                </span>
              </template>
              <template v-slot:cell(action)="data">
                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editBusiness(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeBusiness(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <template>
          <div class="mt-4 ml-2">
            <p v-if="businessTotalRows===0"> You have no overdue assignments.</p>
            <b-pagination
                v-else-if="businessTotalRows > 20"
                v-model="currentBusinessPage"
                :total-rows="business.length"
                :per-page="businessPerPage"
                aria-controls="overdueAssignments"></b-pagination>
          </div>

        </template>
      </template>
    </iq-card>
  </b-col>
  <b-modal v-model="modalBusinessShow" no-close-on-backdrop size="lg" :ok-disabled="isOkDisabled" :title="$t('business.addBusinessModal.addBusiness')" @close="cancelBusiness"  @cancel="cancelBusiness"  :ok-title="$t('business.addBusinessModal.save')" @ok="addBusiness" :cancel-title="$t('business.addBusinessModal.close')">
    <form>
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.name') }} *</label>
          <div style="display: flex;">
            <input type="text" v-model="formData.name" class="form-control" placeholder="Name">
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.email') }} </label>
          <input type="email" v-model="formData.email" class="form-control" placeholder="Email" >
        </div>
        <div class="col-md-6 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.address') }} *</label>
          <input type="text" v-model="formData.address" class="form-control" placeholder="Address" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.city') }} *</label>
          <input type="text" v-model="formData.city" class="form-control" placeholder="City" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.zipCode') }} *</label>
          <input type="text" v-model="formData.zip_code" class="form-control" placeholder="ZIP code" required>
        </div>
        <div class="col-md-6 mb-3" v-if="countries">
          <label for="title">{{ $t('business.addBusinessModal.countries') }} *</label>
          <v-select
              taggable
              :clearable="false"
              label="name"
              v-model="formData.country_code"
              :options="countries">
            <template v-slot:option="option">
              {{ option.name }}
            </template>
          </v-select>
        </div>
      </div>
    </form>
  </b-modal>
</b-row>
</b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { createBusiness, deleteBusiness, getBusiness, getBusinessByID, updateBusiness } from '@/services/business'
import { getCountries } from '@/services/countries'
export default {
  components: {
  },
  name: 'BusinessCustomers',
  data: function () {
    return {
      options: [
        {
          title: 'tete'
        }
      ],
      business: [],
      countries: [],
      selectCountries: {},
      isBusinessDataLoaded: false,
      currentBusinessPage: 1,
      businessPerPage: 20,
      businessTotalRows: 0,
      modalBusinessShow: false,
      businessColumns: [
        { label: this.$t('business.businessColumn.businessName'), key: 'name', class: 'text-left' },
        { label: this.$t('business.businessColumn.businessEmail'), key: 'email', class: 'text-left' },
        { label: this.$t('business.businessColumn.businessAddress'), key: 'address_line_1', class: 'text-left' },
        { label: this.$t('business.businessColumn.businessCity'), key: 'city', class: 'text-left' },
        { label: this.$t('business.businessColumn.businessZIPCode'), key: 'zip_code', class: 'text-left' },
        { label: this.$t('business.businessColumn.businessCountry'), key: 'countries_name', class: 'text-left' },
        { label: this.$t('business.businessColumn.businessAction'), key: 'action', class: 'text-center' }
      ],
      formData: {
        id: null,
        name: '',
        email: '',
        address: '',
        city: '',
        zip_code: '',
        country_code: ''
      }
    }
  },
  computed: {
    isOkDisabled () {
      return !this.formData.name || !this.formData.address || !this.formData.city || !this.formData.zip_code || !this.formData.country_code
    }
  },
  methods: {
    getCountries () {
      getCountries().then(response => {
        this.countries = response
      })
    },
    getBusiness () {
      getBusiness('en').then(response => {
        this.isBusinessDataLoaded = true
        this.business = response
        this.businessTotalRows = response.length
      })
    },
    editBusiness (item) {
      getBusinessByID(item.id)
      this.formData = {
        id: item.id,
        name: item.name,
        email: item.email,
        address: item.address_line_1,
        city: item.city,
        zip_code: item.post_code,
        country_code: {
          id: item.countries_id,
          code: item.code,
          name: item.countries_name
        }
      }
      this.modalBusinessShow = true
    },
    addBusiness () {
      if (this.formData.id) {
        updateBusiness(this.formData.id, this.formData).then(() => {
          this.getBusiness()
        })
      } else {
        createBusiness(this.formData).then(() => {
          this.getBusiness()
        })
      }
      this.formData = this.defaultFormData()
    },
    removeBusiness (item) {
      let index = this.business.indexOf(item)
      this.business.splice(index, 1)
      deleteBusiness(item.id)
    },
    defaultFormData () {
      return {
        name: '',
        email: '',
        address: '',
        city: '',
        tax_number: ''
      }
    },
    cancelBusiness () {
      this.formData = this.defaultFormData()
    }
  },
  mounted () {
    xray.index()
    this.getBusiness()
    this.getCountries()
  }
}
</script>
