<template>
  <b-table
    :items="items"
    :fields="fields"
    responsive="sm"
  >
    <template #cell(doctors)="data">
      <time-selection-table-row
        :doctors="data.value"
        :appointment-slot="appointmentSlot"
        @update:appointment-slot="$emit('update:appointment-slot', $event)"
        :activeDoctor="getActiveDoctor(data.item.time)"
        @select-doctor="$emit('select-doctor', {doctor: $event, time: data.item.time})"
      />
    </template>
  </b-table>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import TimeSelectionTableRow from './TimeSelectionTableRow.vue'

export default defineComponent({
  components: {
    TimeSelectionTableRow
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    appointmentSlot: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      selected: []
    }
  },
  computed: {
    fields () {
      return [
        { key: 'time', label: this.$t('public.onlineBooking.time') },
        { key: 'doctors', label: this.$t('public.onlineBooking.availableDoctors') },
        { key: 'totalPrice' }
      ]
    }
  },
  mounted () {
    // this.selectedIndexes.forEach(itemIndex => {
    //   this.$refs.selectableTable.selectRow(itemIndex)
    // })
  },
  methods: {
    getActiveDoctor: function (time) {
      return (this.selectedSlot && this.selectedDate.getDate() === this.selectedSlot.date.getDate() && time === this.selectedSlot.time) ? this.selectedSlot.doctor : null
    }
  }
})
</script>
