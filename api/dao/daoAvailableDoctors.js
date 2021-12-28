const moment = require('moment-timezone')
const { pool } = require('~/services/db')

const daoAvailableDoctors = {
  getAvailableDoctors,
}

module.exports = daoAvailableDoctors

async function getAvailableDoctors({ serviceId }) {
  const statements = /* sql */`
    select id, concat(users.title, ' ', users.first_name, ' ', users.surname) AS name
    from users
    where id in (
      SELECT DISTINCT ON (doctor_id) doctor_id
      FROM appointment_slots
      WHERE appointment_id IS null
      AND doctor_id IN (
        SELECT doctor_id FROM online_booking_users_bridge
        WHERE online_booking_id = $1
      )
      AND starts_at BETWEEN $2::date AND $2::date + interval '30' day
    )
    order by name
  `

  const startDate = moment().tz('Europe/Ljubljana').add(1, 'day').format('YYYY-MM-DD')
  const { rows } = await pool.query(statements, [serviceId, startDate])

  return rows
}
