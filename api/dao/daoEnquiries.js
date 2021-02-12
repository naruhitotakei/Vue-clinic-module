require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getEnquiries = (request, response) => {
    pool.query("SELECT enquiries.* FROM enquiries JOIN clients ON enquiries.client_id = clients.id WHERE enquiries.trashed IS FALSE AND clients.slug = 'primadent_si'", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const deleteEnquiries = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM enquiries WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getEnquiries,
  deleteEnquiries,
}