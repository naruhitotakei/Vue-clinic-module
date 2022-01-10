<template>
  <b-row>
    <b-col sm="12">
      <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
        <template v-slot:headerTitle>
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="card-title">Revenue By Product</h4>
            <vue-excel-xlsx
              v-if="dataToExport && dataToExport.length"
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
          <div class="mt-3" v-if="!loading && !noData">
            <apex-chart
              type="pie"
              width="100%"
              height="500px"
              :series="series"
              :options="chartOptions"
            />
          </div>
          <div class="mt-3 text-center" v-if="loading">
            <p>Loading Revenue By Product...</p>
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

export default {
  name: 'RevenueByProduct',
  components: { IqCard },
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
    onDateChange() {
      if (this.startDate && this.endDate) {
        this.getClinicRevenueByProduct(this.startDate, this.endDate)
      }
    },
    priceFormat(value) {
      return this.$options.filters.formatPrice(value)
    },
    getClinicRevenueByProduct(start, end) {
      this.loading = true
      this.noData = false
      getRevenueByProduct(start, end)
        .then((response) => {
          this.loading = false
          if (response && response.length && Array.isArray(response)) {
            this.noData = false
            this.setChartData(response)
          } else {
            this.noData = true
          }
        })
        .catch(() => {
          this.noData = false
          this.loading = false
        })
    },
    setChartData(data) {
      let prNames = []
      let sumArray = []
      this.dataToExport = []
      data.forEach((item) => {
        prNames.push(item.pr_name)
        const sum = Number(item.sum)
        sumArray.push(sum)

        this.dataToExport.push({
          product: item.pr_name,
          count: item.count,
          sum: sum,
        })
      })

      this.series = [...sumArray]
      let self = this

      this.chartOptions = {
        labels: [...prNames],
        dataLabels: {
          enabled: false,
        },
        legend: {
          formatter: function (seriesName, opts) {
            const percentage =
              parseFloat(
                opts.w.globals.seriesPercent[opts.seriesIndex],
              ).toFixed(1) + '%'
            return seriesName + ' - ' + percentage
          },
        },
        tooltip: {
          y: {
            formatter: function (value, { series, seriesIndex, w }) {
              const numb = String(value).match(/\d/g).join('')
              return self.$options.filters.formatPrice(numb)
            },
          },
        },
      }
    },
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      noData: false,
      loading: true,
      dataToExport: [],
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
