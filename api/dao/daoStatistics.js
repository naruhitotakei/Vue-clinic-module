require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})  

const getClinicAttendance = (request, response, clinicId) =>  {
    pool.query("SELECT COUNT(id) from appointments WHERE date >= date_trunc('month', CURRENT_DATE) AND attendance='Attended'", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getVisitsByCountryInAWeek = (request, response) =>  {
    pool.query("SELECT c.name, count(c.name) FROM appointments a LEFT JOIN enquiries e ON a.enquiry_id = e.id LEFT JOIN countries c ON e.country_id = c.id WHERE a.starts_at >= date_trunc('week', CURRENT_DATE) AND a.starts_at < (date_trunc('week', CURRENT_DATE) + INTERVAL '6 DAY') AND e.country_id notnull GROUP BY c.name", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDoctorsStatisticPerWeek = (request, response) =>  {
    pool.query("select a.starts_at, a.doctor_id from appointments a where a.starts_at >= date_trunc('week', CURRENT_DATE) AND a.starts_at < (date_trunc('week', CURRENT_DATE) + INTERVAL '7 DAY') AND a.appointment_canceled_in_advance_by_clinic = false AND a.appointment_canceled_in_advance_by_patient = false GROUP BY a.starts_at , a.doctor_id, a.attendance", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getClinicAttendance,
  getVisitsByCountryInAWeek,
  getDoctorsStatisticPerWeek
}