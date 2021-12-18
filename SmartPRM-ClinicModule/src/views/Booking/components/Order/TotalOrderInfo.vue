<template>
  <div class="total-card d-flex flex-column app-border overflow-hidden p-3">
    <h4 class="primary-color" >{{ $t('public.onlineBooking.totalInfo') }}</h4>
    <div class="text-left">
    <div>
      {{ $t('public.onlineBooking.date') }}:
      <b>{{ order.appointmentSlot.starts_at | formatDate({ lang: $i18n.locale }) }}</b>
    </div>
    <div>
      {{ $t('public.onlineBooking.time') }}:
      <b>{{ time }}</b>
    </div>
    <hr />
    <div class="d-flex align-items-center p-1">
      <img
        class="img-fluid avatar-40 rounded-circle mr-1"
        :src="`/api/files/avatar/${order.appointmentSlot.doctor_id}`"
        :alt="order.appointmentSlot.name"
      >
      <p class="mb-0">{{ order.appointmentSlot.name }}</p>
      </div>
    </div>
    <div>
      <div class="service-item d-flex flex-column py-2">
        <h5 class="text-left primary-color mb-1">{{ order.service.serviceName }}</h5>
        <div class="d-flex justify-content-between">
          <p class="mb-0">{{ order.service.time }}</p>
          <h5>${{ order.service.price }}</h5>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-end service-item pt-3">
        <h5 class="primary-color">{{ $t('public.onlineBooking.total') }}:</h5>
        <h4 class="ml-2">${{ order.service.price }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    order: Object
  },
  computed: {
    time () {
      return moment(this.order.appointmentSlot.starts_at).format('HH:mm')
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/app-vars.scss";
.total-card{
  border-color: $primary;
  color: $gray-700;
}
.service-item{
  border-top: 1px solid $primary-20
}
</style>
