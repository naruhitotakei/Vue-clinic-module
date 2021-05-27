<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('settingsLocations.headerLocations') }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="openAddLocation"><i class="ri-add-line mr-2"></i>{{ $t('settingsLocations.addLocation') }}</b-button>
                        </div>
                    </template>
                    <b-modal v-model="addLocationModal" no-close-on-backdrop size="lg" :title="$t('settingsLocations.addLocationModalHeader')" @close="addLocationModal = false" @cancel="addLocationModal = false" @ok="addLocation" :ok-title="$t('settingsLocations.locationModal.save')" :cancel-title="$t('settingsLocations.locationModal.close')">
                        <form>
                            <div class="form-row">
                                <div class="col-md-12 mb-3">
                                    <label for="title">{{ $t('settingsLocations.locationModal.name') }} *</label>
                                    <div style="display: flex;">
                                        <input type="text" v-model="formData.name" class="form-control" :placeholder="$t('settingsLocations.locationModal.name')" required>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="title">{{ $t('settingsLocations.locationModal.city') }} *</label>
                                    <div style="display: flex;">
                                        <input type="text" v-model="formData.city" class="form-control" :placeholder="$t('settingsLocations.locationModal.city')" required>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="title">{{ $t('settingsLocations.locationModal.address') }} *</label>
                                    <div style="display: flex;">
                                        <input type="text" v-model="formData.address" class="form-control" :placeholder="$t('settingsLocations.locationModal.address')" required>
                                </div>
                            </div>
                            </div>
                        </form>
                    </b-modal>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                         bordered
                                         :busy="!isDataLoaded"
                                         :items="locations"
                                         :fields="columns"
                                         :per-page="locationsPerPage"
                                         :current-page="currentLocationsPage">
                                    <template #table-busy>
                                        <div class="text-center text-primary my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="loading">Loading...</strong>
                                        </div>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="openEditModal(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                        <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="setActivity(data.item)"><i class="ri-shut-down-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentLocationsPage"
                                              v-if="hideLocationsPagination"
                                              :total-rows="locations.length"
                                              :per-page="locationsPerPage"
                                              aria-controls="my-table">
                                </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
                <b-modal v-model="editLocationModal" no-close-on-backdrop size="lg" :title="$t('settingsLocations.editLocationModalHeader')" @close="editLocationModal = false" @cancel="editLocationModal = false" @ok="editLocation" :ok-title="$t('settingsLocations.locationModal.save')" :cancel-title="$t('settingsLocations.locationModal.close')">
                    <form>
                        <div class="form-row">
                            <div class="col-md-12 mb-3">
                                <label for="title">{{ $t('settingsLocations.locationModal.name') }} *</label>
                                <div style="display: flex;">
                                    <input type="text" v-model="formData.name" class="form-control" :placeholder="$t('settingsLocations.locationModal.name')" required>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="title">{{ $t('settingsLocations.locationModal.city') }} *</label>
                                <div style="display: flex;">
                                    <input type="text" v-model="formData.city" class="form-control" :placeholder="$t('settingsLocations.locationModal.city')" required>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="title">{{ $t('settingsLocations.locationModal.address') }} *</label>
                                <div style="display: flex;">
                                    <input type="text" v-model="formData.address" class="form-control" :placeholder="$t('settingsLocations.locationModal.address')" required>
                                </div>
                            </div>
                        </div>
                    </form>
                </b-modal>
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title" style="margin-top: 10px;">{{ $t('settingsLocations.headerInactiveLocations') }}</h4>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-inactive-table"
                                         bordered
                                         :busy="!isInactiveDataLoaded"
                                         :items="inactiveLocations"
                                         :fields="inactiveColumns">
                                    <template #table-busy>
                                        <div class="text-center text-primary my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="loading">Loading...</strong>
                                        </div>
                                    </template>
                                    <template v-slot:cell(i_action)="data">
                                        <b-button variant=" iq-bg-info mr-1 mb-1" size="sm" @click="setActivity(data.item)"><i class="ri-refresh-line m-0"></i></b-button>
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
import { getLocationsList, getInactiveLocationsList, createLocation, updateLocation, toggleActivity } from '../../services/locations'
export default {
  mounted () {
    xray.index()
    this.getLocations()
    this.getInactiveLocations()
  },
  components: {
  },
  computed: {
    hideLocationsPagination () {
      return Math.floor(this.locations.length / this.locationsPerPage) !== 0
    }
  },
  name: 'Locations',
  data: function () {
    return {
      isDataLoaded: false,
      isInactiveDataLoaded: false,
      locations: [],
      inactiveLocations: [],
      addLocationModal: false,
      editLocationModal: false,
      item: [],
      currentLocationsPage: 1,
      locationsPerPage: 10,
      formData: {
        id: '',
        name: '',
        city: '',
        address: ''
      },
      columns: [
        { label: this.$t('settingsLocations.locationsColumn.name'), key: 'name', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.city'), key: 'city', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.address'), key: 'address', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.action'), key: 'action', class: 'text-center' }
      ],
      inactiveColumns: [
        { label: this.$t('settingsLocations.locationsColumn.name'), key: 'i_name', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.city'), key: 'i_city', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.address'), key: 'i_address', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.action'), key: 'i_action', class: 'text-center' }
      ]
    }
  },
  methods: {
    defaultFormData () {
      return {
        name: '',
        city: '',
        address: ''
      }
    },
    getLocations () {
      getLocationsList().then(response => {
        this.locations = response
        this.isDataLoaded = true
      })
    },
    getInactiveLocations () {
      getInactiveLocationsList().then(response => {
        this.inactiveLocations = response
        this.isInactiveDataLoaded = true
      })
    },
    openEditModal (item) {
      this.editLocationModal = true
      this.formData = item
    },
    openAddLocation () {
      this.addLocationModal = true
      this.formData = this.defaultFormData()
    },
    addLocation () {
      createLocation(this.formData).then(() => {
        this.getLocations()
      })
    },
    editLocation () {
      updateLocation(this.formData.id, this.formData).then(() => {
        this.getLocations()
      })
    },
    setActivity (item) {
      toggleActivity(item.id).then(() => {
        this.getLocations()
        this.getInactiveLocations()
      })
    }
  }
}
</script>
