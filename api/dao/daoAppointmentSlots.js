const moment = require('moment')
const { pool, now } = require('~/services/db')

const getFreeSlots = (request, response, prm_client_id) => {
    let statement = "SELECT * FROM appointment_slots WHERE prm_client_id = " + prm_client_id
    /* statement += "WHERE '[:from, :to]':: daterange @> starts_at:: date "
    statement = statement.replace(":from", from).replace(":to", to) */
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getFreeSlotsPublic = async ({ serviceId, date }) => {
  const statement = /* sql */`
    SELECT
      appointment_slots.id,
      appointment_slots.starts_at::text,
      appointment_slots.doctor_id,
      concat(users.title, ' ', users.first_name, ' ', users.surname) AS name
    FROM appointment_slots JOIN users ON appointment_slots.doctor_id = users.id
    WHERE appointment_slots.doctor_id IN (
      SELECT doctor_id FROM online_booking_users_bridge
      WHERE online_booking_id = $1
    )
    AND appointment_slots.starts_at::date = $2::date
    AND appointment_slots.appointment_id IS NULL
    ORDER BY appointment_slots.starts_at
  `

  return await pool.query(statement, [serviceId, date])
}

const createFreeSlots = (request, response, slot, prm_client_id) => {
    let time = moment(slot.start).format('YYYY-MM-DDTHH:mm')
    let statement = "INSERT INTO appointment_slots ("
    if(slot.location) statement += "location,"
    statement += "doctor_name,"
    if(slot.start) statement += "starts_at,"
    statement += "created_at, prm_client_id) VALUES ("
    if(slot.location) statement += "'" + slot.location + "',"
    if (slot.doctor) statement += "'" + slot.doctor + "',"
    else statement += "'Vsi zdravniki',"
    if(slot.start) statement += "'" + time + "',"
    statement += "NOW(), " + prm_client_id + ")"
    pool.query(statement, (error, results) => {
    if (error) {
        throw error
    }
     response.status(200).json("OK")
 })
}

const deleteFreeSlot = (request, response, id) => {
    pool.query("DELETE FROM appointment_slots WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json("OK")
    })
}

async function getAppointmentSlotById(id) {
  const statement = /* sql */`
    SELECT * FROM appointment_slots
    WHERE id = $1
  `
  const { rows } = await pool.query(statement, [id])

  return rows[0]
}

async function updateAppointmentSlot(id, { appointmentId }) {
  const statement = /* sql */ `
    UPDATE appointment_slots
    SET appointment_id = $2,
      updated_at = ${now()}
    WHERE id = $1
    RETURNING *
  `
  const result = await pool.query(statement, [id, appointmentId]);

  return result.rows[0];
}

const daoAppointmentSlots = {
    getFreeSlots,
    getFreeSlotsPublic,
    getAppointmentSlotById,
    createFreeSlots,
    deleteFreeSlot,
    updateAppointmentSlot,
}

module.exports = daoAppointmentSlots
