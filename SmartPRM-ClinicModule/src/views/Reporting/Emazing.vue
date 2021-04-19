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
              <h5 class="card-title">{{ $t('reportingEmazing.servicesSummary') }}</h5>
            <b-table small :items="items1" :fields="columns1" class="mb-0"></b-table>
          </template>
        </iq-card>
        <iq-card>
          <template v-slot:body>
              <h5 class="card-title">{{ $t('reportingEmazing.servicesList') }}</h5>
            <b-table small :items="items2" :fields="columns2" class="mb-0"></b-table>
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
      columns1: [
        { label: this.$t('reportingEmazing.servicesSummaryColumn.serviceTitle'), key: 'service_title', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesSummaryColumn.serviceCount'), key: 'service_count', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesSummaryColumn.serviceAmount'), key: 'amount', class: 'text-left' }
      ],
      items1: [
        { service_title: 'General dentistry', service_count: 245, amount: '48.805,55', _rowVariant: 'active' },
        { service_title: 'Dental procedure', service_count: 242, amount: '48.260,55' },
        { service_title: 'Ekstrakcija zoba', service_count: 2, amount: '395,00' },
        { service_title: 'Zalivka | Plomba', service_count: 1, amount: '150,00' },
        { service_title: 'Preventive dentistry', service_count: 1, amount: '50,55', _rowVariant: 'active' },
        { service_title: 'Zobni kamen', service_count: 242, amount: '48.260,55' },
        { service_title: 'Consultation', service_count: 1, amount: '35,00', _rowVariant: 'active' },
        { service_title: 'Consultation', service_count: 1, amount: '35,00' },
        { service_title: 'Sum', service_count: 247, amount: '48.890,00', _rowVariant: 'active' }
      ],
      columns2: [
        { label: this.$t('reportingEmazing.servicesListColumn.serviceDate'), key: 'service_date', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceTitle'), key: 'title', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceLeadName'), key: 'lead_name', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceAmount'), key: 'amount', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceFee'), key: 'fee', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceLocation'), key: 'location', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceDoctor'), key: 'doctor', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceLastConsult'), key: 'last_consultant_location', class: 'text-left' }
      ],
      items2: [
        { service_date: 'General dentistry', title: '', lead_name: '', amount: '', fee: '', location: '', doctor: '', last_consultant_location: '', _rowVariant: 'active' },
        { service_date: 'March 1, 2021', title: 'Dental Procedure', lead_name: 'Urban Perko', amount: '35,00€', fee: '5,95€', location: 'Spodnje Škofije', doctor: 'Dr. Bojan Jernejc', last_consultant_location: '' },
        { service_date: 'March 3, 2021', title: 'Dental Procedure', lead_name: 'Mirko Pušnik', amount: '35,00€', fee: '5,95€', location: 'Spodnje Škofije', doctor: 'Dr. Silvija Lenart', last_consultant_location: 'Spodnje Škofije' },
        { service_date: 'March 4, 2021', title: 'Dental Procedure', lead_name: 'Maks Krajnc', amount: '30,00€', fee: '5,10€', location: 'Ljubljana', doctor: 'Dr. Damjan Ahlin', last_consultant_location: 'Ljubljana' },
        { service_date: 'March 5, 2021', title: 'Dental Procedure', lead_name: 'Štefanija Močnik', amount: '5.025€', fee: '854,25€', location: 'Spodnje Škofije', doctor: 'Dr. Martin Sever', last_consultant_location: 'Spodnje Škofije' },
        { service_date: 'March 8, 2021', title: 'Dental Procedure', lead_name: 'Uroš Zajc', amount: '35,00€', fee: '5,10€', location: 'Šencur', doctor: 'Dr. Tanja Perme', last_consultant_location: '' },
        { service_date: 'March 8, 2021', title: 'Dental Procedure', lead_name: 'Jožef Pušnik', amount: '35,00€', fee: '5,95€', location: 'Spodnje Škofije', doctor: 'Dr. Renata Kobler', last_consultant_location: '' },
        { service_date: 'March 9, 2021', title: 'Dental Procedure', lead_name: 'Matija Primožič', amount: '35,00€', fee: '5,95€', location: 'Spodnje Škofije', doctor: 'Dr. Silvija Lenart', last_consultant_location: '' },
        { service_date: 'March 10, 2021', title: 'Dental Procedure', lead_name: 'Damjan Novak', amount: '75,00€', fee: '12,75€', location: 'Ljubljana', doctor: 'Dr. Martin Sever', last_consultant_location: 'Ljubljana' },
        { service_date: 'Preventive dentistry', title: '', lead_name: '', amount: '', fee: '', location: '', doctor: '', last_consultant_location: '', _rowVariant: 'active' },
        { service_date: 'March 5, 2021', title: 'Sandblasting', lead_name: 'Štefanija Močnik', amount: '75,00€', fee: '12,75€', location: 'Spodnje Škofije', doctor: 'Dr. Martin Sever', last_consultant_location: 'Spodnje Škofije' },
        { service_date: 'March 10, 2021', title: 'Tartar cleaning', lead_name: 'Damjan Novak', amount: '75,00€', fee: '12,75€', location: 'Ljubljana', doctor: 'Dr. Martin Sever', last_consultant_location: 'Ljubljana' },
        { service_date: 'Consultation', title: '', lead_name: '', amount: '', fee: '', location: '', doctor: '', last_consultant_location: '', _rowVariant: 'active' },
        { service_date: 'March 8, 2021', title: 'Consultation', lead_name: 'Stanislava Klemenčič', amount: '75,00€', fee: '12,75€', location: 'Ljubljana', doctor: 'Dr. Sebastjan Bras', last_consultant_location: 'Ljubljana' }
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
