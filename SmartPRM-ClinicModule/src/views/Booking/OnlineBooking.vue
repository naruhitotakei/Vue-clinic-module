<template>
  <public-layout>
    <!-- Tabs with card integration -->
    <b-card no-body>
      <b-tabs v-model="tabIndex" small card>
        <b-tab title="Order">
          <Order/>
        </b-tab>
        <b-tab title="Map">
          <Map/>
        </b-tab>
        <b-tab title="Team" >
          <Team/>
        </b-tab>
        <b-tab title="Info" disabled>I'm the last tab</b-tab>
      </b-tabs>
    </b-card>

  </public-layout>
</template>

<script>
import { xray } from '../../config/pluginInit'
import Order from './components/Order/Order'
import Map from './components/Map'
import Team from './components/Team'
import PublicLayout from '../../layouts/PublicLayout.vue'

export default {
  components: {
    Order,
    Map,
    Team,
    PublicLayout
  },
  name: 'OnlineBooking',
  data: function () {
    return {
      tabIndex: 0
    }
  },
  methods: {
  },
  mounted () {
    xray.index()
  }
}
</script>
