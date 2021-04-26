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
                                         :items="products"
                                         :fields="productColumns"
                                         :per-page="productsPerPage"
                                         :current-page="currentProductPage">
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
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitProduct(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
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
                                  :items="productGroups"
                                  :fields="productGroupColumns"
                                  :per-page="productGroupsPerPage"
                                  :current-page="currentProductGroupPage">
                                    <template v-slot:cell(name)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.name }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.name"
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
                                    <template v-slot:cell(emazingFee)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.emazingFee | euro }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.emazingFee"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProductGroup(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-if="!data.item.editable" @click="removeProductGroup(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitProductGroup(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
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
                                  :items="productCategories"
                                  :fields="productCategoryColumns"
                                  :per-page="productCategoriesPerPage"
                                  :current-page="currentProductCategoryPage">
                                    <template v-slot:cell(name)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.name }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.name"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editProductCategory(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-if="!data.item.editable" @click="removeProductCategory(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitProductCategory(data.item)" v-if="data.item.editable"><i class="ri-checkbox-circle-fill m-0"></i></b-button>
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
import { getProducts, getProductGroups, getProductCategories, getProductTypes } from '../../services/products'

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
  filters: {
    euro (val) {
      return val + ' €'
    }
  },
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
      currentProductPage: 1,
      productsPerPage: 4,
      productGroupsHeader: 'Product Groups',
      productGroupsButtonLabel: 'Add product group',
      productGroupColumns: [
        { label: 'Name', key: 'product_group_name', class: 'text-left' },
        { label: 'Category', key: 'category_id', class: 'text-left category-column' },
        { label: 'Emazing Fee', key: 'emazingFee', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      currentProductGroupPage: 1,
      productGroupsPerPage: 4,
      productCategoriesHeader: 'Product Categories',
      productCategoriesButtonLabel: 'Add product category',
      productCategoryColumns: [
        { label: 'Name', key: 'category_name', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      currentProductCategoryPage: 1,
      productCategoriesPerPage: 4,
      tempProduct: null,
      tempProductGroup: null,
      tempProductCategory: null
    }
  },
  methods: {
    getProducts () {
      getProducts().then(response => {
        this.products = response.map(obj => (
          { ...obj,
            editable: false
          }
        ))
      })
    },
    getProductCategories () {
      getProductCategories().then(response => {
        this.productCategories = response.map(obj => (
          { ...obj,
            editable: false
          }
        ))
      })
    },
    getProductGroups () {
      getProductGroups().then(response => {
        this.productGroups = response.map(obj => (
          { ...obj,
            editable: false,
            emazingFee: 30
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
    },
    submitProduct (item) {
      item.editable = false
    },
    removeProduct (item) {
      let index = this.products.indexOf(item)
      this.products.splice(index, 1)
    },
    cancelProduct (item) {
      let index = this.products.indexOf(item)
      this.products.splice(index, 1, this.tempProduct)
    },
    setCurrentProductPage () {
      this.currentProductPage = 1
    },
    addProduct () {
      this.setCurrentProductPage()
      let obj = this.defaultProduct()
      this.products.unshift(obj)
    },
    defaultProduct () {
      return {
        code: this.products.length + 1,
        name: '',
        price: '0 €',
        group: '',
        type: '',
        category: '',
        editable: true
      }
    },
    editProductGroup (item) {
      this.tempProductGroup = Object.assign({}, item)
      item.editable = true
    },
    submitProductGroup (item) {
      item.editable = false
    },
    removeProductGroup (item) {
      let index = this.productGroups.indexOf(item)
      this.productGroups.splice(index, 1)
    },
    cancelProductGroup (item) {
      let index = this.productGroups.indexOf(item)
      this.productGroups.splice(index, 1, this.tempProductGroup)
    },
    setCurrentProductGroupPage () {
      this.currentProductGroupPage = 1
    },
    addProductGroup () {
      this.setCurrentProductGroupPage()
      let obj = this.defaultProductGroup()
      this.productGroups.unshift(obj)
    },
    defaultProductGroup () {
      return {
        name: '',
        category: '',
        emazingFee: '0 €',
        editable: true
      }
    },
    editProductCategory (item) {
      this.tempProductCategory = Object.assign({}, item)
      item.editable = true
    },
    submitProductCategory (item) {
      item.editable = false
    },
    removeProductCategory (item) {
      let index = this.productCategories.indexOf(item)
      this.productCategories.splice(index, 1)
    },
    cancelProductCategory (item) {
      let index = this.productCategories.indexOf(item)
      this.productCategories.splice(index, 1, this.tempProductCategory)
    },
    setCurrentProductCategoryPage () {
      this.currentProductCategoryPage = 1
    },
    addProductCategory () {
      this.setCurrentProductCategoryPage()
      let obj = this.defaultProductCategory()
      this.productCategories.unshift(obj)
    },
    defaultProductCategory () {
      return {
        name: '',
        editable: true
      }
    }
  }
}
</script>
<style lang="scss">
.category-column {
  min-width: 200px !important;
}
</style>
