<template>
  <div class="container">
    <template v-if="isConfigured">
      <div class="card my-4">
        <div class="card-body d-flex justify-content-between">
          <img src="/img/logo.png" alt="" style="height: 3rem; width: auto">
          <v-select
            :clearable="false"
            @input="langChange"
            :reduce="language => language.value"
            class="style-chooser"
            label="title"
            :value="$i18n.locale"
            :options="langsOptions"
            style="width: 12rem"
          />
        </div>
        <div class="card-body">
          <div>
            Location Name
          </div>
          <div>
            Address
          </div>
        </div>
      </div>
      <slot/>
    </template>
  </div>
</template>

<script>
import { localize } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'PublicLayout',
  components: {
  },
  data () {
    return {
      isConfigured: false
    }
  },
  computed: {
    ...mapGetters({
      langsOptions: 'Setting/langOptionState'
    })
  },
  async mounted () {
    const response = await fetch('/api/config')

    if (response.ok === false) {
      return
    }

    const { lang } = await response.json()
    this.$i18n.locale = lang
    localize(lang)
    this.isConfigured = true
  },
  watch: {
  },
  methods: {
    langChange (lang) {
      this.$i18n.locale = lang
      localize(lang)
    }
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
