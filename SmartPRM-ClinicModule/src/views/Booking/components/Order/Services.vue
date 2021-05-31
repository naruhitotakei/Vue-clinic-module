<template>
  <div class="mt-5">
    <service-table
    v-for="(service, index) in services"
    :key="`service_section_${index}`"
    :ref="`service`"
    :list="service.list"
    :title="service.title"
    :selectedServices="selectedServices"
    :tabId="`${index}_tab`"
    @row-selected="rowSelectHandler"
    />
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
