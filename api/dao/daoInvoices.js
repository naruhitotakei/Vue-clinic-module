require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getInvoices = (request, response) => {
    pool.query("SELECT * from invoice", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getInvoicesById = (request, response, id) => {
    pool.query("SELECT invoice.*,enquiries.email,enquiries.phone, countries.name as country FROM invoice left join enquiries on invoice.enquiries_id = enquiries.id left join countries on invoice.enquiries_country_code = countries.code WHERE invoice.invoice_number = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getInvoices,
    getInvoicesById
}