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
        {{ $t('public.onlineBooking.chooseTime') }}
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
      let id = 1

      return this.services.reduce((accumulator, current, index) => {
        const item = current.list[0]
        accumulator.list.push({
          ...item,
          id: id + index,
          time: 30
        })

        return accumulator
      }, { list: [] })
    }
  },
  methods: {
    rowSelectHandler: function () {
      let services = []
      services = services.concat(this.$refs.service.selected)
      this.$emit('row-selected', { services })
    }
  }
}
</script>
