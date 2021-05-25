<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">{{ $t('settingsLocations.headerLocations') }}</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="editLocationModal = true"><i class="ri-add-line mr-2"></i>{{ $t('settingsLocations.addLocation') }}</b-button>
                        </div>
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
                                    <template v-slot:cell(action)="data">
                                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="openEditModal(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                     <!-- <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeProductCategory(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button> -->
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-modal v-model="editLocationModal" no-close-on-backdrop size="lg" :title="$t('settingsLocations.editLocationModal.header')" @close="editLocationModal = false" @cancel="editLocationModal = false" @ok="addLocation" :ok-title="$t('settingsUsers.editProfileModal.save')" :cancel-title="$t('settingsUsers.editProfileModal.close')">
            <form>
                <div class="form-row">
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('settingsLocations.editLocationModal.name') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.name" class="form-control" :placeholder="$t('settingsLocations.editLocationModal.name')" required>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('settingsLocations.editLocationModal.city') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.city" class="form-control" :placeholder="$t('settingsLocations.editLocationModal.city')" required>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('settingsLocations.editLocationModal.address') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.address" class="form-control" :placeholder="$t('settingsLocations.editLocationModal.address')">
                        </div>
                    </div>
                </div>
            </form>
        </b-modal>
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { getLocationsList, createLocation } from '../../services/locations'
export default {
  components: {
  },
  name: 'Locations',
  data: function () {
    return {
      isDataLoaded: false,
      locations: [],
      editLocationModal: false,
      item: [],
      formData: {
        name: '',
        city: '',
        address: ''
      },
      defaultFormData: {
        name: '',
        city: '',
        address: ''
      },
      columns: [
        { label: this.$t('settingsLocations.locationsColumn.name'), key: 'name', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.city'), key: 'city', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.address'), key: 'address', class: 'text-left' },
        { label: this.$t('settingsLocations.locationsColumn.action'), key: 'action', class: 'text-center' }
      ]
    }
  },
  methods: {
    getLocations () {
      getLocationsList().then(response => {
        this.locations = response
        this.toggleDataLoaded()
      })
    },
    toggleDataLoaded () {
      this.isDataLoaded = !this.isDataLoaded
    },
    openEditModal (item) {
      this.editLocationModal = true
      this.formData = item
    },
    addLocation () {
      createLocation(this.formData).then(() => {
        this.getLocations()
      })
    }
  },
  mounted () {
    xray.index()
    this.getLocations()
  }
}
</script>
