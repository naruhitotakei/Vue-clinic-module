<template>
  <b-modal
    id="confirm-modal"
    hide-footer
    centered
    ok-only
    :title="$t('public.onlineBooking.confirmationOfBooking')"
  >
    <template v-if="fieldset.verificationId == null">
      <ValidationObserver v-slot="{ invalid, validate }">
        <form @submit.prevent="validate().then(sendConfirmationCode)">
          <div class="d-flex">
            <ValidationProvider
              :name="$t('public.onlineBooking.firstName')"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-group :label="$t('public.onlineBooking.firstName')">
                <b-form-input
                  v-model="fieldset.firstName" type="text"
                  :class="(errors.length > 0 ? ' is-invalid' : '')"
                />
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </b-form-group>
            </ValidationProvider>
            <div style="width: 16px"></div>
            <ValidationProvider
              :name="$t('public.onlineBooking.lastName')"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-group :label="$t('public.onlineBooking.lastName')">
                <b-form-input
                  v-model="fieldset.lastName" type="text"
                  :class="(errors.length > 0 ? ' is-invalid' : '')"
                />
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </b-form-group>
            </ValidationProvider>
          </div>
          <ValidationProvider
            :name="$t('public.onlineBooking.phone')"
            rules="required|numeric|min:9|max:15"
            v-slot="{ errors, invalid }"
          >
            <p>
              {{ $t('public.onlineBooking.pleaseEnterYourMobileNumber') }}
            </p>
            <b-form-group :label="$t('public.onlineBooking.phoneNumber')">
              <b-form-input
                v-model="fieldset.phone" type="text"
                :class="(errors.length > 0 ? ' is-invalid' : '')"
              />
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </b-form-group>
          </ValidationProvider>
          <b-button type="submit" variant="primary" :disabled="invalid">
            {{ $t('public.onlineBooking.sendVerificationCode') }}
          </b-button>
        </form>
      </ValidationObserver>
    </template>

    <template v-if="fieldset.verificationId != null">
      <div class="my-2">
        {{ $t('public.onlineBooking.theCodeHasBeenSentTo') }} {{ fieldset.phone }}.
      </div>
      <ValidationProvider
        :name="$t('public.onlineBooking.confirmationCode')"
        rules="required|min:4"
        v-slot="{ errors, invalid }"
      >
        <b-form-group :label="$t('public.onlineBooking.smsVerificationCode')">
          <b-form-input
            v-model="fieldset.verificationCode"
            type="text"
            :class="(errors.length > 0 ? ' is-invalid' : '')"
          />
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </b-form-group>
        <b-button variant="primary" :disabled="invalid" @click="$emit('next')">
          {{ $t('public.onlineBooking.confirmCode') }}
        </b-button>
        <b-button variant="link" @click="fieldset.verificationId = null">
          {{ $t('public.onlineBooking.modifyPhoneNumber') }}
        </b-button>
      </ValidationProvider>
    </template>
  </b-modal>
</template>

<script>
import { sendSms } from '@/services/booking.js'

export default {
  props: {
    form: Object
  },
  data: function () {
    return {
      fieldset: {
        firstName: null,
        lastName: null,
        phone: null,
        verificationId: null,
        verificationCode: null
      }
    }
  },
  watch: {
    fieldset: {
      deep: true,
      handler (value) {
        this.$emit('update:form', {
          ...this.form,
          ...value
        })
      }
    }
  },
  methods: {
    sendConfirmationCode: async function () {
      const result = await sendSms({ phone: this.fieldset.phone })
      this.fieldset.verificationId = result.requestId
    }
  }
}
</script>
