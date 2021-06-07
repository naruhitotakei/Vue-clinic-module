<template>
    <div class="container">
        <h1>Free Slots</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
export default {
  components: {
  },
  name: 'FreeSlots',
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
