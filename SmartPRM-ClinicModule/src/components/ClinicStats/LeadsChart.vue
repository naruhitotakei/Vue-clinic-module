<template>
    <b-row>
        <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Leads Statistics</h4>
            <b-form>
              <b-row>
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
      let seriesData = []
      let enqCount = []
      let datesArray = []
      const unknownCountries = data.filter(item => !item.country)
      console.log(unknownCountries.length + ' Unknown Countries ... ')
      // data = data.filter(item => !item.country)
      data.forEach(item => {
        // Test By Country
        // const itemDate = item.date.split('T')[0]
        const enquires = Number(item.enquiries_count ? item.enquiries_count : 0)
        let obj = {
          name: item.country ? item.country : 'N/A',
          data: []
        }
        if (seriesData.length === 0) {
          obj.data.push(enquires)
          seriesData.push(obj)
        } else {
          const isCountryExists = seriesData.find(record => (record.name === item.country) || (record.name === 'N/A' && !item.country))
          if (isCountryExists) {
            let existingData = Object.assign({}, isCountryExists)
            existingData.data.push(enquires)
          } else {
            obj.data.push(enquires)
            seriesData.push(obj)
          }
        }
        datesArray.push(item.date)
        enqCount.push(item.enquiries_count)
        // const itemDate = item.date.split('T')[0]
        // const isDateExists = datesArray.find(date => date === itemDate)
        // if (!isDateExists) {
        //   datesArray.push(itemDate)
        // }

        // let obj = {
        //   name: item.country ? item.country : 'N/A',
        //   data: []
        // }

        // Test By Date

        // if (seriesData.length === 0) {
        //   obj.data.push(item.enquiries_count)
        //   seriesData.push(obj)
        //   datesArray.push(itemDate)
        // } else {
        //   const isSameDateExists = seriesData.find(record => (record.date === itemDate))
        //   if (isSameDateExists) {
        //     let existingData = Object.assign({}, isSameDateExists)
        //     existingData.data.push(item.enquiries_count)
        //   } else {
        //     obj.data.push(item.enquiries_count)
        //     seriesData.push(obj)
        //     datesArray.push(itemDate)
        //   }
        // }
      })
      console.log('Series Length ... ', seriesData)
      console.log('Dates Length ... ', datesArray)
      // this.series = [{
      //   data: enqCount
      // }]

      this.series = seriesData

      this.chartOptions = {
        xaxis: {
          categories: [...datesArray]
        },
        yaxis: {
          labels: {
            formatter: function (y) {
              return y
            }
          },
          title: {
            text: 'Leads Statistics'
          }
        }
      }
    }
  },
  data () {
    return {
      leadStartDate: null,
      leadEndDate: null,
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
            text: 'Total Revenue'
          },
          labels: {
            formatter: function (y) {
              return y.toLocaleString()
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: []
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
