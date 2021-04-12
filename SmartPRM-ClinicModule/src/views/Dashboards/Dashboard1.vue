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
                    <h5 class="">Doctors</h5>
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
                    <h5 class="">Nurses</h5>
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
                    <h5 class="">Patients</h5>
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
                    <h5 class="">Pharmacists</h5>
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
            <h4 class="card-title">Hospital Survey</h4>
          </template>
          <template v-slot:body>
            <div class="iq-card-body pb-0 mt-3">
              <div class="row text-center">
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">$ 305 </h4>
                  <p class="text-muted">Today's Income</p>
                </div>
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">$ 999 </h4>
                  <p class="text-muted">This Week's Income</p>
                </div>
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">$ 4999 </h4>
                  <p class="text-muted">This Month's Income</p>
                </div>
                <div class="col-sm-3 col-6">
                  <h4 class="margin-0">$ 90,000 </h4>
                  <p class="text-muted">This Year's Income</p>
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
export default {
  name: 'Dashboard1',
  components: { IqCard },
  mounted () {
    xray.index()
  },
  data () {
    return {
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
          name: 'Cash Flow',
          data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
            5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4
          ]
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
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + '%'
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
            '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
            '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
            '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
            '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
            '2013-07-01', '2013-08-01', '2013-09-01'
          ],
          labels: {
            rotate: -90
          }
        }
      }
    }
  }
}
</script>

<style>
.iq-card-body{
  flex: unset;
}
</style>
