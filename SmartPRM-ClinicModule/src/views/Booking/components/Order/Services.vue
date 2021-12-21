<template>
  <div v-if="services.length > 0" class="mt-5">
    <b-table
      :items="services"
      :fields="[
        { key: 'serviceName', label: $t('public.onlineBooking.service'), tdClass: 'w-50' },
        { key: 'time', label: $t('public.onlineBooking.time') },
        { key: 'price', label: $t('public.onlineBooking.price') },
        { key: 'selected', label: '', tdClass: 'checkColumn' }
      ]"
      select-mode="single"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="fieldset.service = $event[0]"
    >
      <template #cell(selected)="{ rowSelected }">
        <span :style="{ 'color': rowSelected ? '' : 'transparent' }" aria-hidden="true">&check;</span>
      </template>
    </b-table>
    <div class="text-right">
      <b-button
        align-self="end"
        variant="primary"
        :disabled="fieldset.service == null"
        @click="$emit('next')"
      >
        {{ $t('public.onlineBooking.chooseTime') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { getOnlineBookingProductsPublic } from '@/services/onlineBookingService'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    form: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      fieldset: {
        service: null
      },
      services: []
    }
  },

  watch: {
    fieldset: {
      deep: true,
      handler (value) {
        this.$emit('update:form', {
          ...this.form,
          ...value
        })
      }
    },

    '$i18n.locale': {
      immediate: true,
      async handler (locale) {
        this.services = []
        const services = await getOnlineBookingProductsPublic(locale)
        this.services = services.map((service) => ({
          ...service,
          serviceName: service.text,
          time: service.default_duration,
          price: parseFloat(service.default_online_price)
        }))
      }
    }
  }
})
</script>
