<template>
    <div class="container">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="enquiry in enquiries" :key="enquiry.id">
                  <td>{{ enquiry.id }}</td>
                  <td>{{ enquiry.name }}</td>
                  <td>{{ enquiry.phone }}</td>
                  <td>{{ enquiry.email }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getAllEnquiries } from '../services/EnquiriesService'

export default {
  name: 'Enquiries',
  data() {
      return {
          enquiries: [],
      }
  },
  methods: {
    getAllEnquiries() {
      getAllEnquiries().then(response => {
        this.enquiries = response
      })
    },
  },
  mounted () {
    this.getAllEnquiries();
  }
}

</script>