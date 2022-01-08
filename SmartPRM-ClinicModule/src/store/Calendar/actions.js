export default {
  setCalendarDate(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('calendarDate', payload)
      resolve()
    })
  },
  setSelectedDoctors(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('selectedDoctors', payload)
      resolve()
    })
  },
  setCalendarView(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('calendarView', payload)
      resolve()
    })
  },
}
