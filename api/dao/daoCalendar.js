require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getApontments = (request, response, from, to, client_id ) => {
        var statement = "SELECT app.id, app.date, app.time, app.location, app.enquiry_id, enq.name, enq.last_name, app.attendance, app.product_id, app_s.location, app_s.doctor_name, pcl.id as prm_client_id, pcl.client_name as prm_client_name "
        statement += "FROM appointments app "
        statement += "LEFT JOIN appointment_slots app_s ON app.id = app_s.appointment_id "
        statement += "LEFT JOIN users us ON app_s.doctor_name = us.name "
        statement += "LEFT JOIN clients cl ON app_s.client_id = cl.id "
        statement += "LEFT JOIN prm_client pcl ON cl.id = pcl.clients_id "
        statement += "LEFT JOIN enquiries enq ON app.enquiry_id = enq.id "
        statement += "WHERE app.trashed = false  "
        statement += "AND pcl.client_deleted = false  "
        statement += "AND (pcl.id=:client_id OR :client_id=-1) "
        statement += "AND '[:from, :to]'::daterange @> app.date  "
        
        statement = statement.replace(":from",from).replace(":to",to).replace(":client_id",client_id).replace(":client_id",client_id) 
        console.log(statement)
        pool.query(statement , (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

module.exports = {
  getApontments
}