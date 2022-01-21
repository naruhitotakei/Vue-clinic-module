import Vue from 'vue'
import moment from 'moment'

Vue.filter('reverse', function (value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse()
})

Vue.filter('formatDate', function (value, { lang = 'en' } = {}) {
  if (value) {
    return moment(String(value)).locale(lang).format('ddd, D MMM')
  }
})

Vue.filter('formatDateWithYear', function (value, { lang = 'en' } = {}) {
  if (value) {
    return moment(String(value)).locale(lang).format('ddd, D MMM, YYYY')
  }
})

Vue.filter('formatDateAndTime', function (value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY HH:mm')
  }
})

Vue.filter('formatInvoiceDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateAssignments', function (value, lang) {
  if (value) {
    switch (lang) {
      case 'en':
        moment.locale('en')
        break
      case 'sl':
        moment.locale('sl')
        break
    }
    return moment(String(value)).format('ddd, D MMM')
  }
})

Vue.filter('formatFullDate', function (value, { lang = 'en' } = {}) {
  if (value) {
    return moment(String(value)).locale(lang).format('dddd, MMMM D, YYYY')
  }
})

Vue.filter('formatTime', function (value) {
  if (value) {
    return value + "'"
  }
})

Vue.filter('formatMoney', function (value) {
  if (value) {
    return '$' + value
  }
})

Vue.filter('formatPrice', function (value) {
  if (value || value === 0) {
    // return new Intl.NumberFormat('de-DE', {
    //   style: 'currency',
    //   currency: 'EUR',
    // }).format(Math.round(Number(value)))
    return Math.round(Number(value)).toLocaleString('de-DE', { minimumFractionDigits: 0 }) + ' €'
  }
})

Vue.filter('formatNumber', function (value) {
  if (value || value === 0) {
    return Number(value).toLocaleString('de-DE', { minimumFractionDigits: 0 })
  }
})
