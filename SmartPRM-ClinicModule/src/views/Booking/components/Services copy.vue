<template>
  <div>
    <div  v-for='(item, index) in serviceData' :key="index" >
      <b-button v-b-toggle='`item_${index}`' class="m-1 d-block text-left" variant="light" block>{{item.itemName}}</b-button>
      <b-collapse :id='`item_${index}`'>
        <b-card>
          <!-- <div class="mt-3">
            Checked: <strong>{{ checked }}</strong><br>
            Indeterminate: <strong>{{ indeterminate }}</strong>
          </div> -->
          <!-- <b-button @click="toggleIndeterminate" block variant="outline-light">{{item.consultation.name}}</b-button> -->
          <b-button @click="toggleIndeterminate" block variant="outline-light">{{item.services}}</b-button>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>

import { serviceData } from '../booking-data'
export default {
  name: 'Services',
  data() {
    return {
      checked: true,
      indeterminate: true,
      serviceData: serviceData,
      // consultation: consultation,
      // services: services
    }
  },
  methods: {
    toggleIndeterminate() {
      this.indeterminate = !this.indeterminate
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep {
  // button{
  //   border: relative;
  //   z-index: 55555;
  // }
}
</style>
