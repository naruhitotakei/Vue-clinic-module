<template>
  <multiselect
  v-model="selectValue"
  :options="options"
  :placeholder="placeholder"
  :selectLabel="selectLabel"
  :deselectLabel="deselectLabel"
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
    'value',
    'placeholder',
    'selectLabel',
    'deselectLabel'
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
<style lang="scss">
span.multiselect__tag,
span.multiselect__tag::after,
span.multiselect__option--highlight,
span.multiselect__option--highlight::after{
  background: #089bab;
}
.multiselect__tag-icon:after{
  color: #08565f;
}
.multiselect__tag-icon:hover{
  background: #077e8b;
}
</style>
