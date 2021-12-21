<template>
  <div>
    <h3>You have successfully booked an appointment!</h3>
    <div class="mt-3"></div>
    <div>
      {{ $t('public.onlineBooking.selectedSlot') }}:
      <b>
        {{ order.appointmentSlot.starts_at | formatFullDate({ lang: $i18n.locale }) }}
        {{ $t('public.onlineBooking.at') }}
        {{ time }}
      </b>
    </div>
    <div>
      {{ $t('public.onlineBooking.location') }}:
      <b>
        {{ premise.name }}, {{ premise.address }}
      </b>
    </div>
    <div>
      {{ $t('public.onlineBooking.company') }}:
      <b>
        {{ premise.company_name }}
      </b>
    </div>
    <div>
      {{ $t('public.onlineBooking.service') }}:
      <b>
        {{ order.service.text }}
      </b>
    </div>
    <div>
      {{ $t('public.onlineBooking.doctor') }}:
      <b>
        {{ order.appointmentSlot.name }}
      </b>
    </div>
    <div class="mt-3"></div>

    <b-button variant="primary" @click="$emit('update:order', null)">Book another appointment</b-button>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'

export default defineComponent({
  props: {
    order: {
      type: Object,
      required: true
    },
    premise: {
      type: Object,
      required: true
    }
  },
  computed: {
    time () {
      return moment(this.order.appointmentSlot.starts_at).format('HH:mm')
    }
  }
})
</script>
