<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ productsHeader }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="addProduct"><i class="ri-add-line mr-2"></i>{{ productsButtonLabel }}</b-button>
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
                                        <v-select v-else class="patients" label="product_group_name"
                                          :clearable="false" v-model="data.item.product_group_id"
                                          :reduce="filter => filter.product_group_id"
                                          :options="productGroups">
                                        </v-select>
                                    </template>
                                    <template v-slot:cell(product_type_id)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.type_name }}
                                        </span>
                                        <v-select v-else class="patients" label="product_type_name"
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
                                        <v-select v-else class="patients" label="category_name"
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
      products: [],
      productGroups: [],
      productCategories: [],
      productTypes: [],
      isProductDataLoaded: false,
      isProductCategoryDataLoaded: false,
      isProductGroupDataLoaded: false,
      isProductEdit: false,
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
    editProduct (item) {
      this.tempProduct = Object.assign({}, item)
      item.editable = true
      this.isProductEdit = true
    },
    submitProduct (item) {
      if (this.isProductEdit) {
        updateProduct(item.product_id, item).then(() => {
          this.getProducts()
        })
      } else {
        createProduct(item).then(() => {
          this.getProducts()
        })
      }
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
      this.setCurrentProductPage()
      let obj = this.defaultProduct()
      this.products.unshift(obj)
      this.isProductEdit = false
      this.tempProduct = null
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
</style>
