<template>
    <b-row>
        <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Leads Statistics</h4>
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
            </b-form>
          </template>
          <template v-slot:body>
            <div class="mt-3">
              <apex-chart type="bar" :series="series" :options="chartOptions" />
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
  methods: {
    onLeadDateChange () {
      if (this.leadStartDate && this.leadEndDate) {
        this.getClinicLeadStats(this.leadStartDate, this.leadEndDate)
      }
    },
    getClinicLeadStats (start, end) {
      getLeadsPerDay(start, end).then(response => {
        this.setDataForChart(response)
      })
    },
    setDataForChart (data) {
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
        xaxis: {
          type: 'datetime',
          categories: datesArray
        }
      }

      this.prepareDataForExport(data, countries)
    },

    prepareDataForExport (data, countries) {
      // Get Data for export
      countries.forEach(country => {
        const sum = data.filter(item => item.country === country)
          .map(item => item.enquiries_count && Number(item.enquiries_count))
          .reduce((a, b) => Number(a) + Number(b))
        this.dataToExport.push({ country, enquiries: sum.toLocaleString() })
      })
    }
  },
  data () {
    return {
      leadStartDate: null,
      leadEndDate: null,
      dataToExport: [],
      excelColumns: [
        { label: 'Country', field: 'country' },
        { label: 'Enquiries', field: 'enquiries' }
      ],
      series: [{
        name: 'Leads By Day',
        data: []
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true
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
            borderRadius: 10
          }
        },
        yaxis: {
          title: {
            text: 'Lead Statistics'
          },
          labels: {
            formatter: function (y) {
              return y.toLocaleString()
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [],
          labels: {
            formatter: function (value, timestamp) {
              return moment(timestamp).format('ll')
            }
          }
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      }
    }
  }
}
</script>
