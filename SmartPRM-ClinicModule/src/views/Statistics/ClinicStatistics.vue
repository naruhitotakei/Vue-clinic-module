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
              <b-row align-v="center">
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
                <b-col cols="12" sm="6" md="4" lg="3" offset-lg="3" class="text-right">
                  <vue-excel-xlsx
                    :data="dataToExport"
                    :columns="excelColumns"
                    :filename="'Revenue By Product'"
                    :sheetname="'Revenue By Product'"
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
              <apex-chart type="pie" width="100%" height="500px" :series="series" :options="chartOptions" />
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>

    <LeadsChart />
    <RevenueByDoctor />
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import { clinicStatisticsAttendance, getRevenueByProduct } from '../../services/statistics'
import { getDatesForCurrentYear } from '../../services/commonCodeLists'
import LeadsChart from '@/components/ClinicStats/LeadsChart.vue'
import RevenueByDoctor from '@/components/ClinicStats/RevenueByDoctor.vue'
// import moment from 'moment'

export default {
  name: 'Dashboard1',
  components: { IqCard, LeadsChart, RevenueByDoctor },
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
      dataToExport: [],
      excelColumns: [
        { label: 'Product', field: 'product' },
        { label: 'Count', field: 'count' },
        { label: 'Sum', field: 'sum', dataFormat: this.priceFormat }
      ],
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
      series: [],
      chartOptions: {
        labels: [],
        dataLabels: {
          enabled: false
        }
      }
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
    priceFormat (value) {
      return Number(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' €'
    },
    setChartData (data) {
      let prNames = []
      let sumArray = []
      this.dataToExport = []
      data.forEach(item => {
        prNames.push(item.pr_name)
        const sum = Number(item.sum)
        sumArray.push(sum)

        this.dataToExport.push({
          product: item.pr_name,
          count: item.count,
          sum: sum
        })
      })

      this.series = [...sumArray]

      this.chartOptions = {
        labels: [...prNames],
        legend: {
          formatter: function (seriesName, opts) {
            const percentage = parseFloat(opts.w.globals.seriesPercent[opts.seriesIndex]).toFixed(1) + '%'
            return seriesName + ' - ' + percentage
          }
        },
        tooltip: {
          y: {
            formatter: function (value, { series, seriesIndex, w }) {
              let name = String(value).replace(/\d+/g, '')
              const numb = String(value).match(/\d/g).join('')
              const val = name + ' ' + Number(numb).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' €'
              return name + ' ' + val
            }
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
