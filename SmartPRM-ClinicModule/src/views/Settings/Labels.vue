<template>
    <div class="container">
        <h1>Labels</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
export default {
  components: {
  },
  name: 'Labels',
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
