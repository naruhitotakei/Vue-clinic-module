<template>
    <div class="container">
        <h1>Appointments</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'

export default {
  components: {
  },
  name: 'Appointments',
  mounted () {
    xray.index()
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
