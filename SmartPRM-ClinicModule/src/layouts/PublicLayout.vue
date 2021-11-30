<template>
    <div class="container">
        <slot v-if="isLocalized"></slot>
    </div>
</template>

<script>
import { localize } from 'vee-validate'

export default {
  name: 'PublicLayout',
  components: {
  },
  data () {
    return {
      isLocalized: false
    }
  },
  async mounted () {
    const response = await fetch('/api/config')

    if (response.ok === false) {
      return
    }

    const { lang } = await response.json()
    this.$i18n.locale = lang
    localize(lang)
    this.isLocalized = true
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
  @media (max-width: 992px) {
  .full-screen {
    display: none;
  }
}
</style>
