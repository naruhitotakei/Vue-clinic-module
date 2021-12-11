const db = require('~/services/db')

const daoAvailableDates = {
  getAvailableDates,
}

module.exports = daoAvailableDates

async function getAvailableDates() {
  const statements = /* sql */`
    select distinct on (starts_at::date) starts_at::date as date
    from appointment_slots
    where appointment_id is null
    AND appointment_slots.starts_at BETWEEN NOW()::date AND NOW()::date + interval '30' day
    order by starts_at::date
  `

  return await db.query(statements)
}
