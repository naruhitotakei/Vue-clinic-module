<template>
    <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
              <h3 class="card-title" style="margin-top: 10px;">{{ $t('offers.offersHeader') }}</h3>
                        <div class="btn-add-patient col-12 col-sm-4 col-md-3 col-lg-2 mb-4 mb-sm-0 offer">
                            <b-button variant="primary" @click="add_offer"><i class="ri-add-line mr-2"></i>{{ $t('offers.offersBtn') }}</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-sm-flex align-items-center col-12 col-sm-8 col-md-9 col-lg-10" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="text" class="text search-input" v-model="filter" :placeholder="$t('shared.search')">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card class="mt-4 mt-sm-0">
                              <b-form-group label-for="searchOptions" :label="$t('shared.searchBy')">
                              <v-select class="patients" label="text"
                                :clearable="false" :reduce="filter => filter.value"
                                :options="searchOptions" @input="filterSelected">
                              </v-select>
                              </b-form-group>
                            </iq-card>
                        </div>
                    </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table
                  id="my-table"
                  class="table-t"
                  bordered
                  hover
                  :busy="!isDataLoaded"
                  style="cursor: pointer;"
                  @row-clicked="$router.push('/extra-pages/offer-example')"
                  :items="offers"
                  :fields="columns"
                  :per-page="perPage"
                  :current-page="currentPage"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  @filtered="onFiltered"
                >
                    <template #table-busy>
                        <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="loading">Loading...</strong>
                        </div>
                </template>
                </b-table>
              </b-col>
            </b-row>
            <template>
              <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
              <div class="mt-3">
                <b-pagination
                v-if="hidePagination"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
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
import { getOffers } from '../../services/offers'
import moment from 'moment'
import _ from 'lodash'

export default {
  components: {
  },
  name: 'Offers',
  computed: {
    hidePagination() {
      return Math.floor(this.totalRows / this.perPage) !== 0
    },
  },
  methods: {
    default() {
      return {
        offer_no: this.rows.length,
        patient_name: '',
        date: '',
        issued_by: '',
        amount: '',
      }
    },
    add_offer() {
    },
    filterSelected(value) {
      let array = [value]
      this.filterOn = array
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getOffers() {
      getOffers().then(response => {
        this.offers = _.orderBy(response, ['invoice_time', 'invoice_number'], ['desc', 'desc'])
        this.setTotalRows(this.offers.length)
        this.toggleDataLoaded()
      })
    },
    setTotalRows(number) {
      this.totalRows = number
    },
    toggleDataLoaded() {
      this.isDataLoaded = !this.isDataLoaded
    },
  },
  data() {
    return {
      dropDownText: '',
      selected: this.value,
      searchOptions: [
        { value: 'offer_no', text: 'Number' },
        { value: 'patient_name', text: 'Patient Name' },
        { value: 'date', text: 'Date' },
        { value: 'issue_by', text: 'Issued by' },
        { value: 'amount', text: 'Amount' },
      ],
      offers: [],
      filter: '',
      filterOn: [],
      currentPage: 1,
      perPage: 10,
      isDataLoaded: false,
      totalRows: 1,
      columns: [
        { label: this.$t('offers.offersColumn.no'), key: 'invoice_number', class: 'text-left' },
        { label: this.$t('offers.offersColumn.patientName'),
          key: 'patient_name',
          class: 'text-left',
          formatter: (value, key, item) => {
            return item.enquiries_name + ' ' + item.enquiries_last_name
          },
          filterByFormatted: true,
        },
        { label: this.$t('offers.offersColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('DD-MM-YYYY')
          },
          filterByFormatted: true,
        },
        { label: this.$t('offers.offersColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
        { label: this.$t('offers.offersColumn.amount'), key: 'total_with_vat', class: 'text-left' },
      ],
    }
  },
  mounted() {
    xray.index()
    this.getOffers()
  },
}
</script>

<style lang="scss">
.offer {
  display: flex;
  justify-content: flex-end;
}

.table-t {
  td {
    min-width: 110px;
  }
}
@media (max-width: 479px) {
.iq-search-bar {
  padding: 0 15px 0 0 !important;
  margin: 0 !important;
}

.search-input {
  width: 105% !important;
}
}

@media (min-width: 320px) and (max-width: 575px) {
  .offer {
    justify-content: flex-start;
  }
}

//@media (min-width: 1401px) {
//.offer {
//  margin-right: -88px !important;
//}
//}
</style>
