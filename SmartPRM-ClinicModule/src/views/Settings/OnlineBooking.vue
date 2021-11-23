<template>
    <div class="container">
        <h1>Online Booking</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'

export default {
  name: 'OnlineBooking',
  components: {
  },
  mounted () {
    xray.index()
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
