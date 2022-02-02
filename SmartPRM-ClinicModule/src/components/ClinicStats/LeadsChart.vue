<template>
    <b-row>
        <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title">Leads Statistics ({{ totalLeads | formatNumber }})</h4>
                <vue-excel-xlsx
                    :data="dataToExport"
                    :columns="excelColumns"
                    :filename="fileName"
                    :sheetname="'Lead Statistics'"
                    class="btn btn-primary"
                    >
                    Download Excel
                  </vue-excel-xlsx>
            </div>
            <!-- <h4 class="card-title mt-3">Leads Statistics</h4>
            <b-form @submit.prevent>
              <b-row align-v="center">
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px;">From:</label>
                    <b-form-input style="line-height: normal" class="date" id="exampleStartdate" type="date" v-model="leadStartDate" @change="onLeadDateChange"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px;">End:</label>
                    <b-form-input style="line-height: normal" class="date" id="exampleEnddate" type="date" v-model="leadEndDate" @change="onLeadDateChange"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="6" md="4" lg="3" offset-lg="3" class="text-right" v-if="dataToExport && dataToExport.length">
                  <vue-excel-xlsx
                    :data="dataToExport"
                    :columns="excelColumns"
                    :filename="'Lead Statistics'"
                    :sheetname="'Lead Statistics'"
                    class="btn btn-primary"
                    >
                    Download Excel
                  </vue-excel-xlsx>
                </b-col>
              </b-row>
            </b-form> -->
          </template>
          <template v-slot:body>
            <div class="mt-3" v-if="!loading && !noData">
              <AmChart v-if="chartBodyData" element="leadsChart" type="leads" :option="chartBodyData" />
              <!-- <apex-chart type="bar" :series="series" :options="chartOptions" /> -->
            </div>
            <div class="mt-3 text-center" v-if="loading">
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="loading">Loading...</strong>
              </div>
            </div>
            <div class="mt-3 text-center" v-if="!loading && noData">
                <p>No data found in this date range...</p>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card'
import { getLeadsPerDay } from '../../services/statistics'
import moment from 'moment'
import AmChart from '@/components/AmChart'

export default {
  name: 'LeadsChart',
  components: { IqCard, AmChart },
  props: {
    start: String,
    end: String,
    client: String,
    unit: String,
  },
  watch: {
    start(val) {
      if (val) {
        this.startDate = val
        this.onDateChange()
      }
    },
    end(val) {
      if (val) {
        this.endDate = val
        this.onDateChange()
      }
    },
  },
  created() {
    if (this.start && this.end) {
      this.startDate = this.start
      this.endDate = this.end
      this.onDateChange()
    }
  },
  methods: {
    // onLeadDateChange () {
    //   if (this.leadStartDate && this.leadEndDate) {
    //     this.getClinicLeadStats(this.leadStartDate, this.leadEndDate)
    //   }
    // },
    initChart(data, countries) {
      console.log('Unit is ', this.unit)
      this.chartBodyData = {
        colors: ['#e64141', '#00ca00', '#ffd400'],
        timeUnit: this.unit,
        xAxis: ['date'],
        yAxis: countries,
        data: data,
      }
    },
    onDateChange() {
      if (this.startDate && this.endDate) {
        this.getClinicLeadStats(this.startDate, this.endDate)
      }
    },
    getClinicLeadStats(start, end) {
      this.loading = true
      this.noData = false
      this.chartBodyData = null
      this.totalLeads = 0
      this.dataToExport = []
      getLeadsPerDay(start, end).then(async response => {
        if (response && response.length && Array.isArray(response)) {
          this.noData = false
          this.setDataForChart(response)
          this.loading = false
        } else {
          this.noData = true
          this.loading = false
        }
      }).catch(() => {
        this.noData = false
        this.loading = false
      })
    },
    async setDataForChart(data) {
      let datesArray = []
      // let sumByCountry = []
      let countries = []
      this.dataToExport = []
      let amChartData = []

      await data.forEach(item => {
        // Get Unique Dates
        const itemDate = item.date.split('T')[0]
        const isDateExists = datesArray.find(date => date === itemDate)
        if (!isDateExists) {
          datesArray.push(itemDate)
        }

        // Get Unique Countries
        const isCountryExists = countries.find(country => country === item.country)
        if (!isCountryExists && item.country) {
          countries.push(item.country)
        }
      })

      amChartData = []
      datesArray.forEach(date => {
        let obj = { date: date }
        const itemsByDate = data.filter(item => item.date.split('T')[0] === date)
        countries.forEach(country => {
          const isCountryHasDate = itemsByDate.find(item => item.country === country)
          if (isCountryHasDate) {
            obj[country] = isCountryHasDate.enquiries_count ? Number(isCountryHasDate.enquiries_count) : 0
            this.totalLeads += Number(obj[country])
          } else {
            // obj[country] = 0
          }
        })
        amChartData.push(obj)
      })

      this.initChart(amChartData, countries)

      // countries.forEach(country => {
      //   const itemsByCountry = data.filter(item => item.country === country)
      //   const obj = { name: country, data: [] }
      //   datesArray.forEach(date => {
      //     const isCountryHasDate = itemsByCountry.find(item => item.date.split('T')[0] === date)
      //     if (isCountryHasDate) {
      //       obj.data.push(isCountryHasDate.enquiries_count ? Number(isCountryHasDate.enquiries_count) : 0)
      //     } else {
      //       obj.data.push(0)
      //     }
      //   })
      //   sumByCountry.push(obj)
      // })

      // this.series = sumByCountry
      // let self = this

      // this.chartOptions = {
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   chart: {
      //     type: 'bar',
      //     height: 350,
      //     stacked: true,
      //     toolbar: {
      //       show: false,
      //       export: {
      //         csv: {
      //           filename: 'Leads Statistics',
      //           dateFormatter(timestamp) {
      //             return new Date(timestamp).toDateString()
      //           },
      //         },
      //       },
      //     },
      //   },
      //   legend: {
      //     position: 'right',
      //   },
      //   xaxis: {
      //     type: 'datetime',
      //     categories: datesArray,
      //   },
      //   tooltip: {
      //     y: {
      //       formatter: function (value, { series, seriesIndex, w }) {
      //         const numb = String(value).match(/\d/g).join('')
      //         return self.$options.filters.formatNumber(numb)
      //       },
      //     },
      //   },
      // }

      this.prepareDataForExport(data, countries)
    },

    prepareDataForExport(data, countries) {
      this.fileName = `SmartPRM_${this.client}_Clinic_Statistics_Revenue_by_doctor_(${moment(this.start).format('DD/MM/YYYY')} - ${moment(this.end).format('DD/MM/YYYY')})`
      // Get Data for export
      if (Array.isArray(data) && Array.isArray(countries)) {
        countries.forEach(country => {
          const sum = data.filter(item => item.country === country)
            .map(item => item.enquiries_count && Number(item.enquiries_count))
            .reduce((a, b) => Number(a) + Number(b))
          this.dataToExport.push({ country, enquiries: this.$options.filters.formatNumber(sum) })
        })
      }
    },
  },
  data() {
    return {
      totalLeads: 0,
      chartBodyData: null,
      startDate: null,
      endDate: null,
      loading: true,
      noData: false,
      dataToExport: [],
      fileName: '',
      excelColumns: [
        { label: 'Country', field: 'country' },
        { label: 'Enquiries', field: 'enquiries' },
      ],
      series: [{
        name: 'Leads By Day',
        data: [],
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              pan: false,
              zoom: false,
            },
          },
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     legend: {
        //       position: 'bottom',
        //       offsetX: -10,
        //       offsetY: 0
        //     }
        //   }
        // }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        yaxis: {
          title: {
            text: 'Lead Statistics',
          },
          labels: {
            formatter: function (y) {
              return y.toLocaleString()
            },
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [],
          labels: {
            formatter: function (value, timestamp) {
              return moment(timestamp).format('ll')
            },
          },
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    }
  },
}
</script>
