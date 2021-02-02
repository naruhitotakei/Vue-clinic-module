<template>
    <div class="container">
        <DataTable
            :header-fields="headerFields"
            :sort-field="sortField"
            :sort="sort"
            :data="data || []"
            :is-loading="isLoading"
            :css="datatableCss"
            not-found-msg="Items not found"
            @on-update="dtUpdateSort"
            track-by="firstName"
        >
            <!-- Action button slot -->
            <input
                slot="actionEdit"
                slot-scope="props"
                type="button"
                class="btn btn-info"
                value="Edit"
                @click="dtEditClick(props)"
            >
            <input
                slot="actionDelete"
                slot-scope="props"
                type="button"
                class="btn btn-danger"
                value="Delete"
                @click="dtDeleteClick(props)"
            >      

            <input type="text" slot="updated:header" value="Custom updated" />

            <span slot="createdHeader">Custom Created</span>

            <!-- Pagination component as a slot, but could be drag out from Database element -->
            <Pagination
                slot="pagination"
                :page="currentPage"
                :total-items="totalItems"
                :items-per-page="itemsPerPage"
                :css="paginationCss"
                @on-update="changePage"
                @update-current-page="updateCurrentPage"
            />

            <!-- ItemsPerPage component as a slot, but could be drag out from Database element -->
            <div class="items-per-page" slot="ItemsPerPage">
                <label>Items per page</label>
                <ItemsPerPageDropdown
                    :list-items-per-page="listItemsPerPage"
                    :items-per-page="itemsPerPage"
                    :css="itemsPerPageCss"
                    @on-update="updateItemsPerPage"
            />
            </div>

            <!-- Spinner element as slot used when is-loading attribute is true -->
            <Spinner slot="spinner"/>

            <!-- Custom element for hometown -->
            <div slot="HometownNew" slot-scope="props">
                <input type="text" :value="props.rowData.hometown" @keyup="changeHometown($event, props.rowData.id)" class="form-control"/>
            </div>
        </DataTable>
    </div>
</template>

<script>
import { getAllEnquiries } from '../services/EnquiriesService'
import ItemsPerPageDropdown from './common/ItemsPerPageDropdown.vue'
import Pagination from './common/Pagination.vue'
import { DataTable } from 'v-datatable-light'
import orderBy from 'lodash.orderby'

const addZero = value => (`0${value}`).slice(-2)

const formatDate = value => {
  if (value) {
    const dt = new Date(value)
    return `${addZero(dt.getDate())}.${addZero(
      dt.getMonth() + 1
    )}.${dt.getFullYear()}`
  }
  return ''
}

var initialData = []

export default {
  components: {
      DataTable,
      ItemsPerPageDropdown,
      Pagination
  },
  name: 'Enquiries',
  data: function () {
    return {
      headerFields: [
        '__slot:checkboxes',
        {
          name: 'name',
          label: 'Name',
          sortable: true
        },
        {
          name: 'phone',
          label: 'Phone',
          sortable: false
        },
        {
          name: 'email',
          label: 'email',
          sortable: false
        },
        {
          name: 'created_at',
          label: 'Created',
          sortable: true,
          format: formatDate
        },
        '__slot:actions:actionEdit',
        '__slot:actions:actionDelete',
      ],
      data: initialData.slice(0, 10),
      datatableCss: {
        table: 'table table-bordered table-hover table-striped table-center',
        theadTr: 'header-item',
        theadTh: 'custom-thead-th',
        thWrapper: 'th-wrapper',
        thWrapperCheckboxes: 'th-wrapper checkboxes',
        arrowsWrapper: 'arrows-wrapper',
        arrowUp: 'arrow up',
        arrowDown: 'arrow down',
        footer: 'footer'
      },
      paginationCss: {
        paginationItem: 'pagination-item',
        moveFirstPage: 'move-first-page',
        movePreviousPage: 'move-previous-page',
        moveNextPage: 'move-next-page',
        moveLastPage: 'move-last-page',
        pageBtn: 'page-btn'
      },
      itemsPerPageCss: {
        select: 'item-per-page-dropdown'
      },
      isLoading: false,
      sort: 'asc',
      sortField: 'name',
      listItemsPerPage: [10, 20, 50, 100],
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 16,
      hometown: null
    }
  },
  
  methods: {
    dtEditClick: props => alert(`Edit props: ${JSON.stringify(props)}`),
    
    dtDeleteClick: props => alert(`Delete props: ${props.rowData.id}`),
    
    dtUpdateSort: function ({ sortField, sort }) {
      const sortedData = orderBy(initialData, [sortField], [sort])
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = this.currentPage * this.itemsPerPage
      this.data = sortedData.slice(start, end)
    },
    
    updateItemsPerPage: function (itemsPerPage) {
      this.itemsPerPage = itemsPerPage
      if (itemsPerPage >= initialData.length) {
        this.data = initialData
      } else {
        this.data = initialData.slice(0, itemsPerPage)
      }
    },
    
    changePage: function (currentPage) {
      this.currentPage = currentPage
      const start = (currentPage - 1) * this.itemsPerPage
      const end = currentPage * this.itemsPerPage
      this.data = initialData.slice(start, end)
    },
    
    updateCurrentPage: function (currentPage) {
      this.currentPage = currentPage
    },
    
    changeHometown: function (event, id) {
      this.data = this.data.map(item => (item.id === id ? { ...item, hometown: event.target.value } : item))
    },
    
    getAllEnquiries() {
      getAllEnquiries().then(response => {
        this.data = response.slice(0,10)
      })
    },
  },
  
  mounted () {
    this.getAllEnquiries();
  }
}

</script>