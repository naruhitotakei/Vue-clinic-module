require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getAppointmentSlots = (request, response) => {
    let statement = "SELECT * FROM appointment_slots "
    /* statement += "WHERE '[:from, :to]':: daterange @> starts_at:: date "
    statement = statement.replace(":from", from).replace(":to", to) */
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getAppointmentSlots
}