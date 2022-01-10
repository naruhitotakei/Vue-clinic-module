<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" md="12" class="mb-4">
        <div v-for="smsTemplate in smsTemplates" :key="smsTemplate.id" class="sms-templates-content">
          <iq-card class="sms-template-parent">
            <h3 class="template-name">{{ smsTemplate.name }}</h3>
            <p class="template-content black-text">{{ smsTemplate.content }}</p>
            <p class="template-unique-slug">Unique name: {{ smsTemplate.slug }}</p>
            <div class="sms-templates-actions mt-2">
              <a :href="`sms-templates/${smsTemplate.id}/edit`">Edit</a>
              <!-- <a>Delete</a> -->
            </div>
          </iq-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import {
  getSmsTemplates,
} from '../../services/smsTemplates'

export default {
  name: 'SMSTemplates',
  mounted() {
    xray.index()
    this.getSmsTemplatesData()
  },
  data: function () {
    return {
      smsTemplates: [],
    }
  },
  methods: {
    async getSmsTemplatesData() {
      getSmsTemplates().then(response => {
        if (Array.isArray(response)) {
          response.map(obj => {
            this.smsTemplates.push(obj)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
  .sms-templates-content {
    display: flex;
    flex-direction: column;
  }
  .sms-template-parent {
    padding: 1rem 1.5rem;
  }
  .template-content {
    margin-top: 0.75rem !important;
    margin-bottom: 0 !important;
    font-size: 14px;
  }
  .template-unique-slug {
    margin-top: 0.5rem !important;
    margin-bottom: 0 !important;
    font-size: 12px;
  }
  .black-text {
    color: black;
  }
  .sms-templates-actions {
    display: flex;
    flex-direction: row;
  }
  .sms-templates-actions a {
    font-size: 14px;
    color: #00a9f9 !important;
    cursor: pointer;
  }
  .sms-templates-actions a:first-child {
    margin-right: 0.5rem;
  }
</style>
