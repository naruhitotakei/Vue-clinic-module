<template>
  <public-layout>
    <!-- Tabs with card integration -->
    <b-card>
      <Order/>
    </b-card>

  </public-layout>
</template>

<script>
import { xray } from '../../config/pluginInit'
import Order from './components/Order/Order.vue'
import PublicLayout from '../../layouts/PublicLayout.vue'

export default {
  components: {
    Order,
    PublicLayout
  },
  name: 'OnlineBookingPublic',
  data: function () {
    return {
      tabIndex: 0
    }
  },
  methods: {
  },
  mounted () {
    xray.index()
  }
}
</script>
