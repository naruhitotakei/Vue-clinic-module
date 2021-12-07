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
      let enqCount = []
      let datesArray = []
      data.forEach(item => {
        enqCount.push(item.enquiries_count)
        datesArray.push(item.date.split('T')[0])
      })
      this.series = [{
        data: enqCount
      }]

      this.chartOptions = {
        xaxis: {
          categories: [...datesArray]
        },
        yaxis: {
          labels: {
            formatter: function (y) {
              return y.toLocaleString()
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
          height: 350
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: -100,
                to: -46,
                color: '#e64141'
              }, {
                from: -45,
                to: 0,
                color: '#089bab'
              }, {
                from: 0,
                to: 20,
                color: '#FC9F5B'
              }]
            },
            columnWidth: '80%'
          }
        },
        dataLabels: {
          enabled: false
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
          categories: [],
          labels: {
          }
        }
      }
    }
  }
}
</script>
