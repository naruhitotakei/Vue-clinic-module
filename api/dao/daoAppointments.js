require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

function getAppointments(request, response, locale) {
  const statement = /* sql */ `
        SELECT *
        FROM appointments
        JOIN online_booking_service_name
        ON online_booking_service.id = online_booking_service_name.online_booking_service_id
        WHERE online_booking_service.id IN (
            SELECT DISTINCT online_booking_users_bridge.online_booking_id
            FROM appointment_slots
            JOIN online_booking_users_bridge
            ON appointment_slots.doctor_id = online_booking_users_bridge.doctor_id
            WHERE appointment_slots.appointment_id IS null
            AND appointment_slots.starts_at BETWEEN NOW()::date AND NOW()::date + interval '30' day
        )
        AND online_booking_service_name.language = $1
        ORDER BY online_booking_service_name.text
    `

  pool.query(statement, [locale], (error, results) => {
    if (error) {
      response.status(500).send()

      return
    }

    response.status(200).json(results.rows)
  })
}

async function createAppointment () {
  const statement = /* sql */`
    INSERT INTO appointments(
      doctor_id,
      doctor_name,
      location,
      note,
      enquiry_id,
      patient_attended,
      product_id,
      product_group_id,
      starts_at, date,
      label_id,
      ends_at,
      time,
      created_at,
      kind
    )
  `
}
