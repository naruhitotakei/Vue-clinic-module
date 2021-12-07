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

const getRevenueByProduct = (request, response, start, end, prm_client_id, scope) => {
    let statement = "SELECT pr.name AS pr_name, COUNT(pr.name), SUM(se.price) FROM services se "
    statement += "LEFT JOIN products pr ON se.product_id = pr.id "
    statement += "LEFT JOIN clients cl ON pr.client_id = cl.id "
    statement += "LEFT JOIN clients_prm_client_bridge cpcb ON cl.id = cpcb.clients_id "
    statement += "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND cpcb.prm_client_id = " + prm_client_id;
    }
    statement += "GROUP BY pr.name "
    pool.query(statement, [start, end], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getNewEnquiriesPerDay = (request, response, start, end, prm_client_id, scope) => {
    let statement = "SELECT date::date, COUNT(enq.id) AS enquiries_count, co.name AS country, enq.prm_client_id "
    statement += "FROM generate_series($1::date, $2::date, '1 day'::interval) date "
    statement += "LEFT JOIN enquiries enq ON enq.created_at::date = date "
    statement += "LEFT JOIN countries co ON enq.country_id = co.id "
    statement += "WHERE enq.id IS NOT NULL "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND enq.prm_client_id = " + prm_client_id;
    }
    statement += 'GROUP BY date, co.name, enq.prm_client_id'
    pool.query(statement, [start, end], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getClinicAttendance,
  getVisitsByCountryInAWeek,
  getDoctorsStatisticPerWeek,
  getRevenueByProduct,
  getNewEnquiriesPerDay
}