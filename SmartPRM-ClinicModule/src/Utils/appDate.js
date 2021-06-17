export function getDayOfWeek (date, options = { type: 'long' }) {
  return new Intl.DateTimeFormat(['en'], { weekday: options.type }).format(date)
}

export function getMonthName (date, options = { type: 'long' }) {
  return new Intl.DateTimeFormat(['en'], { month: options.type }).format(date)
}
