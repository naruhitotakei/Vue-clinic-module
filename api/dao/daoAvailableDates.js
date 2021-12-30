const moment = require('moment-timezone')
const { pool } = require('~/services/db')

const daoAvailableDates = {
  getAvailableDates,
}

module.exports = daoAvailableDates

async function getAvailableDates({ serviceId }) {
  const statements = /* sql */`
    SELECT DISTINCT ON (starts_at::date) starts_at::text
    FROM appointment_slots
    WHERE appointment_id IS null
    AND starts_at BETWEEN $1::date AND $1::date + interval '30' day
    AND doctor_id IN (
      SELECT doctor_id FROM online_booking_users_bridge
      WHERE online_booking_id = $2
    )
    ORDER BY starts_at::date
  `

  const startDate = moment()
    .tz('Europe/Ljubljana')
    .add(1, 'day')
    .format('YYYY-MM-DD')
  const { rows } = await pool.query(statements, [startDate, serviceId])

  return rows.map((row) => {
    return moment.tz(row.starts_at, 'Europe/Ljubljana').format('YYYY-MM-DD')
  })
}
