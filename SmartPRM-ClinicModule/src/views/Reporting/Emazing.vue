<template>
    <div class="container">
        <iq-card>
          <template v-slot:headerTitle>
            <h3 class="card-title">Emazing</h3>
          </template>
          <!-- <template v-slot:headerAction>
            <a class="text-primary float-right" v-b-toggle.collapse-4 role="button">
              <i class="ri-code-s-slash-line" />
            </a>
          </template> -->
          <template v-slot:body>
            <div class="row">
          <b-form-group class="col-md-3">
              <b-form-select plain v-model="selected2" :options="options2" class="mb-3" style="padding: 10px;">
                  <b-form-select-option :value="null">All invoice recipients</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group class="col-md-2">
              <b-form-select plain v-model="selected3" :options="options3" class="mb-3" style="padding: 10px;">
                  <b-form-select-option :value="null">Custom</b-form-select-option>
              </b-form-select>
            </b-form-group>
              <label style="padding: 10px 0px;">From:</label>
            <b-form-group label-for="exampleInputdate" class="col-md-2">
                <b-form-input id="exampleInputdate" type="date" value="2021-03-03"></b-form-input>
              </b-form-group>
              <label style="padding: 10px 0px;">To:</label>
            <b-form-group label-for="exampleInputdate" class="col-md-2">
                <b-form-input id="exampleInputdate" type="date" value="2021-03-03"></b-form-input>
            </b-form-group>
            </div>
            <h5 class="card-title">Services summary</h5>
            <b-table small :items="items1" class="mb-0"></b-table>
            <b-table small :items="items2" class="mb-0" thead-class="hidden_header"></b-table>
            <b-table small :items="items3" class="mb-0" thead-class="hidden_header"></b-table>
            <b-table small :items="items4" class="mb-0" thead-class="hidden_header"></b-table>
          </template>
        </iq-card>
    </div>
</template>

<script>
export default {
  components: {
  },
  name: 'Emazing',
  data: function () {
    return {
      options2: [
        { value: 'a', text: 'One' },
        { value: 'b', text: 'Two' },
        { value: 'c', text: 'Three' }
      ],
      options3: [
        { value: '1', text: 'One' },
        { value: '2', text: 'Two' },
        { value: '3', text: 'Three' }
      ],
      selected2: null,
      selected3: null,
      items1: [
        { service_title: 'General dentistry', service_count: 245, amount: '48.805,55', _rowVariant: 'active' },
        { service_title: 'Dental procedure', service_count: 242, amount: '48.260,55' },
        { service_title: 'Ekstrakcija zoba', service_count: 2, amount: '395,00' },
        { service_title: 'Zalivka | Plomba', service_count: 1, amount: '150,00' }
      ],
      items2: [
        { service_title: 'Preventry dentistry', service_count: 1, amount: '50,55', _rowVariant: 'active' },
        { service_title: 'Zobni kamen', service_count: 242, amount: '48.260,55' }
      ],
      items3: [
        { service_title: 'Consultation', service_count: 1, amount: '35,00', _rowVariant: 'active' },
        { service_title: 'Consultation', service_count: 1, amount: '35,00' }
      ],
      items4: [
        { service_title: 'Sum', service_count: 247, amount: '48.890,00', _rowVariant: 'active' }
      ],
      columns: [
        { label: 'Service Title', key: 'service_title', class: 'text-left' },
        { label: 'Service Count', key: 'service_count', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' }
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style>
.hidden_header {
  display: none;
}
</style>
