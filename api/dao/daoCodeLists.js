require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getCountriesList = (request, response) => {
    pool.query("SELECT c.id as code, c.name as label FROM countries c", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getRegionsList = (request, response) => {
    pool.query("SELECT r.id as code, r.country_id, r.name as label FROM regions r", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getLocationsList = (request, response) => {
    pool.query("SELECT id, city FROM locations", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTaxRateList = (request, response, id) => {
    pool.query("SELECT vat_tax_amount as tax_amount FROM vat_tax_amount WHERE country_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getCountriesList,
  getRegionsList,
  getLocationsList,
  getTaxRateList
}