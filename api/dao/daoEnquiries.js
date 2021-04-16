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

const getEnquiriesById = (request, response, id) => {
    pool.query("SELECT enquiries.* FROM enquiries JOIN clients ON enquiries.client_id = clients.id WHERE enquiries.trashed IS FALSE AND clients.slug = 'primadent_si' AND enquiries.id = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createEnquiry = (req, res, enquiry) => {
    var statement = "INSERT INTO enquiries ("
    if (enquiry.name) statement += "name,"
    if (enquiry.phone) statement += "phone,"
    if (enquiry.email) statement += "email,"
    if (enquiry.client_id) statement += "client_id,"
    if (enquiry.gender) statement += "gender,"
    if (enquiry.last_name) statement += "last_name,"
    statement += "lead_owner_id,"
    statement += "created_at,"
    statement += "updated_at,"
    statement += "trashed,email_sent"
    statement += ") VALUES ("
    if (enquiry.name) statement += "'" + enquiry.name + "',"
    if (enquiry.phone) statement += "'" + enquiry.phone + "',"
    if (enquiry.email) statement += "'" + enquiry.email + "',"
    if (enquiry.client_id) statement += enquiry.client_id + ","
    if (enquiry.gender) statement += "'" + enquiry.gender + "',"
    if (enquiry.last_name) statement += "'" + enquiry.last_name + "',"
    if (enquiry.lead_owner_id) { statement += enquiry.lead_owner_id + ","} else {statement += "0,"}
    statement += "NOW(),NOW()," 
    statement += "false,false"    
    statement +=")"
    console.log(statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json("OK")
    })    
}

const updateEnquiry = (req, res, enquiry) => {
    res.status(200).json("OK")   
}

const deleteEnquiries = (request, response, id) => {
  pool.query('DELETE FROM enquiries WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User with ID: ${id} deleted`)
  })
}

module.exports = {
  getEnquiries,
  getEnquiriesById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiries,
}