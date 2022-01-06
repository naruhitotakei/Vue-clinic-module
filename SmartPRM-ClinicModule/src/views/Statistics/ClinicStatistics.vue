<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <b-form @submit.prevent>
              <b-row align-v="center" class="py-2">
                <b-col cols="12">
                  <h4 class="card-title mt-3">{{ $t('statisticsForClinic.statisticsForClinicHeader') }}</h4>
                </b-col>
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px;">Filter</label>
                    <b-form-select style="line-height: normal" v-model="filterBy" @change="onFilterChange">
                      <b-form-select-option :value="null">Select Filter</b-form-select-option>
                      <b-form-select-option :value="30">Last 30 Days</b-form-select-option>
                      <b-form-select-option :value="90">Last 90 Days</b-form-select-option>
                      <b-form-select-option :value="180">Last 180 Days</b-form-select-option>
                      <b-form-select-option :value="2">Last 2 Years</b-form-select-option>
                      <b-form-select-option :value="1">Year-To-Date</b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
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
        </iq-card>
      </b-col>
      <b-col lg="12">
        <b-row>
          <b-col md="6" lg="3">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="iq-bg-primary rounded">
              <template v-slot:body>
                <div class="d-flex align-items-top justify-content-between">
                  <div class="rounded-circle iq-card-icon bg-primary" style="min-height: 60px; min-width: 60px;"><i class="ri-user-fill"></i></div>
                  <div class="text-right">
                    <h2 class="mb-0"><span class="counter">{{ appointments }}</span></h2>
                    <h5 class="pb-3">Appointments</h5>
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
                    <h2 class="mb-0"><span class="counter">{{ attended }}</span></h2>
                    <h5 class="">Attended</h5>
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
                    <h2 class="mb-0"><span class="counter">{{ serviced_patients }}</span></h2>
                    <h5 class="">Serviced Patients</h5>
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
                    <h2 class="mb-0"><span class="counter">{{ revenue }}</span></h2>
                    <h5 class="">Revenue</h5>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </b-col>
      <!-- <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="card-title">{{ $t('statisticsForClinic.statisticsForClinicHeader') }}</h4>
              <vue-excel-xlsx
                :data="dataToExport"
                :columns="excelColumns"
                :filename="'Revenue By Product'"
                :sheetname="'Revenue By Product'"
                class="btn btn-primary"
                >
                Download Excel
              </vue-excel-xlsx>
            </div>
          </template>
          <template v-slot:body>
            <div class="mt-3">
              <apex-chart type="pie" width="100%" height="500px" :series="series" :options="chartOptions" />
            </div>
          </template>
        </iq-card>
      </b-col> -->
    </b-row>
    <template v-if="startDate && endDate">
      <RevenueByProduct :start="startDate" :end="endDate" />
      <LeadsChart :start="startDate" :end="endDate" />
      <RevenueByDoctor :start="startDate" :end="endDate" />
      <NewPatients :start="startDate" :end="endDate" />
    </template>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import { clinicStatisticsAttendance, getClinicStats } from '../../services/statistics'
// import { getDatesForCurrentYear } from '../../services/commonCodeLists'
import RevenueByProduct from '@/components/ClinicStats/RevenueByProduct.vue'
import LeadsChart from '@/components/ClinicStats/LeadsChart.vue'
import RevenueByDoctor from '@/components/ClinicStats/RevenueByDoctor.vue'
import NewPatients from '@/components/ClinicStats/NewPatients.vue'
import moment from 'moment'

export default {
  name: 'Dashboard1',
  components: {
    IqCard,
    RevenueByProduct,
    LeadsChart,
    RevenueByDoctor,
    NewPatients,
  },
  mounted() {
    xray.index()
    this.getStartDates()
    this.getAttendance()
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      filterBy: null,
      revenue: 0,
      appointments: 0,
      attended: 0,
      serviced_patients: 0,
      attendance: 0,
      statistics: [],
      dataToExport: [],
      excelColumns: [
        { label: 'Product', field: 'product' },
        { label: 'Count', field: 'count' },
        { label: 'Sum', field: 'sum', dataFormat: this.priceFormat },
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
            slidesToShow: 3,
          },
        }, {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '15',
            slidesToShow: 1,
          },
        }],
      },
      series: [],
      chartOptions: {
        labels: [],
        dataLabels: {
          enabled: false,
        },
      },
    }
  },
  methods: {
    onFilterChange(value) {
      const today = moment().format('YYYY-MM-DD')
      if (value && value === 2) {
        // Get Last 2 years Date from now
        const last2YearDate = moment().subtract(2, 'years').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = last2YearDate
      }
      if (value && value === 1) {
        // Get first date of current year
        const firstDateOfYear = moment().startOf('year').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = firstDateOfYear
      }
      if (value && value !== 2 && value !== 1) {
        const secondDate = moment().subtract(value, 'days').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = secondDate
      }
      if (value) {
        this.getStats(this.startDate, this.endDate)
      }
    },
    getStartDates() {
      this.endDate = moment().format('YYYY-MM-DD')
      this.startDate = moment().add(-30, 'days').format('YYYY-MM-DD')
      this.getStats(this.startDate, this.endDate)
      // getDatesForCurrentYear().then(response => {
      //   const start = response[0]
      //   const end = response[response.length - 1]
      //   this.startDate = start['?column?'].split('T')[0]
      //   this.endDate = end['?column?'].split('T')[0]
      //   this.getStats(this.startDate, this.endDate)
      // })
    },
    onDateChange() {
      this.filterBy = null
      this.getStats(this.startDate, this.endDate)
    },

    getStats(start, end) {
      getClinicStats(start, end).then(response => {
        if (response && response.revenue) {
          this.revenue = Number(response.revenue).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          this.appointments = Number(response.appointments).toLocaleString()
          this.attended = Number(response.attended).toLocaleString()
          this.serviced_patients = Number(response.serviced).toLocaleString()
        }
      })
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
    getAttendance() {
      clinicStatisticsAttendance().then(response => {
        if (typeof response !== 'string') {
          this.attendance = response[0].count
        } else {
          console.error(response)
        }
      })
    },
  },
}
</script>

<style>
.iq-card-body{
  flex: unset;
}

</style>
