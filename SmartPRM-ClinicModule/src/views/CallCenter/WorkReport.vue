<template>
    <div class="container">
        <h1>Work Report</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
export default {
  components: {
  },
  name: 'WorkReport',
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
