const { pool } = require('~/services/db')
const moment = require('moment-timezone')

module.exports = {
  onAppointmentCreated,
}

async function onAppointmentCreated({
  id,
  premiseId,
  serviceId,
  appointmentSlotId,
}) {
  const service = await getServiceById(serviceId)
  const appointmentSlot = await getAppointmentSlotById(appointmentSlotId)
  const startTimestamp = moment.tz(
    appointmentSlot.starts_at,
    'Europe/Ljubljana',
  )
  await updateAppointment(id, {
    date: startTimestamp.format('YYYY-MM-DD'),
    time: startTimestamp.format('HH:mm'),
    location: appointmentSlot.location,
    doctor_name: appointmentSlot.doctor_name,
    product_id: service.product_id,
    product_group_id: service.product_group_id,
    starts_at: appointmentSlot.starts_at,
    ends_at: moment(startTimestamp)
      .add(service.default_duration, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss'),
    doctor_id: appointmentSlot.doctor_id,
    premise_id: premiseId,
  })
}

async function updateAppointment(id, fieldMap) {
  const fieldEntries = Object.entries(fieldMap)
  const statement = /* sql */ `
    UPDATE appointments
    SET ${fieldEntries
      .map(([key], index) => `${key} = $${index + 2}`)
      .join(',')}
    WHERE id = $1
  `

  await pool.query(statement, [id, ...fieldEntries.map(([_, value]) => value)])
}

async function getAppointmentSlotById(id) {
  const statement = /* sql */ `
    SELECT
      appointment_slots.*,
      appointment_slots.starts_at::text,
      TRIM(BOTH FROM CONCAT(users.title, ' ', users.first_name, ' ', users.surname)) AS doctor_name
    FROM appointment_slots JOIN users ON appointment_slots.doctor_id = users.id
    WHERE appointment_slots.id = $1
  `
  const result = await pool.query(statement, [id])

  return result.rows[0]
}

async function getServiceById(id) {
  const statement = /* sql */ `
    SELECT online_booking_service.*, products.id as product_id
    FROM online_booking_service
    JOIN products ON online_booking_service.product_group_id = products.prm_product_group_id
    WHERE online_booking_service.id = $1
  `
  const result = await pool.query(statement, [id])

  return result.rows[0]
}
