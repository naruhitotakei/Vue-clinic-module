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
                                         :items="productRows"
                                         :fields="productColumns"
                                         :per-page="productsPerPage"
                                         :current-page="currentProductPage">
                                    <template v-slot:cell(code)="data">
                                        <span v-if="!data.item.editable">{{ data.item.code }}</span>
                                        <input type="text"
                                               v-model="data.item.code"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(name)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.name }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.name"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(price)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.price }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.price"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(group)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.group }}
                                        </span>
                                        <b-form-select v-else v-model="data.item.group"
                                                       :options="groupOptions"
                                                       class="form-control">
                                        </b-form-select>
                                    </template>
                                    <template v-slot:cell(type)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.type }}
                                        </span>
                                        <b-form-select v-else v-model="data.item.type"
                                                       :options="typeOptions"
                                                       class="form-control">
                                        </b-form-select>
                                    </template>
                                    <template v-slot:cell(category)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.category }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.category"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1"
                                                  size="sm"
                                                  @click="editProduct(data.item)"
                                                  v-if="!data.item.editable">
                                            <i class="ri-ball-pen-fill m-0"></i>
                                        </b-button>
                                        <b-button variant=" iq-bg-success mr-1 mb-1"
                                                  size="sm"
                                                  @click="submitProduct(data.item)"
                                                  v-else>Ok</b-button>
                                        <b-button variant=" iq-bg-danger"
                                                  size="sm"
                                                  @click="removeProduct(data.item)">
                                            <i class="ri-delete-bin-line m-0"></i>
                                        </b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductPage"
                                              :total-rows="productRows.length"
                                              :per-page="productsPerPage"
                                              aria-controls="my-table"></b-pagination>
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
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                         bordered
                                         hover
                                         :items="productGroupRows"
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
                                    <template v-slot:cell(category)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.category }}
                                        </span>
                                        <b-form-select v-else v-model="data.item.category"
                                                       :options="categoryOptions"
                                                       class="form-control">
                                        </b-form-select>
                                    </template>
                                    <template v-slot:cell(emazingFee)="data">
                                        <span v-if="!data.item.editable">
                                            {{ data.item.emazingFee }}
                                        </span>
                                        <input type="text"
                                               v-model="data.item.emazingFee"
                                               v-else
                                               class="form-control" />
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1"
                                                  size="sm"
                                                  @click="editProductGroup(data.item)"
                                                  v-if="!data.item.editable">
                                            <i class="ri-ball-pen-fill m-0"></i>
                                        </b-button>
                                        <b-button variant=" iq-bg-success mr-1 mb-1"
                                                  size="sm"
                                                  @click="submitProductGroup(data.item)"
                                                  v-else>Ok</b-button>
                                        <b-button variant=" iq-bg-danger"
                                                  size="sm"
                                                  @click="removeProductGroup(data.item)">
                                            <i class="ri-delete-bin-line m-0"></i>
                                        </b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductGroupPage"
                                              :total-rows="productGroupRows.length"
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
                                         :items="productCategoryRows"
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
                                        <b-button variant=" iq-bg-success mr-1 mb-1"
                                                  size="sm"
                                                  @click="editProductCategory(data.item)"
                                                  v-if="!data.item.editable">
                                            <i class="ri-ball-pen-fill m-0"></i>
                                        </b-button>
                                        <b-button variant=" iq-bg-success mr-1 mb-1"
                                                  size="sm"
                                                  @click="submitProductCategory(data.item)"
                                                  v-else>Ok</b-button>
                                        <b-button variant=" iq-bg-danger"
                                                  size="sm"
                                                  @click="removeProductCategory(data.item)">
                                            <i class="ri-delete-bin-line m-0"></i>
                                        </b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentProductCategoryPage"
                                              :total-rows="productCategoryRows.length"
                                              :per-page="productCategoriesPerPage"
                                              aria-controls="my-table"></b-pagination>
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

export default {
  components: {
  },
  mounted () {
    xray.index()
  },
  name: 'ServicesAndProducts',
  data: function () {
    return {
      productsHeader: 'Products',
      productsButtonLabel: 'Add product',
      productColumns: [
        { label: 'Code', key: 'code', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Price', key: 'price', class: 'text-left' },
        { label: 'Group', key: 'group', class: 'text-left' },
        { label: 'Type', key: 'type', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      groupOptions: [
        { value: null, text: 'Please select group' },
        { value: 'Group 1', text: 'Group 1' },
        { value: 'Group 2', text: 'Group 2' },
        { value: 'Group 3', text: 'Group 3' }
      ],
      typeOptions: [
        { value: null, text: 'Please select type' },
        { value: 'Product', text: 'Product' },
        { value: 'Service', text: 'Service' }
      ],
      productRows: [
        {
          code: '1',
          name: 'Tooth cleaning',
          price: '80 €',
          group: 'Group 1',
          type: 'Product',
          category: 'Category 1',
          editable: false
        },
        {
          code: '2',
          name: 'Apointment',
          price: '120 €',
          group: 'Group 2',
          type: 'Service',
          category: 'Category 2',
          editable: false
        },
        {
          code: '3',
          name: 'Apointment',
          price: '120 €',
          group: 'Group 2',
          type: 'Service',
          category: 'Category 2',
          editable: false
        },
        {
          code: '4',
          name: 'Apointment',
          price: '120 €',
          group: 'Group 2',
          type: 'Service',
          category: 'Category 2',
          editable: false
        },
        {
          code: '5',
          name: 'Apointment',
          price: '120 €',
          group: 'Group 2',
          type: 'Service',
          category: 'Category 2',
          editable: false
        }
      ],
      currentProductPage: 1,
      productsPerPage: 4,
      productGroupsHeader: 'Product Groups',
      productGroupsButtonLabel: 'Add product group',
      productGroupColumns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Category', key: 'category', class: 'text-left' },
        { label: 'Emazing Fee', key: 'emazingFee', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      productGroupRows: [
        {
          name: 'Tooth cleaning',
          category: 'Braces',
          emazingFee: '30 €',
          editable: false
        }
      ],
      currentProductGroupPage: 1,
      productGroupsPerPage: 4,
      productCategoriesHeader: 'Product Categories',
      productCategoriesButtonLabel: 'Add product category',
      productCategoryColumns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      categoryOptions: [
        { value: null, text: 'Please select category' },
        { value: 'Tooth cleaning', text: 'Tooth cleaning' },
        { value: 'Tooth whitening', text: 'Tooth whitening' },
        { value: 'Braces', text: 'Braces' }
      ],
      productCategoryRows: [
        {
          name: 'Tooth cleaning',
          editable: false
        },
        {
          name: 'Tooth whitening',
          editable: false
        },
        {
          name: 'Braces',
          editable: false
        }
      ],
      currentProductCategoryPage: 1,
      productCategoriesPerPage: 4
    }
  },
  methods: {
    editProduct (item) {
      item.editable = true
    },
    submitProduct (item) {
      item.editable = false
    },
    removeProduct (item) {
      let index = this.productRows.indexOf(item)
      this.productRows.splice(index, 1)
    },
    setCurrentProductPage () {
      this.currentProductPage = 1
    },
    addProduct () {
      this.setCurrentProductPage()
      let obj = this.defaultProduct()
      this.productRows.unshift(obj)
    },
    defaultProduct () {
      return {
        code: this.productRows.length + 1,
        name: '',
        price: '0 €',
        group: '',
        type: '',
        category: '',
        editable: true
      }
    },
    editProductGroup (item) {
      item.editable = true
    },
    submitProductGroup (item) {
      item.editable = false
    },
    removeProductGroup (item) {
      let index = this.productGroupRows.indexOf(item)
      this.productGroupRows.splice(index, 1)
    },
    setCurrentProductGroupPage () {
      this.currentProductGroupPage = 1
    },
    addProductGroup () {
      this.setCurrentProductGroupPage()
      let obj = this.defaultProductGroup()
      this.productGroupRows.unshift(obj)
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
      item.editable = true
    },
    submitProductCategory (item) {
      item.editable = false
    },
    removeProductCategory (item) {
      let index = this.productCategoryRows.indexOf(item)
      this.productCategoryRows.splice(index, 1)
    },
    setCurrentProductCategoryPage () {
      this.currentProductCategoryPage = 1
    },
    addProductCategory () {
      this.setCurrentProductCategoryPage()
      let obj = this.defaultProductCategory()
      this.productCategoryRows.unshift(obj)
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
