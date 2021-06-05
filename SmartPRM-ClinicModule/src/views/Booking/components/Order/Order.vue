<template>
  <div>
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button :variant="activeBtnVariant(0)" @click="tabIndex = 0">Pick service</b-button>
        <b-button :variant="activeBtnVariant(1)" @click="tabIndex = 1" :disabled="!serviceChoosed">Choose time</b-button>
        <b-button :variant="activeBtnVariant(2)" @click="tabIndex = 2" :disabled="!selectedSlot">Review</b-button>
      </b-button-group>

      <!-- <Consultations/> -->
      <Services v-if="tabIndex === 0" @row-selected="selectServiceHandler" :services="servicesList" :selectedServices="selectedServices"/>
      <ChooseTimeTab v-else-if="tabIndex === 1"
      :services="selectedServices"
      :totalPrice="totalPrice"
      :selectedDate="selectedDate"
      :doctor="selectedDoctor"
      :time="selectedTime"
      :selectedSlot="selectedSlot"
      @select-date="dateSelectionHandler"
      @select-doctor="doctorSelectionHandler"
      @change-tab="changeTab"
      />
      <ReviewTab v-else-if="tabIndex === 2" />
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
import ReviewTab from './ReviewTab'
// import { xray } from '../../../config/pluginInit'
import Services from './Services'
// import Consultations from './Consultations'
import { servicesList } from '@/views/Booking/booking-data.js'

export default {
  components: {
    Services,
    ChooseTimeTab,
    ReviewTab
    // Consultations
  },
  name: 'Order',
  data: function () {
    return {
      tabIndex: 1,
      timeChoosed: false,
      servicesList,
      selectedServices: [],
      totalPrice: 0,
      selectedDate: null,
      selectedDoctor: null,
      selectedTime: '',
      selectedSlot: null
    }
  },
  computed: {
    serviceChoosed: function () {
      return !!this.selectedServices.length
    }
  },
  watch: {
    selectedServices: {
      immediate: true,
      handler: function (value) {
        let price = 0
        if (value.length) {
          value.forEach(item => { price = price + item.price })
        }
        this.totalPrice = price
      }
    }
  },
  methods: {
    selectServiceHandler ({ services }) {
      this.selectedServices = services
    },
    activeBtnVariant: function (tabIindex) {
      return tabIindex === this.tabIndex ? 'primary' : null
    },
    dateSelectionHandler: function (date) {
      this.selectedDate = date
    },
    doctorSelectionHandler: function (data) {
      this.selectedDoctor = data.doctor
      this.selectedTime = data.time
      this.selectedSlot = {
        date: this.selectedDate,
        time: data.time,
        doctor: data.doctor
      }
    },
    changeTab: function (tab) {
      this.tabIndex = tab
    }
  }
}
</script>
