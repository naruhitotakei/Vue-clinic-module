const Pool = require('pg').Pool
const pool = new Pool({
  user: 'emazing',
  host: '136.243.204.82',
  database: 'emazing',
  password: 'enter password',
  port: 27032,
})

const getEnquiries = (request, response) => {
  pool.query('SELECT * FROM enquiries', (error, results) => {
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