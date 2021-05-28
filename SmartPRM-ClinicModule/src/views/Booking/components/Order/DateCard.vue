<template>
  <b-card>
    {{date.getDate()}}
  </b-card>
</template>

<script>
export default {
  props: {
    date: Date,
    priceField: String
  }
}
</script>
