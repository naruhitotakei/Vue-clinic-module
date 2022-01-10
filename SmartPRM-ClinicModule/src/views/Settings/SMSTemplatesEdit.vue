<template>
  <b-container fluid>
    <b-col lg="12" md="12">
      <iq-card>
        <template v-slot:headerTitle>
          <h3 class="mb-3 mt-2">Edit SMS Template</h3>
        </template>
        <template v-slot:body>
          <div class="input-sections mb-3">
            <p>Message name</p>
            <input type="text" v-model="smsTemplateData.name" placeholder="Message name" class="form-control text-inputs" />
          </div>
          <div class="input-sections mb-3">
            <p>Content</p>
              <b-form-textarea
                id="content-textarea"
                placeholder="Content"
                rows="4"
                max-rows="6"
                v-model="smsTemplateData.content"
              ></b-form-textarea>
          </div>
          <div class="input-sections mb-3">
            <p>A unique name</p>
            <input type="text" v-model="smsTemplateData.slug" placeholder="A unique name" class="form-control text-inputs" />
          </div>
          <div class="update-or-cancel">
            <b-button
              variant="primary"
              class="btn btn-primary"
              @click="updateSmsTemplateData"
            >Update</b-button>
            <span>or</span>
            <a :href="`/settings/sms-templates`">Cancel</a>
          </div>
        </template>
      </iq-card>
    </b-col>
  </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import {
  getSmsTemplate,
  updateSmsTemplate,
} from '../../services/smsTemplates'

export default {
  name: 'SMSTemplatesEdit',
  data: function () {
    return {
      smsTemplateID: parseInt(this.$route.params.id),
      smsTemplateData: {
        name: '',
        content: '',
        slug: '',
      },
    }
  },
  mounted() {
    xray.index()
    this.getSmsTemplateData()
    console.log(this.smsTemplateID)
  },
  methods: {
    async getSmsTemplateData() {
      getSmsTemplate(this.smsTemplateID).then(response => {
        if (Array.isArray(response)) {
          this.smsTemplateData = response[0]
        }
      })
    },
    async updateSmsTemplateData() {
      updateSmsTemplate(this.smsTemplateData).then(response => {
        if (response.success) {
          this.$router.push('/settings/sms-templates')
        }
      })
    },
  },
}
</script>

<style lang="scss">
.input-sections {
  display: flex;
  flex-direction: column;
}
.input-sections p {
  margin-bottom: 0.25rem;
  color: #123;
}
#content-textarea {
  height: auto !important;
}
.update-or-cancel {
  display: flex;
  align-items: center;
}
.update-or-cancel span {
  margin: 0 0.5rem
}
.update-or-cancel a {
  font-size: 14px;
  color: #00a9f9 !important;
  cursor: pointer;
}
</style>
