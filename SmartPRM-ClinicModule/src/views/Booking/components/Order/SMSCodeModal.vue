<template>
  <b-modal
    id="confirm-modal"
    hide-footer
    centered
    ok-only
    :title="$t('public.onlineBooking.confirmationOfBooking')"
  >
    <div
      v-show="error != null && error.status === '17'"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <div>
        {{ $t('public.onlineBooking.error.excessive-verification-attempts') }}
      </div>
      <div style="font-size: 2rem">
        {{ countdown }}
      </div>
    </div>
    <div v-show="error == null || error.status !== '17'">
      <div v-show="fieldset.verificationId == null">
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
                    v-model="fieldset.firstName"
                    type="text"
                    :class="errors.length > 0 ? ' is-invalid' : ''"
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
                    v-model="fieldset.lastName"
                    type="text"
                    :class="errors.length > 0 ? ' is-invalid' : ''"
                  />
                  <div class="invalid-feedback">
                    <span>{{ errors[0] }}</span>
                  </div>
                </b-form-group>
              </ValidationProvider>
            </div>
            <ValidationProvider
              :name="$t('public.onlineBooking.phone')"
              rules="required"
              v-slot="{ errors }"
            >
              <p>
                {{ $t('public.onlineBooking.pleaseEnterYourMobileNumber') }}
              </p>
              <b-form-group :label="$t('public.onlineBooking.phoneNumber')">
                <input type="hidden" v-model="fieldset.phone" />
                <VuePhoneNumberInput
                  v-model="phone"
                  @update="
                    $event.isValid
                      ? (fieldset.phone = $event.formattedNumber)
                      : (fieldset.phone = null)
                  "
                  :default-country-code="countryCode"
                  :preferred-countries="['SI', 'IT', 'AT']"
                  no-example
                  :translations="{
                    countrySelectorLabel: $t(
                      'public.onlineBooking.countryCode',
                    ),
                    phoneNumberLabel: '',
                  }"
                />
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </b-form-group>
            </ValidationProvider>
            <div v-if="error != null" style="color: #dc3545">
              <template v-if="Array.isArray(error.messages)">
                <div v-for="message of error.messages" :key="message">
                  {{ $t(`public.onlineBooking.error.${message}`) }}
                </div>
              </template>
              <div v-else>Something went wrong</div>
            </div>
            <div class="mt-3"></div>
            <b-button type="submit" variant="primary" :disabled="invalid">
              {{ $t('public.onlineBooking.sendVerificationCode') }}
            </b-button>
          </form>
        </ValidationObserver>
      </div>

      <div v-show="fieldset.verificationId != null">
        <div class="my-2">
          {{ $t('public.onlineBooking.theCodeHasBeenSentTo') }}
          {{ fieldset.phone }}.
        </div>
        <ValidationProvider
          :name="$t('public.onlineBooking.confirmationCode')"
          rules="required|min:4|max:4|numeric"
          v-slot="{ errors, invalid }"
        >
          <b-form-group :label="$t('public.onlineBooking.smsVerificationCode')">
            <b-form-input
              v-model="fieldset.verificationCode"
              type="text"
              :class="errors.length > 0 ? ' is-invalid' : ''"
            />
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
          </b-form-group>
          <div v-if="error != null" style="color: #dc3545">
            <template v-if="Array.isArray(error.messages)">
              <div v-for="message of error.messages" :key="message">
                {{ $t(`public.onlineBooking.error.${message}`) }}
              </div>
            </template>
            <template v-else-if="error.status === '16'">
              <div>
                {{ $t(`public.onlineBooking.error.incorrect-code`) }}
              </div>
            </template>
            <div v-else>Something went wrong</div>
          </div>
          <div class="mt-3"></div>
          <b-button variant="primary" :disabled="invalid" @click="verify">
            {{ $t('public.onlineBooking.confirmCode') }}
          </b-button>
          <b-button
            variant="link"
            @click="
              () => {
                fieldset.verificationId = null
                error = null
              }
            "
          >
            {{ $t('public.onlineBooking.modifyPhoneNumber') }}
          </b-button>
        </ValidationProvider>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { createAppointment } from '@/services/appointments'
import { sendSms } from '@/services/booking.js'
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default defineComponent({
  components: {
    VuePhoneNumberInput,
  },
  props: {
    form: Object,
  },
  data() {
    return {
      countryCode: this.$route.query.country
        ? this.$route.query.country.toUpperCase()
        : 'SI',
      phone: null,
      fieldset: {
        firstName: null,
        lastName: null,
        phone: null,
        verificationId: null,
        verificationCode: null,
      },
      error: null,
      countdown: '00:00',
      countdownIntervalId: null,
    }
  },
  watch: {
    fieldset: {
      deep: true,
      handler(value) {
        this.$emit('update:form', {
          ...this.form,
          ...value,
        })
      },
    },
  },
  destroyed() {
    clearInterval(this.countdownIntervalId)
  },
  methods: {
    async sendConfirmationCode() {
      this.error = null

      let result

      try {
        result = await sendSms({
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          phone: this.form.phone,
          appointmentSlotId: this.form.appointmentSlot.id,
        })
      } catch (error) {
        this.error = error

        if (error.status === '17') {
          this.throttle(error.end_at)
        }

        throw error
      }

      this.fieldset.verificationId = result.requestId
    },
    async verify() {
      this.error = null

      try {
        await createAppointment({
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          phone: this.form.phone,
          appointmentSlotId: this.form.appointmentSlot.id,
          verificationId: this.form.verificationId,
          verificationCode: this.form.verificationCode,
        })
      } catch (error) {
        this.error = error

        if (error.status === '17') {
          this.throttle(error.end_at)
        }

        throw error
      }

      this.$emit('next')
    },
    throttle(until) {
      const endAt = moment(until)
      this.countdownIntervalId = setInterval(() => {
        const diffInSecs = endAt.diff(moment(), 'seconds')

        this.countdown = `${Math.floor(diffInSecs / 60)
          .toString()
          .padStart(2, '0')}:${(diffInSecs % 60).toString().padStart(2, '0')}`
      }, 1000)
      setTimeout(() => {
        clearInterval(this.countdownIntervalId)
        this.error = null
      }, endAt.diff(moment(), 'ms'))
    },
  },
})
</script>
