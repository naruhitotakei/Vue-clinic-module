const moment = require('moment-timezone')
const db = require('~/services/db')

const daoAvailableDates = {
  getAvailableDates,
}

module.exports = daoAvailableDates

async function getAvailableDates() {
  const statements = /* sql */`
    select distinct on (starts_at::date) starts_at::text
    from appointment_slots
    where appointment_id is null
    AND appointment_slots.starts_at BETWEEN NOW()::date AND NOW()::date + interval '30' day
    order by starts_at::date
  `

  const { rows } = await db.query(statements)

  return rows.map((row) => {
    return moment(row.starts_at).tz('Europe/Ljubljana').format('YYYY-MM-DD')
  })
}
