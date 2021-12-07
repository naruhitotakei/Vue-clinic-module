<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <b-row>
          <b-col md="6" lg="3">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="iq-bg-primary rounded">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="rounded-circle iq-card-icon bg-primary" style="min-height: 60px; min-width: 60px;"><i class="ri-user-fill"></i></div>
                  <div class="text-right">
                    <h2 class="mb-0"><span class="counter">{{ attendance }}</span></h2>
                    <h5 class="">{{ $t('statisticsForClinic.attendance') }}</h5>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="6" lg="3">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="iq-bg-warning rounded">
              <template v-slot:body >
                <div class="d-flex align-items-center justify-content-between">
                  <div class="rounded-circle iq-card-icon bg-warning"><i class="ri-women-fill"></i></div>
                  <div class="text-right">
                    <h2 class="mb-0"><span class="counter">3450</span></h2>
                    <h5 class="">{{ $t('statisticsForClinic.nurses') }}</h5>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="6" lg="3">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="iq-bg-danger rounded">
              <template v-slot:body >
                <div class="d-flex align-items-center justify-content-between">
                  <div class="rounded-circle iq-card-icon bg-danger"><i class="ri-group-fill"></i></div>
                  <div class="text-right">
                    <h2 class="mb-0"><span class="counter">3500</span></h2>
                    <h5 class="">{{ $t('statisticsForClinic.patients') }}</h5>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="6" lg="3">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="iq-bg-info rounded">
              <template v-slot:body >
                <div class="d-flex align-items-center justify-content-between">
                  <div class="rounded-circle iq-card-icon bg-info"><i class="ri-hospital-line"></i></div>
                  <div class="text-right">
                    <h2 class="mb-0"><span class="counter">4500</span></h2>
                    <h5 class="">{{ $t('statisticsForClinic.pharmacists') }}</h5>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">{{ $t('statisticsForClinic.statisticsForClinicHeader') }}</h4>
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

    <LeadsChart />
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import { clinicStatisticsAttendance, getRevenueByProduct } from '../../services/statistics'
import { getDatesForCurrentYear } from '../../services/commonCodeLists'
import LeadsChart from '@/components/ClinicStats/LeadsChart.vue'
// import moment from 'moment'

export default {
  name: 'Dashboard1',
  components: { IqCard, LeadsChart },
  mounted () {
    xray.index()
    this.getStartDates()
    this.getAttendance()
  },
  data () {
    return {
      startDate: null,
      endDate: null,
      leadStartDate: null,
      leadEndDate: null,
      attendance: 0,
      statistics: [],
      slickOptions: {
        centerMode: false,
        centerPadding: '60px',
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        responsive: [{
          breakpoint: 992,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '30',
            slidesToShow: 3
          }
        }, {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '15',
            slidesToShow: 1
          }
        }]
      },
      series: [{
        name: 'Total Revenue',
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
      // chart9: {
      //   series: [{
      //     name: 'Total Revenue',
      //     data: []
      //   }],
      //   chart: {
      //     type: 'bar',
      //     height: 350
      //   },
      //   plotOptions: {
      //     bar: {
      //       colors: {
      //         ranges: [{
      //           from: -100,
      //           to: -46,
      //           color: '#e64141'
      //         }, {
      //           from: -45,
      //           to: 0,
      //           color: '#089bab'
      //         }, {
      //           from: 0,
      //           to: 20,
      //           color: '#FC9F5B'
      //         }]
      //       },
      //       columnWidth: '80%'
      //     }
      //   },
      //   dataLabels: {
      //     enabled: false
      //   },
      //   yaxis: {
      //     title: {
      //       text: 'Growth'
      //     },
      //     labels: {
      //       formatter: function (y) {
      //         return y.toFixed(0)
      //       }
      //     }
      //   },
      //   xaxis: {
      //     categories: [],
      //     labels: {
      //       rotate: -90
      //     }
      //   }
      // }
    }
  },
  methods: {
    getStartDates () {
      getDatesForCurrentYear().then(response => {
        const start = response[0]
        const end = response[response.length - 1]
        this.startDate = start['?column?'].split('T')[0]
        this.endDate = end['?column?'].split('T')[0]
        this.getClinicRevenueByProduct(this.startDate, this.endDate)
      })
    },
    onDateChange () {
      if (this.startDate && this.endDate) {
        this.getClinicRevenueByProduct(this.startDate, this.endDate)
      }
    },
    onLeadDateChange () {
      if (this.leadStartDate && this.leadEndDate) {
        this.getClinicLeadStats(this.leadStartDate, this.leadEndDate)
      }
    },
    getClinicRevenueByProduct (start, end) {
      getRevenueByProduct(start, end).then(response => {
        this.setChartData(response)
      })
    },
    setChartData (data) {
      let prNames = []
      let sumArray = []
      let sumOfRevenue = 0
      data.forEach(item => {
        prNames.push(item.pr_name)
        sumArray.push(item.sum)
        sumOfRevenue += Number(item.sum)
      })
      this.series = [{
        data: sumArray
      }]

      this.chartOptions = {
        xaxis: {
          categories: [...prNames]
        },
        yaxis: {
          labels: {
            formatter: function (y) {
              return y.toLocaleString()
            }
          },
          title: {
            text: 'Sum of Revenue ' + sumOfRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' EUR'
          }
        }
      }
    },
    // getStatistics () {
    //   getClinicStatistics().then(response => {
    //     if (typeof response !== 'string') {
    //       this.statistics = response
    //       this.statistics.forEach(function (item) {
    //         if (item.date !== null) {
    //           dates.push(moment(item.date).format('YYYY-MM-DD'))
    //           totalRevenue.push(parseFloat(item.totalrevenue))
    //         }
    //       })
    //     } else {
    //       console.error(response)
    //     }
    //   })
    // },
    getAttendance () {
      clinicStatisticsAttendance().then(response => {
        if (typeof response !== 'string') {
          this.attendance = response[0].count
        } else {
          console.error(response)
        }
      })
    }
  }
}
</script>

<style>
.iq-card-body{
  flex: unset;
}
</style>
