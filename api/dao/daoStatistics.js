require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getClinicStatistics = (request, response, clinicId) =>  {
    var statement = ["SELECT date, SUM(cash_amount) AS cachRevenue, SUM(credit_card_amount) AS cardRevenue, SUM(cash_amount) + SUM(credit_card_amount) AS totalRevenue ",
                      "FROM services  WHERE date >= date_trunc('month', (now() - 24 * (interval '1 month'))) ",
                      "GROUP BY DATE ORDER BY date ASC "].join('\n') 
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
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

module.exports = {
  getClinicStatistics,
  getClinicAttendance
}