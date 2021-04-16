<template>
    <div class="container-fluid">
        <iq-card>
          <template v-slot:headerTitle>
            <div class="row pt-3">
          <b-form-group class="col-md-3">
              <b-form-select plain v-model="countrySelect" :options="countrySelectOptions" style="padding: 10px;" @change.native="onCountryChange">
                  <b-form-select-option :value="null">{{ $t('reportingEmazing.countrySelect') }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group class="col-md-2">
              <b-form-select plain v-model="periodSelect" :options="periodSelectOptions" style="padding: 10px;" @change.native="onPeriodChange">
                  <b-form-select-option :value="null">{{ $t('reportingEmazing.periodSelect') }}</b-form-select-option>
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
import { getEmazingServicesReport, getServiceList, getCountryList } from '../../services/reporting'
export default {
  components: {
    IqCard
  },
  name: 'Emazing',
  data: function () {
    return {
      fromdate: null,
      todate: null,
      countrySelectOptions: [],
      periodSelectOptions: [
        { value: '1', text: this.$t('reportingEmazing.currentMonth') },
        { value: '2', text: this.$t('reportingEmazing.lastMonth') },
        { value: '3', text: this.$t('reportingEmazing.thisYear') },
        { value: '4', text: this.$t('reportingEmazing.lastYear') }
      ],
      countrySelect: null,
      periodSelect: null,
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
      this.getCountryList()
    },
    onToChange () {
      this.getServicesReport()
      this.getServicesList()
      this.getCountryList()
    },
    onPeriodChange () {
      if (this.periodSelect === '1') {
        let today = new Date()
        let firstThisMonth = new Date()
        firstThisMonth.setDate(1)
        this.fromdate = this.formatDate(firstThisMonth)
        this.todate = this.formatDate(today)
      } else if (this.periodSelect === '2') {
        let lastLastMonth = new Date()
        lastLastMonth.setDate(1)
        lastLastMonth.setDate(lastLastMonth.getDate() - 1)
        let firstLastMonth = new Date()
        firstLastMonth.setMonth(firstLastMonth.getMonth() - 1)
        firstLastMonth.setDate(1)
        this.fromdate = this.formatDate(firstLastMonth)
        this.todate = this.formatDate(lastLastMonth)
      } else if (this.periodSelect === '3') {
        let today = new Date()
        let firstThisYear = new Date()
        firstThisYear.setMonth(0)
        firstThisYear.setDate(1)
        this.fromdate = this.formatDate(firstThisYear)
        this.todate = this.formatDate(today)
      } else if (this.periodSelect === '4') {
        let lastLastYear = new Date()
        lastLastYear.setMonth(0)
        lastLastYear.setDate(1)
        lastLastYear.setDate(lastLastYear.getDate() - 1)
        let firstLastYear = new Date()
        firstLastYear.setMonth(0)
        firstLastYear.setDate(1)
        firstLastYear.setYear(1900 + firstLastYear.getYear() - 1)
        this.fromdate = this.formatDate(firstLastYear)
        this.todate = this.formatDate(lastLastYear)
      } else {
        return
      }
      this.getServicesReport()
      this.getServicesList()
      this.getCountryList()
    },
    onCountryChange () {
      this.getServicesReport()
      this.getServicesList()
      this.getCountryList()
    },
    getServicesReport () {
      getEmazingServicesReport(this.fromdate, this.todate, this.countrySelect).then(response => {
        if (typeof response !== 'string') {
          this.servicesSummary = response
        } else {
          console.error(response)
        }
      })
    },
    getServicesList () {
      getServiceList(this.fromdate, this.todate, this.countrySelect).then(response => {
        if (typeof response !== 'string') {
          this.servicesList = response
        } else {
          console.error(response)
        }
      })
    },
    getCountryList () {
      getCountryList(this.fromdate, this.todate).then(response => {
        if (typeof response !== 'string') {
          console.log('RESPONSE', response)
          this.countrySelectOptions = []
          for (var cnt in response) {
            console.log('CNT', cnt)
            if (response[cnt].id) {
              var cntEnt = { value: response[cnt].id, text: response[cnt].name }
              this.countrySelectOptions.push(cntEnt)
            }
          }
        } else {
          this.countrySelectOptions = []
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
    var firstThisMonth = new Date()
    firstThisMonth.setDate(1)
    this.fromdate = this.formatDate(firstThisMonth)
    this.todate = this.formatDate(today)
    this.getServicesReport()
    this.getServicesList()
    this.getCountryList()
  }
}
</script>
<style>
.hidden_header {
  display: none;
}
</style>
