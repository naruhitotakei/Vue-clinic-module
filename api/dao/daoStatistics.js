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
    pool.query("select a.starts_at, a.doctor_id from appointments a where a.starts_at >= date_trunc('week', CURRENT_DATE) AND a.starts_at < (date_trunc('week', CURRENT_DATE) + INTERVAL '7 DAY') AND a.appointment_canceled = false GROUP BY a.starts_at , a.doctor_id, a.attendance", (error, results) => {
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

const getRevenueByDoctor = (request, response, start, end, prm_client_id, scope) => {
    let statement = "SELECT products.name AS product_name, concat(users.title, ' ', users.first_name, ' ', users.surname) AS doctor_name, " +
        "array_agg(products.id) AS products, COUNT (users.id), SUM(services.price), enquiries.prm_client_id FROM services "
    statement += "LEFT JOIN products ON services.product_id = products.id "
    statement += "LEFT JOIN enquiries ON services.enquiry_id = enquiries.id "
    statement += "LEFT JOIN client_users ON services.doctor_id = client_users.id "
    statement += "LEFT JOIN users ON client_users.user_id = users.id "
    statement += "WHERE date_trunc('day', services.date) >= $1 AND (date_trunc('day', services.date) - INTERVAL '1 DAY' ) <= $2 "
    statement += "AND users.id IS NOT NULL "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND enquiries.prm_client_id = " + prm_client_id;
    }
    statement += "GROUP BY products.name, doctor_name, enquiries.prm_client_id "
    pool.query(statement, [start, end], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getNewEnquiriesPerDay = (request, response, start, end, prm_client_id, scope) => {
    let statement = "SELECT date::date, COUNT(enq.id) AS enquiries_count, co.name AS country, "
    statement += "enq.prm_client_id, array_agg(enq.id) AS enquiries_ids "
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

const getAppointmentsByProduct = (request, response, start, end, prm_client_id, scope, locale) => {
  let statement = "SELECT appointments_date:: date, COUNT(app.id) AS appointment_count, "
  statement += "array_agg(pgn.text) AS products, enq.prm_client_id FROM generate_series($1::date, $2::date, '1 day':: interval) appointments_date "
  statement += "LEFT JOIN appointments app ON app.starts_at:: date = appointments_date "
  statement += "LEFT JOIN enquiries enq ON app.enquiry_id = enq.id "
  statement += "LEFT JOIN prm_product_group pg ON app.product_group_id = pg.product_group_id "
  statement += "LEFT JOIN prm_product_group_name pgn ON pg.product_group_id = pgn.product_group_id "
  statement += "WHERE app.product_group_id IS NOT NULL AND app.appointment_canceled IS FALSE AND pgn.language = '" + locale + "' "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += "AND enq.prm_client_id = " + prm_client_id + " "
  }
  statement += "GROUP BY appointments_date, enq.prm_client_id"

  pool.query(statement, [start, end], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getClinicStats = async (request, response, start, end, prm_client_id, scope) => {
    let revenueStatement = "select SUM(services.price) AS revenue, COUNT(services.id) AS serviced_patients from services "
    revenueStatement += "LEFT JOIN enquiries ON services.enquiry_id = enquiries.id "
    revenueStatement += "WHERE date_trunc('day', services.date) >= $1 AND date_trunc('day', services.date) <= $2 "

    let allAppointmentStatement = "select COUNT(appointments.id) AS appointments from appointments "
    allAppointmentStatement += "LEFT JOIN public.enquiries ON appointments.enquiry_id = enquiries.id "
    allAppointmentStatement += "WHERE date_trunc('day', appointments.date) >= $1 AND date_trunc('day', appointments.date) <= $2 "

    let attendedAppointmentStatement = "select COUNT(appointments.id) AS appointments from appointments "
    attendedAppointmentStatement += "LEFT JOIN public.enquiries ON appointments.enquiry_id = enquiries.id "
    attendedAppointmentStatement += "WHERE appointments.appointment_canceled = FALSE "
    attendedAppointmentStatement += "AND date_trunc('day', appointments.date) >= $1 AND date_trunc('day', appointments.date) <= $2 "
    
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        revenueStatement += "AND enquiries.prm_client_id = " + prm_client_id;
        allAppointmentStatement += "AND enquiries.prm_client_id = " + prm_client_id;
    }

    await Promise.all([
        pool.query(revenueStatement, [start, end]),
        pool.query(allAppointmentStatement, [start, end]),
        pool.query(attendedAppointmentStatement, [start, end]),
    ]).then(result => {
        const revenue = result[0].rows[0].revenue
        const appointments = result[1].rows[0].appointments
        const attended = result[2].rows[0].appointments
        const serviced = result[0].rows[0].serviced_patients

        const resp = {
            revenue: revenue ? revenue : 0,
            appointments: appointments ? appointments : 0,
            attended: attended ? attended : 0,
            serviced: serviced ? serviced : 0
        }

        response.status(200).json(resp)
    }).catch(error => {
        response.status(500).json({
            message: error.message || 'Something went wrong.'
        })
    })
}

const getNewEnquiries = (request, response, start, end, prm_client_id, scope) => {
    let statement = "select enquiries.id, enquiries.name, enquiries.last_name, enquiries.email, enquiries.phone, enquiries.created_at AS date from enquiries "
    statement += "WHERE date_trunc('day', enquiries.created_at) >= $1 AND date_trunc('day', enquiries.created_at) <= $2 "

    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND enquiries.prm_client_id = " + prm_client_id;
    }

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
  getNewEnquiriesPerDay,
  getRevenueByDoctor,
  getAppointmentsByProduct,
  getClinicStats,
  getNewEnquiries
}
