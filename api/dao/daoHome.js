require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})
var moment = require('moment');

const getTodaysAppointments = (request, response, user_id, prm_client_id, locale, scope) => {
    let statement = "SELECT appointments.*, concat(enquiries.name, ' ', enquiries.last_name) AS patient_name, doctor_name, " +
        "enquiries.phone AS patient_phone, enquiries.id AS patient_id, prm_product_group_name.text AS product_group_name, " +
        "prm_product_group_name.language AS language, appointments_label_name.text AS label_name, appointments_label_name.language AS language FROM appointments "
    statement += "LEFT JOIN enquiries ON appointments.enquiry_id = enquiries.id "
    statement += "LEFT JOIN users ON enquiries.prm_dentist_user_id = users.id "
    statement += "LEFT JOIN prm_product_group ON appointments.product_group_id = prm_product_group.product_group_id "
    statement += "LEFT JOIN prm_product_group_name ON prm_product_group.product_group_id = prm_product_group_name.product_group_id "
    statement += "LEFT JOIN appointments_label ON appointments.label_id = appointments_label.id "
    statement += "LEFT JOIN appointments_label_name ON appointments_label.id = appointments_label_name.appointment_label_id "
    statement += "WHERE starts_at::DATE = CURRENT_DATE AND prm_product_group_name.language = '" + locale + "' AND appointments_label_name.language = '" + locale + "' " 
    statement += "AND appointments.appointment_canceled = FALSE "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND users.prm_client_id = " + prm_client_id
    } else if (scope == 'Self') {
        statement += "AND enquiries.prm_dentist_user_id = " + user_id + " OR enquiries.prm_surgeon_user_id = " + user_id
    }
    statement += "ORDER BY time ASC"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStaff = (request, response, prm_client_id, scope) => {
    let statement = "SELECT id, concat(title, ' ', first_name, ' ', surname) AS name, specialization, last_sign_in_at FROM users "
    statement += "WHERE active = true "
    statement += "AND prm_role_id IN (1, 3, 6, 7, 8, 9, 10) "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND prm_client_id = " + prm_client_id
    }
    statement += "ORDER BY last_sign_in_at DESC "
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAssignmentsForUser = (request, response, user_id) => {
    let statement = "SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, "
    statement += "concat(users.first_name, ' ', users.surname) AS todoname, enquiries.prm_dentist_user_id FROM todos "
    statement += "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id "
    statement += "LEFT JOIN users ON todos.user_id = users.id "
    statement += "WHERE todos.completed = false "
    statement += "AND users.id = " + user_id
    statement += " ORDER BY due_at ASC "
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateAppointment = (request, response, id, appointment) => {
    let statement = "UPDATE appointments SET "
    if (appointment.location) statement += "location='" + appointment.location + "', "
    if (appointment.doctor_id) statement += "doctor_id=" + appointment.doctor_id + ", "
    if (appointment.doctor_name) statement += "doctor_name='" + appointment.doctor_name + "', "
    if (appointment.product_group) statement += "product_group_id=" + appointment.product_group + ", "
    if (appointment.crmProduct) statement += "product_id=" + appointment.crmProduct + ", "
    if (appointment.start_time) statement += "starts_at='" + moment(appointment.start_time).format('YYYY-MM-DDTHH:mm') + "', "
    if (appointment.time) statement += "time='" + moment(appointment.start_time).format('HH:mm') + "', "
    if (appointment.end_time) statement += "ends_at='" + moment(appointment.end_time).format('YYYY-MM-DDTHH:mm') + "', "
    if (appointment.note) statement += "note='" + appointment.note + "', "
    if (appointment.patient_attended) statement += "patient_attended='" + appointment.patient_attended + "', "
    if (appointment.backgroundColor) statement += "label_id=" + appointments.backgroundColor + ", "
    if (appointment.appointment_canceled) statement += "appointment_canceled=" + appointment.appointment_canceled + ", "
    if (appointment.cancelation_reason) statement += "cancelation_reason=" + appointment.cancelation_reason + ", "
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}

module.exports = {
    getTodaysAppointments,
    getStaff,
    getAssignmentsForUser,
    updateAppointment
}
