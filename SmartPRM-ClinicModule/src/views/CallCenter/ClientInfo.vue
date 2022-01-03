<template>
    <div class="container">
        <h1>Client Info</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
export default {
  components: {
  },
  name: 'ClientInfo',
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
