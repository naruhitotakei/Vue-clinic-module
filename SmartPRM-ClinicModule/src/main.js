import Vue from 'vue'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './Utils/fliter'
import App from './App.vue'
import router from './router'
import store from './store'
import Raphael from 'raphael/raphael'
import './plugins'
import './registerServiceWorker'
import i18n from './i18n'
import Rollbar from 'rollbar'
import vueNumeralFilterInstaller from 'vue-numeral-filter'

global.Raphael = Raphael
Vue.config.productionTip = false

Vue.prototype.$rollbar = new Rollbar({
  accessToken: '0c806b765a5343cc8e9fd0f85cc3899a',
  captureUncaught: true,
  captureUnhandledRejections: true
})

// If you have already set up a global error handler,
// just add `vm.$rollbar.error(err)` to the top of it.
// If not, this simple example will preserve the app’s existing
// behavior while also reporting uncaught errors to Rollbar.
Vue.config.errorHandler = (err, vm, info) => {
  vm.$rollbar.error(err)
  throw err // rethrow
}

Vue.filter('euro', function (value) {
  if (!value) return '0 €'
  return value + ' €'
})

Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' })

Vue.filter('percentage', function (value) {
  if (!value) return '0%'
  return value + '%'
})
let vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
