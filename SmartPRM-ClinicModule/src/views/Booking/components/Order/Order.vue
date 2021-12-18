<template>
  <div>
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button
          v-for="({ name, text }, index) in StepOrder"
          :key="name"
          :variant="activeStep === name ? 'primary': null"
          @click="activeStep = name"
          :disabled="StepOrder.findIndex((step) => step.name === lastStep) < index"
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
import ChooseTimeTab from './ChooseTimeTab.vue'
import ReviewTab from './ReviewTab.vue'
import Services from './Services.vue'

const Step = {
  Services: 'Services',
  ChooseTimeTab: 'ChooseTimeTab',
  ReviewTab: 'ReviewTab'
}

const StepOrder = [
  { name: Step.Services, text: 'pickService' },
  { name: Step.ChooseTimeTab, text: 'chooseTime' },
  { name: Step.ReviewTab, text: 'review' }
]

export default defineComponent({
  name: 'Order',

  components: {
    ChooseTimeTab,
    ReviewTab,
    Services
  },

  data () {
    return {
      form: {
      },
      activeStep: Step.Services,
      lastStep: Step.Services
    }
  },

  computed: {
    StepOrder () {
      return StepOrder
    }
  },

  methods: {
    next (length = 1) {
      const activeStepIndex = StepOrder.findIndex(
        ({ name }) => name === this.activeStep
      )
      const nextStepIndex = activeStepIndex + length

      if (nextStepIndex <= StepOrder.length - 1) {
        this.activeStep = StepOrder[activeStepIndex + length].name

        const lastStepIndex = StepOrder.findIndex(
          ({ name }) => name === this.lastStep
        )

        if (nextStepIndex > lastStepIndex) {
          this.lastStep = this.activeStep
        }

        return
      }

      console.log('submit')
    }
  }
})
</script>
