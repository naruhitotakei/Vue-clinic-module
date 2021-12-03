<template>
    <b-modal
      id="confirm-modal"
      centered
      :hide-footer="!complete"
      ok-only
      :title="
        complete
          ? $t('public.onlineBooking.dataConfirmed')
          : $t('public.onlineBooking.confirmationOfBooking')
      "
      @hide="closeModal"
    >
      <template v-if="!complete">
      <template v-if="confirmationField">
        <div class="my-2">{{ $t('public.onlineBooking.theCodeHasBeenSentTo') }} {{ phone }}.</div>
        <ValidationProvider :name="$t('public.onlineBooking.confirmationCode')" rules="required|min:4" v-slot="{ errors, invalid }">
          <b-form-group :label="$t('public.onlineBooking.smsVerificationCode')">
            <b-form-input v-model="code" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
          </b-form-group>
          <b-button variant="primary" :disabled="invalid" @click="confirmAndSave">
            {{ $t('public.onlineBooking.confirmCode') }}
          </b-button>
          <b-button variant="link" @click="confirmationField = false">
            {{ $t('public.onlineBooking.modifyPhoneNumber') }}
          </b-button>
        </ValidationProvider>
      </template>
      <template v-if="confirmationField === false">
        <p class="my-4">
          {{ $t('public.onlineBooking.pleaseEnterYourMobileNumber') }}
        </p>
        <ValidationProvider :name="$t('public.onlineBooking.phone')" rules="required|numeric|min:9|max:15" v-slot="{ errors, invalid }">
          <b-form-group :label="$t('public.onlineBooking.phoneNumber')">
            <b-form-input v-model="phone" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
          </b-form-group>
          <b-button variant="primary" :disabled="invalid" @click="sendConfirmationCode">
            {{ $t('public.onlineBooking.sendVerificationCode') }}
          </b-button>
        </ValidationProvider>
      </template>
      </template>
      <template v-else>
        {{ $t('public.onlineBooking.yourDetailsHaveBeenSuccessfullyVerified') }}
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
