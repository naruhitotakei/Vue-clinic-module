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
              <template v-slot:cell(product_price)="data">
                                        <span>
                                            {{ data.item.product_price | euro }}
                                        </span>
              </template>
              <template v-slot:cell(product_group_id)="data">
                                        <span>
                                            {{ data.item.group_name }}
                                        </span>
              </template>
              <template v-slot:cell(product_type_id)="data">
                                        <span>
                                            {{ data.item.type_name }}
                                        </span>
              </template>
              <template v-slot:cell(action)="data">
                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProduct(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeProduct(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
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
  <b-modal v-model="modalBusinessShow" no-close-on-backdrop size="lg" :title="$t('business.addBusinessModal.addBusiness')" :ok-disabled="isProductDisabled" @close="cancelProduct"  @cancel="cancelProduct" :ok-title="$t('business.addBusinessModal.save')" @ok="addProduct" :cancel-title="$t('business.addBusinessModal.close')">
    <form>
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.nameSlovenian') }} *</label>
          <div style="display: flex;">
            <input type="text" v-model="formData.slovenian" class="form-control" placeholder="Slovenian" required>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.nameItalian') }}</label>
          <div style="display: flex;">
            <input type="text" v-model="formData.italian" class="form-control" placeholder="Italian">
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.nameGerman') }}</label>
          <div style="display: flex;">
            <input type="text" v-model="formData.german" class="form-control" placeholder="German">
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <label for="title">{{ $t('business.addBusinessModal.nameEnglish') }}</label>
          <div style="display: flex;">
            <input type="text" v-model="formData.english" class="form-control" placeholder="English">
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="patient">{{ $t('business.addBusinessModal.email') }} *</label>
          <input type="number" v-model="formData.email" class="form-control" placeholder="Email" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="patient">{{ $t('business.addBusinessModal.address') }} *</label>
          <input type="number" v-model="formData.email" class="form-control" placeholder="Adress" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="patient">{{ $t('business.addBusinessModal.city') }} *</label>
          <input type="number" v-model="formData.email" class="form-control" placeholder="City" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="patient">{{ $t('business.addBusinessModal.taxNumber') }} *</label>
          <input type="number" v-model="formData.email" class="form-control" placeholder="Tax Number" required>
        </div>
      </div>
    </form>
  </b-modal>
</b-row>
</b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { getBusiness } from '@/services/business'
export default {
  components: {
  },
  name: 'BusinessCustomers',
  data: function () {
    return {
      business: [],
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
        { label: this.$t('business.businessColumn.businessTaxNumber'), key: 'tax_number', class: 'text-left' },
        { label: this.$t('business.businessColumn.businessAction'), key: 'action', class: 'text-center' }
      ],
      formData: {
        slovenian: '',
        italian: '',
        german: '',
        english: '',
        name: '',
        email: '',
        address: '',
        city: '',
        tax_number: ''
      }
    }
  },
  methods: {
    getBusiness () {
      getBusiness('en').then(response => {
        this.isBusinessDataLoaded = true
        this.business = response
        this.businessTotalRows = response.length
        console.log(response)
      })
    }
  },
  mounted () {
    xray.index()
    this.getBusiness()
  }
}
</script>
