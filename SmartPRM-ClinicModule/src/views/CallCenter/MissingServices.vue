<template>
  <b-container fluid>
    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <h2 class="card-title">Missing Services</h2>
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
            <b-tr v-for="i in 5" :key="i">
              <b-td>
                <router-link to="/call-center/leads">Branka Marolt Majcen</router-link>
              </b-td>
              <b-td>Lucija Zamlic</b-td>
              <b-td>2021-12-14</b-td>
              <b-td></b-td>
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
export default {
  components: {
    IqCard,
  },
  name: 'MissingServices',
  mounted() {
    xray.index()
  },
  data: function () {
    return {
    }
  },
  methods: {
  },
}
</script>
