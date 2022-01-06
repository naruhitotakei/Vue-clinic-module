<template>
    <b-row>
        <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title">Leads Statistics</h4>
                <vue-excel-xlsx
                    :data="dataToExport"
                    :columns="excelColumns"
                    :filename="'Lead Statistics'"
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
              <apex-chart type="bar" :series="series" :options="chartOptions" />
            </div>
            <div class="mt-3 text-center" v-if="loading">
                <p>Loading Leads Statistics...</p>
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

export default {
  name: 'LeadsChart',
  components: { IqCard },
  props: {
    start: String,
    end: String,
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
    onDateChange() {
      if (this.startDate && this.endDate) {
        this.getClinicLeadStats(this.startDate, this.endDate)
      }
    },
    getClinicLeadStats(start, end) {
      this.loading = true
      this.noData = false
      getLeadsPerDay(start, end).then(response => {
        this.loading = false
        if (response && response.length && Array.isArray(response)) {
          this.noData = false
          this.setDataForChart(response)
        } else {
          this.noData = true
        }
      }).catch(() => {
        this.noData = false
        this.loading = false
      })
    },
    setDataForChart(data) {
      let datesArray = []
      let sumByCountry = []
      let countries = []
      this.dataToExport = []
      data.forEach(item => {
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

      countries.forEach(country => {
        const itemsByCountry = data.filter(item => item.country === country)
        const obj = { name: country, data: [] }
        datesArray.forEach(date => {
          const isCountryHasDate = itemsByCountry.find(item => item.date.split('T')[0] === date)
          if (isCountryHasDate) {
            obj.data.push(isCountryHasDate.enquiries_count ? Number(isCountryHasDate.enquiries_count) : 0)
          } else {
            obj.data.push(0)
          }
        })
        sumByCountry.push(obj)
      })

      this.series = sumByCountry

      this.chartOptions = {
        chart: {
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
            },
            export: {
              csv: {
                filename: 'Leads Statistics',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString()
                },
              },
            },
          },
        },
        legend: {
          position: 'right',
        },
        xaxis: {
          type: 'datetime',
          categories: datesArray,
        },
      }

      this.prepareDataForExport(data, countries)
    },

    prepareDataForExport(data, countries) {
      // Get Data for export
      if (Array.isArray(data) && Array.isArray(countries)) {
        countries.forEach(country => {
          const sum = data.filter(item => item.country === country)
            .map(item => item.enquiries_count && Number(item.enquiries_count))
            .reduce((a, b) => Number(a) + Number(b))
          this.dataToExport.push({ country, enquiries: this.$options.filters.formatPrice(sum) })
        })
      }
    },
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      loading: true,
      noData: false,
      dataToExport: [],
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
            formatter: function(y) {
              return y.toLocaleString()
            },
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [],
          labels: {
            formatter: function(value, timestamp) {
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
