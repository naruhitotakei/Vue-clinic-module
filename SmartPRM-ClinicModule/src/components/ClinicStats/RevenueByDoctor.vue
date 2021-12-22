<template>
    <b-row>
        <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Revenue By Doctor</h4>
            <b-form>
              <b-row>
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px;">From:</label>
                    <b-form-input style="line-height: normal" class="date" id="exampleStartdate" type="date" v-model="startDate" @change="onDateChange"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px;">End:</label>
                    <b-form-input style="line-height: normal" class="date" id="exampleEnddate" type="date" v-model="endDate" @change="onDateChange"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </template>
          <template v-slot:body>
            <div class="iq-card-body pb-0 mt-3">
              <div class="row text-center">
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">€ 305 </h4>
                  <p class="text-muted">{{ $t('statisticsForClinic.todaysIncome') }}</p>
                </div>
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">€ 999 </h4>
                  <p class="text-muted">{{ $t('statisticsForClinic.weeksIncome') }}</p>
                </div>
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">€ 4999 </h4>
                  <p class="text-muted">{{ $t('statisticsForClinic.monthsIncome') }}</p>
                </div>
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">€ 90.000 </h4>
                  <p class="text-muted">{{ $t('statisticsForClinic.yearsIncome') }}</p>
                </div>
              </div>
            </div>
            <div id="home-servey-chart"></div>
            <!-- <ApexChart element="home-chart-09" :chartOption="homesurvey" v-if="$route.meta.dark"/> -->
            <!-- <ApexChart element="home-chart-09" :chartOption="chart9" v-else/> -->
            <apex-chart type="bar" :series="series" :options="chartOptions" />
          </template>
        </iq-card>
      </b-col>
    </b-row>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card'
import { getRevenueByDoctor } from '../../services/statistics'

export default {
  name: 'RevenueByDoctor',
  components: { IqCard },
  methods: {
    onDateChange () {
      if (this.startDate && this.endDate) {
        this.getDoctorRevenue(this.startDate, this.endDate)
      }
    },
    getDoctorRevenue (start, end) {
      getRevenueByDoctor(start, end).then(response => {
        this.setDataForChart(response)
      })
    },
    setDataForChart (data) {
      let sumArray = []
      let namesArray = []
      let dataSeries = []
      data.forEach(item => {
        const itemSum = Number(item.sum ? item.sum : 0)
        let obj = {
          name: item.product_name,
          data: []
        }

        if (dataSeries.length === 0) {
          obj.data.push(itemSum)
          dataSeries.push(obj)
        } else {
          let product = dataSeries.find(value => value.name === item.product_name)
          if (product) {
            let existingData = Object.assign({}, product)
            existingData.data.push(itemSum)
          } else {
            obj.data.push(itemSum)
            dataSeries.push(obj)
          }
        }

        sumArray.push(itemSum)
        const isNameExists = namesArray.find(name => name === item.doctor_name)
        if (!isNameExists) {
          namesArray.push(item.doctor_name)
        }

        // dataSeries.push({ name: item.doctor_name, data: item.products })
      })

      // this.series = [{
      //   data: sumArray
      // }]

      this.series = dataSeries
      // const totalRev = sumArray.reduce((a, b) => a + b)

      this.chartOptions = {
        xaxis: {
          categories: namesArray
        }
      }
    }
  },
  data () {
    return {
      startDate: null,
      endDate: null,
      series: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              pan: false,
              zoom: false
            }
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
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
