require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getClinicStatistics = async (request, response, clinicId) =>  {
    let statsRecord = {
        weekly: [],
        monthly: [],
        yearly: []
    }

    var dailyStatement = ["SELECT date_trunc('day',date)::date as date, SUM(cash_amount) AS cachRevenue, SUM(credit_card_amount) AS cardRevenue, SUM(cash_amount) + SUM(credit_card_amount) AS totalRevenue FROM services GROUP BY ( date_trunc('week', date)) ORDER BY ( date_trunc('week', date)) ASC "].join('\n')
    var weeklyStatement = ["SELECT date_trunc('week',date)::date as date, SUM(cash_amount) AS cachRevenue, SUM(credit_card_amount) AS cardRevenue, SUM(cash_amount) + SUM(credit_card_amount) AS totalRevenue FROM services GROUP BY ( date_trunc('week', date)) ORDER BY ( date_trunc('week', date)) ASC "].join('\n')
    var monthlyStatement = ["SELECT date_trunc('month',date)::date as date, SUM(cash_amount) AS cachRevenue, SUM(credit_card_amount) AS cardRevenue, SUM(cash_amount) + SUM(credit_card_amount) AS totalRevenue FROM services GROUP BY ( date_trunc('month', date)) ORDER BY ( date_trunc('month', date)) ASC "].join('\n')
    var yearlyStatement = ["SELECT date_trunc('year',date)::date as date, SUM(cash_amount) AS cachRevenue, SUM(credit_card_amount) AS cardRevenue, SUM(cash_amount) + SUM(credit_card_amount) AS totalRevenue FROM services GROUP BY ( date_trunc('year', date)) ORDER BY ( date_trunc('year', date)) ASC "].join('\n') 
    
    
    // const weeklyPool = pool.query(weeklyStatement, (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     return results.rows
    // })

    await Promise.all([ pool.query(weeklyStatement), pool.query(monthlyStatement), pool.query(yearlyStatement) ]).then(result => {
        const weekly = result[0];
        const monthly = result[1];
        const yearly = result[2];

        statsRecord.weekly = weekly.rows
        statsRecord.monthly = monthly.rows
        statsRecord.yearly = yearly.rows

        response.status(200).json(statsRecord)
    }).catch((error) => {
        response.status(500).json({
            message: error.message || 'Something went wrong.'
        })
    })
}   

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
  getClinicStatistics,
  getClinicAttendance,
  getVisitsByCountryInAWeek,
  getDoctorsStatisticPerWeek
}