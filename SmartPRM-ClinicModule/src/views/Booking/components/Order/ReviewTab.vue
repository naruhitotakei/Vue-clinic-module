<template>
  <div>
    <h5 class="text-left">Check selected slot and confirm reservation.</h5>
    <div class="selected-slot p-2 my-3">Selected slot: Saturday, June 5th, 2021 at 2:00 pm</div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    services: Array,
    totalPrice: Number,
    selectedSlot: Object
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/app-vars.scss";
.selected-slot{
    border: 3px solid $primary-60;
    font-size: 16px;
    color: $black;
}</style>
