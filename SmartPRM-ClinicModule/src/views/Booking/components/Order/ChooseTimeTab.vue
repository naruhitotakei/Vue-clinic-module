<template>
  <div class="mt-5" v-if="datesList.length > 0">
    <slick :option="{
      slidesToShow: 9
    }">
    <date-card v-for="(dateItem, index) in datesList" :key="`date_${index}`"
    :date="dateItem.date"
    :priceField="dateItem.priceField"
    />
    </slick>
  </div>
</template>

<script>
import Slick from '@/components/xray/slider/Slick.vue'
import DateCard from './DateCard.vue'
export default {
  components: {
    Slick,
    DateCard
  },
  data: function () {
    return {
      datesList: []
    }
  },
  methods: {
    getDatesArr: function () {
      const resArray = []
      const currDate = new Date(Date.now())
      const endDate = new Date(currDate.getTime())
      endDate.setDate(endDate.getDate() + 17)
      /* eslint no-unmodified-loop-condition: "off" */
      while (currDate <= endDate) {
        resArray.push({
          date: new Date(currDate),
          priceField: '35$'
        })
        currDate.setDate(currDate.getDate() + 1)
      }
      return resArray
    }
  },
  mounted () {
    this.datesList = this.getDatesArr()
  }
}
</script>
