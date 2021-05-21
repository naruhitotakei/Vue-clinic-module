<template>
    <div class="container">
        <h1>Business Customers</h1>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
export default {
  components: {
  },
  name: 'BusinessCustomers',
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
