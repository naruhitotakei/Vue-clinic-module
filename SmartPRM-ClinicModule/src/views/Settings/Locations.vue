<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('settingsLocations.headerLocations') }}</h3>
                       <!-- <div class="btn-add-patient col-12 col-sm-3 col-md-3 col-lg-2 mb-4 mb-sm-0 invoice">
                            <b-button variant="primary" @click="modalShow = true"><i class="ri-add-line mr-2"></i>{{ $t('invoices.invoicesBtn') }}</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-sm-flex align-items-center col-12 col-sm-9 col-md-9 col-lg-10" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="search" v-model="filter" class="text search-input" placeholder="Search">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card class="mt-4 mt-sm-0">
                                <b-form-group label-for="searchOptions" label="Search By:">
                                    <v-select class="patients" label="text"
                                              :clearable="false" :reduce="filter => filter.value"
                                              :options="searchOptions" @input="filterSelected">
                                    </v-select>
                                </b-form-group>
                            </iq-card>
                        </div>-->
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                         bordered
                                         hover
                                         :busy="!isDataLoaded"
                                         style="cursor: pointer;"
                                         :items="locations"
                                         :fields="columns">
                                    <template #table-busy>
                                        <div class="text-center text-primary my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="loading">Loading...</strong>
                                        </div>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { getPremisesList } from '../../services/premises'
export default {
  components: {
  },
  name: 'Locations',
  data: function () {
    return {
      isDataLoaded: false,
      locations: [],
      columns: [
        { label: this.$t('settingsLocations.locationsColumn.name'), key: 'name', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.address'), key: 'address', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.city'), key: 'city', class: 'text-left' }
      ]
    }
  },
  methods: {
    getLocations () {
      getPremisesList().then(response => {
        this.locations = response
        this.toggleDataLoaded()
      })
    },
    toggleDataLoaded () {
      this.isDataLoaded = !this.isDataLoaded
    }
  },
  mounted () {
    xray.index()
    this.getLocations()
  }
}
</script>
