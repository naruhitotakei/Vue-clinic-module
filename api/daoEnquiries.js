const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'emazing',
  host: '136.243.204.82',
  database: 'emazing',
  password: 'XkRCDHZ6RpkqRTBe',
  port: 27032,
})

const getEnquiries = (req, res) => {
    pool.query("SELECT enquiries.* FROM enquiries JOIN clients ON enquiries.client_id = clients.id WHERE enquiries.trashed IS FALSE AND clients.slug = 'primadent_si'", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const deleteEnquiries = (req, res) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM enquiries WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`OK: ${id}`)
  })
}

module.exports = {
  getEnquiries,
  deleteEnquiries,
}