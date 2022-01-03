<template>
  <div>
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button
          v-for="({ name, text, isEnabled }, index) in stepOrder"
          :key="name"
          :variant="activeStep === name ? 'primary' : null"
          @click="activeStep = name"
          :disabled="
            isEnabled === false ||
            stepOrder.findIndex((step) => step.name === lastStep) < index
          "
        >
          {{ $t(`public.onlineBooking.${text}`) }}
        </b-button>
      </b-button-group>
    </div>

    <KeepAlive>
      <component :is="activeStep" :form.sync="form" @next="next"></component>
    </KeepAlive>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { createAppointment } from '@/services/appointments'
import ChooseTimeTab from './ChooseTimeTab.vue'
import ReviewTab from './ReviewTab.vue'
import Services from './Services.vue'

const Step = {
  Services: 'Services',
  ChooseTimeTab: 'ChooseTimeTab',
  ReviewTab: 'ReviewTab',
}

export default defineComponent({
  name: 'Order',

  components: {
    ChooseTimeTab,
    ReviewTab,
    Services,
  },

  data() {
    return {
      form: {},
      activeStep: Step.Services,
      lastStep: Step.Services,
    }
  },

  computed: {
    stepOrder() {
      return [
        {
          name: Step.Services,
          text: 'pickService',
          isEnabled: true,
        },
        {
          name: Step.ChooseTimeTab,
          text: 'chooseTime',
          isEnabled: this.form.service != null,
        },
        {
          name: Step.ReviewTab,
          text: 'review',
          isEnabled:
            this.form.service != null && this.form.appointmentSlot != null,
        },
      ]
    },
  },

  methods: {
    async next(length = 1) {
      const activeStepIndex = this.stepOrder.findIndex(
        ({ name }) => name === this.activeStep,
      )
      const nextStepIndex = activeStepIndex + length

      if (nextStepIndex <= this.stepOrder.length - 1) {
        this.activeStep = this.stepOrder[activeStepIndex + length].name

        const lastStepIndex = this.stepOrder.findIndex(
          ({ name }) => name === this.lastStep,
        )

        if (nextStepIndex > lastStepIndex) {
          this.lastStep = this.activeStep
        }

        return
      }

      await this.submit()
    },
    async submit() {
      await createAppointment({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        phone: this.form.phone,
        appointmentSlotId: this.form.appointmentSlot.id,
        verificationId: this.form.verificationId,
        verificationCode: this.form.verificationCode,
      })
      this.$emit('confirmed', this.form)
    },
  },
})
</script>
