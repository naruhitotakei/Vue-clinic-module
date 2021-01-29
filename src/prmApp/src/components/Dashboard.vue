<template>
  <div>
    <Header />
    <Navbar />
    <Enquiries />
  </div>
</template>

<script>
import Header from './Header.vue'
import Navbar from './Navbar.vue'
import Enquiries from './Enquiries.vue'

export default {
  name: 'Dashboard',
  components: {
    Header,
    Navbar,
    Enquiries
  }
}
</script>