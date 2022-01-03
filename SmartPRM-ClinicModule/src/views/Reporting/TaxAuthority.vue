<template>
    <div class="container">
        <h1>Tax Authority</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'

export default {
  components: {
  },
  name: 'TaxAuthority',
  data: function() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    xray.index()
  },
}
</script>
