<template>
  <div>
    <h5 class="text-left">Check selected slot and confirm reservation.</h5>
    <div class="selected-slot p-2 my-3">Selected slot: {{selectedSlot.date | formatFullDate}} at {{selectedSlot.time}}</div>
     <b-table
      :items="services"
      :fields="fields"
      responsive="sm"
    >
      <template #cell(doctor)>
        <div class="d-flex align-items-center p-1">
        <img class="img-fluid avatar-40 rounded-circle mr-1" :src="selectedSlot.doctor.img" :alt="selectedSlot.doctor.name">
        <p class="mb-0">{{selectedSlot.doctor.name}}</p>
        </div>
      </template>
      <template #cell(time)="data">
        {{data.value | formatTime}}
      </template>
      <template #cell(price)="data">
        {{data.value | formatMoney}}
      </template>
      <template #custom-foot>
        <tr>
            <td><b>TOTAL</b></td>
            <td></td>
            <td>{{totalTime | formatTime}}</td>
            <td>{{totalPrice | formatMoney}}</td>
        </tr>
    </template>
    </b-table>
    <div class="d-flex justify-content-between mt-3">
      <b-button
        align-self="end"
        variant="primary"
        @click="$emit('change-tab', 1)">
        Slots and Prices
      </b-button>
      <b-button
        align-self="end"
        variant="primary"
        :disabled="!selectedSlot"
        v-b-modal.confirm-modal>
        Confirm
      </b-button>
    </div>
    <SMSCodeModal :selectedSlot="selectedSlot" :services="services" />
  </div>
</template>

<script>
import SMSCodeModal from './SMSCodeModal.vue'
export default {
  components: {
    SMSCodeModal
  },
  props: {
    services: Array,
    totalPrice: Number,
    selectedSlot: Object
  },
  data: function () {
    return {
      fields: [
        { key: 'serviceName', label: '' },
        { key: 'doctor', label: '' },
        { key: 'time', label: '' },
        { key: 'price', label: `Start at ${this.selectedSlot.time}` }
      ]
    }
  },
  computed: {
    totalTime: function () {
      return this.services.reduce((total, service) => total + service.time, 0)
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/app-vars.scss";
.selected-slot{
    border: 3px solid $primary-60;
    font-size: 16px;
    color: $black;
}</style>
