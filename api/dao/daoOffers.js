require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getOffers = (request, response) => {
    pool.query("SELECT * FROM invoice WHERE invoice_type = 'Offer'", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getOffersByPatient = (request, response, id) => {
    pool.query("SELECT * FROM invoice JOIN enquiries ON invoice.enquiries_id = enquiries.id WHERE invoice_type = 'Offer' AND enquiries_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)    
    })
}

module.exports = {
    getOffers,
    getOffersByPatient
}