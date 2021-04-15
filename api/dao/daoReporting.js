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
    var statement = ["SELECT pii.product_id, MAX(pii.product_name), COUNT(pii.product_id), SUM(pii.product_taxable_amount) FROM prm_invoice_item pii ",
                     "LEFT JOIN prm_invoice pi ON pii.invoice_id = pi.invoice_id ",
                     "WHERE date_trunc('day', pii.created_date) >= $1 AND date_trunc('day', pii.created_date) <= $2 AND pi.invoice_type = 'Invoice'",
                     "GROUP BY pii.product_id "].join('\n') 
    pool.query(statement, [startdate, endate], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// todo add doctor from prm_invoice
const getServiceList = (request, response, startdate, endate) =>  {
    var statement = ["SELECT pii.created_date, pii.product_name, en.name, en.last_name, pii.product_taxable_amount, pr.fee FROM prm_invoice_item pii ",
                     "LEFT JOIN prm_invoice pi ON pii.invoice_id = pi.invoice_id ",
                     "LEFT JOIN enquiries en ON pi.enquiries_id = en.id ",
                     "LEFT JOIN products pr ON pii.product_id = pr.id ",
                     "WHERE date_trunc('day', pii.created_date) >= $1 AND date_trunc('day', pii.created_date) <= $2 AND pi.invoice_type = 'Invoice'"].join('\n') 
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