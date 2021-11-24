<template>
  <div>
  <b-container class="time-row" :class="{expanded}" fluid>
    <b-row ref="timeRow">
      <b-col lg="6" xl="6" v-for="(doctor, index) in doctors" :key="`title_doctor_${index}`" class="p-1">
        <div
        class="doctor-item d-flex align-items-center active-element p-1 rounded-circle"
        :class="{'active': !!activeDoctor && activeDoctor.name === doctor.name}"
        @click="$emit('select-doctor', doctor)"
        >
        <img class="img-fluid avatar-40 rounded-circle mr-1" :src="doctor.img" :alt="doctor.name">
        <p class="mb-0">{{doctor.name}}</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <div
    v-if="contentHeight > 60"
    class="show-more rounded-circle mt-1"
    @click="expanded = !expanded"
  >
    {{ $t('public.onlineBooking.showMore') }}
  </div>
  </div>
</template>

<script>
export default {
  props: {
    doctors: Array,
    activeDoctor: Object
  },
  data: function () {
    return {
      contentHeight: 0,
      expanded: false
    }
  },
  mounted () {
    this.setContentHeight(this.$refs.timeRow.offsetHeight)
  },
  updated () {
    this.setContentHeight(this.$refs.timeRow.offsetHeight)
  },
  methods: {
    setContentHeight: function (height) {
      (this.contentHeight !== height) && (this.contentHeight = height)
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/assets/scss/app-vars.scss";
.time-row {
  max-height: 60px;
  overflow-y: hidden;
  transition: all .5s linear;
  animation: 1s open-content;
  &.expanded{
    max-height: 300px;
  }
}
.doctor-item {
  background-color: $primary-10;
  color: $primary;
  border: 1px solid transparent;
  transition: all .35s ease-in-out;
  &:hover{
    background-color: $primary-20;
    box-shadow: 1px 1px 3px $gray-300;
  }
  &.active{
    border-color: $primary;
    background-color: $primary-60;
    color: $white;
  }
}
.show-more{
  font-size: 12px;
  background: $gray-100;
  cursor: pointer;
}
</style>
