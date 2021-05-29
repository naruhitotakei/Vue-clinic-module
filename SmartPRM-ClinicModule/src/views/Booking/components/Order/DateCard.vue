<template>
  <div class="px-2">
    <div class="app-border pt-2 date-card overflow-hidden active-element"
    :class="{'disabled': (!!aviability), 'active': (!!active)}"
    @click="$emit('date-selected', date)"
    >
      <div class="px-3">
        <p class="app-font-small mb-0">{{day}}</p>
        <hr class="my-1" />
        <h1>{{date.getDate()}}</h1>
        <hr class="my-1"/>
        <p class="app-font-small mb-0">{{month}}</p>
      </div>
      <div class="price-field">
        {{(!aviability) ? priceField : aviability}}
      </div>
    </div>
  </div>
</template>

<script>
import { getDayOfWeek, getMonthName } from '@/Utils/appDate'

export default {
  props: {
    date: Date,
    priceField: String,
    aviability: [String, Boolean],
    active: Boolean
  },
  computed: {
    day: function () {
      return getDayOfWeek(this.date)
    },
    month: function () {
      return getMonthName(this.date)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/app-vars.scss";
.date-card{
  margin-top: 1px;
  color: $black;
  border-color: $primary;
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
  &.active{
    margin-top: 0px;
    border-width: 2px;
  }
  &.active:not(.disabled){
    background-color: $primary-10;
    h1{
      color: $primary;
    }
  }
  &.active.disabled{
    background-color: $gray-100;
    h1{
      color: $gray-700;
    }
  }
  .price-field{
    color: $white;
    background-color: $primary;
  }
}
</style>
