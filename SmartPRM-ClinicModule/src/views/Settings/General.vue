<template>
    <div class="container">
        <h1>General</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'

export default {
  components: {
  },
  name: 'General',
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

<style>
</style>
