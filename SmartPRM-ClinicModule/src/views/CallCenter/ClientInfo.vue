<template>
  <b-container fluid>
    <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="card-title">Client Info</h2>
          <button v-if="!editMode && !loading" @click="editInfo" type="button" class="btn btn-primary">Edit</button>
        </div>
      </template>
      <template v-slot:body>
        <div v-if="!loading">
          <div v-if="!editMode" v-html="clientInfo"></div>
          <vue-editor v-if="editMode" v-model="editedInfo"></vue-editor>
          <div class="text-right mt-3" v-if="editMode">
            <button :disabled="!clientInfo || editLoading" @click="editInfo" type="button" class="btn btn-secondary mr-2">Discard</button>
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
      editMode: false,
      loading: false,
      editLoading: false,
      clientInfo: null,
      editedInfo: null,
      oldInfo: null,
      content: '<p>Edit Client Info</p>',
      customToolbar: [
        ['paragraph', 'bold', 'italic', 'underline', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    }
  },
  methods: {
    editInfo() {
      this.editMode = !this.editMode
      if (this.editMode) {
        this.editedInfo = this.clientInfo
      }
    },
    getPrmClientInfo() {
      this.loading = true
      getPrmClient()
        .then((response) => {
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
      await updatePrmClientInfo(this.editedInfo)
      this.editLoading = false
      this.clientInfo = this.editedInfo
      this.editMode = false
    },
  },
}
</script>
