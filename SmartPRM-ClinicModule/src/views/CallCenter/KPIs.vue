<template>
    <div class="container">
        <h1>KPIs</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
export default {
  components: {
  },
  name: 'KPIs',
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
