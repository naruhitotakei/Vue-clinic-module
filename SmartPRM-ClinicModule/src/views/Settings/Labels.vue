<template>
  <b-container fluid>
    <b-row style="justify-content: center;">
      <b-col lg="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height todaysAssignments-body">
          <template v-slot:headerTitle>
            <div class="row justify-content-between pl-3 pr-3">
              <h4 class="card-title">Labels</h4>
              <div class="btn-add-patient  mt-0">
                <b-button variant="primary" @click="modalLabelsShow = true"><i
                    class="ri-add-line mr-2"></i>New Label
                </b-button>
              </div>
            </div>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table
                    id="patients-table"
                    bordered
                    hover
                    :busy="!isDataLoaded"
                    style="cursor: pointer;"
                    :items="labels"
                    :fields="columns"
                >
                  <template #table-busy>
                    <div class="text-center text-primary my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="loading">Loading...</strong>
                    </div>
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="deleteItem(data.item)"><i class="ri-close-circle-fill m-0"></i></b-button>
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
import { getLabels } from '@/services/calendarService'

export default {
  components: {},
  name: 'Labels',
  mounted () {
    xray.index()
    this.getLabels(this.$i18n.locale)
  },
  data: function () {
    return {
      columns: [
        { label: 'ID', key: 'id', class: 'text-left' },
        { label: 'Text', key: 'color', class: 'text-left' },
        { label: 'Type', key: 'type', class: 'text-left' },
        { label: 'Color', key: 'color', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center action-column' }
      ],
      labels: [],
      isDataLoaded: false
    }
  },
  watch: {
    '$i18n.locale' () {
      this.getLabels(this.$i18n.locale)
    }
  },
  methods: {
    getLabels (lang) {
      this.isDataLoaded = false
      getLabels(lang).then(data => {
        this.labels = data
        this.isDataLoaded = true
      })
    },
    deleteItem (item) {
      console.log(item)
    }
  }
}
</script>
