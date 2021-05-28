<template>
  <div>
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button variant="warning" @click="tabIndex--">Pick service</b-button>
        <b-button @click="tabIndex++" :disabled="!serviceChoosed">Choose time</b-button>
        <b-button @click="tabIndex++" :disabled="!timeChoosed">Review</b-button>
      </b-button-group>

      <!-- <Consultations/> -->
      <Services @selectedItems="selected"/>
    </div>
    <div class="text-right">
      <b-button align-self="end" variant="dark" :disabled="!serviceChoosed">Choose Time</b-button>
    </div>
  </div>
</template>

<script>
// import { xray } from '../../../config/pluginInit'
import Services from './Services'
// import Consultations from './Consultations'

export default {
  components: {
    Services
    // Consultations
  },
  name: 'Order',
  data: function () {
    return {
      tabIndex: 0,
      serviceChoosed: false,
      timeChoosed: false
    }
  },
  methods: {
    selected (data) {
      console.log(data)
    }
  }
  // mounted () {
  //   xray.index()
  // }
}
</script>
