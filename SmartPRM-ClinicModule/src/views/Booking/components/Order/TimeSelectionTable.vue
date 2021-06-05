<template>
  <div class="mt-5">
    <template v-if="items.length > 0">
    <b-table
      :items="items"
      :fields="fields"
      responsive="sm"
    >
      <template #cell(doctors)="data">
        <time-selection-table-row
        :doctors="data.value"
        :activeDoctor="getActiveDoctor(data.item.time)"
        @select-doctor="$emit('select-doctor', {doctor: $event, time: data.item.time})"
        />
      </template>
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
        </template>
      </template>
    </b-table>
    </template>
    <template v-else>
      No available slots on this day
    </template>
  </div>
</template>

<script>
import TimeSelectionTableRow from './TimeSelectionTableRow.vue'
export default {
  components: {
    TimeSelectionTableRow
  },
  props: {
    title: String,
    selectedIndex: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    selectedSlot: Object,
    selectedDate: Date
  },
  data () {
    return {
      fields: [ { key: 'time', label: 'Time' }, { key: 'doctors', label: 'Available Doctors' }, { key: 'totalPrice', label: ' ' } ],
      selected: []
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
}
</script>
