<template>
  <div class="mt-5">
    <b-table
      :items="items"
      :fields="fields"
      select-mode="multi"
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
      fields: [ { key: 'time', label: 'Consultation Time' }, { key: 'selected', label: ' ' } ],
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
