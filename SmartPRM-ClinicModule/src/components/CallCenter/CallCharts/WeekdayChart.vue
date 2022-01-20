<template>
  <b-row>
    <b-col sm="12">
      <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
        <template v-slot:headerTitle>
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="card-title">Calls by weekday</h4>
          </div>
        </template>
        <template v-slot:body>
          <div class="mt-3" v-if="!loading && !noData">
            <apex-chart type="bar" :series="series" :options="chartOptions" />
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
import IqCard from '@/components/xray/cards/iq-card'

export default {
  name: 'WeekdayChart',
  components: {
    IqCard,
  },
  data() {
    return {
      loading: false,
      noData: false,
      series: [
        {
          name: 'User A',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'User B',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'User C',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'User D',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '01/01/2011 GMT',
            '01/02/2011 GMT',
            '01/03/2011 GMT',
            '01/04/2011 GMT',
            '01/05/2011 GMT',
            '01/06/2011 GMT',
          ],
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
