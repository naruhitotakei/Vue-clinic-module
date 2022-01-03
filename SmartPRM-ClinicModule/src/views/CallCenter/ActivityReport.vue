<template>
    <div class="container">
        <h1>Activity Report</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
export default {
  components: {
  },
  name: 'ActivityReport',
  mounted() {
    xray.index()
  },
  data: function() {
    return {
    }
  },
  methods: {
  },
}
</script>
