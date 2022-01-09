const moment = require('moment-timezone')
const { pool } = require('~/services/db')

const daoAvailableServices = {
  getAvailableServices,
}

module.exports = daoAvailableServices

async function getAvailableServices({ lang, premiseId }) {
  const statement = /* sql */ `
    SELECT
      online_booking_service.id,
      online_booking_service.default_duration,
      online_booking_service.default_online_price,
      online_booking_service_name.text
    FROM online_booking_service
    JOIN online_booking_service_name
    ON online_booking_service.id = online_booking_service_name.online_booking_id
    WHERE online_booking_service_name.language = $1
    AND online_booking_service.id IN (
      SELECT online_booking_id FROM online_booking_premise_bridge
      WHERE premise_id = $2
    )
    AND online_booking_service.id IN (
      SELECT DISTINCT online_booking_users_bridge.online_booking_id
      FROM appointment_slots
      JOIN online_booking_users_bridge
      ON appointment_slots.doctor_id = online_booking_users_bridge.doctor_id
      WHERE appointment_slots.appointment_id IS null
      AND appointment_slots.starts_at BETWEEN $3::date AND $3::date + interval '30' day
    )
    ORDER BY online_booking_service_name.text
  `
  const startDate = moment()
    .tz('Europe/Ljubljana')
    .add(1, 'day')
    .format('YYYY-MM-DD')
  const { rows } = await pool.query(statement, [lang, premiseId, startDate])

  return rows
}
