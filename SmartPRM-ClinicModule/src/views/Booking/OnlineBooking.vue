<template>
  <div>
    <!-- Tabs with card integration -->
    <b-card>
      <Order/>
    </b-card>
  </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
import Order from './components/Order/Order'

export default {
  components: {
    Order
  },
  name: 'OnlineBooking',
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
