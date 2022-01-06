<template>
  <div class="mt-5">
    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
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
  data() {
    return {
      fields: [ { key: 'serviceName', label: 'Consultation Name' }, 'time', 'price', { key: 'selected', label: ' ' } ],
      items: [
        { serviceName: 'consultation 1', time: '10 minutes', price: '$30' },
        { serviceName: 'consultation 2', time: '20 minutes', price: '$50' },
        { serviceName: 'consultation 3', time: '30 minutes', price: '$70' },
        { serviceName: 'consultation 4', time: '40 minutes', price: '$100' },
      ],
      selectMode: 'multi',
      selected: [],
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
    },
  },
}
</script>
