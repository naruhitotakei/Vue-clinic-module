import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  selectedDoctors: [],
  calendarDate: null,
  calendarView: null,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
