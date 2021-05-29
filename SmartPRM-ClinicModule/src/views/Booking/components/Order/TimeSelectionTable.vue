<template>
  <div class="mt-5">
    <b-table
      :items="items"
      :fields="fields"
      responsive="sm"
    >
      <template #cell(doctors)="data">
        <time-selection-table-row :doctors="data.value" @select-doctor="$emit('select-doctor', {doctor: $event, time: data.item.time})" />
      </template>
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
        </template>
      </template>
    </b-table>
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
    }
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
  }
}
</script>
