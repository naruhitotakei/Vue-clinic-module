<template>
  <div v-show="premise != null" class="container">
    <div v-if="premise != null" class="card my-4">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <img :src="`/api/files/logo/${premise.client_id}`" alt="" style="height: 3rem; width: auto">
          <select v-model="lang" class="language-selector" ref="languageSelector" @change="$refs.languageSelector.blur()">
            <option
              v-for="{ value, title} in langsOptions"
              :key="value"
              :value="value"
            >
              {{ title }}
            </option>
          </select>
        </div>
        <div class="mt-4">
          <div>{{ premise.name }}</div>
          <div>{{ premise.address }}</div>
          <div>{{ premise.phone_number }}</div>
        </div>
      </div>
    </div>
    <slot :premise="premise"/>
  </div>
</template>

<script>
import { localize } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'PublicLayout',
  components: {
  },
  data() {
    return {
      lang: this.$route.query.lang != null ? this.$route.query.lang : 'en',
      premise: null,
    }
  },
  computed: {
    ...mapGetters({
      langsOptions: 'Setting/langOptionState',
    }),
  },
  async mounted() {
    const response = await fetch(`/api/config?${new URLSearchParams({ premiseId: this.$route.query.premiseId })}`)

    if (response.ok === false) {
      return
    }

    const { premise } = await response.json()
    this.premise = premise
    window.document.title = premise.name
  },
  watch: {
    lang: {
      immediate: true,
      handler(lang) {
        this.$i18n.locale = lang
        localize(lang)
      },
    },
  },
}
</script>
<style>
@import url("../assets/css/custom.css");
@media (max-width: 992px) {
  .full-screen {
    display: none;
  }
}

.language-selector {
  border: none;
  background-color: transparent;
}
</style>
