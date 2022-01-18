<template>
  <b-container fluid>
    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <h2 class="card-title">Client Info</h2>
      </template>
      <template v-slot:body>
        <div v-if="!loading">
          <vue-editor v-model="clientInfo"></vue-editor>
          <div class="text-right mt-3">
            <button :disabled="!clientInfo || editLoading" @click="updateClientInfo" type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
        <div class="mt-3 text-center" v-if="loading">
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="loading">Loading...</strong>
          </div>
        </div>
      </template>
    </iq-card>
  </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import { VueEditor } from 'vue2-editor'
// import { sso } from '@/services/userService'
import { getPrmClient, updatePrmClientInfo } from '@/services/callCenterService'
export default {
  components: {
    IqCard,
    VueEditor,
  },
  name: 'ClientInfo',
  mounted() {
    xray.index()
    this.getPrmClientInfo()
  },
  data: function () {
    return {
      loading: false,
      editLoading: false,
      clientInfo: null,
      content: '<p>Edit Client Info</p>',
      customToolbar: [
        ['paragraph', 'bold', 'italic', 'underline', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    }
  },
  methods: {
    getPrmClientInfo() {
      this.loading = true
      getPrmClient()
        .then((response) => {
          console.log(response)
          if (response && response.id) {
            this.clientInfo = response.info
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    async updateClientInfo() {
      this.editLoading = true
      await updatePrmClientInfo(this.clientInfo)
      this.editLoading = false
    },
    // getUserLogin() {
    //   sso().then((response) => {
    //     if (typeof response !== 'string') {
    //       console.log(response)
    //     }
    //   })
    // },
  },
}
</script>
