<template>
  <div>
      <div class="mb-3">
        <b-collapse :id="tabId" visible appear>
          <b-table
          :items="list"
          :fields="fields"
          :select-mode="selectMode"
          responsive="sm"
          ref="selectableTable"
          selectable
          @row-selected="selectedRowHandler"
          >
          <template #head(serviceName)>
            <span>Service</span>
          </template>
          <template #cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span aria-hidden="true">&check;</span>
            </template>
          </template>
          </b-table>
        </b-collapse>
      </div>
    </div>
</template>

<script>
import { servicesList } from '@/views/Booking/booking-data.js'

export default {
  props: {
    selectedServices: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    title: String,
    tabId: String
  },
  data () {
    return {
      fields: [ { key: 'serviceName', label: this.title, tdClass: 'w-50' }, 'time', 'price', { key: 'selected', label: ' ', tdClass: 'checkColumn' } ],
      selectMode: 'multi',
      selected: []
    }
  },
  methods: {
    selectedRowHandler: function (data) {
      this.selected = data
      this.$emit('row-selected')
    },
    getSelectedItems: function () {
      return this.selected
    },
    setSelectedItems: function () {
      const services = servicesList.find(serv => serv.title === this.title).list
      this.selectedServices.forEach(service => {
        const index = services.findIndex(searchedService => {
          return searchedService.id === service.id
        })
        index !== -1 && this.$refs.selectableTable.selectRow(index)
      })
    }
  },
  mounted () {
    (!!this.$refs.selectableTable && !!this.selectedServices.length) && this.setSelectedItems()
  }
}
</script>
<style>
.checkColumn{
  width: 50px;
}
</style>
