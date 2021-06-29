import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './Setting/index'
import Chat from './Chat/index'
import Patients from './Patients/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting,
    Chat,
    Patients
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  strict: debug
})
