<template>
  <div class="text-center">
    <b-button-group class="mt-2">
      <b-button :variant="activeBtnVariant(0)" @click="changeTab(0)">Pick service</b-button>
      <b-button :variant="activeBtnVariant(1)" @click="changeTab(1)" :disabled="!serviceChoosed">Choose time</b-button>
      <b-button :variant="activeBtnVariant(2)" @click="changeTab(2)" :disabled="!serviceChoosed || !selectedSlot">Review</b-button>
    </b-button-group>

    <!-- <Consultations/> -->
    <Services
    v-if="tabIndex === 0"
    :services="servicesList"
    :selectedServices="selectedServices"
    @row-selected="selectServiceHandler"
    @change-tab="changeTab"
    />
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
    <ReviewTab v-else-if="tabIndex === 2"
    :selectedSlot="selectedSlot"
    :services="selectedServices"
    :totalPrice="totalPrice"
    @change-tab="changeTab"
    />
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
        this.totalPrice = value.reduce((total, service) => total + service.price, 0)
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
      if (tab === 0) {
        this.tabIndex = tab
      } else if (tab === 1 && !!this.selectedServices.length) {
        this.tabIndex = tab
      } else if (tab === 2 && !!this.selectedServices.length && this.selectedSlot) {
        this.tabIndex = tab
      }
    }
  }
}
</script>
