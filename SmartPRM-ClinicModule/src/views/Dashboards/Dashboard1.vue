<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <b-row>
          <b-col md="6" lg="3">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="iq-bg-primary rounded">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="rounded-circle iq-card-icon bg-primary"><i class="ri-user-fill"></i></div>
                  <div class="text-right">
                    <h2 class="mb-0"><span class="counter">5600</span></h2>
                    <h5 class="">{{ $t('statisticsForClinic.doctors') }}</h5>
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
              <h4 class="card-title">{{ $t('statisticsForClinic.statisticsForClinicHeader') }}</h4>
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
            <ApexChart element="home-chart-09" :chartOption="chart9"/>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import { clinicStatistics } from '../../services/statistics'
let dates = []
let totalRevenue = []
export default {
  name: 'Dashboard1',
  components: { IqCard },
  mounted () {
    xray.index()
    this.getStatistics()
    console.log(this.chart9)
  },
  data () {
    return {
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
      chart9: {
        series: [{
          name: 'Total Revenue',
          data: totalRevenue
        }],
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
            text: 'Growth'
          }
          // labels: {
          //   formatter: function (y) {
          //     return y.toFixed(0) + '%'
          //   }
          // }
        },
        xaxis: {
          type: 'datetime',
          categories: dates,
          labels: {
            rotate: -90
          }
        }
      }
    }
  },
  methods: {
    getStatistics () {
      clinicStatistics().then(response => {
        this.statistics = response
        this.statistics.forEach(function (item) {
          dates.push(item.date.split('T').shift())
          totalRevenue.push(parseFloat(item.totalrevenue))
        })
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
