<template>
  <div class="container">
    <template v-if="lang != null">
      <div class="card my-4">
        <div class="card-body d-flex justify-content-between">
          <img :src="`/api/files/logo/${premise.client_id}`" alt="" style="height: 3rem; width: auto">
          <v-select
            :clearable="false"
            @input="lang = $event"
            :reduce="language => language.value"
            class="style-chooser"
            label="title"
            :value="$i18n.locale"
            :options="langsOptions"
            style="width: 12rem"
          />
        </div>
        <div class="card-body">
          <div>{{ premise.name }}</div>
          <div>{{ premise.address }}</div>
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
      lang: null,
      premise: null
    }
  },
  computed: {
    ...mapGetters({
      langsOptions: 'Setting/langOptionState'
    })
  },
  async mounted () {
    const response = await fetch(`/api/config?${new URLSearchParams({ premiseId: this.$route.query.premiseId })}`)

    if (response.ok === false) {
      return
    }

    const { lang, premise } = await response.json()
    this.lang = lang
    this.premise = premise
  },
  watch: {
    lang (lang) {
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
