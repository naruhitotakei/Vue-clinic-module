<template>
    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <b-row class="mt-2 mb-2">
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
                <b-form-select-option :value="7"
                  >Last 7 Days</b-form-select-option
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
      </template>
      <template v-slot:body>
        <b-table-simple responsive bordered stripped>
          <b-thead>
            <b-tr>
              <b-th>Caller</b-th>
              <b-th>Lead number</b-th>
              <b-th>Lead name</b-th>
              <b-th>Call missed at</b-th>
              <b-th>Returned?</b-th>
              <b-th>Time to ret. call</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>Anja Škorić</b-td>
              <b-td>1234</b-td>
              <b-td>Anja Škorić</b-td>
              <b-td>0</b-td>
              <b-td>00:00</b-td>
              <b-td>00:00</b-td>
            </b-tr>
            <!-- <b-tr v-if="loading">
              <b-td colspan="6">
                <div class="mt-3 text-center">
                  <div class="text-center text-primary my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="loading">Loading...</strong>
                  </div>
                </div>
              </b-td>
            </b-tr>
            <b-tr v-if="!loading && !missed_calls.length">
              <b-td colspan="6">
                <div class="mt-3 text-center">
                  <p>No data found in this date range...</p>
                </div>
              </b-td>
            </b-tr> -->
          </b-tbody>
        </b-table-simple>
      </template>
    </iq-card>
</template>

<script>
import IqCard from '@/components/xray/cards/iq-card'
import moment from 'moment'

export default {
  name: 'MissedCalls',
  components: {
    IqCard,
  },
  mounted() {
    this.getStartDates()
  },
  methods: {
    getStartDates() {
      this.endDate = moment().format('YYYY-MM-DD')
      this.startDate = moment().add(-30, 'days').format('YYYY-MM-DD')
      // this.fetchAppointments(this.startDate, this.endDate)
    },
    onFilterChange(value) {
      const today = moment().format('YYYY-MM-DD')
      if (value && value === 2) {
        // Get Last 2 years Date from now
        const last2YearDate = moment().subtract(2, 'years').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = last2YearDate
      }
      if (value && value !== 2) {
        const secondDate = moment().subtract(value, 'days').format('YYYY-MM-DD')
        this.endDate = today
        this.startDate = secondDate
      }
      if (value) {
        // this.fetchAppointments(this.startDate, this.endDate)
      }
    },
    onDateChange() {
      // this.fetchAppointments(this.startDate, this.endDate)
    },
  },
  data: function () {
    return {
      startDate: null,
      endDate: null,
      filterBy: null,
      loading: false,
      missed_calls: [],
    }
  },
}
</script>
