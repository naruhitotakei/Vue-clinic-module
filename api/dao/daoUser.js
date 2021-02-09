require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getUser = (email) => {
  pool.query('SELECT * FROM users WHERE email = ' + email, (error, results) => {
    if (error) {
      throw error
    }
    return results.rows // !!!!
  })
}

module.exports = {
  getUser
}