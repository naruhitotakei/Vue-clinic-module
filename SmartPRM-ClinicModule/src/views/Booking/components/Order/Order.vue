<template>
  <div>
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button :variant="activeBtnVariant(0)" @click="tabIndex = 0">Pick service</b-button>
        <b-button :variant="activeBtnVariant(1)" @click="tabIndex = 1" :disabled="!serviceChoosed">Choose time</b-button>
        <b-button :variant="activeBtnVariant(2)" @click="tabIndex = 2" :disabled="!timeChoosed">Review</b-button>
      </b-button-group>

      <!-- <Consultations/> -->
      <Services v-if="tabIndex === 0" @row-selected="selectServiceHandler" :items="servicesList" :selectedIndexes="selectedIndexes"/>
      <ChooseTimeTab v-else-if="tabIndex === 1" />
      <ChooseTimeTab v-else-if="tabIndex === 2" />
    </div>
    <div class="text-right">
      <b-button
        v-if="tabIndex === 0"
        align-self="end"
        variant="primary"
        :disabled="!serviceChoosed"
        @click="tabIndex++">
        Choose Time
      </b-button>
    </div>
  </div>
</template>

<script>
import ChooseTimeTab from './ChooseTimeTab'
// import { xray } from '../../../config/pluginInit'
import Services from './Services'
// import Consultations from './Consultations'

export default {
  components: {
    Services,
    ChooseTimeTab
    // Consultations
  },
  name: 'Order',
  data: function () {
    return {
      tabIndex: 1,
      timeChoosed: false,
      selectedServices: [],
      servicesList: [
        { id: 1, serviceName: 'consultation 1', time: '10 minutes', price: '$30' },
        { id: 2, serviceName: 'consultation 2', time: '20 minutes', price: '$50' },
        { id: 3, serviceName: 'consultation 3', time: '30 minutes', price: '$70' },
        { id: 4, serviceName: 'consultation 4', time: '40 minutes', price: '$100' }
      ]
    }
  },
  methods: {
    selectServiceHandler (data) {
      this.selectedServices = data
    },
    activeBtnVariant: function (tabIindex) {
      return tabIindex === this.tabIndex ? 'primary' : null
    }
  },
  computed: {
    serviceChoosed: function () {
      return !!this.selectedServices.length
    },
    selectedIndexes: function () {
      const indexes = []
      this.selectedServices.forEach(service => {
        const index = this.servicesList.findIndex(searchedService => {
          return searchedService.id === service.id
        })
        index !== -1 && indexes.push(index)
      })
      return indexes
    }
  }
  // mounted () {
  //   xray.index()
  // }
}
</script>
