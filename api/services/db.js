const dotenv = require('dotenv')
const moment = require('moment-timezone')
const Pool = require('pg').Pool

dotenv.config()
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

function now() {
  return moment.tz('Europe/Ljubljana').format('YYYY-MM-DD HH:mm:ss.SSS')
}

async function insert(table, fieldMap) {
  const fieldEntries = Object.entries(fieldMap)
  const statement = /* sql */ `
    INSERT INTO ${table}(${fieldEntries.map(([column]) => column).join(',')})
    VALUES (${fieldEntries.map((_, index) => `$${index + 1}`).join(',')})
    RETURNING *
  `
  const result = await pool.query(
    statement,
    fieldEntries.map(([_, value]) => value),
  )

  return result.rows[0]
}

module.exports = {
  pool,
  now,
  insert,
}
