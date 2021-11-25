<template>
  <div class="mt-5" v-if="datesList.length > 0">
    <div style="
      padding-left: 48px;
      padding-right: 48px;
    ">
      <slick :option="slickOptions">
        <date-card
          v-for="(dateItem, index) in datesList"
          :key="`date_${index}`"
          :date="dateItem.date"
          :aviability="dateItem.aviability"
          :active="isActiveDate(dateItem.date)"
          :totalPrice="totalPrice"
          @date-selected="dateSelectionHandler"
        />
      </slick>
    </div>
    <b-container>
      <b-row>
        <b-col md="9">
          <template v-if="scedule.length">
          <div class="favorite-doctor text-left">
            {{ $t('public.onlineBooking.chooseYourFavoriteDoctor') }}
          </div>
          <app-multiselect
          :options="selectedDateDoctors"
          label="name"
          trackBy="name"
          v-model="filterDoctors"
          :placeholder="$t('public.onlineBooking.selectOption')"
          :selectLabel="$t('public.onlineBooking.pressEnterToSelect')"
          :deselectLabel="$t('public.onlineBooking.pressEnterToRemove')"
          />
          </template>
          <time-selection-table
          :items="filteredScedule"
          @select-doctor="$emit('select-doctor', $event)"
          :selectedSlot="selectedSlot"
          :selectedDate="selectedDate"
          />
        </b-col>
        <b-col md="3">
          <total-order-info
          :services="services"
          :totalPrice="totalPrice"
          :date="selectedDate"
          :doctor="doctor"
          :time="time"
          :selectedSlot="selectedSlot"
          />
          <div class="d-flex justify-content-between mt-3">
            <b-button
              align-self="end"
              variant="primary"
              @click="$emit('change-tab', 0)"
            >
              {{ $t('public.onlineBooking.backToServices') }}
            </b-button>
            <b-button
              align-self="end"
              variant="primary"
              :disabled="!selectedSlot"
              @click="$emit('change-tab', 2)"
            >
              {{ $t('public.onlineBooking.toReview') }}
            </b-button>
          </div>
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
import AppMultiselect from '../Controls/AppMultiselect.vue'

export default {
  components: {
    Slick,
    DateCard,
    TimeSelectionTable,
    TotalOrderInfo,
    AppMultiselect
  },
  props: {
    services: Array,
    totalPrice: Number,
    selectedDate: Date,
    time: String,
    doctor: Object,
    selectedSlot: Object
  },
  data: function () {
    return {
      datesList: [],
      scedule: [],
      filteredScedule: [],
      selectedDateDoctors: [],
      filterDoctors: []
    }
  },
  computed: {
    slickOptions () {
      return {
        infinite: false,
        slidesToShow: 9,
        slidesToScroll: 2,
        dots: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: { slidesToShow: 6 }
          },
          {
            breakpoint: 992,
            settings: { slidesToShow: 4 }
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 3 }
          },
          {
            breakpoint: 576,
            settings: { slidesToShow: 2 }
          }
        ],
        prevArrow: /* html */`
          <a href="#" class="ri-arrow-left-s-line left" style="
            margin-left: -48px;
            background: transparent;
          "></a>
        `,
        nextArrow: /* html */`
          <a href="#" class="ri-arrow-right-s-line right" style="
            margin-right: -48px;
            background: transparent;
          "></a>
        `
      }
    }
  },
  watch: {
    selectedDateDoctors: {
      immediate: true,
      handler: function (value) {
        this.scedule = this.sceduleFormation(value, dailySchedule)
      }
    },
    filterDoctors: {
      immediate: true,
      handler: function (doctors) {
        this.filteredScedule = (!doctors.length) ? this.scedule : this.filterSceduleByDoctors(doctors)
      }
    },
    scedule: {
      immediate: true,
      handler: function (value) {
        this.filteredScedule = (!this.filterDoctors.length) ? value : this.filterSceduleByDoctors(this.filterDoctors)
        !this.selectedSlot && this.initialSlot()
      }
    }
  },
  created () {
    this.datesList = this.getDatesArr()
    !this.selectedDate ? this.initialDate() : this.getsDayScedule(this.selectedDate)
  },
  methods: {
    getDatesArr () {
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
          aviability: startDate.getDate() === currDate.getDate()
            ? this.$t('public.onlineBooking.taken')
            : getDayOfWeek(startDate) === 'Sunday' && this.$t('public.onlineBooking.closed')
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
      this.selectedDateDoctors = dayScedule
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
      this.filterDoctors = []
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
    },
    filterSceduleByDoctors: function (doctors) {
      const resScedule = JSON.parse(JSON.stringify(this.scedule))
      if (resScedule.length > 0 && doctors.length > 0) {
        resScedule.forEach(timeItem => {
          timeItem.doctors = timeItem.doctors.filter(doctor => {
            if (doctors.some(filterDoc => filterDoc.name === doctor.name)) {
              return doctor
            }
          })
        })
      }
      return resScedule
    },
    initialSlot: function () {
      if (this.scedule.length > 0) {
        let doctor = null
        let time = ''
        for (let index = 0; index < this.scedule.length; index++) {
          const timeItem = this.scedule[index]
          if (timeItem.doctors.length > 0) {
            doctor = timeItem.doctors[0]
            time = timeItem.time
            break
          }
        }
        if (doctor) {
          this.$emit('select-doctor', { doctor, time })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/app-vars.scss";
.favorite-doctor{
  color: $primary;
  font-size: 16px;
}
</style>
