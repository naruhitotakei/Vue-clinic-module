<template>
  <b-row>
    <b-col sm="12">
      <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
        <template v-slot:headerTitle>
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="card-title">Revenue By Category</h4>
            <!-- <vue-excel-xlsx
              v-if="dataToExport && dataToExport.length"
              :data="dataToExport"
              :columns="excelColumns"
              :filename="fileName"
              :sheetname="'Revenue By Product'"
              class="btn btn-primary"
            >
              Download Excel
            </vue-excel-xlsx> -->
          </div>
        </template>
        <template v-slot:body>
          <AmChart
            v-if="chartBodyData"
            element="revenueByCategoryChart"
            type="revenueByCategory"
            class="revenueByCategory"
            :option="chartBodyData"
            :height="500"
          />
          <div class="mt-3" v-if="!loading && !noData">
            <!-- chart should be here...
            <div class="pieChart" ref="pieChart"></div> -->
            <!-- <apex-chart
              type="pie"
              width="100%"
              height="500px"
              :series="series"
              :options="chartOptions"
            /> -->
          </div>
          <div class="mt-3 text-center" v-if="loading">
            <div class="text-center text-primary my-2">
              <!-- <b-spinner class="align-middle"></b-spinner>
              <strong class="loading">Loading...</strong> -->
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
import { getRevenueByProduct } from '../../services/statistics'
import moment from 'moment'
import AmChart from '@/components/AmChart'
// import * as am4core from '@amcharts/amcharts4/core'
// import * as am4charts from '@amcharts/amcharts4/charts'
// import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
// am4core.useTheme(am4themesAnimated)

export default {
  name: 'RevenueByCategory',
  components: { IqCard, AmChart },
  props: {
    start: String,
    end: String,
    client: String,
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
  mounted() {
    if (this.start && this.end) {
      this.startDate = this.start
      this.endDate = this.end
      this.onDateChange()
      this.initChart()
    }
  },
  methods: {
    async initChart() {
      this.chartBodyData = {
        colors: ['#4c9cac', '#00ca00', '#ffd400'],
        data: [
          {
            name: 'Revenue',
            children: [
              {
                name: 'Category A',
                children: [
                  {
                    name: 'Product Group A',
                    children: [
                      { name: 'Product A1', value: 200 },
                      { name: 'Product B1', value: 100 },
                      { name: 'Product C1', value: 200 },
                    ],
                  },
                  {
                    name: 'Product Group B',
                    children: [
                      { name: 'Product A1', value: 50 },
                      { name: 'Product B1', value: 70 },
                    ],
                  },
                ],
              },
              {
                name: 'Category B',
                children: [
                  {
                    name: 'Product Group AB',
                    children: [
                      { name: 'Product A1', value: 30 },
                      { name: 'Product B1', value: 20 },
                      { name: 'Product C1', value: 80 },
                    ],
                  },
                  {
                    name: 'Product Group BA',
                    children: [
                      { name: 'Product A1', value: 150 },
                      { name: 'Product B1', value: 270 },
                      { name: 'Product B1', value: 670 },
                      { name: 'Product B1', value: 90 },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    onDateChange() {
      if (this.startDate && this.endDate) {
        // this.getClinicRevenueByProduct(this.startDate, this.endDate)
      }
    },
    priceFormat(value) {
      return this.$options.filters.formatPrice(value)
    },
    getClinicRevenueByProduct(start, end) {
      this.loading = true
      this.noData = false
      this.chartBodyData = null
      getRevenueByProduct(start, end)
        .then(async (response) => {
          if (response && response.length && Array.isArray(response)) {
            await this.setChartData(response)
            this.loading = false
            this.noData = false
          } else {
            this.noData = true
            this.loading = false
          }
        })
        .catch(() => {
          this.noData = true
          this.loading = false
        })
    },
    async setChartData(data) {
      // let prNames = []
      // let sumArray = []
      const products = []
      this.dataToExport = []
      this.fileName = `SmartPRM_${
        this.client
      }_Clinic_Statistics_Revenue_by_doctor_(${moment(this.start).format(
        'DD/MM/YYYY',
      )} - ${moment(this.end).format('DD/MM/YYYY')})`
      await data.forEach((item) => {
        // prNames.push(item.pr_name)
        // const sum = Number(item.sum)
        // sumArray.push(sum)

        products.push({
          name: item.pr_name,
          sum: Number(item.sum),
        })

        this.dataToExport.push({
          product: item.pr_name,
          count: item.count,
          sum: Number(item.sum),
        })
      })

      this.initChart(data)

      // this.series = [...sumArray]
      // let self = this

      // this.chartOptions = {
      //   chart: {
      //     toolbar: {
      //       show: false,
      //     },
      //   },
      //   labels: [...prNames],
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   legend: {
      //     formatter: function (seriesName, opts) {
      //       const percentage =
      //         parseFloat(
      //           opts.w.globals.seriesPercent[opts.seriesIndex],
      //         ).toFixed(1) + '%'
      //       return seriesName + ' - ' + percentage
      //     },
      //   },
      //   tooltip: {
      //     y: {
      //       formatter: function (value, { series, seriesIndex, w }) {
      //         const numb = String(value).match(/\d/g).join('')
      //         return self.$options.filters.formatPrice(numb)
      //       },
      //     },
      //   },
      // }
    },
  },
  data() {
    return {
      chartBodyData: null,
      chart: null,
      startDate: null,
      endDate: null,
      noData: false,
      loading: true,
      dataToExport: [],
      fileName: '',
      excelColumns: [
        { label: 'Product', field: 'product' },
        { label: 'Count', field: 'count' },
        { label: 'Sum', field: 'sum', dataFormat: this.priceFormat },
      ],
      series: [],
      chartOptions: {
        labels: [],
        dataLabels: {
          enabled: false,
        },
      },
    }
  },
}
</script>

<style scoped>
.revenueByCategory canvas {
  width: 100% !important;
  max-width: 100% !important;
}
</style>
