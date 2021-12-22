<template>
  <div class="px-2">
    <div class="app-border pt-2 date-card overflow-hidden active-element text-center"
      :class="{
        'disabled': (!!availability),
        'active': (!!active)
      }"
      @click="$emit('date-selected', date)"
    >
      <div class="px-3">
        <p class="app-font-small mb-0">{{ day }}</p>
        <hr class="my-1" />
        <h1>{{ date.getDate() }}</h1>
        <hr class="my-1"/>
        <p class="app-font-small mb-0">{{ month }}</p>
      </div>
      <div class="price-field">
        {{ (!availability) ? `open`: availability }}
      </div>
    </div>
  </div>
</template>

<script>
import { getDayOfWeek, getMonthName } from '@/Utils/appDate'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    date: Date,
    availability: [String, Boolean],
    active: Boolean,
    totalPrice: Number
  },
  computed: {
    day () {
      return getDayOfWeek(this.date, { lang: this.$i18n.locale })
    },
    month () {
      return getMonthName(this.date, { lang: this.$i18n.locale })
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/app-vars.scss";
.date-card{
  color: $black;
  border-color: $gray-800;
  transition: background-color 0.35s linear;
  &.disabled{
    color: unset;
    border-color: unset;
    .price-field{
      background-color: $gray-600;
    }
    h1{
      color: $gray-600;
    }
  }
  &.active:not(.disabled){
    background-color: $primary-10;
    border-color: $primary;
    h1{
      color: $primary;
    }
    .price-field{
      background-color: $primary;
    }
  }
  &.active.disabled{
    background-color: $gray-100;
    h1{
      color: $gray-700;
    }
  }
  h1{
    line-height: 3rem;
  }
  .price-field{
    color: $white;
    background-color: $gray-800;
  }
}
</style>
