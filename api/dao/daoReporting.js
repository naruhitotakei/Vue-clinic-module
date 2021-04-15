require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getEmazingServicesReport = (request, response, startdate, endate) =>  {
    var statement = ["SELECT pr.name as service_title, COUNT(se.id), SUM(se.price) FROM services se ",
                     "LEFT JOIN products pr ON se.product_id = pr.id ",
                     "WHERE date_trunc('day', se.date) >= $1 AND date_trunc('day', se.date) <= $2 ",
                     "GROUP BY pr.id "].join('\n')                       
    pool.query(statement, [startdate, endate], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// todo add doctor from prm_invoice
const getServiceList = (request, response, startdate, endate) =>  {
    var statement = ["SELECT se.date, pr.name as service_title, en.name, en.last_name, se.price, se.fee, us.name as doctor FROM services se ",
                     "LEFT JOIN products pr ON se.product_id = pr.id ",
                     "LEFT JOIN enquiries en ON se.enquiry_id = en.id ",
                     "LEFT JOIN client_users cu ON se.doctor_id = cu.id ",
                     "LEFT JOIN users us ON cu.user_id = us.id ",
                     "WHERE date_trunc('day', se.date) >= $1 AND date_trunc('day', se.date) <= $2 "].join('\n') 
    pool.query(statement, [startdate, endate], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getEmazingServicesReport,
  getServiceList
}