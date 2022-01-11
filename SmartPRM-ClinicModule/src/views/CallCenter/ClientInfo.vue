<template>
    <div class="container">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h2 class="card-title">Client Info</h2>
          </template>
          <template v-slot:body>
            <vue-editor v-model="content"></vue-editor>
          </template>
        </iq-card>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    IqCard,
    VueEditor,
  },
  name: 'ClientInfo',
  mounted() {
    xray.index()
  },
  data: function () {
    return {
      content: '<p>Edit Client Info</p>',
      customToolbar: [
        ['paragraph', 'bold', 'italic', 'underline', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    }
  },
  methods: {
  },
}
</script>
