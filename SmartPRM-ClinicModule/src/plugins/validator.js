import Vue from 'vue'
import * as rules from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, localize } from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import sl from 'vee-validate/dist/locale/sl.json'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
localize({
  en,
  sl,
})
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
