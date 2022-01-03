<template>
  <public-layout #default="{ premise }">
    <b-card>
      <Order v-if="order == null" @confirmed="order = $event"/>
      <SuccessOrder v-if="order != null" :order.sync="order" :premise="premise"/>
    </b-card>
  </public-layout>
</template>

<script>
import { xray } from '@/config/pluginInit'
import Order from '@/views/Booking/components/Order/Order.vue'
import SuccessOrder from '@/views/Booking/components/Order/SuccessOrder.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

export default {
  components: {
    Order,
    SuccessOrder,
    PublicLayout,
  },
  name: 'OnlineBookingPublic',
  data: function() {
    return {
      order: null,
    }
  },
  mounted() {
    xray.index()
  },
}
</script>
