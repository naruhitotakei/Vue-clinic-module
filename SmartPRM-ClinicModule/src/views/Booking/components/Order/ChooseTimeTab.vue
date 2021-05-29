<template>
  <div class="mt-5" v-if="datesList.length > 0">
    <slick :option="{
      slidesToShow: 9,
      leftArrow: ''
    }">
    <date-card v-for="(dateItem, index) in datesList" :key="`date_${index}`"
    :date="dateItem.date"
    :priceField="dateItem.priceField"
    :aviability="dateItem.aviability"
    :active="isActiveDate(dateItem.date)"
    @date-selected="dateSelectionHandler"
    />
    </slick>
    <b-container>
      <b-row>
        <b-col md="9">
          <time-selection-table :items="scedule" />
        </b-col>
        <b-col md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Slick from '@/components/xray/slider/Slick.vue'
import DateCard from './DateCard.vue'
import { getDayOfWeek } from '@/Utils/appDate'
import TimeSelectionTable from './TimeSelectionTable.vue'
import { dailySchedule, daysScedule } from '../../booking-data'

export default {
  components: {
    Slick,
    DateCard,
    TimeSelectionTable
  },
  data: function () {
    return {
      datesList: [],
      selectedDate: null,
      scedule: [],
      selectedDateScedule: []
    }
  },
  watch: {
    selectedDateScedule: {
      immediate: true,
      handler: function (value) {
        this.scedule = this.sceduleFormation(value, dailySchedule)
      }
    }
  },
  created () {
    this.datesList = this.getDatesArr()
    this.selectedDateScedule = daysScedule
  },
  methods: {
    getDatesArr: function () {
      const resArray = []
      const currDate = new Date(Date.now())
      const startDate = new Date(currDate.getTime())
      const endDate = new Date(currDate.getTime())
      endDate.setDate(endDate.getDate() + 17)
      /* eslint no-unmodified-loop-condition: "off" */
      while (startDate <= endDate) {
        resArray.push({
          date: new Date(startDate),
          priceField: '35$',
          aviability: startDate.getDate() === currDate.getDate() ? 'taken' : getDayOfWeek(startDate) === 'Sunday' && 'closed'
        })
        startDate.setDate(startDate.getDate() + 1)
      }
      return resArray
    },
    isActiveDate: function (date) {
      return date.getDate() === this.selectedDate
    },
    dateSelectionHandler: function (date) {
      this.selectedDate = date.getDate()
    },
    sceduleFormation: function (scedule, template) {
      const resScedule = []
      template.forEach(time => {
        const doctors = scedule.filter(doctor => !doctor.busyTimes.some(busyTime => busyTime === time))
        resScedule.push({
          time,
          doctors,
          totalPrice: '35$'
        })
      })
      return resScedule
    }
  }
}
</script>
