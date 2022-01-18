<template>
  <div>
    <b-row>
      <b-col sm="12">
        <iq-card class="mb-3" class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <b-form @submit.prevent>
              <b-row align-v="center" class="py-2">
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px">Filter</label>
                    <b-form-select
                      style="line-height: normal"
                      v-model="filterBy"
                      @change="onFilterChange"
                    >
                      <b-form-select-option :value="null"
                        >Select Filter</b-form-select-option
                      >
                      <b-form-select-option :value="30"
                        >Last 30 Days</b-form-select-option
                      >
                      <b-form-select-option :value="90"
                        >Last 90 Days</b-form-select-option
                      >
                      <b-form-select-option :value="180"
                        >Last 180 Days</b-form-select-option
                      >
                      <b-form-select-option :value="365"
                        >Last 365 Days</b-form-select-option
                      >
                      <b-form-select-option :value="2"
                        >Last 2 Years</b-form-select-option
                      >
                      <b-form-select-option :value="1"
                        >Year-To-Date</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px">From:</label>
                    <b-form-input
                      style="line-height: normal"
                      class="date"
                      id="exampleStartdate"
                      type="date"
                      v-model="startDate"
                      @change="onDateChange"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="6" md="4" lg="3">
                  <b-form-group>
                    <label style="padding-top: 8px">End:</label>
                    <b-form-input
                      style="line-height: normal"
                      class="date"
                      id="exampleEnddate"
                      type="date"
                      v-model="endDate"
                      @change="onDateChange"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </template>
        </iq-card>
      </b-col>
    </b-row>

    <template v-if="startDate && endDate">
        <HoursChart />
        <WeekdayChart />
        <WorkingDayChart />
        <WeekendChart />
    </template>
  </div>
</template>

<script>
import IqCard from '@/components/xray/cards/iq-card'
import HoursChart from '@/components/CallCenter/CallCharts/HoursChart'
import WeekdayChart from '@/components/CallCenter/CallCharts/WeekdayChart'
import WeekendChart from '@/components/CallCenter/CallCharts/WeekendChart'
import WorkingDayChart from '@/components/CallCenter/CallCharts/WorkingDayChart'
import moment from 'moment'

export default {
  name: 'CallsByHour',
  components: {
    IqCard,
    HoursChart,
    WeekdayChart,
    WeekendChart,
    WorkingDayChart,
  },
  mounted() {
    this.getStartDates()
  },
  data() {
    return {
      loading: false,
      noData: false,
      startDate: null,
      endDate: null,
      filterBy: null,
    }
  },
  methods: {
    onFilterChange(value) {
      const today = moment().format('YYYY-MM-DD')
      if (value && value === 2) {
        // Get Last 2 years Date from now
        const last2YearDate = moment().subtract(2, 'years').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = last2YearDate
      }
      if (value && value === 1) {
        // Get first date of current year
        const firstDateOfYear = moment().startOf('year').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = firstDateOfYear
      }
      if (value && value !== 2 && value !== 1) {
        const secondDate = moment().subtract(value, 'days').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = secondDate
      }
      if (value) {
        // this.getStats(this.startDate, this.endDate)
      }
    },
    getStartDates() {
      this.endDate = moment().format('YYYY-MM-DD')
      this.startDate = moment().add(-30, 'days').format('YYYY-MM-DD')
      // this.getStats(this.startDate, this.endDate)
    },
    onDateChange() {
      this.filterBy = null
      // this.getStats(this.startDate, this.endDate)
    },
  },
}
</script>
