<template>
  <b-row>
    <b-col sm="12">
      <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
        <template v-slot:headerTitle>
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="card-title">Appointments By Product Group</h4>
            <vue-excel-xlsx
              v-if="dataToExport && dataToExport.length"
              :data="dataToExport"
              :columns="excelColumns"
              :filename="fileName"
              :sheetname="'New Patients'"
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
            <AmChart v-if="chartBodyData" element="appointmentsByProductGroupChart" type="leads" :option="chartBodyData" />
            <!-- <apex-chart type="bar" :series="series" :options="chartOptions" /> -->
          </div>
          <div class="mt-3 text-center" v-if="loading">
            <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="loading">Loading...</strong>
            </div>
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
import { getAppointmentsByProduct } from '../../services/statistics'
import moment from 'moment'
import AmChart from '@/components/AmChart'

export default {
  name: 'AppointmentsByProduct',
  components: { IqCard, AmChart },
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
    initChart(data, products) {
      this.chartBodyData = {
        colors: ['#e64141', '#00ca00', '#ffd400'],
        xAxis: ['date'],
        yAxis: products,
        data: data,
      }
    },
    onDateChange() {
      if (this.startDate && this.endDate) {
        this.getAppointments(this.startDate, this.endDate)
      }
    },
    getAppointments(start, end) {
      this.loading = true
      this.noData = false
      this.chartBodyData = null
      this.dataToExport = []
      getAppointmentsByProduct(start, end, 'en')
        .then((response) => {
          this.loading = false
          if (response && response.length && Array.isArray(response)) {
            this.noData = false
            this.setDataForChart(response)
          } else {
            this.noData = true
          }
        })
        .catch(() => {
          this.noData = false
          this.loading = false
        })
    },
    setDataForChart(data) {
      let datesArray = []
      let seriesData = []
      this.dataToExport = []

      const productList = data.map(item => item.products)
      const productGroups = [...new Set([].concat.apply([], productList))]

      datesArray = data.map(item => item.appointments_date.split('T')[0])
      datesArray = [...new Set(datesArray)]

      // let amChartData = []
      let amChartData = []
      datesArray.forEach(date => {
        let obj = { date: date }
        const itemsByDate = data.filter(item => item.appointments_date.split('T')[0] === date)
        productGroups.forEach(product => {
          const isProductHasDate = itemsByDate.find(item => item.products.includes(product))
          if (isProductHasDate) {
            obj[product] = isProductHasDate.appointment_count ? Number(isProductHasDate.appointment_count) : 0
          } else {
            obj[product] = 0
          }
        })
        amChartData.push(obj)
      })

      this.initChart(amChartData, productGroups)
      // productGroups.forEach(item => {
      //   const appointments = data.filter(item => item.products.includes)
      // })

      this.series = [
        {
          name: 'New Patients',
          data: seriesData,
        },
      ]

      this.chartOptions = {
        dataLabels: {
          enabled: false,
        },
        chart: {
          type: 'bar',
          height: 350,
          stacked: false,
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
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        yaxis: {
          title: {
            text: 'New Patients',
          },
          labels: {
            formatter: function (y) {
              return y.toLocaleString()
            },
          },
        },
        xaxis: {
          type: 'datetime',
          categories: datesArray,
          labels: {
            formatter: function (value, timestamp) {
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
      }

      // this.prepareDataForExport(data)
    },

    prepareDataForExport(data) {
      // Get Data for export
      this.fileName = `SmartPRM_${this.client}_Appointments_by_product_group_(${moment(this.start).format('DD/MM/YYYY')} - ${moment(this.end).format('DD/MM/YYYY')})`
      data.forEach((item) => {
        const obj = {
          product_group: '',

        }
        this.dataToExport.push(obj)
      })
    },
  },
  data() {
    return {
      chartBodyData: null,
      startDate: null,
      endDate: null,
      loading: true,
      noData: false,
      dataToExport: [],
      fileName: '',
      excelColumns: [
        { label: 'Product Group', field: 'product_group' },
        { label: 'Appointments', field: 'appointments' },
      ],
      series: [
        {
          name: 'Leads By Day',
          data: [],
        },
      ],
      chartOptions: {
        // xaxis: {
        //   type: 'datetime',
        //   categories: [],
        //   labels: {
        //     formatter: function(value, timestamp) {
        //       return moment(timestamp).format('ll')
        //     },
        //   },
        // },
        // legend: {
        //   position: 'right',
        //   offsetY: 40,
        // },
        // fill: {
        //   opacity: 1,
        // },
      },
    }
  },
}
</script>
