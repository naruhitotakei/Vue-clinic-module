<template>
  <div>
    <div>you have successfully booked an appointment</div>
    <div>
      {{ $t('public.onlineBooking.selectedSlot') }}:
      {{ order.appointmentSlot.starts_at | formatFullDate({ lang: $i18n.locale }) }}
      {{ $t('public.onlineBooking.at') }}
      {{ time }}
    </div>
    <div>
      {{ $t('public.onlineBooking.location') }}:
      {{ premise.name }}, {{ premise.address }}
    </div>
    <div>
      {{ $t('public.onlineBooking.company') }}:
      {{ }}
    </div>
    <div>
      {{ $t('public.onlineBooking.service') }}:
      {{ order.service.text }}
    </div>
    <div>
      {{ $t('public.onlineBooking.doctor') }}:
      {{ order.appointmentSlot.name }}
    </div>

    <button @click="$emit('update:order', null)">one reservation</button>
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
