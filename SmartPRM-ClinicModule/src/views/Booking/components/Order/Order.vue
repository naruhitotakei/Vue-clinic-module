<template>
  <div>
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button
          v-for="{ name, text } in TabOrder"
          :key="name"
          :variant="activeTab === name ? 'primary': null"
          @click="activeTab = name"
          :disabled="TabOrder.findIndex((tab) => tab.name === activeTab) < TabOrder.findIndex((tab) => tab.name === name)"
        >
          {{ $t(`public.onlineBooking.${text}`) }}
        </b-button>
      </b-button-group>
    </div>

    <KeepAlive>
      <component :is="activeTab" :form.sync="form" @next="next"></component>
    </KeepAlive>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ChooseTimeTab from './ChooseTimeTab.vue'
import ReviewTab from './ReviewTab.vue'
import Services from './Services.vue'

const Tab = {
  Services: 'Services',
  ChooseTimeTab: 'ChooseTimeTab',
  ReviewTab: 'ReviewTab'
}

const TabOrder = [
  { name: Tab.Services, text: 'pickService' },
  { name: Tab.ChooseTimeTab, text: 'chooseTime' },
  { name: Tab.ReviewTab, text: 'review' }
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
      activeTab: Tab.Services
    }
  },

  computed: {
    TabOrder () {
      return TabOrder
    }
  },

  methods: {
    next () {
      const activeTabIndex = TabOrder.findIndex(
        ({ name }) => name === this.activeTab
      )

      if (activeTabIndex < TabOrder.length - 1) {
        this.activeTab = TabOrder[activeTabIndex + 1].name

        return
      }

      console.log('submit')
    }
  }
})
</script>
