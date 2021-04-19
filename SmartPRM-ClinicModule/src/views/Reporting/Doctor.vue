<template>
    <div class="container">
        <h1>Doctor</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'

export default {
  components: {
  },
  name: 'Doctor',
  data: function () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    xray.index()
  }
}
</script>
