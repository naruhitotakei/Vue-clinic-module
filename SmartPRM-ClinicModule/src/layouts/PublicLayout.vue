<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'PublicLayout',
  components: {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
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
