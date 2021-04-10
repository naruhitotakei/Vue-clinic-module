<template>
    <div class="container-fluid">
        <iq-card>
          <template v-slot:headerTitle>
            <div class="row pt-3">
          <b-form-group class="col-md-3">
              <b-form-select plain v-model="selected2" :options="options2" style="padding: 10px;">
                  <b-form-select-option :value="null">All invoice recipients</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group class="col-md-2">
              <b-form-select plain v-model="selected3" :options="options3" style="padding: 10px;">
                  <b-form-select-option :value="null">Custom</b-form-select-option>
              </b-form-select>
            </b-form-group>
              <label style="padding-top: 8px;">From:</label>
            <b-form-group label-for="exampleInputdate" class="col-md-2">
                <b-form-input id="exampleInputdate" type="date" value="2021-03-03"></b-form-input>
              </b-form-group>
              <label style="padding-top: 8px;">To:</label>
            <b-form-group label-for="exampleInputdate" class="col-md-2">
                <b-form-input id="exampleInputdate" type="date" value="2021-03-03"></b-form-input>
            </b-form-group>
            </div>
          </template>
        </iq-card>
        <iq-card>
          <template v-slot:body>
            <h5 class="card-title">Services summary</h5>
            <b-table small :items="items1" class="mb-0" :tbody-tr-class="table-success"></b-table>
          </template>
        </iq-card>
        <iq-card>
          <template v-slot:body>
            <h5 class="card-title">Services list</h5>
            <b-table small :items="items2" class="mb-0" :tbody-tr-class="table-success"></b-table>
          </template>
        </iq-card>
    </div>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card.vue'
export default {
  components: {
    IqCard
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
      columns: [
        { label: 'Service Title', key: 'service_title', class: 'text-left' },
        { label: 'Service Count', key: 'service_count', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' }
      ],
      items1: [
        { service_title: 'General dentistry', service_count: 245, amount: '48.805,55', _rowVariant: 'active' },
        { service_title: 'Dental procedure', service_count: 242, amount: '48.260,55' },
        { service_title: 'Ekstrakcija zoba', service_count: 2, amount: '395,00' },
        { service_title: 'Zalivka | Plomba', service_count: 1, amount: '150,00' },
        { service_title: 'Preventry dentistry', service_count: 1, amount: '50,55', _rowVariant: 'active' },
        { service_title: 'Zobni kamen', service_count: 242, amount: '48.260,55' },
        { service_title: 'Consultation', service_count: 1, amount: '35,00', _rowVariant: 'active' },
        { service_title: 'Consultation', service_count: 1, amount: '35,00' },
        { service_title: 'Sum', service_count: 247, amount: '48.890,00', _rowVariant: 'active' }
      ],
      columns2: [
        { label: 'Service date', key: 'service_date', class: 'text-left' },
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Lead name', key: 'lead_name', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' },
        { label: 'Fee', key: 'fee', class: 'text-left' },
        { label: 'Location', key: 'location', class: 'text-left' },
        { label: 'Doctor', key: 'doctor', class: 'text-left' },
        { label: 'Last Consultant Location', key: 'last_consultant_location', class: 'text-left' }
      ],
      items2: [
        { service_date: 'General dentistry', title: '', lead_name: '', amount: '', fee: '', location: '', doctor: '', last_consultant_location: '', _rowVariant: 'active' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Boris Sekardi', amount: '35,00€', fee: '5,95€', location: 'Spondnje Skofije- Scoffle di Sotto', doctor: 'Mirjana Tavcar', last_consultant_location: '' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Darko Skubic', amount: '35,00€', fee: '5,95€', location: 'Spondnje Skofije- Scoffle di Sotto', doctor: 'Mirjana Tavcar', last_consultant_location: 'Spondnje Skofije- Scoffle di Sotto' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Hana Hostak', amount: '30,00€', fee: '5,10€', location: 'Ljublijana', doctor: 'Mateja Mlinaric', last_consultant_location: 'Ljublijana' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Iviana Rotter-Zeli dr Mirjano', amount: '5.025€', fee: '854,25€', location: 'Spondnje Skofije- Scoffle di Sotto', doctor: 'Mirjana Tavcar', last_consultant_location: 'Spondnje Skofije- Scoffle di Sotto' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'kladivar Slavica', amount: '35,00€', fee: '5,10€', location: 'Sencur-zobozdravnik', doctor: 'Mateja Mlinaric', last_consultant_location: '' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Robert Omcikus', amount: '35,00€', fee: '5,95€', location: 'Spondnje Skofije- Scoffle di Sotto', doctor: 'Mirjana Tavcar', last_consultant_location: '' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Shqipe Ademaj', amount: '35,00€', fee: '5,95€', location: 'Spondnje Skofije- Scoffle di Sotto', doctor: 'Mirjana Tavcar', last_consultant_location: '' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Alja Voros', amount: '75,00€', fee: '12,75€', location: 'Ljublijana', doctor: 'Mateja Mlinaric', last_consultant_location: 'Ljublijana' }
        // { service_date: 'Preventry dentistry', title: '', lead_name: '', amount: '', fee: '', location: '', doctor: '', last_consultant_location: '', _rowVariant: 'active' },
        // { service_date: 'Consultation', title: '', lead_name: '', amount: '', fee: '', location: '', doctor: '', last_consultant_location: '', _rowVariant: 'active' },
        // { service_date: 'Sum', title: '', lead_name: '', amount: '', fee: '', location: '', doctor: '', last_consultant_location: '', _rowVariant: 'active' }
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
