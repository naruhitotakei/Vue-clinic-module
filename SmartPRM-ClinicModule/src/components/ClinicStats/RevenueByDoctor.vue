<template>
    <b-row>
        <b-col sm="12">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Revenue By Doctor</h4>
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
            <div class="mt-3">
              <apex-chart type="bar" :series="series" :options="chartOptions" />
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
  methods: {
    onDateChange () {
      if (this.startDate && this.endDate) {
        this.getDoctorRevenue(this.startDate, this.endDate)
      }
    },
    getDoctorRevenue (start, end) {
      getRevenueByDoctor(start, end).then(response => {
        this.setDataForChart(response)
      })
    },
    setDataForChart (data) {
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
        xaxis: {
          categories: uniqueDoctors
        }
      }
    }
  },
  data () {
    return {
      startDate: null,
      endDate: null,
      series: [],
      dataToExport: [],
      excelColumns: [
        { label: 'Doctor', field: 'doctor' },
        { label: 'Revenue', field: 'revenue' }
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
              zoom: false
            }
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          categories: []
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      }
    }
  }
}
</script>
