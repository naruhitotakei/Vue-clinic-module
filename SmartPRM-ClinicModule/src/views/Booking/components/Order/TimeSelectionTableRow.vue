<template>
  <b-row>
    <b-col md="6" lg="4" xl="4" v-for="(doctor, index) in doctors" :key="`title_doctor_${index}`" class="p-1">
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
</template>

<script>
export default {
  props: {
    doctors: Array,
    activeDoctor: Object
  }
}
</script>
<style scoped lang="scss">
@import "~@/assets/scss/app-vars.scss";
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
</style>
