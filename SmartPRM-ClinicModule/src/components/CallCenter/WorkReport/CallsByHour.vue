<template>
    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <h2>Calls By Hour</h2>
      </template>
    </iq-card>
</template>

<script>
import IqCard from '@/components/xray/cards/iq-card'

export default {
  name: 'CallsByHour',
  components: {
    IqCard,
  },
}
</script>
