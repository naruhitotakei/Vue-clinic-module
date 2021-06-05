<template>
  <multiselect
  v-model="selectValue"
  :options="options"
  placeholder="Pick some"
  :multiple="true"
  :label="label"
  :track-by="trackBy"
  >
  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: [
    'options',
    'label',
    'trackBy',
    'value'
  ],
  computed: {
    selectValue: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
