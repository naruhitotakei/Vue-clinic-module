<template>
    <div class="container">
        <!-- https://github.com/aquilesb/v-datatable-light/blob/master/src/components/Pagination.vue -->
        <DataTable
            :header-fields="headerFields"
            :sort-field="sortField"
            :sort="sort"
            :data="data || []"
            :is-loading="isLoading"
            :css="datatableCss"
            not-found-msg="Items not found"
            @on-update="dtUpdateSort"
            track-by="name"
        >
            <!-- Action button slot -->
            <input
                slot="actionNotes"
                slot-scope="props"
                type="button"
                class="btn btn-primary"
                value="Notes"
                @click="doNotesClick(props)"
            >              
            <input
                slot="actionEdit"
                slot-scope="props"
                type="button"
                class="btn btn-secondary"
                value="Edit"
                @click="doEditClick(props)"
            >
            <input
                slot="actionDelete"
                slot-scope="props"
                type="button"
                class="btn btn-danger"
                value="Delete"
                @click="doDeleteClick(props)"
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

<style>
    #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
    color: #2c3e50;
    /*text-align: center;
    margin-top: 60px;*/
    }
#app .title {
  margin-bottom: 30px;
}
#app .items-per-page {
  height: 100%;
  display: flex;
  align-items: center;
  color: #337ab7;
}
#app .items-per-page label {
  margin: 0 15px;
}
/* Datatable CSS */
#app .v-datatable-light .header-column-2 {
  color: black;
}
#app .v-datatable-light .header-column-3 {
  color: black;
}
#app .v-datatable-light .header-column-4 {
  color: black;
}
#app .v-datatable-light .header-column-5 {
  color: black;
}
#app .v-datatable-light .header-column-6 {
  color: black;
}
#app .v-datatable-light .row-2 {
  color: black;
}
#app .v-datatable-light .row-2 .column-2{
  color: black;
}
#app .v-datatable-light .row-3 {
  color: black;
}
#app .v-datatable-light .row-5 .column-1, #app .v-datatable-light .row-5 .column-6 {
  color: black;
}
#app .v-datatable-light .row-7 .column-4 {
  color: black;
}
#app .v-datatable-light .row-9 .column-5 {
  color: black;
}
#app .v-datatable-light .row-4 {
  color: black;
}
.v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}
.v-datatable-light .header-item:hover {
  color: #ed9b19;
}
.v-datatable-light .header-item.no-sortable{
  cursor: default;
}
.v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}
.v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
}
.v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}
.v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}
.v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}
.v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.v-datatable-light .arrow.up {
  border-bottom: 8px solid #337ab7;
}
.v-datatable-light .arrow.up:hover {
  border-bottom: 8px solid #ed9b19;
}
.v-datatable-light .arrow.down {
  border-top: 8px solid #337ab7;
}
.v-datatable-light .arrow.down:hover {
  border-top: 8px solid #ed9b19;
}
.v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
/* End Datatable CSS */
/* Pagination CSS */
 .v-datatable-light-pagination {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 30px;
  }
  .v-datatable-light-pagination .pagination-item {
    width: 30px;
    margin-right: 5px;
    font-size: 16px;
    transition: color 0.15s ease-in-out;
  }
  .v-datatable-light-pagination .pagination-item.selected {
    color: #ed9b19;
  }
  .v-datatable-light-pagination .pagination-item .page-btn {
    background-color: transparent;
    outline: none;
    border: none;
    color: #337ab7;
    transition: color 0.15s ease-in-out;
  }
  .v-datatable-light-pagination .pagination-item .page-btn:hover {
    color: #ed9b19;
  }
  .v-datatable-light-pagination .pagination-item .page-btn:disabled{
    cursor: not-allowed;
    box-shadow: none;
    opacity: .65;
  }
  /* END PAGINATION CSS */
  /* ITEMS PER PAGE DROPDOWN CSS */
  .item-per-page-dropdown {
    background-color: transparent;
    min-height: 30px;
    border: 1px solid #337ab7;
    border-radius: 5px;
    color: #337ab7;
  }
  .item-per-page-dropdown:hover {
    cursor: pointer;
  }
  /* END ITEMS PER PAGE DROPDOWN CSS */
</style>

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
        //'__slot:checkboxes',
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
          name: 'date_of_birth',
          label: 'Date of birth',
          sortable: false,
          format: formatDate
        },
        {
          name: 'gender',
          label: 'Gender',
          sortable: false
        },  
        '__slot:actions:actionNotes',      
        '__slot:actions:actionEdit',
        '__slot:actions:actionDelete',
      ],
      data: [].slice(0, 10),
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
  
    doNotesClick: props => alert(`Delete props: ${props.rowData.data}`),
    
    doEditClick: props => alert(`Edit props: ${JSON.stringify(props)}`),
    
    doDeleteClick: props => alert(`Delete props: ${props.rowData.id}`),
    
    dtUpdateSort: function ({ sortField, sort }) {
      const sortedData = orderBy(this.data, [sortField], [sort])
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = this.currentPage * this.itemsPerPage
      this.data = sortedData.slice(start, end)
    },
    
    updateItemsPerPage: function (itemsPerPage) {
      this.itemsPerPage = itemsPerPage
    },
    
    changePage: function (currentPage) {
      this.currentPage = currentPage
      //const start = (currentPage - 1) * this.itemsPerPage
      //const end = currentPage * this.itemsPerPage
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