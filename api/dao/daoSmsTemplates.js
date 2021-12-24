require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getSmsTemplates = (request, response, prm_client_id, scope) => {
    let statement = "SELECT * FROM sms_templates "
    statement += "WHERE render=true "
    statement += "AND client_id='" + prm_client_id + "'"

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSmsTemplates
}
