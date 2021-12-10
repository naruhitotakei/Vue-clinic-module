<template>
  <div class="mt-5">
    <service-table
    :ref="`service`"
    :list="services"
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
import { getOnlineBookingProductsPublic } from '@/services/onlineBookingService'
import ServiceTable from './ServiceTable.vue'

export default {
  components: { ServiceTable },
  props: {
    selectedServices: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      services: []
    }
  },
  watch: {
    '$i18n.locale': {
      immediate: true,
      async handler (locale) {
        const services = await getOnlineBookingProductsPublic(locale)
        this.services = services.map((service) => ({
          ...service,
          serviceName: service.text,
          time: service.default_duration,
          price: parseFloat(service.default_online_price)
        }))
      }
    }
  },
  async mounted () {
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
