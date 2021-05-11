<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ productsHeader }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalShow = true"><i class="ri-add-line mr-2"></i>{{ productsButtonLabel }}</b-button>
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
                                    <template v-slot:cell(product_name)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.product_name }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.product_name"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(product_price)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.product_price | euro }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.product_price"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(product_group_id)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.group_name }}
                                        </span>
                                        <v-select v-else class="drop-down" label="product_group_name"
                                          :clearable="false" v-model="data.item.product_group_id"
                                          :reduce="filter => filter.product_group_id"
                                          :options="productGroups">
                                        </v-select>
                                    </template>
                                    <template v-slot:cell(product_type_id)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.type_name }}
                                        </span>
                                        <v-select v-else class="drop-down" label="product_type_name"
                                          :clearable="false" v-model="data.item.product_type_id"
                                          :reduce="filter => filter.product_type_id"
                                          :options="productTypes">
                                        </v-select>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProduct(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-if="!data.item.editable" @click="removeProduct(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                      <b-button variant=" iq-bg-success mr-1 mb-1" :disabled="!data.item.product_name || !data.item.product_group_id || !data.item.product_type_id || !data.item.product_price" size="sm" @click="submitProduct(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="cancelProduct(data.item)" v-if="data.item.editable"><i class="ri-close-circle-fill m-0"></i></b-button>
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
              <b-modal v-model="modalShow" no-close-on-backdrop size="lg" title="Add product" :ok-disabled="aki" ok-title="Save Changes" @ok="addProduct" cancel-title="Close">
                <form>
                  <div class="form-row">
                    <div class="col-md-12 mb-3">
                      <label for="title">Name (Slovenian) *</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.product_name" class="form-control" placeholder="Slovenian" required>
                      </div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="title">Name (Italian)</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.italian" class="form-control" placeholder="Italian">
                      </div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="title">Name (German)</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.german" class="form-control" placeholder="German">
                      </div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="title">Name (English)</label>
                      <div style="display: flex;">
                        <input type="text" v-model="formData.english" class="form-control" placeholder="English">
                      </div>
                    </div>
                    <div class="col-md-2 mb-3">
                      <label for="patient">Price *</label>
                      <input type="number" v-model="formData.product_price" class="form-control" placeholder="Price" required>
                    </div>
                    <div class="col-md-7 mb-3">
                      <label for="title">Group *</label>
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
                      <label for="title">Type *</label>
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
                        <h3 class="card-title" style="margin-top: 10px;">{{ productGroupsHeader }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="addProductGroup"><i class="ri-add-line mr-2"></i>{{ productGroupsButtonLabel }}</b-button>
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
                                    <template v-slot:cell(product_group_name)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.product_group_name }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.product_group_name"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(category_id)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.category_name }}
                                        </span>
                                        <v-select v-else class="drop-down" label="category_name"
                                          :clearable="false" v-model="data.item.category_id"
                                          :reduce="filter => filter.category_id"
                                          :options="productCategories">
                                        </v-select>
                                    </template>
                                    <template v-slot:cell(fee)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.fee | percentage }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.fee"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProductGroup(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-if="!data.item.editable" @click="removeProductGroup(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                      <b-button variant=" iq-bg-success mr-1 mb-1" :disabled="!data.item.product_group_name || !data.item.category_id" size="sm" @click="submitProductGroup(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="cancelProductGroup(data.item)" v-if="data.item.editable"><i class="ri-close-circle-fill m-0"></i></b-button>
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
            </b-col>
             <b-col md="5">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ productCategoriesHeader }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="addProductCategory"><i class="ri-add-line mr-2"></i>{{ productCategoriesButtonLabel }}</b-button>
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
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProductCategory(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-if="!data.item.editable" @click="removeProductCategory(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                      <b-button variant=" iq-bg-success mr-1 mb-1" :disabled="!data.item.category_name" size="sm" @click="submitProductCategory(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="cancelProductCategory(data.item)" v-if="data.item.editable"><i class="ri-close-circle-fill m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductCategoryPage"
                                  :total-rows="productCategories.length"
                                  :per-page="productCategoriesPerPage"
                                  aria-controls="my-table">
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
import { getProducts, getProductGroups, getProductCategories, getProductTypes, createProductCategory, updateProductCategory, deleteProductCategory, createProductGroup, updateProductGroup, deleteProductGroup, createProduct, deleteProduct, updateProduct } from '../../services/products'

export default {
  components: {
  },
  mounted () {
    xray.index()
    this.getProducts()
    this.getProductCategories()
    this.getProductGroups()
    this.getProductTypes()
  },
  computed: {
    aki () {
      return !this.formData.product_name || !this.formData.product_price || !this.formData.product_group_id || !this.formData.product_type_id
    }
  },
  name: 'ServicesAndProducts',
  data: function () {
    return {
      productsHeader: 'Products',
      productsButtonLabel: 'Add product',
      productColumns: [
        { label: 'Name', key: 'product_name', class: 'text-left' },
        { label: 'Price', key: 'product_price', class: 'text-left' },
        { label: 'Group', key: 'product_group_id', class: 'text-left' },
        { label: 'Type', key: 'product_type_id', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      formData: {
        product_name: '',
        italian: '',
        german: '',
        english: '',
        product_price: '',
        product_group_id: '',
        product_type_id: ''
      },
      modalShow: false,
      products: [],
      productGroups: [],
      productCategories: [],
      productTypes: [],
      isProductDataLoaded: false,
      isProductCategoryDataLoaded: false,
      isProductGroupDataLoaded: false,
      isProductCategoryEdit: false,
      isProductGroupEdit: false,
      currentProductPage: 1,
      productsPerPage: 20,
      productGroupsHeader: 'Product Groups',
      productGroupsButtonLabel: 'Add product group',
      productGroupColumns: [
        { label: 'Name', key: 'product_group_name', class: 'text-left' },
        { label: 'Category', key: 'category_id', class: 'text-left category-column' },
        { label: 'Emazing Fee', key: 'fee', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      currentProductGroupPage: 1,
      productGroupsPerPage: 20,
      productCategoriesHeader: 'Product Categories',
      productCategoriesButtonLabel: 'Add product category',
      productCategoryColumns: [
        { label: 'Name', key: 'category_name', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      currentProductCategoryPage: 1,
      productCategoriesPerPage: 20,
      tempProduct: null,
      tempProductGroup: null,
      tempProductCategory: null
    }
  },
  methods: {
    getProducts () {
      getProducts().then(response => {
        this.isProductDataLoaded = true
        this.products = response.map(obj => (
          { ...obj,
            editable: false
          }
        ))
      })
    },
    getProductCategories () {
      getProductCategories().then(response => {
        this.isProductCategoryDataLoaded = true
        this.productCategories = response.map(obj => (
          { ...obj,
            editable: false
          }
        ))
      })
    },
    getProductGroups () {
      getProductGroups().then(response => {
        this.isProductGroupDataLoaded = true
        this.productGroups = response.map(obj => (
          { ...obj,
            editable: false
          }
        ))
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
        italian: '',
        german: '',
        english: '',
        product_price: '',
        product_group_id: '',
        product_type_id: ''
      }
    },
    editProduct (item) {
      this.tempProduct = Object.assign({}, item)
      item.editable = true
    },
    submitProduct (item) {
      updateProduct(item.product_id, item).then(() => {
        this.getProducts()
      })
      item.editable = false
    },
    removeProduct (item) {
      let index = this.products.indexOf(item)
      this.products.splice(index, 1)
      deleteProduct(item.product_id)
    },
    cancelProduct (item) {
      let index = this.products.indexOf(item)
      this.tempProduct ? this.products.splice(index, 1, this.tempProduct) : this.products.shift()
    },
    setCurrentProductPage () {
      this.currentProductPage = 1
    },
    addProduct () {
      createProduct(this.formData).then(() => {
        this.getProducts()
      })
      this.tempProduct = null
      this.formData = this.defaultFormData()
    },
    defaultProduct () {
      return {
        product_id: '',
        product_name: '',
        product_price: 0,
        product_group_id: '',
        product_type_id: '',
        editable: true
      }
    },
    editProductGroup (item) {
      this.tempProductGroup = Object.assign({}, item)
      item.editable = true
      this.isProductGroupEdit = true
    },
    submitProductGroup (item) {
      if (this.isProductGroupEdit) {
        updateProductGroup(item.product_group_id, item).then(() => {
          this.getProductGroups()
        })
      } else {
        createProductGroup(item).then(() => {
          this.getProductGroups()
        })
      }
      item.editable = false
    },
    removeProductGroup (item) {
      let index = this.productGroups.indexOf(item)
      this.productGroups.splice(index, 1)
      deleteProductGroup(item.product_group_id)
    },
    cancelProductGroup (item) {
      let index = this.productGroups.indexOf(item)
      this.tempProductGroup ? this.productGroups.splice(index, 1, this.tempProductGroup) : this.productGroups.shift()
    },
    setCurrentProductGroupPage () {
      this.currentProductGroupPage = 1
    },
    addProductGroup () {
      this.setCurrentProductGroupPage()
      let obj = this.defaultProductGroup()
      this.productGroups.unshift(obj)
      this.tempProductGroup = null
      this.isProductGroupEdit = false
    },
    defaultProductGroup () {
      return {
        product_group_name: '',
        category_id: '',
        fee: '0',
        editable: true
      }
    },
    editProductCategory (item) {
      this.tempProductCategory = Object.assign({}, item)
      item.editable = true
      this.isProductCategoryEdit = true
    },
    removeProductCategory (item) {
      let index = this.productCategories.indexOf(item)
      deleteProductCategory(item.category_id)
      this.productCategories.splice(index, 1)
    },
    cancelProductCategory (item) {
      let index = this.productCategories.indexOf(item)
      this.tempProductCategory ? this.productCategories.splice(index, 1, this.tempProductCategory) : this.productCategories.shift()
    },
    setCurrentProductCategoryPage () {
      this.currentProductCategoryPage = 1
    },
    addProductCategory () {
      this.setCurrentProductCategoryPage()
      let obj = this.defaultProductCategory()
      this.productCategories.unshift(obj)
      this.tempProductCategory = null
      this.isProductCategoryEdit = false
    },
    submitProductCategory (item) {
      item.editable = false
      if (this.isProductCategoryEdit) {
        updateProductCategory(item.category_id, item)
      } else {
        createProductCategory(item).then(() => {
          this.getProductCategories()
        })
      }
    },
    defaultProductCategory () {
      return {
        category_name: '',
        editable: true
      }
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
