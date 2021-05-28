<template>
  <div class="mt-5">
    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="$emit('row-selected', $event)"
    >
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
        </template>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    selectedIndexes: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      fields: [ { key: 'serviceName', label: 'Consultation Name' }, 'time', 'price', { key: 'selected', label: ' ' } ],
      selectMode: 'multi',
      selected: []
    }
  },
  methods: {
  },
  mounted () {
    this.selectedIndexes.forEach(itemIndex => {
      this.$refs.selectableTable.selectRow(itemIndex)
    })
  }
}
</script>
