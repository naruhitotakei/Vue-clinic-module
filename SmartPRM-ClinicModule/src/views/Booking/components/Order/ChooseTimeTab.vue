<template>
  <div class="mt-5" v-if="datesList.length > 0">
    <slick :option="{
      infinite: false,
      slidesToShow: 9,
      slidesToScroll: 9,
      arrows: false,
      dots: true
    }">
    <date-card v-for="(dateItem, index) in datesList" :key="`date_${index}`"
    :date="dateItem.date"
    :aviability="dateItem.aviability"
    :active="isActiveDate(dateItem.date)"
    :totalPrice="totalPrice"
    @date-selected="dateSelectionHandler"
    />
    </slick>
    <b-container>
      <b-row>
        <b-col md="9">
          <time-selection-table :items="scedule" @select-doctor="$emit('select-doctor', $event)"/>
        </b-col>
        <b-col md="3">
          <total-order-info
          :services="services"
          :totalPrice="totalPrice"
          :date="selectedDate"
          :doctor="doctor"
          :time="time"
          />
        </b-col>
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
import TotalOrderInfo from './TotalOrderInfo.vue'

export default {
  components: {
    Slick,
    DateCard,
    TimeSelectionTable,
    TotalOrderInfo
  },
  props: {
    services: Array,
    totalPrice: Number,
    selectedDate: Date,
    time: String,
    doctor: Object
  },
  data: function () {
    return {
      datesList: [],
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
    !this.selectedDate ? this.initialDate() : this.getsDayScedule(this.selectedDate)
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
    initialDate: function () {
      const selectedDateItem = this.datesList.find(date => !date.aviability)
      !!selectedDateItem && this.dateSelectionHandler(selectedDateItem.date)
    },
    getsDayScedule: function (date) {
      let dayScedule = []
      const dateFromList = this.datesList.find(searchedDate => searchedDate.date.getDate() === date.getDate())
      if (!!dateFromList && !dateFromList.aviability) {
        const set = new Set()
        const itemsCount = Math.floor(Math.random() * 6) + 1
        while (set.size < itemsCount) {
          set.add(daysScedule[(Math.floor(Math.random() * daysScedule.length))])
        }
        dayScedule = Array.from(set)
      }
      this.selectedDateScedule = dayScedule
    },
    isActiveDate: function (date) {
      let active = false
      if (!!date && !!this.selectedDate) {
        active = date.getDate() === this.selectedDate.getDate()
      }
      return active
    },
    dateSelectionHandler: function (date) {
      this.getsDayScedule(date)
      this.$emit('select-date', date)
    },
    sceduleFormation: function (scedule, template) {
      const resScedule = []
      if (scedule.length > 0) {
        template.forEach(time => {
          const doctors = scedule.filter(doctor => !doctor.busyTimes.some(busyTime => busyTime === time))
          resScedule.push({
            time,
            doctors,
            totalPrice: '$' + this.totalPrice
          })
        })
      }
      return resScedule
    }
  }
}
</script>
