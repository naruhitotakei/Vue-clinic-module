<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('servicesAndProducts.headerProducts') }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalProductShow = true"><i class="ri-add-line mr-2"></i>{{ $t('servicesAndProducts.addProduct') }}</b-button>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                         bordered
                                         hover
                                         :busy="!isProductDataLoaded"
                                         :items="products"
                                         :fields="productColumns"
                                         :per-page="productsPerPage"
                                         :current-page="currentProductPage">
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
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductPage"
                                  :total-rows="products.length"
                                  :per-page="productsPerPage"
                                  aria-controls="my-table">
                                </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
              <b-modal v-model="modalProductShow" no-close-on-backdrop size="lg" :title="$t('servicesAndProducts.addProductModal.addProduct')" :ok-disabled="isProductDisabled" @close="cancelProduct"  @cancel="cancelProduct" :ok-title="$t('servicesAndProducts.addProductModal.save')" @ok="addProduct" :cancel-title="$t('servicesAndProducts.addProductModal.close')">
                <form>
                  <div class="form-row">
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.addProductModal.nameSlovenian') }} *</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.slovenian" class="form-control" placeholder="Slovenian" required>
                      </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.addProductModal.nameItalian') }}</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.italian" class="form-control" placeholder="Italian">
                      </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.addProductModal.nameGerman') }}</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.german" class="form-control" placeholder="German">
                      </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.addProductModal.nameEnglish') }}</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.english" class="form-control" placeholder="English">
                      </div>
                    </div>
                    <div class="col-md-2 mb-3">
                        <label for="patient">{{ $t('servicesAndProducts.addProductModal.price') }} *</label>
                      <input type="number" v-model="formData.product_price" class="form-control" placeholder="Price" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.addProductModal.group') }} *</label>
                      <v-select class="drop-down" label="product_group_name"
                        :clearable="false" v-model="formData.product_group_id"
                        :reduce="filter => filter.product_group_id"
                        :options="productGroups">
                        <template #search="{attributes, events}">
                          <input
                              class="vs__search"
                              :required="!formData.product_group_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                        </template>
                      </v-select>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.addProductModal.taxRate') }} *</label>
                      <v-select class="drop-down" label="tax_rate_label"
                        :clearable="false" v-model="formData.tax_rate"
                        :reduce="filter => filter.tax_rate"
                        :options="taxRates">
                        <template #search="{attributes, events}">
                          <input
                              class="vs__search"
                              :required="!formData.tax_rate"
                              v-bind="attributes"
                              v-on="events"
                            />
                        </template>
                      </v-select>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.addProductModal.type') }} *</label>
                      <v-select class="drop-down" label="product_type_name"
                        :clearable="false" v-model="formData.product_type_id"
                        :reduce="filter => filter.product_type_id"
                        :options="productTypes">
                        <template #search="{attributes, events}">
                          <input
                              class="vs__search"
                              :required="!formData.product_type_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                        </template>
                      </v-select>
                    </div>
                  </div>
                </form>
              </b-modal>
             <b-col md="7">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('servicesAndProducts.headerProductGroup') }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalGroupShow = true"><i class="ri-add-line mr-2"></i>{{ $t('servicesAndProducts.addProductGroup') }}</b-button>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row style="min-height:250px">
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                  bordered
                                  hover
                                  :busy="!isProductGroupDataLoaded"
                                  :items="productGroups"
                                  :fields="productGroupColumns"
                                  :per-page="productGroupsPerPage"
                                  :current-page="currentProductGroupPage">
                                    <template #table-busy>
                                      <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong class="loading">Loading...</strong>
                                      </div>
                                    </template>
                                    <template v-slot:cell(category_id)="data">
                                        <span>
                                            {{ data.item.category_name }}
                                        </span>
                                    </template>
                                    <template v-slot:cell(fee)="data">
                                        <span>
                                            {{ data.item.fee | percentage }}
                                        </span>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProductGroup(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeProductGroup(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductGroupPage"
                                              :total-rows="productGroups.length"
                                              :per-page="productGroupsPerPage"
                                              aria-controls="my-table"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
                <b-modal v-model="modalGroupShow" no-close-on-backdrop size="lg" :title="$t('servicesAndProducts.addProductGroup')" :ok-disabled="isGroupDisabled"  @cancel="cancelGroup" :ok-title="$t('servicesAndProducts.addProductModal.save')" @ok="addProductGroup" :cancel-title="$t('servicesAndProducts.addProductModal.close')">
                  <form>
                    <div class="form-row">
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameSlovenian') }} *</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formGroupData.slovenian" class="form-control" placeholder="Slovenian" required>
                        </div>
                      </div>
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameItalian') }}</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formGroupData.italian" class="form-control" placeholder="Italian">
                        </div>
                      </div>
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameGerman') }}</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formGroupData.german" class="form-control" placeholder="German">
                        </div>
                      </div>
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameEnglish') }}</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formGroupData.english" class="form-control" placeholder="English">
                        </div>
                      </div>
                      <div class="col-md-7 mb-3">
                        <label for="title">{{ $t('servicesAndProducts.productGroupColumn.productGroupCategory') }} *</label>
                        <v-select class="drop-down" label="category_name"
                          :clearable="false" v-model="formGroupData.category_id"
                          :reduce="filter => filter.category_id"
                          :options="productCategories">
                          <template #search="{attributes, events}">
                            <input
                                class="vs__search"
                                :required="!formGroupData.category_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                          </template>
                        </v-select>
                      </div>
                      <div class="col-md-3 mb-3">
                          <label for="patient">{{ $t('servicesAndProducts.productGroupColumn.productGroupFee') }} *</label>
                        <input type="number" v-model="formGroupData.fee" class="form-control" placeholder="Emazing fee" required>
                      </div>
                    </div>
                  </form>
                </b-modal>
            </b-col>
             <b-col md="5">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('servicesAndProducts.headerProductCategories') }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalCategoryShow = true"><i class="ri-add-line mr-2"></i>{{ $t('servicesAndProducts.addProductCategory') }}</b-button>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                  bordered
                                  hover
                                  :busy="!isProductCategoryDataLoaded"
                                  :items="productCategories"
                                  :fields="productCategoryColumns"
                                  :per-page="productCategoriesPerPage"
                                  :current-page="currentProductCategoryPage">
                                    <template #table-busy>
                                      <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong class="loading">Loading...</strong>
                                      </div>
                                    </template>
                                    <template v-slot:cell(category_name)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.category_name }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.category_name"
                                               required
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProductCategory(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeProductCategory(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductCategoryPage"
                                  v-if="hideCategoryPagination"
                                  :total-rows="productCategories.length"
                                  :per-page="productCategoriesPerPage"
                                  aria-controls="my-table">
                                </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
                <b-modal v-model="modalCategoryShow" no-close-on-backdrop size="lg" :title="$t('servicesAndProducts.addProductCategory')" :ok-disabled="isCategoryDisabled"  @cancel="cancelCategory" :ok-title="$t('servicesAndProducts.addProductModal.save')" @ok="addProductCategory" :cancel-title="$t('servicesAndProducts.addProductModal.close')">
                  <form>
                    <div class="form-row">
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameSlovenian') }} *</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formCategoryData.slovenian" class="form-control" placeholder="Slovenian" required>
                        </div>
                      </div>
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameItalian') }}</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formCategoryData.italian" class="form-control" placeholder="Italian">
                        </div>
                      </div>
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameGerman') }}</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formCategoryData.german" class="form-control" placeholder="German">
                        </div>
                      </div>
                      <div class="col-md-12 mb-3">
                          <label for="title">{{ $t('servicesAndProducts.addProductModal.nameEnglish') }}</label>
                        <div style="display: flex;">
                          <input type="text" v-model="formCategoryData.english" class="form-control" placeholder="English">
                        </div>
                      </div>
                    </div>
                  </form>
                </b-modal>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { getProducts, getProductNaming, getProductGroupNaming, getProductCategoryNaming, getProductGroups, getProductCategories, getProductTypes, createProductCategory, updateProductCategory, deleteProductCategory, createProductGroup, updateProductGroup, deleteProductGroup, createProduct, deleteProduct, updateProduct } from '../../services/products'
import { getTaxRateList } from '../../services/commonCodeLists'
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  mounted () {
    xray.index()
    this.getProducts()
    this.getProductCategories()
    this.getProductGroups()
    this.getProductTypes()
    this.getTaxRates()
  },
  computed: {
    isProductDisabled () {
      return !this.formData.slovenian || !this.formData.product_price || !this.formData.product_group_id || !this.formData.product_type_id
    },
    isGroupDisabled () {
      return !this.formGroupData.slovenian || !this.formGroupData.category_id || !this.formGroupData.fee
    },
    isCategoryDisabled () {
      return !this.formCategoryData.slovenian
    },
    ...mapGetters({
      selectedLang: 'Setting/langState'
    }),
    hideCategoryPagination () {
      return Math.floor(this.productCategories.length / this.productCategoriesPerPage) !== 0
    }
  },
  name: 'ServicesAndProducts',
  data: function () {
    return {
      productColumns: [
        { label: this.$t('servicesAndProducts.productColumn.productName'), key: 'product_name', class: 'text-left' },
        { label: this.$t('servicesAndProducts.productColumn.productPrice'), key: 'product_price', class: 'text-left' },
        { label: this.$t('servicesAndProducts.productColumn.productGroup'), key: 'product_group_id', class: 'text-left' },
        { label: this.$t('servicesAndProducts.productColumn.productType'), key: 'product_type_id', class: 'text-left' },
        { label: this.$t('servicesAndProducts.productColumn.productAction'), key: 'action', class: 'text-center' }
      ],
      formData: {
        slovenian: '',
        italian: '',
        german: '',
        english: '',
        product_price: '',
        product_group_id: '',
        product_type_id: '',
        tax_rate: ''
      },
      formGroupData: {
        slovenian: '',
        italian: '',
        german: '',
        english: '',
        category_id: '',
        fee: ''
      },
      formCategoryData: {
        slovenian: '',
        italian: '',
        german: '',
        english: ''
      },
      modalProductShow: false,
      modalGroupShow: false,
      modalCategoryShow: false,
      products: [],
      productGroups: [],
      productCategories: [],
      productTypes: [],
      taxRates: [],
      isProductDataLoaded: false,
      isProductCategoryDataLoaded: false,
      isProductGroupDataLoaded: false,
      currentProductPage: 1,
      productsPerPage: 20,
      productGroupColumns: [
        { label: this.$t('servicesAndProducts.productGroupColumn.productGroupName'), key: 'product_group_name', class: 'text-left' },
        { label: this.$t('servicesAndProducts.productGroupColumn.productGroupCategory'), key: 'category_id', class: 'text-left category-column' },
        { label: this.$t('servicesAndProducts.productGroupColumn.productGroupFee'), key: 'fee', class: 'text-left' },
        { label: this.$t('servicesAndProducts.productGroupColumn.productGroupAction'), key: 'action', class: 'text-center' }
      ],
      currentProductGroupPage: 1,
      productGroupsPerPage: 20,
      productCategoryColumns: [
        { label: this.$t('servicesAndProducts.productCategoryColumn.productCategoryName'), key: 'category_name', class: 'text-left' },
        { label: this.$t('servicesAndProducts.productCategoryColumn.productCategoryAction'), key: 'action', class: 'text-center' }
      ],
      currentProductCategoryPage: 1,
      productCategoriesPerPage: 20,
      tempProductCategory: null
    }
  },
  methods: {
    getProducts () {
      // let locale = this.getLocale()
      getProducts('sl').then(response => {
        this.isProductDataLoaded = true
        this.products = response
      })
    },
    getLocale () {
      return this.selectedLang.value ? this.selectedLang.value : this.selectedLang
    },
    getProductCategories () {
      // let locale = this.getLocale()
      getProductCategories('sl').then(response => {
        this.isProductCategoryDataLoaded = true
        this.productCategories = response
      })
    },
    getProductGroups () {
      // let locale = this.getLocale()
      getProductGroups('sl').then(response => {
        this.isProductGroupDataLoaded = true
        this.productGroups = response
      })
    },
    getProductTypes () {
      getProductTypes().then(response => {
        this.productTypes = response
      })
    },
    defaultFormData () {
      return {
        product_name: '',
        slovenian: '',
        italian: '',
        german: '',
        english: '',
        product_price: '',
        product_group_id: '',
        product_type_id: '',
        tax_rate: ''
      }
    },
    defaultFormGroupData () {
      return {
        slovenian: '',
        italian: '',
        german: '',
        english: '',
        category_id: '',
        fee: ''
      }
    },
    defaultFormCategoryData () {
      return {
        slovenian: '',
        italian: '',
        german: '',
        english: ''
      }
    },
    editProduct (item) {
      getProductNaming(item.product_id).then(response => {
        this.formData = this.populateNaming(response, Object.assign({}, item))
      })
      this.modalProductShow = true
    },
    removeProduct (item) {
      let index = this.products.indexOf(item)
      this.products.splice(index, 1)
      deleteProduct(item.product_id)
    },
    setCurrentProductPage () {
      this.currentProductPage = 1
    },
    addProduct () {
      this.setCurrentProductPage()
      if (this.formData.product_id) {
        updateProduct(this.formData.product_id, this.formData).then(() => {
          this.getProducts()
        })
      } else {
        createProduct(this.formData).then(() => {
          this.getProducts()
        })
      }
      this.formData = this.defaultFormData()
    },
    cancelProduct () {
      this.formData = this.defaultFormData()
    },
    cancelCategory () {
      this.formCategoryData = this.defaultFormCategoryData()
    },
    cancelGroup () {
      this.formGroupData = this.defaultFormGroupData()
    },
    editProductGroup (item) {
      getProductGroupNaming(item.product_group_id).then(response => {
        this.formGroupData = this.populateNaming(response, Object.assign({}, item))
      })
      this.modalGroupShow = true
    },
    removeProductGroup (item) {
      let index = this.productGroups.indexOf(item)
      this.productGroups.splice(index, 1)
      deleteProductGroup(item.product_group_id)
    },
    setCurrentProductGroupPage () {
      this.currentProductGroupPage = 1
    },
    addProductGroup () {
      this.setCurrentProductGroupPage()
      if (this.formGroupData.product_group_id) {
        updateProductGroup(this.formGroupData.product_group_id, this.formGroupData).then(() => {
          this.getProductGroups()
        })
      } else {
        createProductGroup(this.formGroupData).then(() => {
          this.getProductGroups()
        })
      }
      this.formGroupData = this.defaultFormGroupData()
    },
    editProductCategory (item) {
      getProductCategoryNaming(item.category_id).then(response => {
        this.formCategoryData = this.populateNaming(response, Object.assign({}, item))
      })
      this.modalCategoryShow = true
    },
    populateNaming (namingArray, object) {
      namingArray.forEach(naming => {
        if (naming.language === 'sl') {
          object.slovenian = naming.text
        } else if (naming.language === 'en') {
          object.english = naming.text
        } else if (naming.language === 'it') {
          object.italian = naming.text
        } else if (naming.language === 'ge') {
          object.german = naming.text
        }
      })
      return object
    },
    removeProductCategory (item) {
      let index = this.productCategories.indexOf(item)
      deleteProductCategory(item.category_id)
      this.productCategories.splice(index, 1)
    },
    setCurrentProductCategoryPage () {
      this.currentProductCategoryPage = 1
    },
    addProductCategory () {
      this.setCurrentProductCategoryPage()
      if (this.formCategoryData.category_id) {
        updateProductCategory(this.formCategoryData.category_id, this.formCategoryData).then(() => {
          this.getProductCategories()
        })
      } else {
        createProductCategory(this.formCategoryData).then(() => {
          this.getProductCategories()
        })
      }
      this.formCategoryData = this.defaultFormCategoryData()
    },
    getTaxRates () {
      let id = 1
      getTaxRateList(id).then(response => {
        this.taxRates = response
      })
    }
  }
}
</script>
<style lang="scss">
.category-column {
  min-width: 210px !important;
}
.loading {
  padding-left: 10px;
}

.drop-down .vs__search::placeholder,
.drop-down .vs__dropdown-toggle,
.drop-down .vs__dropdown-menu {
    border-radius: 10px;
    min-height: 45px;
    min-width: 150px;
}
</style>
