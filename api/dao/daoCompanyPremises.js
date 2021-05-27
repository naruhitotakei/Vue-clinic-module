require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getCompanyPremises = (request, response) => {
    pool.query("SELECT pcp.premise_name, pcp.premise_street, pcp.premise_house_number,pc.company_name FROM prm_company_premise pcp JOIN prm_company pc ON pcp.company_id = pc.company_id", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPremisesForCompany = (request, response,id) => {
    pool.query("SELECT pcp.premise_name, pcp.premise_street, pcp.premise_house_number FROM prm_company_premise pcp WHERE pcp.company_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCompanyPremises,
    getPremisesForCompany
}