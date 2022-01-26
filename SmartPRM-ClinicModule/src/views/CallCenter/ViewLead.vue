<template>
  <b-container fluid>
    <p>Lead View</p>
  </b-container>
</template>

<script>

import { xray } from '../../config/pluginInit'
export default {
  name: 'ViewLead',
  mounted() {
    xray.index()
  },
  data() {
  },
}
</script>
<style scoped>

</style>
