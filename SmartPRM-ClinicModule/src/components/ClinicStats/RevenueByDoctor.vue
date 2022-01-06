<template>
    <b-row>
        <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title">Revenue By Doctor</h4>
                <vue-excel-xlsx
                    v-if="dataToExport && dataToExport.length"
                    :data="dataToExport"
                    :columns="excelColumns"
                    :filename="'Revenue By Doctor'"
                    :sheetname="'Revenue By Doctor'"
                    class="btn btn-primary"
                    >
                    Download Excel
                </vue-excel-xlsx>
            </div>
            <!-- <h4 class="card-title mt-3">Revenue By Doctor</h4>
            <b-form @submit.prevent>
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
                <b-col cols="12" sm="6" md="4" lg="3" offset-lg="3" class="text-right" v-if="dataToExport && dataToExport.length">
                  <vue-excel-xlsx
                    :data="dataToExport"
                    :columns="excelColumns"
                    :filename="'Revenue By Doctor'"
                    :sheetname="'Revenue By Doctor'"
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
              <apex-chart type="bar" :series="series" :options="chartOptions" />
            </div>
            <div class="mt-3 text-center" v-if="loading">
                <p>Loading Revenue By Doctor...</p>
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
import { getRevenueByDoctor } from '../../services/statistics'

export default {
  name: 'RevenueByDoctor',
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
        this.getDoctorRevenue(this.startDate, this.endDate)
      }
    },
    getDoctorRevenue(start, end) {
      this.loading = true
      this.noData = false
      getRevenueByDoctor(start, end).then(response => {
        this.setDataForChart(response)
        this.loading = false
        if (response && response.length) {
          this.noData = false
          this.setDataForChart(response)
        } else {
          this.noData = true
        }
      }).catch(() => {
        this.noData = false
        this.loading = false
      })
    },
    setDataForChart(data) {
      if (data && Array.isArray(data)) {
        this.dataToExport = []

        let doctors = data.map(item => item.doctor_name)
        const uniqueDoctors = [...new Set(doctors)]

        let products = data.map(item => item.product_name)
        const uniqueProducts = [...new Set(products)]

        let sumByProduct = []
        uniqueProducts.forEach(product => {
          const prodsByDoctor = data.filter(item => item.product_name === product)
          const obj = { name: product, data: [] }
          uniqueDoctors.forEach(doctor => {
            const isProductHasDoctor = prodsByDoctor.find(item => item.doctor_name === doctor)
            if (isProductHasDoctor) {
              obj.data.push(Number(isProductHasDoctor.sum))
            } else {
              obj.data.push(0)
            }
          })
          sumByProduct.push(obj)
        })

        this.series = sumByProduct

        this.chartOptions = {
          legend: {
            position: 'right',
          },
          xaxis: {
            categories: uniqueDoctors,
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toLocaleString() + ' €'
              },
            },
          },
        }

        this.prepareDataForExport(data, uniqueDoctors)
      }
    },

    prepareDataForExport(data, doctors) {
      // Get Data for export
      if (Array.isArray(data) && Array.isArray(doctors)) {
        doctors.forEach(doctor => {
          const sum = data.filter(item => item.doctor_name === doctor)
            .map(item => item.sum && Number(item.sum))
            .reduce((a, b) => Number(a) + Number(b))
          this.dataToExport.push({ doctor, revenue: sum.toLocaleString() + ' €' })
        })
      }
    },
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      noData: false,
      loading: true,
      series: [],
      dataToExport: [],
      excelColumns: [
        { label: 'Doctor', field: 'doctor' },
        { label: 'Revenue', field: 'revenue' },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              pan: false,
              zoom: false,
            },
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          categories: [],
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    }
  },
}
</script>
