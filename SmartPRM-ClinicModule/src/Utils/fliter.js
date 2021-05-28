import Vue from 'vue'
import moment from 'moment'

Vue.filter('reverse', function (value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse()
})

/* Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).fromNow()
  }
}) */

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('ddd, D MMM')
  }
})

Vue.filter('formatDateAssignments', function (value, lang) {
  if (value) {
    if (lang === 'sl') {
      moment.locale('sl')
    } else {
      moment.locale('en')
    }
    return moment(String(value)).format('ddd, D MMM')
  }
})
