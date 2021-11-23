<template>
    <b-modal id="confirm-modal" centered :hide-footer="!complete" ok-only :title="complete ? 'Data confirmed' : 'Check your data'" @hide="closeModal">
      <template v-if="!complete">
      <template v-if="confirmationField">
        <ValidationProvider name="Confirmation code" rules="required|min:4" v-slot="{ errors, invalid }">
          <b-form-group label="Sms verification code:">
            <b-form-input v-model="code" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
          </b-form-group>
          <b-button variant="primary" :disabled="invalid" @click="confirmAndSave">Confirm code</b-button>
        </ValidationProvider>
      </template>
      <p class="my-4">Please enter your mobile number, so that we can contact you in case of any change.</p>
      <ValidationProvider name="Phone" rules="required|numeric|min:9|max:15" v-slot="{ errors, invalid }">
        <b-form-group label="Phone number">
          <b-form-input v-model="phone" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </b-form-group>
        <b-button variant="primary" :disabled="invalid" @click="sendConfirmationCode">Save and send verification SMS.</b-button>
      </ValidationProvider>
      </template>
      <template v-else>
        Your details have been successfully verified. We look forward to your visit.
      </template>
    </b-modal>
</template>

<script>
import { sendSms, confirmAndSave } from '@/services/booking.js'
export default {
  props: {
    selectedSlot: Object,
    services: Array
  },
  data: function () {
    return {
      phone: '',
      code: '',
      confirmationField: false,
      loader: false,
      complete: false,
      requestId: null
    }
  },
  methods: {
    sendConfirmationCode: async function () {
      try {
        this.loader = true
        const res = await sendSms({ phone: this.phone })
        if (res.success) {
          this.confirmationField = true
          this.requestId = res.requestId
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loader = false
      }
    },
    confirmAndSave: async function () {
      try {
        this.loader = true
        const res = await confirmAndSave({
          phone: this.phone,
          code: this.code,
          selectedSlot: this.selectedSlot,
          servivces: this.services,
          requestId: this.requestId
        })
        if (res.success) {
          this.complete = true
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loader = false
      }
    },
    closeModal: function () {
      this.resetData()
    },
    resetData: function () {
      this.phone = ''
      this.code = ''
      this.confirmationField = false
      this.loader = false
      this.complete = false
    }
  }
}
</script>
