require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getPremisesList = (request, response) => {
    pool.query("SELECT premise_name AS name, CONCAT(premise_street, ' ', premise_house_number, premise_house_number_additional) AS address, CONCAT(premise_post_code, ' ', premise_city) AS city FROM prm_company_premise WHERE company_id = 1", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getPremisesList
}