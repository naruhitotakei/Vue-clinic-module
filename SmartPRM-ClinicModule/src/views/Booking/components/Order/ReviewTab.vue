<template>
  <div>
    <div class="selected-slot p-2 my-3">
      {{ $t('public.onlineBooking.selectedSlot') }}:
      {{ form.appointmentSlot.starts_at | formatFullDate({ lang: $i18n.locale }) }}
      {{ $t('public.onlineBooking.at') }}
      {{ time }}
    </div>
     <b-table
      :items="[form.service]"
      :fields="[
        { key: 'serviceName', label: $t('public.onlineBooking.service') },
        { key: 'doctor', label: $t('public.onlineBooking.doctor') },
        { key: 'time', label: $t('public.onlineBooking.time') },
        { key: 'price', label: $t('public.onlineBooking.price') }
      ]"
      responsive="sm"
    >
      <template #cell(doctor)>
        <div class="d-flex align-items-center p-1">
          <img
            class="img-fluid avatar-40 rounded-circle mr-1"
            :src="`/api/files/avatar/${form.appointmentSlot.doctor_id}`"
            :alt="form.appointmentSlot.name"
          >
          <p class="mb-0">{{ form.appointmentSlot.name }}</p>
        </div>
      </template>
      <template #cell(time)="data">
        {{ data.value | formatTime }}
      </template>
      <template #cell(price)="data">
        {{ data.value | formatMoney }}
      </template>
    </b-table>
    <div class="d-flex justify-content-between mt-3">
      <b-button
        align-self="end"
        variant="primary"
        @click="$emit('next', -1)"
      >
        {{ $t('public.onlineBooking.slotsAndPrices') }}
      </b-button>
      <b-button
        align-self="end"
        variant="primary"
        v-b-modal.confirm-modal
      >
        {{ $t('public.onlineBooking.confirm') }}
      </b-button>
    </div>
    <SMSCodeModal
      :form="form"
      @update:form="$emit('update:form', $event)"
      @next="$emit('next')"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'
import SMSCodeModal from './SMSCodeModal.vue'

export default defineComponent({
  components: {
    SMSCodeModal,
  },
  props: {
    form: Object,
  },
  computed: {
    time() {
      return moment(this.form.appointmentSlot.starts_at).format('HH:mm')
    },
  },
})
</script>

<style lang="scss">
@import "~@/assets/scss/app-vars.scss";
.selected-slot{
    border: 3px solid $primary-60;
    font-size: 16px;
    color: $black;
}</style>
