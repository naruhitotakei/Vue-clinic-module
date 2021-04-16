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
                <b-form-input id="exampleInputdate" type="date" v-model="fromdate" @change="onFromChange"></b-form-input>
              </b-form-group>
              <label style="padding-top: 8px;">To:</label>
            <b-form-group label-for="exampleInputdate" class="col-md-2">
                <b-form-input id="exampleInputdate" type="date" v-model="todate" @change="onToChange"></b-form-input>
            </b-form-group>
            </div>
          </template>
        </iq-card>
        <iq-card>
          <template v-slot:body>
              <h5 class="card-title">{{ $t('reportingEmazing.servicesSummary') }}</h5>
            <b-table small :items="servicesSummary" :fields="servicesSummaryColumns" class="mb-0" :tbody-tr-class="table-success"></b-table>
          </template>
        </iq-card>
        <iq-card>
          <template v-slot:body>
              <h5 class="card-title">{{ $t('reportingEmazing.servicesList') }}</h5>
            <b-table small :items="servicesList" :fields="servicesListColumns" class="mb-0" :tbody-tr-class="table-success"></b-table>
          </template>
        </iq-card>
    </div>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card.vue'
import { getEmazingServicesReport, getServiceList } from '../../services/reporting'
export default {
  components: {
    IqCard
  },
  name: 'Emazing',
  data: function () {
    return {
      fromdate: '2021-01-01',
      todate: '2021-01-01',
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
      servicesSummaryColumns: [
        { label: this.$t('reportingEmazing.servicesSummaryColumn.serviceTitle'), key: 'service_title', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesSummaryColumn.serviceCount'), key: 'count', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesSummaryColumn.serviceAmount'), key: 'sum', class: 'text-left' }
      ],
      servicesSummary: [],
      servicesListColumns: [
        { label: this.$t('reportingEmazing.servicesListColumn.serviceDate'), key: 'date', formatter: (value, key, item) => { return this.formatDateString(value) } },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceTitle'), key: 'service_title', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceLeadName'), key: 'name', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceAmount'), key: 'price', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceFee'), key: 'fee', class: 'text-left' },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceDoctor'), key: 'doctor', class: 'text-left' }
      ],
      servicesList: []
    }
  },
  methods: {
    onFromChange () {
      this.getServicesReport()
      this.getServicesList()
    },
    onToChange () {
      this.getServicesReport()
      this.getServicesList()
    },
    getServicesReport () {
      getEmazingServicesReport(this.fromdate, this.todate).then(response => {
        if (typeof response !== 'string') {
          this.servicesSummary = response
        } else {
          console.error(response)
        }
      })
    },
    getServicesList () {
      getServiceList(this.fromdate, this.todate).then(response => {
        if (typeof response !== 'string') {
          this.servicesList = response
        } else {
          console.error(response)
        }
      })
    },
    formatDate (date) {
      var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
      var mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
      var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
      return (`${ye}-${mo}-${da}`)
    },
    formatDateString (dateString) {
      var date = Date.parse(dateString)
      var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
      var mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date)
      var da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date)
      return (`${da}. ${mo}. ${ye}`)
    }
  },
  mounted () {
    var today = new Date()
    var lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    lastMonth.setDate(1)
    this.fromdate = this.formatDate(lastMonth)
    this.todate = this.formatDate(today)
    this.getServicesReport()
    this.getServicesList()
  }
}
</script>
<style>
.hidden_header {
  display: none;
}
</style>
