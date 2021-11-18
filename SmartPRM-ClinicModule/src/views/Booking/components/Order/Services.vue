<template>
  <div class="mt-5">
    <service-table
    :ref="`service`"
    :list="service.list"
    :title="service.title"
    :selectedServices="selectedServices"
    @row-selected="rowSelectHandler"
    />
    <div class="text-right">
      <b-button
        align-self="end"
        variant="primary"
        :disabled="!selectedServices.length"
        @click="$emit('change-tab', 1)">
        Choose Time
      </b-button>
    </div>
  </div>
</template>

<script>
import ServiceTable from './ServiceTable.vue'
export default {
  components: { ServiceTable },
  props: {
    services: {
      type: Array,
      default: () => []
    },
    selectedServices: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    service () {
      return this.services.reduce((accumulator, current) => {
        const item = current.list[0]
        accumulator.list.push({
          ...item,
          time: 30
        })

        return accumulator
      }, { list: [] })
    }
  },
  methods: {
    rowSelectHandler: function () {
      let services = []
      this.$refs.service.forEach(serv => {
        services = services.concat(serv.selected)
      })
      this.$emit('row-selected', { services })
    }
  }
}
</script>
