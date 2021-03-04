import Vue from 'vue'
import App from './App.vue'
import i18n from "./i18n"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
