export function getDayOfWeek (date, { type = 'long', lang = 'en' } = {}) {
  return new Intl.DateTimeFormat([lang], { weekday: type }).format(date)
}

export function getMonthName (date, { type = 'long', lang = 'en' } = {}) {
  return new Intl.DateTimeFormat([lang], { month: type }).format(date)
}
