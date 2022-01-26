<template>
  <b-container fluid>
    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <h2 class="card-title mt-3">Missing Services</h2>
        <b-row>
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
              <b-th>Lead</b-th>
              <b-th>Owner</b-th>
              <b-th>Date of appointment</b-th>
              <b-th>Appointment status</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(appointment, index) in appointments" :key="index">
              <b-td>
                <router-link v-if="appointment.lead_name" :to="`/patients/${appointment.lead_id}`">{{ appointment.lead_name }}</router-link>
                <span v-else>N/A</span>
              </b-td>
              <b-td>{{ appointment.lead_owner || 'N/A' }}</b-td>
              <b-td>{{ appointment.appointment_date && appointment.appointment_date.split('T')[0] }}</b-td>
              <b-td>{{ getStatus(appointment.appointment_status) }}</b-td>
            </b-tr>
            <b-tr v-if="loading">
              <b-td colspan="4">
                <div class="mt-3 text-center">
                  <div class="text-center text-primary my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="loading">Loading...</strong>
                  </div>
                </div>
              </b-td>
            </b-tr>
            <b-tr v-if="!loading && !appointments.length">
              <b-td colspan="4">
                <div class="mt-3 text-center">
                  <p>No data found in this date range...</p>
                </div>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </template>
    </iq-card>
  </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import { getAppointmentsWithoutServices } from '../../services/callCenterService'
import moment from 'moment'

export default {
  components: {
    IqCard,
  },
  name: 'MissingServices',
  mounted() {
    xray.index()
    this.getStartDates()
  },
  data: function () {
    return {
      startDate: null,
      endDate: null,
      filterBy: null,
      loading: false,
      appointments: [],
    }
  },
  methods: {
    getStartDates() {
      this.endDate = moment().format('YYYY-MM-DD')
      this.startDate = moment().add(-30, 'days').format('YYYY-MM-DD')
      this.fetchAppointments(this.startDate, this.endDate)
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
        this.fetchAppointments(this.startDate, this.endDate)
      }
    },
    onDateChange() {
      this.fetchAppointments(this.startDate, this.endDate)
    },
    fetchAppointments(start, end) {
      if (start && end) {
        this.loading = true
        this.appointments = []
        getAppointmentsWithoutServices(start, end).then(response => {
          if (response && response.length && Array.isArray(response)) {
            this.appointments = [...response]
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    getStatus(status) {
      if (status) {
        return 'Attended'
      }
      if (!status && typeof status === 'boolean') {
        return 'Not Attended'
      }
      return ''
    },
  },
}
</script>
